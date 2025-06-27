"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";

export default function AdminDashboard() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchMetrics = async () => {
    if (!startDate || !endDate) return;
    setLoading(true);
    try {
      const res = await axios.get("/api/admin-dashboard", {
        params: { startDate, endDate },
      });
      setMetrics(res.data);
    } catch (err) {
      console.error("Error fetching admin metrics:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const today = new Date();
    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    setStartDate(format(monthStart, "yyyy-MM-dd"));
    setEndDate(format(today, "yyyy-MM-dd"));
  }, []);

  useEffect(() => {
    if (startDate && endDate) fetchMetrics();
  }, [startDate, endDate]);

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>
      <div className="flex justify-center gap-4 mb-6">
        <div>
          <label className="text-sm">Start Date</label>
          <input
            type="date"
            className="border rounded px-3 py-1"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <label className="text-sm">End Date</label>
          <input
            type="date"
            className="border rounded px-3 py-1"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : metrics ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <MetricCard
            title="New Subscriptions"
            value={metrics.newSubscriptions}
          />
          <MetricCard
            title="Monthly Recurring Revenue (MRR)"
            value={`Rp${metrics.mrr.toLocaleString("id-ID")}`}
          />
          <MetricCard title="Reactivations" value={metrics.reactivations} />
          <MetricCard
            title="Subscription Growth"
            value={metrics.activeSubscriptions}
          />
        </div>
      ) : (
        <p className="text-center text-gray-600">No data available.</p>
      )}
    </div>
  );
}

function MetricCard({ title, value }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow hover:shadow-md transition border">
      <h3 className="text-lg font-medium text-gray-600 mb-2">{title}</h3>
      <p className="text-2xl font-bold text-blue-700">{value}</p>
    </div>
  );
}
