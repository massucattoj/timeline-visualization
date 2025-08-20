import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useTimelineData } from '../../hooks';
import TimelineHeader from './TimelineHeader';
import TimelineScale from './TimelineScale';
import TimelineLane from './TimelineLane';
import ZoomControls from './ZoomControls';

const Timeline = ({ items: initialItems }) => {
  const [items, setItems] = useState(initialItems);

  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  // Handle item name updates
  const handleItemNameChange = useCallback((itemId, newName) => {
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === itemId 
          ? { ...item, name: newName }
          : item
      )
    );
  }, []);
  
  const { 
    startDate, 
    endDate, 
    totalDays, 
    lanes, 
    columnWidth, 
    minWidth,
    zoomIn, 
    zoomOut, 
    resetZoom, 
    canZoomIn, 
    canZoomOut, 
    zoomLevel 
  } = useTimelineData(items);
  
  const scrollContainerRef = useRef(null);

  // Add mouse wheel zoom functionality
  useEffect(() => {
    const handleWheel = (e) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        if (e.deltaY < 0) {
          zoomIn();
        } else {
          zoomOut();
        }
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      return () => container.removeEventListener('wheel', handleWheel);
    }
  }, [zoomIn, zoomOut]);

  return (
    <div className="space-y-4">
      <div className="bg-white border border-gray-200 rounded shadow-sm overflow-hidden">
        <TimelineHeader startDate={startDate} endDate={endDate} />
        
        <div 
          ref={scrollContainerRef}
          className="overflow-x-auto overflow-y-visible"
        >
          <TimelineScale 
            startDate={startDate} 
            endDate={endDate} 
            totalDays={totalDays}
            columnWidth={columnWidth}
            minWidth={minWidth}
          />

          <div className="py-4" style={{ minHeight: '200px' }}>
            {lanes.map((lane, laneIndex) => (
              <TimelineLane
                key={laneIndex}
                lane={lane}
                laneIndex={laneIndex}
                totalDays={totalDays}
                startDate={startDate}
                columnWidth={columnWidth}
                minWidth={minWidth}
                onItemNameChange={handleItemNameChange}
              />
            ))}
          </div>
        </div>
      </div>

      
      <div className="flex justify-end">
        <ZoomControls
          zoomIn={zoomIn}
          zoomOut={zoomOut}
          resetZoom={resetZoom}
          canZoomIn={canZoomIn}
          canZoomOut={canZoomOut}
          zoomLevel={zoomLevel}
        />
      </div>

    </div>
  );
};

export default Timeline;
