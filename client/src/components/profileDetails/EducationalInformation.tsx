import React from 'react';
import { EducationInfoData } from '../../interfaces/Biodata.interface';

interface EducationProps {
  data: EducationInfoData;
}

const EducationInformation: React.FC<EducationProps> = ({ data }) => {
  return (
    <div className="p-4 min-h-screen">
      <div className="max-w-auto mx-auto bg-purple-100 rounded-3xl shadow-lg border-4 border-purple-900 p-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-700 to-purple-800 text-white text-center py-4 rounded-2xl mb-6">
          <h1 className="text-2xl font-bold">শিক্ষাগত তথ্য</h1>
        </div>

        {/* Secondary Education (SSC) */}
        <div className="border-2 border-purple-700 rounded-2xl p-2 md:p-4 mb-6 bg-white text-gray-800">
          <h2 className="bg-indigo-900 text-white text-center p-2 rounded-xl mb-4">
            মাধ্যমিক
          </h2>
          <p className="text-sm md:text-lg p-2 text-center">
            <span className="font-bold">জিপিএ - </span>
            {data.ssc.gpa}
          </p>
          <p className="text-sm md:text-lg p-2 text-center">
            <span className="font-bold">পাশের সন - </span>
            {data.ssc.passingYear}
          </p>
          <p className="text-sm md:text-lg p-2 text-center">
            <span className="font-bold">বিভাগ - </span>
            {data.ssc.group}
          </p>
        </div>

        {/* Higher Secondary Education (HSC) */}
        <div className="border-2 border-purple-700 rounded-2xl p-2 md:p-4 mb-6 bg-white text-gray-800">
          <h2 className="bg-indigo-900 text-white text-center p-2 rounded-xl mb-4">
            উচ্চ মাধ্যমিক
          </h2>
          <p className="text-sm md:text-lg p-2 text-center">
            <span className="font-bold">জিপিএ - </span>
            {data.hsc.gpa}
          </p>
          <p className="text-sm md:text-lg p-2 text-center">
            <span className="font-bold">পাশের সন - </span>
            {data.hsc.passingYear}
          </p>
          <p className="text-sm md:text-lg p-2 text-center">
            <span className="font-bold">বিভাগ - </span>
            {data.hsc.group}
          </p>
        </div>

        {/* Bachelor's Education (Honours) */}
        <div className="border-2 border-purple-700 rounded-2xl p-2 md:p-4 mb-6 bg-white text-gray-800">
          <h2 className="bg-indigo-900 text-white text-center p-2 rounded-xl mb-4">
            বিশ্ববিদ্যালয় (অনার্স)
          </h2>
          <p className="text-sm md:text-lg p-2 text-center">
            <span className="font-bold">অনুষদ - </span>
            {data.university.honours.faculty}
          </p>
          <p className="text-sm md:text-lg p-2 text-center">
            <span className="font-bold">বিভাগ - </span>
            {data.university.honours.department}
          </p>
          <p className="text-sm md:text-lg p-2 text-center">
            <span className="font-bold">সেশন - </span>
            {data.university.honours.session}
          </p>
        </div>

        {/* Master's Education (Masters) */}
        <div className="border-2 border-purple-700 rounded-2xl p-2 md:p-4 mb-6 bg-white text-gray-800">
          <h2 className="bg-indigo-900 text-white text-center p-2 rounded-xl mb-4">
            বিশ্ববিদ্যালয় (মাস্টার্স)
          </h2>
          <p className="text-sm md:text-lg p-2 text-center">
            <span className="font-bold">অনুষদ - </span>
            {data.university.masters?.faculty}
          </p>
          <p className="text-sm md:text-lg p-2 text-center">
            <span className="font-bold">বিভাগ - </span>
            {data.university.masters?.department}
          </p>
          <p className="text-sm md:text-lg p-2 text-center">
            <span className="font-bold">সেশন - </span>
            {data.university.masters?.session}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EducationInformation;
