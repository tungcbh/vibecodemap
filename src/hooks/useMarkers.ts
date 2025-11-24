import { useEffect, useRef, useCallback } from 'react';
import Map from 'ol/Map';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Icon, Style } from 'ol/style';
import { fromLonLat } from 'ol/proj';

export const useMarkers = (map: Map | null) => {
  const vectorSourceRef = useRef<VectorSource | null>(null);

  useEffect(() => {
    if (!map) return;

    const vectorSource = new VectorSource();
    vectorSourceRef.current = vectorSource;

    const vectorLayer = new VectorLayer({
      source: vectorSource,
      zIndex: 50,
    });

    map.addLayer(vectorLayer);

    return () => {
      map.removeLayer(vectorLayer);
    };
  }, [map]);

  const addMarker = useCallback((coordinate: [number, number], iconUrl?: string) => {
    if (!vectorSourceRef.current) return;

    const feature = new Feature({
      geometry: new Point(fromLonLat(coordinate)),
    });

    const style = new Style({
      image: new Icon({
        anchor: [0.5, 1],
        src: iconUrl || 'https://openlayers.org/en/latest/examples/data/icon.png', // Default icon
        scale: 0.8,
      }),
    });

    feature.setStyle(style);
    vectorSourceRef.current.addFeature(feature);
  }, []);

  const clearMarkers = useCallback(() => {
    if (vectorSourceRef.current) {
      vectorSourceRef.current.clear();
    }
  }, []);

  return { addMarker, clearMarkers };
};
