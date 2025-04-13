import React, { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import { keepPreviousData, QueryClient, useQuery } from '@tanstack/react-query';
import { PersonalInfoData } from '../../interfaces/Biodata.interface';
import Loading from '../../utils/Loading/Loading';
import { Link } from 'react-router-dom';
import BiodataSearch, { SearchParams } from './BiodataSearch'; 

interface User {
  _id: string;
  biodataNo: string;
  personalInfo: PersonalInfoData;
}

const BiodataList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = new QueryClient();
  const biodataPerPage = 3;
  const [searchParams, setSearchParams] = useState<SearchParams>({});
  const [isSearching, setIsSearching] = useState(false);

  // Function to fetch data with search parameters
  const fetchData = async (page: number, biodataPerPage: number, searchParams: SearchParams) => {
    // Start building the URL with pagination parameters
    let url = `${import.meta.env.VITE_BACKEND_BASE_URL}/api/biodata?_page=${page}&_limit=${biodataPerPage}`;
    
    // Add search parameters to the URL if they exist
    if (Object.keys(searchParams).length > 0) {
      Object.entries(searchParams).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          url += `&${key}=${encodeURIComponent(value)}`;
        }
      });
    }
    
    const response = await axios.get(url);
    return response.data;
  };

  const { data, isLoading, isFetching, error, refetch } = useQuery({
    queryKey: ['biodata', currentPage, searchParams],
    queryFn: () => fetchData(currentPage, biodataPerPage, searchParams),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  // Prefetching next page
  useEffect(() => {
    if (
      data?.totalbiodata &&
      data.totalbiodata > currentPage * biodataPerPage
    ) {
      queryClient.prefetchQuery({
        queryKey: ['biodata', currentPage + 1, searchParams],
        queryFn: () => fetchData(currentPage + 1, biodataPerPage, searchParams),
      });
    }
  }, [currentPage, data, queryClient, biodataPerPage, searchParams]);

  const pageCount = data ? Math.ceil(data.totalbiodata / biodataPerPage) : 0;

  // Handle page change
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setCurrentPage(value);
  };

  // Handle search submission from the BiodataSearch component
  const handleSearch = (params: SearchParams) => {
    setSearchParams(params);
    setIsSearching(Object.values(params).some(value => value !== ''));
    setCurrentPage(1); // Reset to first page when searching
    refetch();
  };

  // Handle clear filters from the BiodataSearch component
  const handleClearFilters = () => {
    setSearchParams({});
    setIsSearching(false);
    setCurrentPage(1);
    refetch();
  };

  if (isLoading || isFetching) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-600">
        {error instanceof Error ? error.message : 'An unknown error occurred'}
      </div>
    );
  }

  return (
    <div className="mx-2 md:mx-10">
      {/* Import and use the BiodataSearch component */}
      <BiodataSearch
        onSearch={handleSearch}
        onClear={handleClearFilters}
        initialParams={searchParams}
        className="mb-6"
      />

      {/* Search Results Label */}
      {isSearching && (
        <div className="bg-violet-100 text-violet-900 p-3 rounded-lg mb-4 text-center font-bold">
          Showing filtered results. Found {data?.totalbiodata || 0} matching profiles.
        </div>
      )}

      <h4 className="text-center text-2xl sm:text-5xl rounded-full p-4 m-4 sm:m-5 font-bold bg-violet-950 text-white sm:w-1/2 sm:mx-auto">
        Biodata List
      </h4>
      
      {/* Biodata List */}
      <ul className="flex flex-col md:flex-row flex-wrap md:items-center md:justify-center py-12">
        {data?.data?.length > 0 ? (
          data.data.map((user: User) => (
            <li key={user._id} className="md:basis-1/3">
              <div className="flex flex-row md:flex-col items-center gap-2 bg-violet-950 p-2 rounded-lg m-2 shadow-lg">
                <img
                  src={
                    user.personalInfo.gender.toLowerCase() === 'male'
                      ? 'src/assets/man.png'
                      : 'src/assets/woman.png'
                  }
                  alt={user.personalInfo.gender === 'male' ? 'Man' : 'Woman'}
                  className="h-24 w-24 bg-white rounded-lg"
                />
                <div className="w-full md:text-center p-4 bg-violet-900 rounded-md">
                  <p className="text-violet-100 bg-violet-950 font-bold text-xl rounded-lg border text-center p-2">
                    Biodata - {user?.biodataNo}
                  </p>
                  <div className="p-2 text-lg md:text-xl">
                    <p className="text-white py-1 font-bold rounded-md">
                      জন্ম তারিখ : {user.personalInfo.birthDate}
                    </p>
                    <p className="text-white py-1 font-bold rounded-md">
                      উচ্চতা : {user.personalInfo.height}
                    </p>
                    <p className="text-white py-1 font-bold rounded-md">
                      পেশা : {user.personalInfo.occupation}
                    </p>
                    {isSearching && user.personalInfo.complexion && (
                      <p className="text-white py-1 font-bold rounded-md">
                        গায়ের রং : {user.personalInfo.complexion}
                      </p>
                    )}
                  </div>
                  <Link
                    to={`/biodata/profile/${user._id}`}
                    className="bg-white py-2 px-4 rounded-full text-lg text-purple-800 hover:text-pink-900 hover:px-6 font-bold mt-2 inline-block"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            </li>
          ))
        ) : (
          <div className="w-full text-center py-10 text-xl text-violet-800">
            No biodata found matching your criteria.
          </div>
        )}
      </ul>

      {/*Render pagination*/}
      {pageCount > 0 && (
        <div className="flex flex-col items-center my-4 p-2">
          <Stack spacing={2}>
            <Pagination
              count={pageCount}
              page={currentPage}
              onChange={handlePageChange}
              variant="outlined"
              shape="rounded"
            />
          </Stack>
        </div>
      )}
    </div>
  );
};

export default BiodataList;