import { useState, useEffect, ChangeEvent } from "react";

type FormDataType = {
  PmaritalStatus: string;
  PfamilyStatus: string;
  Pheight: string;
  PskinColor: string;
  Pwork: string;
  Pexpectation: string;
};

type PartnerInfo = {
  formData: FormDataType;
  setFormData: (data: FormDataType) => void;
};

const PartnerInfo: React.FC<PartnerInfo> = ({ formData, setFormData }) => {
  const [localFormData, setLocalFormData] = useState<FormDataType>({
    PmaritalStatus: "",
    PfamilyStatus: "",
    Pheight: "",
    PskinColor: "",
    Pwork: "",
    Pexpectation: "",
  });

  useEffect(() => {
    setLocalFormData(formData);
  }, [formData]);

  const handleChange = (e: ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setLocalFormData((prevData) => ({ ...prevData, [name]: value }));
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="w-full">
      <div className="flex flex-col items-center border border-gray-400 bg-purple-100 p-2 rounded-md md:m-4 shadow-lg">
        <h2 className="heading">প্রত্যাশিত জীবনসঙ্গী</h2>
        <form className="w-full md:items-center md:justify-center md:w-auto bg-white border-pink-600 p-4 md:px-28 my-4 rounded-md border shadow-lg hover:shadow-lg flex flex-col gap-2">
          <p className="subheading text-sm md:text-xl">
            কেমন পাত্র/পাত্রী পছন্দ সেই হিসেবে নিম্নে নির্বাচন করুন
          </p>
          <hr />

          <label className="label">
            পাত্র/পাত্রীর বৈবাহিক অবস্থা -
            <select name="PmaritalStatus" value={localFormData.PmaritalStatus} onChange={handleChange} className="option-btn">
              <option>নির্বাচন করুন</option>
              <option value="অবিবাহিত">অবিবাহিত</option>
              <option value="বিবাহিত">বিবাহিত</option>
              <option value="ডিভোর্সড">ডিভোর্সড</option>
              <option value="বিধবা">বিধবা</option>
              <option value="বিপত্নীক">বিপত্নীক</option>
            </select>
          </label>

          <label className="label">
            পাত্র/পাত্রীর অর্থনৈতিক অবস্থা -
            <select name="PfamilyStatus" value={localFormData.PfamilyStatus} onChange={handleChange} className="option-btn">
              <option>নির্বাচন করুন</option>
              <option value="উচ্চবিত্ত">উচ্চবিত্ত</option>
              <option value="উচ্চ মধ্যবিত্ত">উচ্চ মধ্যবিত্ত</option>
              <option value="মধ্যবিত্ত">মধ্যবিত্ত</option>
              <option value="নিম্ন মধ্যবিত্ত">নিম্ন মধ্যবিত্ত</option>
              <option value="নিম্নবিত্ত">নিম্নবিত্ত</option>
            </select>
          </label>

          <label className="label">
            পাত্র/পাত্রীর উচ্চতা -
            <select name="Pheight" value={localFormData.Pheight} onChange={handleChange} className="option-btn">
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

          <label className="label">
            পাত্র/পাত্রীর গাত্রবর্ন -
            <select name="PskinColor" value={localFormData.PskinColor} onChange={handleChange} className="option-btn">
              <option>নির্বাচন করুন</option>
              <option value="উজ্জ্বল ফর্সা">উজ্জ্বল ফর্সা</option>
              <option value="ফর্সা">ফর্সা</option>
              <option value="শ্যামলা">শ্যামলা</option>
              <option value="উজ্জ্বল শ্যামলা">উজ্জ্বল শ্যামলা</option>
              <option value="কালো">কালো</option>
            </select>
          </label>

          <label className="label">
            পাত্র/পাত্রীর পেশা -
            <select className="option-btn" name="Pwork" value={localFormData.Pwork} onChange={handleChange}>
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

          <label className="subheading text-sm md:text-xl">জীবনসঙ্গীর যেসব বৈশিষ্ট্যে বা গুনাবলী প্রত্যাশা করেন</label>
          <textarea name="Pexpectation" value={localFormData.Pexpectation} onChange={handleChange} className="form-input p-2 w-full mb-4" placeholder="Enter Your Expected Qualities" rows={4}/>
        </form>
      </div>
    </div>
  );
};

export default PartnerInfo;
