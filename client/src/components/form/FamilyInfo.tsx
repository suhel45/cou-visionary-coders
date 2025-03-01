import { useState, useEffect } from "react";

interface FamilyInfoProps {
  formData: {
    father: {
      aliveStatus: boolean;
      profession: string;
    };
    mother: {
      aliveStatus: boolean;
      profession: string;
    };
    siblings: {
      brotherInfo: string;
      sisterInfo: string;
      aboutSiblings: string;
    };
    financialStatus: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const FamilyInfo: React.FC<FamilyInfoProps> = ({ formData, setFormData }) => {
  const [localFormData, setLocalFormData] = useState({
    fatherAliveStatus: true,
    fatherProfession: "",
    motherAliveStatus: true,
    motherProfession: "",
    brotherInfo: "",
    sisterInfo: "",
    aboutSiblings: "",
    financialStatus: "",
  });

  useEffect(() => {
    setLocalFormData({
      fatherAliveStatus: formData.father?.aliveStatus ?? true,
      fatherProfession: formData.father?.profession || "",
      motherAliveStatus: formData.mother?.aliveStatus ?? true,
      motherProfession: formData.mother?.profession || "",
      brotherInfo: formData.siblings?.brotherInfo || "",
      sisterInfo: formData.siblings?.sisterInfo || "",
      aboutSiblings: formData.siblings?.aboutSiblings || "",
      financialStatus: formData.financialStatus || "",
    });
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
  
    setLocalFormData({
      ...localFormData,
      [name]: newValue,
    });
  
    setFormData((prevData: any) => {
      if (name === "fatherProfession") {
        return {
          ...prevData,
          father: { ...prevData.father, profession: newValue },
        };
      } else if (name === "motherProfession") {
        return {
          ...prevData,
          mother: { ...prevData.mother, profession: newValue },
        };
      } else if (name === "brotherInfo" || name === "sisterInfo" || name === "aboutSiblings") {
        return {
          ...prevData,
          siblings: { ...prevData.siblings, [name]: newValue },
        };
      } else {
        return {
          ...prevData,
          [name]: newValue,
        };
      }
    });
  };

  const handleAliveStatus = (parent: string, status: boolean) => {
    if (parent === "father") {
      setLocalFormData({ ...localFormData, fatherAliveStatus: status });
      setFormData((prevData: any) => ({
        ...prevData,
        father: { ...prevData.father, aliveStatus: status },
      }));
    } else if (parent === "mother") {
      setLocalFormData({ ...localFormData, motherAliveStatus: status });
      setFormData((prevData: any) => ({
        ...prevData,
        mother: { ...prevData.mother, aliveStatus: status },
      }));
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col items-center border border-gray-400 bg-purple-100 p-2 rounded-md md:m-4 shadow-lg">
        <h2 className="heading">পারিবারিক তথ্য</h2>
        <form className="w-full md:w-auto bg-white border-pink-600 p-4 md:px-16 my-4 rounded-md border shadow-lg hover:shadow-lg flex flex-col gap-4">

          {/* Father's Information */}
          <div className="flex flex-row justify-center">
            <h2 className="label font-semibold">পিতা - </h2>
            <div className="flex gap-4 border border-gray-400 p-2 rounded">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={localFormData.fatherAliveStatus}
                  onChange={() => handleAliveStatus("father", true)}
                  className="accent-green-600 md:h-4 md:w-4"
                />
                <span className="md:text-lg font-semibold text-gray-700">জীবিত</span>
              </label>

              <label className="flex items-center space-x-2">{/*  */}
                <input
                  type="checkbox"
                  checked={!localFormData.fatherAliveStatus}
                  onChange={() => handleAliveStatus("father", false)}
                  className="accent-red-600 md:h-4 md:w-4"
                />
                <span className="md:text-lg font-semibold text-gray-700">মৃত</span>
              </label>
            </div>
          </div>

          <label className="label">পিতার পেশা{/*  */}
          <input
            type="text"
            name="fatherProfession"
            value={localFormData.fatherProfession}
            onChange={handleChange}
            className="form-input p-2 border border-gray-400 rounded-md w-full"
            placeholder="যেমনঃ ব্যবসায়ী, চাকুরীজীবী"
          /></label>

          {/* Mother's Information */}
          <div className="flex flex-row justify-center">
            <h2 className="label font-semibold">মাতা - </h2>
            <div className="flex gap-4 border border-gray-400 p-2 rounded">
              <label className="flex items-center space-x-2">{/*  */}
                <input
                  type="checkbox"
                  checked={localFormData.motherAliveStatus}
                  onChange={() => handleAliveStatus("mother", true)}
                  className="accent-green-600 md:h-4 md:w-4"
                />
                <span className="md:text-lg font-semibold text-gray-700">জীবিত</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={!localFormData.motherAliveStatus}
                  onChange={() => handleAliveStatus("mother", false)}
                  className="accent-red-600 md:h-4 md:w-4"
                />
                <span className="md:text-lg font-semibold text-gray-700">মৃত</span>
              </label>
            </div>
          </div>

          <label className="label">মাতার পেশা{/*  */}
          <input
            type="text"
            name="motherProfession"
            value={localFormData.motherProfession}
            onChange={handleChange}
            className="form-input p-2 border border-gray-400 rounded-md w-full"
            placeholder="যেমনঃ শিক্ষক, গৃহিণী"
          />
        </label>
          {/* Siblings Information */}
          <label className="label">ভাইয়ের তথ্য{/*  */}
          <textarea
            name="brotherInfo"
            value={localFormData.brotherInfo}
            onChange={handleChange}
            className="form-input p-2 border border-gray-400 rounded-md w-full"
            placeholder="যেমনঃ ১ বড় ভাই, পেশা- ইঞ্জিনিয়ার"
          /></label>

          <label className="label">বোনের তথ্য{/*  */}
          <textarea
            name="sisterInfo"
            value={localFormData.sisterInfo}
            onChange={handleChange}
            className="form-input p-2 border border-gray-400 rounded-md w-full"
            placeholder="যেমনঃ ১ ছোট বোন, পেশা- ডাক্তার"
          /></label>

          <label className="label">ভাই-বোন সম্পর্কে{/*  */}
          <textarea
            name="aboutSiblings"
            value={localFormData.aboutSiblings}
            onChange={handleChange}
            className="form-input p-2 border border-gray-400 rounded-md w-full"
            placeholder="যেমনঃ এক ভাই, এক বোন"
          /></label>

          {/* Financial Status */}
          <label className="label flex flex-col justify-center items-center">পারিবারিক আর্থিক অবস্থা {/*  */}
          <select
            name="financialStatus"
            value={localFormData.financialStatus}
            onChange={handleChange}
            className="option-btn"
          >
            <option>নির্বাচন করুন</option>
            <option value="Lower Class">নিম্নবিত্ত</option>
            <option value="Middle Class">মধ্যবিত্ত</option>
            <option value="Upper Middle Class">উচ্চ মধ্যবিত্ত</option>
            <option value="Upper Class">উচ্চবিত্ত</option>
          </select></label>
        </form>
      </div>
    </div>
  );
};

export default FamilyInfo;
