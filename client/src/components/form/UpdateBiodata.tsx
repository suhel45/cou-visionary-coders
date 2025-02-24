import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import axios from "axios";
import Family from "./FamilyInfo";
import Personal from "./PersonalInfo";
import Education from "./EducationInfo";
import MarrigeInfo from "./PreferenceInfo";
import PartnerPreferences from "./PartnerInfo";
import Others from "./ContactInfo";
import Address from "./AddressInfo";

const steps: string[] = [
  "ব্যাক্তিগত তথ্য",
  "পারিবারিক তথ্য",
  "শিক্ষাগত যোগ্যতা",
  "বিবাহ সম্পর্কিত তথ্য",
  "প্রত্যাশিত জীবনসঙ্গী",
  "অন্যান্য",
  "যোগাযোগ",
];

interface FormData {
  [key: string]: string | Record<string, unknown>;
}

const UpdateBiodata: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [skipped, setSkipped] = useState<Set<number>>(new Set());
  const [formData, setFormData] = useState<FormData>({});

  const isStepSkipped = (step: number): boolean => skipped.has(step);

  const handleNext = (): void => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped);
      newSkipped.delete(activeStep);
    }
    setActiveStep((prev) => prev + 1);
    setSkipped(newSkipped);
  };

  const handleBack = (): void => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
    }
  };

  const handleSkip = (): void => {
    setSkipped((prev) => new Set(prev).add(activeStep));
    setActiveStep((prev) => prev + 1);
  };

  const handleReset = (): void => {
    setActiveStep(0);
    setSkipped(new Set());
    setFormData({});
  };

  const handleSave = async (e: React.FormEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault();
    const filteredData = Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => value !== "")
    );
    try {
      console.log(filteredData);
      await axios.post(`http://localhost:3000/update/USER_ID`, filteredData);
      handleNext();
    } catch (error) {
      console.error("Error saving biodata!", error);
    }
  };

  const getStepContent = (step: number): JSX.Element | null => {
    switch (step) {
      case 0:
        return <Personal setFormData={setFormData} formData={formData} />;
      case 1:
        return <Family setFormData={setFormData} formData={formData} />;
      case 2:
        return <Education setFormData={setFormData} formData={formData} />;
      case 3:
        return <MarrigeInfo setFormData={setFormData} formData={formData} />;
      case 4:
        return <PartnerPreferences setFormData={setFormData} formData={formData} />;
      case 5:
        return <Others setFormData={setFormData} formData={formData} />;
      case 6:
        return <Address setFormData={setFormData} formData={formData} />;
      default:
        return <Typography>Unknown step</Typography>;
    }
  };

  return (
    <Box className="md:flex md:flex-col m-4 md:p-4 p-8 rounded border-2 border-gray-100">
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={!isStepSkipped(index)} className="hidden sm:block">
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div className="text-center">
        {activeStep === steps.length ? (
          <>
            <Typography>
              <p className="p-4 md:p-20 text-green-900 md:text-4xl bg-green-100 m-2 rounded-sm font-bold">
                Your Information Updated Successfully
              </p>
            </Typography>
            <Box>
              <button onClick={handleReset} className="formbtn">
                Reset
              </button>
            </Box>
          </>
        ) : (
          <>
            {getStepContent(activeStep)}
            <Box className="flex flex-row justify-between p-4">
              <button disabled={activeStep === 0} onClick={handleBack} className="formbtn">
                Back
              </button>
              <Box />
              <div className="flex flex-row justify-center gap-2">
                <button onClick={handleSkip} className="formbtn ms-8 md:ms-0">
                  Skip
                </button>
                {activeStep === steps.length - 1 ? (
                  <button onClick={handleSave} className="formbtn">
                    Finish
                  </button>
                ) : (
                    
                  <button onClick={handleNext} className="formbtn">
                    Next
                  </button>
                )}
              </div>
            </Box>
          </>
        )}
      </div>
    </Box>
  );
};

export default UpdateBiodata;
