import React from 'react';
import { GardianInfo } from '../../interfaces/Biodata.interface';

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
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value, type } = e.target;
    const newValue =
      type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

    onChange({
      ...guardian,
      [name]: newValue,
    });
  };

  return (
    <div className="flex flex-col items-stretch md:items-center md:justify-center justify-stretch  rounded-md ">
      <h2
        className=" bg-violet-900 text-white  py-2 px-8 shadow-sm outline  mx-2 rounded-md text-center font-bold text-lg 
"
      >
        {label}
      </h2>

      <div className="flex flex-row items-stretch gap-2  p-2 rounded ">
        <p className="text-violet-900 text-sm sm:text-lg font-bold">
          বর্তমান অবস্থা -{' '}
        </p>
        <label className="flex items-center  space-x-2">
          <input
            type="checkbox"
            checked={guardian.aliveStatus === 'জীবিত'}
            onChange={() => onChange({ ...guardian, aliveStatus: 'জীবিত' })}
            className="accent-green-600 md:h-4 md:w-4"
          />
          <span className="md:text-lg font-semibold text-gray-700">জীবিত</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={guardian.aliveStatus === 'মৃত'}
            onChange={() => onChange({ ...guardian, aliveStatus: 'মৃত' })}
            className="accent-red-600 md:h-4 md:w-4"
          />
          <span className="md:text-lg font-semibold text-gray-700">মৃত</span>
        </label>
      </div>

      <label
        className="text-center text-sm md:text-lg font-semibold text-cyan-950 p-2  text-center
"
      >
        পেশা{/* Profession */}
        <textarea
          name="profession"
          value={guardian.profession}
          onChange={handleChange}
          className="block w-full md:w-screen bg-gray-50  font-bold  rounded-md border py-2 border-slate-500 sm:p-4 text-gray-600 shadow-lg ring-1 ring-inset ring-gray-300 focus:ring-2  focus:ring-pink-600 sm:max-w-xs text-xs sm:leading-6
 p-2 "
          placeholder="পেশা , বিবরণসহ"
          rows={3}
          minLength={3}
          required
        />
      </label>
    </div>
  );
};

export default GuardianInfoForm;
