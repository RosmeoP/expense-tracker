import {
  Home,
  Wallet,
  ChartPie,
  ScanLine,
  Settings,
  Trophy
} from "lucide-react";
import { Separator } from './ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../components/ui/tooltip";
import { useLocation } from 'react-router-dom';

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/transactions", label: "Transactions", icon: ScanLine },
  { href: "/budgets", label: "Budgets", icon: Wallet },
  { href: "/reports", label: "Reports", icon: ChartPie},
  { href: "/goals", label: "Goals", icon: Trophy },
  { href: "/settings", label: "Settings", icon: Settings,  }
];

const handleLogout = () =>{
  window.location.href = "/login";
}



const SideBar = () => {
  const { pathname } = useLocation();

  return (
    <>
      {/* Desktop Sidebar - Full Width */}
      <TooltipProvider>
        <aside className="hidden md:flex h-screen w-56  bg-white text-red-200 flex-col shadow-lg" role="navigation" aria-label="Sidebar">
          <div className="flex flex-col  items-center justify-between h-full w-full">
            <div>
              <div className="flex items-center justify-center h-20 border-b border-[#23263b]">
                <img src="/logo192.png" alt="Logo" className="w-10 h-10" />
              </div>
              <nav className="flex-1 flex flex-col mt-6 px-4 gap-4">
                <SidebarSection title="Main">
                  {NAV_ITEMS.slice(0, 2).map(item => (
                    <NavItem key={item.href} {...item} active={pathname === item.href} />
                  ))}
                </SidebarSection>
                <Separator className="bg-[#23263b]" />
                <SidebarSection title="Planning">
                  {NAV_ITEMS.slice(2, 5).map(item => (
                    <NavItem key={item.href} {...item} active={pathname === item.href} />
                  ))}
                </SidebarSection>
                <Separator className="bg-[#23263b]" />
                <SidebarSection title="Account">
                  <NavItem {...NAV_ITEMS[5]} active={pathname === NAV_ITEMS[5].href} />
                </SidebarSection>
              </nav>
            </div>
            {/* Log Out Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-4 px-4 py-3 m-4 rounded-lg text-red-500 rounded-2xl hover:border-red-700 transition duration-200  hover:scale-105 active:scale-95"
            >
              <span className="text-xl">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <span className="text-sm">Log Out</span>
            </button>
          </div>
        </aside>
      </TooltipProvider>
      {/* Mobile Bottom Navigation with contrasting container */}
    
      <div className="md:hidden fixed bottom-0 left-0  right-0 z-40 rounded-t-4xl bg-gray-300 py-2">
        <nav className="rounded-3xl mx-4 bg-white mt-4 text-black flex justify-around items-center h-16 shadow-lg">
          {NAV_ITEMS.slice(0, 5).map(item => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center gap-1 text-xs ${
                  isActive ? "text-black" : "text-gray-700"
                } hover:text-black transition`}
              >
                <Icon className="transition-transform duration-200 hover:scale-110" />
                <span className="text-[11.5px] m font-bold mt-1">{item.label}</span>
              </a>
            );
          })}
        </nav>
      </div>
    </>
  );
};

const SidebarSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div>
    <p className="text-black text-sm mb-2 px-2">{title}</p>
    {children}
  </div>
);

const NavItem = ({
  href,
  icon: Icon,
  label,
  muted = false,
  active = false
}: {
  href: string;
  icon: React.ElementType;
  label: string;
  muted?: boolean;
  active?: boolean;
}) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <a
        href={href}
        className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all group mb-1
          ${
            active
              ? "bg-[#23263b] text-white border-l-4 border-blue-500 shadow"
              : muted
              ? "text-gray-700"
              : "text-gray-500 hover:bg-[#23263b] hover:text-white hover:mb-2"
          }`}
      >
        <span className="text-xl"><Icon size={20} /></span>
        <span className="text-sm">{label}</span>
      </a>
    </TooltipTrigger>
    <TooltipContent side="right" className="md:block hidden">
      {label}
    </TooltipContent>
  </Tooltip>
);

export default SideBar;