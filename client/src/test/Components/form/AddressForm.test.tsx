import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import type { Mock } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddressForm from '../../../components/form/AddressForm';
import { Address } from '../../../interfaces/Biodata.interface';
import subDistricts from './subDistricts'; // Mocked subdistrict data
import districts from './districtData'; // Mocked district data

// Mock subdistricts and districts
vi.mock('./subDistricts', () => ({
  'District 1': ['Subdistrict 1-1', 'Subdistrict 1-2'],
  'District 2': ['Subdistrict 2-1', 'Subdistrict 2-2'],
}));

vi.mock('./districtData', () => ['District 1', 'District 2']);

describe('AddressForm Component', () => {
  let mockOnChange: vi.Mock;

  beforeEach(() => {
    mockOnChange = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders address form with proper fields', () => {
    render(
      <AddressForm
        address={{ district: '', subdistrict: '', village: '' }}
        onChange={mockOnChange}
        title="Test Address"
      />,
    );

    // Check if the form fields and title are rendered
    expect(screen.getByText(/test address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/জেলা/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/উপজেলা/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/গ্রাম/i)).toBeInTheDocument();
  });

  it('calls onChange when a district is selected', () => {
    render(
      <AddressForm
        address={{ district: '', subdistrict: '', village: '' }}
        onChange={mockOnChange}
        title="Test Address"
      />,
    );

    // Select a district and check if the callback is called
    fireEvent.change(screen.getByLabelText(/জেলা/i), {
      target: { value: 'District 1' },
    });

    expect(mockOnChange).toHaveBeenCalledWith({
      district: 'District 1',
      subdistrict: '',
      village: '',
    });
  });

  it('populates subdistricts when a district is selected', async () => {
    render(
      <AddressForm
        address={{ district: 'District 1', subdistrict: '', village: '' }}
        onChange={mockOnChange}
        title="Test Address"
      />,
    );

    // Wait for subdistricts to populate based on district selection
    await waitFor(() => {
      expect(screen.getByLabelText(/উপজেলা/i)).toHaveTextContent(
        'Subdistrict 1-1',
      );
      expect(screen.getByLabelText(/উপজেলা/i)).toHaveTextContent(
        'Subdistrict 1-2',
      );
    });
  });

  it('disables subdistricts input until a district is selected', () => {
    render(
      <AddressForm
        address={{ district: '', subdistrict: '', village: '' }}
        onChange={mockOnChange}
        title="Test Address"
      />,
    );

    // Check if subdistrict field is disabled before district selection
    expect(screen.getByLabelText(/উপজেলা/i)).toBeDisabled();
  });

  it('enables village input when subdistrict is selected', () => {
    render(
      <AddressForm
        address={{
          district: 'District 1',
          subdistrict: 'Subdistrict 1-1',
          village: '',
        }}
        onChange={mockOnChange}
        title="Test Address"
      />,
    );

    // Select a subdistrict and check if the village input is enabled
    fireEvent.change(screen.getByLabelText(/উপজেলা/i), {
      target: { value: 'Subdistrict 1-1' },
    });

    expect(screen.getByLabelText(/গ্রাম/i)).not.toBeDisabled();
  });

  it('fires onChange when the village input changes', () => {
    render(
      <AddressForm
        address={{
          district: 'District 1',
          subdistrict: 'Subdistrict 1-1',
          village: '',
        }}
        onChange={mockOnChange}
        title="Test Address"
      />,
    );

    // Change the village value and check if the callback is fired
    fireEvent.change(screen.getByLabelText(/গ্রাম/i), {
      target: { value: 'Village 1' },
    });

    expect(mockOnChange).toHaveBeenCalledWith({
      district: 'District 1',
      subdistrict: 'Subdistrict 1-1',
      village: 'Village 1',
    });
  });
});
