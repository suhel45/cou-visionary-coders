// BiodataStatistics.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import BiodataStatistics from '../../components/BiodataStatistics';

// Mock the Count component
vi.mock('./Count', () => ({
  default: ({
    imageSrc,
    title,
    cnt,
  }: {
    imageSrc: string;
    title: string;
    cnt: string;
  }) => (
    <div>
      <img src={imageSrc} alt={title} />
      <h3>{title}</h3>
      <p>{cnt}</p>
    </div>
  ),
}));

describe('BiodataStatistics Component', () => {
  it('renders section heading correctly', () => {
    render(<BiodataStatistics />);
    const heading = screen.getByText('সেবা গ্রহীতার পরিসংখ্যান');
    expect(heading).toBeInTheDocument();
  });

  it('renders all Count cards with titles', () => {
    render(<BiodataStatistics />);

    expect(screen.getByText('মোট পাত্রের বায়োডাটা')).toBeInTheDocument();
    expect(screen.getByText('মোট পাত্রীর বায়োডাটা')).toBeInTheDocument();
    expect(screen.getByText('মোট পাত্র-পাত্রীর বায়োডাটা')).toBeInTheDocument();
  });

  it('renders count text correctly', () => {
    render(<BiodataStatistics />);
    const countText = screen.getAllByText('Update soon');
    expect(countText.length).toBe(3);
  });
});
