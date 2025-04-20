import React from 'react';
import { Link } from 'react-router-dom';
import { BiodataCardProps } from '../../interfaces/BiodataSearch.interface';

import FavoriteButton from '../FavoriteButton';
import manImage from '../../assets/man.png';
import womanImage from '../../assets/woman.png';
import { InfoItem } from '../../utils/InfoItem/InfoItem';

const BiodataCard: React.FC<BiodataCardProps> = ({
  user,
  currentPage,
  mode = 'add',
}) => {
  const { personalInfo } = user;
  const isMan = personalInfo.gender.toLowerCase() === 'male';
  const profileImage = isMan ? manImage : womanImage;

  return (
    <li className="md:w-full lg:w-1/3 p-2">
      <div className="relative flex flex-row md:flex-col items-center gap-2 bg-violet-950 p-3 rounded-lg shadow-lg h-full">
        {/* Favorite Button */}
        <FavoriteButton biodataId={user._id} mode={mode} />

        {/* Profile Image */}
        <div className="flex-shrink-0">
          <img
            src={profileImage}
            alt={isMan ? 'Man' : 'Woman'}
            className="h-24 w-24 bg-white rounded-lg object-cover"
          />
        </div>

        {/* Info Section */}
        <div className="w-full md:text-center p-4 bg-violet-900 rounded-md flex flex-col h-full">
          {/* Biodata Number */}
          <p className="text-violet-100 bg-violet-950 font-bold text-xl rounded-lg border text-center p-2 mb-3">
            Biodata - {user.biodataNo}
          </p>

          {/* Personal Information */}
          <div className="p-2 text-lg md:text-xl flex-grow">
            <InfoItem label="জন্ম তারিখ" value={personalInfo.birthDate} />
            <InfoItem label="উচ্চতা" value={personalInfo.height} />
            <InfoItem label="পেশা" value={personalInfo.occupation} />
            <InfoItem label="গায়ের রং" value={personalInfo.complexion} />
          </div>

          {/* View Profile Button */}
          <div className="mt-3 text-center">
            <Link
              to={`/biodata/profile/${user._id}`}
              state={{ returnPage: currentPage }}
              className="bg-white py-2 px-4 rounded-full text-lg text-purple-800 hover:text-pink-900 hover:bg-gray-100 transition-all font-bold inline-block"
            >
              View Profile
            </Link>
          </div>

        </div>
      </div>
    </li>
  );
};

export default BiodataCard;
