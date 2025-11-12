import { useState } from 'react';
import { ProfileDetailCard } from './ProfileDetailCard';
import type { Profile } from '../App';
import { Filter } from 'lucide-react';

interface ProfileListProps {
  profiles: Profile[];
}

export function ProfileList({ profiles }: ProfileListProps) {
  const [selectedGender, setSelectedGender] = useState<'all' | 'male' | 'female'>('all');

  const filteredProfiles = profiles.filter(profile => 
    selectedGender === 'all' || profile.gender === selectedGender
  );

  return (
    <div>
      {/* Header Section */}
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-gray-900 mb-2">Browse Profiles</h2>
        <p className="text-gray-600 text-sm sm:text-base">{filteredProfiles.length} profiles available</p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-5 mb-8 sm:mb-10 border border-purple-100">
        <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
          <div className="flex items-center gap-2 text-purple-600">
            <Filter className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-sm sm:text-base">Filter:</span>
          </div>
          <div className="flex gap-2 sm:gap-3">
            <button
              onClick={() => setSelectedGender('all')}
              className={`px-5 sm:px-8 py-2.5 sm:py-3 rounded-full transition-all text-sm sm:text-base ${
                selectedGender === 'all'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border-2 border-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedGender('female')}
              className={`px-5 sm:px-8 py-2.5 sm:py-3 rounded-full transition-all text-sm sm:text-base ${
                selectedGender === 'female'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border-2 border-gray-200'
              }`}
            >
              Women
            </button>
            <button
              onClick={() => setSelectedGender('male')}
              className={`px-5 sm:px-8 py-2.5 sm:py-3 rounded-full transition-all text-sm sm:text-base ${
                selectedGender === 'male'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border-2 border-gray-200'
              }`}
            >
              Men
            </button>
          </div>
        </div>
      </div>

      {filteredProfiles.length === 0 ? (
        <div className="text-center py-12 sm:py-16 bg-white/60 backdrop-blur-sm rounded-2xl">
          <p className="text-gray-500">No profiles found for this filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProfiles.map((profile) => (
            <ProfileDetailCard key={profile.id} profile={profile} />
          ))}
        </div>
      )}
    </div>
  );
}