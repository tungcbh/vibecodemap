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
