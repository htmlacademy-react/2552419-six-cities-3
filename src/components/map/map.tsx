import { useEffect, useRef, FC } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Offer } from '../../types/offer';
import { DEFAULT_ICON, ACTIVE_ICON } from '../../constants';

type MapProps = {
  offers: Offer[];
  selectedOfferId?: string;
  className?: string;
}

const Map: FC<MapProps> = ({offers, selectedOfferId, className = ''}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current || offers.length === 0) {
      return;
    }

    const firstOffer: Offer = offers[0];
    const latitude = firstOffer.location.latitude;
    const longitude = firstOffer.location.longitude;
    const zoom = firstOffer.location.zoom;

    const map = L.map(mapRef.current, {
      center: [latitude, longitude],
      zoom,
      zoomControl: false,
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [offers]);

  useEffect(() => {
    if (!mapInstanceRef.current) {
      return;
    }

    const map = mapInstanceRef.current;

    markersRef.current.forEach((marker) => {
      map.removeLayer(marker);
    });
    markersRef.current = [];

    if (offers.length === 0) {
      return;
    }

    offers.forEach((offer: Offer) => {
      const latitude = offer.location.latitude;
      const longitude = offer.location.longitude;
      const isActive = offer.id === selectedOfferId;

      const marker = L.marker([latitude, longitude], {
        icon: isActive ? ACTIVE_ICON : DEFAULT_ICON,
      });

      marker.addTo(map);
      markersRef.current.push(marker);
    });

    const firstOffer: Offer = offers[0];
    const latitude = firstOffer.location.latitude;
    const longitude = firstOffer.location.longitude;
    const zoom = firstOffer.location.zoom;
    map.setView([latitude, longitude], zoom);
  }, [offers, selectedOfferId]);

  return <div ref={mapRef} className={`map ${className}`}></div>;
};

export default Map;
