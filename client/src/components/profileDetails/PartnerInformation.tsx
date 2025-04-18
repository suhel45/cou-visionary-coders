import React from 'react';
import { PartnerInfoData } from '../../interfaces/Biodata.interface';

interface PartnerProps {
  data: PartnerInfoData;
}

const PartnerInformation: React.FC<PartnerProps> = ({ data }) => {
  return (
    <div className="p-4 min-h-screen">
      <div className="max-w-auto mx-auto bg-purple-100 rounded-3xl shadow-lg border-4 border-purple-900 p-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-700 to-purple-800 text-white text-center py-4 rounded-2xl mb-6">
          <h1 className="text-2xl font-bold">প্রত্যাশিত জীবনসঙ্গীর তথ্য</h1>
        </div>

        {/* Partner Information */}
        <div className="border-2 border-purple-700 rounded-2xl p-2 md:p-4 mb-6 bg-white text-gray-800">
          <p className="text-sm md:text-lg p-2 text-center">
            <span className="font-bold">বয়স - </span>
            {data.age}
          </p>
          <p className="text-sm md:text-lg p-2 text-center">
            <span className="font-bold">গাত্রবর্ণ - </span>
            {data.complexion}
          </p>
          <p className="text-sm md:text-lg p-2 text-center">
            <span className="font-bold">উচ্চতা - </span>
            {data.height}
          </p>
          <p className="text-sm md:text-lg p-2 text-center">
            <span className="font-bold">জেলা - </span>
            {data.district}
          </p>
          <p className="text-sm md:text-lg p-2 text-center">
            <span className="font-bold">বৈবাহিক অবস্থা - </span>
            {data.maritalStatus}
          </p>
          <p className="text-sm md:text-lg p-2 text-center">
            <span className="font-bold">পেশা - </span>
            {data.profession}
          </p>
          <p className="text-sm md:text-lg p-2 text-center">
            <span className="font-bold">আর্থিক অবস্থা - </span>
            {data.financialCondition}
          </p>
          <p className="text-sm md:text-lg p-2 text-center">
            <span className="font-bold">প্রত্যাশিত গুণাবলী - </span>
            {data.expectedQualities}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PartnerInformation;
