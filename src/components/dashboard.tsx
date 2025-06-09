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
  <div className="min-h-screen bg-white  md:bg-black flex flex-col md:flex-row relative overflow-hidden">
    <SideBar />

    {/* Main Content Area */}
    <div className="w-full flex mt-5 mr-5 justify-center items-start px-2 md:px-0 pt-8 pb-36 md:pt-0 md:pb-0 relative z-10">
      <div className="w-full  md:mt-0 md:mr-0  bg-white rounded-xl md:rounded-3xl md:border-4 md:border-black md:max-w-[90vw] md:min-h-[95vh] md:shadow-xl md:p-0">
        <main className="flex-1 p-4 md:p-12">
          <div className="flex flex-col gap-6 md:gap-10 items-center">
            {/* Top row: Large Balance Widget */}
            <div className="w-full flex justify-center">
            </div>
            <div className="flex flex-col md:flex-row gap-4 md:gap-8 w-full items-center justify-center">
              <WidgetExpenses value="$450" subtitle="This month" />
              <WidgetIncome value="$2,000" />
              <WidgetBalance value="$1,200" trend={8.2} />
            </div>
          </div>
        </main>
      </div>
    </div>
    {/* Mobile-only Black Background at Bottom */}
    <div className="md:hidden w-full h-[300px] rounded-2xl fixed bg-neutral-900 rounded-t-[2.5rem] mt-[-2rem] z-0" />
  </div>
);


 


};

export default Dashboard;
