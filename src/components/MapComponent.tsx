import React, { useRef } from 'react';
import { useMap } from '../hooks/useMap';
import 'ol/ol.css';

const MapComponent: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const { isMapReady } = useMap(mapRef as React.RefObject<HTMLDivElement>);

  return (
    <div
      ref={mapRef}
      style={{ width: '100%', height: '100vh' }}
      className="map-container"
    >
      {!isMapReady && <div>Loading Map...</div>}
    </div>
  );
};

export default MapComponent;
