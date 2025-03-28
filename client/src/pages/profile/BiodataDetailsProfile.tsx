import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../../utils/Loading/Loading';
import UserProfile from '../../components/UserProfile';
import FamilyInformation from '../../components/profileDetails/FamilyInformation';
import EducationInformation from '../../components/profileDetails/EducationalInformation';
import AddressInformation from '../../components/profileDetails/AddressInformation';

const fetchBiodataDetail = async (id: string) => {
  const response = await axios.get(
    `${import.meta.env.VITE_BACKEND_BASE_URL}/api/profile/biodata/${id}`,
  );
  return response.data;
};

const BiodataDetailsProfile = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, error } = useQuery({
    queryKey: ['BiodataDetailsProfile', id],
    queryFn: () => fetchBiodataDetail(id as string),
    enabled: !!id,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-600">
        {(error as Error).message}
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row  gap-2  bg-gray-50 h-auto ">
      <div className="flex flex-col items-center md:items-stretch bg-gray-50 md:w-1/3">
        {data && (
          <UserProfile
            data={data.data.personalInfo}
            biodataNo={data.data.biodataNo}
          />
        )}
      </div>
      <div className="flex flex-col items-stretch bg-gray-50 md:w-2/3">
        {data && (
          <>
            <FamilyInformation data={data.data.familyInformation} />
            <EducationInformation data={data.data.education} />
            <AddressInformation data={data.data.address} />
          </>
        )}
      </div>
    </div>
  );
};

export default BiodataDetailsProfile;
