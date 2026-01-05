import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import OfferHost from './offer-host';

describe('OfferHost', () => {
  it('should render host information', () => {
    const description = ['First paragraph', 'Second paragraph'];
    render(
      <OfferHost
        name="John Doe"
        avatarUrl="avatar.jpg"
        isPro={false}
        description={description}
      />
    );

    expect(screen.getByText('Meet the host')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    description.map((paragraph) =>
      expect(screen.getByText(paragraph)).toBeInTheDocument()
    );
  });

  it('should render pro badge when host is pro', () => {
    const description = ['Description'];
    render(
      <OfferHost
        name="Jane Smith"
        avatarUrl="avatar.jpg"
        isPro
        description={description}
      />
    );

    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Pro')).toBeInTheDocument();
  });

  it('should not render pro badge when host is not pro', () => {
    const description = ['Description'];
    render(
      <OfferHost
        name="Bob Johnson"
        avatarUrl="avatar.jpg"
        isPro={false}
        description={description}
      />
    );

    expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
    expect(screen.queryByText('Pro')).not.toBeInTheDocument();
  });

  it('should render multiple description paragraphs', () => {
    const description = ['Paragraph 1', 'Paragraph 2', 'Paragraph 3'];
    render(
      <OfferHost
        name="Test Host"
        avatarUrl="avatar.jpg"
        isPro={false}
        description={description}
      />
    );

    description.map((paragraph) =>
      expect(screen.getByText(paragraph)).toBeInTheDocument()
    );
  });
});

