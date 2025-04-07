import React, { useState, useEffect } from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { UploadCloud } from 'lucide-react';

const steps = ['Upload Student ID', 'Biodata Verification', 'Complete'];

const Verify: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [biodataCreated, setBiodataCreated] = useState<boolean | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [verificationStatus, setVerificationStatus] = useState<string>('Pending');

  useEffect(() => {
    // Fetch biodata creation status from the server
    const fetchBiodataStatus = async () => {
      try {
        const response = await fetch('/api/profile/status');
        const data = await response.json();
        setBiodataCreated(data.status);
      } catch (error) {
        console.error('Error fetching biodata status:', error);
      }
    };

    fetchBiodataStatus();
  }, []);

  const handleNext = async () => {
    if (activeStep === 1 && !biodataCreated) {
      alert('Please create your biodata before proceeding.');
      return;
    }
    if (activeStep === 1) {
      try {
        const response = await fetch('/api/verify/status');
        const data = await response.json();
        setVerificationStatus(data.status);
      } catch (error) {
        console.error('Error verifying status:', error);
      }
    }
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!image) return;
    const formData = new FormData();
    formData.append('studentId', image);

    try {
      const response = await fetch('/api/verify/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (response.ok) {
        setActiveStep(1);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white md:shadow-lg rounded-lg mt-10 md:border border-gray-200 space-y-6">
      <h2 className="text-2xl font-bold text-center text-indigo-900 mb-6">Verify Your Profile</h2>
      
      <Stepper activeStep={activeStep} alternativeLabel className="mb-6">
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <div className="p-4 text-center ">
        {activeStep === 0 && (
          <div>
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 p-4 rounded-lg cursor-pointer hover:border-blue-500">
              <UploadCloud className="w-10 h-10 text-gray-500 mb-2" />
              <span className="text-gray-600">Upload Student ID Image</span>
              <input type="file" className="hidden" onChange={handleFileChange} />
            </label>
            {image && <p className="mt-2 text-sm text-green-600">File selected: {image.name}</p>}
            <button onClick={handleUpload} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800">
              Submit ID
            </button>
          </div>
        )}

        {activeStep === 1 && (
          <div>
            <p className="text-lg text-gray-700">Checking if biodata is created...</p>
            {biodataCreated ? (
              <p className="text-green-600 mt-2">Biodata verified successfully!</p>
            ) : (
              <p className="text-red-600 mt-2">Biodata not found. Please create your biodata first.</p>
            )}
          </div>
        )}

        {activeStep === 2 && (
          <p className="text-green-800 text-xl font-bold">Verification Status: {verificationStatus}</p>
        )}
      </div>

      <div className="flex justify-between mt-6">
        <button
          disabled={activeStep === 0}
          onClick={handleBack}
          className="px-4 py-2 bg-purple-900 text-white rounded hover:bg-purple-700 cursor-pointer font-semibold"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={activeStep === steps.length - 1}
          className="px-4 py-2 bg-purple-900 text-white rounded hover:bg-purple-700 cursor-pointer font-semibold"
        >
          {activeStep === steps.length - 2 ? 'Verify' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default Verify;
