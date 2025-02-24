import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar on the left */}
      <Sidebar />

      {/* Content area beside the sidebar */}
      <div className="flex-1 p-6">
        <Outlet /> {/* This will render child routes dynamically */}
      </div>
    </div>
  );
};

export default Dashboard;
