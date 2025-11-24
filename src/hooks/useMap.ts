import { useEffect, useRef, useState } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import { MAP_CONFIG } from '../config/mapConfig';

export const useMap = (containerRef: React.RefObject<HTMLDivElement>) => {
  const mapRef = useRef<Map | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);

  useEffect(() => {
    const target = containerRef.current;
    if (!target || mapRef.current) return;

    const map = new Map({
      target: target,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat(MAP_CONFIG.DEFAULT_CENTER),
        zoom: MAP_CONFIG.DEFAULT_ZOOM,
        maxZoom: MAP_CONFIG.MAX_ZOOM,
        minZoom: MAP_CONFIG.MIN_ZOOM,
      }),
    });

    mapRef.current = map;
    setIsMapReady(true);

    return () => {
      map.setTarget(undefined);
      mapRef.current = null;
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

  const getMap = () => mapRef.current;

  return { getMap, isMapReady, setCenter };
};
