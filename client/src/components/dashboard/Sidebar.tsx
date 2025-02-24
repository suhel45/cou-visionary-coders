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
      <div className="hidden md:flex flex-col w-80 h-screen bg-purple-900 text-white p-6">
        <h2 className="text-3xl p-2 text-white  rounded text-center font-bold mb-6">Dashboard</h2>
        <nav>
          <ul className="space-y-4">
            <li><Link to="/dashboard/edit/profile" className="block p-2 hover:bg-purple-500 rounded font-semibold text-xl text-center border border-white bg-purple-700">Edit Profile</Link></li>
            <li><Link to="/dashboard/analytics" className="block p-2 hover:bg-purple-500 rounded font-semibold text-xl text-center border border-white bg-purple-700">Analytics</Link></li>
            <li><Link to="/dashboard/settings" className="block p-2 hover:bg-purple-500 rounded font-semibold text-xl text-center border border-white bg-purple-700">Settings</Link></li>
          </ul>
        </nav>
      </div>
      

      <div className="md:hidden fixed top-38 left-2 z-50 flex items-center">
  {/* Curved Background */}
  {!isOpen && (
    <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-28 h-16 bg-purple-900 rounded-r-full rounded-l-[40px] shadow-lg"></div>
  )}

  {/* Sidebar Toggle Button */}
  {!isOpen && (
    <button
      onClick={toggleSidebar}
      className="relative p-3 bg-pink-600 text-white rounded-full shadow-lg z-10"
      aria-label="Open Sidebar"
      title="Open Sidebar"
    >
      <LayoutGrid size={28} />
    </button>
  )}
</div>



      {/* Sidebar for Mobile (Slide-in effect) */}
      <div
        className={`fixed top-0  left-0 h-full w-64 bg-purple-900 text-white p-4 transform transition-transform ${
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
        <h2 className=" text-white rounded text-center font-bold mb-6 text-2xl p-2">Dashboard</h2>
        <nav>
          <ul className="space-y-4">
            <li><Link to="/dashboard/edit/profile" className="block p-2 hover:bg-purple-500 rounded font-semibold text-xl text-center border border-white bg-purple-700">Edit Profile</Link></li>
            <li><Link to="/dashboard/analytics" className="block p-2 hover:bg-purple-500 rounded font-semibold text-xl text-center border border-white bg-purple-700">Analytics</Link></li>
            <li><Link to="/dashboard/settings" className="block p-2 hover:bg-purple-500 rounded font-semibold text-xl text-center border border-white bg-purple-700">Settings</Link></li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default SidebarComponent;
