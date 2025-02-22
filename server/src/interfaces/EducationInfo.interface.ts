// filepath: /e:/team project/cou/cou-visionary-coders/server/src/interfaces/Education.interface.ts
export type AcademicRecord = {
  passingYear: number;
  group: string;
  gpa: number;
};

export type Education = {
  ssc: AcademicRecord;
  hsc: AcademicRecord;
  university: {
    faculty: string;
    department: string;
    session: string;
  };
};
