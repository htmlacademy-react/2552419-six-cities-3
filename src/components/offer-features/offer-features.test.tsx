import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import OfferFeatures from './offer-features';
import { OfferType } from '../../constants';

describe('OfferFeatures', () => {
  it('should render apartment type', () => {
    const bedrooms = 2;
    const maxAdults = 4;
    render(<OfferFeatures type={OfferType.Apartment} bedrooms={bedrooms} maxAdults={maxAdults} />);

    expect(screen.getByText('Apartment')).toBeInTheDocument();
    expect(screen.getByText(`${bedrooms} Bedrooms`)).toBeInTheDocument();
    expect(screen.getByText(`Max ${maxAdults} adults`)).toBeInTheDocument();
  });

  it('should render room type', () => {
    const bedrooms = 1;
    const maxAdults = 2;
    render(<OfferFeatures type={OfferType.Room} bedrooms={bedrooms} maxAdults={maxAdults} />);

    expect(screen.getByText('Room')).toBeInTheDocument();
    expect(screen.getByText(`${bedrooms} Bedroom`)).toBeInTheDocument();
    expect(screen.getByText(`Max ${maxAdults} adults`)).toBeInTheDocument();
  });

  it('should render house type', () => {
    const bedrooms = 3;
    const maxAdults = 6;
    render(<OfferFeatures type={OfferType.House} bedrooms={bedrooms} maxAdults={maxAdults} />);

    expect(screen.getByText('House')).toBeInTheDocument();
    expect(screen.getByText(`${bedrooms} Bedrooms`)).toBeInTheDocument();
    expect(screen.getByText(`Max ${maxAdults} adults`)).toBeInTheDocument();
  });

  it('should render hotel type', () => {
    const bedrooms = 4;
    const maxAdults = 8;
    render(<OfferFeatures type={OfferType.Hotel} bedrooms={bedrooms} maxAdults={maxAdults} />);

    expect(screen.getByText('Hotel')).toBeInTheDocument();
    expect(screen.getByText(`${bedrooms} Bedrooms`)).toBeInTheDocument();
    expect(screen.getByText(`Max ${maxAdults} adults`)).toBeInTheDocument();
  });

  it('should use singular form for 1 bedroom', () => {
    const bedrooms = 1;
    const maxAdults = 1;
    render(<OfferFeatures type={OfferType.Apartment} bedrooms={bedrooms} maxAdults={maxAdults} />);

    expect(screen.getByText(`${bedrooms} Bedroom`)).toBeInTheDocument();
    expect(screen.getByText(`Max ${maxAdults} adult`)).toBeInTheDocument();
  });
});

