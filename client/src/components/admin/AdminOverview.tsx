import React, { useEffect, useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import axios from 'axios';
import Loading from '../../utils/Loading/Loading';

interface MonthlyUserStats {
  month: number;
  year: number;
  count: number;
}

interface BiodataStats {
  id: number;
  value: number;
  label: string;
}

const AdminOverview: React.FC = () => {
  const [monthlyUserData, setMonthlyUserData] = useState<
    { month: string; users: number }[]
  >([]);
  const [biodataStats, setBiodataStats] = useState<BiodataStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch user signup statistics
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/api/user-states`,
        );

        const monthNames = [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ];
        const transformedSignups = response.data.data
          .filter(
            (stat: MonthlyUserStats) =>
              stat.month !== null && stat.month !== undefined,
          )
          .map((stat: MonthlyUserStats) => ({
            month: monthNames[stat.month - 1],
            users: stat.count,
          }));

        const allMonths = monthNames.map((month) => {
          const existing = transformedSignups.find(
            (item) => item.month === month,
          );
          return existing || { month, users: 0 };
        });

        setMonthlyUserData(allMonths);

        // Fetch biodata statistics
        const biodataResponse = await axios.get(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/api/stats`,
        );

        setBiodataStats([
          {
            id: 0,
            value: biodataResponse.data.data.total,
            label: `Total Biodata : ${biodataResponse.data.data.total}`,
          },
          {
            id: 1,
            value: biodataResponse.data.data.male,
            label: `Male Biodata : ${biodataResponse.data.data.male}`,
          },
          {
            id: 2,
            value: biodataResponse.data.data.female,
            label: `Female Biodata: ${biodataResponse.data.data.female}`,
          },
        ]);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Loading />;

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="p-2 md:p-6 space-y-10 w-full">
      <h1 className="text-xl md:text-3xl font-bold text-indigo-900 text-center">
        Admin Overview Dashboard
      </h1>

      <div className="flex flex-col md:flex-row gap-6 w-full">
        {/* Bar Chart */}
        <div className="flex-1 min-w-[300px] bg-white rounded shadow p-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Monthly User Signups
          </h2>
          <div className="w-full overflow-x-auto">
            {monthlyUserData.length > 0 ? (
              <BarChart
                xAxis={[
                  {
                    scaleType: 'band',
                    data: monthlyUserData.map((d) => d.month),
                  },
                ]}
                series={[
                  {
                    data: monthlyUserData.map((d) => d.users),
                    label: 'Users',
                    valueFormatter: (value) =>
                      value !== null && value !== undefined
                        ? value.toString()
                        : '',
                    color: '#6366f1',
                  },
                ]}
                height={300}
              />
            ) : (
              <p className="text-center text-gray-500">No data available</p>
            )}
          </div>
        </div>

        {/* Pie Chart */}
        <div className="flex-1 min-w-[300px] bg-white rounded shadow p-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Biodata Overview
          </h2>
          <div className="w-full flex justify-center overflow-x-auto">
            {biodataStats.length > 0 ? (
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
                height={300}
              />
            ) : (
              <p className="text-center text-gray-500">No data available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
