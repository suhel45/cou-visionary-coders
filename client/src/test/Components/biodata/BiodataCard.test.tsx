import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BiodataCard from '../../../components/biodata/BiodataCard';

const mockUserMale = {
  _id: '1',
  biodataNo: 123,
  personalInfo: {
    gender: 'Male',
    birthDate: '1990-01-01',
    height: '5\'9"',
    occupation: 'Engineer',
    complexion: 'Fair',
  },
};

const mockUserFemale = {
  _id: '2',
  biodataNo: 456,
  personalInfo: {
    gender: 'Female',
    birthDate: '1995-05-05',
    height: '5\'4"',
    occupation: 'Doctor',
    complexion: 'Medium',
  },
};

describe('BiodataCard', () => {
  it('renders male user info correctly', () => {
    render(
      <MemoryRouter>
        <BiodataCard user={mockUserMale} currentPage={1} />
      </MemoryRouter>
    );

    expect(screen.getByText('Biodata - 123')).toBeInTheDocument();
    expect(screen.getByText(/জন্ম তারিখ : 1990-01-01/)).toBeInTheDocument();
    expect(screen.getByText(/উচ্চতা : 5'9"/)).toBeInTheDocument();
    expect(screen.getByText(/পেশা : Engineer/)).toBeInTheDocument();
    expect(screen.getByText(/গায়ের রং : Fair/)).toBeInTheDocument();
    expect(screen.getByAltText('Man')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /View Profile/i })).toHaveAttribute('href', '/biodata/profile/1');
  });

  it('renders female user info correctly', () => {
    render(
      <MemoryRouter>
        <BiodataCard user={mockUserFemale} currentPage={2} />
      </MemoryRouter>
    );

    expect(screen.getByText('Biodata - 456')).toBeInTheDocument();
    expect(screen.getByText(/জন্ম তারিখ : 1995-05-05/)).toBeInTheDocument();
    expect(screen.getByText(/উচ্চতা : 5'4"/)).toBeInTheDocument();
    expect(screen.getByText(/পেশা : Doctor/)).toBeInTheDocument();
    expect(screen.getByText(/গায়ের রং : Medium/)).toBeInTheDocument();
    expect(screen.getByAltText('Woman')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /View Profile/i })).toHaveAttribute('href', '/biodata/profile/2');
  });
});
