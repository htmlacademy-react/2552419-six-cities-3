import type { Offer, Host, Review } from '../types/offer';
import { OfferType } from '../constants';

type ServerOffer = {
  id: string;
  title: string;
  type: string;
  price: number;
  previewImage?: string;
  images?: string[];
  rating: number;
  isFavorite?: boolean;
  isPremium?: boolean;
  city: {
    name: string;
    location: {
      latitude: number;
      longitude: number;
      zoom: number;
    };
  };
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  bedrooms?: number;
  maxAdults?: number;
  goods?: string[];
  description?: string;
  host?: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
};

const mapHostServerToHost = (host: ServerOffer['host']): Host | undefined => {
  if (!host) {
    return undefined;
  }
  return {
    name: host.name,
    avatarUrl: host.avatarUrl,
    isPro: host.isPro,
  };
};

export const mapOfferServerToOffer = (offer: ServerOffer): Offer => ({
  id: offer.id,
  title: offer.title,
  type: offer.type as OfferType,
  price: offer.price,
  previewImage: offer.previewImage,
  images: offer.images,
  rating: offer.rating,
  isFavorite: offer.isFavorite,
  isPremium: offer.isPremium,
  city: {
    name: offer.city.name,
  },
  location: offer.location,
  bedrooms: offer.bedrooms,
  maxAdults: offer.maxAdults,
  goods: offer.goods,
  description: offer.description,
  host: mapHostServerToHost(offer.host),
});

type ServerReview = {
  id: string;
  user: {
    name: string;
    avatarUrl: string;
  };
  rating: number;
  comment: string;
  date: string;
};

export const mapReviewServerToReview = (review: ServerReview): Review => ({
  id: review.id,
  user: {
    name: review.user.name,
    avatarUrl: review.user.avatarUrl,
  },
  rating: review.rating,
  comment: review.comment,
  date: review.date,
});

