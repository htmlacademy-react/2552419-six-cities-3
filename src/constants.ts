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
const PERCENT_PER_STAR = 20;

const OFFER = {
  NEARBY_COUNT: 3,
  DEFAULT_BEDROOMS_COUNT: 3,
  DEFAULT_MAX_ADULTS_COUNT: 4,
  PREMIUM_INDEX: 2,
  AMSTERDAM_COUNT: 2,
  FIRST_INDEX: 0,
} as const;

const FAVORITE_COUNT = {
  DEFAULT: 3,
  EMPTY: 0,
} as const;

const MOCK_EMAIL = 'Oliver.conner@gmail.com';

const PARTICLES_COUNT = 20;

const CITY_NAME = {
  DEFAULT_ACTIVE: 'Amsterdam',
  EMPTY_PAGE_ACTIVE: 'Dusseldorf',
} as const;

enum SortType {
  Popular = 'popular',
  PriceLow = 'price-low',
  PriceHigh = 'price-high',
  Rating = 'rating',
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

const GALLERY_IMAGES = [
  'img/room.jpg',
  'img/apartment-01.jpg',
  'img/apartment-02.jpg',
  'img/apartment-03.jpg',
  'img/studio-01.jpg',
  'img/apartment-01.jpg',
];

const INSIDE_ITEMS = [
  'Wi-Fi',
  'Washing machine',
  'Towels',
  'Heating',
  'Coffee machine',
  'Baby seat',
  'Kitchen',
  'Dishwasher',
  'Cable TV',
  'Fridge',
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
}

const getOfferUrl = (id: string): string => `/offer/${id}`;

export type { SortOption };
export { AppRoute, SortType };
export {
  MAP_ICON,
  RATING,
  MIN_COMMENT_LENGTH,
  PERCENT_PER_STAR,
  OFFER,
  FAVORITE_COUNT,
  MOCK_EMAIL,
  PARTICLES_COUNT,
  CITY_NAME,
  DEFAULT_SORT_OPTIONS,
  GALLERY_IMAGES,
  INSIDE_ITEMS,
  CITIES,
  getOfferUrl,
};
