// filepath: /e:/team project/cou/cou-visionary-coders/server/src/interfaces/Education.interface.ts
type AcademicRecord = {
  passingYear: number;
  group: string;
  gpa: number;
};
type UniversityRecord = {
  faculty: string;
  department: string;
  session: string;
};
export type EducationInfo = {
  ssc: AcademicRecord;
  hsc: AcademicRecord;
  university: {
    honours: UniversityRecord;
    masters?: UniversityRecord;
  };
};
