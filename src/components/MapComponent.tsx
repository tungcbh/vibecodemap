import React, { useRef } from 'react';
import { useMap } from '../hooks/useMap';
import type { MapProvider } from '../types/map.types';
import 'ol/ol.css';

const MapComponent: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const { isMapReady, changeBaseLayer, currentProvider } = useMap(
    mapRef as React.RefObject<HTMLDivElement>
  );

  const handleLayerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    changeBaseLayer(event.target.value as MapProvider);
  };

  return (
    <div
      ref={mapRef}
      style={{ width: '100%', height: '100vh' }}
      className="map-container"
    >
      <div
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          zIndex: 1000,
          backgroundColor: 'white',
          padding: '10px',
          borderRadius: '4px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        }}
      >
        <label htmlFor="layer-select" style={{ marginRight: '8px' }}>
          Base Layer:
        </label>
        <select
          id="layer-select"
          value={currentProvider}
          onChange={handleLayerChange}
        >
          <option value="OSM">OpenStreetMap</option>
          <option value="STADIA_DARK">Stadia Dark</option>
          <option value="GOOGLE_HYBRID">Google Hybrid</option>
        </select>
      </div>
      {!isMapReady && <div>Loading Map...</div>}
    </div>
  );
};

export default MapComponent;
