'use client'

import { useState, useEffect } from 'react'
import { AdminLogin } from '@/components/AdminLogin'
import { AdminDashboard } from '@/components/AdminDashboard'
import { Header } from '@/components/Header'
import type { Profile } from '@/lib/types'

export default function AdminPage() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [showAdminLogin, setShowAdminLogin] = useState(true)

  useEffect(() => {
    const savedProfiles = localStorage.getItem('blogify_profiles')
    if (savedProfiles) {
      setProfiles(JSON.parse(savedProfiles))
    }
  }, [])

  useEffect(() => {
    if (profiles.length > 0) {
      localStorage.setItem('blogify_profiles', JSON.stringify(profiles))
    }
  }, [profiles])

  const handleLogin = (username: string, password: string) => {
    if (username === 'admin' && password === 'admin123') {
      setIsAdmin(true)
      setShowAdminLogin(false)
      return true
    }
    return false
  }

  const handleLogout = () => {
    setIsAdmin(false)
    setShowAdminLogin(true)
  }

  const handleAddProfile = (profile: Omit<Profile, 'id'>) => {
    const newProfile: Profile = {
      ...profile,
      id: Date.now().toString()
    }
    setProfiles([...profiles, newProfile])
  }

  const handleEditProfile = (id: string, updatedProfile: Omit<Profile, 'id'>) => {
    setProfiles(profiles.map(profile => 
      profile.id === id ? { ...updatedProfile, id } : profile
    ))
  }

  const handleDeleteProfile = (id: string) => {
    setProfiles(profiles.filter(profile => profile.id !== id))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Header 
        isAdmin={isAdmin}
        onAdminClick={() => setShowAdminLogin(true)}
        onLogout={handleLogout}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {isAdmin ? (
          <AdminDashboard
            profiles={profiles}
            onAddProfile={handleAddProfile}
            onEditProfile={handleEditProfile}
            onDeleteProfile={handleDeleteProfile}
          />
        ) : (
          showAdminLogin && (
            <AdminLogin
              onLogin={handleLogin}
              onClose={() => window.location.href = '/'}
            />
          )
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-purple-900 via-pink-900 to-blue-900 text-white py-6 sm:py-8 mt-12 sm:mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-purple-200 text-sm sm:text-base">© 2025 Blogify. Connect, Discover, Grow.</p>
        </div>
      </footer>
    </div>
  )
}
