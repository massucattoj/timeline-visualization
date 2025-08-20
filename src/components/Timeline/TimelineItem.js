import React, { useState, useRef, useEffect } from 'react';
import { Edit3, Check, X } from 'lucide-react';

const TimelineItem = ({ item, laneIndex, startDate, onNameChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(item.name);
  const inputRef = useRef(null);

  // Focus input when entering edit mode
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  // Update edit value when item name changes
  useEffect(() => {
    setEditValue(item.name);
  }, [item.name]);

  const handleStartEdit = () => {
    setIsEditing(true);
    setEditValue(item.name);
  };

  const handleSave = () => {
    if (editValue.trim() && editValue.trim() !== item.name) {
      onNameChange(item.id, editValue.trim());
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(item.name);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      handleCancel();
    }
  };

  const getGridPosition = () => {
    const itemStart = new Date(item.start);
    const itemEnd = new Date(item.end);
    const startOffset = Math.ceil((itemStart - startDate) / (1000 * 60 * 60 * 24));
    const duration = Math.ceil((itemEnd - itemStart) / (1000 * 60 * 60 * 24)) + 1;
    
    return {
      gridColumnStart: startOffset + 1,
      gridColumnEnd: startOffset + 1 + duration
    };
  };

  const colors = [
    'bg-blue-600 hover:bg-blue-700',
    'bg-green-600 hover:bg-green-700',
    'bg-red-600 hover:bg-red-700',
    'bg-yellow-600 hover:bg-yellow-700',
    'bg-purple-600 hover:bg-purple-700',
    'bg-cyan-600 hover:bg-cyan-700'
  ];

  const gridPos = getGridPosition();
  const colorClass = colors[laneIndex % colors.length];

  return (
    <div
      className={`${colorClass} rounded transition-all duration-150 shadow-sm border border-black/10 hover:transform hover:-translate-y-px hover:shadow-md flex items-center px-2 m-1 group relative ${isEditing ? 'ring-2 ring-white ring-opacity-50' : 'cursor-pointer'}`}
      style={{
        gridColumnStart: gridPos.gridColumnStart,
        gridColumnEnd: gridPos.gridColumnEnd,
        minWidth: '120px'
      }}
      title={isEditing ? undefined : `${item.name} (${item.start} to ${item.end})`}
    >
      {isEditing ? (
        // Edit mode
        <div className="flex items-center w-full gap-1">
          <input
            ref={inputRef}
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSave}
            className="flex-1 bg-white text-gray-800 text-xs font-medium px-2 py-1 rounded border-0 outline-none min-w-0"
            placeholder="Item name..."
          />
          <button
            onClick={handleSave}
            className="flex-shrink-0 w-5 h-5 flex items-center justify-center bg-green-500 hover:bg-green-600 rounded text-white transition-colors"
            title="Save (Enter)"
          >
            <Check className="w-3 h-3" />
          </button>
          <button
            onClick={handleCancel}
            className="flex-shrink-0 w-5 h-5 flex items-center justify-center bg-red-500 hover:bg-red-600 rounded text-white transition-colors"
            title="Cancel (Escape)"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ) : (
        // Display mode
        <div className="h-full flex items-center justify-between w-full overflow-hidden">
          <span className="text-white text-xs font-medium whitespace-nowrap overflow-hidden text-ellipsis leading-tight flex-1">
            {item.name}
          </span>
          <button
            onClick={handleStartEdit}
            className="flex-shrink-0 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 w-5 h-5 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded"
            title="Edit name"
          >
            <Edit3 className="w-3.5 h-3.5 text-white" />
          </button>
        </div>
      )}
    </div>
  );
};

export default TimelineItem;
