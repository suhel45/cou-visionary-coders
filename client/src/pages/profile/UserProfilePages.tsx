import React, { useEffect, useState } from 'react';
import UserProfile from '../../components/UserProfile';
import FamilyInformation from '../../components/profileDetails/FamilyInformation';
import EducationInformation from '../../components/profileDetails/EducationalInformation';
import AddressInformation from '../../components/profileDetails/AddressInformation';
import axios from 'axios';
import {
  AddressInfoData,
  EducationInfoData,
  FamilyInfoData,
  PersonalInfoData,
  // PartnerInfoData,
} from '../../interfaces/Biodata.interface';
import Loading from '../../utils/Loading/Loading';
import PrimaryProfile from '../../components/profileDetails/PrimaryProfile';
//import PartnerInformation from './../../components/profileDetails/PartnerInformation';

interface UserData {
  data: any;
  personalInfo: PersonalInfoData;
  education: EducationInfoData;
  address: AddressInfoData;
  familyInformation: FamilyInfoData;
  //partnerInformation: PartnerInfoData;
}

const UserProfilePages = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/api/profile/biodata`,
          {
            withCredentials: true,
          },
        );
        setUserData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load profile data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row  gap-2  bg-gray-50 h-auto ">
      <div className="flex flex-col items-center md:items-stretch bg-gray-50 md:w-1/2">
        {userData && (
          <PrimaryProfile username="Shuvo"/>
        )}
      </div>
      <div className="flex flex-col items-stretch bg-gray-50 md:w-1/2">
        {userData && (
          <>
            <UserProfile
              data={userData?.data?.personalInfo}
              biodataNo={userData.data.biodataNo}
            />
            <FamilyInformation data={userData.data.familyInformation} />
            <EducationInformation data={userData.data.education} />
            <AddressInformation data={userData.data.address} />
            {/* <PartnerInformation data={userData.data.partnerInformation} /> */}
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfilePages;
