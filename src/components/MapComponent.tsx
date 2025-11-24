import { useEffect, useMemo, useRef, useState } from 'react';
import 'ol/ol.css';
import { toLonLat } from 'ol/proj';

import MapControls from './MapControls';
import { useMap } from '../hooks/useMap';
import { useZoom } from '../hooks/useZoom';
import { useRotation } from '../hooks/useRotation';
import { useGeolocation } from '../hooks/useGeolocation';
import { useMarkers } from '../hooks/useMarkers';
import { useFullScreen } from '../hooks/useFullScreen';
import { useMousePosition } from '../hooks/useMousePosition';
import { useGoogleGeocode } from '../hooks/useGoogleGeocode';
import { MAP_CONFIG } from '../config/mapConfig';
import type { MapProvider } from '../types/map.types';

const MapComponent = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const { isMapReady, changeBaseLayer, currentProvider, mapInstance, setCenter } =
    useMap(mapRef);

  const [searchQuery, setSearchQuery] = useState('');

  const { zoomIn, zoomOut } = useZoom(mapInstance);
  const { rotateLeft, rotateRight, resetNorth } = useRotation(mapInstance);
  const { trackLocation, userPosition } = useGeolocation(mapInstance);
  const { addMarker } = useMarkers(mapInstance);
  const { toggleFullScreen } = useFullScreen();
  const { mousePositionRef, pointerData } = useMousePosition(mapInstance);
  const {
    fetchCoordinatesByAddress,
    loading: isSearching,
    error: searchError,
    result: geocodeResult,
  } = useGoogleGeocode();

  useEffect(() => {
    if (!mapInstance) return;
    addMarker(MAP_CONFIG.DEFAULT_CENTER);
  }, [mapInstance, addMarker]);

  const handleLayerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    changeBaseLayer(event.target.value as MapProvider);
  };

  const handleSearchSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;

    const result = await fetchCoordinatesByAddress(query);
    if (result) {
      const coords: [number, number] = [result.coordinates.lng, result.coordinates.lat];
      setCenter(coords, 15);
      addMarker(coords);
    }
  };

  const readableUserPosition = useMemo(() => {
    if (!userPosition) return null;
    const [lon, lat] = toLonLat(userPosition);
    return { lat: lat.toFixed(4), lon: lon.toFixed(4) };
  }, [userPosition]);

  const floatingMousePosition = useMemo(() => {
    if (!pointerData) return null;
    const [lon, lat] = toLonLat(pointerData.coordinate);
    return {
      lat: lat.toFixed(4),
      lon: lon.toFixed(4),
      pixel: pointerData.pixel,
    };
  }, [pointerData]);

  return (
    <div className="map-wrapper">
      <div ref={mapRef} className="map-container" />

      <div className="map-overlay-panel layer-switcher">
        <label htmlFor="layer-select">Base Layer</label>
        <select
          id="layer-select"
          value={currentProvider}
          onChange={handleLayerChange}
        >
          <option value="OSM">OpenStreetMap</option>
          <option value="STADIA_DARK">Stadia Dark</option>
          <option value="GOOGLE_SATELINE">Google Sateline</option>
          <option value="GOOGLE_STREET">Google Street</option>
        </select>
      </div>

      <div className="map-overlay-panel search-panel">
        <form className="search-form" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            className="search-input"
            placeholder="Search a place..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
          <button className="search-button" type="submit" disabled={isSearching}>
            {isSearching ? 'Searching...' : 'Search'}
          </button>
        </form>
        {searchError && <p className="search-status error">{searchError}</p>}
        {!searchError && geocodeResult && (
          <p className="search-status success">{geocodeResult.address}</p>
        )}
      </div>

      <MapControls
        zoomIn={zoomIn}
        zoomOut={zoomOut}
        rotateLeft={rotateLeft}
        rotateRight={rotateRight}
        resetNorth={resetNorth}
        trackLocation={trackLocation}
        toggleFullScreen={toggleFullScreen}
        disabled={!isMapReady}
      />

      {/* <div className="map-overlay-panel mouse-position-panel">
        <div className="mouse-position-row">
          <span className="mouse-position-label">Mouse</span>
          <span className="mouse-position-value" ref={mousePositionRef}>
            Move cursor over the map
          </span>
        </div>
      </div> */}

      {readableUserPosition && (
        <div className="map-overlay-panel user-position-panel">
          <span>Lat: {readableUserPosition.lat}</span>
          <span>Lon: {readableUserPosition.lon}</span>
        </div>
      )}

      {floatingMousePosition && (
        <div className="map-overlay-panel mouse-position-panel">
          <span>Mouse Position</span>
          <span>Lat: {floatingMousePosition.lat}</span>
          <span>Lon: {floatingMousePosition.lon}</span>
        </div>
      )}

      {!isMapReady && <div className="map-loading-overlay">Loading map...</div>}
    </div>
  );
};

export default MapComponent;
