"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import LogoutButton from "./LogoutButton";

export default function UserDashboard() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pauseDates, setPauseDates] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.id) return;

    axios
      .get(`/api/dashboard?userId=${parseInt(user.id)}`)
      .then((res) => setSubscriptions(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleCancel = async (id) => {
    if (!confirm("Are you sure you want to cancel this subscription?")) return;
    setLoading(true);
    try {
      await axios.post("/api/dashboard/cancel", { id });
      setSubscriptions((prev) =>
        prev.map((s) => (s.id === id ? { ...s, status: "cancelled" } : s))
      );
    } catch (error) {
      console.error("Cancel error:", error);
      setLoading(false);
    }
  };

  const handlePause = async (id) => {
    const { start, end } = pauseDates[id] || {};
    setLoading(true);
    if (!start || !end) return alert("Please select start and end dates");

    try {
      await axios.post("/api/dashboard/pause", { id, start, end });
      setSubscriptions((prev) =>
        prev.map((s) => (s.id === id ? { ...s, status: "paused" } : s))
      );
    } catch (error) {
      console.error("Pause error:", error);
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  if (!loading && subscriptions.length === 0) {
    return (
      <div className="max-w-xl mx-auto mt-20 text-center">
        <h1 className="text-3xl font-bold mb-4">No Subscriptions Yet</h1>
        <p className="text-gray-600 mb-6">
          You haven't subscribed to any meal plan yet.
        </p>
        <a
          href="/subscribe"
          className="bg-accent text-white px-4 py-2 rounded transition"
        >
          Subscribe Now
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 p-4">
      <div className="absolute top-20 left-4">
        <LogoutButton />
      </div>
      <h1 className="text-3xl font-bold mb-6 text-center">
        Your Subscriptions
      </h1>
      {subscriptions.map((sub) => (
        <div
          key={sub.id}
          className="border rounded-xl p-6 mb-8 shadow bg-white hover:shadow-md transition"
        >
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-xl font-semibold text-blue-800">
                {sub.plan}
              </h2>
              <p className="text-sm text-gray-600">
                Name: {sub.name} | Phone: {sub.phone}
              </p>
            </div>
            <span
              className={`text-sm font-bold px-3 py-1 rounded-full shadow ${
                sub.status === "active"
                  ? "bg-green-100 text-green-600"
                  : sub.status === "paused"
                  ? "bg-yellow-100 text-yellow-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {sub.status}
            </span>
          </div>

          <p className="text-md text-gray-700 mb-2">
            Total Price: Rp{sub.totalPrice.toLocaleString("id-ID")}
          </p>

          <div className="mt-4">
            <h3 className="text-md font-semibold text-gray-800 mb-2">
              Meals Schedule
            </h3>
            <div className="space-y-3">
              {sub.menus.map((menu, idx) => (
                <div
                  key={idx}
                  className="border p-3 rounded bg-gray-50 hover:bg-gray-100"
                >
                  <p className="text-sm font-medium text-gray-700">
                    {menu.date} – {menu.time}
                  </p>
                  <ul className="text-sm text-gray-600 ml-4 list-disc">
                    <li>Main: {menu.main}</li>
                    <li>Side: {menu.side}</li>
                    <li>Drink: {menu.drink}</li>
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 space-y-2">
            <div>
              <label className="block font-medium">Pause Subscription:</label>
              <div className="flex items-center gap-2">
                <input
                  type="date"
                  className="border rounded px-2 py-1"
                  onChange={(e) =>
                    setPauseDates((prev) => ({
                      ...prev,
                      [sub.id]: {
                        ...prev[sub.id],
                        start: e.target.value,
                      },
                    }))
                  }
                />
                <span>to</span>
                <input
                  type="date"
                  className="border rounded px-2 py-1"
                  onChange={(e) =>
                    setPauseDates((prev) => ({
                      ...prev,
                      [sub.id]: {
                        ...prev[sub.id],
                        end: e.target.value,
                      },
                    }))
                  }
                />
                <button
                  onClick={() => handlePause(sub.id)}
                  className={`bg-yellow-400 text-white px-3 py-1 rounded ${
                    loading
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-yellow-500"
                  }`}
                >
                  Pause
                </button>
              </div>
            </div>

            <button
              onClick={() => handleCancel(sub.id)}
              className={`bg-red-600 text-white px-4 py-2 rounded mt-2 ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-red-700"
              }`}
            >
              Cancel Subscription
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
