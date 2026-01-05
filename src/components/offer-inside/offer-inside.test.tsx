import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import OfferInside from './offer-inside';

describe('OfferInside', () => {
  it('should render list of items', () => {
    const items = ['WiFi', 'Heating', 'Kitchen', 'Cable TV'];
    render(<OfferInside items={items} />);

    expect(screen.getByText('What\'s inside')).toBeInTheDocument();
    items.map((item) =>
      expect(screen.getByText(item)).toBeInTheDocument()
    );
  });

  it('should render empty list', () => {
    render(<OfferInside items={[]} />);

    expect(screen.getByText('What\'s inside')).toBeInTheDocument();
  });

  it('should render single item', () => {
    const items = ['WiFi'];
    render(<OfferInside items={items} />);

    expect(screen.getByText('What\'s inside')).toBeInTheDocument();
    items.map((item) =>
      expect(screen.getByText(item)).toBeInTheDocument()
    );
  });
});

