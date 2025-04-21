// src/components/AddressInfo.tsx
import React, { useState, useEffect } from 'react';
import { AddressInfoData, Address } from '../../interfaces/Biodata.interface'; // Import the AddressInfo interface
import AddressForm from './AddressForm'; // Import the reusable AddressForm component

interface AddressInfoProps {
  formData: AddressInfoData;
  setFormData: (data: AddressInfoData) => void;
}

const AddressInfo: React.FC<AddressInfoProps> = ({ formData, setFormData }) => {
  const [localFormData, setLocalFormData] = useState<AddressInfoData>(formData);

  // Sync local state with props
  useEffect(() => {
    setLocalFormData(formData);
  }, [formData]);

  // Unified handler for both Present & Permanent Address
  const handleAddressChange = (
    type: 'presentAddress' | 'permanentAddress',
    updatedAddress: Address,
  ) => {
    setLocalFormData((prev) => ({
      ...prev,
      [type]: updatedAddress,
    }));
    setFormData({
      ...localFormData,
      [type]: updatedAddress,
    });
  };

  return (
    <div className="w-full h-full border border-gray-400 bg-purple-50 rounded-md  shadow-lg md:m-4">
      <div className="flex flex-col items-stretch md:items-center   p-2 ">
        <h2
          className="bg-pink-600 text-white py-2 px-6 shadow-sm outline outline-pink-600  outline-offset-2  m-2 rounded-md text-center font-bold text-lg
"
        >
          ঠিকানা
        </h2>
        <form className="md:items-center w-full md:w-auto bg-white border-pink-600 p-4 md:px-12 my-4 rounded-md border shadow-lg hover:shadow-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
          {/* Present Address */}
          <AddressForm
            address={localFormData.presentAddress}
            onChange={(updatedAddress) =>
              handleAddressChange('presentAddress', updatedAddress)
            }
            title="বর্তমান ঠিকানা"
          />

          {/* Permanent Address */}
          <AddressForm
            address={localFormData.permanentAddress}
            onChange={(updatedAddress) =>
              handleAddressChange('permanentAddress', updatedAddress)
            }
            title="স্থায়ী ঠিকানা"
          />
        </form>
      </div>
    </div>
  );
};

export default AddressInfo;
