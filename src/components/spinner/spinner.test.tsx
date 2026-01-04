import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Spinner from './spinner';

describe('Spinner', () => {
  it('should render correctly', () => {
    const { container } = render(<Spinner />);
    const spinnerContainer = container.querySelector('.spinner-container');
    expect(spinnerContainer).toBeInTheDocument();
    const spinner = container.querySelector('.spinner');
    expect(spinner).toBeInTheDocument();
  });
});

