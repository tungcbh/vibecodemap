import { useCallback } from 'react';
import Map from 'ol/Map';

export const useRotation = (map: Map | null) => {
  const rotateLeft = useCallback(() => {
    if (!map) return;
    const view = map.getView();
    const rotation = view.getRotation();
    view.animate({ rotation: rotation + Math.PI / 4, duration: 250 });
  }, [map]);

  const rotateRight = useCallback(() => {
    if (!map) return;
    const view = map.getView();
    const rotation = view.getRotation();
    view.animate({ rotation: rotation - Math.PI / 4, duration: 250 });
  }, [map]);

  const resetNorth = useCallback(() => {
    if (!map) return;
    const view = map.getView();
    view.animate({ rotation: 0, duration: 500 });
  }, [map]);

  return { rotateLeft, rotateRight, resetNorth };
};
