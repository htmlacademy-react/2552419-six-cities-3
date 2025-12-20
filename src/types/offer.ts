export type City = {
  name: string;
  isActive?: boolean;
}

export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
}

export type Offer = {
  id: string;
  title: string;
  type: string;
  price: number;
  previewImage: string;
  rating: number;
  isFavorite?: boolean;
  city: City;
  location: Location;
}

export type User = {
  email: string;
  avatarUrl?: string;
  favoriteCount?: number;
}

