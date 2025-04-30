// ReportedProfiles.tsx
import React, { useEffect, useState } from 'react';
import { Flag, AlertTriangle, Search } from 'lucide-react';
import { DataTable } from '../common/DataTable';

interface Report {
  biodataNo: string | number;
  reason: string;
  reasonDetails: string;
  reporter: {
    email: string;
  };
}

const ReportedProfiles = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = () => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/all-reports`, {
      credentials: 'include',
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch reports');
        }
        return res.json();
      })
      .then((data) => {
        setReports(data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  // Create a function to get appropriate badge color based on reason
  const getReasonBadgeColor = (reason: string) => {
    const reason_lower = reason.toLowerCase();
    if (reason_lower.includes('fake') || reason_lower.includes('fraud')) {
      return 'bg-red-100 text-red-800';
    } else if (
      reason_lower.includes('inappropriate') ||
      reason_lower.includes('offensive')
    ) {
      return 'bg-orange-100 text-orange-800';
    } else if (reason_lower.includes('spam')) {
      return 'bg-yellow-100 text-yellow-800';
    } else {
      return 'bg-blue-100 text-blue-800';
    }
  };

  const columns = [
    {
      key: 'biodataNo',
      header: 'Reported Biodata No',
      sortable: true,
      width: 'w-24',
    },
    {
      key: 'reason',
      header: 'Reason',
      sortable: true,
      width: 'w-32',
      render: (report: Report) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${getReasonBadgeColor(String(report.reason))}`}
        >
          {report.reason}
        </span>
      ),
    },
    {
      key: 'reasonDetails',
      header: 'Reason Details',
      width: 'w-full',
    },
    {
      key: 'reporter.email',
      header: 'Reporter Email',
      sortable: true,
      width: 'w-40',
    },
  ];

  // renderStats now accepts the filtered count
  const renderStats = (filteredCount: number) => (
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
          {new Set(reports.map((r) => String(r.biodataNo))).size}
        </p>
      </div>
      <div className="bg-white p-4 rounded-md shadow">
        <div className="flex items-center">
          <Search className="h-5 w-5 text-blue-500 mr-2" />
          <span className="font-medium">Matching Results</span>
        </div>
        <p className="text-2xl font-bold mt-2">{filteredCount}</p>
      </div>
    </div>
  );

  return (
    <DataTable<Report>
      data={reports}
      columns={columns}
      isLoading={loading}
      error={error}
      searchPlaceholder="Search by biodata no, reason, or reporter email..."
      searchFields={['biodataNo', 'reason', 'reasonDetails', 'reporter.email']}
      itemsPerPage={10}
      onRetry={fetchReports}
      expandableField="reasonDetails"
      expandableThreshold={80}
      renderStats={renderStats}
      emptyStateMessage="No reported profiles found"
      emptyStateIcon={<Flag className="h-12 w-12 text-gray-400 mx-auto mb-4" />}
      showPagination={true} // You can set this to false to remove pagination
    />
  );
};

export default ReportedProfiles;
