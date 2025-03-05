import { useState, useEffect, ChangeEvent } from 'react';
import { ContactInfoData } from '../../interfaces/Biodata.interface';

type ContactInfo = {
  formData: ContactInfoData;
  setFormData: (data: ContactInfoData) => void;
};

const ContactInfo: React.FC<ContactInfo> = ({ formData, setFormData }) => {
  const [localFormData, setLocalFormData] = useState<ContactInfoData>({
    guardianInfo: '',
    guardianContact: '',
    candidateNumber: '',
    candidateEmail: '',
  });

  useEffect(() => {
    setLocalFormData({ ...formData });
  }, [formData]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocalFormData((prev) => ({ ...prev, [name]: value }));
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="w-full">
      <div className="flex flex-col items-stretch md:items-center border border-gray-400 bg-purple-100 p-2 rounded-md md:m-4 shadow-lg">
        <h2 className="heading">যোগাযোগ</h2>
        <form className="md:items-center md:justify-center w-full md:w-auto bg-white border-pink-600 p-4 md:px-28 my-4 rounded-md border shadow-lg hover:shadow-lg flex flex-col gap-2">
          <label className="label py-0">
            অভিভাবকের নাম ও সম্পর্ক {/* */}
            <input
              type="text"
              name="guardianInfo"
              value={localFormData.guardianInfo}
              onChange={handleChange}
              className="option-btn p-2"
              placeholder="নাম ( সম্পর্ক )"
            />
          </label>
          <br />
          <label className="label py-0">
            অভিভাবকের ফোন নাম্বার {/* */}
            <input
              type="text"
              name="guardianContact"
              value={localFormData.guardianContact}
              onChange={handleChange}
              className="option-btn p-2"
              placeholder="মোবাইল নাম্বার"
            />
          </label>
          <br />
          <label className="label py-0">
            নিজের মোবাইল নাম্বার {/* */}
            <input
              type="text"
              name="candidateNumber"
              value={localFormData.candidateNumber}
              onChange={handleChange}
              className="option-btn p-2"
              placeholder="মোবাইল নাম্বার"
            />
          </label>
          <br />
          <label className="label py-0">
            নিজের ইমেইল {/* */}
            <input
              type="email"
              name="camdidateEmail"
              value={localFormData.candidateEmail}
              onChange={handleChange}
              className="option-btn p-2"
              placeholder="ইমেইল"
            />
          </label>
          <br />
          <div>
            {' '}
            {/* */}
            <p className="font-semibold text-red-950 shadow-md text-xs text-justify border border-red-900 sm:text-sm p-2 bg-red-100 rounded-lg">
              বিঃ দ্রঃ আপনার দেওয়া তথ্য কোনোভাবে ভুল প্রমাণিত হলে আপনার একাউন্ট
              টি বাতিল করা হবে।
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactInfo;
