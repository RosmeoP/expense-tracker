import { FaHome, FaWallet, FaChartPie, FaList, FaCog, FaBullseye } from 'react-icons/fa';
import { Separator } from './ui/separator';


const SideBar = () => {
  return (
    <aside className="h-screen w-16 md:w-56 bg-black text-white flex flex-col shadow-xl" role="navigation" aria-label="Sidebar">
      {/* Logo */}
      <div className="flex items-center justify-center h-20 border-b border-[#23263b]">
        <img src="/logo192.png" alt="Logo" className="w-10 h-10" />
      </div>

      <nav className="flex-1 flex flex-col mt-6 px-2 md:px-4 gap-4">
        {/* Main Section */}
        <div>
          <p className="hidden md:block text-gray-400 text-sm mb-2 px-2">Main</p>
          <NavItem href="/dashboard" icon={<FaHome />} label="Dashboard" />
          <NavItem href="/transactions" icon={<FaList />} label="Transactions" />
        </div>

        <Separator className="bg-[#23263b]" />

        {/* Planning Section */}
        <div>
          <p className="hidden md:block text-gray-400 text-sm mb-2 px-2">Planning</p>
          <NavItem href="/budgets" icon={<FaWallet />} label="Budgets" />
          <NavItem href="/reports" icon={<FaChartPie />} label="Reports" />
          <NavItem href="/goals" icon={<FaBullseye />} label="Goals" />
        </div>

        <Separator className="bg-[#23263b]" />

        {/* Settings Section */}
        <div className="mt-auto pb-4">
          <p className="hidden md:block text-gray-400 text-sm mb-2 px-2">Settings</p>
          <NavItem href="/settings" icon={<FaCog />} label="Settings" muted />
        </div>
      </nav>
    </aside>
  );
};

const NavItem = ({ href, icon, label, muted = false }: { href: string, icon: React.ReactNode, label: string, muted?: boolean }) => (
  <a
    href={href}
    className={`flex items-center gap-4 px-4 py-3 rounded-lg transition ${
      muted ? "text-gray-400" : "text-gray-200"
    } hover:bg-[#23263b]`}
  >
    <span className="text-xl">{icon}</span>
    <span className="hidden md:inline">{label}</span>
  </a>
);

export default SideBar;
