import React, { useState } from 'react';

// Define search parameters interface for reusability
export interface SearchParams {
  gender?: string;
  maritalStatus?: string;
  ageMin?: string;
  ageMax?: string;
  heightMin?: string;
  heightMax?: string;
  occupation?: string;
  complexion?: string;
  religion?: string;
  bloodGroup?: string;
  district?: string;
  educationLevel?: string;
  financialStatus?: string;
}

interface BiodataSearchProps {
  onSearch: (params: SearchParams) => void;
  onClear: () => void;
  initialParams?: SearchParams;
  className?: string;
}

const BiodataSearch: React.FC<BiodataSearchProps> = ({
  onSearch,
  onClear,
  initialParams = {},
  className = '',
}) => {
  const [searchParams, setSearchParams] = useState<SearchParams>(initialParams);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle search form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchParams);
  };

  // Clear filters
  const handleClearFilters = () => {
    setSearchParams({});
    onClear();
  };

  return (
    <div className={className}>
      <h4 className="text-center text-2xl sm:text-4xl rounded-full p-4 mb-6 font-bold bg-violet-950 text-white sm:w-1/2 sm:mx-auto">
        Search Biodata
      </h4>

      <form onSubmit={handleSubmit} className="bg-violet-900 p-6 rounded-lg shadow-md mb-8 text-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Gender */}
          <div className="mb-4">
            <label className="block mb-2" htmlFor="gender">Gender</label>
            <select
              id="gender"
              name="gender"
              value={searchParams.gender || ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md text-black"
            >
              <option value="">সব</option>
              <option value="Male">পুরুষ</option>
              <option value="Female">মহিলা</option>
            </select>
          </div>

          {/* Marital Status */}
          <div className="mb-4">
            <label className="block mb-2" htmlFor="maritalStatus">Marital Status</label>
            <select
              id="maritalStatus"
              name="maritalStatus"
              value={searchParams.maritalStatus || ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md text-black"
            >
              <option value="">Any</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Divorced">Divorced</option>
              <option value="Widowed">Widowed</option>
            </select>
          </div>

          {/* Religion */}
          <div className="mb-4">
            <label className="block mb-2" htmlFor="religion">Religion</label>
            <select
              id="religion"
              name="religion"
              value={searchParams.religion || ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md text-black"
            >
              <option value="">Any</option>
              <option value="Islam">Islam</option>
              <option value="Hinduism">Hinduism</option>
              <option value="Christianity">Christianity</option>
              <option value="Buddhism">Buddhism</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Blood Group */}
          <div className="mb-4">
            <label className="block mb-2" htmlFor="bloodGroup">Blood Group</label>
            <select
              id="bloodGroup"
              name="bloodGroup"
              value={searchParams.bloodGroup || ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md text-black"
            >
              <option value="">Any</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>

          {/* Complexion */}
          <div className="mb-4">
            <label className="block mb-2" htmlFor="complexion">Complexion</label>
            <select
              id="complexion"
              name="complexion"
              value={searchParams.complexion || ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md text-black"
            >
              <option value="">Any</option>
              <option value="Fair">Fair</option>
              <option value="Medium">Medium</option>
              <option value="Brown">Brown</option>
              <option value="Dark">Dark</option>
            </select>
          </div>

          {/* Age Range */}
          <div className="mb-4">
            <label className="block mb-2">Age Range</label>
            <div className="flex space-x-2">
              <input
                type="number"
                name="ageMin"
                placeholder="Min"
                value={searchParams.ageMin || ''}
                onChange={handleInputChange}
                className="w-1/2 px-3 py-2 border rounded-md text-black"
              />
              <input
                type="number"
                name="ageMax"
                placeholder="Max"
                value={searchParams.ageMax || ''}
                onChange={handleInputChange}
                className="w-1/2 px-3 py-2 border rounded-md text-black"
              />
            </div>
          </div>

          {/* Height Range */}
          <div className="mb-4">
            <label className="block mb-2">Height Range (cm)</label>
            <div className="flex space-x-2">
              <input
                type="number"
                name="heightMin"
                placeholder="Min"
                value={searchParams.heightMin || ''}
                onChange={handleInputChange}
                className="w-1/2 px-3 py-2 border rounded-md text-black"
              />
              <input
                type="number"
                name="heightMax"
                placeholder="Max"
                value={searchParams.heightMax || ''}
                onChange={handleInputChange}
                className="w-1/2 px-3 py-2 border rounded-md text-black"
              />
            </div>
          </div>

          {/* Occupation */}
          <div className="mb-4">
            <label className="block mb-2" htmlFor="occupation">Occupation</label>
            <input
              type="text"
              id="occupation"
              name="occupation"
              value={searchParams.occupation || ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md text-black"
            />
          </div>

          {/* District */}
          <div className="mb-4">
            <label className="block mb-2" htmlFor="district">District</label>
            <input
              type="text"
              id="district"
              name="district"
              value={searchParams.district || ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md text-black"
              placeholder="Search in both addresses"
            />
          </div>

          {/* Financial Status */}
          <div className="mb-4">
            <label className="block mb-2" htmlFor="financialStatus">Financial Status</label>
            <select
              id="financialStatus"
              name="financialStatus"
              value={searchParams.financialStatus || ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md text-black"
            >
              <option value="">Any</option>
              <option value="Upper Class">Upper Class</option>
              <option value="Upper Middle Class">Upper Middle Class</option>
              <option value="Middle Class">Middle Class</option>
              <option value="Lower Middle Class">Lower Middle Class</option>
            </select>
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={handleClearFilters}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Clear Filters
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-white text-violet-900 rounded-md hover:bg-gray-100 font-bold"
          >
            Search Biodata
          </button>
        </div>
      </form>
    </div>
  );
};

export default BiodataSearch;