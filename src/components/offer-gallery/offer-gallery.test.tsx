import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import OfferGallery from './offer-gallery';

describe('OfferGallery', () => {
  it('should render gallery with images', () => {
    const images = ['image1.jpg', 'image2.jpg', 'image3.jpg'];
    render(<OfferGallery images={images} />);

    const imageElements = screen.getAllByAltText('Photo studio');
    expect(imageElements).toHaveLength(3);
  });

  it('should render maximum 6 images', () => {
    const images = ['image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg', 'image5.jpg', 'image6.jpg', 'image7.jpg', 'image8.jpg'];
    render(<OfferGallery images={images} />);

    const imageElements = screen.getAllByAltText('Photo studio');
    expect(imageElements).toHaveLength(6);
  });

  it('should render empty gallery when no images', () => {
    render(<OfferGallery images={[]} />);

    const imageElements = screen.queryAllByAltText('Photo studio');
    expect(imageElements).toHaveLength(0);
  });

  it('should render single image', () => {
    const images = ['single-image.jpg'];
    render(<OfferGallery images={images} />);

    const imageElements = screen.getAllByAltText('Photo studio');
    expect(imageElements).toHaveLength(1);
  });
});

