import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Card from '../../components/Card';

describe('Card Component', () => {
  const props = {
    imageSrc: '/test-image.png',
    title: 'Test Title',
    description: 'This is a test description for the card.',
  };

  it('renders the title', () => {
    render(<Card {...props} />);
    const title = screen.getByText(props.title);
    expect(title).toBeInTheDocument();
  });

  it('renders the description', () => {
    render(<Card {...props} />);
    const desc = screen.getByText(props.description);
    expect(desc).toBeInTheDocument();
  });

  it('renders the image with correct alt text', () => {
    render(<Card {...props} />);
    const img = screen.getByAltText(props.title) as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toContain(props.imageSrc); // relative paths resolve differently in test env
  });
});
