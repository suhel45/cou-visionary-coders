import { useState } from "react";
import { LayoutGrid, X } from "lucide-react";
import { Link } from "react-router-dom";

const SidebarComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex">
      {/* Sidebar for Desktop */}
      <div className="hidden md:flex flex-col w-64 h-screen bg-gray-800 text-white p-4">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <nav>
          <ul className="space-y-4">
            <li><Link to="/dashboard/profile" className="block p-2 hover:bg-gray-700 rounded">Profile</Link></li>
            <li><Link to="/dashboard/analytics" className="block p-2 hover:bg-gray-700 rounded">Analytics</Link></li>
            <li><Link to="/dashboard/settings" className="block p-2 hover:bg-gray-700 rounded">Settings</Link></li>
          </ul>
        </nav>
      </div>

      {/* Mobile Sidebar Toggle Button (Placed Below Navbar) */}
      <div className="md:hidden fixed top-38 left-2 z-50">
        {!isOpen && (
            <button
            onClick={toggleSidebar}
            className="p-3 bg-pink-800 text-white rounded-full shadow-lg"
            aria-label="Open Sidebar"
            title="Open Sidebar"
            >
            <LayoutGrid size={28} />
            </button>
        )}
        </div>

      {/* Sidebar for Mobile (Slide-in effect) */}
      <div
        className={`fixed top-0  left-0 h-full w-64 bg-gray-800 text-white p-4 transform transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden z-40`}
      >
        <button
          onClick={toggleSidebar}
          className="absolute top-4 right-4 text-white"
          aria-label={isOpen ? "Close sidebar" : "Open sidebar"} // For screen readers
         title={isOpen ? "Close sidebar" : "Open sidebar"} // Tooltip on hover
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <nav>
          <ul className="space-y-4">
            <li><Link to="/dashboard/profile" className="block p-2 hover:bg-gray-700 rounded">Profile</Link></li>
            <li><Link to="/dashboard/analytics" className="block p-2 hover:bg-gray-700 rounded">Analytics</Link></li>
            <li><Link to="/dashboard/settings" className="block p-2 hover:bg-gray-700 rounded">Settings</Link></li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default SidebarComponent;
