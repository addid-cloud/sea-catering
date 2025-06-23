"use client";

import { useState } from "react";

const steps = ["Contact", "Meals & Days", "Plan", "Menu", "Allergies"];

const plans = [
  { name: "Diet Plan", price: 30000 },
  { name: "Protein Plan", price: 40000 },
  { name: "Royal Plan", price: 60000 },
];

const mealTypes = ["Breakfast", "Lunch", "Dinner"];
const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const menuCategories = {
  Main: ["Grilled Chicken", "Ikan Salmon", "Dada Ayam"],
  Side: ["Nasi Merah", "Sayur Rebus", "Sup Labu"],
  Drink: ["Infused Water", "Jus Cold-Pressed", "Yogurt"],
};

export default function SubscriptionFormStepper() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    plan: plans[0].name,
    meals: [],
    days: [],
    allergies: "",
    selectedMenu: { Main: [], Side: [], Drink: [] },
  });
  const [error, setError] = useState("");

  const handleCheckbox = (field, value) => {
    setFormData((prev) => {
      const arr = prev[field];
      return {
        ...prev,
        [field]: arr.includes(value)
          ? arr.filter((v) => v !== value)
          : [...arr, value],
      };
    });
  };

  const handleMenuSelection = (category, item) => {
    setFormData((prev) => {
      const current = prev.selectedMenu[category];
      const updated = current.includes(item)
        ? current.filter((m) => m !== item)
        : [...current, item];
      return {
        ...prev,
        selectedMenu: {
          ...prev.selectedMenu,
          [category]: updated,
        },
      };
    });
  };

  const next = () => {
    if (step === 0) {
      if (formData.name.trim() === "") {
        setError("Nama tidak boleh kosong");
        return;
      }
      if (formData.phone.trim() === "") {
        setError("Nomor telepon tidak boleh kosong");
        return;
      }
    }
    if (step === 1) {
      if (formData.meals.length === 0) {
        setError("Pilih minimal satu jenis meal");
        return;
      }
      if (formData.days.length === 0) {
        setError("Pilih minimal satu hari pengiriman");
        return;
      }
    }
    setError("");
    setStep((prev) => Math.min(prev + 1, steps.length));
  };

  const back = () => {
    setError("");
    setStep((prev) => Math.max(prev - 1, 0));
  };

  const handleChange = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", formData);
    alert("Subscription Submitted!");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow max-w-2xl mx-auto mt-10"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">
        Subscription - Step {step + 1} of {steps.length}
      </h2>
      {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

      {step === 0 && (
        <div>
          <label className="block mb-2 font-medium">Name</label>
          <input
            className="w-full border p-2 rounded mb-4"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            required
          />

          <label className="block mb-2 font-medium">Phone Number</label>
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
          <label className="block mb-2 font-medium">Meal Types</label>
          <div className="flex gap-3 mb-4">
            {mealTypes.map((type) => (
              <label key={type} className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  checked={formData.meals.includes(type)}
                  onChange={() => handleCheckbox("meals", type)}
                />
                {type}
              </label>
            ))}
          </div>

          <label className="block mb-2 font-medium">Delivery Days</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {days.map((day) => (
              <label key={day} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.days.includes(day)}
                  onChange={() => handleCheckbox("days", day)}
                />
                {day}
              </label>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <label className="block mb-2 font-medium">Select Plan</label>
          <select
            className="w-full border p-2 rounded"
            value={formData.plan}
            onChange={(e) => handleChange("plan", e.target.value)}
          >
            {plans.map((plan) => (
              <option key={plan.name} value={plan.name}>
                {plan.name} – Rp{plan.price.toLocaleString("id-ID")}
              </option>
            ))}
          </select>
        </div>
      )}

      {step === 3 && (
        <div>
          {Object.keys(menuCategories).map((category) => (
            <div key={category} className="mb-3">
              <label className="block font-medium mb-1">{category}</label>
              <div className="flex gap-3 flex-wrap">
                {menuCategories[category].map((item) => (
                  <label key={item} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.selectedMenu[category].includes(item)}
                      onChange={() => handleMenuSelection(category, item)}
                    />
                    {item}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {step === 4 && (
        <div>
          <label className="block font-medium mb-2">
            Allergies or Restrictions
          </label>
          <textarea
            className="w-full border p-2 rounded"
            value={formData.allergies}
            onChange={(e) => handleChange("allergies", e.target.value)}
          />
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

        {step < steps.length - 1 && (
          <button
            type="button"
            onClick={next}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Next
          </button>
        )}

        {step === steps.length - 1 && (
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        )}
      </div>
    </form>
  );
}
