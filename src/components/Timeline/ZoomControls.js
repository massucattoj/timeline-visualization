import React from 'react';
import { ZoomOut, ZoomIn, RotateCcw } from 'lucide-react';

const ZoomControls = ({ 
  zoomIn, 
  zoomOut, 
  resetZoom, 
  canZoomIn, 
  canZoomOut, 
  zoomLevel 
}) => {
  const getZoomPercentage = () => {
    return Math.round(zoomLevel * 100);
  };

  return (
    <div className="flex items-center gap-2 bg-white border border-gray-200 rounded shadow-sm px-3 py-2">
      <button
        onClick={zoomOut}
        disabled={!canZoomOut}
        className="flex items-center justify-center w-8 h-8 rounded border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        title="Zoom Out"
      >
        <ZoomOut className="w-4 h-4" />
      </button>

      <button
        onClick={resetZoom}
        className="flex items-center justify-center gap-1 px-2 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded transition-colors min-w-16"
        title="Reset Zoom to 100%"
      >
        <RotateCcw className="w-3 h-3" />
        {getZoomPercentage()}%
      </button>

      <button
        onClick={zoomIn}
        disabled={!canZoomIn}
        className="flex items-center justify-center w-8 h-8 rounded border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        title="Zoom In"
      >
        <ZoomIn className="w-4 h-4" />
      </button>
    </div>
  );
};

export default ZoomControls;
