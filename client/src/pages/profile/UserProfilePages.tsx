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
} from '../../interfaces/Biodata.interface';
import Loading from '../../utils/Loading/Loading';

interface UserData {
  data: any;
  personalInfo: PersonalInfoData;
  education: EducationInfoData;
  address: AddressInfoData;
  familyInformation: FamilyInfoData;
}

const UserProfilePages = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          'http://localhost:3000/api/profile/biodata',
          {
            withCredentials: true,
          },
        );
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col md:flex-row  gap-2  bg-gray-50 h-auto ">
      <div className="flex flex-col items-center md:items-stretch bg-gray-50 md:w-1/3">
        {userData && (
          <UserProfile
            data={userData?.data?.personalInfo}
            biodataNo={userData?.data?.biodataNo}
          />
        )}
      </div>
      <div className="flex flex-col items-stretch bg-gray-50 md:w-2/3">
        <FamilyInformation data={userData?.data?.familyInformation} />
        <EducationInformation data={userData?.data?.education} />
        <AddressInformation data={userData?.data?.address} />
      </div>
    </div>
  );
};

export default UserProfilePages;
