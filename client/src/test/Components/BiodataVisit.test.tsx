import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BiodataVisit from '../../components/BiodataVisit';

// Helper to render with routing context
const renderWithRouter = (ui: React.ReactElement) =>
  render(<MemoryRouter>{ui}</MemoryRouter>);

describe('BiodataVisit Component', () => {
  it('renders "Visit Biodata" button with Link', () => {
    renderWithRouter(<BiodataVisit />);
    const visitButton = screen.getByRole('link', { name: /Visit Biodata/i });
    expect(visitButton).toBeInTheDocument();
    expect(visitButton).toHaveAttribute('href', '/biodata');
  });

  it('renders dialog trigger button', () => {
    renderWithRouter(<BiodataVisit />);
    const triggerBtn = screen.getByRole('button', {
      name: /কিভাবে বায়োডাটা খুজবেন/i,
    });
    expect(triggerBtn).toBeInTheDocument();
  });

  it('opens and closes the dialog with instructions', () => {
    renderWithRouter(<BiodataVisit />);

    // Click to open dialog
    const openBtn = screen.getByRole('button', {
      name: /কিভাবে বায়োডাটা খুজবেন/i,
    });
    fireEvent.click(openBtn);

    // Expect dialog content to appear
    const dialogTitle = screen.getByText('Biodata Search and Visit Information');
    expect(dialogTitle).toBeInTheDocument();

    // Check one of the instruction items
    const instruction = screen.getByText(/Visit Biodata বাটনে ক্লিক করুন/i);
    expect(instruction).toBeInTheDocument();

    // Close dialog
    const closeBtn = screen.getByRole('button', { name: /Got it/i });
    fireEvent.click(closeBtn);

    // Optional: You could assert that dialog content is not in the document
    // after closing, but MUI dialog might use portal rendering so it's a bit more complex.
  });
});
