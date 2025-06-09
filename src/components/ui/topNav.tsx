import { Search } from "lucide-react";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 6) return "Good night";
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export const TopNav = ({ userName }: { userName: string }) => (
  <header className="w-full flex flex-col md:flex-row items-center justify-between gap-4 py-4 px-6 bg-gradient-to-r from-white via-blue-50 to-white shadow rounded-2xl mb-4">
    <div className="flex items-center gap-4 w-full md:w-auto">
      <div className="flex flex-col">
        <span className="text-xs text-gray-400">Welcome back,</span>
        <span className="text-xl font-bold text-gray-700 flex items-center gap-2">
          {getGreeting()}, <span className="capitalize">{userName}</span>
        </span>
      </div>
      {/* Avatar */}
      <div className="ml-2 flex items-center justify-center w-10 h-10 rounded-full bg-gray-300 text-white font-bold text-lg shadow">
        {userName?.[0]?.toUpperCase() || "U"}
      </div>
    </div>
    <form className="w-full md:w-1/3 relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
        <Search className="w-5 h-5" />
      </span>
      <input
        type="text"
        placeholder="Search..."
        className="w-full rounded-lg border border-gray-200 pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition bg-white shadow-sm"
      />
    </form>
  </header>
);