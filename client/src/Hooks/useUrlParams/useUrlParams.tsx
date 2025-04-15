import { useSearchParams } from 'react-router-dom';
import { useCallback } from 'react';
import { SearchParams } from '../../interfaces/Search.interface';

export function useUrlParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Get initial values from URL
  const initialPage = parseInt(searchParams.get('page') || '1');

  const getInitialSearchParams = () => {
    const params: SearchParams = {};
    searchParams.forEach((value, key) => {
      if (key !== 'page') {
        params[key as keyof SearchParams] = value;
      }
    });
    return params;
  };

  const initialSearchParams = getInitialSearchParams();
  const hasActiveFilters = Object.values(initialSearchParams).some(
    (value) => value !== '' && value !== undefined,
  );

  // Update URL with current state - wrap in useCallback to stabilize the reference
  const updateUrl = useCallback(
    (page: number, filters: SearchParams) => {
      const newParams = new URLSearchParams();
      newParams.set('page', page.toString());

      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          newParams.set(key, value.toString());
        }
      });

      setSearchParams(newParams, { replace: true }); // Use replace instead of push
    },
    [setSearchParams],
  );

  return {
    initialPage,
    initialSearchParams,
    hasActiveFilters,
    updateUrl,
  };
}

export default useUrlParams;
