import { useCallback } from 'react';
import Map from 'ol/Map';

export const useZoom = (map: Map | null) => {
  const zoomIn = useCallback(() => {
    if (!map) return;
    const view = map.getView();
    const zoom = view.getZoom();
    if (zoom !== undefined) {
      view.animate({ zoom: zoom + 1, duration: 250 });
    }
  }, [map]);

  const zoomOut = useCallback(() => {
    if (!map) return;
    const view = map.getView();
    const zoom = view.getZoom();
    if (zoom !== undefined) {
      view.animate({ zoom: zoom - 1, duration: 250 });
    }
  }, [map]);

  return { zoomIn, zoomOut };
};
