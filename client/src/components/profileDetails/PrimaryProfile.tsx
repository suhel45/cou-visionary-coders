import React, { useEffect, useState } from 'react';
import { BadgeCheck, Link, CircleUserRound } from 'lucide-react';
import profileimage from '../../assets/profilepage.jpeg';
import { useNavigate } from 'react-router-dom';

interface PrimaryProfileProps {
  username: string;
}

interface LinkFieldProps {
  msgData: string;
  linkData: string;
  linkurl: string;
  onComplete: () => void;
  isGreen?: boolean;
}
// add linkedfield component
const LinkField: React.FC<LinkFieldProps> = ({
  msgData,
  linkData,
  linkurl,
  onComplete,
  isGreen,
}) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/${linkurl.toLowerCase().replace(' ', '/')}`);
    onComplete();
  };

  return (
    <div className="mt-4 bg-gray-100 p-4 rounded-md border-2 border-green-800">
      <p className="mt-4 text-lg sm:text-2xl text-green-900 font-bold">
        {msgData}
      </p>
      <button
        onClick={handleNavigate}
        className={`font-semibold inline-flex items-center gap-2 mt-2 text-white hover:text-gray-200 transition text-sm sm:text-lg py-2 px-4 rounded-md ${isGreen ? 'bg-green-800' : 'bg-indigo-900'}`}
      >
        <Link size={18} /> {linkData}
      </button>
    </div>
  );
};
// implement primary profile component
const PrimaryProfile: React.FC<PrimaryProfileProps> = ({ username }) => {
  const [isVerified, setIsVerified] = useState(false);
  const [isBiodataCreated, setIsBiodataCreated] = useState(false);

  useEffect(() => {
    // Fetch user verification and biodata status from serv
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/user-status'); // Adjust API endpoint as needed
        const data = await response.json();
        setIsVerified(data.isVerified);
        setIsBiodataCreated(data.isBiodataCreated);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <div className="flex flex-col items-center p-6 rounded-md shadow-lg sm:w-1/3 text-center border border-gray-200 m-2">
      <h2 className="flex gap-2 items-center py-2 px-4 text-2xl font-semibold text-indigo-900 border border-gray-200 rounded-full">
        <CircleUserRound size={32} /> Welcome, {username}
      </h2>
      <div
        className={`flex items-center justify-center gap-2 mt-2 p-2 text-white rounded-md base-1/2 ${isVerified ? 'bg-green-600' : 'bg-indigo-900'}`}
      >
        <BadgeCheck className="text-white" />
        <span className="text-sm sm:text-lg font-semibold">
          Verification Status:
          <span
            className={`text-white py-1 px-4 rounded-full m-2 ${isVerified ? 'bg-green-600' : 'bg-red-600'}`}
          >
            {isVerified ? 'Verified' : 'Unverified'}
          </span>
        </span>
      </div>
      <img
        src={profileimage}
        alt="Profile"
        className="w-1/2 h-auto rounded-full mt-4"
      />
      <div className="flex flex-col items-stretch gap-4 mt-4 w-full">
        {!isVerified && (
          <LinkField
            msgData="আপনার প্রোফাইল ভেরিফাই করুন"
            linkData="Verify Profile"
            linkurl="dashboard verify"
            onComplete={() => setIsVerified(true)}
          />
        )}
        {!isBiodataCreated && (
          <LinkField
            msgData="আপনার বায়োডাটা তৈরী করুন"
            linkData="Biodata Form"
            linkurl="dashboard edit biodata"
            onComplete={() => setIsBiodataCreated(true)}
          />
        )}
        {isBiodataCreated && (
          <LinkField
            msgData="আপনার বায়োডাটা দেখুন"
            linkData="View Biodata"
            linkurl="dashboard/view-biodata"
            onComplete={() => {}}
            isGreen={true}
          />
        )}
      </div>
    </div>
  );
};

export default PrimaryProfile;
