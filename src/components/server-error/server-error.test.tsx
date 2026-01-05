import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ServerError from './server-error';

describe('ServerError', () => {
  it('should render correctly', () => {
    render(<ServerError />);
    expect(screen.getByText('Server Unavailable')).toBeInTheDocument();
    expect(screen.getByText(/The server is currently unavailable/)).toBeInTheDocument();
  });

  it('should have correct structure', () => {
    const { container } = render(<ServerError />);
    const serverError = container.querySelector('.server-error');
    expect(serverError).toBeInTheDocument();
    const content = container.querySelector('.server-error__content');
    expect(content).toBeInTheDocument();
  });
});

