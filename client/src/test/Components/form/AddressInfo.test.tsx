import { describe, it, expect, vi, beforeEach, afterEach, Mock } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddressInfo from '../../../components/form/AddressInfo';
import AddressForm from '../../../Components/form/AddressForm'; // Import the AddressForm component
import {
  AddressInfoData,
  Address,
} from '../../../interfaces/Biodata.interface';

// Mock the AddressForm component
vi.mock('./AddressForm', () => ({
  __esModule: true,
  default: vi.fn(() => <div>Mocked AddressForm</div>),
}));

describe('AddressInfo Component', () => {
  let mockSetFormData: Mock;

  beforeEach(() => {
    mockSetFormData = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const initialFormData: AddressInfoData = {
    presentAddress: { district: '', subdistrict: '', village: '' },
    permanentAddress: { district: '', subdistrict: '', village: '' },
  };

  it('renders AddressInfo component correctly', () => {
    render(
      <AddressInfo formData={initialFormData} setFormData={mockSetFormData} />,
    );

    // Check if the title and address forms are rendered
    expect(screen.getByText(/ঠিকানা/i)).toBeInTheDocument();
    expect(screen.getByText(/বর্তমান ঠিকানা/i)).toBeInTheDocument();
    expect(screen.getByText(/স্থায়ী ঠিকানা/i)).toBeInTheDocument();
  });

  it('calls setFormData when present address is updated', () => {
    render(
      <AddressInfo formData={initialFormData} setFormData={mockSetFormData} />,
    );

    // Simulate a change in the present address
    const updatedPresentAddress: Address = {
      district: 'District 1',
      subdistrict: 'Subdistrict 1-1',
      village: 'Village 1',
    };

    fireEvent.change(screen.getByText(/বর্তমান ঠিকানা/i), {
      target: { value: updatedPresentAddress },
    });

    // Check if setFormData was called with the updated address
    expect(mockSetFormData).toHaveBeenCalledWith({
      ...initialFormData,
      presentAddress: updatedPresentAddress,
    });
  });

  it('calls setFormData when permanent address is updated', () => {
    render(
      <AddressInfo formData={initialFormData} setFormData={mockSetFormData} />,
    );

    // Simulate a change in the permanent address
    const updatedPermanentAddress: Address = {
      district: 'District 2',
      subdistrict: 'Subdistrict 2-1',
      village: 'Village 2',
    };

    fireEvent.change(screen.getByText(/স্থায়ী ঠিকানা/i), {
      target: { value: updatedPermanentAddress },
    });

    // Check if setFormData was called with the updated address
    expect(mockSetFormData).toHaveBeenCalledWith({
      ...initialFormData,
      permanentAddress: updatedPermanentAddress,
    });
  });

  it('syncs form data with local state on prop change', async () => {
    const updatedFormData: AddressInfoData = {
      presentAddress: {
        district: 'District 1',
        subdistrict: 'Subdistrict 1-1',
        village: 'Village 1',
      },
      permanentAddress: {
        district: 'District 2',
        subdistrict: 'Subdistrict 2-1',
        village: 'Village 2',
      },
    };

    render(
      <AddressInfo formData={updatedFormData} setFormData={mockSetFormData} />,
    );

    // Ensure that the form data is correctly synced
    await waitFor(() => {
      expect(screen.getByText(/District 1/)).toBeInTheDocument();
      expect(screen.getByText(/District 2/)).toBeInTheDocument();
    });
  });
});
