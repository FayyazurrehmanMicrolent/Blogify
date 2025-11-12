'use client'

import { useState } from 'react'
import { X, Plus, Trash2, Image as ImageIcon } from 'lucide-react'
import type { Profile } from '@/app/lib/types'

interface ProfileFormProps {
  profile?: Profile
  onSubmit: (profile: Omit<Profile, 'id'>) => void
  onCancel: () => void
  isEditing: boolean
}

export function ProfileForm({ profile, onSubmit, onCancel, isEditing }: ProfileFormProps) {
  const [name, setName] = useState(profile?.name || '')
  const [age, setAge] = useState(profile?.age || '')
  const [gender, setGender] = useState<'male' | 'female'>(profile?.gender || 'female')
  const [description, setDescription] = useState(profile?.description || '')
  const [contactNumber, setContactNumber] = useState(profile?.contactNumber || '')
  const [location, setLocation] = useState(profile?.location || '')
  const [images, setImages] = useState<string[]>(profile?.images || [''])

  const handleAddImage = () => {
    if (images.length < 5) {
      setImages([...images, ''])
    }
  }

  const handleRemoveImage = (index: number) => {
    if (images.length > 1) {
      setImages(images.filter((_, i) => i !== index))
    }
  }

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...images]
    newImages[index] = value
    setImages(newImages)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const validImages = images.filter(img => img.trim() !== '')
    if (validImages.length === 0) {
      alert('Please add at least one image URL')
      return
    }
    onSubmit({
      name,
      age,
      gender,
      description,
      contactNumber,
      location,
      images: validImages
    })
  }

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-5 sm:p-6 md:p-8 border border-purple-100 max-h-[85vh] overflow-y-auto">
      <div className="flex justify-between items-center mb-5 sm:mb-6">
        <h3 className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          {isEditing ? 'Edit Profile' : 'Add New Profile'}
        </h3>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          <div>
            <label htmlFor="name" className="block text-gray-700 mb-2 text-sm sm:text-base">
              Name *
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 transition-colors text-sm sm:text-base"
              placeholder="Enter name"
              required
            />
          </div>

          <div>
            <label htmlFor="age" className="block text-gray-700 mb-2 text-sm sm:text-base">
              Age *
            </label>
            <input
              id="age"
              type="text"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 transition-colors text-sm sm:text-base"
              placeholder="Enter age"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 mb-2 text-sm sm:text-base">Gender *</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="female"
                checked={gender === 'female'}
                onChange={(e) => setGender(e.target.value as 'female')}
                className="w-4 h-4 text-pink-600 focus:ring-pink-500"
              />
              <span className="text-gray-700 text-sm sm:text-base">Female</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="male"
                checked={gender === 'male'}
                onChange={(e) => setGender(e.target.value as 'male')}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700 text-sm sm:text-base">Male</span>
            </label>
          </div>
        </div>

        <div>
          <label htmlFor="location" className="block text-gray-700 mb-2 text-sm sm:text-base">
            Location
          </label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 transition-colors text-sm sm:text-base"
            placeholder="City, Country"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-gray-700 mb-2 text-sm sm:text-base">
            Description *
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 transition-colors resize-none text-sm sm:text-base"
            placeholder="Enter description"
            rows={4}
            required
          />
        </div>

        <div>
          <label htmlFor="contactNumber" className="block text-gray-700 mb-2 text-sm sm:text-base">
            WhatsApp Number (with country code) *
          </label>
          <input
            id="contactNumber"
            type="tel"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 transition-colors text-sm sm:text-base"
            placeholder="+1234567890"
            required
          />
          <p className="text-gray-500 mt-2 text-xs sm:text-sm">Include country code (e.g., +1 for US)</p>
        </div>

        <div>
          <div className="flex justify-between items-center mb-3">
            <label className="block text-gray-700 text-sm sm:text-base">
              Images * (Add 4-5 photos)
            </label>
            {images.length < 5 && (
              <button
                type="button"
                onClick={handleAddImage}
                className="flex items-center gap-1.5 text-purple-600 hover:text-purple-700 transition-colors text-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add</span>
              </button>
            )}
          </div>

          <div className="space-y-3">
            {images.map((image, index) => (
              <div key={index} className="flex gap-2 sm:gap-3 items-start">
                <div className="flex-1">
                  <input
                    type="url"
                    value={image}
                    onChange={(e) => handleImageChange(index, e.target.value)}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 transition-colors text-sm sm:text-base"
                    placeholder={`Image URL ${index + 1}`}
                  />
                </div>
                {image && (
                  <img
                    src={image}
                    alt={`Preview ${index + 1}`}
                    className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg border-2 border-gray-200"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=Invalid'
                    }}
                  />
                )}
                {images.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="p-2 sm:p-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {images.filter(img => img.trim() !== '').length > 0 && (
            <div className="mt-4 p-3 sm:p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
              <p className="text-gray-700 mb-3 flex items-center gap-2 text-sm sm:text-base">
                <ImageIcon className="w-4 h-4" />
                Image Preview
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {images.filter(img => img.trim() !== '').map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Preview ${index + 1}`}
                    className="w-full aspect-square object-cover rounded-lg border-2 border-white shadow-md"
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3 sm:gap-4 pt-4">
          <button
            type="submit"
            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 sm:py-3.5 rounded-xl hover:shadow-lg active:scale-95 transition-all text-sm sm:text-base"
          >
            {isEditing ? 'Update' : 'Add Profile'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-100 text-gray-700 py-3 sm:py-3.5 rounded-xl hover:bg-gray-200 active:scale-95 transition-colors text-sm sm:text-base"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
