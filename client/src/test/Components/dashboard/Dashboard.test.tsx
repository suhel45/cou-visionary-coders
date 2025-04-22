import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Dashboard from '../../../components/dashboard/Dashboard';

// Mock Sidebar
vi.mock('./Sidebar', () => ({
  default: () => <div data-testid="sidebar">Mock Sidebar</div>,
}));

// Mock react-router-dom's Outlet
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    Outlet: () => <div data-testid="outlet">Mock Outlet Content</div>,
  };
});

describe('Dashboard Component', () => {
  it('renders Sidebar and Outlet', () => {
    render(<Dashboard />);

    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('outlet')).toBeInTheDocument();
  });
});
