import React from 'react';
import TimelineItem from './TimelineItem';

const TimelineLane = ({ lane, laneIndex, totalDays, startDate, columnWidth, minWidth, onItemNameChange }) => {
  return (
    <div 
      className="grid h-12 mb-1 border-b border-gray-100 last:border-b-0 hover:bg-gray-50/50"
      style={{ 
        gridTemplateColumns: `repeat(${totalDays}, ${columnWidth}px)`,
        minWidth: `${minWidth}px` 
      }}
    >
      {lane.map((item) => (
        <TimelineItem
          key={item.id}
          item={item}
          laneIndex={laneIndex}
          startDate={startDate}
          onNameChange={onItemNameChange}
        />
      ))}
    </div>
  );
};

export default TimelineLane;
