import React, { useState, useEffect, ChangeEvent } from 'react';
import { ContactInfoData } from '../../interfaces/Biodata.interface';

type IContactInfo = {
  formData: ContactInfoData;
  setFormData: (data: ContactInfoData) => void;
};

const ContactInfo: React.FC<IContactInfo> = ({ formData, setFormData }) => {
  const [localFormData, setLocalFormData] = useState<ContactInfoData>({
    guardianInfo: '',
    guardianContact: '',
    candidateNumber: '',
    candidateEmail: '',
  });
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const mobileRegex = /^(?:\+88)?01[3-9]\d{8}$/;
  useEffect(() => {
    setLocalFormData({ ...formData });
  }, [formData]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (!emailRegex.test(localFormData.candidateEmail)) {
      localFormData.candidateEmail = '';
    }
    if (!mobileRegex.test(localFormData.guardianContact)) {
      localFormData.guardianContact = '';
    }
    if (!mobileRegex.test(localFormData.candidateNumber)) {
      localFormData.candidateNumber = '';
    }
    setLocalFormData((prev) => ({ ...prev, [name]: value }));
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="w-full h-full border border-gray-400 bg-purple-50 rounded-md  shadow-lg md:m-4">
      <div className="flex flex-col items-stretch md:items-center  p-2 ">
        <h2
          className="bg-pink-600 text-white py-2 px-6 shadow-sm outline outline-pink-600  outline-offset-2  m-2 rounded-md text-center font-bold text-xl md:text-2xl
"
        >
          যোগাযোগ
        </h2>
        <form className="md:items-center md:justify-center w-full md:w-auto bg-white border-pink-600 p-4 md:px-28 my-4 rounded-md border shadow-lg hover:shadow-lg flex flex-col gap-2">
          <label
            className="text-sm md:text-xl font-semibold text-cyan-950 p-2 md:p-4 text-center
 py-0"
          >
            অভিভাবকের নাম ও সম্পর্ক {/* */}
            <input
              type="text"
              name="guardianInfo"
              value={localFormData.guardianInfo}
              onChange={handleChange}
              className="block w-full md:w-screen bg-gray-50  font-bold  rounded-md border  border-slate-500 sm:py-4 text-gray-600 shadow-lg ring-1 ring-inset ring-gray-300 focus:ring-2  focus:ring-pink-600 sm:max-w-xs sm:text-sm sm:leading-6
 p-4"
              placeholder="নাম ( সম্পর্ক )"
            />
          </label>
          <br />
          <label
            className="text-sm md:text-xl font-semibold text-cyan-950 p-2 md:p-4 text-center
 py-0"
          >
            অভিভাবকের ফোন নাম্বার {/* */}
            <input
              type="text"
              name="guardianContact"
              value={localFormData.guardianContact}
              onChange={handleChange}
              className="block w-full md:w-screen bg-gray-50  font-bold  rounded-md border  border-slate-500 sm:py-4 text-gray-600 shadow-lg ring-1 ring-inset ring-gray-300 focus:ring-2  focus:ring-pink-600 sm:max-w-xs sm:text-sm sm:leading-6
 p-4"
              placeholder="মোবাইল নাম্বার"
            />
            {!mobileRegex.test(localFormData.guardianContact) &&
              localFormData.guardianContact.length > 0 && (
                <span className="text-red-400 text-sm">
                  Invalid Mobile Number
                </span>
              )}
          </label>
          <br />
          <label
            className="text-sm md:text-xl font-semibold text-cyan-950 p-2 md:p-4 text-center
 py-0"
          >
            নিজের মোবাইল নাম্বার {/* */}
            <input
              type="text"
              name="candidateNumber"
              value={localFormData.candidateNumber}
              onChange={handleChange}
              className="block w-full md:w-screen bg-gray-50  font-bold  rounded-md border  border-slate-500 sm:py-4 text-gray-600 shadow-lg ring-1 ring-inset ring-gray-300 focus:ring-2  focus:ring-pink-600 sm:max-w-xs sm:text-sm sm:leading-6
 p-4"
              placeholder="মোবাইল নাম্বার"
            />
            {!mobileRegex.test(localFormData.candidateNumber) &&
              localFormData.candidateNumber.length > 0 && (
                <span className="text-red-400 text-sm">
                  Invalid Mobile Number
                </span>
              )}
          </label>
          <br />
          <label
            className="text-sm md:text-xl font-semibold text-cyan-950 p-2 md:p-4 text-center
 py-0"
          >
            নিজের ইমেইল {/* */}
            <input
              type="text"
              name="candidateEmail"
              value={localFormData.candidateEmail}
              onChange={handleChange}
              className="block w-full md:w-screen bg-gray-50  font-bold  rounded-md border  border-slate-500 sm:py-4 text-gray-600 shadow-lg ring-1 ring-inset ring-gray-300 focus:ring-2  focus:ring-pink-600 sm:max-w-xs sm:text-sm sm:leading-6
 p-4"
              placeholder="ইমেইল"
            />
            {!emailRegex.test(localFormData.candidateEmail) &&
              localFormData.candidateEmail.length > 0 && (
                <span className="text-red-400 text-sm">Invalid Email</span>
              )}
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
