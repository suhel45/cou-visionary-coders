import React, { useState } from 'react';

type VerificationRequest = {
  userId: string;
  idCardUrl: string;
};

const sampleRequests: VerificationRequest[] = [
  {
    userId: 'user_001',
    idCardUrl: 'https://via.placeholder.com/400x250.png?text=ID+Card+1',
  },
  {
    userId: 'user_002',
    idCardUrl: 'https://via.placeholder.com/400x250.png?text=ID+Card+2',
  },
];

const VerificationRequests: React.FC = () => {
  const [requests, setRequests] = useState<VerificationRequest[]>(sampleRequests);
  const [viewImageUrl, setViewImageUrl] = useState<string | null>(null);

  const handleApprove = (userId: string) => {
    alert(`Approved ID for ${userId}`);
    setRequests((prev) => prev.filter((req) => req.userId !== userId));
  };

  const handleReject = (userId: string) => {
    alert(`Rejected ID for ${userId}`);
    setRequests((prev) => prev.filter((req) => req.userId !== userId));
  };

  return (
    <div className="p-1">
      <h2 className="text-xl md:text-2xl font-bold text-center text-indigo-700 mb-6">
        ID Verification Requests
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-md overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">User ID</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">ID Card</th>
              <th className="px-4 py-3 text-center text-sm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.userId} className="border-t">
                <td className="px-4 py-3 text-sm">{req.userId}</td>
                <td className="px-4 py-3">
                  <button
                    className="text-blue-600 font-semibold hover:underline text-xs md:text-sm"
                    onClick={() => setViewImageUrl(req.idCardUrl)}
                  >
                    View ID Card
                  </button>
                </td>
                <td className="px-4 py-3 flex justify-center gap-4">
                  <button
                    onClick={() => handleApprove(req.userId)}
                    className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 text-xs md:text-sm"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(req.userId)}
                    className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 text-xs md:text-sm"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {viewImageUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-4 rounded shadow-md max-w-lg w-full relative">
            <button
              className="absolute top-2 right-2 text-red-600 font-bold text-xl"
              onClick={() => setViewImageUrl(null)}
            >
              ×
            </button>
            <img src={viewImageUrl} alt="ID Card" className="w-full rounded" />
          </div>
        </div>
      )}
    </div>
  );
};

export default VerificationRequests;
