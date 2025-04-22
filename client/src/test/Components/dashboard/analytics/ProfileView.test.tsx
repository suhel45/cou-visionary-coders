import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ProfileView from '../../../../components/dashboard/analytics/ProfileView';

describe('ProfileView Component', () => {
  it('renders Profile View Statistics heading', () => {
    render(<ProfileView />);
    expect(screen.getByText(/Profile View Statistics/i)).toBeInTheDocument();
  });

  it('displays last month and last week view counts', async () => {
    render(<ProfileView />);

    // Check if static counts are rendered after useEffect
    expect(await screen.findByText('1250')).toBeInTheDocument();
    expect(await screen.findByText('320')).toBeInTheDocument();

    // Check if labels are correctly rendered
    expect(screen.getByText('Last One Month')).toBeInTheDocument();
    expect(screen.getByText('Last One Week')).toBeInTheDocument();
  });
});
