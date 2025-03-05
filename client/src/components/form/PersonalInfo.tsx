import { useState, useEffect } from 'react';
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

  useEffect(() => {
    setLocalFormData({ ...formData });
  }, [formData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    const updatedData = { ...localFormData, [name]: value };
    setLocalFormData(updatedData);
    setFormData(updatedData); // Pass the updated object
  };
  return (
    <div className="w-full">
      <div className="flex flex-col items-stretch md:items-center border border-gray-400 bg-purple-100 p-2 rounded-md md:m-4 shadow-lg">
        <h2 className="heading">ব্যক্তিগত তথ্য</h2>
        <form className="w-full md:w-auto bg-white border-pink-600 p-2 md:px-28 my-4 rounded-md border shadow-lg hover:shadow-lg flex flex-col gap-2">
          <h2 className="subheading">সাধারণ তথ্য</h2>

          {/* Birth Date Field */}
          <label className="label">
            জন্ম তারিখ - {/* Birth Date */}
            <input
              type="date"
              name="birthDate"
              value={localFormData.birthDate}
              onChange={handleChange}
              className="option-btn p-4"
            />
          </label>

          {/* Gender Field */}
          <label className="label">
            লিঙ্গ - {/* Gender */}
            <select
              name="gender"
              value={localFormData.gender}
              onChange={handleChange}
              className="option-btn"
            >
              <option>নির্বাচন করুন</option>
              <option value="male">পুরুষ</option>
              <option value="female">মহিলা</option>
            </select>
          </label>

          {/* Marital Status Field */}
          <label className="label">
            বৈবাহিক অবস্থা - {/* Marital Status */}
            <select
              name="maritalStatus"
              value={localFormData.maritalStatus}
              onChange={handleChange}
              className="option-btn"
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
          <label className="label">
            উচ্চতা - {/* Height */}
            <select
              name="height"
              value={localFormData.height}
              onChange={handleChange}
              className="option-btn"
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
          <label className="label">
            ওজন - {/* Weight */}
            <select
              name="weight"
              value={localFormData.weight}
              onChange={handleChange}
              className="option-btn"
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
          <label className="label">
            গাত্রবর্ন - {/* Complexion */}
            <select
              name="complexion"
              value={localFormData.complexion}
              onChange={handleChange}
              className="option-btn"
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
          <label className="label">
            রক্তের গ্রুপ - {/* Blood Group */}
            <select
              name="bloodGroup"
              value={localFormData.bloodGroup}
              onChange={handleChange}
              className="option-btn text-center"
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
          <label className="label">
            ধর্ম - {/* Religion */}
            <select
              name="religion"
              value={localFormData.religion}
              onChange={handleChange}
              className="option-btn"
            >
              <option>নির্বাচন করুন</option>
              <option value="ইসলাম">ইসলাম</option>
              <option value="হিন্দু">হিন্দু</option>
              <option value="খ্রিস্টান">খ্রিস্টান</option>
              <option value="বৌদ্ধ">বৌদ্ধ</option>
            </select>
          </label>

          {/* Occupation Field */}
          <label className="label">
            পেশা - {/* Occupation */}
            <select
              className="option-btn"
              name="occupation"
              value={localFormData.occupation}
              onChange={handleChange}
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
        </form>
      </div>
    </div>
  );
};

export default PersonalInfo;
