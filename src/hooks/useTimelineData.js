import { useMemo, useState, useCallback } from 'react';
import assignLanes from '../assignLanes';

export const useTimelineData = (items, paddingDays = 2) => {
  const [zoomLevel, setZoomLevel] = useState(1); // 1 = default (50px), 0.5 = zoomed out (25px), 2 = zoomed in (100px)
  
  // Zoom controls
  const zoomIn = useCallback(() => {
    setZoomLevel(prev => Math.min(prev * 1.5, 4)); // Max 4x zoom
  }, []);
  
  const zoomOut = useCallback(() => {
    setZoomLevel(prev => Math.max(prev / 1.5, 0.25)); // Min 0.25x zoom
  }, []);
  
  const resetZoom = useCallback(() => {
    setZoomLevel(1);
  }, []);
  const timelineData = useMemo(() => {
    if (!items.length) {
      return { 
        startDate: new Date(), 
        endDate: new Date(), 
        totalDays: 0, 
        lanes: [] 
      };
    }
    
    // Calculate date range
    const dates = items.flatMap(item => [new Date(item.start), new Date(item.end)]);
    const dataStart = new Date(Math.min(...dates));
    const dataEnd = new Date(Math.max(...dates));
    
    const startDate = new Date(dataStart);
    startDate.setDate(startDate.getDate() - paddingDays);
    
    const endDate = new Date(dataEnd);
    endDate.setDate(endDate.getDate() + paddingDays);
    
    // Calculate total days
    const diffTime = Math.abs(endDate - startDate);
    const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    
    const lanes = assignLanes(items);
    
    return { startDate, endDate, totalDays, lanes };
  }, [items, paddingDays]);

  // Calculate dynamic column width based on zoom level
  const columnWidth = Math.round(50 * zoomLevel); // Base width 50px
  const minWidth = Math.max(1800, timelineData.totalDays * columnWidth);

  return {
    ...timelineData,
    zoomLevel,
    columnWidth,
    minWidth,
    zoomIn,
    zoomOut,
    resetZoom,
    canZoomIn: zoomLevel < 4,
    canZoomOut: zoomLevel > 0.25
  };
};


