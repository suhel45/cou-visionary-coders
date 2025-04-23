// AboutUs.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import AboutUs from '../../components/AboutUs';

describe('AboutUs Component', () => {
  it('renders the section title correctly', () => {
    render(<AboutUs />);
    const title = screen.getByText('আমাদের সম্পর্কে');
    expect(title).toBeInTheDocument();
  });

  it('renders the heading inside the section', () => {
    render(<AboutUs />);
    const heading = screen.getByText('নৈতিক সম্পর্ক গঠনে আমাদের উদ্যোগ');
    expect(heading).toBeInTheDocument();
  });

  it('renders the paragraph with key content', () => {
    render(<AboutUs />);
    const paragraph = screen.getByText(
      /বর্তমান সময়ে অনেক বিশ্ববিদ্যালয় শিক্ষার্থী অস্পষ্ট ভবিষ্যৎ/i,
    );
    expect(paragraph).toBeInTheDocument();
  });
});
