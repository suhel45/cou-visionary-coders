// PartnerInfo.test.tsx
import { render, fireEvent, screen } from '@testing-library/react';
import PartnerInfo from '../../../components/form/PartnerInfo';
import { vi } from 'vitest';
import { PartnerInfoData } from '../../../interfaces/Biodata.interface';

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
    mockSetFormData.mockClear(); // Reset mock calls before each test
  });

  it('should render the form and show all options', () => {
    render(
      <PartnerInfo formData={initialFormData} setFormData={mockSetFormData} />
    );

    // Check if the form title is present
    expect(screen.getByText(/প্রত্যাশিত জীবনসঙ্গী/i)).toBeInTheDocument();

    // Check if the dropdowns and inputs are rendered correctly
    expect(screen.getByLabelText(/পাত্র\/পাত্রীর বৈবাহিক অবস্থা/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/পাত্র\/পাত্রীর বয়স/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/পাত্র\/পাত্রীর অর্থনৈতিক অবস্থা/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/পাত্র\/পাত্রীর উচ্চতা/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/পাত্র\/পাত্রীর গাত্রবর্ন/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/পাত্র\/পাত্রীর পেশা/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/পাত্র\/পাত্রীর জেলা/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/প্রত্যাশিত বৈশিষ্ট্যে বা গুনাবলী/i)).toBeInTheDocument();
  });

  it('should update form data when inputs are changed', () => {
    render(
      <PartnerInfo formData={initialFormData} setFormData={mockSetFormData} />
    );

    // Simulate user input
    fireEvent.change(screen.getByLabelText(/পাত্র\/পাত্রীর বয়স/i), {
      target: { value: '25' },
    });
    fireEvent.change(screen.getByLabelText(/পাত্র\/পাত্রীর বৈবাহিক অবস্থা/i), {
      target: { value: 'অবিবাহিত' },
    });
    fireEvent.change(screen.getByLabelText(/পাত্র\/পাত্রীর পেশা/i), {
      target: { value: 'ইঞ্জিনিয়ার' },
    });

    // Ensure the mock function is called with the updated form data
    expect(mockSetFormData).toHaveBeenCalledWith({
      ...initialFormData,
      age: '25',
      maritalStatus: 'অবিবাহিত',
      profession: 'ইঞ্জিনিয়ার',
    });
  });

  it('should handle selection changes correctly for dropdowns', () => {
    render(
      <PartnerInfo formData={initialFormData} setFormData={mockSetFormData} />
    );

    // Simulate dropdown selection
    fireEvent.change(screen.getByLabelText(/পাত্র\/পাত্রীর গাত্রবর্ন/i), {
      target: { value: 'ফর্সা' },
    });
    fireEvent.change(screen.getByLabelText(/পাত্র\/পাত্রীর অর্থনৈতিক অবস্থা/i), {
      target: { value: 'মধ্যবিত্ত' },
    });

    // Check if the mock function is called with correct values
    expect(mockSetFormData).toHaveBeenCalledWith({
      ...initialFormData,
      complexion: 'ফর্সা',
      financialCondition: 'মধ্যবিত্ত',
    });
  });

  it('should handle textarea change correctly', () => {
    render(
      <PartnerInfo formData={initialFormData} setFormData={mockSetFormData} />
    );

    // Simulate textarea change
    fireEvent.change(screen.getByLabelText(/প্রত্যাশিত বৈশিষ্ট্যে বা গুনাবলী/i), {
      target: { value: 'সুদর্শন এবং সৎ' },
    });

    // Check if the mock function is called with correct value
    expect(mockSetFormData).toHaveBeenCalledWith({
      ...initialFormData,
      expectedQualities: 'সুদর্শন এবং সৎ',
    });
  });
});
