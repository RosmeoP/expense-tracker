import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SideBar from "../components/sideBar";
import FinancialOverview from "./FinancialOverview";
import BudgetSummaryCards from "./BudgetSummaryCards";
import SpendingByCategoryChart from "./SpendingByCategoryChart";
import RecentExpenses from "./RecentExpenses";

// Get API URL from environment
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
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchUserProfile = useCallback(async (token: string) => {
    try {
      console.log('🔍 Fetching user profile...');
      
      // FIXED: Use correct endpoint /auth/profile instead of /api/profile
      const response = await axios.get(`${API_URL}/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      console.log('✅ User profile fetched:', response.data.user);
      setUser(response.data.user);
    } catch (err: any) {
      console.error('❌ Profile fetch error:', err.response?.status, err.message);
      
      if (err.response?.status === 401) {
        console.log('🔄 Token expired, trying to refresh...');
        try {
          const refreshed = await refreshToken();
          console.log('✅ Token refreshed, retrying profile fetch...');
          await fetchUserProfile(refreshed.accessToken);
        } catch (refreshError) {
          console.error('❌ Token refresh failed:', refreshError);
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

  useEffect(() => {
    console.log('🚀 Dashboard mounted, checking authentication...');
    
    // First, try to get user from localStorage (from Google OAuth)
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        console.log('✅ User found in localStorage:', userData.name);
        setUser(userData);
        setLoading(false);
        return; // Don't need to fetch profile if we have user data
      } catch (e) {
        console.warn('⚠️ Failed to parse stored user data');
      }
    }
    
    // If no stored user data, try to fetch with token
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.log('❌ No token found, redirecting to login...');
      setError("No token found, please log in again.");
      setLoading(false);
      navigate("/login");
      return;
    }
    
    console.log('🔍 Token found, fetching user profile...');
    fetchUserProfile(token);
  }, [fetchUserProfile, navigate]);

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
    <div className="h-screen bg-white relative">
      {/* Welcome message for successful login */}
      {user && (
        <div className="fixed top-4 right-4 z-50 bg-green-100 border border-green-300 text-green-700 px-4 py-2 rounded-lg shadow-lg">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Welcome back, {user.name}! 🎉</span>
          </div>
        </div>
      )}

      {/* Sidebar absolutely positioned */}
      <aside className="hidden md:block w-64 h-screen fixed left-0 top-0 bottom-0 z-20">
        <SideBar />
      </aside>
      
      {/* Mobile Bottom Navigation */}
      <SideBar mobileOnly />
      
      {/* Main content */}
      <main className="flex flex-col min-h-screen">
        <div className="w-full max-w-3xl mx-auto px-4 flex flex-col gap-4">
          <h1 className="text-2xl font-bold mt-12 text-center">
            Expense Tracker
            {user && <span className="block text-sm text-gray-600 mt-1">Welcome, {user.name}</span>}
          </h1>
          
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
          
          <div className="flex flex-col gap-2">
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <div className="flex-1">
                <SpendingByCategoryChart
                  data={[
                    { name: "Food", value: 550 },
                    { name: "Transport", value: 200 },
                    { name: "Bills", value: 180 },
                    { name: "Shopping", value: 160 },
                    { name: "Other", value: 158 },
                  ]}
                />
              </div>
              <div className="flex-1">
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
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;