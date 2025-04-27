import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import UserProfile from '../../components/UserProfile';
import { PersonalInfoData } from '../../interfaces/Biodata.interface';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('UserProfile Component', () => {
  const mockData: PersonalInfoData = {
    gender: 'Female',
    maritalStatus: 'Single',
    birthDate: '1995-05-15',
    height: '5.5 ft',
    complexion: 'Fair',
    weight: '55 kg',
    bloodGroup: 'O+',
    occupation: 'Software Engineer',
    religion: 'Islam',
  };

  const biodataNo = 12345;

  beforeEach(() => {
    // Clean up the DOM before each test to avoid conflicts
    cleanup();
  });

  afterEach(() => {
    // Ensure no leftover DOM elements after each test
    cleanup();
  });

  it('renders the UserProfile component correctly', () => {
    render(<UserProfile data={mockData} biodataNo={biodataNo} />);

    // Check if the biodata number is displayed
    expect(screen.getByText(`Biodata No : ${biodataNo}`)).toBeInTheDocument();

    // Check if the biodata status is displayed
    expect(screen.getByText(/Biodata Status/i)).toBeInTheDocument();
    expect(screen.getByText(/Verified/i)).toBeInTheDocument();

    // Check if the avatar is displayed
    const avatar = screen.getByRole('img');
    expect(avatar).toBeInTheDocument();

    // Check if all biodata details are displayed
    expect(screen.getByText('Gender')).toBeInTheDocument();
    expect(screen.getByText(': Female')).toBeInTheDocument();

    expect(screen.getByText('Marital Status')).toBeInTheDocument();
    expect(screen.getByText(': Single')).toBeInTheDocument();

    expect(screen.getByText('Birth Date')).toBeInTheDocument();
    expect(screen.getByText(': 1995-05-15')).toBeInTheDocument();

    expect(screen.getByText('Height')).toBeInTheDocument();
    expect(screen.getByText(': 5.5 ft')).toBeInTheDocument();

    expect(screen.getByText('Complexion')).toBeInTheDocument();
    expect(screen.getByText(': Fair')).toBeInTheDocument();

    expect(screen.getByText('Weight')).toBeInTheDocument();
    expect(screen.getByText(': 55 kg')).toBeInTheDocument();

    expect(screen.getByText('Blood Group')).toBeInTheDocument();
    expect(screen.getByText(': O+')).toBeInTheDocument();

    expect(screen.getByText('Occupation')).toBeInTheDocument();
    expect(screen.getByText(': Software Engineer')).toBeInTheDocument();

    expect(screen.getByText('Religion')).toBeInTheDocument();
    expect(screen.getByText(': Islam')).toBeInTheDocument();
  });

  it('renders the correct avatar based on gender', () => {
    // Test for Female avatar
    render(<UserProfile data={mockData} biodataNo={biodataNo} />);
    const femaleAvatar = screen.getByRole('img');
    expect(femaleAvatar).toHaveAttribute('src', expect.stringContaining('woman.png'));

    // Clean up before rendering the next test
    cleanup();

    // Test for Male avatar
    const maleData = { ...mockData, gender: 'Male' };
    render(<UserProfile data={maleData} biodataNo={biodataNo} />);
    const maleAvatar = screen.getByRole('img');
    expect(maleAvatar).toHaveAttribute('src', expect.stringContaining('man.png'));
  });
});