import { useState, useEffect } from "react";
import subDistricts from "./subDistricts"; // Import subdistrict data as an object
import districts from "./districtData"; // Import district data

interface AddressInfoProps {
  formData: {
    guardian: string;
    guardianContact: string;
    presentVillage: string;
    presentSubDistrict: string;
    presentDistrict: string;
    permanentVillage: string;
    permanentSubDistrict: string;
    permanentDistrict: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const AddressInfo: React.FC<AddressInfoProps> = ({ formData, setFormData }) => {
  const [localFormData, setLocalFormData] = useState(formData);

  useEffect(() => {
    setLocalFormData(formData);
  }, [formData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setLocalFormData({
      ...localFormData,
      [name]: value,
    });
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="w-full">
      <div className="flex flex-col items-center border border-gray-400 bg-purple-100 p-2 rounded-md md:m-4 shadow-lg">
        <h2 className="heading">ঠিকানা</h2>
        <form className="md:items-center w-full md:w-auto bg-white border-pink-600 p-4 md:px-28 my-4 rounded-md border shadow-lg hover:shadow-lg flex flex-col gap-2">
          <h2 className="subheading">বর্তমান ঠিকানা</h2>
          <label className="label">
            জেলা -
            <select
              name="presentDistrict"
              value={localFormData.presentDistrict}
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
            উপজেলা -
            <select
              name="presentSubDistrict"
              value={localFormData.presentSubDistrict}
              onChange={handleChange}
              className="option-btn"
              disabled={!localFormData.presentDistrict}
            >
              <option>নির্বাচন করুন</option>
              {localFormData.presentDistrict &&
                subDistricts[
                  localFormData.presentDistrict as keyof typeof subDistricts
                ].map((subDistrict) => (
                  <option key={subDistrict} value={subDistrict}>
                    {subDistrict}
                  </option>
                ))}
            </select>
          </label>
          <br />
          <label className="label">গ্রাম - </label>
          <input
            name="presentVillage"
            value={localFormData.presentVillage}
            onChange={handleChange}
            className="option-btn p-2"
            disabled={!localFormData.presentSubDistrict}
            placeholder="Enter"
          />
          <br />
          <h2 className="subheading">স্থায়ী ঠিকানা</h2>
          <label className="label">
            জেলা -
            <select
              name="permanentDistrict"
              value={localFormData.permanentDistrict}
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
            উপজেলা -
            <select
              name="permanentSubDistrict"
              value={localFormData.permanentSubDistrict}
              onChange={handleChange}
              className="option-btn"
              disabled={!localFormData.permanentDistrict}
            >
              <option>নির্বাচন করুন</option>
              {localFormData.permanentDistrict &&
                subDistricts[
                  localFormData.permanentDistrict as keyof typeof subDistricts
                ].map((subDistrict) => (
                  <option key={subDistrict} value={subDistrict}>
                    {subDistrict}
                  </option>
                ))}
            </select>
          </label>
          <br />
          <label className="label">গ্রাম - </label>
          <input
            name="permanentVillage"
            value={localFormData.permanentVillage}
            onChange={handleChange}
            className="option-btn p-2"
            disabled={!localFormData.permanentSubDistrict}
            placeholder="Enter"
          />
          <br />
        </form>
      </div>
    </div>
  );
};

export default AddressInfo;
