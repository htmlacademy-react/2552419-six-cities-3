import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import OfferDescription from './offer-description';

describe('OfferDescription', () => {
  it('should render description paragraphs', () => {
    const paragraphs = ['First paragraph', 'Second paragraph', 'Third paragraph'];
    render(<OfferDescription paragraphs={paragraphs} />);

    expect(screen.getByText('First paragraph')).toBeInTheDocument();
    expect(screen.getByText('Second paragraph')).toBeInTheDocument();
    expect(screen.getByText('Third paragraph')).toBeInTheDocument();
  });

  it('should render nothing when paragraphs array is empty', () => {
    const { container } = render(<OfferDescription paragraphs={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('should render single paragraph', () => {
    const paragraphs = ['Single paragraph'];
    render(<OfferDescription paragraphs={paragraphs} />);

    expect(screen.getByText('Single paragraph')).toBeInTheDocument();
  });
});

