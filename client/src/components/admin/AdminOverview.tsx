import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';

// Sample data (Replace with real API data later)
const monthlyUserData = [
  { month: 'Jan', users: 30 },
  { month: 'Feb', users: 45 },
  { month: 'Mar', users: 60 },
  { month: 'Apr', users: 50 },
  { month: 'May', users: 70 },
  { month: 'Jun', users: 90 },
  { month: 'Jul', users: 75 },
  { month: 'Aug', users: 80 },
  { month: 'Sep', users: 55 },
  { month: 'Oct', users: 95 },
  { month: 'Nov', users: 100 },
  { month: 'Dec', users: 120 },
];

const biodataStats = [
  { id: 0, value: 500, label: 'Total Biodata' },
  { id: 1, value: 300, label: 'Male' },
  { id: 2, value: 200, label: 'Female' },
];

const AdminOverview: React.FC = () => {
  return (
    <div className="p-2 md:p-6 space-y-10">
      <h1 className="text-xl md:text-3xl font-bold text-indigo-900 text-center">
        Admin Overview Dashboard
      </h1>

      {/* Bar Chart */}
      <div>
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Monthly User Signups
        </h2>
        <div className="w-full overflow-x-auto m-4">
          <BarChart
            xAxis={[{ scaleType: 'band', data: monthlyUserData.map((d) => d.month) }]}
            series={[{ data: monthlyUserData.map((d) => d.users), label: 'Users' }]}
            width={700}
            height={300}
          />
        </div>
      </div>

      {/* Pie Chart */}
      <div>
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Biodata Overview
        </h2>
        <div className="w-full flex justify-center overflow-x-auto">
          <PieChart
            series={[
              {
                data: biodataStats,
                innerRadius: 30,
                outerRadius: 100,
                paddingAngle: 5,
                cornerRadius: 5,
              },
            ]}
            width={400}
            height={300}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
