// PreferenceInfo.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, Mock } from 'vitest';
import PreferenceInfo from '../../../components/form/PreferenceInfo';
import { PreferenceInfoData } from '../../../interfaces/Biodata.interface';

describe('PreferenceInfo Component', () => {
  let formData: PreferenceInfoData;
  let setFormData: Mock;

  beforeEach(() => {
    // Initialize mock formData
    formData = {
      hobbies: '',
      healthIssues: '',
      religiousPractice: '',
      readingHabit: '',
      lifeStylePreference: '',
      additionalInfo: '',
    };

    setFormData = vi.fn();
  });

  it('should render the component and display labels correctly', () => {
    render(<PreferenceInfo formData={formData} setFormData={setFormData} />);

    // Check if all labels are rendered
    expect(screen.getByText('আপনার শখ')).toBeInTheDocument();
    expect(screen.getByText('আপনার শারিরীক সমস্যা আছে কি না')).toBeInTheDocument();
    expect(screen.getByText('ধর্মীয় অনুশাসন কেমন মেনে চলেন')).toBeInTheDocument();
    expect(screen.getByText('বই পড়ার অভ্যাস কেমন')).toBeInTheDocument();
    expect(screen.getByText('কেমন লাইফস্টাইল পছন্দ করেন')).toBeInTheDocument();
    expect(screen.getByText('আপনার অন্যান্য কিছু শেয়ার করুন')).toBeInTheDocument();
  });

  it('should call setFormData when a user types into a textarea', async () => {
    render(<PreferenceInfo formData={formData} setFormData={setFormData} />);

    const hobbiesTextarea = screen.getByPlaceholderText('আপনার শখ সম্পর্কে লিখুন...');
    fireEvent.change(hobbiesTextarea, { target: { value: 'Reading books' } });

    await waitFor(() => {
      expect(setFormData).toHaveBeenCalledTimes(1);
      expect(setFormData).toHaveBeenCalledWith({
        hobbies: 'Reading books',
        healthIssues: '',
        religiousPractice: '',
        readingHabit: '',
        lifeStylePreference: '',
        additionalInfo: '',
      });
    });
  });

  it('should correctly update localFormData when user types', () => {
    render(<PreferenceInfo formData={formData} setFormData={setFormData} />);

    const healthIssuesTextarea = screen.getByPlaceholderText('যদি থাকে তবে বিস্তারিত লিখুন...') as HTMLTextAreaElement;
    fireEvent.change(healthIssuesTextarea, { target: { value: 'No issues' } });

    expect(healthIssuesTextarea.value).toBe('No issues');
  });
});
