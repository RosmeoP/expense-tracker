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
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/transactions", label: "Transactions", icon: ScanLine },
  { href: "/budgets", label: "Budgets", icon: Wallet },
  { href: "/reports", label: "Reports", icon: ChartPie },
  { href: "/goals", label: "Goals", icon: Trophy },
  { href: "/settings", label: "Settings", icon: Settings }
];

type SideBarProps = {
  mobileOnly?: boolean;
};

const SideBar: React.FC<SideBarProps> = ({ mobileOnly = false }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      {/* Desktop Sidebar */}
      {!mobileOnly && (
        <TooltipProvider>
          <aside
            className="hidden md:flex fixed left-0 top-0 h-full w-64 theme-sidebar flex-col shadow-lg z-30 overflow-y-auto"
            role="navigation"
            aria-label="Sidebar"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-center h-20 border-b theme-sidebar flex-shrink-0">
                <img src="/logo192.png" alt="Logo" className="w-10 h-10" />
              </div>
              
              {/* Navigation */}
              <nav className="flex-1 flex flex-col mt-6 px-4 gap-4 overflow-y-auto" aria-label="Main navigation">
                <SidebarSection title="Main">
                  {NAV_ITEMS.slice(0, 2).map(item => (
                    <NavItem key={item.href} {...item} active={pathname === item.href} />
                  ))}
                </SidebarSection>
                
                <Separator className="bg-gray-200 dark:bg-gray-700" />
                
                <SidebarSection title="Planning">
                  {NAV_ITEMS.slice(2, 5).map(item => (
                    <NavItem key={item.href} {...item} active={pathname === item.href} />
                  ))}
                </SidebarSection>
                
                <Separator className="bg-gray-200 dark:bg-gray-700" />
                
                <SidebarSection title="Account">
                  <NavItem {...NAV_ITEMS[5]} active={pathname === NAV_ITEMS[5].href} />
                </SidebarSection>
              </nav>
              
              {/* Log Out Button */}
              <div className="flex-shrink-0 p-4 border-t theme-sidebar">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-3 w-full text-red-500 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition duration-200 hover:scale-105 active:scale-95"
                  aria-label="Log Out"
                >
                  <span className="text-xl">
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <span className="text-sm font-medium">Log Out</span>
                </button>
              </div>
            </div>
          </aside>
        </TooltipProvider>
      )}
      
      {/* Mobile Bottom Navigation */}
      {mobileOnly && (
        <AnimatePresence>
          <motion.nav
            key="mobile-nav"
            variants={mobileNavVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[95vw] max-w-md theme-sidebar backdrop-blur-lg rounded-2xl shadow-2xl border flex justify-between gap-x-2 px-4 py-2"
            role="navigation"
            aria-label="Mobile Navigation"
          >
            {NAV_ITEMS.slice(0, 5).map(item => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex flex-col items-center justify-center flex-1 py-1 px-2 transition ${
                    isActive
                      ? "theme-sidebar-active font-bold rounded-lg"
                      : "theme-sidebar-text hover:opacity-80"
                  }`}
                >
                  <motion.span
                    animate={isActive ? { scale: 1.25, y: -6, filter: "drop-shadow(0 0 8px #3b82f6)" } : { scale: 1, y: 0, filter: "none" }}
                    transition={{ type: "spring", stiffness: 500, damping: 20 }}
                    className="mb-0.5"
                  >
                    <Icon size={26} />
                  </motion.span>
                  <span className="text-[11px]">{item.label}</span>
                </Link>
              );
            })}
          </motion.nav>
        </AnimatePresence>
      )}
    </>
  );
};

import type { Variants } from "framer-motion";

const mobileNavVariants: Variants = {
  hidden: { 
    y: 80, 
    opacity: 0, 
    filter: "blur(12px)", 
    background: "rgba(255,255,255,0.2)" 
  },
  visible: { 
    y: 0, 
    opacity: 1, 
    filter: "blur(0px)", 
    background: "rgba(255,255,255,0.8)",
    transition: { 
      y: { type: "spring" as const, stiffness: 400, damping: 28 },
      opacity: { duration: 0.25 },
      filter: { duration: 0.3 },
      background: { duration: 0.3 }
    }
  },
  exit: { 
    y: 80, 
    opacity: 0, 
    filter: "blur(12px)", 
    background: "rgba(255,255,255,0.2)",
    transition: { duration: 0.25 }
  }
};

const SidebarSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-2">
    <p className="theme-sidebar-text text-xs font-semibold uppercase tracking-wider mb-3 px-2 opacity-70">{title}</p>
    <div className="space-y-1">
      {children}
    </div>
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
      <Link
        to={href}
        aria-current={active ? "page" : undefined}
        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative
          ${
            active
              ? "theme-sidebar-active shadow-md"
              : muted
              ? "theme-sidebar-text opacity-50 hover:opacity-70"
              : "theme-sidebar-text"
          }`}
      >
        {active && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-300 rounded-r-full" />
        )}
        <span className={`${active ? 'text-white' : 'text-current'}`}>
          <Icon size={18} />
        </span>
        <span className="text-sm font-medium">{label}</span>
      </Link>
    </TooltipTrigger>
    <TooltipContent side="right" className="md:block hidden">
      {label}
    </TooltipContent>
  </Tooltip>
);

export default SideBar;