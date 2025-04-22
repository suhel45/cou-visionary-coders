import { render, screen, fireEvent } from '@testing-library/react';
import EducationInfo from '../../../components/form/EducationInfo';
import { describe, it, expect, vi } from 'vitest';

describe('EducationInfo Component', () => {
  const mockSetFormData = vi.fn();

  const formData = {
    ssc: {
      gpa: 4.5,
      passingYear: 2010,
      group: 'Science',
    },
    hsc: {
      gpa: 4.2,
      passingYear: 2012,
      group: 'Commerce',
    },
    university: {
      honours: {
        faculty: 'Engineering',
        department: 'Computer Science',
        session: '2013-2014',
      },
      masters: {
        faculty: 'Science',
        department: 'Physics',
        session: '2017-2018',
      },
    },
  };

  it('should render EducationInfo component with the correct initial values', () => {
    render(<EducationInfo formData={formData} setFormData={mockSetFormData} />);

    // Check that the form is rendered with correct initial values
    expect(screen.getByDisplayValue('4.5')).toBeInTheDocument(); // SSC GPA
    expect(screen.getByDisplayValue('2010')).toBeInTheDocument(); // SSC passing year
    expect(screen.getByDisplayValue('Science')).toBeInTheDocument(); // SSC group

    expect(screen.getByDisplayValue('4.2')).toBeInTheDocument(); // HSC GPA
    expect(screen.getByDisplayValue('2012')).toBeInTheDocument(); // HSC passing year
    expect(screen.getByDisplayValue('Commerce')).toBeInTheDocument(); // HSC group

    expect(screen.getByDisplayValue('Engineering')).toBeInTheDocument(); // Honours faculty
    expect(screen.getByDisplayValue('Computer Science')).toBeInTheDocument(); // Honours department
    expect(screen.getByDisplayValue('2013-2014')).toBeInTheDocument(); // Honours session

    expect(screen.getByDisplayValue('Science')).toBeInTheDocument(); // Masters faculty
    expect(screen.getByDisplayValue('Physics')).toBeInTheDocument(); // Masters department
    expect(screen.getByDisplayValue('2017-2018')).toBeInTheDocument(); // Masters session
  });

  it('should call setFormData when input values are changed', () => {
    render(<EducationInfo formData={formData} setFormData={mockSetFormData} />);

    // Find and change the GPA input field for SSC
    const sscGPA = screen.getByDisplayValue('4.5');
    fireEvent.change(sscGPA, { target: { value: '3.8' } });

    // Check if setFormData was called
    expect(mockSetFormData).toHaveBeenCalledWith({
      ...formData,
      ssc: {
        ...formData.ssc,
        gpa: 3.8,
      },
    });
  });

  it('should display an error if GPA is out of range', () => {
    render(<EducationInfo formData={formData} setFormData={mockSetFormData} />);

    // Change the GPA to an invalid value
    const sscGPA = screen.getByDisplayValue('4.5');
    fireEvent.change(sscGPA, { target: { value: '6.0' } });

    // Check if error message is displayed
    expect(screen.getByText('Enter valid GPA')).toBeInTheDocument();
  });

  it('should call setFormData when dropdown values are changed', () => {
    render(<EducationInfo formData={formData} setFormData={mockSetFormData} />);

    // Find and change the passing year dropdown for SSC
    const sscPassingYear = screen.getByDisplayValue('2010');
    fireEvent.change(sscPassingYear, { target: { value: '2011' } });

    // Check if setFormData was called with updated value
    expect(mockSetFormData).toHaveBeenCalledWith({
      ...formData,
      ssc: {
        ...formData.ssc,
        passingYear: 2011,
      },
    });
  });
});
