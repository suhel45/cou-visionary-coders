// SupportRequests.tsx
import React, { useEffect, useState } from 'react';
import { MessageSquare, Search } from 'lucide-react';
import { DataTable } from '../common/DataTable';

interface SupportRequest {
  user: {
    email: string;
  };
  message: string;
}

const SupportRequests = () => {
  const [supports, setSupports] = useState<SupportRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSupportRequests();
  }, []);

  const fetchSupportRequests = () => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/all-support`, {
      credentials: 'include',
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch support requests');
        }
        return res.json();
      })
      .then((data) => {
        setSupports(data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  const columns = [
    {
      key: 'user.email',
      header: 'User Email',
      sortable: true,
      width: 'w-40',
    },
    {
      key: 'message',
      header: 'Support Message',
      width: 'w-full',
    },
  ];

  // Optional stats display for support requests
  const renderStats = (filteredCount: number) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-white p-4 rounded-md shadow">
        <div className="flex items-center">
          <MessageSquare className="h-5 w-5 text-blue-500 mr-2" />
          <span className="font-medium">Total Support Requests</span>
        </div>
        <p className="text-2xl font-bold mt-2">{supports.length}</p>
      </div>
      <div className="bg-white p-4 rounded-md shadow">
        <div className="flex items-center">
          <Search className="h-5 w-5 text-green-500 mr-2" />
          <span className="font-medium">Matching Results</span>
        </div>
        <p className="text-2xl font-bold mt-2">{filteredCount}</p>
      </div>
    </div>
  );

  return (
    <DataTable<SupportRequest>
      data={supports}
      columns={columns}
      isLoading={loading}
      error={error}
      searchPlaceholder="Search by email or message..."
      searchFields={['user.email', 'message']}
      itemsPerPage={10}
      onRetry={fetchSupportRequests}
      expandableField="message"
      expandableThreshold={100}
      renderStats={renderStats}
      emptyStateMessage="No support requests found"
      emptyStateIcon={
        <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
      }
      showPagination={true} // Set to false to remove pagination
    />
  );
};

export default SupportRequests;
