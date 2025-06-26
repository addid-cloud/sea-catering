"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import Card from "@/components/Card";
import dataMenu from "@/data/Menu-data.json";
import { useRouter } from "next/navigation";
import ConfirmModal from "./ConfirmModal";

const steps = ["Contact Info", "Choose Days", "Customize Menu", "Allergies"];

const plans = [
  { name: "Diet Plan", price: 30000 },
  { name: "Protein Plan", price: 40000 },
  { name: "Royal Plan", price: 60000 },
];

const calculateCalories = (meal) => {
  if (!meal) return "-";
  const { protein = 0, carbs = 0, fat = 0 } = meal;
  const calProtein = protein * 4;
  const calCarbs = carbs * 4;
  const calFat = fat * 9;
  return calProtein + calCarbs + calFat;
};

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const mealTimes = ["Breakfast", "Lunch", "Dinner"];

export default function SubscriptionFormStepper() {
  const router = useRouter();

  const [selectedMealTimes, setSelectedMealTimes] = useState({});
  const [step, setStep] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState(plans[0].name);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);
  const [generatedDates, setGeneratedDates] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    allergies: "",
  });
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Gagal parse user dari localStorage:", err);
        localStorage.removeItem("user"); // amanin biar ga terus error
      }
    } else {
      console.warn("User belum login atau localStorage kosong");
    }
  }, []);

  const [selectedDate, setSelectedDate] = useState(null);
  const [customMenus, setCustomMenus] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const toggleMealTime = (day, time) => {
    setSelectedMealTimes((prev) => {
      const current = prev[day] || [];
      const alreadySelected = current.includes(time);
      return {
        ...prev,
        [day]: alreadySelected
          ? current.filter((t) => t !== time)
          : [...current, time],
      };
    });
  };

  useEffect(() => {
    if (step === 2) {
      const dates = [];
      const now = new Date();
      for (let i = 0; i < 30; i++) {
        const date = new Date(now);
        date.setDate(now.getDate() + i);
        const dayName = weekdays[date.getDay()];
        if (selectedDays.includes(dayName)) {
          dates.push({
            dateStr: date.toISOString().split("T")[0],
            dayName,
          });
        }
      }
      setGeneratedDates(dates);
    }
  }, [step]);

  const toggleDay = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const getStandardType = (rawType) => {
    const map = {
      "main dish": "main",
      "side dish": "side",
      minuman: "drink",
    };
    return map[rawType.toLowerCase()] || rawType;
  };

  const handleMenuSelect = (date, time, meal) => {
    console.log("Selected meal:", meal);
    const key = `${date}-${time}`;
    setCustomMenus((prev) => {
      const existing = prev[key] || {};
      const updated = {
        ...prev,
        [key]: {
          ...existing,
          [getStandardType(meal.type)]: meal.name,
        },
      };
      console.log("Updated customMenus:", updated);
      return updated;
    });
  };

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = () => {
    console.log({ ...formData, selectedPlan, customMenus });
    setShowConfirm(true);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const confirmFinalSubmit = async () => {
    setSubmitted(true);
    setShowConfirm(false);

    const fullMenus = generateFullMenus();
    const payload = {
      ...formData,
      plan: selectedPlan,
      userId: user?.id, // tambahkan ini
      menus: Object.entries(fullMenus).map(([key, value]) => {
        const parts = key.split("-");
        const date = parts.slice(0, 3).join("-"); // "2025-06-27"
        const time = parts[3]; // "Breakfast", "Lunch", dsb
        return { date, time, ...value };
      }),
    };

    try {
      console.log("Payload submitted:", payload);
      const response = await axios.post("/api/subscription", payload);
      console.log("Success:", response.data);
    } catch (error) {
      console.error("Error submitting:", error);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    console.log("LocalStorage user:", storedUser);

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Invalid user JSON in localStorage:", err);
      }
    }
  }, []);

  const getRandomMenu = (menus, type) => {
    const filtered = menus.filter((m) => getStandardType(m.type) === type);
    if (filtered.length === 0) return `Random ${type}`;
    const randomIndex = Math.floor(Math.random() * filtered.length);
    return filtered[randomIndex].name;
  };

  const generateFullMenus = () => {
    const fullMenus = {};

    generatedDates.forEach((d) => {
      const times = selectedMealTimes[d.dayName] || [];
      times.forEach((time) => {
        const key = `${d.dateStr}-${time}`;
        const selected = customMenus[key] || {};

        const menus =
          dataMenu.find((m) => m.plan === selectedPlan)?.menuSelection || [];

        fullMenus[key] = {
          main: selected.main || getRandomMenu(menus, "main"),
          side: selected.side || getRandomMenu(menus, "side"),
          drink: selected.drink || getRandomMenu(menus, "drink"),
        };
      });
    });

    return fullMenus;
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="bg-white p-6 rounded-lg shadow max-w-4xl mx-auto mt-10"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">
        Step {step + 1} of {steps.length}
      </h2>

      {step === 0 && (
        <div>
          <label className="block mb-2 font-medium">Name</label>
          <input
            className="w-full border p-2 rounded mb-4"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            required
          />

          <label className="block mb-2 font-medium">Phone</label>
          <input
            className="w-full border p-2 rounded"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            required
          />
        </div>
      )}

      {step === 1 && (
        <div>
          <p className="font-medium mb-2">Pilih hari dan waktu makan</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {weekdays.map((day) => (
              <div
                key={day}
                className={`rounded-xl p-4 shadow cursor-pointer transition-all duration-200 border hover:shadow-lg ${
                  selectedDays.includes(day)
                    ? "bg-accent text-white"
                    : "bg-gray-100"
                }`}
                onClick={() => toggleDay(day)}
              >
                <p className="font-semibold mb-2">{day}</p>
                <div className="flex flex-wrap gap-2">
                  {mealTimes.map((time) => (
                    <button
                      key={time}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (selectedDays.includes(day))
                          toggleMealTime(day, time);
                      }}
                      type="button"
                      className={`text-sm px-3 py-1 rounded transition ${
                        selectedMealTimes[day]?.includes(time)
                          ? "bg-accent text-white"
                          : selectedDays.includes(day)
                          ? "bg-blue-200 hover:bg-blue-300"
                          : "bg-gray-200 cursor-not-allowed"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <p className="font-medium mb-4">
            jika tidak dipilih maka akan dipilih secara random dan hanya bisa
            costumize menu main, side, dan drink.
          </p>
          <p className="font-medium mb-4">Pilih tanggal dan custom menu:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {generatedDates.map((d) => (
              <div key={d.dateStr} className="border rounded p-3 shadow-sm">
                <p className="font-semibold mb-1">
                  {d.dateStr} ({d.dayName})
                </p>
                <div className="flex gap-2 mb-2">
                  {selectedMealTimes[d.dayName]?.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedDate({ ...d, time })}
                      className={`text-xs px-2 py-1 rounded transition font-medium ${
                        selectedDate?.dateStr === d.dateStr &&
                        selectedDate?.time === time
                          ? "bg-blue-600 text-white"
                          : "bg-blue-200 hover:bg-blue-300 text-gray-800"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {selectedDate && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">
                Custom Menu for {selectedDate.dateStr} – {selectedDate.time}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {dataMenu
                  .filter((m) => m.plan === selectedPlan)
                  .map((m) => m.menuSelection)
                  .flat()
                  .map((meal, idx) => {
                    const key = `${selectedDate.dateStr}-${selectedDate.time}`;
                    const type = getStandardType(meal.type);
                    const selected = customMenus[key]?.[type] === meal.name;
                    return (
                      <Card
                        key={`${meal.name}-${idx}`}
                        meal={meal}
                        handleMenuSelect={handleMenuSelect}
                        selectedDateForMenu={selectedDate}
                        mealTime={selectedDate?.time}
                        selected={
                          customMenus[
                            `${selectedDate.dateStr}-${selectedDate.time}`
                          ]?.[getStandardType(meal.type)] === meal.name
                        }
                      />
                    );
                  })}
              </div>
            </div>
          )}
          {selectedDate && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">
                Selected Menu Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {["main", "side", "drink"].map((type) => {
                  const key = `${selectedDate.dateStr}-${selectedDate.time}`;
                  const selectedName = customMenus[key]?.[type];

                  const allMenus =
                    dataMenu.find((m) => m.plan === selectedPlan)
                      ?.menuSelection || [];

                  const matched =
                    allMenus.find(
                      (m) =>
                        getStandardType(m.type) === type &&
                        m.name === selectedName
                    ) || null;

                  return (
                    <div
                      key={type}
                      className="border rounded-xl p-4 shadow-sm bg-white hover:shadow-md transition"
                    >
                      <p className="text-sm font-semibold text-gray-500 mb-1">
                        {type === "main"
                          ? "Main Dish"
                          : type === "side"
                          ? "Side Dish"
                          : "Drink"}
                      </p>
                      <p className="text-lg font-bold text-gray-800">
                        {matched?.name || "Random"}
                      </p>

                      <div className="mt-2 text-sm text-gray-700 space-y-1">
                        <p>🍗 Protein: {matched?.protein || "-"}</p>
                        <p>🥔 Carbs: {matched?.carbs || "-"}</p>
                        <p>🧈 Fat: {matched?.fat || "-"}</p>
                        <p>🔥 Calories: {calculateCalories(matched)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {step === 3 && (
        <div>
          <label className="block font-medium mb-2">Allergies</label>
          <textarea
            className="w-full border p-2 rounded"
            placeholder="List any allergies you have (optional)"
            value={formData.allergies}
            onChange={(e) => handleChange("allergies", e.target.value)}
          />
        </div>
      )}

      {submitted && (
        <div className="text-green-600 font-semibold text-center mt-4">
          Subscription Submitted!
        </div>
      )}

      <div className="flex justify-between mt-6">
        {step > 0 && (
          <button
            type="button"
            onClick={back}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Back
          </button>
        )}
        {step < steps.length - 1 ? (
          <button
            type="button"
            onClick={next}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Next
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        )}
      </div>
      {showConfirm && (
        <ConfirmModal
          menus={generateFullMenus()}
          onConfirm={confirmFinalSubmit}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </form>
  );
}
