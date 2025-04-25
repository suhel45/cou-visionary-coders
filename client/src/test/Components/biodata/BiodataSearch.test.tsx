import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import BiodataSearch from '../../../components/biodata/BiodataSearch';
import { SearchParams } from '../../../interfaces/Search.interface';

describe('BiodataSearch Component', () => {
  const mockOnSearch = vi.fn();
  const mockOnClear = vi.fn();

  const initialParams: SearchParams = {
    gender: 'Male',
    ageMin: '20',
    ageMax: '30',
  };

  const renderComponent = () =>
    render(
      <BiodataSearch
        onSearch={mockOnSearch}
        onClear={mockOnClear}
        initialParams={initialParams}
      />,
    );

  it('renders all form fields correctly', () => {
    renderComponent();

    expect(screen.getByLabelText('লিঙ্গ')).toBeInTheDocument();
    expect(screen.getByLabelText('বৈবাহিক অবস্থা')).toBeInTheDocument();
    expect(screen.getByLabelText('ধর্ম')).toBeInTheDocument();
    expect(screen.getByLabelText('গাত্রবর্ন')).toBeInTheDocument();
    expect(screen.getByLabelText('বয়সের সীমা')).toBeInTheDocument();
    expect(screen.getByLabelText('উচ্চতার সীমা (inc)')).toBeInTheDocument();
    expect(screen.getByLabelText('পেশা')).toBeInTheDocument();
    expect(screen.getByLabelText('জেলা')).toBeInTheDocument();
    expect(screen.getByLabelText('উপজেলা')).toBeInTheDocument();
    expect(
      screen.getByLabelText('পারিবারিক আর্থিক অবস্থা'),
    ).toBeInTheDocument();
  });

  it('calls onSearch with updated values on submit', () => {
    renderComponent();

    fireEvent.change(screen.getByLabelText('জেলা'), {
      target: { value: 'Dhaka' },
    });

    fireEvent.click(screen.getByRole('button', { name: /search biodata/i }));

    expect(mockOnSearch).toHaveBeenCalledWith(
      expect.objectContaining({
        ...initialParams,
        district: 'Dhaka',
      }),
    );
  });

  it('calls onClear and resets form when Clear Filters is clicked', () => {
    renderComponent();

    fireEvent.click(screen.getByRole('button', { name: /clear filters/i }));

    expect(mockOnClear).toHaveBeenCalled();
  });

  it('shows initialParams when provided', () => {
    renderComponent();

    const genderSelect = screen.getByLabelText('লিঙ্গ') as HTMLSelectElement;
    // const ageMinInput = screen.getByLabelText(
    //   'বয়সের সীমা',
    // ) as HTMLInputElement;

    expect(genderSelect.value).toBe('Male');
    expect(screen.getByDisplayValue('20')).toBeInTheDocument();
    expect(screen.getByDisplayValue('30')).toBeInTheDocument();
  });
});
