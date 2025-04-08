// src/utils/initialFormData.ts
import { FormData } from '../../interfaces/Biodata.interface';

export const initialFormData: FormData = {
  personalInfo: {
    gender: '',
    maritalStatus: '',
    birthDate: '',
    height: '',
    weight: '',
    occupation: '',
    complexion: '',
    religion: '',
    bloodGroup: '',
  },
  address: {
    permanentAddress: {
      district: '',
      subdistrict: '',
      village: '',
    },
    presentAddress: {
      district: '',
      subdistrict: '',
      village: '',
    },
  },
  education: {
    ssc: {
      passingYear: 0,
      group: '',
      gpa: 0,
    },
    hsc: {
      passingYear: 0,
      group: '',
      gpa: 0,
    },
    university: {
      honours: {
        faculty: '',
        department: '',
        session: '',
      },
    },
  },
  familyInformation: {
    father: {
      aliveStatus: '',
      profession: '',
    },
    mother: {
      aliveStatus: '',
      profession: '',
    },
    siblings: {
      brotherInfo: '',

      sisterInfo: '',

      aboutSiblings: '',
    },
    financialStatus: '',
  },
  // education: {
  //   ssc: {
  //     passingYear: 0,
  //     group: '',
  //     gpa: 0,
  //   },
  //   hsc: {
  //     passingYear: 0,
  //     group: '',
  //     gpa: 0,
  //   },
  //   university: {
  //     honours: {
  //       faculty: '',
  //       department: '',
  //       session: '',
  //     },
  //   },
  // },
  expectedLifePartner: {
    age: '',
    complexion: '',
    height: '',
    district: '',
    maritalStatus: '',
    profession: '',
    financialCondition: '',
    expectedQualities: '',
  },
  contactInfo: {
    guardianInfo: '',
    guardianContact: '',
    candidateNumber: '',
    candidateEmail: '',
  },
  personalPreference: {
    hobbies: '',
    healthIssues: '',
    religiousPractice: '',
    readingHabit: '',
    lifeStylePreference: '',
    additionalInfo: '',
  },
  // address: {
  //   permanentAddress: {
  //     district: '',
  //     subdistrict: '',
  //     village: '',
  //   },
  //   presentAddress: {
  //     district: '',
  //     subdistrict: '',
  //     village: '',
  //   },
  // },
  // contactInfo: {
  //   guardianInfo: '',
  //   guardianContact: '',
  //   candidateNumber: '',
  //   candidateEmail: '',
  // },
};
