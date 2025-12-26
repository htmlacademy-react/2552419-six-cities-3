import { OfferType } from '../constants';

export type City = {
  name: string;
  isActive?: boolean;
}

export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
}

export type Host = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
}

export type Offer = {
  id: string;
  title: string;
  type: OfferType;
  price: number;
  previewImage?: string;
  images?: string[];
  rating: number;
  isFavorite?: boolean;
  isPremium?: boolean;
  city: City;
  location: Location;
  bedrooms?: number;
  maxAdults?: number;
  goods?: string[];
  description?: string;
  host?: Host;
}

export type User = {
  email: string;
  avatarUrl?: string;
  favoriteCount?: number;
}

export type AuthInfo = {
  token: string;
  email: string;
  avatarUrl?: string;
}

export type Review = {
  id: string;
  user: {
    name: string;
    avatarUrl: string;
  };
  rating: number;
  comment: string;
  date: string;
}

export type ReviewData = {
  rating: number;
  comment: string;
}

