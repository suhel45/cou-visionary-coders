import React, { useEffect, useState, useCallback } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Loading from '../../utils/Loading/Loading';
import BiodataCard from './BiodataCard';
import useUrlParams from '../../Hooks/useUrlParams/useUrlParams';
import useBiodataQuery from '../../Hooks/useBiodataQuery/useBiodataQuery';
import { SearchParams } from '../../interfaces/Search.interface';
import BiodataSearch from './BiodataSearch';
import { Filter } from 'lucide-react';

const ITEMS_PER_PAGE = 9;

const BiodataList: React.FC = () => {
  const { initialPage, initialSearchParams, hasActiveFilters, updateUrl } =
    useUrlParams();

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [searchFilter, setSearchFilter] =
    useState<SearchParams>(initialSearchParams);
  const [isSearching, setIsSearching] = useState(hasActiveFilters);
  const [showFilters, setShowFilters] = useState(false); // State to toggle filters

  // Fetch data with react-query
  const { data, isLoading, isFetching, error, refetch } = useBiodataQuery(
    currentPage,
    searchFilter,
    ITEMS_PER_PAGE,
  );

  // Update URL when page or filters change - with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      updateUrl(currentPage, searchFilter);
    }, 300); // 300ms debounce

    return () => clearTimeout(timer);
  }, [currentPage, searchFilter, updateUrl]);

  // Handle page change
  const handlePageChange = useCallback(
    (event: React.ChangeEvent<unknown>, value: number) => {
      if (value !== currentPage) {
        setCurrentPage(value);
      }
    },
    [currentPage],
  );

  // Handle search submission
  const handleSearch = useCallback(
    (params: SearchParams) => {
      setSearchFilter(params);
      setIsSearching(Object.values(params).some((value) => value !== ''));
      setCurrentPage(1); // Reset to first page when searching
      refetch();
    },
    [refetch],
  );

  // Handle clear filters
  const handleClearFilters = useCallback(() => {
    setSearchFilter({});
    setIsSearching(false);
    setCurrentPage(1);
    refetch();
  }, [refetch]);

  // Calculated values
  const pageCount = data ? Math.ceil(data.totalbiodata / ITEMS_PER_PAGE) : 0;
  const biodata = data?.data ?? [];
  const totalResults = data?.totalbiodata ?? 0;

  // Loading and error states
  if (isLoading || isFetching) return <Loading />;

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-600">
        {error instanceof Error ? error.message : 'An unknown error occurred'}
      </div>
    );
  }

  return (
    <div className="mx-2 md:mx-10">
      {/* Toggle Filter Button */}
      <div className="flex justify-end m-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 bg-pink-700 text-white px-4 py-2 rounded shadow hover:bg-pink-600 font-bold"
        >
          <Filter size={20} />
          {showFilters ? 'ফিল্টার সরিয়ে নিন' : 'ফিল্টার সমূহ'}
        </button>
      </div>

      {/* Search Component */}
      {showFilters && (
        <BiodataSearch
          onSearch={handleSearch}
          onClear={handleClearFilters}
          initialParams={searchFilter}
          className="mb-6"
        />
      )}

      {/* Search Results Label */}
      {isSearching && (
        <div className="bg-violet-100 text-violet-900 p-3 rounded-lg mb-4 text-center font-bold">
          Found {totalResults} matching profiles.
        </div>
      )}

      <h4 className="text-center text-xl sm:text-4xl rounded-full p-4 m-4 sm:m-5 font-bold text-violet-950 underline sm:w-1/2 sm:mx-auto">
        বায়োডাটার তালিকা
      </h4>

      {/* Biodata List */}
      <ul className="flex flex-col md:flex-row flex-wrap md:items-center md:justify-center py-12">
        {biodata.length > 0 ? (
          biodata.map((user) => (
            <BiodataCard
              key={user._id}
              user={user}
              currentPage={currentPage}
              isSearching={isSearching}
            />
          ))
        ) : (
          <div className="w-full text-center py-10 text-xl text-violet-800">
            No biodata found matching your criteria.
          </div>
        )}
      </ul>

      {/* Pagination */}
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
