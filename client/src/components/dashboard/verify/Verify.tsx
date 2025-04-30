import React, { useState, useEffect } from 'react';
import { UploadCloud, AlertCircle } from 'lucide-react';
import axios from 'axios';
import Loading from '../../../utils/Loading/Loading';

const Verify: React.FC = () => {
  const [idStatus, setIdStatus] = useState<
    'Not Submitted' | 'Pending' | 'Approved' | 'Rejected'
  >('Not Submitted');
  const [biodataCreated, setBiodataCreated] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [verificationStatus, setVerificationStatus] = useState<
    'Not Verified' | 'Verified'
  >('Not Verified');
  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if biodata is created or not
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/api/profile/biodata`,
          {
            withCredentials: true,
          },
        );
        if (response.data.success) {
          setBiodataCreated(true);
        }
      } catch (error) {
        console.error('Error fetching biodata:', error);
        setBiodataCreated(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fetch ID card status
  useEffect(() => {
    const fetchIdCardStatus = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/api/identity/status`,
          {
            withCredentials: true,
          },
        );
        setIdStatus(response.data.status);
      } catch (error) {
        console.error('Error fetching ID card status:', error);
        setError('Failed to fetch ID card status');
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

  // Handle file selection with validation
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);

    if (event.target.files?.[0]) {
      const file = event.target.files[0];

      // Validate file type
      if (!file.type.match('image.*')) {
        setError('Please select a valid image file (JPEG, PNG, etc.)');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB');
        return;
      }

      setImage(file);

      // Create image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle image upload
  const handleUpload = async () => {
    if (!image) {
      setError('Please select an image to upload');
      return;
    }

    setIsUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('studentId', image);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/upload`,
        formData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      if (response.data.success) {
        setIdStatus('Pending');
        setImage(null);
        setImagePreview(null);
      } else {
        setError(response.data.message || 'Upload failed');
      }
    } catch (error: any) {
      console.error('Error uploading ID card:', error);
      setError(
        error.response?.data?.message ||
          'Failed to upload image. Please try again.',
      );
    } finally {
      setIsUploading(false);
    }
  };

  // Determine status color classes
  const getStatusColorClass = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'text-green-600';
      case 'Pending':
        return 'text-yellow-600';
      case 'Rejected':
        return 'text-red-900';
      default:
        return 'text-red-600';
    }
  };

  if (loading) {
    return <Loading />;
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
          className={`mt-1 font-bold bg-gray-50 p-2 rounded-md ${getStatusColorClass(idStatus)}`}
        >
          {idStatus}
        </p>

        {idStatus === 'Not Submitted' && (
          <div className="mt-4 w-full max-w-md">
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 p-4 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
              <UploadCloud className="w-10 h-10 text-gray-500 mb-2" />
              <span className="text-gray-600">Upload Student ID Image</span>
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
                id="file-upload"
                data-testid="file-input"
                accept="image/*"
                disabled={isUploading}
              />
            </label>

            {error && (
              <div className="mt-2 flex items-center text-red-600">
                <AlertCircle className="w-4 h-4 mr-1" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            {imagePreview && (
              <div className="mt-3 flex flex-col items-center">
                <p className="text-sm text-green-600 mb-2">
                  Selected: {image?.name}
                </p>
                <img
                  src={imagePreview}
                  alt="ID Preview"
                  className="max-w-full h-auto max-h-40 border rounded-md"
                />
              </div>
            )}

            <button
              onClick={handleUpload}
              disabled={isUploading || !image}
              className={`mt-3 w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800 transition-colors ${
                isUploading || !image
                  ? 'opacity-60 cursor-not-allowed'
                  : 'cursor-pointer'
              }`}
            >
              {isUploading ? 'Uploading...' : 'Submit'}
            </button>
          </div>
        )}

        {idStatus === 'Rejected' && (
          <div className="mt-4 w-full max-w-md">
            <p className="text-red-700 mb-2">
              Your ID was rejected. Please upload a new one.
            </p>
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 p-4 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
              <UploadCloud className="w-10 h-10 text-gray-500 mb-2" />
              <span className="text-gray-600">Upload New Student ID Image</span>
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
                id="file-upload-retry"
                accept="image/*"
                disabled={isUploading}
              />
            </label>

            {error && (
              <div className="mt-2 flex items-center text-red-600">
                <AlertCircle className="w-4 h-4 mr-1" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            {imagePreview && (
              <div className="mt-3 flex flex-col items-center">
                <p className="text-sm text-green-600 mb-2">
                  Selected: {image?.name}
                </p>
                <img
                  src={imagePreview}
                  alt="ID Preview"
                  className="max-w-full h-auto max-h-40 border rounded-md"
                />
              </div>
            )}

            <button
              onClick={handleUpload}
              disabled={isUploading || !image}
              className={`mt-3 w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800 transition-colors ${
                isUploading || !image
                  ? 'opacity-60 cursor-not-allowed'
                  : 'cursor-pointer'
              }`}
            >
              {isUploading ? 'Uploading...' : 'Submit'}
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

        {!biodataCreated && (
          <div className="mt-2">
            <button
              onClick={() => (window.location.href = '/profile/biodata')}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800 transition-colors"
            >
              Create Biodata
            </button>
          </div>
        )}
      </div>

      {/* Profile Verification Status */}
      <div
        className={`flex flex-col items-center p-4 border border-gray-200 rounded-lg ${
          verificationStatus === 'Verified' ? 'bg-green-50' : 'bg-red-50'
        }`}
      >
        <h3 className="font-bold text-violet-800 text-center text-xl">
          Profile Verification Status
        </h3>
        <p
          className={`mt-1 text-lg font-bold bg-gray-50 p-2 rounded-md ${
            verificationStatus === 'Verified'
              ? 'text-green-700 bg-green-100'
              : 'text-red-700 bg-red-100'
          }`}
        >
          {verificationStatus}
        </p>

        {verificationStatus === 'Not Verified' && (
          <div className="mt-2 text-center text-sm text-gray-600">
            <p>To get verified, you need to:</p>
            <ul className="list-disc list-inside mt-1">
              {!biodataCreated && <li>Create your biodata</li>}
              {idStatus !== 'Approved' && (
                <li>Upload and get your student ID approved</li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Verify;
