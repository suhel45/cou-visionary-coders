import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../../utils/Loading/Loading';

const fetchBiodataDetail = async (id: string) => {
    const response = await axios.get(`http://localhost:3000/api/profile/biodata/${id}`);
    console.log(response.data);
    return response.data;
  };

const BiodataDetailsProfile = () => {
    const {id} = useParams<{id: string}>()

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
    <div>BiodataDetailsProfile</div>
  )
}

export default BiodataDetailsProfile