import React from 'react';
import { PreferenceInfoData } from '../../interfaces/Biodata.interface';

interface PreferenceProps {
  data: PreferenceInfoData;
}

const PreferenceInformation: React.FC<PreferenceProps> = ({ data }) => {
  return (
    <div className="p-4 min-h-screen">
      <div className="max-w-auto mx-auto bg-purple-100 rounded-3xl shadow-lg border-4 border-purple-900 p-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-700 to-purple-800 text-white text-center py-4 rounded-2xl mb-6">
          <h1 className="text-lg font-bold">পছন্দের তথ্য</h1>
        </div>

        {/* Hobbies */}
        <div className="border-2 border-purple-700 rounded-2xl p-2 md:p-4 mb-6 bg-white text-gray-800">
          <h2 className="bg-indigo-900 text-white text-center p-2 rounded-xl mb-4">
            শখ
          </h2>
          <p className="text-sm md:text-lg p-2 text-center">
            {data.hobbies || 'তথ্য প্রদান করা হয়নি'}
          </p>
        </div>

        {/* Health Issues */}
        <div className="border-2 border-purple-700 rounded-2xl p-2 md:p-4 mb-6 bg-white text-gray-800">
          <h2 className="bg-indigo-900 text-white text-center p-2 rounded-xl mb-4">
            স্বাস্থ্য সম্পর্কিত তথ্য
          </h2>
          <p className="text-sm md:text-lg p-2 text-center">
            {data.healthIssues || 'কোন স্বাস্থ্য সমস্যা উল্লেখ করা হয়নি'}
          </p>
        </div>

        {/* Religious Practice */}
        <div className="border-2 border-purple-700 rounded-2xl p-2 md:p-4 mb-6 bg-white text-gray-800">
          <h2 className="bg-indigo-900 text-white text-center p-2 rounded-xl mb-4">
            ধর্মীয় চর্চা
          </h2>
          <p className="text-sm md:text-lg p-2 text-center">
            {data.religiousPractice || 'তথ্য প্রদান করা হয়নি'}
          </p>
        </div>

        {/* Reading Habit */}
        <div className="border-2 border-purple-700 rounded-2xl p-2 md:p-4 mb-6 bg-white text-gray-800">
          <h2 className="bg-indigo-900 text-white text-center p-2 rounded-xl mb-4">
            পড়ার অভ্যাস
          </h2>
          <p className="text-sm md:text-lg p-2 text-center">
            {data.readingHabit || 'তথ্য প্রদান করা হয়নি'}
          </p>
        </div>

        {/* Lifestyle Preference */}
        <div className="border-2 border-purple-700 rounded-2xl p-2 md:p-4 mb-6 bg-white text-gray-800">
          <h2 className="bg-indigo-900 text-white text-center p-2 rounded-xl mb-4">
            জীবনযাত্রার পছন্দ
          </h2>
          <p className="text-sm md:text-lg p-2 text-center">
            {data.lifeStylePreference || 'তথ্য প্রদান করা হয়নি'}
          </p>
        </div>

        {/* Additional Information */}
        <div className="border-2 border-purple-700 rounded-2xl p-2 md:p-4 mb-6 bg-white text-gray-800">
          <h2 className="bg-indigo-900 text-white text-center p-2 rounded-xl mb-4">
            অতিরিক্ত তথ্য
          </h2>
          <p className="text-sm md:text-lg p-2 text-center">
            {data.additionalInfo || 'কোন অতিরিক্ত তথ্য প্রদান করা হয়নি'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PreferenceInformation;