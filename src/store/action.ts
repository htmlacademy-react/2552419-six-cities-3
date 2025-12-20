import type { Offer } from '../types/offer';

const changeCity = (city: string) => ({
  type: 'city/changeCity' as const,
  payload: city,
});

const loadOffers = (offers: Offer[]) => ({
  type: 'offers/loadOffers' as const,
  payload: offers,
});

export { changeCity, loadOffers };

