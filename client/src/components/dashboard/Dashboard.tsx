import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Dashboard = () => {
  return (
    <div className="flex flex-row min-h-screen" role="main">
      <Sidebar />
      <div className="flex-1 w-full md:p-6 overflow-y-auto h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;