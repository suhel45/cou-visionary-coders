import  { useEffect, useState } from 'react';
import UserProfile from '../../components/UserProfile';
import FamilyInformation from '../../components/profileDetails/FamilyInformation';
import EducationInformation from '../../components/profileDetails/EducationalInformation';
import AddressInformation from '../../components/profileDetails/AddressInformation';
import {
  AddressInfoData,
  EducationInfoData,
  FamilyInfoData,
  PersonalInfoData,
  PreferenceInfoData,
  ContactInfoData,
  PartnerInfoData
} from '../../interfaces/Biodata.interface';
import Loading from '../../utils/Loading/Loading';
import PrimaryProfile from '../../components/profileDetails/PrimaryProfile';
import axiosInstance from '../../utils/UseApi/axiosInstance';
import ContactInformation from '../../components/profileDetails/ContactInformation';
import PreferenceInformation from '../../components/profileDetails/PreferenceInformation';
import PartnerInformation from '../../components/profileDetails/PartnerInformation';

interface UserData {
  data: any;
  personalInfo: PersonalInfoData;
  education: EducationInfoData;
  address: AddressInfoData;
  familyInformation: FamilyInfoData;
  contactInfo: ContactInfoData;
  personalPreference: PreferenceInfoData;
  expectedLifePartner: PartnerInfoData;
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
      const response = await axiosInstance.get('/profile/biodata');
        setUserData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load Biodata. Please try again later.');
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
        <PrimaryProfile username="Shuvo" />
        {error}
      </div>
    );
  }

  if (!userData || !userData.data || Object.keys(userData.data).length === 0) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <PrimaryProfile username="Shuvo" />
        <p className="text-lg text-gray-700 mb-4">You have not created your biodata yet.</p>
        <a
          href="/create-biodata"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Create Biodata
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 md:p-4">
      {userData && userData.data && (
        <div className="flex flex-col items-center md:items-stretch  max-w-7xl mx-auto">
          {/* Masonry Layout Container */}
          <div className="columns-1 md:columns-2 lg:columns-2 gap-1 space-y-4">
  
            <div className=" bg-white rounded-lg shadow-md p-1">
              <PrimaryProfile username="Shuvo" />
            </div>
            
            {/* User Profile */}
            {userData.data.personalInfo && (
              <div className=" bg-white rounded-lg shadow-md p-1">
                <UserProfile
                  data={userData.data.personalInfo}
                  biodataNo={userData.data.biodataNo}
                />
              </div>
            )}
          </div>
          <div className="columns-1 md:columns-2 lg:columns-2 gap-1 space-y-4 mt-4">
            {/* Family Information */}
            {userData.data.familyInformation && (
              <div className="break-inside-avoid bg-white rounded-lg shadow-md p-1">
                <FamilyInformation data={userData.data.familyInformation} />
              </div>
            )}
            {/* Education Information */}
            {userData.data.education && (
              <div className="break-inside-avoid bg-white rounded-lg shadow-md p-1">
                <EducationInformation data={userData.data.education} />
              </div>
            )}
            {/* Contact Information */}
            {userData.data.contactInfo && (
              <div className="break-inside-avoid bg-white rounded-lg shadow-md p-1">
                <ContactInformation data={userData.data.contactInfo} />
              </div>
            )}
            {/* Address Information */}
            {userData.data.address && (
              <div className="break-inside-avoid bg-white rounded-lg shadow-md p-1">
                <AddressInformation data={userData.data.address} />
              </div>
            )}
            {/* Preference Information */}
            {userData.data.personalPreference && (
              <div className="break-inside-avoid bg-white rounded-lg shadow-md p-1">
                <PreferenceInformation data={userData.data.personalPreference} />
              </div>
            )}
            {/* Partner Information */}
            {userData.data.expectedLifePartner && (
              <div className="break-inside-avoid bg-white rounded-lg shadow-md p-1">
                <PartnerInformation data={userData.data.expectedLifePartner} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfilePages;
