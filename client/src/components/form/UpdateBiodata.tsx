import React, { useState } from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

import PersonalInfo from './PersonalInfo';
import FamilyInfo from './FamilyInfo';
import EducationInfo from './EducationInfo';
import PartnerInfo from './PartnerInfo';
import PreferenceInfo from './PreferenceInfo';
import AddressInfo from './AddressInfo';
import ContactInfo from './ContactInfo';
import { FormData } from '../../interfaces/Biodata.interface';
import { CircleArrowLeft, CircleArrowRight, Check } from 'lucide-react';
import { initialFormData } from './initialFormData';
import toast from 'react-hot-toast';

const steps = [
  'Personal Information',
  'Family Information',
  'Education Information',
  'Partner Information',
  'Hobbies and Others',
  'Address',
  'Contact',
];

const MultiStepForm: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  // Initialize formData with the correct structure
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const updateFormData = (section: keyof FormData, data: any) => {
    setFormData((prev) => ({ ...prev, [section]: data }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);

    // Assuming formData contains the necessary data
    const url = `http://localhost:3000/api/profile/biodata`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          //'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
        },
        body: JSON.stringify(formData), // Convert formData to JSON
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      const data = await response.json();
      console.log('Form submitted successfully:', data);
      toast.success('Form submitted successfully.');
      setIsSubmitted(true);
    } catch (err) {
      toast.error('Failed ! Please try again.');
      setError('Failed ! Please try again.');
      console.error('Error submitting form:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setActiveStep(0);
    setFormData(initialFormData);
    setIsSubmitted(false);
  };
  const areAllFieldsFilled = (data: Record<string, any>): boolean => {
    for (const key in data) {
      const value = data[key];
      if (typeof value === 'object' && value !== null) {
        if (!areAllFieldsFilled(value)) return false; // recursively check nested fields
      } else if (
        value === '' ||
        value === null ||
        value === undefined ||
        (typeof value === 'number' && value === 0)
      ) {
        return false;
      }
    }
    return true;
  };
  
  const isCurrentStepValid = (): boolean => {
    switch (activeStep) {
      case 0:
        return areAllFieldsFilled(formData.personalInfo);
      case 1:
        return areAllFieldsFilled(formData.familyInformation);
      case 2:
        return areAllFieldsFilled(formData.education);
      case 3:
        return areAllFieldsFilled(formData.expectedLifePartner);
      case 4:
        return areAllFieldsFilled(formData.personalPreference);
      case 5:
        return areAllFieldsFilled(formData.address);
      case 6:
        return areAllFieldsFilled(formData.contactInfo);
      default:
        return false;
    }
  };
  
  
  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <PersonalInfo
            formData={formData.personalInfo}
            setFormData={(data) => updateFormData('personalInfo', data)}
          />
        );
      case 1:
        return (
          <FamilyInfo
            formData={formData.familyInformation}
            setFormData={(data) => updateFormData('familyInformation', data)}
          />
        );
      case 2:
        return (
          <EducationInfo
            formData={formData.education}
            setFormData={(data) => updateFormData('education', data)}
          />
        );
      case 3:
        return (
          <PartnerInfo
            formData={formData.expectedLifePartner}
            setFormData={(data) => updateFormData('expectedLifePartner', data)}
          />
        );
      case 4:
        return (
          <PreferenceInfo
            formData={formData.personalPreference}
            setFormData={(data) => updateFormData('personalPreference', data)}
          />
        );
      case 5:
        return (
          <AddressInfo
            formData={formData.address}
            setFormData={(data) => updateFormData('address', data)}
          />
        );
      case 6:
        return (
          <ContactInfo
            formData={formData.contactInfo}
            setFormData={(data) => updateFormData('contactInfo', data)}
          />
        );
      default:
        return (
          <ContactInfo
            formData={formData.contactInfo}
            setFormData={(data) => updateFormData('contactInfo', data)}
          />
        );
    }
  };
  console.log(formData.personalInfo)
  console.log(isCurrentStepValid())
  return (
    <div className="p-4">
      {isSubmitted ? (
        <div className="flex flex-col items-center p-4 md:p-8 m-4 rounded bg-green-100 gap-2">
          <Check className="text-white font-bold rounded-full bg-green-900 p-1" />
          <h2 className="text-lg md:text-4xl my-2 font-bold text-green-800">
            Form Submitted Successfully!
          </h2>
          <p className="text-sm font-semibold text-white bg-green-800 rounded p-2">
            Visit Your Profile for Checking Update
          </p>
          <button
            onClick={handleReset}
            className="py-2 px-4 bg-red-700 md:text-lg text-white font-semibold rounded-full shadow-md hover:bg-red-900 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-red-400 focus:ring-opacity-75"
          >
            Reset
          </button>
        </div>
      ) : (
        <>
          <div className="sm:hidden flex justify-between items-center mb-4">
            <button
              disabled={activeStep === 0}
              onClick={handleBack}
              className="border border-gray-300 rounded-full p-2 text-xs font-bold text-gray-500 flex items-center"
            >
              {activeStep > 0 ? (
                <CircleArrowLeft className="w-4 h-4 mr-2" />
              ) : null}
              {activeStep > 0 ? steps[activeStep - 1] : 'Initial State'}
            </button>
            <button
              onClick={handleNext}
              className="border border-gray-300 rounded-full p-2 text-xs font-bold text-gray-500 flex items-center"
            >
              {activeStep < steps.length - 1
                ? steps[activeStep + 1]
                : 'Final State'}
              {activeStep < steps.length - 1 ? (
                <CircleArrowRight className="w-4 h-4 ml-2" />
              ) : null}
            </button>
          </div>
          <Stepper activeStep={activeStep}>
            {steps.map((label) => (
              <Step key={label} className="hidden sm:block">
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <div className="flex flex-col justify-center">
            {getStepContent(activeStep)}
            {error && (
              <span className="text-red-800 text-center font-semibold rounded md:text-lg">
                {error}
              </span>
            )}
            <div className="flex flex-row items-center justify-between m-2 mx-6">
              <button
                disabled={activeStep === 0 || isLoading}
                onClick={handleBack}
                className="cursor-pointer py-4 px-8 bg-purple-700 md:text-xl text-white font-semibold rounded-full shadow-md hover:bg-purple-900 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-purple-400 focus:ring-opacity-75"
              >
                Back
              </button>
              <button
                onClick={
                  activeStep === steps.length - 1 ? handleSubmit : handleNext
                }
                disabled={isLoading || !isCurrentStepValid()}
                className={`py-4 px-8 md:text-xl font-semibold rounded-full shadow-md focus:outline-none focus:ring focus:ring-offset-2
                  ${isLoading || !isCurrentStepValid()
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'cursor-pointer bg-purple-700 text-white hover:bg-purple-900 focus:ring-purple-400 focus:ring-opacity-75'}
                `}
              >
                {isLoading
                  ? 'Submitting...'
                  : activeStep === steps.length - 1
                    ? 'Finish'
                    : 'Next'}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MultiStepForm;