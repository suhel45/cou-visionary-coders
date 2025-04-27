import React, { useState } from 'react';
import {
  Menu,
  LayoutDashboard,
  ShieldCheck,
  Flag,
  HelpCircle,
} from 'lucide-react';
import ReportedProfiles from './ReportedProfiles';
import SupportRequests from './SupportRequests';
import AdminOverview from './AdminOverview'; 
import VerificationRequests from './VerificationRequests';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    setSidebarOpen(false);
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return <AdminOverview />; 
      case 'verification':
        return <VerificationRequests />;
      case 'reports':
        return <ReportedProfiles />;
      case 'support':
        return <SupportRequests />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 mt-0">
      {/* Sidebar */}
      <div
        className={`fixed md:static z-20 w-64 h-full bg-white shadow-lg transition-transform duration-300 ease-in-out 
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        <div className="p-4 border-b text-xl font-bold text-center text-indigo-900">
          Admin Dashboard
        </div>
        <nav className="flex flex-col p-4 space-y-4">
          <button
            onClick={() => handleSectionChange('overview')}
            className={`flex items-center gap-3 p-3 rounded-md text-gray-800 ${
              activeSection === 'overview'
                ? 'bg-purple-100 text-purple-700'
                : 'hover:bg-purple-50'
            }`}
          >
            <LayoutDashboard size={20} />
            Overview
          </button>
          <button
            onClick={() => handleSectionChange('verification')}
            className={`flex items-center gap-3 p-3 rounded-md text-gray-800 ${
              activeSection === 'verification'
                ? 'bg-purple-100 text-purple-700'
                : 'hover:bg-purple-50'
            }`}
          >
            <ShieldCheck size={20} />
            Verification Requests
          </button>
          <button
            onClick={() => handleSectionChange('reports')}
            className={`flex items-center gap-3 p-3 rounded-md text-gray-800 ${
              activeSection === 'reports'
                ? 'bg-purple-100 text-purple-700'
                : 'hover:bg-purple-50'
            }`}
          >
            <Flag size={20} />
            Reported Profiles
          </button>
          <button
            onClick={() => handleSectionChange('support')}
            className={`flex items-center gap-3 p-3 rounded-md text-gray-800 ${
              activeSection === 'support'
                ? 'bg-purple-100 text-purple-700'
                : 'hover:bg-purple-50'
            }`}
          >
            <HelpCircle size={20} />
            Support Requests
          </button>
        </nav>
      </div>

      {/* Mobile Menu Icon */}
      <div className="fixed top-0 left-0 w-full bg-white shadow-md md:hidden z-30 flex items-center justify-between p-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-purple-700 text-white p-2 rounded shadow"
          title="Toggle Sidebar"
        >
          <Menu size={24} />
        </button>
        <h1 className="text-xl font-bold text-gray-800">
          {activeSection === 'overview' && 'Overview'}
          {activeSection === 'verification' && 'Verification Requests'}
          {activeSection === 'reports' && 'Reported Profiles'}
          {activeSection === 'support' && 'Support Requests'}
        </h1>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-opacity-50 z-10 md:hidden"
        ></div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto mt-16 md:mt-0">
        <h1 className="hidden md:block text-3xl font-bold text-gray-800 mb-6">
          {activeSection === 'overview' && 'Overview'}
          {activeSection === 'verification' && 'Verification Requests'}
          {activeSection === 'reports' && 'Reported Profiles'}
          {activeSection === 'support' && 'Support Requests'}
        </h1>
        <div className="bg-white shadow rounded-lg p-6">{renderSection()}</div>
      </main>
    </div>
  );
};

export default AdminDashboard;
