import { useEffect, useRef, useState, useCallback } from 'react';
import Map from 'ol/Map';
import Geolocation from 'ol/Geolocation';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';

export const useGeolocation = (map: Map | null) => {
  const geolocationRef = useRef<Geolocation | null>(null);
  const positionFeatureRef = useRef<Feature<Point> | null>(null);
  const [userPosition, setUserPosition] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (!map) return;

    const geolocation = new Geolocation({
      trackingOptions: {
        enableHighAccuracy: true,
      },
      projection: map.getView().getProjection(),
    });

    geolocationRef.current = geolocation;

    const positionFeature = new Feature<Point>();
    positionFeature.setStyle(
      new Style({
        image: new CircleStyle({
          radius: 6,
          fill: new Fill({
            color: '#3399CC',
          }),
          stroke: new Stroke({
            color: '#fff',
            width: 2,
          }),
        }),
      })
    );
    positionFeatureRef.current = positionFeature;

    const vectorLayer = new VectorLayer({
      source: new VectorSource({
        features: [positionFeature],
      }),
      zIndex: 100, // Ensure it's above base layers
    });

    map.addLayer(vectorLayer);

    geolocation.on('change:position', () => {
      const coordinates = geolocation.getPosition();
      if (coordinates) {
        positionFeature.setGeometry(new Point(coordinates));
        setUserPosition(coordinates as [number, number]);
      }
    });

    return () => {
      map.removeLayer(vectorLayer);
      geolocation.setTracking(false);
    };
  }, [map]);

  const trackLocation = useCallback(() => {
    if (!geolocationRef.current || !map) return;
    geolocationRef.current.setTracking(true);
    
    // If we already have a position, zoom to it
    const coordinates = geolocationRef.current.getPosition();
    if (coordinates) {
      map.getView().animate({
        center: coordinates,
        zoom: 16,
        duration: 1000
      });
    } else {
        // Wait for the first position update to zoom
        geolocationRef.current.once('change:position', () => {
             const coords = geolocationRef.current?.getPosition();
             if (coords) {
                 map.getView().animate({
                    center: coords,
                    zoom: 16,
                    duration: 1000
                  });
             }
        });
    }
  }, [map]);

  return { trackLocation, userPosition };
};
