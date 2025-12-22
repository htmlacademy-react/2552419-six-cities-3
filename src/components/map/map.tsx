import { useEffect, useRef, FC, useMemo } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Offer } from '../../types/offer';
import { MAP_ICON } from '../../constants';
import { getImageUrl } from '../../utils/image-url';

type MapProps = {
  offers: Offer[];
  selectedOfferId?: string;
  className?: string;
}

const Map: FC<MapProps> = ({offers, selectedOfferId, className = ''}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const offersRef = useRef<Offer[]>([]);

  const defaultIcon = useMemo(() => L.icon({
    iconUrl: getImageUrl('img/pin.svg'),
    iconSize: [MAP_ICON.WIDTH, MAP_ICON.HEIGHT],
    iconAnchor: [MAP_ICON.ANCHOR_X, MAP_ICON.ANCHOR_Y],
  }), []);

  const activeIcon = useMemo(() => L.icon({
    iconUrl: getImageUrl('img/pin-active.svg'),
    iconSize: [MAP_ICON.WIDTH, MAP_ICON.HEIGHT],
    iconAnchor: [MAP_ICON.ANCHOR_X, MAP_ICON.ANCHOR_Y],
  }), []);

  useEffect(() => {
    if (!mapRef.current || offers.length === 0) {
      return;
    }

    if (mapInstanceRef.current) {
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
        try {
          mapInstanceRef.current.remove();
        } catch (error) {
          // Ignore errors during cleanup
        }
        mapInstanceRef.current = null;
        markersRef.current = [];
        offersRef.current = [];
      }
    };
  }, [offers]);

  useEffect(() => {
    if (!mapInstanceRef.current || offers.length === 0) {
      return;
    }

    const map = mapInstanceRef.current;
    const offersChanged = offersRef.current.length !== offers.length ||
      offersRef.current.some((oldOffer, index) => oldOffer.id !== offers[index]?.id);

    if (offersChanged) {
      markersRef.current.forEach((marker) => {
        map.removeLayer(marker);
      });
      markersRef.current = [];
      offersRef.current = [...offers];

      offers.forEach((offer: Offer) => {
        const latitude = offer.location.latitude;
        const longitude = offer.location.longitude;
        const isActive = offer.id === selectedOfferId;

        const marker = L.marker([latitude, longitude], {
          icon: isActive ? activeIcon : defaultIcon,
        });

        marker.addTo(map);
        markersRef.current.push(marker);
      });

      const firstOffer: Offer = offers[0];
      const latitude = firstOffer.location.latitude;
      const longitude = firstOffer.location.longitude;
      const zoom = firstOffer.location.zoom;

      if (map.getContainer() && map.getContainer().parentElement) {
        try {
          map.setView([latitude, longitude], zoom, { animate: false });
        } catch (error) {
          // Map might not be fully initialized, use whenReady as fallback
          map.whenReady(() => {
            if (mapInstanceRef.current && mapInstanceRef.current.getContainer()) {
              try {
                mapInstanceRef.current.setView([latitude, longitude], zoom, { animate: false });
              } catch (e) {
                // Ignore errors if map is being destroyed
              }
            }
          });
        }
      }
    } else {
      offers.forEach((offer: Offer, index: number) => {
        const marker = markersRef.current[index];
        if (marker) {
          const isActive = offer.id === selectedOfferId;
          marker.setIcon(isActive ? activeIcon : defaultIcon);
        }
      });
    }
  }, [offers, selectedOfferId, activeIcon, defaultIcon]);

  return <div ref={mapRef} className={`map ${className}`}></div>;
};

export default Map;
