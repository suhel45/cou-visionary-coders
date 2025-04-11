import React from 'react';
import { AddressInfoData } from '../../interfaces/Biodata.interface';
interface AddressInProps {
  data: AddressInfoData;
}

const AddressInformation: React.FC<AddressInProps> = ({ data }) => {
  return (
    <div className="p-4 min-h-screen">
      <div className="max-w-auto mx-auto bg-purple-100 rounded-3xl shadow-lg border-4 border-purple-900 p-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-700 to-purple-800 text-white text-center py-4 rounded-2xl mb-6">
          <h1 className="text-2xl font-bold">ঠিকানা</h1>
        </div>

        {/* Permanent Address */}
        <div className="border-2 border-purple-700 rounded-2xl p-2 md:p-4 mb-6 bg-white text-gray-800">
          <h2 className="bg-indigo-900 text-white text-center p-2 rounded-xl mb-4">
            স্থায়ী ঠিকানা
          </h2>
          <p className="text-sm md:text-lg p-2 text-center">
            <span className="font-bold">গ্রাম - </span>
            {data.permanentAddress.village}
          </p>
          <p className="text-sm md:text-lg p-2 text-center">
            <span className="font-bold">উপজেলা - </span>
            {data.permanentAddress.subdistrict}
          </p>
          <p className="text-sm md:text-lg p-2 text-center">
            <span className="font-bold">জেলা - </span>
            {data.permanentAddress.district}
          </p>
        </div>

        {/* Present Address */}
        <div className="border-2 border-purple-700 rounded-2xl p-2 md:p-4 mb-6 bg-white text-gray-800">
          <h2 className="bg-indigo-900 text-white text-center p-2 rounded-xl mb-4">
            বর্তমান ঠিকানা
          </h2>
          <p className="text-sm md:text-lg p-2 text-center">
            <span className="font-bold">গ্রাম - </span>
            {data.presentAddress.village}
          </p>
          <p className="text-sm md:text-lg p-2 text-center">
            <span className="font-bold">উপজেলা - </span>
            {data.presentAddress.subdistrict}
          </p>
          <p className="text-sm md:text-lg p-2 text-center">
            <span className="font-bold">জেলা - </span>
            {data.presentAddress.district}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddressInformation;
