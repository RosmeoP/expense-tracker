import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { refreshToken } from "../services/authService";
import SideBar from "./sideBar";
import { WidgetBalance, WidgetExpenses, WidgetIncome } from "./widget/widget";
const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setError("No token found, please log in again.");
      setLoading(false);
      return;
    }

    const fetchUserProfile = async (token: string) => {
      try {
        const response = await axios.get("http://localhost:3000/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data.user);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          try {
            const refreshedTokens = await refreshToken();
            const newToken = refreshedTokens.accessToken;
            localStorage.setItem("accessToken", newToken);

            const retryResponse = await axios.get("http://localhost:3000/api/profile", {
              headers: {
                Authorization: `Bearer ${newToken}`,
              },
            });
            setUser(retryResponse.data.user);
          } catch (refreshError) {
            setError("Failed to refresh token. Please log in again.");
            navigate("/login");
          }
        } else {
          setError("Error fetching user data.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile(token);
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
       <div className="min-h-screen bg-gray-50 flex">
    {/* Uncomment to enable sidebar */}
     <SideBar /> 
    <main className="flex-1 p-8">
      <div className="flex flex-col gap-8 items-center">
        {/* Top row: Large Balance Widget */}
        <div className="w-full flex justify-center">
          <WidgetBalance value="$1,200" trend={8.2} />
        </div>
        {/* Bottom row: Two smaller widgets */}
        <div className="flex gap-8 justify-center w-full">
          <WidgetExpenses value="$450" subtitle="This month" />
          <WidgetIncome value="$2,000" />
        </div>
      </div>
    </main>
  </div>

     
     
  );
};

export default Dashboard;
