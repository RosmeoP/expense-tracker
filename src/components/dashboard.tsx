import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout";
import FinancialOverview from "./FinancialOverview";
import BudgetSummaryCards from "./BudgetSummaryCards";
import SpendingByCategoryChart from "./SpendingByCategoryChart";
import RecentExpenses from "./RecentExpenses";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const refreshToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) throw new Error("No refresh token found");
  
  const response = await axios.post(`${API_URL}/auth/refresh-token`, { refreshToken });
  localStorage.setItem("accessToken", response.data.accessToken);
  localStorage.setItem("refreshToken", response.data.refreshToken);
  return response.data;
};

const Dashboard = () => {
  // All state declarations at the top
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showWelcome, setShowWelcome] = useState(false);
  
  const navigate = useNavigate();

  const fetchUserProfile = useCallback(async (token: string) => {
    try {
      const response = await axios.get(`${API_URL}/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      setUser(response.data.user);
    } catch (err: any) {
      if (err.response?.status === 401) {
        try {
          const refreshed = await refreshToken();
          await fetchUserProfile(refreshed.accessToken);
        } catch (refreshError) {
          setError("Session expired. Please log in again.");
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("user");
          navigate("/login");
        }
      } else {
        setError("Failed to fetch user profile.");
      }
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  // User profile fetch effect
  useEffect(() => {
    // First, try to get user from localStorage (from Google OAuth)
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setLoading(false);
        return;
      } catch (e) {
        // Continue to token-based fetch if parsing fails
      }
    }
    
    // If no stored user data, try to fetch with token
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setError("No token found, please log in again.");
      setLoading(false);
      navigate("/login");
      return;
    }
    
    fetchUserProfile(token);
  }, [fetchUserProfile, navigate]);

  // Welcome message effect
  useEffect(() => {
    if (user && !loading) {
      setShowWelcome(true);
      const timer = setTimeout(() => {
        setShowWelcome(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [user, loading]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-red-600 mb-4">
            <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <p className="text-red-600 text-lg">{error}</p>
          <button 
            onClick={() => navigate("/login")}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Welcome notification */}
      {user && showWelcome && (
        <div className="fixed top-4 right-4 z-50 bg-gradient-to-r from-green-400 to-green-500 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-500 transform animate-pulse">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium">Welcome back, {user.name}! 🎉</span>
            <button 
              onClick={() => setShowWelcome(false)}
              className="ml-2 text-white hover:text-gray-200 font-bold text-lg leading-none"
              aria-label="Close notification"
            >
              ×
            </button>
          </div>
        </div>
      )}

      <Layout 
        title="Expense Tracker" 
        subtitle={user ? `Welcome, ${user.name}` : undefined}
      >
        <div className="space-y-6">
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
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SpendingByCategoryChart
              data={[
                { name: "Food", value: 550 },
                { name: "Transport", value: 200 },
                { name: "Bills", value: 180 },
                { name: "Shopping", value: 160 },
                { name: "Other", value: 158 },
              ]}
            />
            <RecentExpenses
              expenses={[
                { id: "3", description: "T-shirt", amount: 25, date: "2025-06-13", category: "Shopping" },
                { id: "4", description: "Electricity", amount: 60, date: "2025-06-12", category: "Bills" },
                { id: "5", description: "Rent", amount: 800, date: "2025-06-01", category: "Rent" },
                { id: "6", description: "Gift", amount: 30, date: "2025-06-10", category: "Other" },
              ]}
            />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Dashboard;