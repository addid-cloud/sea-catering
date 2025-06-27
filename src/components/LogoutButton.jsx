import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("storage"));
    await axios.post("/api/auth/logout");
    router.push("/");
    setLoading(true);
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className={`bg-red-500 text-white px-4 py-2 rounded ${
        loading ? "opacity-50 cursor-not-allowed" : "hover:bg-red-600"
      }`}
    >
      {loading ? "Logging out..." : "Logout"}
    </button>
  );
}
