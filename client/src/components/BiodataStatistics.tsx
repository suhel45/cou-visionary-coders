import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Count from './Count';
import manImg from '../assets/man.png';
import womenImg from '../assets/woman.png';
import couple from '../assets/cpl.png';

interface StatsData {
  total: number;
  male: number;
  female: number;
}

const BiodataStatistics: React.FC = () => {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/stats`)
      .then(response => {
        if (response.data.success) {
          setStats(response.data.data);
        }
      })
      .catch(error => {
        console.error('Failed to fetch stats:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <h2 className="text-center text-xl sm:text-3xl rounded-full p-4 mx-4 my-2 sm:m-2 font-extrabold bg-indigo-900 text-white sm:w-1/2 sm:mx-auto">
        সেবা গ্রহীতার পরিসংখ্যান
      </h2>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-evenly gap-5 p-6">
        <Count
          imageSrc={manImg}
          title="মোট পাত্রের বায়োডাটা"
          cnt={loading ? '...' : stats?.male?.toString() || '0'}
        />
        <Count
          imageSrc={womenImg}
          title="মোট পাত্রীর বায়োডাটা"
          cnt={loading ? '...' : stats?.female?.toString() || '0'}
        />
        <Count
          imageSrc={couple}
          title="মোট পাত্র-পাত্রীর বায়োডাটা"
          cnt={loading ? '...' : stats?.total?.toString() || '0'}
        />
      </div>
    </>
  );
};

export default BiodataStatistics;
