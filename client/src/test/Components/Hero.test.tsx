import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Hero from '../../components/Hero';

describe('Hero Component', () => {
  it('renders the hero image with correct alt text', () => {
    render(<Hero />);
    const heroImage = screen.getByAltText('Hero');
    expect(heroImage).toBeInTheDocument();
    expect(heroImage.tagName).toBe('IMG');
  });
});
