import React from 'react';

const TimelineScale = ({ startDate, endDate, totalDays, columnWidth, minWidth }) => {
  const generateTimeMarkers = () => {
    const markers = [];
    const current = new Date(startDate);
    let dayIndex = 0;
    
    while (current <= endDate) {
      const options = { month: 'short', day: 'numeric' };
      const dateLabel = current.toLocaleDateString('en-US', options);
      const labelFrequency = totalDays > 120 ? 7 : totalDays > 60 ? 5 : totalDays > 30 ? 3 : 2;
      const showLabel = dayIndex % labelFrequency === 0;
      
      markers.push({
        date: new Date(current),
        label: showLabel ? dateLabel : '',
        fullDate: current.toISOString().split('T')[0]
      });
      
      current.setDate(current.getDate() + 1);
      dayIndex++;
    }
    
    return markers;
  };

  const timeMarkers = generateTimeMarkers();

  return (
    <div 
      className="grid h-14 bg-gray-50 border-b border-gray-200"
      style={{ 
        gridTemplateColumns: `repeat(${totalDays}, ${columnWidth}px)`,
        minWidth: `${minWidth}px` 
      }}
    >
      {timeMarkers.map((marker, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-start pt-1"
          title={marker.fullDate}
        >
          <div className="w-px h-5 bg-gray-300"></div>
          {marker.label && (
            <div className="text-xs text-gray-600 text-center mt-1 whitespace-nowrap font-medium leading-tight">
              {marker.label}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TimelineScale;
