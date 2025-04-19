import { PersonalInfoData } from './Biodata.interface';

export interface User {
  _id: string;
  biodataNo: string;
  personalInfo: PersonalInfoData;
}

export interface BiodataResponse {
  data: User[];
  totalbiodata: number;
}

export interface BiodataCardProps {
  user: User;
  currentPage?: number;
  isSearching?: boolean;
  mode?: 'add' | 'delete';
}
