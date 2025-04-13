import React from 'react';
import { Link } from 'react-router-dom';
import { BiodataCardProps } from '../../interfaces/BiodataSearch.interface';

const BiodataCard: React.FC<BiodataCardProps> = ({
  user,
  currentPage,
  isSearching,
}) => {
  const { personalInfo } = user;
  const isMan = personalInfo.gender.toLowerCase() === 'male';

  return (
    <li className="md:basis-1/3">
      <div className="flex flex-row md:flex-col items-center gap-2 bg-violet-950 p-2 rounded-lg m-2 shadow-lg">
        <img
          src={isMan ? 'src/assets/man.png' : 'src/assets/woman.png'}
          alt={isMan ? 'Man' : 'Woman'}
          className="h-24 w-24 bg-white rounded-lg"
        />
        <div className="w-full md:text-center p-4 bg-violet-900 rounded-md">
          <p className="text-violet-100 bg-violet-950 font-bold text-xl rounded-lg border text-center p-2">
            Biodata - {user.biodataNo}
          </p>
          <div className="p-2 text-lg md:text-xl">
            <p className="text-white py-1 font-bold rounded-md">
              জন্ম তারিখ : {personalInfo.birthDate}
            </p>
            <p className="text-white py-1 font-bold rounded-md">
              উচ্চতা : {personalInfo.height}
            </p>
            <p className="text-white py-1 font-bold rounded-md">
              পেশা : {personalInfo.occupation}
            </p>
            {isSearching && personalInfo.complexion && (
              <p className="text-white py-1 font-bold rounded-md">
                গায়ের রং : {personalInfo.complexion}
              </p>
            )}
          </div>
          <Link
            to={`/biodata/profile/${user._id}`}
            state={{ returnPage: currentPage }}
            className="bg-white py-2 px-4 rounded-full text-lg text-purple-800 hover:text-pink-900 hover:px-6 font-bold mt-2 inline-block"
          >
            View Profile
          </Link>
        </div>
      </div>
    </li>
  );
};

export default BiodataCard;
