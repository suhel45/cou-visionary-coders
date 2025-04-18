import React, { useState, useEffect } from 'react';
import { PersonalInfoData } from '../../interfaces/Biodata.interface'; // Import the interface

interface PersonalInfoProps {
  formData: PersonalInfoData; // Use the imported interface
  setFormData: (data: PersonalInfoData) => void; // Update the type
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({
  formData,
  setFormData,
}) => {
  const [localFormData, setLocalFormData] = useState<PersonalInfoData>({
    gender: '',
    maritalStatus: '',
    birthDate: '',
    height: '',
    weight: '',
    occupation: '',
    complexion: '',
    religion: '',
    bloodGroup: '',
  });
 const [error,setError] = useState<boolean | string>(false);
  useEffect(() => {
    setLocalFormData({ ...formData });
  }, [formData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    const updatedData = { ...localFormData, [name]: value };
    if (calculateAge(updatedData.birthDate) >= 18) {
      setFormData(updatedData);
    }else{setError(true);}
    setLocalFormData(updatedData);
  };
  //calculate the age
  const calculateAge = (birthDate: string): number => {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    const dayDiff = today.getDate() - birth.getDate();

    // Adjust age if the birth date hasn't occurred yet this year
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    return age;
  };

  const inputStyle: string =
    'block p-4 w-full md:w-screen bg-gray-50 text-center font-bold  rounded-md border  border-slate-500 sm:px-8 text-gray-600 shadow-lg ring-1 ring-inset ring-gray-300 focus:ring-2  focus:ring-pink-600 sm:max-w-xs text-sm sm:text-lg sm:leading-6'
  const levelStyle: string =
    'text-sm md:text-xl font-semibold text-cyan-950 p-2 md:p-4 text-center';
  return (
    <div className="w-full h-full border border-gray-400 bg-purple-50 rounded-md  shadow-lg md:m-4">
      <div className="flex flex-col items-stretch md:items-center   p-2 ">
        <h2 className="bg-pink-600 text-white py-2 px-6 shadow-sm outline outline-pink-600  outline-offset-2  m-2 rounded-md text-center font-bold text-xl md:text-2xl">
          ব্যক্তিগত তথ্য
        </h2>
        <form className="w-full md:w-auto bg-white border-pink-600 p-2 md:px-28 my-4 rounded-md border shadow-lg hover:shadow-lg flex flex-col items-center gap-2">
          <h2 className="bg-violet-900 text-white my-4 py-2 px-6 shadow-sm outline  m-2 rounded-md text-center font-bold text-lg md:text-2xl md:w-1/2">
            সাধারণ তথ্য
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
            {/* Birth Date Field */}
            <label className={levelStyle}>
              জন্ম তারিখ - {/* Birth Date */}
              <input
                type="date"
                name="birthDate"
                value={localFormData.birthDate}
                onChange={handleChange}
                className={inputStyle}
                required
              />
              {error && (
                <span className="text-red-500 text-sm">
                  আপনার বয়স কমপক্ষে ১৮ বছর হতে হবে
                 
                </span>
              )}
            </label>
            {/* Gender Field */}
            <label className={levelStyle}>
              লিঙ্গ - {/* Gender */}
              <select
                name="gender"
                value={localFormData.gender}
                onChange={handleChange}
                className={inputStyle}
                required
              >
                <option>নির্বাচন করুন</option>
                <option value="পুরুষ">পুরুষ</option>
                <option value="মহিলা">মহিলা</option>
              </select>
            </label>

            {/* Marital Status Field */}
            <label className={levelStyle}>
              বৈবাহিক অবস্থা - {/* Marital Status */}
              <select
                name="maritalStatus"
                value={localFormData.maritalStatus}
                onChange={handleChange}
                className={inputStyle}
                required
              >
                <option>নির্বাচন করুন</option>
                <option value="অবিবাহিত">অবিবাহিত</option>
                <option value="বিবাহিত">বিবাহিত</option>
                <option value="ডিভোর্সড">ডিভোর্সড</option>
                <option value="বিধবা">বিধবা</option>
                <option value="বিপত্নীক">বিপত্নীক</option>
              </select>
            </label>

            {/* Height Field */}
            <label className={levelStyle}>
              উচ্চতা - {/* Height */}
              <select
                name="height"
                value={localFormData.height}
                onChange={handleChange}
                className={inputStyle}
                required
              >
                <option>নির্বাচন করুন</option>
                {Array.from({ length: 36 }, (_, i) => {
                  const feet = Math.floor(i / 12) + 4;
                  const inches = i % 12;
                  const formattedHeight = `${feet}'${inches}"`;
                  return (
                    <option key={formattedHeight} value={formattedHeight}>
                      {formattedHeight}
                    </option>
                  );
                })}
              </select>
            </label>

            {/* Weight Field */}
            <label className={levelStyle}>
              ওজন - {/* Weight */}
              <select
                name="weight"
                value={localFormData.weight}
                onChange={handleChange}
                className={inputStyle}
                required
              >
                <option>নির্বাচন করুন</option>
                {Array.from({ length: 91 }, (_, i) => {
                  const weight = i + 30;
                  return (
                    <option key={weight} value={`${weight} kg`}>
                      {`${weight} kg`}
                    </option>
                  );
                })}
              </select>
            </label>

            {/* Complexion Field */}
            <label className={levelStyle}>
              গাত্রবর্ন - {/* Complexion */}
              <select
                name="complexion"
                value={localFormData.complexion}
                onChange={handleChange}
                className={inputStyle}
                required
              >
                <option>নির্বাচন করুন</option>
                <option value="উজ্জ্বল ফর্সা">উজ্জ্বল ফর্সা</option>
                <option value="ফর্সা">ফর্সা</option>
                <option value="শ্যামলা">শ্যামলা</option>
                <option value="উজ্জ্বল শ্যামলা">উজ্জ্বল শ্যামলা</option>
                <option value="কালো">কালো</option>
              </select>
            </label>

            {/* Blood Group Field */}
            <label className={levelStyle}>
              রক্তের গ্রুপ - {/* Blood Group */}
              <select
                name="bloodGroup"
                value={localFormData.bloodGroup}
                onChange={handleChange}
                className={inputStyle}
                required
              >
                <option>নির্বাচন করুন</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </label>

            {/* Religion Field */}
            <label className={levelStyle}>
              ধর্ম - {/* Religion */}
              <select
                name="religion"
                value={localFormData.religion}
                onChange={handleChange}
                className={inputStyle}
                required
              >
                <option>নির্বাচন করুন</option>
                <option value="ইসলাম">ইসলাম</option>
                <option value="হিন্দু">হিন্দু</option>
                <option value="খ্রিস্টান">খ্রিস্টান</option>
                <option value="বৌদ্ধ">বৌদ্ধ</option>
              </select>
            </label>

            {/* Occupation Field */}
            <label className={levelStyle}>
              পেশা - {/* Occupation */}
              <select
                className={inputStyle}
                name="occupation"
                value={localFormData.occupation}
                onChange={handleChange}
                required
              >
                <option>নির্বাচন করুন</option>
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
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PersonalInfo;
