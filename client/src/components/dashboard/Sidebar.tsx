import { useState } from 'react';
import { LayoutGrid, X, BarChart, User, Settings, Heart, ShoppingCart, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const sidebarLinks = [
  { to: '/dashboard/', label: 'Analytics', icon: BarChart },
  { to: '/dashboard/edit/profile', label: 'Edit Biodata', icon: User },
  { to: '/dashboard/favourite', label: 'Favourite List', icon: Heart },
  { to: '/dashboard/purchase', label: 'Purchase', icon: ShoppingCart },
  { to: '/dashboard/report', label: 'Support and Report', icon: HelpCircle },
  { to: '/dashboard/settings', label: 'Settings', icon: Settings },
];

const SidebarComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="flex">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col w-80 min-h-screen bg-purple-950 text-white p-6">
        <h2 className="text-3xl p-2 text-white rounded text-center font-bold mb-6">Dashboard</h2>
        <nav className='flex flex-col items-center'>
          <ul className="space-y-4">
            {sidebarLinks.map(({ to, label, icon: Icon }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="flex items-center p-2 hover:bg-purple-500 rounded font-semibold text-sm sm:text-xl border border-white bg-purple-700"
                >
                  <Icon className="mr-2" size={24} />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Mobile Sidebar Toggle Button */}
      <div className="md:hidden fixed top-38 left-2 z-50 flex items-center">
        {!isOpen && (
          <>
            <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-28 h-16 bg-purple-950 rounded-r-full rounded-l-[40px] shadow-lg"></div>
            <button
              onClick={toggleSidebar}
              className="relative p-3 bg-pink-600 text-white rounded-full drop-shadow-xl z-10"
              aria-label="Open Sidebar"
              title="Open Sidebar"
            >
              <LayoutGrid size={28} />
            </button>
          </>
        )}
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-purple-950 text-white p-4 transform transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden z-40`}
      >
        <button
          onClick={toggleSidebar}
          className="absolute top-4 right-4 text-white"
          aria-label="Close sidebar"
          title="Close sidebar"
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl p-2 text-white rounded text-center font-bold mb-6">Dashboard</h2>
        <nav>
          <ul className="space-y-4">
            {sidebarLinks.map(({ to, label, icon: Icon }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="flex items-center p-2 hover:bg-purple-500 rounded font-semibold text-sm border border-white bg-purple-700"
                >
                  <Icon className="mr-2" size={20} />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default SidebarComponent;
