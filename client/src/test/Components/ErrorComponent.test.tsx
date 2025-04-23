import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PageNotFound from '../../components/ErrorComponent';

describe('PageNotFound Component', () => {
  it('renders the error message', () => {
    render(<PageNotFound />);
    const message = screen.getByText('Oops! Page not found.');
    expect(message).toBeInTheDocument();
  });

  it('renders the error illustration image', () => {
    render(<PageNotFound />);
    const image = screen.getByAltText('404 error illustration') as HTMLImageElement;
    expect(image).toBeInTheDocument();
    expect(image.src).toContain('404-error-abstract-concept'); // Partial URL check
  });
});
