import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import FAQ from '../../components/Faq';

describe.skip('FAQ Component', () => {
  beforeEach(() => {
    render(<FAQ />);
  });

  it('renders the FAQ heading', () => {
    const heading = screen.getByText(/Frequently Asked Questions/i);
    expect(heading).toBeInTheDocument();
  });

  it('renders all accordion questions', () => {
    const questions = [
      'React is a JavaScript library for building user interfaces, maintained by Facebook.',
      'Ques 2',
      'Ques 3',
    ];

    questions.forEach((question) => {
      expect(screen.getByText(question)).toBeInTheDocument();
    });
  });

  it('expands and reveals the answer when an accordion is clicked', () => {
    const question = screen.getByText('Ques 2');
    fireEvent.click(question);

    const answer = screen.getByText(
      /Material-UI is a popular React UI framework/i,
    );
    expect(answer).toBeInTheDocument();
  });
});
