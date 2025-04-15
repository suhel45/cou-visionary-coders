import React, { useState } from 'react';
import {
  genderOptions,
  maritalStatusOptions,
  religionOptions,
  complexionOptions,
  occupationOptions,
  financialStatusOptions
} from '../../constants/searchOptions';
import { BiodataSearchProps, SearchParams } from '../../interfaces/Search.interface';
import SelectField from '../../utils/SelectField/SelectField';
import RangeField from '../../utils/RangeField/RangeField';
import TextField from '../../utils/TextField/TextField';

const BiodataSearch: React.FC<BiodataSearchProps> = ({
  onSearch,
  onClear,
  initialParams = {},
  className = '',
}) => {
  const [searchParams, setSearchParams] = useState<SearchParams>(initialParams);

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({
      ...prev,
      [name]: value,
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
      <h4 className="text-center text-2xl sm:text-4xl rounded-full p-4 mb-6 mt-6 font-bold bg-violet-950 text-white sm:w-1/2 sm:mx-auto">
        Search Biodata
      </h4>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md mb-8 text-black"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Gender */}
          <SelectField
            id="gender"
            name="gender"
            label="লিঙ্গ"
            value={searchParams.gender || ''}
            options={genderOptions}
            onChange={handleInputChange}
          />

          {/* Marital Status */}
          <SelectField
            id="maritalStatus"
            name="maritalStatus"
            label="বৈবাহিক অবস্থা"
            value={searchParams.maritalStatus || ''}
            options={maritalStatusOptions}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md text-black sm:px-2 sm:py-1 sm:text-sm"
          />

          {/* Religion */}
          <SelectField
            id="religion"
            name="religion"
            label="ধর্ম"
            value={searchParams.religion || ''}
            options={religionOptions}
            onChange={handleInputChange}
          />

          {/* Complexion */}
          <SelectField
            id="complexion"
            name="complexion"
            label="গাত্রবর্ন"
            value={searchParams.complexion || ''}
            options={complexionOptions}
            onChange={handleInputChange}
          />

          {/* Age Range */}
          <RangeField
            label="বয়সের সীমা"
            minName="ageMin"
            maxName="ageMax"
            minValue={searchParams.ageMin || ''}
            maxValue={searchParams.ageMax || ''}
            onChange={handleInputChange}
          />

          {/* Height Range */}
          <RangeField
            label="উচ্চতার সীমা (inc)"
            minName="heightMin"
            maxName="heightMax"
            minValue={searchParams.heightMin || ''}
            maxValue={searchParams.heightMax || ''}
            onChange={handleInputChange}
          />

          {/* Occupation */}
          <SelectField
            id="occupation"
            name="occupation"
            label="পেশা"
            value={searchParams.occupation || ''}
            options={occupationOptions}
            onChange={handleInputChange}
          />

          {/* District */}
          <TextField
            id="district"
            name="district"
            label="জেলা"
            value={searchParams.district || ''}
            onChange={handleInputChange}
            placeholder="district name"
          />

          {/* Subdistrict - Fix the field name bug in original code */}
          <TextField
            id="subdistrict"
            name="subdistrict"
            label="উপজেলা"
            value={searchParams.subdistrict || ''}
            onChange={handleInputChange}
            placeholder="upazila name"
          />

          {/* Financial Status */}
          <SelectField
            id="financialStatus"
            name="financialStatus"
            label="পারিবারিক আর্থিক অবস্থা"
            value={searchParams.financialStatus || ''}
            options={financialStatusOptions}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={handleClearFilters}
            className="px-4 py-2 bg-red-500 text-white rounded-md  cursor-pointer"
          >
            Clear Filters
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 bg-violet-900 text-white rounded-lg shadow-md flex items-center gap-2 cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Search Biodata
          </button>
        </div>
      </form>
    </div>
  );
};

export default BiodataSearch;