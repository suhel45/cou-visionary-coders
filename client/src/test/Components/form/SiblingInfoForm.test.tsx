// SiblingInfoForm.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, Mock } from 'vitest';
import SiblingInfoForm from '../../../components/form/SiblingInfoForm';
import { FamilyInfoData } from '../../../interfaces/Biodata.interface';

describe('SiblingInfoForm Component', () => {
  let siblings: FamilyInfoData['siblings'];
  let onChange: Mock;

  beforeEach(() => {
    // Initialize mock siblings data
    siblings = {
      brotherInfo: '',
      sisterInfo: '',
      aboutSiblings: '',
    };

    onChange = vi.fn();
  });

  it('should render the component and display labels correctly', () => {
    render(<SiblingInfoForm siblings={siblings} onChange={onChange} />);

    // Check if all labels are rendered
    expect(screen.getByText('ভাইয়ের তথ্য')).toBeInTheDocument();
    expect(screen.getByText('বোনের তথ্য')).toBeInTheDocument();
    expect(screen.getByText('ভাই-বোন সম্পর্কে')).toBeInTheDocument();
  });

  it('should call onChange when a user types into a textarea', async () => {
    render(<SiblingInfoForm siblings={siblings} onChange={onChange} />);

    const brotherTextarea = screen.getByPlaceholderText(
      'যেমনঃ ১ বড় ভাই, পেশা- ইঞ্জিনিয়ার, বিবাহিত'
    );
    fireEvent.change(brotherTextarea, { target: { value: '1 older brother, Engineer, Married' } });

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith({
        brotherInfo: '1 older brother, Engineer, Married',
        sisterInfo: '',
        aboutSiblings: '',
      });
    });
  });

  it('should update the correct sibling info when the user types into the textarea', () => {
    render(<SiblingInfoForm siblings={siblings} onChange={onChange} />);

    const sisterTextarea = screen.getByPlaceholderText(
      'যেমনঃ ১ ছোট বোন, পেশা- ডাক্তার, বিবাহিত'
    );
    fireEvent.change(sisterTextarea, { target: { value: '1 younger sister, Doctor, Married' } });

    expect(screen.getByPlaceholderText('যেমনঃ ১ ছোট বোন, পেশা- ডাক্তার, বিবাহিত').value).toBe(
      '1 younger sister, Doctor, Married'
    );
  });

  it('should call onChange with updated data when all textareas are changed', async () => {
    render(<SiblingInfoForm siblings={siblings} onChange={onChange} />);

    const brotherTextarea = screen.getByPlaceholderText(
      'যেমনঃ ১ বড় ভাই, পেশা- ইঞ্জিনিয়ার, বিবাহিত'
    );
    const sisterTextarea = screen.getByPlaceholderText(
      'যেমনঃ ১ ছোট বোন, পেশা- ডাক্তার, বিবাহিত'
    );
    const aboutSiblingsTextarea = screen.getByPlaceholderText('যেমনঃ এক ভাই, এক বোন');

    fireEvent.change(brotherTextarea, { target: { value: '1 older brother, Engineer, Married' } });
    fireEvent.change(sisterTextarea, { target: { value: '1 younger sister, Doctor, Married' } });
    fireEvent.change(aboutSiblingsTextarea, { target: { value: 'One brother, one sister' } });

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith({
        brotherInfo: '1 older brother, Engineer, Married',
        sisterInfo: '1 younger sister, Doctor, Married',
        aboutSiblings: 'One brother, one sister',
      });
    });
  });
});
