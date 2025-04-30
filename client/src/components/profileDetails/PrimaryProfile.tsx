import React, { useState } from 'react';
import { BadgeCheck, Link, CircleUserRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useBiodataStatus } from '../../Hooks/useBiodataStatus/useBiodataStatus';
import { useAuth } from '../../Hooks/useAuth/useAuth';

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
    <div className="mt-4 bg-gray-100 p-2 rounded-md border-2 border-green-800">
      <p className="mt-4 text-lg text-green-900 font-bold">{msgData}</p>
      <button
        onClick={handleNavigate}
        className={`font-semibold inline-flex items-center gap-2 mt-2 text-white hover:text-gray-200 transition text-sm py-2 px-4 rounded-md ${isGreen ? 'bg-green-800' : 'bg-indigo-900'}`}
      >
        <Link size={18} /> {linkData}
      </button>
    </div>
  );
};

const PrimaryProfile: React.FC<PrimaryProfileProps> = () => {
  const { biodataCreated, idStatus, loading } = useBiodataStatus();
  const [localBiodataCreated, setLocalBiodataCreated] = useState<boolean | null>(null);
  const [localVerified, setLocalVerified] = useState<boolean | null>(null);
  const { user } = useAuth();

  if (loading) {
    return <div className="p-6 text-center">Loading user profile...</div>;
  }

  // fallback to local updates if user completes actions without refetch
const isVerified = localVerified ?? (idStatus === 'Approved');
const isBiodata = localBiodataCreated ?? biodataCreated;
  

  return (
    <div className="flex flex-col items-center p-6 rounded-lg shadow-lg text-center border-4 border-violet-900 m-4">
      <h2 className="flex gap-2 items-center py-2 px-4 text-xl font-semibold text-indigo-900 border border-gray-200 rounded-full">
        <CircleUserRound size={32} /> Welcome, {user.displayName}!
      </h2>
      <div
        className={`flex items-center justify-center gap-2 mt-2 p-2 text-white rounded-md base-1/2 ${isVerified ? 'bg-green-600' : 'bg-indigo-900'}`}
      >
        <BadgeCheck className="text-white" />
        <span className="text-sm font-semibold">
          Verification Status:{' '}
          <span
            className={`text-white py-1 px-4 rounded-full m-2 ${isVerified ? 'bg-green-600' : 'bg-red-600'}`}
          >
            {isVerified ? 'Verified' : 'Unverified'}
          </span>
        </span>
      </div>

      <div className="flex flex-col items-stretch gap-4 mt-4 w-full">
        {!isVerified && (
          <LinkField
            msgData="আপনার প্রোফাইল ভেরিফাই করুন"
            linkData="Verify Profile"
            linkurl="dashboard edit/verify"
            onComplete={() => setLocalVerified(true)}
          />
        )}
        {!isBiodata && (
          <LinkField
            msgData="আপনার বায়োডাটা তৈরী করুন"
            linkData="Biodata Form"
            linkurl="dashboard edit/biodata"
            onComplete={() => setLocalBiodataCreated(true)}
          />
        )}
        {isBiodata && (
          <LinkField
            msgData="আপনার বায়োডাটা আপডেট করুন"
            linkData="Update Biodata"
            linkurl="dashboard/edit/biodata"
            onComplete={() => {}}
            isGreen={true}
          />
        )}
      </div>
    </div>
  );
};

export default PrimaryProfile;
