import React from 'react';

const TimelineHeader = ({ startDate, endDate }) => {
  const getYearRange = () => {
    const startYear = startDate.getFullYear();
    const endYear = endDate.getFullYear();
    return startYear === endYear ? startYear.toString() : `${startYear} - ${endYear}`;
  };

  return (
    <div className="bg-gray-50 border-b border-gray-200 px-5 py-3 text-center">
      <h3 className="text-base font-semibold text-gray-800 m-0">
        {getYearRange()}
      </h3>
    </div>
  );
};

export default TimelineHeader;
