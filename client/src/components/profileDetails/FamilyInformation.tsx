import React from 'react';
import { FamilyInfoData } from '../../interfaces/Biodata.interface';

interface FamilyInfoProps {
  data: FamilyInfoData;
}

const FamilyInformation: React.FC<FamilyInfoProps> = ({ data }) => {
  return (
    <div className="p-4 min-h-screen">
      <div className="max-w-auto mx-auto bg-purple-100 rounded-3xl shadow-lg border-4 border-purple-900 p-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-700 to-purple-800 text-white text-center py-4 rounded-2xl mb-6">
          <h1 className="text-2xl font-bold">পারিবারিক তথ্য</h1>
        </div>

        {/* Father Information */}
        <div className="border-2 border-purple-700 rounded-2xl p-2 md:p-4 mb-6 bg-white text-gray-800">
          <h2 className="bg-indigo-900 text-white text-center p-2 rounded-xl mb-4">
            পিতা
          </h2>
          <p className="text-sm md:text-lg p-2 text-center">
            <span className="font-bold">অবস্থা - </span>
            {data?.father?.aliveStatus || 'N/A'}
          </p>
          <p className="text-sm md:text-lg p-2 text-center">
            <span className="font-bold">পেশা - </span>
            {data?.father?.profession || 'N/A'}
          </p>
        </div>

        {/* Mother Information */}
        <div className="border-2 border-purple-700 rounded-2xl p-2 md:p-4 mb-6 bg-white text-gray-800">
          <h2 className="bg-indigo-900 text-white text-center p-2 rounded-xl mb-4">
            মাতা
          </h2>
          <p className="text-sm md:text-lg p-2 text-center">
            <span className="font-bold">অবস্থা - </span>
            {data.mother.aliveStatus}
          </p>
          <p className="text-sm md:text-lg p-2 text-center">
            <span className="font-bold">পেশা - </span>
            {data.mother.profession}
          </p>
        </div>

        {/* Sibling Information */}
        <div className="border-2 border-purple-700 rounded-2xl p-2 md:p-4 mb-6 bg-white text-gray-800">
          <h2 className="bg-indigo-900 text-white text-center p-2 rounded-xl mb-4">
            ভাই-বোনের তথ্য
          </h2>
          <p className="text-sm md:text-lg p-2 text-center">
            <span className="font-bold">ভাইয়ের সংখ্যা - </span>
            {data?.siblings?.brotherInfo || 'N/A'}
          </p>
          <p className="text-sm md:text-lg p-2 text-center">
            <span className="font-bold">বোনের সংখ্যা - </span>
            {data.siblings.sisterInfo}
          </p>
          <p className="text-sm md:text-lg p-2 text-center">
            <span className="font-bold">সম্পর্ক - </span>
            {data?.siblings?.aboutSiblings || 'N/A'}
          </p>
        </div>

        {/* Economic Information */}
        <div className="border-2 border-purple-700 rounded-2xl p-2 md:p-4 mb-6 bg-white text-gray-800">
          <h2 className="bg-indigo-900 text-white text-center p-2 rounded-xl mb-4">
            পারিবারিক আর্থিক অবস্থা
          </h2>
          <p className="text-sm md:text-lg p-2 text-center">
            <span className="font-bold">অবস্থা - </span>
            {data.financialStatus}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FamilyInformation;
