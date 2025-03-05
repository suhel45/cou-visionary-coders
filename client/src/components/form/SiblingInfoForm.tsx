import React from "react";
import { FamilyInfoData } from "../../interfaces/Biodata.interface";

interface SiblingInfoFormProps {
  siblings: FamilyInfoData["siblings"];
  onChange: (updatedSiblings: FamilyInfoData["siblings"]) => void;
}

const SiblingInfoForm: React.FC<SiblingInfoFormProps> = ({ siblings, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    onChange({
      ...siblings,
      [name]: value,
    });
  };
  return (
    <div className="flex flex-col items-stretch sm:items-center sm:justify-center justify-stretch border border-gray-400  p-2 rounded-md shadow-lg">
      <h2 className="subheading">ভাই-বোন সম্পর্কিত তথ্য</h2>

      <label className="label">
        ভাইয়ের তথ্য{/* Brother's Information */}
        <textarea
          name="brotherInfo"
          value={siblings.brotherInfo}
          onChange={handleChange}
          className="option-btn"
          placeholder="যেমনঃ ১ বড় ভাই, পেশা- ইঞ্জিনিয়ার"
        />
      </label>

      <label className="label">
        বোনের তথ্য{/* Sister's Information */}
        <textarea
          name="sisterInfo"
          value={siblings.sisterInfo}
          onChange={handleChange}
          className="option-btn"
          placeholder="যেমনঃ ১ ছোট বোন, পেশা- ডাক্তার"
        />
      </label>

      <label className="label">
        ভাই-বোন সম্পর্কে{/* About Siblings */}
        <textarea
          name="aboutSiblings"
          value={siblings.aboutSiblings}
          onChange={handleChange}
          className="option-btn"
          placeholder="যেমনঃ এক ভাই, এক বোন"
        />
      </label>
    </div>
  );
};

export default SiblingInfoForm;
