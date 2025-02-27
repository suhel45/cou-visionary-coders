import { useState, useEffect } from "react";

interface FormData {
  familyStatus: string;
  maritalStatus: string;
  height: string;
  weight: string;
  skinColor: string;
  blood: string;
  work: string;
  birthday: string;
  gender: string;
  religion:string;
}

interface PersonalInfoProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({ formData, setFormData }) => {
  const [localFormData, setLocalFormData] = useState<FormData>({
    familyStatus: "",
    maritalStatus: "",
    height: "",
    weight: "",
    skinColor: "",
    blood: "",
    work: "",
    birthday: "",
    gender: "",
    religion: "",
  });

  useEffect(() => {
    setLocalFormData({
      familyStatus: formData.familyStatus || "",
      maritalStatus: formData.maritalStatus || "",
      height: formData.height || "",
      weight: formData.weight || "",
      skinColor: formData.skinColor || "",
      blood: formData.blood || "",
      work: formData.work || "",
      birthday: formData.birthday || "",
      gender: formData.gender || "",
      religion: formData.religion || "",
    });
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLocalFormData({
      ...localFormData,
      [name]: value,
    });
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="w-full">
      <div className="flex flex-col items-center border border-gray-400 bg-purple-100 p-2 rounded-md md:m-4 shadow-lg">
        <h2 className="heading">ব্যক্তিগত তথ্য</h2>
        <form className="w-full md:w-auto bg-white border-pink-600 p-2 md:px-28 my-4 rounded-md border shadow-lg hover:shadow-lg flex flex-col gap-2">
          <h2 className="subheading">সাধারণ তথ্য</h2>

          {/* Birthday Field */}
          <label className="label">
            জন্ম তারিখ -  {/*  */}
            <input
              type="date"
              name="birthday"
              value={localFormData.birthday}
              onChange={handleChange}
              className="option-btn p-4"
            />
          </label>

          {/* Gender Field */}
          <label className="label">
            লিঙ্গ - {/*  */}
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
            বৈবাহিক অবস্থা -{/*  */}
            <select
              name="maritalStatus"
              value={localFormData.maritalStatus}
              onChange={handleChange}
              className="option-btn"
            >
              <option>নির্বাচন করুন</option>
              <option value="single">অবিবাহিত</option>
              <option value="married">বিবাহিত</option>
              <option value="divorced">ডিভোর্সড</option>
              <option value="widowed">বিধবা</option>
              <option value="widowed">বিপত্নীক</option>
            </select>
          </label>

          {/* Height Field */}
          <label className="label">
            উচ্চতা -{/*  */}
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
            ওজন -{/*  */}
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

          {/* Skin Color Field */}
          <label className="label">
            গাত্রবর্ন -{/*  */}
            <select
              name="skinColor"
              value={localFormData.skinColor}
              onChange={handleChange}
              className="option-btn"
            >
              <option>নির্বাচন করুন</option>
              <option value="lightFair">উজ্জ্বল ফর্সা</option>
              <option value="fair">ফর্সা</option>
              <option value="shemla">শ্যামলা</option>
              <option value="brightShemla">উজ্জ্বল শ্যামলা</option>
              <option value="black">কালো</option>
            </select>
          </label>

          {/* Blood Group Field */}
          <label className="label">
            রক্তের গ্রুপ -{/*  */}
            <select
              name="blood"
              value={localFormData.blood}
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
          <label className="label">
            ধর্ম -{/*  */}
            <select
              name="religion"
              value={localFormData.religion}
              onChange={handleChange}
              className="option-btn"
            >
              <option>নির্বাচন করুন</option>
              <option value="islam">ইসলাম</option>
              <option value="hinduism">হিন্দু</option>
              <option value="christianity">খ্রিস্টান</option>
              <option value="buddhism">বৌদ্ধ</option>
              <option value="other">অন্যান্য</option>
            </select>
          </label>

          {/* Work Field */}
          <label className="label">
            পেশা -{/*  */}
            <select
              className="option-btn"
              name="work"
              value={localFormData.work}
              onChange={handleChange}
            >
              <option>নির্বাচন করুন</option>
              <option value="student">শিক্ষার্থী</option>
              <option value="doctor">ডাক্তার</option>
              <option value="engineer">ইঞ্জিনিয়ার</option>
              <option value="govt job">সরকারি চাকরি</option>
              <option value="private job">বেসরকারি চাকরি</option>
              <option value="businessman">ব্যবসায়ী</option>
              <option value="teacher">শিক্ষক</option>
              <option value="freelancer">ফ্রীল্যান্সার</option>
              <option value="foreigner">প্রবাসী</option>
              <option value="nothing">পেশা নাই</option>
              <option value="others"> অন্যান্য </option>
            </select>
          </label>

        </form>
      </div>
    </div>
  );
};

export default PersonalInfo;
