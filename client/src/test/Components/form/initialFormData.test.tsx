import { describe, it, expect } from 'vitest';
import { initialFormData } from '../../../components/form/initialFormData';
import { FormData } from '../../../interfaces/Biodata.interface';

describe('initialFormData', () => {
  it('should have correct structure for personalInfo', () => {
    expect(initialFormData.personalInfo).toEqual({
      gender: '',
      maritalStatus: '',
      birthDate: '',
      height: '',
      weight: '',
      occupation: '',
      complexion: '',
      religion: '',
      bloodGroup: '',
    });
  });

  it('should have correct structure for address', () => {
    expect(initialFormData.address).toEqual({
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
    });
  });

  it('should have correct structure for education', () => {
    expect(initialFormData.education).toEqual({
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
    });
  });

  it('should have correct structure for familyInformation', () => {
    expect(initialFormData.familyInformation).toEqual({
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
    });
  });

  it('should have correct structure for expectedLifePartner', () => {
    expect(initialFormData.expectedLifePartner).toEqual({
      age: '',
      complexion: '',
      height: '',
      district: '',
      maritalStatus: '',
      profession: '',
      financialCondition: '',
      expectedQualities: '',
    });
  });

  it('should have correct structure for contactInfo', () => {
    expect(initialFormData.contactInfo).toEqual({
      guardianInfo: '',
      guardianContact: '',
      candidateNumber: '',
      candidateEmail: '',
    });
  });

  it('should have correct structure for personalPreference', () => {
    expect(initialFormData.personalPreference).toEqual({
      hobbies: '',
      healthIssues: '',
      religiousPractice: '',
      readingHabit: '',
      lifeStylePreference: '',
      additionalInfo: '',
    });
  });

  it('should match the FormData interface structure', () => {
    const formData: FormData = initialFormData;

    expect(formData).toHaveProperty('personalInfo');
    expect(formData).toHaveProperty('address');
    expect(formData).toHaveProperty('education');
    expect(formData).toHaveProperty('familyInformation');
    expect(formData).toHaveProperty('expectedLifePartner');
    expect(formData).toHaveProperty('contactInfo');
    expect(formData).toHaveProperty('personalPreference');
  });
});
