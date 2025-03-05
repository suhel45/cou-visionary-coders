// src/utils/initialFormData.ts
import { FormData } from "../../interfaces/Biodata.interface";

export const initialFormData: FormData = {
  personalInfo: {
    gender: "",
    maritalStatus: "",
    birthDate: "",
    height: "",
    weight: "",
    occupation: "",
    complexion: "",
    religion: "",
    bloodGroup: "",
  },
  familyInfo: {
    father: {
      aliveStatus: true,
      profession: "",
    },
    mother: {
      aliveStatus: true,
      profession: "",
    },
    siblings: {
      brotherInfo:  "",
      
      sisterInfo: "",
    
      aboutSiblings: "",
    },
    financialStatus: "",
  },
  educationInfo: {
    ssc: {
      passingYear: 0,
      group: "",
      gpa: 0,
    },
    hsc: {
      passingYear: 0,
      group: "",
      gpa: 0,
    },
    university: {
      honours: {
        faculty: "",
        department: "",
        session: "",
      },
    },
  },
  PartnerInfo: {
    age: "",
    complexion: "",
    height: "",
    district: "",
    maritalStatus: "",
    profession: "",
    financialCondition: "",
    expectedQualities: "",
  },
  PreferenceInfo: {
    hobbies: "",
    healthIssues: "",
    religiousPractice: "",
    readingHabit: "",
    lifeStylePreference: "",
    additionalInfo: "",
  },
  addressInfo: {
    permanentAddress: {
      district: "",
      subdistrict: "",
      village: "",
    },
    presentAddress: {
      district: "",
      subdistrict: "",
      village: "",
    },
  },
  contactInfo: {
    guardianInfo: "",
    guardianContact: "",
    candidateNumber: "",
    candidateEmail: "",
  },
};