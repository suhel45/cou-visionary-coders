import React, { useEffect, useState } from 'react';
import { Search, Flag, AlertTriangle } from 'lucide-react';

interface Report {
  biodataNo: string | number;  // Updated to handle both string and number types
  reason: string;
  reasonDetails: string;
  reporter: {
    email: string;
  }
}

const ReportedProfiles = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Report | 'reporter.email',
    direction: 'ascending' | 'descending'
  } | null>(null);
  
  const itemsPerPage = 10;

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = () => {
    setLoading(true);
    fetch('http://localhost:3000/api/all-reports', {
      credentials: 'include',
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch reports');
        }
        return res.json();
      })
      .then(data => {
        setReports(data.data);
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

  const requestSort = (key: keyof Report | 'reporter.email') => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Safe toString function to handle potentially null or undefined values
  const safeToString = (value: any): string => {
    if (value === null || value === undefined) return '';
    return String(value);
  };

  // Safe toLowerCase function
  const safeToLowerCase = (value: any): string => {
    return safeToString(value).toLowerCase();
  };

  const getSortedReports = (reportsArray: Report[]) => {
    if (!sortConfig) return reportsArray;
    
    return [...reportsArray].sort((a, b) => {
      if (sortConfig.key === 'reporter.email') {
        const aEmail = safeToString(a.reporter.email);
        const bEmail = safeToString(b.reporter.email);
        
        if (aEmail < bEmail) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aEmail > bEmail) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      } else {
        const aValue = safeToString(a[sortConfig.key]);
        const bValue = safeToString(b[sortConfig.key]);
        
        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      }
    });
  };

  // Filter reports based on search term with safe string conversions
  const filteredReports = reports.filter(report => 
    safeToLowerCase(report.biodataNo).includes(searchTerm.toLowerCase()) ||
    safeToLowerCase(report.reason).includes(searchTerm.toLowerCase()) ||
    safeToLowerCase(report.reasonDetails).includes(searchTerm.toLowerCase()) ||
    safeToLowerCase(report.reporter.email).includes(searchTerm.toLowerCase())
  );

  // Sort the filtered reports
  const sortedReports = getSortedReports(filteredReports);
  
  // Calculate pagination
  const totalPages = Math.ceil(sortedReports.length / itemsPerPage);
  const paginatedReports = sortedReports.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const renderSkeleton = () => (
    <tbody className="bg-white divide-y divide-gray-200">
      {[...Array(5)].map((_, idx) => (
        <tr key={idx}>
          <td className="px-6 py-4">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
          </td>
          <td className="px-6 py-4">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
          </td>
          <td className="px-6 py-4">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
          </td>
          <td className="px-6 py-4">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-40"></div>
          </td>
        </tr>
      ))}
    </tbody>
  );

  // Create a function to get appropriate badge color based on reason
  const getReasonBadgeColor = (reason: string) => {
    const reason_lower = reason.toLowerCase();
    if (reason_lower.includes('fake') || reason_lower.includes('fraud')) {
      return 'bg-red-100 text-red-800';
    } else if (reason_lower.includes('inappropriate') || reason_lower.includes('offensive')) {
      return 'bg-orange-100 text-orange-800';
    } else if (reason_lower.includes('spam')) {
      return 'bg-yellow-100 text-yellow-800';
    } else {
      return 'bg-blue-100 text-blue-800';
    }
  };

  if (loading) {
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reported Biodata No</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reason</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reason Details</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reporter Email</th>
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
        <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <div className="mb-4 text-red-500 font-medium">Failed to load reports</div>
        <button 
          onClick={fetchReports}
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
          placeholder="Search by biodata no, reason, or reporter email..."
          className="pl-10 pr-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Reset to first page when searching
          }}
        />
      </div>

      {/* Stats summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-md shadow">
          <div className="flex items-center">
            <Flag className="h-5 w-5 text-red-500 mr-2" />
            <span className="font-medium">Total Reports</span>
          </div>
          <p className="text-2xl font-bold mt-2">{reports.length}</p>
        </div>
        <div className="bg-white p-4 rounded-md shadow">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-orange-500 mr-2" />
            <span className="font-medium">Unique Profiles Reported</span>
          </div>
          <p className="text-2xl font-bold mt-2">
            {new Set(reports.map(r => String(r.biodataNo))).size}
          </p>
        </div>
        <div className="bg-white p-4 rounded-md shadow">
          <div className="flex items-center">
            <Search className="h-5 w-5 text-blue-500 mr-2" />
            <span className="font-medium">Matching Results</span>
          </div>
          <p className="text-2xl font-bold mt-2">{filteredReports.length}</p>
        </div>
      </div>

      {filteredReports.length === 0 ? (
        <div className="text-center py-10 bg-white rounded-md shadow">
          <Flag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No reported profiles found</p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto bg-white rounded-md shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => requestSort('biodataNo')}
                  >
                    <div className="flex items-center">
                      Reported Biodata No
                      {sortConfig?.key === 'biodataNo' && (
                        <span className="ml-1">
                          {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => requestSort('reason')}
                  >
                    <div className="flex items-center">
                      Reason
                      {sortConfig?.key === 'reason' && (
                        <span className="ml-1">
                          {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reason Details
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => requestSort('reporter.email')}
                  >
                    <div className="flex items-center">
                      Reporter Email
                      {sortConfig?.key === 'reporter.email' && (
                        <span className="ml-1">
                          {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedReports.map((report, idx) => {
                  const actualIdx = (currentPage - 1) * itemsPerPage + idx;
                  const isExpanded = expandedRows.includes(actualIdx);
                  const shouldTruncate = report.reasonDetails && report.reasonDetails.length > 80;
                  
                  return (
                    <tr key={actualIdx} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap font-medium">
                        {report.biodataNo}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getReasonBadgeColor(safeToString(report.reason))}`}>
                          {report.reason}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-normal">
                        {shouldTruncate && !isExpanded ? (
                          <>
                            <p>{report.reasonDetails.substring(0, 80)}...</p>
                            <button 
                              onClick={() => handleRowExpand(actualIdx)}
                              className="text-blue-500 hover:text-blue-700 text-sm mt-1"
                            >
                              Show more
                            </button>
                          </>
                        ) : (
                          <>
                            <p>{report.reasonDetails}</p>
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
                      <td className="px-6 py-4 whitespace-nowrap">
                        {report.reporter.email}
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
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredReports.length)} of {filteredReports.length} entries
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
                  {[...Array(Math.min(5, totalPages))].map((_, idx) => {
                    // Show 5 pages max with the current page in the middle when possible
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = idx + 1;
                    } else {
                      const startPage = Math.max(1, Math.min(currentPage - 2, totalPages - 4));
                      pageNum = startPage + idx;
                    }
                    
                    return (
                      <button
                        key={idx}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`px-3 py-1 rounded ${currentPage === pageNum ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
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

export default ReportedProfiles;