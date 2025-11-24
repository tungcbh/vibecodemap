import {
  Compass,
  Crosshair,
  Maximize2,
  RotateCcw,
  RotateCw,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';

type MapControlsProps = {
  zoomIn: () => void;
  zoomOut: () => void;
  rotateLeft: () => void;
  rotateRight: () => void;
  resetNorth: () => void;
  trackLocation: () => void;
  toggleFullScreen: () => void;
  disabled?: boolean;
};

const MapControls = ({
  zoomIn,
  zoomOut,
  rotateLeft,
  rotateRight,
  resetNorth,
  trackLocation,
  toggleFullScreen,
  disabled,
}: MapControlsProps) => {
  const sharedProps = {
    className: 'map-control-button',
    type: 'button' as const,
    disabled,
  };

  return (
    <div className="map-controls">
      <div className="map-control-group">
        <button {...sharedProps} aria-label="Zoom in" onClick={zoomIn}>
          <ZoomIn size={18} />
        </button>
        <button {...sharedProps} aria-label="Zoom out" onClick={zoomOut}>
          <ZoomOut size={18} />
        </button>
      </div>

      <div className="map-control-group">
        <button {...sharedProps} aria-label="Rotate left" onClick={rotateLeft}>
          <RotateCcw size={18} />
        </button>
        <button {...sharedProps} aria-label="Rotate right" onClick={rotateRight}>
          <RotateCw size={18} />
        </button>
        <button {...sharedProps} aria-label="Reset north" onClick={resetNorth}>
          <Compass size={18} />
        </button>
      </div>

      <div className="map-control-group">
        <button {...sharedProps} aria-label="Locate me" onClick={trackLocation}>
          <Crosshair size={18} />
        </button>
        <button
          {...sharedProps}
          aria-label="Toggle full screen"
          onClick={toggleFullScreen}
        >
          <Maximize2 size={18} />
        </button>
      </div>

    </div>
  );
};

export default MapControls;


