'use client';

import { useState } from "react";
import { LocationWithVotes } from "@/types/location";

interface SwipeCardProps {
  location: LocationWithVotes;
  onSwipe: (direction: 'yes' | 'no') => void;
}

const SwipeCard = ({ location, onSwipe }: SwipeCardProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const offsetX = e.clientX - startPos.x;
    const offsetY = e.clientY - startPos.y;
    setDragOffset({ x: offsetX, y: offsetY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    
    if (Math.abs(dragOffset.x) > 100) {
      onSwipe(dragOffset.x > 0 ? 'yes' : 'no');
    }
    
    setDragOffset({ x: 0, y: 0 });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartPos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const offsetX = e.touches[0].clientX - startPos.x;
    const offsetY = e.touches[0].clientY - startPos.y;
    setDragOffset({ x: offsetX, y: offsetY });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    
    if (Math.abs(dragOffset.x) > 100) {
      onSwipe(dragOffset.x > 0 ? 'yes' : 'no');
    }
    
    setDragOffset({ x: 0, y: 0 });
  };

  const rotation = dragOffset.x * 0.1;
  const opacity = 1 - Math.abs(dragOffset.x) / 300;

  return (
    <div
      className="absolute w-full h-full cursor-grab active:cursor-grabbing select-none"
      style={{
        transform: `translate(${dragOffset.x}px, ${dragOffset.y}px) rotate(${rotation}deg)`,
        transition: isDragging ? 'none' : 'transform 0.3s ease-out, opacity 0.3s ease-out',
        opacity: isDragging ? opacity : 1,
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Card Container */}
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden h-full flex flex-col">
        
        {/* Image Section */}
        <div className="relative h-2/3 w-full overflow-hidden bg-gradient-to-br from-blue-400 to-purple-500">
          {location.photo_url ? (
            <img
              src={location.photo_url}
              alt={location.name}
              className="w-full h-full object-cover"
              draggable={false}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white text-6xl">
              📍
            </div>
          )}
          
          {/* Swipe indicators */}
          {isDragging && (
            <>
              <div
                className="absolute top-8 right-8 text-6xl font-bold text-red-500 rotate-12"
                style={{ 
                  opacity: dragOffset.x < -50 ? Math.min(Math.abs(dragOffset.x) / 150, 1) : 0 
                }}
              >
                NOPE
              </div>
              <div
                className="absolute top-8 left-8 text-6xl font-bold text-green-500 -rotate-12"
                style={{ 
                  opacity: dragOffset.x > 50 ? Math.min(dragOffset.x / 150, 1) : 0 
                }}
              >
                LIKE
              </div>
            </>
          )}
        </div>

        {/* Content Section */}
        <div className="h-1/3 p-6 space-y-3 bg-white">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h3 className="text-2xl font-bold truncate text-gray-900">
                {location.name}
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                <span className="text-xl">📍</span>
                <span className="truncate">{location.address}</span>
              </div>
            </div>
          </div>

          {/* Vote counts */}
          {(location.yesCount !== undefined || location.noCount !== undefined) && (
            <div className="flex items-center gap-4 text-sm">
              <span className="text-green-600 font-medium">
                👍 {location.yesCount || 0} Yes
              </span>
              <span className="text-red-600 font-medium">
                👎 {location.noCount || 0} No
              </span>
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-6 pointer-events-none">
          <button
            className="pointer-events-auto h-16 w-16 rounded-full bg-white border-4 border-red-500 flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
            onClick={(e) => {
              e.stopPropagation();
              onSwipe('no');
            }}
          >
            <span className="text-3xl">✕</span>
          </button>
          <button
            className="pointer-events-auto h-16 w-16 rounded-full bg-white border-4 border-green-500 flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
            onClick={(e) => {
              e.stopPropagation();
              onSwipe('yes');
            }}
          >
            <span className="text-3xl">♥</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SwipeCard;