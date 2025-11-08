'use client';

import { useState } from 'react';
import VotingDeck from '@/components/VotingDeck';
import { LocationWithVotes } from '@/types/location';

// Mock data for testing
const mockLocations: LocationWithVotes[] = [
  {
    id: '1',
    name: 'Tokyo Tower',
    address: '4 Chome-2-8 Shibakoen, Minato City, Tokyo, Japan',
    place_id: 'ChIJ_0f3aWOLGGARASYJGvSKFYQ',
    photo_url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&auto=format&fit=crop',
    created_at: new Date().toISOString(),
    created_by: 'user1',
    created_by_name: 'Test User',
    yesCount: 5,
    noCount: 2,
  },
  {
    id: '2',
    name: 'Kyoto Fushimi Inari Shrine',
    address: '68 Fukakusa Yabunouchichō, Fushimi Ward, Kyoto, Japan',
    place_id: 'ChIJm7b4ImmNAWARoHsXqPLJdJI',
    photo_url: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&auto=format&fit=crop',
    created_at: new Date().toISOString(),
    created_by: 'user1',
    created_by_name: 'Test User',
    yesCount: 8,
    noCount: 1,
  },
  {
    id: '3',
    name: 'Mount Fuji',
    address: 'Kitayama, Fujinomiya, Shizuoka, Japan',
    place_id: 'ChIJ4YPzqcCXGGARKRtCfr_T7tw',
    photo_url: 'https://images.unsplash.com/photo-1578469550956-0e16b69c6a3d?w=800&auto=format&fit=crop',
    created_at: new Date().toISOString(),
    created_by: 'user2',
    created_by_name: 'Another User',
    yesCount: 10,
    noCount: 0,
  },
  {
    id: '4',
    name: 'Osaka Castle',
    address: '1-1 Ōsakajō, Chūō-ku, Osaka, Japan',
    place_id: 'ChIJW4JYmC_kAGARgKFPP6_EAAY',
    created_at: new Date().toISOString(),
    created_by: 'user1',
    created_by_name: 'Test User',
    yesCount: 3,
    noCount: 4,
  },
];

export default function SwipeDemoPage() {
  const [votes, setVotes] = useState<Record<string, 'yes' | 'no'>>({});
  const [locations] = useState(mockLocations);

  const handleVote = async (locationId: string, vote: 'yes' | 'no') => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    
    setVotes(prev => ({
      ...prev,
      [locationId]: vote,
    }));

    console.log(`Voted ${vote} on location ${locationId}`);
  };

  // Filter out already voted locations
  const unvotedLocations = locations.filter(loc => !votes[loc.id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🗺️ Vacation Vote Demo
          </h1>
          <p className="text-gray-600">
            Swipe right to like, left to pass. Or use the buttons!
          </p>
        </div>

        {/* Voting Deck */}
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <VotingDeck
              locations={unvotedLocations}
              onVote={handleVote}
            />
          </div>
        </div>

        {/* Results */}
        {Object.keys(votes).length > 0 && (
          <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Your Votes
            </h2>
            <div className="space-y-2">
              {Object.entries(votes).map(([locationId, vote]) => {
                const location = locations.find(l => l.id === locationId);
                return (
                  <div
                    key={locationId}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <span className="font-medium text-gray-900">
                      {location?.name}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        vote === 'yes'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {vote === 'yes' ? '👍 Yes' : '👎 No'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}