import React from 'react';

interface TextFieldProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

const TextField: React.FC<TextFieldProps> = ({
  id,
  name,
  label,
  value,
  onChange,
  placeholder = '',
  className = 'w-full px-3 py-2 border rounded-md text-black',
}) => {
  return (
    <div className="mb-4">
      <label className="block mb-2" htmlFor={id}>
        {label}
      </label>
      <input
        type="text"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={className}
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextField;
