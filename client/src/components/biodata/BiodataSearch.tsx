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
            <label className="block mb-2" htmlFor="maritalStatus">বৈবাহিক অবস্থা</label>
            <select
              id="maritalStatus"
              name="maritalStatus"
              value={searchParams.maritalStatus || ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md text-black"
            >
              <option value="">সব</option>
              <option value="অবিবাহিত">অবিবাহিত</option>
<option value="বিবাহিত">বিবাহিত</option>
<option value="ডিভোর্সড">ডিভোর্সড</option>
<option value="বিধবা">বিধবা</option>
<option value="বিপত্নীক">বিপত্নীক</option>
            </select>
          </div>

          {/* Religion */}
          <div className="mb-4">
            <label className="block mb-2" htmlFor="religion">ধর্ম </label>
            <select
              id="religion"
              name="religion"
              value={searchParams.religion || ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md text-black"
            >
                <option value=''>সব</option>
<option value="ইসলাম">ইসলাম</option>
<option value="হিন্দু">হিন্দু</option>
<option value="খ্রিস্টান">খ্রিস্টান</option>
<option value="বৌদ্ধ">বৌদ্ধ</option>
            </select>
          </div>

          {/* Complexion */}
          <div className="mb-4">
            <label className="block mb-2" htmlFor="complexion">গাত্রবর্ন</label>
            <select
              id="complexion"
              name="complexion"
              value={searchParams.complexion || ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md text-black"
            >
                <option value=''>সব</option>
<option value="উজ্জ্বল ফর্সা">উজ্জ্বল ফর্সা</option>
<option value="ফর্সা">ফর্সা</option>
<option value="শ্যামলা">শ্যামলা</option>
<option value="উজ্জ্বল শ্যামলা">উজ্জ্বল শ্যামলা</option>
<option value="কালো">কালো</option>
            </select>
          </div>

          {/* Age Range */}
          <div className="mb-4">
            <label className="block mb-2">বয়সের সীমা</label>
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
            <label className="block mb-2">উচ্চতার সীমা (inc)</label>
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
            <label className="block mb-2" htmlFor="occupation">পেশা</label>
            <select
              id="occupation"
              name="occupation"
              value={searchParams.occupation || ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md text-black"
            >
                <option>সব</option>
<option value="শিক্ষার্থী">শিক্ষার্থী</option>
<option value="ডাক্তার">ডাক্তার</option>
<option value="ইঞ্জিনিয়ার">ইঞ্জিনিয়ার</option>
<option value="সরকারি চাকরি">সরকারি চাকরি</option>
<option value="বেসরকারি চাকরি">বেসরকারি চাকরি</option>
<option value="ব্যবসায়ী">ব্যবসায়ী</option>
<option value="শিক্ষক">শিক্ষক</option>
<option value="ফ্রীল্যান্সার">ফ্রীল্যান্সার</option>
<option value="প্রবাসী">প্রবাসী</option>
<option value="পেশা নাই">পেশা নাই</option>
<option value="অন্যান্য "> অন্যান্য </option>
            </select>

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
            <label className="block mb-2" htmlFor="financialStatus">পারিবারিক আর্থিক অবস্থা</label>
            <select
              id="financialStatus"
              name="financialStatus"
              value={searchParams.financialStatus || ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md text-black"
            >
                <option>সব</option>
<option value="নিম্নবিত্ত">নিম্নবিত্ত</option>
<option value="মধ্যবিত্ত">মধ্যবিত্ত</option>
<option value="উচ্চ মধ্যবিত্ত">উচ্চ মধ্যবিত্ত</option>
<option value="উচ্চবিত্ত">উচ্চবিত্ত</option>
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