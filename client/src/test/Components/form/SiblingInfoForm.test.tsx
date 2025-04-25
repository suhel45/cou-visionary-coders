import { describe, it, expect, vi,beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SiblingInfoForm from '../../../components/form/SiblingInfoForm';
import { FamilyInfoData } from '../../../interfaces/Biodata.interface';

describe.skip('SiblingInfoForm', () => {
  const mockSiblings: FamilyInfoData['siblings'] = {
    brotherInfo: '',
    sisterInfo: '',
    aboutSiblings: '',
  };

  const mockOnChange = vi.fn();

  beforeEach(() => {
    render(
      <SiblingInfoForm siblings={mockSiblings} onChange={mockOnChange} />
    );
  });

  it('renders the component with all fields', () => {
    expect(screen.getByText('ভাই-বোন সম্পর্কিত তথ্য')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('যেমনঃ ১ বড় ভাই, পেশা- ইঞ্জিনিয়ার, বিবাহিত')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('যেমনঃ ১ ছোট বোন, পেশা- ডাক্তার, বিবাহিত')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('যেমনঃ এক ভাই, এক বোন')).toBeInTheDocument();
  });

  it('handles brother info input changes', () => {
    const brotherTextarea = screen.getByPlaceholderText('যেমনঃ ১ বড় ভাই, পেশা- ইঞ্জিনিয়ার, বিবাহিত');
    const testValue = '২ ভাই, পেশা- ইঞ্জিনিয়ার';
    
    fireEvent.change(brotherTextarea, { target: { value: testValue } });
    
    expect(mockOnChange).toHaveBeenCalledWith({
      ...mockSiblings,
      brotherInfo: testValue,
    });
  });

  it('handles sister info input changes', () => {
    const sisterTextarea = screen.getByPlaceholderText('যেমনঃ ১ ছোট বোন, পেশা- ডাক্তার, বিবাহিত');
    const testValue = '১ বোন, পেশা- ডাক্তার';
    
    fireEvent.change(sisterTextarea, { target: { value: testValue } });
    
    expect(mockOnChange).toHaveBeenCalledWith({
      ...mockSiblings,
      sisterInfo: testValue,
    });
  });

  it('handles about siblings input changes', () => {
    const aboutSiblingsTextarea = screen.getByPlaceholderText('যেমনঃ এক ভাই, এক বোন');
    const testValue = 'দুই ভাই, এক বোন';
    
    fireEvent.change(aboutSiblingsTextarea, { target: { value: testValue } });
    
    expect(mockOnChange).toHaveBeenCalledWith({
      ...mockSiblings,
      aboutSiblings: testValue,
    });
  });

  it('displays the initial values correctly', () => {
    const initialData = {
      brotherInfo: '১ ভাই, ইঞ্জিনিয়ার',
      sisterInfo: '২ বোন, ডাক্তার',
      aboutSiblings: 'ভাইবোন সম্পর্ক ভালো'
    };

    render(
      <SiblingInfoForm siblings={initialData} onChange={mockOnChange} />
    );

    expect(screen.getByDisplayValue('১ ভাই, ইঞ্জিনিয়ার')).toBeInTheDocument();
    expect(screen.getByDisplayValue('২ বোন, ডাক্তার')).toBeInTheDocument();
    expect(screen.getByDisplayValue('ভাইবোন সম্পর্ক ভালো')).toBeInTheDocument();
  });

  it('updates multiple fields correctly', () => {
    const brotherTextarea = screen.getByPlaceholderText('যেমনঃ ১ বড় ভাই, পেশা- ইঞ্জিনিয়ার, বিবাহিত');
    const sisterTextarea = screen.getByPlaceholderText('যেমনঃ ১ ছোট বোন, পেশা- ডাক্তার, বিবাহিত');
    
    fireEvent.change(brotherTextarea, { target: { value: '১ ভাই' } });
    fireEvent.change(sisterTextarea, { target: { value: '২ বোন' } });
    
    // The last call should include both changes
    expect(mockOnChange).toHaveBeenLastCalledWith({
      ...mockSiblings,
      brotherInfo: '১ ভাই',
      sisterInfo: '২ বোন',
    });
  });
});