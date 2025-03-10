import React, { useState, useEffect, ChangeEvent } from 'react';
import { PreferenceInfoData } from '../../interfaces/Biodata.interface';

type PreferenceInfoProps = {
  formData: PreferenceInfoData;
  setFormData: (data: PreferenceInfoData) => void;
};

const PreferenceInfo: React.FC<PreferenceInfoProps> = ({
  formData,
  setFormData,
}) => {
  const [localFormData, setLocalFormData] =
    useState<PreferenceInfoData>(formData);

  useEffect(() => {
    setLocalFormData(formData);
  }, [formData]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updatedData = { ...localFormData, [name]: value };
    setLocalFormData(updatedData);
    setFormData(updatedData);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col items-stretch md:items-center justify-center border border-gray-400 bg-purple-100 p-2 rounded-md md:m-4 shadow-lg">
        <h2 className="heading text-sm md:text-2xl text-center">
          আপনার পছন্দ ও অভ্যাস
        </h2>
        <form className="flex flex-col items-center justify-center bg-white border-pink-600 p-2 md:p-6 my-4 rounded-md border shadow-lg gap-4">
          {[
            {
              label: 'আপনার শখ',
              name: 'hobbies',
              placeholder: 'আপনার শখ সম্পর্কে লিখুন...',
            },
            {
              label: 'আপনার শারিরীক সমস্যা আছে কি না',
              name: 'healthIssues',
              placeholder: 'যদি থাকে তবে বিস্তারিত লিখুন...',
            },
            {
              label: 'ধর্মীয় অনুশাসন কেমন মেনে চলেন',
              name: 'religiousPractice',
              placeholder: 'আপনার ধর্মীয় অভ্যাস সম্পর্কে লিখুন...',
            },
            {
              label: 'বই পড়ার অভ্যাস কেমন',
              name: 'readingHabit',
              placeholder: 'আপনার বই পড়ার অভ্যাস সম্পর্কে লিখুন...',
            },
            {
              label: 'কেমন লাইফস্টাইল পছন্দ করেন',
              name: 'lifestylePreference',
              placeholder: 'আপনার পছন্দের জীবনধারা সম্পর্কে লিখুন...',
            },
            {
              label: 'আপনার অন্যান্য আরো কিছু শেয়ার করুন',
              name: 'additionalInfo',
              placeholder: 'যেকোনো অতিরিক্ত তথ্য শেয়ার করুন...',
            },
          ].map((field) => (
            <label
              key={field.name}
              className="w-full max-w-md flex flex-col items-center font-bold text-center p-2 text-sm md:text-xl text-cyan-950"
            >
              {field.label}
              <textarea
                name={field.name}
                value={localFormData[field.name as keyof PreferenceInfoData]}
                onChange={handleChange}
                className="option-btn"
                rows={3}
                placeholder={field.placeholder}
              />
            </label>
          ))}
        </form>
      </div>
    </div>
  );
};

export default PreferenceInfo;
