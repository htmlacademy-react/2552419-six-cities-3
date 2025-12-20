import type { Offer } from '../types/offer';
import type { AnyAction } from '@reduxjs/toolkit';

export type State = {
  city: string;
  offers: Offer[];
}

const initialState: State = {
  city: 'Paris',
  offers: [],
};

type Action =
  | { type: 'city/changeCity'; payload: string }
  | { type: 'offers/loadOffers'; payload: Offer[] };

const reducer = (state: State = initialState, action: Action | AnyAction): State => {
  switch (action.type) {
    case 'city/changeCity':
      return {
        ...state,
        city: (action as { type: 'city/changeCity'; payload: string }).payload,
      };
    case 'offers/loadOffers':
      return {
        ...state,
        offers: (action as { type: 'offers/loadOffers'; payload: Offer[] }).payload,
      };
    default:
      return state;
  }
};

export default reducer;

