import React, { useEffect, useRef, useState } from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import axios from 'axios';
import PersonalInfo from './PersonalInfo';
import FamilyInfo from './FamilyInfo';
import EducationInfo from './EducationInfo';
import PartnerInfo from './PartnerInfo';
import PreferenceInfo from './PreferenceInfo';
import AddressInfo from './AddressInfo';
import ContactInfo from './ContactInfo';
import { FormData } from '../../interfaces/Biodata.interface';
import { CircleArrowLeft, CircleArrowRight } from 'lucide-react';
import { initialFormData } from './initialFormData';

const steps = [
  'Personal Information',
  'Family Information',
  'Education Information',
  'Partner Information',
  'Hobbies and Habits',
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
  console.log(formData);
  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const updateFormData = (section: keyof FormData, data: any) => {
    setFormData((prev) => ({ ...prev, [section]: data }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        'http://localhost:3000/api/submit',
        formData,
      );
      console.log('Form submitted successfully:', response.data);
      setIsSubmitted(true);
    } catch (err) {
      setError('Failed to submit the form. Please try again.');
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
            formData={formData.familyInfo}
            setFormData={(data) => updateFormData('familyInfo', data)}
          />
        );
      case 2:
        return (
          <EducationInfo
            formData={formData.educationInfo}
            setFormData={(data) => updateFormData('educationInfo', data)}
          />
        );
      case 3:
        return (
          <PartnerInfo
            formData={formData.PartnerInfo}
            setFormData={(data) => updateFormData('PartnerInfo', data)}
          />
        );
      case 4:
        return (
          <PreferenceInfo
            formData={formData.PreferenceInfo}
            setFormData={(data) => updateFormData('PreferenceInfo', data)}
          />
        );
      case 5:
        return (
          <AddressInfo
            formData={formData.addressInfo}
            setFormData={(data) => updateFormData('addressInfo', data)}
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
        return <div>Unknown step</div>;
    }
  };

  return (
    <div className="p-4">
      {isSubmitted ? (
        <div>
          <h2>Form Submitted Successfully!</h2>
          <button onClick={handleReset}>Reset Form</button>
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
              <span className="text-red-800 border border-red-900 bg-red-100 text-center font-semibold rounded p-2 my-2">
                {error}
              </span>
            )}
            <div className="flex flex-row items-center justify-between m-2 mx-6">
              <button
                disabled={activeStep === 0 || isLoading}
                onClick={handleBack}
                className="formbtn"
              >
                Back
              </button>
              <button
                onClick={
                  activeStep === steps.length - 1 ? handleSubmit : handleNext
                }
                disabled={isLoading}
                className="formbtn"
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
