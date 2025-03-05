import React from "react";
import { GardianInfo } from "../../interfaces/Biodata.interface";

interface GuardianInfoFormProps {
  label: string;
  guardian: GardianInfo;
  onChange: (updatedGuardian: GardianInfo) => void;
}

const GuardianInfoForm: React.FC<GuardianInfoFormProps> = ({
  label,
  guardian,
  onChange,
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const newValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    
    onChange({
      ...guardian,
      [name]: newValue,
    });
  };

  return (
    <div className="flex flex-col items-stretch sm:items-center sm:justify-center justify-stretch border border-gray-400  p-2 rounded-md shadow-lg">
      <h2 className="subheading">{label}</h2>

      <div className="flex flex-row items-stretch gap-4 border border-gray-400 p-2 rounded">
        <label className="flex items-center  space-x-2">
          <input
            type="checkbox"
            checked={guardian.aliveStatus}
            onChange={() => onChange({ ...guardian, aliveStatus: true })}
            className="accent-green-600 md:h-4 md:w-4"
          />
          <span className="md:text-lg font-semibold text-gray-700">জীবিত</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={!guardian.aliveStatus}
            onChange={() => onChange({ ...guardian, aliveStatus: false })}
            className="accent-red-600 md:h-4 md:w-4"
          />
          <span className="md:text-lg font-semibold text-gray-700">মৃত</span>
        </label>
      </div>

      <label className="label">
        পেশা{/* Profession */}
        <input
          type="text"
          name="profession"
          value={guardian.profession}
          onChange={handleChange}
          className="option-btn p-2 "
          placeholder="পেশা , বিবরণসহ"
        />
      </label>
    </div>
  );
};

export default GuardianInfoForm;
