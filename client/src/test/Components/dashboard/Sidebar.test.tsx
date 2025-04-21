import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SidebarComponent from '../../../components/dashboard/Sidebar';
import { BrowserRouter } from 'react-router-dom';

// Render helper with router context
const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

// Mock lucide-react icons to simplify testing
vi.mock('lucide-react', () => {
  return {
    LayoutGrid: () => <div data-testid="LayoutGrid" />,
    X: () => <div data-testid="X" />,
    BarChart: () => <div data-testid="BarChart" />,
    User: () => <div data-testid="User" />,
    Settings: () => <div data-testid="Settings" />,
    Heart: () => <div data-testid="Heart" />,
    ShoppingCart: () => <div data-testid="ShoppingCart" />,
    HelpCircle: () => <div data-testid="HelpCircle" />,
    ShieldUser: () => <div data-testid="ShieldUser" />,
  };
});

describe('SidebarComponent', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all sidebar links in desktop view', () => {
    renderWithRouter(<SidebarComponent />);

    expect(screen.getAllByRole('link')).toHaveLength(7); // 7 sidebar links
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Analytics')).toBeInTheDocument();
    expect(screen.getByText('Edit Biodata')).toBeInTheDocument();
    expect(screen.getByText('Verify Profile')).toBeInTheDocument();
    expect(screen.getByText('Favourite List')).toBeInTheDocument();
    expect(screen.getByText('Purchase')).toBeInTheDocument();
    expect(screen.getByText('Support and Report')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('toggles the mobile sidebar', async () => {
    renderWithRouter(<SidebarComponent />);

    // Open button is visible
    const openBtn = screen.getByRole('button', { name: /open sidebar/i });
    expect(openBtn).toBeInTheDocument();

    // Click to open sidebar
    fireEvent.click(openBtn);

    // Close button should now be visible
    const closeBtn = screen.getByRole('button', { name: /close sidebar/i });
    expect(closeBtn).toBeInTheDocument();

    // Sidebar links should be visible
    expect(screen.getByText('Edit Biodata')).toBeInTheDocument();

    // Click to close sidebar
    fireEvent.click(closeBtn);

    // The sidebar should be closed (but still in DOM with class)
    expect(closeBtn).not.toBeVisible(); // Sidebar transforms out of view
  });
});
