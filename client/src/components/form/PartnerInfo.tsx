import React, { useState, useEffect, ChangeEvent } from 'react';
import { PartnerInfoData } from '../../interfaces/Biodata.interface';
import districts from './districtData'; // Import district data

type IPartnerInfo = {
  formData: PartnerInfoData;
  setFormData: (data: PartnerInfoData) => void;
};

const PartnerInfo: React.FC<IPartnerInfo> = ({ formData, setFormData }) => {
  const [localFormData, setLocalFormData] = useState<PartnerInfoData>({
    age: '',
    complexion: '',
    height: '',
    district: '',
    maritalStatus: '',
    profession: '',
    financialCondition: '',
    expectedQualities: '',
  });

  useEffect(() => {
    setLocalFormData(formData);
  }, [formData]);

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    setLocalFormData((prevData) => ({ ...prevData, [name]: value }));
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="w-full h-full border border-gray-400 bg-purple-50 rounded-md  shadow-lg md:m-4">
      <div className="flex flex-col items-stretch md:items-center justify-center p-2 ">
        <h2
          className="bg-pink-600 text-white py-2 px-6 shadow-sm outline outline-pink-600  outline-offset-2  m-2 rounded-md text-center font-bold text-xl md:text-2xl
"
        >
          প্রত্যাশিত জীবনসঙ্গী
        </h2>
        <form className="w-full md:items-center md:justify-center md:w-auto bg-white border-pink-600 p-4 md:px-28 my-4 rounded-md border shadow-lg hover:shadow-lg flex flex-col gap-2">
          <p
            className="bg-violet-900 text-white my-4 py-2 px-6 shadow-sm outline  m-2 rounded-md text-center font-bold text-sm md:text-xl
 "
          >
            কেমন পাত্র/পাত্রী পছন্দ সেই হিসেবে নিম্নে নির্বাচন করুন
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:justify-items-center gap-4 w-full">
            <label
              className="text-sm md:text-xl font-semibold text-cyan-950 p-2 md:p-4 text-center
"
            >
              পাত্র/পাত্রীর বৈবাহিক অবস্থা -{/* */}
              <select
                name="maritalStatus"
                value={localFormData.maritalStatus}
                onChange={handleChange}
                className="block w-full md:w-screen bg-gray-50 text-center font-bold  rounded-md border py-2 border-slate-500 sm:py-4 text-gray-600 shadow-lg ring-1 ring-inset ring-gray-300 focus:ring-2  focus:ring-pink-600 sm:max-w-xs sm:text-sm sm:leading-6;
"
              >
                <option>নির্বাচন করুন</option>
                <option value="অবিবাহিত">অবিবাহিত</option>
                <option value="বিবাহিত">বিবাহিত</option>
                <option value="ডিভোর্সড">ডিভোর্সড</option>
                <option value="বিধবা">বিধবা</option>
                <option value="বিপত্নীক">বিপত্নীক</option>
              </select>
            </label>
            <label
              className="text-sm md:text-xl font-semibold text-cyan-950 p-2 md:p-4 text-center
"
            >
              পাত্র/পাত্রীর বয়স -{/* */}
              <input
                type="text"
                name="age"
                value={localFormData.age}
                onChange={handleChange}
                className="block w-full md:w-screen bg-gray-50 p-2 font-bold  rounded-md border py-2 border-slate-500 sm:py-4 text-gray-600 shadow-lg ring-1 ring-inset ring-gray-300 focus:ring-2  focus:ring-pink-600 sm:max-w-xs sm:text-sm sm:leading-6;
"
                placeholder="যেমন (২০-৩০) বছর"
              />
            </label>
            <label
              className="text-sm md:text-xl font-semibold text-cyan-950 p-2 md:p-4 text-center
"
            >
              পাত্র/পাত্রীর অর্থনৈতিক অবস্থা -{/* */}
              <select
                name="financialCondition"
                value={localFormData.financialCondition}
                onChange={handleChange}
                className="block w-full md:w-screen bg-gray-50 text-center font-bold  rounded-md border py-2 border-slate-500 sm:py-4 text-gray-600 shadow-lg ring-1 ring-inset ring-gray-300 focus:ring-2  focus:ring-pink-600 sm:max-w-xs sm:text-sm sm:leading-6;
"
              >
                <option>নির্বাচন করুন</option>
                <option value="উচ্চবিত্ত">উচ্চবিত্ত</option>
                <option value="উচ্চ মধ্যবিত্ত">উচ্চ মধ্যবিত্ত</option>
                <option value="মধ্যবিত্ত">মধ্যবিত্ত</option>
                <option value="নিম্ন মধ্যবিত্ত">নিম্ন মধ্যবিত্ত</option>
                <option value="নিম্নবিত্ত">নিম্নবিত্ত</option>
              </select>
            </label>

            <label
              className="text-sm md:text-xl font-semibold text-cyan-950 p-2 md:p-4 text-center
"
            >
              পাত্র/পাত্রীর উচ্চতা -{/* */}
              <select
                name="height"
                value={localFormData.height}
                onChange={handleChange}
                className="block w-full md:w-screen bg-gray-50 text-center font-bold  rounded-md border py-2 border-slate-500 sm:py-4 text-gray-600 shadow-lg ring-1 ring-inset ring-gray-300 focus:ring-2  focus:ring-pink-600 sm:max-w-xs sm:text-sm sm:leading-6;
"
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

            <label
              className="text-sm md:text-xl font-semibold text-cyan-950 p-2 md:p-4 text-center
"
            >
              পাত্র/পাত্রীর গাত্রবর্ন -{/* */}
              <select
                name="complexion"
                value={localFormData.complexion}
                onChange={handleChange}
                className="block w-full md:w-screen bg-gray-50 text-center font-bold  rounded-md border py-2 border-slate-500 sm:py-4 text-gray-600 shadow-lg ring-1 ring-inset ring-gray-300 focus:ring-2  focus:ring-pink-600 sm:max-w-xs sm:text-sm sm:leading-6;
"
              >
                <option>নির্বাচন করুন</option>
                <option value="উজ্জ্বল ফর্সা">উজ্জ্বল ফর্সা</option>
                <option value="ফর্সা">ফর্সা</option>
                <option value="শ্যামলা">শ্যামলা</option>
                <option value="উজ্জ্বল শ্যামলা">উজ্জ্বল শ্যামলা</option>
                <option value="কালো">কালো</option>
              </select>
            </label>

            <label
              className="text-sm md:text-xl font-semibold text-cyan-950 p-2 md:p-4 text-center
"
            >
              পাত্র/পাত্রীর পেশা -{/* */}
              <select
                className="block w-full md:w-screen bg-gray-50 text-center font-bold  rounded-md border py-2 border-slate-500 sm:py-4 text-gray-600 shadow-lg ring-1 ring-inset ring-gray-300 focus:ring-2  focus:ring-pink-600 sm:max-w-xs sm:text-sm sm:leading-6;
"
                name="profession"
                value={localFormData.profession}
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
                <option value="অন্যান্য">অন্যান্য</option>
              </select>
            </label>
            <label
              className="text-sm md:text-xl font-semibold text-cyan-950 p-2 md:p-4 text-center;
"
            >
              পাত্র/পাত্রীর জেলা -{/* District */}
              <select
                name="district"
                value={localFormData.district}
                onChange={handleChange}
                className="block w-full md:w-screen bg-gray-50 text-center font-bold  rounded-md border py-2 border-slate-500 sm:py-4 text-gray-600 shadow-lg ring-1 ring-inset ring-gray-300 focus:ring-2  focus:ring-pink-600 sm:max-w-xs sm:text-sm sm:leading-6;
"
              >
                <option>নির্বাচন করুন</option>
                {districts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </label>
            <label
              className="text-sm md:text-xl font-semibold text-cyan-950 p-2 md:p-4 text-center
 "
            >
              {/* */}প্রত্যাশিত বৈশিষ্ট্যে বা গুনাবলী
              <textarea
                name="expectedQualities"
                value={localFormData.expectedQualities}
                onChange={handleChange}
                className="block w-full md:w-screen bg-gray-50  font-bold  rounded-md border py-2 border-slate-500 sm:py-4 text-gray-600 shadow-lg ring-1 ring-inset ring-gray-300 focus:ring-2  focus:ring-pink-600 sm:max-w-xs text-xs sm:text-sm sm:leading-6
 p-2  mb-4"
                placeholder="যেই সব গুনাবলি আশা করেন"
                rows={4}
              />
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PartnerInfo;
