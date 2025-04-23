import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Dashboard = () => {
  return (
    <div className="flex flex-row min-h-screen">
      {/* Sidebar on the left */}
      <Sidebar/>

      {/* Content area beside the sidebar */}
      <div className="flex-1 w-full md:p-6 overflow-y-auto h-screen">
        <Outlet /> {/* This will render child routes dynamically */}
      </div>
    </div>
  );
};

export default Dashboard;
