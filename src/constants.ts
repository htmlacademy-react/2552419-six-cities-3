import L from 'leaflet';
import type { City, Offer } from './types/offer';
import type { Review } from './mocks/reviews';

type SortOption = {
  name: string;
  value: string;
}

const MAP_ICON_WIDTH = 27;
const MAP_ICON_HEIGHT = 39;
const MAP_ICON_ANCHOR_X = 13.5;
const MAP_ICON_ANCHOR_Y = 39;

const MIN_COMMENT_LENGTH = 50;
const STAR_ICON_WIDTH = 37;
const STAR_ICON_HEIGHT = 33;
const MAX_RATING = 5;
const RATING_4 = 4;
const RATING_3 = 3;
const RATING_2 = 2;
const MIN_RATING = 1;

const PERCENT_PER_STAR = 20;

const FAVORITES_IMAGE_WIDTH = 150;
const DEFAULT_IMAGE_WIDTH = 260;
const FAVORITES_IMAGE_HEIGHT = 110;
const DEFAULT_IMAGE_HEIGHT = 200;

const LARGE_ICON_WIDTH = 31;
const SMALL_ICON_WIDTH = 18;
const LARGE_ICON_HEIGHT = 33;
const SMALL_ICON_HEIGHT = 19;

const NEARBY_OFFERS_COUNT = 3;
const DEFAULT_BEDROOMS_COUNT = 3;
const DEFAULT_MAX_ADULTS_COUNT = 4;
const PREMIUM_OFFER_INDEX = 2;

const AMSTERDAM_OFFERS_COUNT = 2;
const FIRST_OFFER_INDEX = 0;

const AVATAR_SIZE = 54;
const HOST_AVATAR_SIZE = 74;

const LOGO_WIDTH = 81;
const LOGO_HEIGHT = 41;
const FOOTER_LOGO_WIDTH = 64;
const FOOTER_LOGO_HEIGHT = 33;

const ARROW_ICON_WIDTH = 7;
const ARROW_ICON_HEIGHT = 4;

const DEFAULT_FAVORITE_COUNT = 3;
const EMPTY_FAVORITE_COUNT = 0;

const OFFERS_COUNT = 312;

const MOCK_OFFER_RATING = 4.8;
const MOCK_OFFER_PRICE = 120;

const PARTICLES_COUNT = 20;

const DEFAULT_ACTIVE_CITY_NAME = 'Amsterdam';
const EMPTY_PAGE_ACTIVE_CITY_NAME = 'Dusseldorf';

const DEFAULT_SORT_OPTIONS: SortOption[] = [
  { name: 'Popular', value: 'popular' },
  { name: 'Price: low to high', value: 'price-low' },
  { name: 'Price: high to low', value: 'price-high' },
  { name: 'Top rated first', value: 'rating' },
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

const REVIEWS_DATA: Review[] = [
  {
    id: '1',
    user: {
      name: 'Max',
      avatarUrl: 'img/avatar-max.jpg',
    },
    rating: 4.0,
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
    date: '2019-04-24',
  },
];

const NEARBY_OFFERS: Offer[] = [
  {
    id: '1',
    title: 'Wood and stone place',
    type: 'Room',
    price: 80,
    previewImage: 'img/room.jpg',
    rating: 4.0,
    isFavorite: true,
    city: { name: 'Amsterdam' },
    location: {
      latitude: 52.37454,
      longitude: 4.897976,
      zoom: 10,
    },
  },
  {
    id: '2',
    title: 'Canal View Prinsengracht',
    type: 'Apartment',
    price: 132,
    previewImage: 'img/apartment-02.jpg',
    rating: 4.0,
    isFavorite: false,
    city: { name: 'Amsterdam' },
    location: {
      latitude: 52.35054,
      longitude: 4.908976,
      zoom: 10,
    },
  },
  {
    id: '3',
    title: 'Nice, cozy, warm big bed apartment',
    type: 'Apartment',
    price: 180,
    previewImage: 'img/apartment-03.jpg',
    rating: 5.0,
    isFavorite: false,
    city: { name: 'Amsterdam' },
    location: {
      latitude: 52.39054,
      longitude: 4.853096,
      zoom: 10,
    },
  },
];

const DEFAULT_ICON = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [MAP_ICON_WIDTH, MAP_ICON_HEIGHT],
  iconAnchor: [MAP_ICON_ANCHOR_X, MAP_ICON_ANCHOR_Y],
});

const ACTIVE_ICON = L.icon({
  iconUrl: 'img/pin-active.svg',
  iconSize: [MAP_ICON_WIDTH, MAP_ICON_HEIGHT],
  iconAnchor: [MAP_ICON_ANCHOR_X, MAP_ICON_ANCHOR_Y],
});

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
export { AppRoute };
export {
  MAP_ICON_WIDTH,
  MAP_ICON_HEIGHT,
  MAP_ICON_ANCHOR_X,
  MAP_ICON_ANCHOR_Y,
  MIN_COMMENT_LENGTH,
  STAR_ICON_WIDTH,
  STAR_ICON_HEIGHT,
  MAX_RATING,
  RATING_4,
  RATING_3,
  RATING_2,
  MIN_RATING,
  PERCENT_PER_STAR,
  FAVORITES_IMAGE_WIDTH,
  DEFAULT_IMAGE_WIDTH,
  FAVORITES_IMAGE_HEIGHT,
  DEFAULT_IMAGE_HEIGHT,
  LARGE_ICON_WIDTH,
  SMALL_ICON_WIDTH,
  LARGE_ICON_HEIGHT,
  SMALL_ICON_HEIGHT,
  NEARBY_OFFERS_COUNT,
  DEFAULT_BEDROOMS_COUNT,
  DEFAULT_MAX_ADULTS_COUNT,
  PREMIUM_OFFER_INDEX,
  AMSTERDAM_OFFERS_COUNT,
  FIRST_OFFER_INDEX,
  AVATAR_SIZE,
  HOST_AVATAR_SIZE,
  LOGO_WIDTH,
  LOGO_HEIGHT,
  FOOTER_LOGO_WIDTH,
  FOOTER_LOGO_HEIGHT,
  ARROW_ICON_WIDTH,
  ARROW_ICON_HEIGHT,
  DEFAULT_FAVORITE_COUNT,
  EMPTY_FAVORITE_COUNT,
  OFFERS_COUNT,
  MOCK_OFFER_RATING,
  MOCK_OFFER_PRICE,
  PARTICLES_COUNT,
  DEFAULT_ACTIVE_CITY_NAME,
  EMPTY_PAGE_ACTIVE_CITY_NAME,
  DEFAULT_SORT_OPTIONS,
  GALLERY_IMAGES,
  INSIDE_ITEMS,
  REVIEWS_DATA,
  NEARBY_OFFERS,
  DEFAULT_ICON,
  ACTIVE_ICON,
  CITIES,
  getOfferUrl,
};
