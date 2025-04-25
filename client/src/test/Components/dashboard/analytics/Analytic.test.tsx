import { render, screen } from '@testing-library/react';
import { describe, it, expect ,vi} from 'vitest';
import Analytic from '../../../../components/dashboard/analytics/Analytic';

// Mock ProfileView component
vi.mock('./ProfileView', () => ({
  default: () => <div data-testid="profile-view">Mock ProfileView</div>,
}));

describe('Analytic Component', () => {
  it('renders the ProfileView component', () => {
    render(<Analytic />);
    expect(screen.getByTestId('profile-view')).toBeInTheDocument();
    expect(screen.getByText('Mock ProfileView')).toBeInTheDocument();
  });
});
