import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Instructions from '../../components/Instructions';

describe('Instructions Component', () => {
  it('renders the section heading correctly', () => {
    render(<Instructions />);
    expect(
      screen.getByText('আমাদের ওয়েবসাইট যেভাবে কাজ করে'),
    ).toBeInTheDocument();
  });

  it('renders all 4 instruction cards with correct titles', () => {
    render(<Instructions />);

    const titles = [
      'বায়োডাটা তৈরী করুন',
      'বায়োডাটা খুজুন',
      'যোগাযোগ করুন',
      'বিবাহ সম্পন্ন করুন',
    ];

    titles.forEach((title) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  it('renders all card descriptions', () => {
    render(<Instructions />);

    const descriptions = [
      'খুব সহজেই বিনামূল্যে আমাদের সাইটে বায়োডাটা তৈরী করতে পারবেন।',
      'বিভিন্ন ফিল্টার ব্যবহার করে আপনি বায়োডাটা খুজতে পারবেন।',
      'আপনার বায়োডাটা কেউ পছন্দ করলে অথবা আপনি কারো বায়োডাটা পছন্দ করলে সরাসরি অভিভাবকের সাথে যোগাযোগ করতে পারবেন।',
      'বায়োডাটা ও কথাবার্তা পছন্দ হলে নিজ দায়িত্বে ভালোভাবে খোজ খবর নিয়ে বিবাহ সম্পূর্ণ করুন।',
    ];

    descriptions.forEach((desc) => {
      expect(screen.getByText(desc)).toBeInTheDocument();
    });
  });
});
