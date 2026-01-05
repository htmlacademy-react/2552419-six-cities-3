import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UnauthorizedNavList from './unauthorized-nav-list';

describe('UnauthorizedNavList', () => {
  it('should render sign in link', () => {
    render(
      <MemoryRouter>
        <UnauthorizedNavList />
      </MemoryRouter>
    );
    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });

  it('should have link to login page', () => {
    render(
      <MemoryRouter>
        <UnauthorizedNavList />
      </MemoryRouter>
    );
    const link = screen.getByText('Sign in').closest('a');
    expect(link).toHaveAttribute('href', '/login');
  });
});

