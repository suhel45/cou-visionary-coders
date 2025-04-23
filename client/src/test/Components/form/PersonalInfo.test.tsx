import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PersonalInfo from '../../../components/form/PersonalInfo';
import { PersonalInfoData } from '../../../interfaces/Biodata.interface';

describe('PersonalInfo Component', () => {
  const mockSetFormData = vi.fn();

  const initialFormData: PersonalInfoData = {
    gender: '',
    maritalStatus: '',
    birthDate: '',
    height: '',
    weight: '',
    occupation: '',
    complexion: '',
    religion: '',
    bloodGroup: '',
  };

  it('should render the PersonalInfo component', () => {
    render(
      <PersonalInfo formData={initialFormData} setFormData={mockSetFormData} />,
    );

    expect(screen.getByText('ব্যক্তিগত তথ্য')).toBeInTheDocument();
    expect(screen.getByText('সাধারণ তথ্য')).toBeInTheDocument();
    expect(screen.getByLabelText('জন্ম তারিখ -')).toBeInTheDocument();
    expect(screen.getByLabelText('লিঙ্গ -')).toBeInTheDocument();
    expect(screen.getByLabelText('বৈবাহিক অবস্থা -')).toBeInTheDocument();
  });

  it('should handle input change for gender', async () => {
    render(
      <PersonalInfo formData={initialFormData} setFormData={mockSetFormData} />,
    );

    const genderSelect = screen.getByLabelText('লিঙ্গ -') as HTMLSelectElement;
    fireEvent.change(genderSelect, { target: { value: 'পুরুষ' } });

    await waitFor(() => {
      expect(mockSetFormData).toHaveBeenCalledWith({
        ...initialFormData,
        gender: 'পুরুষ',
      });
    });
  });

  it('should handle input change for birthDate and trigger age validation', async () => {
    render(
      <PersonalInfo formData={initialFormData} setFormData={mockSetFormData} />,
    );

    const birthDateInput = screen.getByLabelText(
      'জন্ম তারিখ -',
    ) as HTMLInputElement;
    fireEvent.change(birthDateInput, { target: { value: '2005-01-01' } });

    await waitFor(() => {
      expect(mockSetFormData).not.toHaveBeenCalled();
      expect(
        screen.getByText('আপনার বয়স কমপক্ষে ১৮ বছর হতে হবে'),
      ).toBeInTheDocument();
    });
  });

  it('should not show age validation error if age is above 18', async () => {
    render(
      <PersonalInfo formData={initialFormData} setFormData={mockSetFormData} />,
    );

    const birthDateInput = screen.getByLabelText(
      'জন্ম তারিখ -',
    ) as HTMLInputElement;
    fireEvent.change(birthDateInput, { target: { value: '2000-01-01' } });

    await waitFor(() => {
      expect(mockSetFormData).toHaveBeenCalled();
      expect(screen.queryByText('আপনার বয়স কমপক্ষে ১৮ বছর হতে হবে')).toBeNull();
    });
  });

  it('should render and update the height field', async () => {
    render(
      <PersonalInfo formData={initialFormData} setFormData={mockSetFormData} />,
    );

    const heightSelect = screen.getByLabelText('উচ্চতা -') as HTMLSelectElement;
    fireEvent.change(heightSelect, { target: { value: '5\'5"' } });

    await waitFor(() => {
      expect(mockSetFormData).toHaveBeenCalledWith({
        ...initialFormData,
        height: '5\'5"',
      });
    });
  });

  it('should render error message for required fields', async () => {
    render(
      <PersonalInfo formData={initialFormData} setFormData={mockSetFormData} />,
    );

    const submitButton = screen.getByRole('button', { name: /submit/i }); // Assuming a button is added
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText('আপনার বয়স কমপক্ষে ১৮ বছর হতে হবে'),
      ).toBeInTheDocument();
    });
  });
});
