import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import UserProfile from '../../components/UserProfile';
import { PersonalInfoData } from '../interfaces/Biodata.interface';

// Mock images
vi.mock('../assets/man.png', () => 'man.png');
vi.mock('../assets/woman.png', () => 'woman.png');

const mockData: PersonalInfoData = {
  gender: 'Female',
  maritalStatus: 'Single',
  birthDate: '1995-06-15',
  height: '5.4ft',
  complexion: 'Fair',
  weight: '60kg',
  bloodGroup: 'O+',
  occupation: 'Engineer',
  religion: 'Islam',
};

describe('UserProfile Component', () => {
  it('renders with female avatar and correct biodata fields', () => {
    render(<UserProfile data={mockData} biodataNo={12345} />);

    // Avatar should use woman.png for Female
    const avatar = screen.getByRole('img') as HTMLImageElement;
    expect(avatar).toHaveAttribute('src', 'woman.png');

    // Biodata Number
    expect(screen.getByText(/Biodata No : 12345/)).toBeInTheDocument();

    // Biodata Status
    expect(screen.getByText(/Biodata Status/)).toBeInTheDocument();
    expect(screen.getByText('Verified')).toBeInTheDocument();

    // Detail fields
    expect(screen.getByText('Gender')).toBeInTheDocument();
    expect(screen.getByText(': Female')).toBeInTheDocument();

    expect(screen.getByText('Occupation')).toBeInTheDocument();
    expect(screen.getByText(': Engineer')).toBeInTheDocument();

    expect(screen.getByText('Blood Group')).toBeInTheDocument();
    expect(screen.getByText(': O+')).toBeInTheDocument();
  });

  it('renders with male avatar when gender is not Female', () => {
    const maleData = { ...mockData, gender: 'Male' };
    render(<UserProfile data={maleData} biodataNo={5678} />);

    const avatar = screen.getByRole('img') as HTMLImageElement;
    expect(avatar).toHaveAttribute('src', 'man.png');

    expect(screen.getByText(/Biodata No : 5678/)).toBeInTheDocument();
  });
});
