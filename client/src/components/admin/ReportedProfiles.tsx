import React, { useEffect, useState } from 'react';

interface Report {
  biodataNo: string;
  reason: string;
  reasonDetails: string;
  reporter:{
    email: string;
  }
}

const ReportedProfiles = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/api/all-reports',{
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        setReports(data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);
  console.log(reports);

  if (loading) {
    return <div>Loading...</div>;
  }

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
        <tbody className="bg-white divide-y divide-gray-200">
          {reports.map((report, idx) => (
            <tr key={idx}>
              <td className="px-6 py-4 whitespace-nowrap">{report.biodataNo}</td>
              <td className="px-6 py-4 whitespace-nowrap">{report.reason}</td>
              <td className="px-6 py-4 whitespace-normal break-words">{report.reasonDetails}</td>
              <td className="px-6 py-4 whitespace-nowrap">{report.reporter.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportedProfiles;