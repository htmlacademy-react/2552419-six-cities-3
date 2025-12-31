import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import OfferInside from './offer-inside';

describe('OfferInside', () => {
  it('should render list of items', () => {
    const items = ['WiFi', 'Heating', 'Kitchen', 'Cable TV'];
    render(<OfferInside items={items} />);

    expect(screen.getByText('What\'s inside')).toBeInTheDocument();
    expect(screen.getByText('WiFi')).toBeInTheDocument();
    expect(screen.getByText('Heating')).toBeInTheDocument();
    expect(screen.getByText('Kitchen')).toBeInTheDocument();
    expect(screen.getByText('Cable TV')).toBeInTheDocument();
  });

  it('should render empty list', () => {
    render(<OfferInside items={[]} />);

    expect(screen.getByText('What\'s inside')).toBeInTheDocument();
  });

  it('should render single item', () => {
    const items = ['WiFi'];
    render(<OfferInside items={items} />);

    expect(screen.getByText('What\'s inside')).toBeInTheDocument();
    expect(screen.getByText('WiFi')).toBeInTheDocument();
  });
});

