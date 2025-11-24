import { useCallback, useEffect, useRef, useState } from 'react';
import Map from 'ol/Map';
import MousePosition from 'ol/control/MousePosition';
import { createStringXY } from 'ol/coordinate';
import type MapBrowserEvent from 'ol/MapBrowserEvent';
import MapBrowserEventType from 'ol/MapBrowserEventType';

type PointerData = {
  coordinate: [number, number];
  pixel: [number, number];
};

export const useMousePosition = (map: Map | null) => {
  const controlRef = useRef<MousePosition | null>(null);
  const targetRef = useRef<HTMLDivElement | null>(null);
  const [pointerData, setPointerData] = useState<PointerData | null>(null);

  useEffect(() => {
    if (!map) return;

    const control = new MousePosition({
      coordinateFormat: createStringXY(4),
      projection: 'EPSG:4326',
      className: 'mouse-position-control',
    });

    controlRef.current = control;
    map.addControl(control);

    if (targetRef.current) {
      control.setTarget(targetRef.current);
    }

    return () => {
      map.removeControl(control);
      controlRef.current = null;
    };
  }, [map]);

  useEffect(() => {
    if (!map) return;

    const handlePointerMove = (event: MapBrowserEvent<PointerEvent>) => {
      if (event.dragging) return;
      if (!event.coordinate || !event.pixel) return;
      setPointerData({
        coordinate: event.coordinate as [number, number],
        pixel: event.pixel as [number, number],
      });
    };

    map.on(MapBrowserEventType.POINTERMOVE as unknown as 'pointermove', handlePointerMove as any);

    return () => {
      map.un(MapBrowserEventType.POINTERMOVE as unknown as 'pointermove', handlePointerMove as any);
    };
  }, [map]);

  const mousePositionRef = useCallback((node: HTMLDivElement | null) => {
    targetRef.current = node;
    if (node) {
      node.textContent = 'Move cursor over the map';
    }
    if (node && controlRef.current) {
      controlRef.current.setTarget(node);
    }
  }, []);

  return { mousePositionRef, pointerData };
};


