import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const EXTRA_NAV_ITEMS = [
  { href: "/settings", label: "Settings" },
  // Add more extra sections here if needed
];

const TopNav: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <header className="md:hidden fixed top-0 left-0 w-full z-50 theme-sidebar backdrop-blur-lg shadow">
      <div className="flex items-center justify-between px-4 py-3">
        <span className="font-bold text-lg theme-sidebar-text">Expense Tracker</span>
        <button
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 theme-sidebar-text"
        >
          <Menu size={28} />
        </button>
      </div>
      {/* Drawer/Modal */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/40 flex">
          <div className="theme-sidebar w-64 h-full shadow-lg p-6 flex flex-col">
            <button
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="self-end mb-4 p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 theme-sidebar-text"
            >
              <X size={24} />
            </button>
            <nav className="flex flex-col gap-4">
              {EXTRA_NAV_ITEMS.map(item => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setOpen(false)}
                  className={`text-lg px-2 py-1 rounded ${
                    pathname === item.href
                      ? "theme-sidebar-active font-bold"
                      : "theme-sidebar-text hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex-1" onClick={() => setOpen(false)} />
        </div>
      )}
    </header>
  );
};

export default TopNav;