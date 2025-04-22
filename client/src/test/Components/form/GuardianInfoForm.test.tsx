import { render, fireEvent, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import GuardianInfoForm from '../../../components/form/GuardianInfoForm';
import { GardianInfo } from '../../../interfaces/Biodata.interface';

describe('GuardianInfoForm Component', () => {
  const mockOnChange = vi.fn();

  const initialGuardian: GardianInfo = {
    aliveStatus: 'জীবিত',
    profession: 'Teacher',
  };

  it('should render correctly', () => {
    render(
      <GuardianInfoForm
        label="পিতা"
        guardian={initialGuardian}
        onChange={mockOnChange}
      />
    );

    // Check for the label
    expect(screen.getByText('পিতা')).toBeInTheDocument();

    // Check if current status labels are rendered
    expect(screen.getByText('জীবিত')).toBeInTheDocument();
    expect(screen.getByText('মৃত')).toBeInTheDocument();

    // Check if profession input is rendered
    expect(screen.getByPlaceholderText('পেশা , বিবরণসহ')).toBeInTheDocument();
  });

  it('should call onChange when a checkbox is clicked', () => {
    render(
      <GuardianInfoForm
        label="পিতা"
        guardian={initialGuardian}
        onChange={mockOnChange}
      />
    );

    const aliveCheckbox = screen.getByLabelText('জীবিত') as HTMLInputElement;
    const deadCheckbox = screen.getByLabelText('মৃত') as HTMLInputElement;

    // Click the "জীবিত" checkbox
    fireEvent.click(aliveCheckbox);
    expect(mockOnChange).toHaveBeenCalledWith({
      ...initialGuardian,
      aliveStatus: 'জীবিত',
    });

    // Click the "মৃত" checkbox
    fireEvent.click(deadCheckbox);
    expect(mockOnChange).toHaveBeenCalledWith({
      ...initialGuardian,
      aliveStatus: 'মৃত',
    });
  });

  it('should call onChange when profession textarea is changed', () => {
    render(
      <GuardianInfoForm
        label="পিতা"
        guardian={initialGuardian}
        onChange={mockOnChange}
      />
    );

    const professionTextarea = screen.getByPlaceholderText(
      'পেশা , বিবরণসহ'
    ) as HTMLTextAreaElement;

    // Change profession textarea value
    fireEvent.change(professionTextarea, { target: { value: 'Engineer' } });
    expect(mockOnChange).toHaveBeenCalledWith({
      ...initialGuardian,
      profession: 'Engineer',
    });
  });
});
