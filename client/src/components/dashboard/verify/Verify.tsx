import React, { useState, useEffect } from 'react';
import { UploadCloud } from 'lucide-react';
import axios from 'axios';
import Loading from '../../../utils/Loading/Loading';
const Verify: React.FC = () => {
  const [idStatus, setIdStatus] = useState<
    'Not Submitted' | 'Pending' | 'Approved'
  >('Not Submitted');
  const [biodataCreated, setBiodataCreated] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);
  const [verificationStatus, setVerificationStatus] = useState<
    'Not Verified' | 'Verified'
  >('Not Verified');
  const [loading, setLoading] = useState(true);

  // Check if biodata is created or not
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:3000/api/profile/biodata`,
          {
            withCredentials: true,
          },
        );
        if (response.data.success) {
          setBiodataCreated(true);
        }
        console.log('Response ', response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setBiodataCreated(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Fetch ID card status using userId
    const fetchIdCardStatus = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/identity/status`,
          {
            withCredentials: true,
          },
        );
        setIdStatus(response.data.status);
        console.log('ID Card Status:', response.data.status);
      } catch (error) {
        console.error('Error fetching ID card status:', error);
      }
    };

    fetchIdCardStatus();
  }, []);
  // Final verification logic
  useEffect(() => {
    if (idStatus === 'Approved' && biodataCreated) {
      setVerificationStatus('Verified');
    } else {
      setVerificationStatus('Not Verified');
    }
  }, [idStatus, biodataCreated]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      setImage(event.target.files[0]);
    }
  };
  if (loading) {
    return <Loading />;
  }
  //! file upload handling logic
  const handleUpload = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append('studentId', image); // This must match your multer field name

    console.log(formData);

    try {
      await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/upload`, {
        method: 'POST',
        body: formData,
      });

      setIdStatus('Pending');
    } catch (error) {
      console.error('Error uploading ID card:', error);
    }
  };
  let statusColorClass = '';

  if (idStatus === 'Approved') {
    statusColorClass = 'text-green-600';
  } else if (idStatus === 'Pending') {
    statusColorClass = 'text-yellow-600';
  } else {
    statusColorClass = 'text-red-600';
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white md:shadow-lg rounded-lg mt-10 md:border border-gray-200 space-y-6">
      <h2 className="text-4xl font-bold text-center text-indigo-900 mb-6">
        Profile Verification
      </h2>

      {/* Student Identity Status */}
      <div className="flex flex-col items-center p-4 border border-gray-200 rounded-lg">
        <h3 className="font-bold text-violet-800 text-center text-xl">
          Student Identity Status
        </h3>
        <p
          className={`mt-1 font-bold bg-gray-50 p-2 rounded-md ${statusColorClass}`}
        >
          {idStatus}
        </p>

        {idStatus === 'Not Submitted' && (
          <div className="mt-4">
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 p-4 rounded-lg cursor-pointer hover:border-blue-500">
              <UploadCloud className="w-10 h-10 text-gray-500 mb-2" />
              <span className="text-gray-600">Upload Student ID Image</span>
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>

            {image && (
              <p className="mt-2 text-sm text-green-600">
                Selected: {image.name}
              </p>
            )}

            <button
              onClick={handleUpload} // Ensure userId is not null
              className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800 cursor-pointer"
            >
              Submit
            </button>
          </div>
        )}
      </div>

      {/* Biodata Creation Status */}
      <div className="flex flex-col items-center p-4 border border-gray-200 rounded-lg">
        <h3 className="font-bold text-violet-800 text-center text-xl">
          Biodata Creation Status
        </h3>
        <p
          className={`mt-1 font-bold bg-gray-50 p-2 rounded-md ${biodataCreated ? 'text-green-600' : 'text-red-600'}`}
        >
          {biodataCreated ? 'Success' : 'Not Created'}
        </p>
      </div>

      {/* Profile Verification Status */}
      <div
        className={`flex flex-col items-center p-4 border border-gray-200 rounded-lg ${verificationStatus === 'Verified' ? ' bg-green-50' : ' bg-red-50'}`}
      >
        <h3 className="font-bold text-violet-800 text-center text-xl">
          Profile Verification Status
        </h3>
        <p
          className={`mt-1 text-lg font-bold bg-gray-50 p-2 rounded-md ${verificationStatus === 'Verified' ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'}`}
        >
          {verificationStatus}
        </p>
      </div>
    </div>
  );
};

export default Verify;
