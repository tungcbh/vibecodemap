import {
  useEffect,
  useRef,
  useState,
  type MutableRefObject,
  type RefObject,
} from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import { fromLonLat } from 'ol/proj';
import { MAP_CONFIG } from '../config/mapConfig';
import type { MapProvider } from '../types/map.types';
import { createBaseLayerSource } from '../utils/mapLayerUtils';

export const useMap = (
  containerRef: RefObject<HTMLDivElement> | MutableRefObject<HTMLDivElement | null>
) => {
  const mapRef = useRef<Map | null>(null);
  const baseLayerRef = useRef<TileLayer | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);
  const [currentProvider, setCurrentProvider] = useState<MapProvider>('OSM');
  const [mapInstance, setMapInstance] = useState<Map | null>(null);

  useEffect(() => {
    const target = containerRef.current;
    if (!target || mapRef.current) return;

    const baseLayer = new TileLayer({
      source: createBaseLayerSource('OSM'),
    });
    baseLayerRef.current = baseLayer;

    const map = new Map({
      target: target,
      layers: [baseLayer],
      view: new View({
        center: fromLonLat(MAP_CONFIG.DEFAULT_CENTER),
        zoom: MAP_CONFIG.DEFAULT_ZOOM,
        maxZoom: MAP_CONFIG.MAX_ZOOM,
        minZoom: MAP_CONFIG.MIN_ZOOM,
      }),
    });

    mapRef.current = map;
    setMapInstance(map);
    setIsMapReady(true);

    return () => {
      map.setTarget(undefined);
      mapRef.current = null;
      baseLayerRef.current = null;
      setMapInstance(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setCenter = (center: [number, number], zoom?: number) => {
    if (!mapRef.current) return;
    const view = mapRef.current.getView();
    view.animate({
      center: fromLonLat(center),
      zoom: zoom || view.getZoom(),
      duration: 1000,
    });
  };

  const changeBaseLayer = (provider: MapProvider) => {
    if (!baseLayerRef.current) return;
    const newSource = createBaseLayerSource(provider);
    baseLayerRef.current.setSource(newSource);
    setCurrentProvider(provider);
  };

  const getMap = () => mapRef.current;

  return { getMap, mapInstance, isMapReady, setCenter, changeBaseLayer, currentProvider };
};
