import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import EducationInfo from '../../../components/form/EducationInfo';
import { EducationInfoData } from '../../../interfaces/Biodata.interface';

describe('EducationInfo', () => {
  const mockFormData: EducationInfoData = {
    ssc: {
      gpa: 0,
      passingYear: 0,
      group: '',
    },
    hsc: {
      gpa: 0,
      passingYear: 0,
      group: '',
    },
    university: {
      honours: {
        faculty: '',
        department: '',
        session: '',
      },
      masters: {
        faculty: '',
        department: '',
        session: '',
      },
    },
  };

  const mockSetFormData = vi.fn();

  beforeEach(() => {
    render(
      <EducationInfo formData={mockFormData} setFormData={mockSetFormData} />,
    );
  });

  it('renders the component with all sections', () => {
    expect(screen.getByText('শিক্ষাগত তথ্য')).toBeInTheDocument();
    expect(screen.getByText('SSC')).toBeInTheDocument();
    expect(screen.getByText('HSC')).toBeInTheDocument();
    expect(screen.getByText('বিশ্ববিদ্যালয় (অনার্স)')).toBeInTheDocument();
    expect(screen.getByText('বিশ্ববিদ্যালয় (মাস্টার্স)')).toBeInTheDocument();
  });

  describe('AcademicDetails (SSC/HSC)', () => {
    it('handles GPA input changes with validation', () => {
      const gpaInputs = screen.getAllByPlaceholderText('যেমনঃ 3.21');
      
      // Test valid GPA
      fireEvent.change(gpaInputs[0], { target: { value: '3.50' } });
      expect(mockSetFormData).toHaveBeenCalledWith({
        ...mockFormData,
        ssc: { ...mockFormData.ssc, gpa: '3.50' },
      });

      // Test invalid GPA (too low)
      fireEvent.change(gpaInputs[0], { target: { value: '0.50' } });
      expect(mockSetFormData).toHaveBeenCalledWith({
        ...mockFormData,
        ssc: { ...mockFormData.ssc, gpa: '' },
      });

      // Test invalid GPA (too high)
      fireEvent.change(gpaInputs[0], { target: { value: '5.50' } });
      expect(mockSetFormData).toHaveBeenCalledWith({
        ...mockFormData,
        ssc: { ...mockFormData.ssc, gpa: '' },
      });
    });

    it('handles passing year selection', () => {
      const yearSelects = screen.getAllByText('Select Year');
      fireEvent.change(yearSelects[0], { target: { value: '2020' } });
      expect(mockSetFormData).toHaveBeenCalledWith({
        ...mockFormData,
        ssc: { ...mockFormData.ssc, passingYear: 2020 },
      });
    });

    it('handles group selection', () => {
      const groupSelects = screen.getAllByText('Select Group');
      fireEvent.change(groupSelects[0], { target: { value: 'Science' } });
      expect(mockSetFormData).toHaveBeenCalledWith({
        ...mockFormData,
        ssc: { ...mockFormData.ssc, group: 'Science' },
      });
    });
  });

  describe('UniversityDetails (Honours/Masters)', () => {
    it('handles faculty selection', () => {
      const facultySelects = screen.getAllByText('Select Faculty');
      fireEvent.change(facultySelects[0], { target: { value: 'Engineering' } });
      expect(mockSetFormData).toHaveBeenCalledWith({
        ...mockFormData,
        university: {
          ...mockFormData.university,
          honours: {
            ...mockFormData.university.honours,
            faculty: 'Engineering',
          },
        },
      });
    });

    it('handles department selection', () => {
      const departmentSelects = screen.getAllByText('Select Department');
      fireEvent.change(departmentSelects[0], { target: { value: 'Computer Science' } });
      expect(mockSetFormData).toHaveBeenCalledWith({
        ...mockFormData,
        university: {
          ...mockFormData.university,
          honours: {
            ...mockFormData.university.honours,
            department: 'Computer Science',
          },
        },
      });
    });

    it('handles session selection', () => {
      const sessionSelects = screen.getAllByText('Select Session');
      fireEvent.change(sessionSelects[0], { target: { value: '2020-2021' } });
      expect(mockSetFormData).toHaveBeenCalledWith({
        ...mockFormData,
        university: {
          ...mockFormData.university,
          honours: {
            ...mockFormData.university.honours,
            session: '2020-2021',
          },
        },
      });
    });
  });

  it('shows error message for invalid GPA', () => {
    // Set invalid GPA directly in the mock
    const invalidFormData = {
      ...mockFormData,
      ssc: { ...mockFormData.ssc, gpa: 0.5 },
    };
    render(<EducationInfo formData={invalidFormData} setFormData={mockSetFormData} />);
    
    expect(screen.getByText('Enter valid GPA')).toBeInTheDocument();
  });
});