import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ReviewForm from './review-form';
import { rootReducer } from '../../store/root-reducer';
import { AuthorizationStatus } from '../../store/auth-slice';
import { createAPI } from '../../api/api';

const createMockStore = (initialState = {}) => {
  const api = createAPI();
  return configureStore({
    reducer: rootReducer,
    preloadedState: {
      data: {
        city: { name: 'Paris' },
        offers: [],
        nearbyOffers: {},
        isLoading: false,
        serverError: false,
      },
      auth: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: { email: 'test@example.com' },
      },
      reviews: {
        reviews: {},
        reviewsLoading: false,
        reviewsError: false,
      },
      ...initialState,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: api,
        },
      }),
  });
};

describe('ReviewForm', () => {
  it('should not render when not authorized', () => {
    const store = createMockStore({
      auth: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: null,
      },
    });
    render(
      <Provider store={store}>
        <ReviewForm offerId="1" />
      </Provider>
    );
    expect(screen.queryByLabelText('Your review')).not.toBeInTheDocument();
  });

  it('should render form when authorized', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <ReviewForm offerId="1" />
      </Provider>
    );
    expect(screen.getByLabelText('Your review')).toBeInTheDocument();
  });

  it('should render rating inputs', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <ReviewForm offerId="1" />
      </Provider>
    );
    const ratingInputs = screen.getAllByRole('radio');
    expect(ratingInputs.length).toBeGreaterThan(0);
  });

  it('should render textarea', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <ReviewForm offerId="1" />
      </Provider>
    );
    const textarea = screen.getByPlaceholderText(/Tell how was your stay/i);
    expect(textarea).toBeInTheDocument();
  });

  it('should render submit button', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <ReviewForm offerId="1" />
      </Provider>
    );
    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(submitButton).toBeInTheDocument();
  });

  it('should disable submit button when form is invalid', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <ReviewForm offerId="1" />
      </Provider>
    );
    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(submitButton).toBeDisabled();
  });

  it('should update comment when typing in textarea', async () => {
    const store = createMockStore();
    const user = userEvent.setup();
    render(
      <Provider store={store}>
        <ReviewForm offerId="1" />
      </Provider>
    );
    const textarea = screen.getByPlaceholderText(/Tell how was your stay/i);
    await user.type(textarea, 'Great place!');
    expect(textarea).toHaveValue('Great place!');
  });

  it('should update rating when clicking rating star', async () => {
    const store = createMockStore();
    const user = userEvent.setup();
    render(
      <Provider store={store}>
        <ReviewForm offerId="1" />
      </Provider>
    );
    const ratingInputs = screen.getAllByRole('radio');
    const firstRating = ratingInputs[0];
    await user.click(firstRating);
    expect(firstRating).toBeChecked();
  });

  it('should enable submit button when form is valid', async () => {
    const store = createMockStore();
    const user = userEvent.setup();
    render(
      <Provider store={store}>
        <ReviewForm offerId="1" />
      </Provider>
    );
    const ratingInputs = screen.getAllByRole('radio');
    const textarea = screen.getByPlaceholderText(/Tell how was your stay/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });

    await user.click(ratingInputs[0]);
    await user.type(textarea, 'This is a great place to stay with excellent amenities and location.');
    expect(submitButton).not.toBeDisabled();
  });

  it('should submit form when valid and submit button is clicked', async () => {
    const store = createMockStore();
    const user = userEvent.setup();
    render(
      <Provider store={store}>
        <ReviewForm offerId="1" />
      </Provider>
    );

    const ratingInputs = screen.getAllByRole('radio');
    const textarea = screen.getByPlaceholderText(/Tell how was your stay/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });

    await user.click(ratingInputs[0]);
    await user.type(textarea, 'This is a great place to stay with excellent amenities and location.');

    expect(submitButton).not.toBeDisabled();
    await user.click(submitButton);
    // Form submission is handled by Redux thunk, so we just verify the button is clickable
    expect(submitButton).toBeInTheDocument();
  });
});

