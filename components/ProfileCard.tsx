'use client'

import { useState } from 'react'
import { Edit2, Trash2, MessageCircle, ChevronLeft, ChevronRight, MapPin, User } from 'lucide-react'
import type { Profile } from '@/app/lib/types'

interface ProfileCardProps {
  profile: Profile
  onEdit: () => void
  onDelete: () => void
}

export function ProfileCard({ profile, onEdit, onDelete }: ProfileCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handleWhatsAppClick = (contactNumber: string) => {
    const cleanNumber = contactNumber.replace(/\D/g, '')
    window.open(`https://wa.me/${cleanNumber}`, '_blank')
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === profile.images.length - 1 ? 0 : prev + 1
    )
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? profile.images.length - 1 : prev - 1
    )
  }

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all group">
      {/* Image Gallery */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100">
        <img
          src={profile.images[currentImageIndex]}
          alt={`${profile.name} - Image ${currentImageIndex + 1}`}
          className="w-full h-full object-cover"
        />
        
        {/* Gender Badge */}
        <div className={`absolute top-3 sm:top-4 right-3 sm:right-4 px-2.5 sm:px-3 py-1 rounded-full text-white backdrop-blur-sm shadow-lg text-xs sm:text-sm ${
          profile.gender === 'female' ? 'bg-pink-500/90' : 'bg-blue-500/90'
        }`}>
          {profile.gender === 'female' ? 'Female' : 'Male'}
        </div>

        {/* Navigation Arrows */}
        {profile.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-1.5 sm:p-2 rounded-full shadow-lg hover:bg-white transition-all active:scale-95"
            >
              <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-800" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-1.5 sm:p-2 rounded-full shadow-lg hover:bg-white transition-all active:scale-95"
            >
              <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-800" />
            </button>
          </>
        )}

        {/* Image Dots */}
        {profile.images.length > 1 && (
          <div className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 flex gap-1 sm:gap-1.5">
            {profile.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full transition-all ${
                  index === currentImageIndex ? 'bg-white w-4 sm:w-6' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Profile Info */}
      <div className="p-4 sm:p-5">
        <div className="mb-2 sm:mb-3">
          <h3 className="text-gray-900 mb-1">{profile.name}</h3>
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <User className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>Age: {profile.age}</span>
          </div>
        </div>

        {profile.location && (
          <div className="flex items-center gap-2 text-gray-600 mb-2 sm:mb-3 text-sm">
            <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-purple-500" />
            <span>{profile.location}</span>
          </div>
        )}

        <p className="text-gray-600 mb-3 line-clamp-2 text-sm">{profile.description}</p>
        <p className="text-gray-500 mb-3 sm:mb-4 text-xs sm:text-sm">
          {profile.contactNumber}
        </p>
        
        <div className="flex gap-2">
          <button
            onClick={() => handleWhatsAppClick(profile.contactNumber)}
            className="flex-1 flex items-center justify-center gap-1.5 bg-gradient-to-r from-green-500 to-green-600 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl hover:shadow-lg active:scale-95 transition-all text-xs sm:text-sm"
          >
            <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">WhatsApp</span>
            <span className="sm:hidden">Chat</span>
          </button>
          <button
            onClick={onEdit}
            className="flex items-center justify-center gap-1.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl hover:shadow-lg active:scale-95 transition-all"
          >
            <Edit2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
          <button
            onClick={onDelete}
            className="flex items-center justify-center gap-1.5 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl hover:shadow-lg active:scale-95 transition-all"
          >
            <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
