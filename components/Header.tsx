'use client'

import { Sparkles, LogOut, Shield } from 'lucide-react'

interface HeaderProps {
  isAdmin: boolean
  onAdminClick: () => void
  onLogout: () => void
}

export function Header({ isAdmin, onAdminClick, onLogout }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-purple-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 p-1.5 sm:p-2 rounded-lg sm:rounded-xl shadow-lg">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h1 className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                Blogify
              </h1>
              <p className="text-gray-500 hidden sm:block">Connect & Discover</p>
            </div>
          </div>
          <div>
            {!isAdmin ? (
              <button
                onClick={onAdminClick}
                className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full hover:shadow-lg hover:scale-105 transition-all text-sm sm:text-base"
              >
                <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Admin</span>
              </button>
            ) : (
              <button
                onClick={onLogout}
                className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-full hover:shadow-lg hover:scale-105 transition-all text-sm sm:text-base"
              >
                <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Logout</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
