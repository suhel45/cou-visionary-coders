import React from 'react';

interface RangeFieldProps {
  label: string;
  minName: string;
  maxName: string;
  minValue: string;
  maxValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: {
    min: string;
    max: string;
  };
}

const RangeField: React.FC<RangeFieldProps> = ({
  label,
  minName,
  maxName,
  minValue,
  maxValue,
  onChange,
  placeholder = { min: 'Min', max: 'Max' },
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={minName} className="block mb-2">{label}</label>
      <div className="flex space-x-2">
        <input
          type="number"
          name={minName}
          placeholder={placeholder.min}
          value={minValue}
          onChange={onChange}
          className="w-1/2 px-3 py-2 border rounded-md text-black"
        />
        <input
          type="number"
          name={maxName}
          placeholder={placeholder.max}
          value={maxValue}
          onChange={onChange}
          className="w-1/2 px-3 py-2 border rounded-md text-black"
        />
      </div>
    </div>
  );
};

export default RangeField;
