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
    navigate("/login");
  };

  return (
    <>
      {/* Desktop Sidebar */}
      {!mobileOnly && (
        <TooltipProvider>
          <aside
            className="hidden md:flex h-screen w-56 bg-white text-red-200 flex-col shadow-lg"
            role="navigation"
            aria-label="Sidebar"
          >
            <div className="flex flex-col items-center justify-between h-full w-full">
              <div>
                <div className="flex items-center justify-center h-20 border-b border-[#23263b]">
                  <img src="/logo192.png" alt="Logo" className="w-10 h-10" />
                </div>
                <nav className="flex-1 flex flex-col mt-6 px-4 gap-4" aria-label="Main navigation">
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
                className="flex items-center gap-4 px-4 py-3 m-4 text-red-500 rounded-2xl hover:border-red-700 transition duration-200 hover:scale-105 active:scale-95"
                aria-label="Log Out"
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
      )}
      {/* Mobile Bottom Navigation with animation */}
      <AnimatePresence>
        <motion.nav
          key="mobile-nav"
          variants={mobileNavVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[95vw] max-w-md rounded-2xl shadow-2xl border border-gray-200 flex justify-between gap-x-2 px-4 py-2 backdrop-blur-lg"
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
                    ? "text-blue-600 font-bold"
                    : "text-gray-500 hover:text-blue-500"
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
    background: "rgba(255,255,255,0.7)",
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
      <Link
        to={href}
        aria-current={active ? "page" : undefined}
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
      </Link>
    </TooltipTrigger>
    <TooltipContent side="right" className="md:block hidden">
      {label}
    </TooltipContent>
  </Tooltip>
);

export default SideBar;