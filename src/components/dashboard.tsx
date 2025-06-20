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

  // Welcome message effect - only show on fresh login
  useEffect(() => {
    if (user && !loading) {
      // Check if user just logged in (within last 5 seconds)
      const loginTime = localStorage.getItem('loginTime');
      const now = Date.now();
      
      if (loginTime && (now - parseInt(loginTime)) < 5000) {
        setShowWelcome(true);
        localStorage.removeItem('loginTime'); // Remove after showing
        
        const timer = setTimeout(() => {
          setShowWelcome(false);
        }, 4000);
        return () => clearTimeout(timer);
      }
    }
  }, [user, loading]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-red-600 dark:text-red-400 mb-4">
            <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <p className="text-red-600 dark:text-red-400 text-lg">{error}</p>
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
        <div className="fixed top-6 right-6 z-50 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border border-green-200/50 dark:border-green-800/50 shadow-2xl rounded-2xl p-5 transition-all duration-500 transform animate-in slide-in-from-right-5 hover:scale-105">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 relative">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 via-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">Welcome back!</h3>
                <span className="text-lg">🎉</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Hey <span className="font-semibold text-indigo-600 dark:text-indigo-400">{user.name}</span>, great to see you again!
              </p>
              <div className="mt-2 flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-600 dark:text-green-400 font-medium">You're all set</span>
              </div>
            </div>
            <button 
              onClick={() => setShowWelcome(false)}
              className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
              aria-label="Close notification"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <Layout>
        <div className="space-y-6">
          {/* Simplified Title Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">
              Expense Tracker
            </h1>
            
            {user && (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-full border border-blue-200 dark:border-blue-800">
                <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
                  Welcome, {user.name}
                </p>
              </div>
            )}
          </div>
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