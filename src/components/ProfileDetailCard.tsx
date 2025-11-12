import { useState } from 'react';
import { MessageCircle, MapPin, ChevronLeft, ChevronRight, User } from 'lucide-react';
import type { Profile } from '../App';

interface ProfileDetailCardProps {
  profile: Profile;
}

export function ProfileDetailCard({ profile }: ProfileDetailCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleWhatsAppClick = (contactNumber: string) => {
    const cleanNumber = contactNumber.replace(/\D/g, '');
    window.open(`https://wa.me/${cleanNumber}`, '_blank');
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === profile.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? profile.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-1 group">
      {/* Image Gallery */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100">
        <img
          src={profile.images[currentImageIndex]}
          alt={`${profile.name} - Image ${currentImageIndex + 1}`}
          className="w-full h-full object-cover"
        />
        
        {/* Gender Badge */}
        <div className={`absolute top-3 sm:top-4 right-3 sm:right-4 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full backdrop-blur-sm shadow-lg text-sm sm:text-base ${
          profile.gender === 'female' 
            ? 'bg-pink-500/90 text-white' 
            : 'bg-blue-500/90 text-white'
        }`}>
          <span>{profile.gender === 'female' ? 'Female' : 'Male'}</span>
        </div>

        {/* Navigation Arrows */}
        {profile.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 sm:p-2.5 rounded-full shadow-lg hover:bg-white transition-all active:scale-95"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-800" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 sm:p-2.5 rounded-full shadow-lg hover:bg-white transition-all active:scale-95"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-800" />
            </button>
          </>
        )}

        {/* Image Dots */}
        {profile.images.length > 1 && (
          <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2">
            {profile.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all ${
                  index === currentImageIndex 
                    ? 'bg-white w-6 sm:w-8' 
                    : 'bg-white/50 hover:bg-white/75'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Profile Info */}
      <div className="p-4 sm:p-6">
        <div className="flex items-start justify-between mb-2 sm:mb-3">
          <div>
            <h3 className="text-gray-900 mb-1">{profile.name}</h3>
            <div className="flex items-center gap-2 text-gray-500 text-sm sm:text-base">
              <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Age: {profile.age}</span>
            </div>
          </div>
        </div>

        {profile.location && (
          <div className="flex items-center gap-2 text-gray-600 mb-2 sm:mb-3 text-sm sm:text-base">
            <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-500" />
            <span>{profile.location}</span>
          </div>
        )}

        <p className="text-gray-600 mb-4 line-clamp-3 text-sm sm:text-base">{profile.description}</p>

        {/* WhatsApp Button */}
        <button
          onClick={() => handleWhatsAppClick(profile.contactNumber)}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 sm:py-3.5 rounded-full hover:shadow-lg active:scale-95 transition-all text-sm sm:text-base"
        >
          <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>Connect on WhatsApp</span>
        </button>
      </div>
    </div>
  );
}