import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../Hooks/contextApi/UserContext';
import axios from 'axios';

const UpdatePasswordForm: React.FC = () => {
  // Get AuthContext and ensure it's not null
    const authContext = useContext(AuthContext);
  
    // Check if authContext is available and extract user and logOut
    if (!authContext) {
      throw new Error('AuthContext is null');
    }
  
    const { user } = authContext;
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/reset-password`,
        {
          email: user?.email,
          currentPassword,
          newPassword,
          
        },
        {
          withCredentials: true,
        }
      );
      console.log(currentPassword, newPassword);
      setSuccessMessage(res.data.message);
      setFormData({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
    } catch (err) {
      const message = axios.isAxiosError(err)
        ? err.response?.data?.message || 'An error occurred'
        : 'An unexpected error occurred';
      setErrorMessage(message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 border rounded-lg shadow-md mt-8 bg-white">
      <h2 className="text-xl font-bold text-center text-violet-700 mb-4">Update Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          name="currentPassword"
          placeholder="Current Password"
          value={formData.currentPassword}
          onChange={handleChange}
          required
          className="w-full border rounded p-2 focus:ring-2 focus:ring-violet-500"
        />
        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={formData.newPassword}
          onChange={handleChange}
          required
          className="w-full border rounded p-2 focus:ring-2 focus:ring-violet-500"
        />
        <input
          type="password"
          name="confirmNewPassword"
          placeholder="Confirm New Password"
          value={formData.confirmNewPassword}
          onChange={handleChange}
          required
          className="w-full border rounded p-2 focus:ring-2 focus:ring-violet-500"
        />

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
