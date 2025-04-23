import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Count from '../../components/Count';

describe('Count Component', () => {
  const props = {
    imageSrc: '/test-man.png',
    title: 'মোট পাত্রের বায়োডাটা',
    cnt: 'Update soon',
  };

  it('renders the image with correct alt text', () => {
    render(<Count {...props} />);
    const image = screen.getByAltText(props.title) as HTMLImageElement;
    expect(image).toBeInTheDocument();
    expect(image.src).toContain(props.imageSrc);
  });

  it('renders the title text', () => {
    render(<Count {...props} />);
    const titleText = screen.getByText(props.title);
    expect(titleText).toBeInTheDocument();
  });

  it('renders the count text', () => {
    render(<Count {...props} />);
    const countText = screen.getByText(props.cnt);
    expect(countText).toBeInTheDocument();
  });
});
