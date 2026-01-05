import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SortOptions from './sort-options';
import { SortType } from '../../constants';

describe('SortOptions', () => {
  it('should render sort options', () => {
    render(<SortOptions />);
    expect(screen.getByText('Sort by')).toBeInTheDocument();
  });

  it('should display current sort', () => {
    render(<SortOptions currentSort="Price: low to high" />);
    const sortType = screen.getByTestId('sorting-type');
    expect(sortType).toHaveTextContent('Price: low to high');
  });

  it('should show options when isOpen is true', () => {
    render(<SortOptions isOpen />);
    const optionsList = screen.getByRole('list');
    expect(optionsList).toHaveClass('places__options--opened');
  });

  it('should hide options when isOpen is false', () => {
    render(<SortOptions isOpen={false} />);
    const optionsList = screen.getByRole('list');
    expect(optionsList).not.toHaveClass('places__options--opened');
  });

  it('should highlight active option', () => {
    render(<SortOptions currentSort="Popular" isOpen />);
    const optionsList = screen.getByRole('list');
    const popularOption = Array.from(optionsList.querySelectorAll('.places__option')).find(
      (option) => option.textContent === 'Popular'
    );
    expect(popularOption).toHaveClass('places__option--active');
  });

  it('should call onSortChange when option is clicked', async () => {
    const handleSortChange = vi.fn();
    const user = userEvent.setup();
    render(<SortOptions currentSort="Popular" isOpen onSortChange={handleSortChange} />);
    const priceOption = screen.getByText('Price: low to high');
    await user.click(priceOption);
    expect(handleSortChange).toHaveBeenCalledWith(SortType.PriceLow);
  });

  it('should call onSortToggle when sort button is clicked', async () => {
    const handleSortToggle = vi.fn();
    const user = userEvent.setup();
    render(<SortOptions currentSort="Popular" onSortToggle={handleSortToggle} />);
    const sortButton = screen.getByTestId('sorting-type');
    await user.click(sortButton);
    expect(handleSortToggle).toHaveBeenCalledTimes(1);
  });

  it('should not call onSortChange when option is clicked and handler is not provided', async () => {
    const user = userEvent.setup();
    render(<SortOptions currentSort="Popular" isOpen />);
    const priceOption = screen.getByText('Price: low to high');
    await user.click(priceOption);
    // Should not throw error
    expect(priceOption).toBeInTheDocument();
  });
});

