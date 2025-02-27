import { useState, useEffect, ChangeEvent } from "react";

type FormDataType = {
  hobbies: string;
  healthIssues: string;
  religiousPractice: string;
  readingHabit: string;
  lifestylePreference: string;
 
  additionalInfo: string;
};

type PreferenceInfoProps = {
  formData: FormDataType;
  setFormData: (data: FormDataType) => void;
};

const PreferenceInfo: React.FC<PreferenceInfoProps> = ({ formData, setFormData }) => {
  const [localFormData, setLocalFormData] = useState<FormDataType>({
    hobbies: "",
    healthIssues: "",
    religiousPractice: "",
    readingHabit: "",
    lifestylePreference: "",
    
    additionalInfo: "",
  });

  useEffect(() => {
    setLocalFormData(formData);
  }, [formData]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setLocalFormData((prevData) => ({ ...prevData, [name]: value }));
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="w-full">
      <div className="flex flex-col items-center border border-gray-400 bg-purple-100 p-2 rounded-md md:m-4 shadow-lg">
        <h2 className="heading">আপনার পছন্দ ও অভ্যাস</h2>
        <form className="w-full md:items-center md:justify-center md:w-auto bg-white border-pink-600 p-4 md:px-28 my-4 rounded-md border shadow-lg hover:shadow-lg flex flex-col gap-2">
          <label className="label">আপনার শখ</label>
          <textarea name="hobbies" value={localFormData.hobbies} onChange={handleChange} className="option-btn p-2 w-full mb-4" rows={3} placeholder="আপনার শখ সম্পর্কে লিখুন..." />
          
          <label className="label">আপনার শারিরীক সমস্যা আছে কি না</label>
          <textarea name="healthIssues" value={localFormData.healthIssues} onChange={handleChange} className="option-btn p-2 w-full mb-4" rows={3} placeholder="যদি থাকে তবে বিস্তারিত লিখুন..." />
          
          <label className="label">ধর্মীয় অনুশাসন কেমন মেনে চলেন</label>
          <textarea name="religiousPractice" value={localFormData.religiousPractice} onChange={handleChange} className="option-btn p-2 w-full mb-4" rows={3} placeholder="আপনার ধর্মীয় অভ্যাস সম্পর্কে লিখুন..." />
          
          <label className="label">বই পড়ার অভ্যাস কেমন</label>
          <textarea name="readingHabit" value={localFormData.readingHabit} onChange={handleChange} className="option-btn p-2 w-full mb-4" rows={3} placeholder="আপনার বই পড়ার অভ্যাস সম্পর্কে লিখুন..." />
          
          <label className="label">কেমন লাইফস্টাইল পছন্দ করেন</label>
          <textarea name="lifestylePreference" value={localFormData.lifestylePreference} onChange={handleChange} className="option-btn p-2 w-full mb-4" rows={3} placeholder="আপনার পছন্দের জীবনধারা সম্পর্কে লিখুন..." />
              
          <label className="label">আপনার অন্যান্য আরো কিছু শেয়ার করতে চাইলে</label>
          <textarea name="additionalInfo" value={localFormData.additionalInfo} onChange={handleChange} className="option-btn p-2 w-full mb-4" rows={3} placeholder="যেকোনো অতিরিক্ত তথ্য শেয়ার করুন..." />
        </form>
      </div>
    </div>
  );
};

export default PreferenceInfo;
