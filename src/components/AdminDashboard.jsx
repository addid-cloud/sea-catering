import { useEffect, useState } from "react";
import axios from "axios";
import LogoutButton from "./LogoutButton";

export default function AdminDashboard() {
  const [metrics, setMetrics] = useState(null);
  const [startDate, setStartDate] = useState("2025-06-01");
  const [endDate, setEndDate] = useState("2025-06-30");

  const fetchMetrics = async () => {
    try {
      const res = await axios.get(
        `/api/admin-dashboard?start=${startDate}&end=${endDate}`
      );
      setMetrics(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, [startDate, endDate]);

  if (!metrics) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="absolute top-20 left-4">
        <LogoutButton />
      </div>
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="flex gap-4 mb-6">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          onClick={fetchMetrics}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 border rounded shadow">
          <h2 className="text-lg font-semibold">New Subscriptions</h2>
          <p>{metrics.newSubscriptions}</p>
        </div>
        <div className="p-4 border rounded shadow">
          <h2 className="text-lg font-semibold">MRR</h2>
          <p>Rp{metrics.mrr.toLocaleString("id-ID")}</p>
        </div>
        <div className="p-4 border rounded shadow">
          <h2 className="text-lg font-semibold">Reactivations</h2>
          <p>{metrics.reactivations}</p>
        </div>
        <div className="p-4 border rounded shadow">
          <h2 className="text-lg font-semibold">Total Active</h2>
          <p>{metrics.totalActive}</p>
        </div>
      </div>
    </div>
  );
}
