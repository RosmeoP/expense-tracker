import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SideBar from "../components/sideBar";
import FinancialOverview from "./FinancialOverview";
import BudgetSummaryCards from "./BudgetSummaryCards";
import SpendingByCategoryChart from "./SpendingByCategoryChart";

const refreshToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) throw new Error("No refresh token found");
  const response = await axios.post("http://localhost:3000/api/refresh", { refreshToken });
  localStorage.setItem("accessToken", response.data.accessToken);
  localStorage.setItem("refreshToken", response.data.refreshToken);
  return response.data;
};

const Dashboard = () => {
  const [, setUser] = useState<{ name: string } | null>(null);
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
    <div className="min-h-screen flex bg-white overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 min-h-screen fixed left-0 top-0 bottom-0 z-20">
        <SideBar />
      </aside>
      {/* Mobile Bottom Navigation */}
      <SideBar mobileOnly />
      {/* Main content */}
      <main className="flex-1 md:ml-64 min-h-screen flex flex-col bg-white items-center justify-start">
        <div className="flex-1 min-h-0 w-full flex flex-col items-center">
          <div className="flex flex-col flex-1 w-full max-w-3xl mx-auto px-2">
            <h1 className="text-2xl font-bold mt-8 mb-6 ml-2">Expense Tracker</h1>
            <FinancialOverview
              savingsRate={23}
              budgetHealth={90}
              nextBill={{ name: "Internet", amount: 50, dueDate: "2025-06-20", daysLeft: 2 }}
              alerts={["Budget exceeded"]}
              growth={15}
              onViewReports={() => {}}
              onAddExpense={() => {}}
            />
            <BudgetSummaryCards
              totalSpent={1248}
              remainingBudget={752}
              thisMonth={2000}
            />
            <SpendingByCategoryChart
              data={[
                { name: "Food", value: 550 },
                { name: "Transport", value: 200 },
                { name: "Bills", value: 180 },
                { name: "Shopping", value: 160 },
                { name: "Other", value: 158 },
              ]}
            />
            {/* Otro componente aquí */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
