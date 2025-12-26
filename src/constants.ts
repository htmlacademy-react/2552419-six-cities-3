import type { City } from './types/offer';

const MAP_ICON = {
  WIDTH: 27,
  HEIGHT: 39,
  ANCHOR_X: 13.5,
  ANCHOR_Y: 39,
} as const;

const RATING = {
  MIN: 1,
  MAX: 5,
  VALUE_2: 2,
  VALUE_3: 3,
  VALUE_4: 4,
} as const;

const MIN_COMMENT_LENGTH = 50;
const MAX_COMMENT_LENGTH = 300;
const PERCENT_PER_STAR = 20;

const OFFER = {
  NEARBY_COUNT: 3,
  DEFAULT_BEDROOMS_COUNT: 3,
  DEFAULT_MAX_ADULTS_COUNT: 4,
  PREMIUM_INDEX: 2,
  AMSTERDAM_COUNT: 2,
  FIRST_INDEX: 0,
  MAX_IMAGES: 6,
  MAX_REVIEWS_DISPLAY: 10,
} as const;

const AVATAR = {
  REVIEW_SIZE: 54,
  HOST_SIZE: 74,
} as const;

const FAVORITE_STATUS = {
  ACTIVE: 1 as const,
  INACTIVE: 0 as const,
} as const;

const PARTICLES_COUNT = 20;

const CITY_NAME = {
  DEFAULT_ACTIVE: 'Amsterdam',
  EMPTY_PAGE_ACTIVE: 'Dusseldorf',
} as const;

const API = {
  BASE_URL: 'https://15.design.htmlacademy.pro/six-cities',
  REQUEST_TIMEOUT: 5000,
  TOKEN_HEADER: 'X-Token',
} as const;

const HTTP_STATUS = {
  UNAUTHORIZED: 401 as const,
  BAD_REQUEST: 400 as const,
  NOT_FOUND: 404 as const,
} as const;

enum SortType {
  Popular = 'popular',
  PriceLow = 'price-low',
  PriceHigh = 'price-high',
  Rating = 'rating',
}

enum OfferType {
  Apartment = 'apartment',
  Room = 'room',
  House = 'house',
  Hotel = 'hotel',
}

type SortOption = {
  name: string;
  value: SortType;
}

const DEFAULT_SORT_OPTIONS: SortOption[] = [
  { name: 'Popular', value: SortType.Popular },
  { name: 'Price: low to high', value: SortType.PriceLow },
  { name: 'Price: high to low', value: SortType.PriceHigh },
  { name: 'Top rated first', value: SortType.Rating },
];

const CITIES: City[] = [
  { name: 'Paris' },
  { name: 'Cologne' },
  { name: 'Brussels' },
  { name: 'Amsterdam' },
  { name: 'Hamburg' },
  { name: 'Dusseldorf' },
];

enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id',
  NotFound = '/404',
}

const getOfferUrl = (id: string): string => `/offer/${id}`;

export type { SortOption };
export { AppRoute, SortType, OfferType };
export {
  MAP_ICON,
  RATING,
  MIN_COMMENT_LENGTH,
  MAX_COMMENT_LENGTH,
  PERCENT_PER_STAR,
  OFFER,
  FAVORITE_STATUS,
  AVATAR,
  API,
  HTTP_STATUS,
  PARTICLES_COUNT,
  CITY_NAME,
  DEFAULT_SORT_OPTIONS,
  CITIES,
  getOfferUrl,
};
