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
    <div className="w-full h-full border border-gray-400 bg-purple-50 rounded-md  shadow-lg md:m-4">
      <div className="flex flex-col items-stretch md:items-center justify-center p-2 ">
        <h2 className="bg-pink-600 text-white py-2 px-6 shadow-sm outline outline-pink-600  outline-offset-2  m-2 rounded-md text-center font-bold text-lg">
          আপনার পছন্দ ও অভ্যাস
        </h2>
        <form className="w-full md:w-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-1 bg-white border-pink-600 p-2 md:px-28 my-4 rounded-md border shadow-lg hover:shadow-lg  ">
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
              name: 'lifeStylePreference',
              placeholder: 'আপনার পছন্দের জীবনধারা সম্পর্কে লিখুন...',
            },
            {
              label: 'আপনার অন্যান্য কিছু শেয়ার করুন',
              name: 'additionalInfo',
              placeholder: 'যেকোনো অতিরিক্ত তথ্য শেয়ার করুন...',
            },
          ].map((field) => (
            <label
              key={field.name}
              className="w-full max-w-md flex flex-col items-center font-bold text-center p-2  text-sm  text-cyan-950 "
            >
              {field.label}
              <textarea
                name={field.name}
                value={localFormData[field.name as keyof PreferenceInfoData]}
                onChange={handleChange}
                className="block w-full md:w-screen bg-gray-50 p-4 font-bold  rounded-md border py-2 border-slate-500 sm:py-4 text-gray-600 shadow-lg ring-1 ring-inset ring-gray-300 focus:ring-2  focus:ring-pink-600 sm:max-w-xs text-xs sm:leading-6 my-2
"
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
