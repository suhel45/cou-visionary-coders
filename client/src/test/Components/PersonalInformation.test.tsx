// PersonalInformation.test.tsx

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PersonalInformation from '../../components/PersonalInformation';
import userEvent from '@testing-library/user-event';

describe('PersonalInformation Component', () => {
  it('renders the title', () => {
    render(<PersonalInformation />);
    expect(screen.getByText(/Personal Information/i)).toBeInTheDocument();
  });

  it('renders all required input fields', () => {
    render(<PersonalInformation />);

    expect(screen.getByLabelText(/Biodata Type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Marital Status/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date of Birth/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Height/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Weight \(kg\)/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Complexion/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Blood Group/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Session/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Department/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Nationality/i)).toBeInTheDocument();
  });

  it('allows selecting options from dropdowns', async () => {
    render(<PersonalInformation />);
    const user = userEvent.setup();

    const biodataTypeSelect = screen.getByLabelText(/Biodata Type/i);
    await user.click(biodataTypeSelect);
    const maleOption = await screen.findByText(/Male's Biodata/i);
    await user.click(maleOption);
    expect((biodataTypeSelect as HTMLInputElement).value).toBe('bride');

    const maritalStatusSelect = screen.getByLabelText(/Marital Status/i);
    await user.click(maritalStatusSelect);
    const marriedOption = await screen.findByText(/Married/i);
    await user.click(marriedOption);
    expect((maritalStatusSelect as HTMLInputElement).value).toBe('married');
  });

  it('has required fields with no default values', () => {
    render(<PersonalInformation />);
    const requiredFields = [
      'biodataType',
      'maritalStatus',
      'dob',
      'height',
      'weight',
      'complexion',
      'bloodGroup',
      'session',
      'department',
      'nationality',
    ];

    for (const fieldId of requiredFields) {
      const field = screen.getByLabelText(new RegExp(fieldId, 'i'));
      expect(field).toHaveAttribute('required');
    }
  });
});
