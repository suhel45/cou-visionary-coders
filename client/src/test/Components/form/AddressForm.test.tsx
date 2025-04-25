import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi, type Mock } from 'vitest';
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import AddressForm from '../../../components/form/AddressForm';
import subDistricts from '../../../components/form/subDistricts';
import districts from '../../../components/form/districtData';
//import  {Address } from '../../../interfaces/Biodata.interface';

describe('AddressForm Component', () => {
  let mockOnChange: Mock;

  beforeEach(() => {
    mockOnChange = vi.fn();
    cleanup(); // Ensure a clean DOM before each test
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it.skip('renders address form with proper fields', () => {
    render(
      <AddressForm
        address={{ district: '', subdistrict: '', village: '' }}
        onChange={mockOnChange}
        title="Test Address"
      />
    );

    // Check if the form fields and title are rendered
    expect(screen.getByText(/Test Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/জেলা/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/উপজেলা/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/গ্রাম/i)).toBeInTheDocument();
  });

  it.skip('calls onChange when a district is selected', () => {
    render(
      <AddressForm
        address={{ district: '', subdistrict: '', village: '' }}
        onChange={mockOnChange}
        title="Test Address"
      />
    );

    // Select a district and check if the callback is called
    fireEvent.change(screen.getByLabelText(/জেলা/i), {
      target: { value: 'Bagerhat' },
    });

    expect(mockOnChange).toHaveBeenCalledWith({
      district: 'Bagerhat',
      subdistrict: '',
      village: '',
    });
  });

  it('populates subdistricts when a district is selected', async () => {
    render(
      <AddressForm
        address={{ district: 'Bagerhat', subdistrict: '', village: '' }}
        onChange={mockOnChange}
        title="Test Address"
      />
    );

    // Wait for subdistricts to populate based on district selection
    await waitFor(() => {
      expect(screen.getByLabelText(/উপজেলা/i)).toHaveTextContent('Bagerhat Sadar');
      expect(screen.getByLabelText(/উপজেলা/i)).toHaveTextContent('Chitalmari');
    });
  });

  it('disables subdistricts input until a district is selected', () => {
    render(
      <AddressForm
        address={{ district: '', subdistrict: '', village: '' }}
        onChange={mockOnChange}
        title="Test Address"
      />
    );

    // Check if subdistrict field is disabled before district selection
    expect(screen.getByLabelText(/উপজেলা/i)).toBeDisabled();
  });

  it('enables village input when subdistrict is selected', () => {
    render(
      <AddressForm
        address={{
          district: 'Bagerhat',
          subdistrict: 'Bagerhat Sadar',
          village: '',
        }}
        onChange={mockOnChange}
        title="Test Address"
      />
    );

    // Select a subdistrict and check if the village input is enabled
    fireEvent.change(screen.getByLabelText(/উপজেলা/i), {
      target: { value: 'Bagerhat Sadar' },
    });

    expect(screen.getByLabelText(/গ্রাম/i)).not.toBeDisabled();
  });

  it('fires onChange when the village input changes', () => {
    render(
      <AddressForm
        address={{
          district: 'Bagerhat',
          subdistrict: 'Bagerhat Sadar',
          village: '',
        }}
        onChange={mockOnChange}
        title="Test Address"
      />
    );

    // Change the village value and check if the callback is fired
    fireEvent.change(screen.getByLabelText(/গ্রাম/i), {
      target: { value: 'Village 1' },
    });

    expect(mockOnChange).toHaveBeenCalledWith({
      district: 'Bagerhat',
      subdistrict: 'Bagerhat Sadar',
      village: 'Village 1',
    });
  });

  it.skip('renders all districts in the district dropdown', () => {
    render(
      <AddressForm
        address={{ district: '', subdistrict: '', village: '' }}
        onChange={mockOnChange}
        title="Test Address"
      />
    );

    // Check if all districts are rendered in the dropdown
    districts.forEach((district) => {
      expect(screen.getByLabelText(/জেলা/i)).toHaveTextContent(district);
    });
  });

  it('renders all subdistricts for a selected district', async () => {
    render(
      <AddressForm
        address={{ district: 'Bagerhat', subdistrict: '', village: '' }}
        onChange={mockOnChange}
        title="Test Address"
      />
    );

    // Wait for subdistricts to populate
    await waitFor(() => {
      subDistricts['Bagerhat'].forEach((subdistrict) => {
        expect(screen.getByLabelText(/উপজেলা/i)).toHaveTextContent(subdistrict);
      });
    });
  });
});