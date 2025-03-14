import React from 'react';
import { FamilyInfoData } from '../../interfaces/Biodata.interface';

interface SiblingInfoFormProps {
  siblings: FamilyInfoData['siblings'];
  onChange: (updatedSiblings: FamilyInfoData['siblings']) => void;
}

const SiblingInfoForm: React.FC<SiblingInfoFormProps> = ({
  siblings,
  onChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    onChange({
      ...siblings,
      [name]: value,
    });
  };
  return (
    <div className="flex flex-col items-stretch sm:items-center sm:justify-center justify-stretch border border-gray-400  p-2 rounded-md shadow-lg">
      <h2 className="bg-violet-900 text-white my-4 py-2 px-6 shadow-sm outline  m-2 rounded-md text-center font-bold text-lg md:text-xl">ভাই-বোন সম্পর্কিত তথ্য</h2>

      <label className="text-sm md:text-xl font-semibold text-cyan-950 p-2 md:p-4 text-center">
        ভাইয়ের তথ্য{/* Brother's Information */}
        <textarea
          name="brotherInfo"
          value={siblings.brotherInfo}
          onChange={handleChange}
          className="block w-full md:w-screen bg-gray-50 text-center font-bold  rounded-md border py-2 border-slate-500 sm:py-4 text-gray-600 shadow-lg ring-1 ring-inset ring-gray-300 focus:ring-2  focus:ring-pink-600 sm:max-w-xs sm:text-sm sm:leading-6"
          placeholder="যেমনঃ ১ বড় ভাই, পেশা- ইঞ্জিনিয়ার"
        />
      </label>

      <label className="text-sm md:text-xl font-semibold text-cyan-950 p-2 md:p-4 text-center">
        বোনের তথ্য{/* Sister's Information */}
        <textarea
          name="sisterInfo"
          value={siblings.sisterInfo}
          onChange={handleChange}
          className="block w-full md:w-screen bg-gray-50 text-center font-bold  rounded-md border py-2 border-slate-500 sm:py-4 text-gray-600 shadow-lg ring-1 ring-inset ring-gray-300 focus:ring-2  focus:ring-pink-600 sm:max-w-xs sm:text-sm sm:leading-6"
          placeholder="যেমনঃ ১ ছোট বোন, পেশা- ডাক্তার"
        />
      </label>

      <label className="text-sm md:text-xl font-semibold text-cyan-950 p-2 md:p-4 text-center">
        ভাই-বোন সম্পর্কে{/* About Siblings */}
        <textarea
          name="aboutSiblings"
          value={siblings.aboutSiblings}
          onChange={handleChange}
          className="block w-full md:w-screen bg-gray-50 text-center font-bold  rounded-md border py-2 border-slate-500 sm:py-4 text-gray-600 shadow-lg ring-1 ring-inset ring-gray-300 focus:ring-2  focus:ring-pink-600 sm:max-w-xs sm:text-sm sm:leading-6"
          placeholder="যেমনঃ এক ভাই, এক বোন"
        />
      </label>
    </div>
  );
};

export default SiblingInfoForm;
