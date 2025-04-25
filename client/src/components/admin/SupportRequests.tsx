import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';

interface SupportRequest {
  user: {
    email: string;
  }
  message: string;
}

const SupportRequests = () => {
  const [supports, setSupports] = useState<SupportRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  
  const itemsPerPage = 4;

  useEffect(() => {
    fetchSupportRequests();
  }, []);

  const fetchSupportRequests = () => {
    setLoading(true);
    fetch('http://localhost:3000/api/all-support', {
      credentials: 'include',
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch support requests');
        }
        return res.json();
      })
      .then(data => {
        setSupports(data.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  const handleRowExpand = (idx: number) => {
    if (expandedRows.includes(idx)) {
      setExpandedRows(expandedRows.filter(rowIdx => rowIdx !== idx));
    } else {
      setExpandedRows([...expandedRows, idx]);
    }
  };

  const filteredSupports = supports.filter(support => 
    support.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    support.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredSupports.length / itemsPerPage);
  const paginatedSupports = filteredSupports.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const renderSkeleton = () => (
    <tbody className="bg-white divide-y divide-gray-200">
      {[...Array(5)].map((_, idx) => (
        <tr key={idx}>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-40"></div>
          </td>
          <td className="px-6 py-4 whitespace-normal">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
          </td>
        </tr>
      ))}
    </tbody>
  );

  if (loading) {
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Support Message</th>
            </tr>
          </thead>
          {renderSkeleton()}
        </table>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <div className="mb-4 text-red-500">Failed to load support requests</div>
        <button 
          onClick={fetchSupportRequests}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search by email or message..."
          className="pl-10 pr-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Reset to first page when searching
          }}
        />
      </div>

      {filteredSupports.length === 0 ? (
        <div className="text-center py-10 bg-white rounded-md">
          <p className="text-gray-500">No support requests found</p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto bg-white rounded-md shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Support Message</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedSupports.map((support, idx) => {
                  const actualIdx = (currentPage - 1) * itemsPerPage + idx;
                  const isExpanded = expandedRows.includes(actualIdx);
                  const shouldTruncate = support.message.length > 100;
                  
                  return (
                    <tr key={actualIdx} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">{support.user.email}</td>
                      <td className="px-6 py-4 whitespace-normal">
                        {shouldTruncate && !isExpanded ? (
                          <>
                            <p>{support.message.substring(0, 100)}...</p>
                            <button 
                              onClick={() => handleRowExpand(actualIdx)}
                              className="text-blue-500 hover:text-blue-700 text-sm mt-1"
                            >
                              Show more
                            </button>
                          </>
                        ) : (
                          <>
                            <p>{support.message}</p>
                            {shouldTruncate && (
                              <button 
                                onClick={() => handleRowExpand(actualIdx)}
                                className="text-blue-500 hover:text-blue-700 text-sm mt-1"
                              >
                                Show less
                              </button>
                            )}
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination controls */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center bg-white p-4 rounded-md shadow">
              <div>
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredSupports.length)} of {filteredSupports.length} entries
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded ${currentPage === 1 ? 'bg-gray-200 text-gray-500' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                >
                  Previous
                </button>
                <div className="flex space-x-1">
                  {[...Array(totalPages)].map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentPage(idx + 1)}
                      className={`px-3 py-1 rounded ${currentPage === idx + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>
                <button 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded ${currentPage === totalPages ? 'bg-gray-200 text-gray-500' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SupportRequests;