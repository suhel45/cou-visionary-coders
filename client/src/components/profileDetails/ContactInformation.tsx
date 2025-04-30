import React from 'react';
import { ContactInfoData } from '../../interfaces/Biodata.interface';

interface ContactProps {
  data: ContactInfoData;
}

const ContactInformation: React.FC<ContactProps> = ({ data }) => {
  return (
    <div className="p-4 min-h-screen">
      <div className="max-w-auto mx-auto bg-purple-100 rounded-3xl shadow-lg border-4 border-purple-900 p-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-700 to-purple-800 text-white text-center py-4 rounded-2xl mb-6">
          <h1 className="text-lg font-bold">যোগাযোগের তথ্য</h1>
        </div>

        {/* Guardian Information */}
        <div className="border-2 border-purple-700 rounded-2xl p-2 md:p-4 mb-6 bg-white text-gray-800">
          <h2 className="bg-indigo-900 text-white text-center p-2 rounded-xl mb-4">
            অভিভাবকের তথ্য
          </h2>
          <p className="text-sm md:text-lg p-2 text-center">
            <span className="font-bold">নাম ও সম্পর্ক - </span>
            {data.guardianInfo || 'তথ্য প্রদান করা হয়নি'}
          </p>
        </div>

        {/* Guardian Contact */}
        <div className="border-2 border-purple-700 rounded-2xl p-2 md:p-4 mb-6 bg-white text-gray-800">
          <h2 className="bg-indigo-900 text-white text-center p-2 rounded-xl mb-4">
            অভিভাবকের যোগাযোগ
          </h2>
          <p className="text-sm md:text-lg p-2 text-center">
            <span className="font-bold">মোবাইল নম্বর - </span>
            {data.guardianContact || 'তথ্য প্রদান করা হয়নি'}
          </p>
        </div>

        {/* Candidate Contact */}
        <div className="border-2 border-purple-700 rounded-2xl p-2 md:p-4 mb-6 bg-white text-gray-800">
          <h2 className="bg-indigo-900 text-white text-center p-2 rounded-xl mb-4">
            প্রার্থীর যোগাযোগ
          </h2>
          <div className="space-y-2">
            <p className="text-sm md:text-lg p-2 text-center">
              <span className="font-bold">মোবাইল নম্বর - </span>
              {data.candidateNumber || 'তথ্য প্রদান করা হয়নি'}
            </p>
            <p className="text-sm md:text-lg p-2 text-center">
              <span className="font-bold">ইমেইল - </span>
              {data.candidateEmail || 'তথ্য প্রদান করা হয়নি'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInformation;
