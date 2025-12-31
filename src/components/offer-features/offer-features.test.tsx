import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import OfferFeatures from './offer-features';
import { OfferType } from '../../constants';

describe('OfferFeatures', () => {
  it('should render apartment type', () => {
    render(<OfferFeatures type={OfferType.Apartment} bedrooms={2} maxAdults={4} />);

    expect(screen.getByText('Apartment')).toBeInTheDocument();
    expect(screen.getByText('2 Bedrooms')).toBeInTheDocument();
    expect(screen.getByText('Max 4 adults')).toBeInTheDocument();
  });

  it('should render room type', () => {
    render(<OfferFeatures type={OfferType.Room} bedrooms={1} maxAdults={2} />);

    expect(screen.getByText('Room')).toBeInTheDocument();
    expect(screen.getByText('1 Bedroom')).toBeInTheDocument();
    expect(screen.getByText('Max 2 adults')).toBeInTheDocument();
  });

  it('should render house type', () => {
    render(<OfferFeatures type={OfferType.House} bedrooms={3} maxAdults={6} />);

    expect(screen.getByText('House')).toBeInTheDocument();
    expect(screen.getByText('3 Bedrooms')).toBeInTheDocument();
    expect(screen.getByText('Max 6 adults')).toBeInTheDocument();
  });

  it('should render hotel type', () => {
    render(<OfferFeatures type={OfferType.Hotel} bedrooms={4} maxAdults={8} />);

    expect(screen.getByText('Hotel')).toBeInTheDocument();
    expect(screen.getByText('4 Bedrooms')).toBeInTheDocument();
    expect(screen.getByText('Max 8 adults')).toBeInTheDocument();
  });

  it('should use singular form for 1 bedroom', () => {
    render(<OfferFeatures type={OfferType.Apartment} bedrooms={1} maxAdults={1} />);

    expect(screen.getByText('1 Bedroom')).toBeInTheDocument();
    expect(screen.getByText('Max 1 adult')).toBeInTheDocument();
  });
});

