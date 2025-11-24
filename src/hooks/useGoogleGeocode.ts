import { useState } from 'react';
import type { GeocodeResult } from '../types/map.types';

export const useGoogleGeocode = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<GeocodeResult | null>(null);

  const fetchCoordinatesByAddress = async (address: string) => {
    const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
    if (!apiKey) {
      setError('Google API Key is missing');
      console.error('Google API Key is missing');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}&key=${apiKey}`
      );
      const data = await response.json();

      if (data.status === 'OK' && data.results.length > 0) {
        const location = data.results[0].geometry.location;
        const geocodeResult: GeocodeResult = {
          address: data.results[0].formatted_address,
          coordinates: {
            lat: location.lat,
            lng: location.lng,
          },
        };
        setResult(geocodeResult);
        return geocodeResult;
      } else {
        setError(data.error_message || 'No results found');
      }
    } catch (err) {
      setError('Failed to fetch geocoding data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { fetchCoordinatesByAddress, loading, error, result };
};
