import axios from 'axios';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { SearchParams } from '../../components/biodata/BiodataSearch';
import { BiodataResponse } from '../../interfaces/BiodataSearch.interface';

export function useBiodataQuery(
  page: number,
  filters: SearchParams,
  biodataPerPage: number,
) {
  const fetchBiodata = async (): Promise<BiodataResponse> => {
    let url = `${import.meta.env.VITE_BACKEND_BASE_URL}/api/biodata?_page=${page}&_limit=${biodataPerPage}`;

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        url += `&${key}=${encodeURIComponent(value)}`;
      }
    });

    const response = await axios.get(url);
    return response.data;
  };

  return useQuery({
    queryKey: ['biodata', page, filters],
    queryFn: fetchBiodata,
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}

export default useBiodataQuery;
