// src/components/AddressForm.tsx
import { useState, useEffect } from 'react';
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
    <div className="flex flex-col md:items-center">
      <h2 className="subheading">{title}</h2>
      <label className="label">
        জেলা -{/* District */}
        <select
          name="district"
          value={localAddress.district}
          onChange={handleChange}
          className="option-btn"
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
      <label className="label">
        উপজেলা -{/* Subdistrict */}
        <select
          name="subdistrict"
          value={localAddress.subdistrict}
          onChange={handleChange}
          className="option-btn"
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
      <label className="label">
        গ্রাম -{/* Village */}
        <input
          name="village"
          value={localAddress.village}
          onChange={handleChange}
          className="option-btn p-2"
          disabled={!localAddress.subdistrict}
          placeholder="Enter"
        />
      </label>
      <br />
    </div>
  );
};

export default AddressForm;
