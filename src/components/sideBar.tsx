import {
  Home,
  Wallet,
  BarChart2,
  List,
  Settings,
  Target
} from "lucide-react";
import { Separator } from './ui/separator';
import { useLocation } from 'react-router-dom';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

const SideBar = () => {
  const { pathname } = useLocation();

  return (
    <TooltipProvider>
      <aside
        className="h-screen w-16 md:w-56 bg-black text-white flex flex-col shadow-lg"
        role="navigation"
        aria-label="Sidebar"
      >
        {/* Logo */}
        <div className="flex items-center justify-center h-20 border-b border-[#23263b]">
          <img src="/logo192.png" alt="Logo" className="w-10 h-10" />
        </div>

        <nav className="flex-1 flex flex-col mt-6 px-2 md:px-4 gap-4">
          {/* Main Section */}
          <SidebarSection title="Main">
            <NavItem href="/dashboard" icon={<Home size={20} />} label="Dashboard" active={pathname === "/dashboard"} />
            <NavItem href="/transactions" icon={<List size={20} />} label="Transactions" active={pathname === "/transactions"} />
          </SidebarSection>

          <Separator className="bg-[#23263b]" />

          {/* Planning Section */}
          <SidebarSection title="Planning">
            <NavItem href="/budgets" icon={<Wallet size={20} />} label="Budgets" active={pathname === "/budgets"} />
            <NavItem href="/reports" icon={<BarChart2 size={20} />} label="Reports" active={pathname === "/reports"} />
            <NavItem href="/goals" icon={<Target size={20} />} label="Goals" active={pathname === "/goals"} />
          </SidebarSection>

          <Separator className="bg-[#23263b]" />

          {/* Settings Section */}
          <div className="mt-auto pb-4">
            <SidebarSection title="Settings">
              <NavItem href="/settings" icon={<Settings size={20} />} label="Settings" muted active={pathname === "/settings"} />
            </SidebarSection>
          </div>
        </nav>
      </aside>
    </TooltipProvider>
  );
};

const SidebarSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div>
    <p className="hidden md:block text-gray-400 text-sm mb-2 px-2">{title}</p>
    {children}
  </div>
);

const NavItem = ({
  href,
  icon,
  label,
  muted = false,
  active = false
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  muted?: boolean;
  active?: boolean;
}) => {
  const baseClasses =
    "flex items-center gap-4 px-4 py-3 rounded-lg transition-colors group";
  const textColor = active
    ? "text-white bg-[#1f2236]"
    : muted
    ? "text-gray-500"
    : "text-gray-300 hover:bg-[#23263b]";
    
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <a href={href} className={`${baseClasses} ${textColor}`}>
          <span className="text-xl">{icon}</span>
          <span className="hidden md:inline text-sm">{label}</span>
        </a>
      </TooltipTrigger>
      <TooltipContent side="right" className="md:hidden">
        {label}
      </TooltipContent>
    </Tooltip>
  );
};

export default SideBar;
