// src/components/AddressForm.tsx
import React, { useState, useEffect } from 'react';
import subDistricts from './subDistricts'; // Import subdistrict data as an object
import districts from './districtData'; // Import district data
import { Address } from '../../interfaces/Biodata.interface'; // Import the Address interface

interface AddressFormProps {
  address: Address; // The address object (presentAddress or permanentAddress)
  onChange: (updatedAddress: Address) => void; // Callback to update the address
  title: string; // Title for the address section (e.g., "Present Address")
}

const AddressForm: React.FC<AddressFormProps> = ({
  address,
  onChange,
  title,
}) => {
  const [localAddress, setLocalAddress] = useState<Address>(address);

  // Sync localAddress with address prop
  useEffect(() => {
    setLocalAddress(address);
  }, [address]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    const updatedAddress = { ...localAddress, [name]: value };
    setLocalAddress(updatedAddress);
    onChange(updatedAddress); // Notify parent of the change
  };

  return (
    <div className="flex flex-col items-stretch md:items-center justify-between">
      <h2
        className="md:w-48 bg-violet-900 text-white my-4 py-2 px-6 shadow-sm outline  m-2 rounded-md text-center font-bold text-lg 
"
      >
        {title}
      </h2>
      <label
        className="text-sm md:text-lg font-semibold text-cyan-950 p-2  text-center
"
      >
        জেলা -{/* District */}
        <select
          name="district"
          value={localAddress.district}
          onChange={handleChange}
          className="block w-full md:w-48 bg-gray-50 text-center font-bold  rounded-md border p-2 border-slate-500  text-gray-600 shadow-lg ring-1 ring-inset ring-gray-300 focus:ring-2  focus:ring-pink-600 sm:max-w-xs text-sm sm:leading-6
"
        >
          <option>নির্বাচন করুন</option>
          {districts.map((district) => (
            <option key={district} value={district}>
              {district}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label
        className="text-sm md:text-lg font-semibold text-cyan-950 p-2  text-center
"
      >
        উপজেলা -{/* Subdistrict */}
        <select
          name="subdistrict"
          value={localAddress.subdistrict}
          onChange={handleChange}
          className="block w-full md:w-48 bg-gray-50 text-center font-bold  rounded-md border p-2 border-slate-500  text-gray-600 shadow-lg ring-1 ring-inset ring-gray-300 focus:ring-2  focus:ring-pink-600 sm:max-w-xs text-sm sm:leading-6
"
          disabled={!localAddress.district}
        >
          <option>নির্বাচন করুন</option>
          {localAddress.district &&
            subDistricts[
              localAddress.district as keyof typeof subDistricts
            ].map((subDistrict) => (
              <option key={subDistrict} value={subDistrict}>
                {subDistrict}
              </option>
            ))}
        </select>
      </label>
      <br />
      <label
        className="text-sm md:text-lg font-semibold text-cyan-950 p-2 text-center
"
      >
        গ্রাম -{/* Village */}
        <input
          name="village"
          value={localAddress.village}
          onChange={handleChange}
          className="block w-full md:w-48 bg-gray-50 text-center font-bold  rounded-md border  border-slate-500  text-gray-600 shadow-lg ring-1 ring-inset ring-gray-300 focus:ring-2  focus:ring-pink-600 sm:max-w-xs text-xs sm:leading-6
 p-2"
          disabled={!localAddress.subdistrict}
          placeholder="গ্রামের নাম"
        />
      </label>
      <br />
    </div>
  );
};

export default AddressForm;
