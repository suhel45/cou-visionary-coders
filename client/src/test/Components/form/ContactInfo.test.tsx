import { describe, it, expect, vi, beforeEach, afterEach, Mock } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ContactInfo from '../../../components/form/ContactInfo';
import { ContactInfoData } from '../../../interfaces/Biodata.interface';

describe('ContactInfo Component', () => {
  let mockSetFormData: Mock;

  beforeEach(() => {
    mockSetFormData = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const initialFormData: ContactInfoData = {
    guardianInfo: 'John Doe (Father)',
    guardianContact: '+8801234567890',
    candidateNumber: '01712345678',
    candidateEmail: 'candidate@example.com',
  };

  it.skip('renders ContactInfo component correctly', () => {
    render(
      <ContactInfo formData={initialFormData} setFormData={mockSetFormData} />,
    );
  
    // Check if the title is rendered
    expect(screen.getByRole('heading', { name: 'যোগাযোগ' })).toBeInTheDocument();
  
    // Check if the input fields are rendered
    expect(
      screen.getByPlaceholderText('নাম ( সম্পর্ক )'),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText('মোবাইল নাম্বার')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('ইমেইল')).toBeInTheDocument();
  });

  it('calls setFormData when inputs are changed', async () => {
    render(
      <ContactInfo formData={initialFormData} setFormData={mockSetFormData} />,
    );

    // Simulate changes in the inputs
    fireEvent.change(screen.getByPlaceholderText('নাম ( সম্পর্ক )'), {
      target: { value: 'Jane Doe (Mother)' },
    });
    fireEvent.change(screen.getByRole('textbox', { name: 'অভিভাবকের ফোন নাম্বার' }), {
      target: { value: '01798765432' },
    });
    fireEvent.change(screen.getByPlaceholderText('ইমেইল'), {
      target: { value: 'jane.doe@example.com' },
    });

    // Check if setFormData was called with the updated values
    expect(mockSetFormData).toHaveBeenCalledWith({
      ...initialFormData,
      guardianInfo: 'Jane Doe (Mother)',
    });
    expect(mockSetFormData).toHaveBeenCalledWith({
      ...initialFormData,
      guardianContact: '01798765432',
    });
    expect(mockSetFormData).toHaveBeenCalledWith({
      ...initialFormData,
      candidateEmail: 'jane.doe@example.com',
    });
  });

  it.skip('validates mobile number input correctly', async () => {
    render(
      <ContactInfo formData={initialFormData} setFormData={mockSetFormData} />,
    );

    // Input an invalid mobile number
    fireEvent.change(screen.getByLabelText(''), {
      target: { value: '12345' },
    });

    // Check for validation message
    expect(screen.getByText(/Invalid Mobile Number/i)).toBeInTheDocument();

    // Input a valid mobile number
    fireEvent.change(screen.getByLabelText(''), {
      target: { value: '01798765432' },
    });

    // Ensure validation message is removed
    await waitFor(() => {
      expect(
        screen.queryByText(/Invalid Mobile Number/i),
      ).not.toBeInTheDocument();
    });
  });

  it('validates email input correctly', async () => {
    render(
      <ContactInfo formData={initialFormData} setFormData={mockSetFormData} />,
    );

    // Input an invalid email address
    fireEvent.change(screen.getByPlaceholderText(/ইমেইল/i), {
      target: { value: 'invalid-email' },
    });

    // Check for validation message
    expect(screen.getByText(/Invalid Email/i)).toBeInTheDocument();

    // Input a valid email address
    fireEvent.change(screen.getByPlaceholderText(/ইমেইল/i), {
      target: { value: 'valid.email@example.com' },
    });

    // Ensure validation message is removed
    await waitFor(() => {
      expect(screen.queryByText(/Invalid Email/i)).not.toBeInTheDocument();
    });
  });

  it('syncs form data with local state on prop change', async () => {
    const updatedFormData: ContactInfoData = {
      guardianInfo: 'Alice (Mother)',
      guardianContact: '+8809876543210',
      candidateNumber: '01987654321',
      candidateEmail: 'alice.mother@example.com',
    };

    render(
      <ContactInfo formData={updatedFormData} setFormData={mockSetFormData} />,
    );

    // Ensure that the form data is correctly synced
    await waitFor(() => {
      expect(screen.getByDisplayValue('Alice (Mother)')).toBeInTheDocument();
      expect(screen.getByDisplayValue('+8809876543210')).toBeInTheDocument();
      expect(screen.getByDisplayValue('01987654321')).toBeInTheDocument();
      expect(
        screen.getByDisplayValue('alice.mother@example.com'),
      ).toBeInTheDocument();
    });
  });
});
