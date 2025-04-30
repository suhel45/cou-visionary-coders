import { render, fireEvent, screen } from '@testing-library/react';
import PartnerInfo from '../../../components/form/PartnerInfo';
import { beforeEach, describe, it, expect, vi } from 'vitest';
import { PartnerInfoData } from '../../../interfaces/Biodata.interface';
import districts from '../../../components/form/districtData';
const TEXT = {
  title: 'প্রত্যাশিত জীবনসঙ্গী',
  age: 'বয়স',
  complexion: 'গাত্রবর্ন',
  height: 'উচ্চতা',
  district: 'জেলা',
  maritalStatus: 'বৈবাহিক অবস্থা',
  profession: 'পেশা',
  financialCondition: 'অর্থনৈতিক অবস্থা',
  expectedQualities: 'প্রত্যাশিত বৈশিষ্ট্যে বা গুনাবলী',
};

describe('PartnerInfo Component', () => {
  const mockSetFormData = vi.fn();

  const initialFormData: PartnerInfoData = {
    age: '',
    complexion: '',
    height: '',
    district: '',
    maritalStatus: '',
    profession: '',
    financialCondition: '',
    expectedQualities: '',
  };

  beforeEach(() => {
    mockSetFormData.mockClear();
  });

  it.skip('renders the form and shows all fields', () => {
    render(
      <PartnerInfo formData={initialFormData} setFormData={mockSetFormData} />,
    );

    expect(screen.getByText(TEXT.title)).toBeInTheDocument();
    expect(screen.getByLabelText(TEXT.maritalStatus)).toBeInTheDocument();
    expect(screen.getByLabelText(TEXT.age)).toBeInTheDocument();
    expect(screen.getByLabelText(TEXT.financialCondition)).toBeInTheDocument();
    expect(screen.getByLabelText(TEXT.height)).toBeInTheDocument();
    expect(screen.getByLabelText(TEXT.complexion)).toBeInTheDocument();
    expect(screen.getByLabelText(TEXT.profession)).toBeInTheDocument();
    expect(screen.getByLabelText(TEXT.district)).toBeInTheDocument();
    expect(screen.getByLabelText(TEXT.expectedQualities)).toBeInTheDocument();
  });

  it.skip('updates form data when inputs are changed', () => {
    render(
      <PartnerInfo formData={initialFormData} setFormData={mockSetFormData} />,
    );

    fireEvent.change(screen.getByLabelText(TEXT.age), {
      target: { value: '25' },
    });
    fireEvent.change(screen.getByLabelText(TEXT.maritalStatus), {
      target: { value: 'অবিবাহিত' },
    });
    fireEvent.change(screen.getByLabelText(TEXT.profession), {
      target: { value: 'ইঞ্জিনিয়ার' },
    });

    expect(mockSetFormData).toHaveBeenCalledWith({
      ...initialFormData,
      age: '25',
      maritalStatus: 'অবিবাহিত',
      profession: 'ইঞ্জিনিয়ার',
    });
  });

  it.skip('handles dropdown selection changes correctly', () => {
    render(
      <PartnerInfo formData={initialFormData} setFormData={mockSetFormData} />,
    );

    fireEvent.change(screen.getByLabelText(TEXT.complexion), {
      target: { value: 'ফর্সা' },
    });
    fireEvent.change(screen.getByLabelText(TEXT.financialCondition), {
      target: { value: 'মধ্যবিত্ত' },
    });

    expect(mockSetFormData).toHaveBeenCalledWith({
      ...initialFormData,
      complexion: 'ফর্সা',
      financialCondition: 'মধ্যবিত্ত',
    });
  });

  it.skip('handles district selection correctly', () => {
    render(
      <PartnerInfo formData={initialFormData} setFormData={mockSetFormData} />,
    );

    fireEvent.change(screen.getByLabelText(TEXT.district), {
      target: { value: 'Dhaka' },
    });

    expect(mockSetFormData).toHaveBeenCalledWith({
      ...initialFormData,
      district: 'Dhaka',
    });
  });

  it.skip('handles textarea change correctly', () => {
    render(
      <PartnerInfo formData={initialFormData} setFormData={mockSetFormData} />,
    );

    fireEvent.change(screen.getByLabelText(TEXT.expectedQualities), {
      target: { value: 'সুদর্শন এবং সৎ' },
    });

    expect(mockSetFormData).toHaveBeenCalledWith({
      ...initialFormData,
      expectedQualities: 'সুদর্শন এবং সৎ',
    });
  });

  it.skip('renders all district options in the dropdown', () => {
    render(
      <PartnerInfo formData={initialFormData} setFormData={mockSetFormData} />,
    );

    // Find the district dropdown
    const districtDropdown = screen.getByLabelText(TEXT.district);
    expect(districtDropdown).toBeInTheDocument();

    // Extract the options from the dropdown
    const districtOptions = Array.from(districtDropdown.children).map(
      (option) => option.textContent?.trim(),
    );

    expect(districtOptions).toContain('Bagerhat');
    expect(districtOptions).toContain('Bandarban');
    expect(districtOptions).toContain('Barguna');

    districts.forEach((district) => {
      expect(districtOptions).toContain(district);
    });
  });
});
