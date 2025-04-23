import { render, fireEvent, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import FamilyInfo from '../../../components/form/FamilyInfo';
import { FamilyInfoData } from '../../../interfaces/Biodata.interface';

describe('FamilyInfo Component', () => {
  const mockSetFormData = vi.fn();

  const initialFormData: FamilyInfoData = {
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
  };

  it('should render correctly', () => {
    render(
      <FamilyInfo formData={initialFormData} setFormData={mockSetFormData} />,
    );

    // Check for the presence of the form elements
    expect(screen.getByText('পারিবারিক তথ্য')).toBeInTheDocument();
    expect(screen.getByText(/পিতা/i)).toBeInTheDocument();
    expect(screen.getByText(/মাতা/i)).toBeInTheDocument();
    expect(screen.getByText(/ভাই-বোন সম্পর্কিত তথ্য/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/পারিবারিক আর্থিক অবস্থা/i),
    ).toBeInTheDocument();
  });

  it('should call setFormData when guardian information changes', () => {
    render(
      <FamilyInfo formData={initialFormData} setFormData={mockSetFormData} />,
    );

    const fatherAliveStatusCheckbox = screen.getByLabelText(/জীবিত/i);
    const fatherProfessionInput =
      screen.getByPlaceholderText(/পেশা , বিবরণসহ/i);
    const motherAliveStatusCheckbox = screen.getAllByLabelText(/জীবিত/i)[1];
    const motherProfessionInput =
      screen.getAllByPlaceholderText(/পেশা , বিবরণসহ/i)[1];

    // Change father's alive status
    fireEvent.click(fatherAliveStatusCheckbox);
    expect(mockSetFormData).toHaveBeenCalledWith({
      ...initialFormData,
      father: { ...initialFormData.father, aliveStatus: 'জীবিত' },
    });

    // Change father's profession
    fireEvent.change(fatherProfessionInput, { target: { value: 'Engineer' } });
    expect(mockSetFormData).toHaveBeenCalledWith({
      ...initialFormData,
      father: { ...initialFormData.father, profession: 'Engineer' },
    });

    // Change mother's alive status
    fireEvent.click(motherAliveStatusCheckbox);
    expect(mockSetFormData).toHaveBeenCalledWith({
      ...initialFormData,
      mother: { ...initialFormData.mother, aliveStatus: 'জীবিত' },
    });

    // Change mother's profession
    fireEvent.change(motherProfessionInput, { target: { value: 'Teacher' } });
    expect(mockSetFormData).toHaveBeenCalledWith({
      ...initialFormData,
      mother: { ...initialFormData.mother, profession: 'Teacher' },
    });
  });

  it('should call setFormData when sibling information changes', () => {
    render(
      <FamilyInfo formData={initialFormData} setFormData={mockSetFormData} />,
    );

    const brotherInfoInput = screen.getByPlaceholderText(
      /যেমনঃ ১ বড় ভাই, পেশা- ইঞ্জিনিয়ার, বিবাহিত/i,
    );
    const sisterInfoInput = screen.getByPlaceholderText(
      /যেমনঃ ১ ছোট বোন, পেশা- ডাক্তার, বিবাহিত/i,
    );
    const aboutSiblingsInput =
      screen.getByPlaceholderText(/যেমনঃ এক ভাই, এক বোন/i);

    // Change brother info
    fireEvent.change(brotherInfoInput, {
      target: { value: 'Brother is a doctor' },
    });
    expect(mockSetFormData).toHaveBeenCalledWith({
      ...initialFormData,
      siblings: {
        ...initialFormData.siblings,
        brotherInfo: 'Brother is a doctor',
      },
    });

    // Change sister info
    fireEvent.change(sisterInfoInput, {
      target: { value: 'Sister is a student' },
    });
    expect(mockSetFormData).toHaveBeenCalledWith({
      ...initialFormData,
      siblings: {
        ...initialFormData.siblings,
        sisterInfo: 'Sister is a student',
      },
    });

    // Change about siblings
    fireEvent.change(aboutSiblingsInput, {
      target: { value: 'We are a close family' },
    });
    expect(mockSetFormData).toHaveBeenCalledWith({
      ...initialFormData,
      siblings: {
        ...initialFormData.siblings,
        aboutSiblings: 'We are a close family',
      },
    });
  });

  it('should call setFormData when financial status changes', () => {
    render(
      <FamilyInfo formData={initialFormData} setFormData={mockSetFormData} />,
    );

    const financialStatusSelect = screen.getByLabelText(
      /পারিবারিক আর্থিক অবস্থা/i,
    ) as HTMLSelectElement;
    fireEvent.change(financialStatusSelect, {
      target: { value: 'Middle Class' },
    });

    expect(mockSetFormData).toHaveBeenCalledWith({
      ...initialFormData,
      financialStatus: 'Middle Class',
    });
  });
});
