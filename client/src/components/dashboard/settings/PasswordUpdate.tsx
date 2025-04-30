import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../Hooks/contextApi/UserContext';
import axios from 'axios';
import { ValidatePassword } from '../../../utils/passwordValidation/ValidatePassword';
import { Eye, EyeOff } from 'lucide-react'; // ✅ Import icons

const UpdatePasswordForm: React.FC = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) throw new Error('AuthContext is null');

  const { user } = authContext;

  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const [visibility, setVisibility] = useState({
    currentPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleVisibility = (field: keyof typeof visibility) => {
    setVisibility((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const { currentPassword, newPassword, confirmNewPassword } = formData;

    if (newPassword !== confirmNewPassword) {
      setErrorMessage('New passwords do not match.');
      return;
    }

    const validationError = ValidatePassword(newPassword);
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/reset-password`,
        {
          email: user?.email,
          currentPassword,
          newPassword,
        },
        { withCredentials: true }
      );
      setSuccessMessage(res.data.message);
      setFormData({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
    } catch (err) {
      const message = axios.isAxiosError(err)
        ? err.response?.data?.message || 'An error occurred'
        : 'An unexpected error occurred';
      setErrorMessage(message);
    }
  };

  const renderPasswordField = (
    name: keyof typeof formData,
    placeholder: string
  ) => (
    <div className="relative">
      <input
        type={visibility[name] ? 'text' : 'password'}
        name={name}
        placeholder={placeholder}
        value={formData[name]}
        onChange={handleChange}
        required
        className="w-full border rounded p-2 pr-10 focus:ring-2 focus:ring-violet-500"
      />
      <span
        className="absolute top-2.5 right-3 cursor-pointer text-gray-500"
        onClick={() => toggleVisibility(name)}
      >
        {visibility[name] ? <EyeOff size={18} /> : <Eye size={18} />}
      </span>
    </div>
  );

  return (
    <div className="max-w-md mx-auto p-6 border rounded-lg shadow-md mt-8 bg-white">
      <h2 className="text-xl font-bold text-center text-violet-700 mb-4">
        Update Password
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {renderPasswordField('currentPassword', 'Current Password')}
        {renderPasswordField('newPassword', 'New Password')}
        {renderPasswordField('confirmNewPassword', 'Confirm New Password')}

        <button
          type="submit"
          className="w-full bg-violet-700 cursor-pointer text-white font-semibold py-2 rounded hover:bg-violet-800"
        >
          Update Password
        </button>

        {errorMessage && <p className="text-red-500 text-center text-sm">{errorMessage}</p>}
        {successMessage && <p className="text-green-600 text-center text-sm">{successMessage}</p>}
      </form>
    </div>
  );
};

export default UpdatePasswordForm;
