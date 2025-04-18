// Define search parameters interface for reusability
export interface SearchParams {
  gender?: string;
  maritalStatus?: string;
  ageMin?: string;
  ageMax?: string;
  heightMin?: string;
  heightMax?: string;
  occupation?: string;
  complexion?: string;
  religion?: string;
  district?: string;
  subdistrict?: string;
  financialStatus?: string;
}

export interface BiodataSearchProps {
  onSearch: (params: SearchParams) => void;
  onClear: () => void;
  initialParams?: SearchParams;
  className?: string;
}
