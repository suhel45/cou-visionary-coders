import React, { useState } from 'react';
import axios from 'axios';

const DeleteAccount: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/profile/delete-biodata`,
        {
          withCredentials: true,
        },
      );
    } catch (error) {
      console.error('Error deleting account:', error);
      alert('Failed to delete account. Try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10 bg-gray-100 rounded-md">
      <button
        onClick={() => setIsOpen(true)}
        className="cursor-pointer bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded shadow transition md:m-8 "
      >
        Delete Biodata
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-100 bg-opacity-75">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-xl text-center">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              Are you sure you want to delete your account?
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              This action cannot be undone.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDelete}
                className="cursor-pointer bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded transition"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-4 py-2 rounded transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteAccount;
