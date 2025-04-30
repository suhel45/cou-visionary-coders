import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Dashboard from '../../../components/dashboard/Dashboard';

// Mock the Sidebar component
vi.mock('./Sidebar', () => ({
  default: () => <div data-testid="sidebar">Sidebar Content</div>,
}));

// Properly mock react-router-dom preserving original exports
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>();
  return {
    ...actual,
    Outlet: () => <div data-testid="outlet">Outlet Content</div>,
  };
});

describe.skip('Dashboard Component', () => {
  it('renders the correct layout structure', () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>,
    );

    // Main container
    const dashboard = screen.getByRole('main');
    expect(dashboard).toBeInTheDocument();
    expect(dashboard).toHaveClass('flex');
    expect(dashboard).toHaveClass('flex-row');
    expect(dashboard).toHaveClass('min-h-screen');

    // Sidebar
    const sidebar = screen.getByTestId('sidebar');
    expect(sidebar).toBeInTheDocument();
    expect(sidebar.textContent).toBe('Sidebar Content');

    // Outlet and its container
    const outlet = screen.getByTestId('outlet');
    expect(outlet).toBeInTheDocument();
    expect(outlet.textContent).toBe('Outlet Content');

    const contentArea = outlet.parentElement;
    expect(contentArea).toHaveClass('flex-1');
    expect(contentArea).toHaveClass('w-full');
    expect(contentArea).toHaveClass('md:p-6');
    expect(contentArea).toHaveClass('overflow-y-auto');
    expect(contentArea).toHaveClass('h-screen');
  });

  it('renders both Sidebar and Outlet components', () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('outlet')).toBeInTheDocument();
  });
});
