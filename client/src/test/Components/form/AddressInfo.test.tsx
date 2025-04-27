import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach, Mock } from 'vitest';
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import AddressInfo from '../../../components/form/AddressInfo';
import { AddressInfoData } from '../../../interfaces/Biodata.interface';

// Mock the AddressForm component
vi.mock('../../../components/form/AddressForm', () => ({
  __esModule: true,
  default: vi.fn(({ address, onChange, title }) => (
    <div>
      <h2>{title}</h2>
      <div data-testid={`${title}-district`}>{address.district}</div>
      <div data-testid={`${title}-subdistrict`}>{address.subdistrict}</div>
      <div data-testid={`${title}-village`}>{address.village}</div>
      <button onClick={() => onChange({ district: 'Updated District', subdistrict: 'Updated Subdistrict', village: 'Updated Village' })}>
        Update Address
      </button>
    </div>
  )),
}));

describe('AddressInfo Component', () => {
  let mockSetFormData: Mock;

  beforeEach(() => {
    mockSetFormData = vi.fn();
    cleanup(); // Ensure a clean DOM before each test
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const initialFormData: AddressInfoData = {
    presentAddress: { district: '', subdistrict: '', village: '' },
    permanentAddress: { district: '', subdistrict: '', village: '' },
  };

  it('renders AddressInfo component correctly', () => {
    render(<AddressInfo formData={initialFormData} setFormData={mockSetFormData} />);

    // Check if the title and address forms are rendered
    expect(screen.getByText('ঠিকানা')).toBeInTheDocument();
    expect(screen.getByText('বর্তমান ঠিকানা')).toBeInTheDocument();
    expect(screen.getByText('স্থায়ী ঠিকানা')).toBeInTheDocument();
  });

  it.skip('calls setFormData when present address is updated', () => {
    render(<AddressInfo formData={initialFormData} setFormData={mockSetFormData} />);

    // Simulate a change in the present address
    fireEvent.click(screen.getByText(/Update Address/i));

    // Check if setFormData was called with the updated address
    expect(mockSetFormData).toHaveBeenCalledWith({
      ...initialFormData,
      presentAddress: {
        district: 'Updated District',
        subdistrict: 'Updated Subdistrict',
        village: 'Updated Village',
      },
    });
  });

  it.skip('calls setFormData when permanent address is updated', () => {
    render(<AddressInfo formData={initialFormData} setFormData={mockSetFormData} />);

    // Simulate a change in the permanent address
    fireEvent.click(screen.getByText(/Update Address/i));

    // Check if setFormData was called with the updated address
    expect(mockSetFormData).toHaveBeenCalledWith({
      ...initialFormData,
      permanentAddress: {
        district: 'Updated District',
        subdistrict: 'Updated Subdistrict',
        village: 'Updated Village',
      },
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

    const { rerender } = render(
      <AddressInfo formData={initialFormData} setFormData={mockSetFormData} />
    );

    // Rerender with updated form data
    rerender(<AddressInfo formData={updatedFormData} setFormData={mockSetFormData} />);

    // Ensure that the form data is correctly synced
    await waitFor(() => {
      expect(screen.getByTestId('বর্তমান ঠিকানা-district')).toHaveTextContent('District 1');
      expect(screen.getByTestId('স্থায়ী ঠিকানা-district')).toHaveTextContent('District 2');
    });
  });
});