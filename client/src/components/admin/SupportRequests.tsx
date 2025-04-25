import React, { useEffect, useState } from 'react';

interface SupportRequest {
  user:{
    email: string;
  }
  message: string;
}

const SupportRequests = () => {
  const [supports, setSupports] = useState<SupportRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/api/all-support', {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        setSupports(data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);
  console.log(supports);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Support Message</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {supports.map((support, idx) => (
            <tr key={idx}>
              <td className="px-6 py-4 whitespace-nowrap">{support.user.email}</td>
              <td className="px-6 py-4 whitespace-normal break-words">{support.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SupportRequests;