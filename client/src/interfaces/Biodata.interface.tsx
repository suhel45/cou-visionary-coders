// src/types.ts
import PartnerInfo from './../components/form/PartnerInfo';
export type PersonalInfoData = {
  gender: string;
  maritalStatus: string;
  birthDate: string;
  height: string;
  weight: string;
  occupation: string;
  complexion: string;
  religion: string;
  bloodGroup: string;
};

export type GardianInfo = {
  aliveStatus: boolean;
  profession: string;
};

export type FamilyInfoData = {
  father: GardianInfo;
  mother: GardianInfo;
  siblings: {
    brotherInfo: string;

    sisterInfo: string;

    aboutSiblings: string;
  };
  financialStatus: string;
};

export type AcademicRecord = {
  passingYear: number;
  group: string;
  gpa: number;
};
export type UniversityRecord = {
  faculty: string;
  department: string;
  session: string;
};
export type EducationInfoData = {
  ssc: AcademicRecord;
  hsc: AcademicRecord;
  university: {
    honours: UniversityRecord;
    masters?: UniversityRecord;
  };
};

export type PartnerInfoData = {
  age: string;
  complexion: string;
  height: string;
  district: string;
  maritalStatus: string;
  profession: string;
  financialCondition: string;
  expectedQualities: string;
};

export type PreferenceInfoData = {
  hobbies: string;
  healthIssues: string;
  religiousPractice: string;
  readingHabit: string;
  lifeStylePreference: string;
  additionalInfo: string;
};

export type Address = {
  district: string;
  subdistrict: string;
  village: string;
};

export type AddressInfoData = {
  permanentAddress: Address;
  presentAddress: Address;
};

export type ContactInfoData = {
  guardianInfo: string;
  guardianContact: string;
  candidateNumber: string;
  candidateEmail: string;
};

export interface FormData {
  personalInfo: PersonalInfoData;
  familyInfo: FamilyInfoData;
  educationInfo: EducationInfoData;
  PartnerInfo: PartnerInfoData;
  PreferenceInfo: PreferenceInfoData;
  addressInfo: AddressInfoData;
  contactInfo: ContactInfoData;
}
