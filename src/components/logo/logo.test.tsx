import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Logo from './logo';
import { AppRoute } from '../../constants';

const renderWithRouter = (component: React.ReactElement) =>
  render(<BrowserRouter>{component}</BrowserRouter>);

describe('Logo', () => {
  it('should render correctly', () => {
    renderWithRouter(<Logo />);
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', AppRoute.Main);
  });

  it('should render with custom className', () => {
    renderWithRouter(<Logo className="custom-class" />);
    const link = screen.getByRole('link');
    expect(link).toHaveClass('custom-class');
  });

  it('should render with custom width and height', () => {
    renderWithRouter(<Logo width={100} height={50} />);
    const img = screen.getByAltText('6 cities logo');
    expect(img).toHaveAttribute('width', '100');
    expect(img).toHaveAttribute('height', '50');
  });

  it('should render with custom to prop', () => {
    renderWithRouter(<Logo to={AppRoute.Login} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', AppRoute.Login);
  });
});

