export interface Coordinates {
  lat: number;
  lng: number;
}

export interface MapOptions {
  center: [number, number];
  zoom: number;
}

export interface GeocodeResult {
  address: string;
  coordinates: Coordinates;
}

export type MapProvider = 'OSM' | 'STADIA_DARK' | 'GOOGLE_SATELINE' | 'GOOGLE_STREET';
