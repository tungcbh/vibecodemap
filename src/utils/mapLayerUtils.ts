import OSM from 'ol/source/OSM';
import XYZ from 'ol/source/XYZ';
import type { MapProvider } from '../types/map.types';

export const createBaseLayerSource = (provider: MapProvider) => {
  switch (provider) {
    case 'OSM':
      return new OSM();
    case 'STADIA_DARK':
      return new XYZ({
        url: 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}.png',
        attributions:
          '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      });
    case 'GOOGLE_SATELINE': 
      return new XYZ({
        url: 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',
        attributions: '&copy; Google Maps',
      });
    case 'GOOGLE_STREET':
      return new XYZ({
        url: 'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
        attributions: '&copy; Google Maps',
      });
    default:
      return new OSM();
  }
};
