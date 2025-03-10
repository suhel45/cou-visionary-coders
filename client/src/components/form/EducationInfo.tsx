import { ChangeEvent } from 'react';
import {
  EducationInfoData,
  AcademicRecord,
  UniversityRecord,
} from '../../interfaces/Biodata.interface';

interface EducationInfoProps {
  formData: EducationInfoData;
  setFormData: (formData: EducationInfoData) => void;
}

const departments = [
  'Computer Science',
  'Electrical Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Business Administration',
  'Economics',
  'Physics',
  'Mathematics',
  'English',
  'Law',
];

function AcademicDetails({
  section,
  formData,
  setFormData,
}: {
  section: 'ssc' | 'hsc';
  formData: EducationInfoData;
  setFormData: (data: EducationInfoData) => void;
}) {
  const handleChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>,
    field: keyof AcademicRecord,
  ) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      [section]: {
        ...formData[section],
        [field]: field === 'passingYear' ? parseInt(value) : value,
      },
    });
  };

  return (
    <div className="w-full flex flex-col items-stretch justify-stretch">
      <h2 className="subheading">{section.toUpperCase()}</h2>
      <label className="label mt-1">
        জিপিএ
        <input
          type="number"
          step="0.01"
          min="1.00"
          max="5.00"
          value={formData[section].gpa}
          onChange={(e) => handleChange(e, 'gpa')}
          className="option-btn p-2"
          placeholder="যেমনঃ 3.21"
        />
      </label>
      <label className="label mt-1">
        পাশের সন
        <select
          value={formData[section].passingYear}
          onChange={(e) => handleChange(e, 'passingYear')}
          className="option-btn p-2"
        >
          <option value="">Select Year</option>
          {Array.from({ length: 21 }, (_, i) => 2005 + i).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </label>
      <label className="label mt-1">
        গ্রুপ
        <select
          value={formData[section].group}
          onChange={(e) => handleChange(e, 'group')}
          className="option-btn p-2"
        >
          <option value="">Select Group</option>
          <option value="Science">Science</option>
          <option value="Commerce">Commerce</option>
          <option value="Arts">Arts</option>
        </select>
      </label>
    </div>
  );
}

function UniversityDetails({
  section,
  formData,
  setFormData,
}: {
  section: 'honours' | 'masters';
  formData: EducationInfoData;
  setFormData: (data: EducationInfoData) => void;
}) {
  const handleChange = (
    e: ChangeEvent<HTMLSelectElement>,
    field: keyof UniversityRecord,
  ) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      university: {
        ...formData.university,
        [section]: {
          ...formData.university[section],
          [field]: value,
        },
      },
    });
  };

  return (
    <div className="w-full flex flex-col items-stretch justify-stretch">
      <h2 className="subheading">
        বিশ্ববিদ্যালয় ({section === 'honours' ? 'অনার্স' : 'মাস্টার্স'})
      </h2>
      <label className="label mt-1">
        অনুষদ {''}
        <select
          value={formData.university[section]?.faculty || ''}
          onChange={(e) => handleChange(e, 'faculty')}
          className="option-btn p-2"
        >
          <option value="">Select Faculty</option>
          <option value="Engineering">Engineering</option>
          <option value="Business">Business</option>
          <option value="Science">Science</option>
          <option value="Arts">Arts</option>
        </select>
      </label>
      <label className="label mt-1">
        বিভাগ
        <select
          value={formData.university[section]?.department || ''}
          onChange={(e) => handleChange(e, 'department')}
          className="option-btn p-2"
        >
          <option value="">Select Department</option>
          {departments.map((department) => (
            <option key={department} value={department}>
              {department}
            </option>
          ))}
        </select>
      </label>
      <label className="label mt-1">
        সেশন
        <select
          value={formData.university[section]?.session || ''}
          onChange={(e) => handleChange(e, 'session')}
          className="option-btn p-2 mb-4"
        >
          <option value="">Select Session</option>
          {Array.from({ length: 19 }, (_, i) => 2006 + i).map((year) => (
            <option
              key={year}
              value={`${year}-${year + 1}`}
            >{`${year}-${year + 1}`}</option>
          ))}
        </select>
      </label>
    </div>
  );
}

function EducationInfo({
  formData,
  setFormData,
}: Readonly<EducationInfoProps>) {
  return (
    <div className="w-full">
      <div className="flex flex-col items-stretch md:items-center justify-center border border-gray-400 bg-purple-100 p-2 rounded-md md:m-4 shadow-lg">
        <h2 className="heading">শিক্ষাগত তথ্য</h2>
        <form className="items-center justify-center w-full md:w-auto bg-white border-pink-600 p-2 md:px-28 my-4 rounded-md border shadow-lg hover:shadow-lg flex flex-col gap-2">
          <AcademicDetails
            section="ssc"
            formData={formData}
            setFormData={setFormData}
          />
          <AcademicDetails
            section="hsc"
            formData={formData}
            setFormData={setFormData}
          />
          <hr className="my-4" />
          <UniversityDetails
            section="honours"
            formData={formData}
            setFormData={setFormData}
          />
          <hr className="my-4" />
          <UniversityDetails
            section="masters"
            formData={formData}
            setFormData={setFormData}
          />
        </form>
      </div>
    </div>
  );
}

export default EducationInfo;
