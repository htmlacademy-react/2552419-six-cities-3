import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Footer from './footer';

const renderWithRouter = (component: React.ReactElement) =>
  render(<BrowserRouter>{component}</BrowserRouter>);

describe('Footer', () => {
  it('should render correctly', () => {
    renderWithRouter(<Footer />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveClass('footer', 'container');
  });

  it('should contain logo', () => {
    renderWithRouter(<Footer />);
    const logo = screen.getByAltText('6 cities logo');
    expect(logo).toBeInTheDocument();
  });
});

