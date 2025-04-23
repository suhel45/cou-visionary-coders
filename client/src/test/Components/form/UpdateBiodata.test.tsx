import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import MultiStepForm from '../../../components/form/UpdateBiodata';

// Mock the fetch function globally
global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    status: 200,
    statusText: 'OK',
    headers: new Headers(),
    redirected: false,
    url: '',
    clone: () => undefined,
    body: null,
    bodyUsed: false,
    json: () => Promise.resolve({ message: 'Success' }),
    text: () => Promise.resolve(''),
    blob: () => Promise.resolve(new Blob()),
    formData: () => Promise.resolve(new FormData()),
    arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
  } as unknown as Response),
);

describe('MultiStepForm', () => {
  beforeEach(() => {
    vi.clearAllMocks(); // Clear mock functions before each test
  });

  test('should render the MultiStepForm correctly', () => {
    render(<MultiStepForm />);

    // Check if the first step is displayed
    expect(screen.getByText(/Personal Information/i)).toBeInTheDocument();
  });

  test('should navigate to next step when "Next" is clicked', () => {
    render(<MultiStepForm />);

    // Click on the next button to go to the next step
    const nextButton = screen.getByRole('button', { name: /Next/i });
    fireEvent.click(nextButton);

    // Check if the next step is rendered
    expect(screen.getByText(/Family Information/i)).toBeInTheDocument();
  });

  test('should navigate to previous step when "Back" is clicked', () => {
    render(<MultiStepForm />);

    // Move to the next step
    const nextButton = screen.getByRole('button', { name: /Next/i });
    fireEvent.click(nextButton);

    // Now go back to the previous step
    const backButton = screen.getByRole('button', { name: /Back/i });
    fireEvent.click(backButton);

    // Ensure we are back at the first step
    expect(screen.getByText(/Personal Information/i)).toBeInTheDocument();
  });

  test('should show error message if submit fails', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: 400,
        statusText: 'Bad Request',
        headers: new Headers(),
        redirected: false,
        url: '',
        clone: () => undefined,
        body: null,
        bodyUsed: false,
        json: () => Promise.reject(new Error('Failed to submit form')),
        text: () => Promise.resolve(''),
        blob: () => Promise.resolve(new Blob()),
        formData: () => Promise.resolve(new FormData()),
        arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
      } as unknown as Response),
    );

    render(<MultiStepForm />);

    // Complete the form steps and click "Finish"
    for (let i = 0; i < 6; i++) {
      fireEvent.click(screen.getByRole('button', { name: /Next/i }));
    }

    // Mock a failed submission
    const finishButton = screen.getByRole('button', { name: /Finish/i });
    fireEvent.click(finishButton);

    await waitFor(() => {
      expect(
        screen.getByText(/Failed! Please try again./i),
      ).toBeInTheDocument();
    });
  });

  test('should show success message if submit succeeds', async () => {
    render(<MultiStepForm />);

    // Complete the form steps and click "Finish"
    for (let i = 0; i < 6; i++) {
      fireEvent.click(screen.getByRole('button', { name: /Next/i }));
    }

    // Mock a successful submission
    const finishButton = screen.getByRole('button', { name: /Finish/i });
    fireEvent.click(finishButton);

    await waitFor(() => {
      expect(
        screen.getByText(/Form Submitted Successfully!/i),
      ).toBeInTheDocument();
    });
  });

  test('should disable the next button if current step is invalid', () => {
    render(<MultiStepForm />);

    // Check if the Next button is initially disabled
    const nextButton = screen.getByRole('button', { name: /Next/i });
    expect(nextButton).toBeDisabled();
  });

  test('should enable the next button if the current step is valid', () => {
    render(<MultiStepForm />);

    // Simulate a valid input
    fireEvent.change(screen.getByLabelText(/Personal Information/i), {
      target: { value: 'test' },
    });

    // Check if the Next button is enabled
    const nextButton = screen.getByRole('button', { name: /Next/i });
    expect(nextButton).toBeEnabled();
  });

  test('should reset the form when "Reset" is clicked after submission', async () => {
    render(<MultiStepForm />);

    // Complete the form steps and click "Finish"
    for (let i = 0; i < 6; i++) {
      fireEvent.click(screen.getByRole('button', { name: /Next/i }));
    }

    // Mock a successful submission
    const finishButton = screen.getByRole('button', { name: /Finish/i });
    fireEvent.click(finishButton);

    await waitFor(() => {
      expect(
        screen.getByText(/Form Submitted Successfully!/i),
      ).toBeInTheDocument();
    });

    // Click the reset button
    const resetButton = screen.getByRole('button', { name: /Reset/i });
    fireEvent.click(resetButton);

    // Ensure the form is reset to the first step
    expect(screen.getByText(/Personal Information/i)).toBeInTheDocument();
  });

  test('should display validation error if required fields are empty', () => {
    render(<MultiStepForm />);

    // Attempt to proceed without filling required fields
    const nextButton = screen.getByRole('button', { name: /Next/i });
    fireEvent.click(nextButton);

    // Check for validation error message
    expect(
      screen.getByText(/Please fill out all required fields/i),
    ).toBeInTheDocument();
  });
});
