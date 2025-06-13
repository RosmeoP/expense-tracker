import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SideBar from "./SideBar";
import DashboardOverview from "../pages/DashboardOverview";

// Helper for greeting
const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 6) return "Good night";
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};

// Async function to refresh token
const refreshToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) throw new Error("No refresh token found");
  const response = await axios.post("http://localhost:3000/api/refresh", { refreshToken });
  localStorage.setItem("accessToken", response.data.accessToken);
  localStorage.setItem("refreshToken", response.data.refreshToken);
  return response.data;
};

const Dashboard = () => {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchUserProfile = useCallback(async (token: string) => {
    try {
      const response = await axios.get("http://localhost:3000/api/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data.user);
    } catch (err: any) {
      if (err.response?.status === 401) {
        try {
          const refreshed = await refreshToken();
          await fetchUserProfile(refreshed.accessToken);
        } catch {
          setError("Session expired. Please log in again.");
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          navigate("/login");
        }
      } else {
        setError("Failed to fetch user profile.");
      }
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setError("No token found, please log in again.");
      setLoading(false);
      navigate("/login");
      return;
    }
    fetchUserProfile(token);
  }, [fetchUserProfile, navigate]);

  if (loading) return <div className="text-center text-white mt-20">Loading...</div>;
  if (error) return <div className="text-center text-red-600 mt-20">{error}</div>;

  return (
    <div className="min-h-screen flex bg-blue-700 overflow-hidden">
      <aside className="w-64 min-h-screen fixed left-0 top-0 bottom-0 z-20">
        <SideBar />
      </aside>
      <main className="flex-1 ml-64 min-h-screen flex flex-col bg-blue-700">
        <div className="w-full max-w-6xl p-8 bg-white rounded-3xl shadow-2xl mx-auto mt-12 mb-12 min-h-[calc(100vh-6rem)] overflow-auto flex flex-col">
          <div className="mb-6">
            <p className="text-gray-500 text-sm mb-1">Welcome back,</p>
            <h2 className="text-3xl font-extrabold text-blue-800">
              {getGreeting()}, {user?.name}
            </h2>
          </div>
          <div className="flex-1 min-h-0">
            <DashboardOverview />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
