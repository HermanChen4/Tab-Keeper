'use client';

import { useState } from 'react';
import SwipeCard from './SwipeCard';
import { LocationWithVotes } from '@/types/location';

interface VotingDeckProps {
  locations: LocationWithVotes[];
  onVote: (locationId: string, vote: 'yes' | 'no') => Promise<void>;
}

const VotingDeck = ({ locations, onVote }: VotingDeckProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVoting, setIsVoting] = useState(false);

  const handleSwipe = async (direction: 'yes' | 'no') => {
    if (isVoting || currentIndex >= locations.length) return;
    
    setIsVoting(true);
    const currentLocation = locations[currentIndex];
    
    try {
      await onVote(currentLocation.id, direction);
      // Move to next card
      setCurrentIndex(prev => prev + 1);
    } catch (error) {
      console.error('Error voting:', error);
    } finally {
      setIsVoting(false);
    }
  };

  if (locations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          No locations to vote on yet!
        </h2>
        <p className="text-gray-600">
          Add some vacation destinations to get started.
        </p>
      </div>
    );
  }

  if (currentIndex >= locations.length) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <div className="text-6xl mb-4">✅</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          All done!
        </h2>
        <p className="text-gray-600">
          You've voted on all locations. Check the results page to see the winners!
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full max-w-md mx-auto">
      {/* Progress indicator */}
      <div className="absolute top-4 left-0 right-0 flex justify-center gap-1 z-10">
        {locations.map((_, index) => (
          <div
            key={index}
            className={`h-1 flex-1 rounded-full transition-colors ${
              index < currentIndex
                ? 'bg-green-500'
                : index === currentIndex
                ? 'bg-blue-500'
                : 'bg-gray-300'
            }`}
            style={{ maxWidth: '40px' }}
          />
        ))}
      </div>

      {/* Card deck - show current and next card */}
      <div className="relative w-full h-[600px] mt-12">
        {locations
          .slice(currentIndex, currentIndex + 2)
          .reverse()
          .map((location, index) => (
            <div
              key={location.id}
              className="absolute inset-0"
              style={{
                zIndex: index === 1 ? 10 : 5,
                transform: index === 0 ? 'scale(0.95) translateY(20px)' : 'scale(1)',
                opacity: index === 0 ? 0.5 : 1,
              }}
            >
              {index === 1 && (
                <SwipeCard
                  location={location}
                  onSwipe={handleSwipe}
                />
              )}
              {index === 0 && (
                <div className="w-full h-full bg-white rounded-2xl shadow-xl" />
              )}
            </div>
          ))}
      </div>

      {/* Counter */}
      <div className="text-center mt-4 text-gray-600">
        {currentIndex + 1} / {locations.length}
      </div>
    </div>
  );
};

export default VotingDeck;