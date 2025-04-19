import React from 'react';

interface Option {
  value: string;
  label: string;
}

interface SelectFieldProps {
  id: string;
  name: string;
  label: string;
  value: string;
  options: Option[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  required?: boolean;
  error?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  id,
  name,
  label,
  value,
  options,
  onChange,
  className = 'w-full px-3 py-2 border rounded-md text-black',
  disabled = false,
  placeholder,
  required = false,
  error,
}) => {
  return (
    <div className="mb-4">
      <label className="block mb-2" htmlFor={id}>
      {required && <span className="text-red-500 mr-1">*</span>}
        {label}
      </label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={`${className} ${error ? 'border-red-500' : ''}`}
        disabled={disabled}
        aria-required={required}
        aria-invalid={!!error}
      >
        {placeholder && (
           <option value="" disabled>
             {placeholder}
           </option>
         )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default SelectField;
