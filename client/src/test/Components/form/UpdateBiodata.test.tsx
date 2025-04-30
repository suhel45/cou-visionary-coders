import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import MultiStepForm from '../../../components/form/UpdateBiodata';

// Mock child components to focus on the logic and navigation
vi.mock('../../../components/form/PersonalInfo', () => ({
  default: ({ formData, setFormData }: any) => (
    <div>
      <label htmlFor="personalInfoInput">Personal Information</label>
      <input
        id="personalInfoInput"
        value={formData.name || ''}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
    </div>
  ),
}));

vi.mock('../../../components/form/FamilyInfo', () => ({
  default: () => <div>Family Info Step</div>,
}));

vi.mock('../../../components/form/EducationInfo', () => ({
  default: () => <div>Education Info Step</div>,
}));

vi.mock('../../../components/form/PartnerInfo', () => ({
  default: () => <div>Partner Info Step</div>,
}));

vi.mock('../../../components/form/PreferenceInfo', () => ({
  default: () => <div>Preference Info Step</div>,
}));

vi.mock('../../../components/form/AddressInfo', () => ({
  default: () => <div>Address Info Step</div>,
}));

vi.mock('../../../components/form/ContactInfo', () => ({
  default: () => <div>Contact Info Step</div>,
}));

describe('MultiStepForm Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  afterEach(() => {
    cleanup();
  });

  it('renders the first step and disables the Next button if the field is empty', () => {
    render(<MultiStepForm />);

    const nextButton = screen.getByRole('button', { name: /Next/i });
    expect(nextButton).toBeDisabled();
  });

  it.skip('enables the Next button when required fields are filled', () => {
    render(<MultiStepForm />);

    const input = screen.getByLabelText(/Personal Information/i);
    fireEvent.change(input, { target: { value: 'Valid Input' } });

    const nextButton = screen.getByRole('button', { name: /Next/i });
    expect(nextButton).toBeEnabled();
  });

  it.skip('moves to the next step when Next is clicked and input is valid', () => {
    render(<MultiStepForm />);

    const input = screen.getByLabelText(/Personal Information/i);
    fireEvent.change(input, { target: { value: 'Valid Input' } });

    const nextButton = screen.getByRole('button', { name: /Next/i });
    fireEvent.click(nextButton);

    expect(screen.getByText(/Family Info Step/i)).toBeInTheDocument();
  });

  it('goes back to the previous step when Back is clicked', () => {
    render(<MultiStepForm />);

    const input = screen.getByLabelText(/Personal Information/i);
    fireEvent.change(input, { target: { value: 'Valid Input' } });

    const nextButton = screen.getByRole('button', { name: /Next/i });
    fireEvent.click(nextButton);

    const backButton = screen.getByRole('button', { name: /Back/i });
    fireEvent.click(backButton);

    expect(screen.getByLabelText(/Personal Information/i)).toBeInTheDocument();
  });

  it.skip('shows an error message if form submission fails', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: 400,
        json: () => Promise.resolve({ message: 'Failed to submit form' }),
      } as unknown as Response),
    );

    render(<MultiStepForm />);

    // Complete the form steps and click "Finish"
    for (let i = 0; i < 6; i++) {
      fireEvent.click(screen.getByRole('button', { name: /Next/i }));
    }

    const finishButton = screen.getByRole('button', { name: /Finish/i });
    fireEvent.click(finishButton);

    await waitFor(() => {
      expect(
        screen.getByText(/Failed! Please try again./i),
      ).toBeInTheDocument();
    });
  });

  it.skip('shows a success message if form submission succeeds', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve({ message: 'Success' }),
      } as unknown as Response),
    );

    render(<MultiStepForm />);

    // Complete the form steps and click "Finish"
    for (let i = 0; i < 6; i++) {
      fireEvent.click(screen.getByRole('button', { name: /Next/i }));
    }

    const finishButton = screen.getByRole('button', { name: /Finish/i });
    fireEvent.click(finishButton);

    await waitFor(() => {
      expect(
        screen.getByText(/Form Submitted Successfully!/i),
      ).toBeInTheDocument();
    });
  });

  it.skip('resets the form when Reset is clicked after submission', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve({ message: 'Success' }),
      } as unknown as Response),
    );

    render(<MultiStepForm />);

    // Complete the form steps and click "Finish"
    for (let i = 0; i < 6; i++) {
      fireEvent.click(screen.getByRole('button', { name: /Next/i }));
    }

    const finishButton = screen.getByRole('button', { name: /Finish/i });
    fireEvent.click(finishButton);

    await waitFor(() => {
      expect(
        screen.getByText(/Form Submitted Successfully!/i),
      ).toBeInTheDocument();
    });

    const resetButton = screen.getByRole('button', { name: /Reset/i });
    fireEvent.click(resetButton);

    expect(screen.getByLabelText(/Personal Information/i)).toBeInTheDocument();
  });
});
