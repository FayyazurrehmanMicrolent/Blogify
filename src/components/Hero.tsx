import { Users, Sparkles, Heart } from 'lucide-react';

export function Hero() {
  return (
    <div className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 lg:py-24">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full mb-6 sm:mb-8 shadow-lg">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
            <span className="text-purple-900 text-sm sm:text-base">Discover Amazing People</span>
          </div>
          
          <h1 className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-4 sm:mb-6 px-4">
            Connect with Professionals
          </h1>
          
          <p className="text-gray-600 max-w-2xl mx-auto mb-8 sm:mb-12 px-4 text-sm sm:text-base">
            Browse through our diverse community of talented individuals. From models and fitness coaches to photographers and artists - find the perfect match for your needs.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 sm:p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h3 className="text-gray-900 mb-2">Diverse Profiles</h3>
              <p className="text-gray-600 text-sm">Connect with professionals from various fields</p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 sm:p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-pink-500 to-blue-500 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h3 className="text-gray-900 mb-2">Easy Contact</h3>
              <p className="text-gray-600 text-sm">Reach out directly via WhatsApp</p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 sm:p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h3 className="text-gray-900 mb-2">Verified Profiles</h3>
              <p className="text-gray-600 text-sm">All profiles are carefully curated</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}