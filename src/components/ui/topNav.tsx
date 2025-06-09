import { useState, useEffect } from "react";
import { Search, Bell } from "lucide-react";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 6) return "Good night";
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export const TopNav = ({ userName }: { userName: string }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    handleResize(); // initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
<header className="w-full fixed top-0 left-0 right-0 z-30 md:static flex flex-col md:flex-row items-center justify-between gap-4 py-4 px-4 md:px-6 bg-white border-b md:border-none shadow rounded-none md:rounded-2xl">      
      {/* Left: Greeting and Avatar + Notifications */}
      <div className="flex items-center justify-between w-full md:w-auto">
        <div className="flex items-center gap-3">
          <div className="flex flex-col md:items-start">
            <span className="text-xs text-gray-400">Welcome back,</span>
            <span className="text-lg md:text-xl font-bold text-gray-700 flex items-center gap-1">
              {getGreeting()},{" "}
              <span className="capitalize">{userName}</span>
            </span>
          </div>

          {/* Notification Icon */}
          <button
            className="text-gray-600 hover:text-blue-500 transition md:ml-4"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
          </button>

          {/* Avatar */}
          <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-base md:text-lg shadow">
            {userName?.[0]?.toUpperCase() || "U"}
          </div>
        </div>

        {/* Mobile Search Toggle */}
        {!isDesktop && (
          <button
            className="text-gray-600 hover:text-blue-500 ml-auto"
            onClick={() => setShowSearch((s) => !s)}
            aria-label="Toggle Search"
          >
            <Search className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Desktop search or visible mobile search */}
      {(isDesktop || showSearch) && (
        <form className="w-full md:w-1/3 relative transition-all duration-300">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Search className="w-5 h-5" />
          </span>
          <input
            type="text"
            placeholder="Search..."
            className="w-full rounded-lg border border-gray-200 pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition bg-white shadow-sm"
          />
        </form>
      )}
    </header>
  );
};
