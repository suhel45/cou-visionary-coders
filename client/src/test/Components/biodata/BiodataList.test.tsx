import React from 'react';
import { describe, it, vi, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BiodataList from '../../../components/biodata/BiodataList';
import { MemoryRouter } from 'react-router-dom';

// Mocks
vi.mock('../../Hooks/useUrlParams/useUrlParams', () => ({
  default: () => ({
    initialPage: 1,
    initialSearchParams: {},
    hasActiveFilters: false,
    updateUrl: vi.fn(),
  }),
}));

vi.mock('../../Hooks/useBiodataQuery/useBiodataQuery', () => ({
  default: vi.fn(),
}));

// Load actual modules
import useBiodataQuery from '../../Hooks/useBiodataQuery/useBiodataQuery';

// Mock data
const mockBiodata = [
  {
    _id: '1',
    biodataNo: 101,
    personalInfo: {
      gender: 'Male',
      birthDate: '1990-01-01',
      height: '5\'9"',
      occupation: 'Engineer',
      complexion: 'Fair',
    },
  },
];

describe('BiodataList Component', () => {
  beforeEach(() => {
    (useBiodataQuery as any).mockReturnValue({
      data: {
        data: mockBiodata,
        totalbiodata: 1,
      },
      isLoading: false,
      isFetching: false,
      error: null,
      refetch: vi.fn(),
    });
  });

  it('renders the BiodataList with a card and pagination', async () => {
    render(
      <MemoryRouter>
        <BiodataList />
      </MemoryRouter>,
    );

    // Title
    expect(screen.getByText(/Biodata List/i)).toBeInTheDocument();

    // BiodataCard content
    expect(screen.getByText(/Biodata - 101/i)).toBeInTheDocument();

    expect(screen.getByText(/পেশা : Engineer/i)).toBeInTheDocument();

    // Pagination
    expect(screen.getByRole('button', { name: /1/i })).toBeInTheDocument();
  });

  it('shows loading when fetching data', () => {
    (useBiodataQuery as any).mockReturnValueOnce({
      data: null,
      isLoading: true,
      isFetching: false,
      error: null,
      refetch: vi.fn(),
    });

    render(
      <MemoryRouter>
        <BiodataList />
      </MemoryRouter>,
    );

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it('shows error message on error', () => {
    (useBiodataQuery as any).mockReturnValueOnce({
      data: null,
      isLoading: false,
      isFetching: false,
      error: new Error('Failed to fetch'),
      refetch: vi.fn(),
    });

    render(
      <MemoryRouter>
        <BiodataList />
      </MemoryRouter>,
    );

    expect(screen.getByText(/Failed to fetch/i)).toBeInTheDocument();
  });

  it('shows message if no biodata is found', () => {
    (useBiodataQuery as any).mockReturnValueOnce({
      data: {
        data: [],
        totalbiodata: 0,
      },
      isLoading: false,
      isFetching: false,
      error: null,
      refetch: vi.fn(),
    });

    render(
      <MemoryRouter>
        <BiodataList />
      </MemoryRouter>,
    );

    expect(
      screen.getByText(/No biodata found matching your criteria/i),
    ).toBeInTheDocument();
  });
});
