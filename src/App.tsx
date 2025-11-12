import { useState, useEffect } from 'react';
import { ProfileList } from './components/ProfileList';
import { AdminLogin } from './components/AdminLogin';
import { AdminDashboard } from './components/AdminDashboard';
import { Header } from './components/Header';
import { Hero } from './components/Hero';

export interface Profile {
  id: string;
  name: string;
  age: string;
  description: string;
  contactNumber: string;
  images: string[];
  gender: 'male' | 'female';
  location?: string;
}

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  // Load profiles from localStorage on mount
  useEffect(() => {
    const savedProfiles = localStorage.getItem('blogify_profiles');
    if (savedProfiles) {
      setProfiles(JSON.parse(savedProfiles));
    } else {
      // Initialize with sample data
      const sampleProfiles: Profile[] = [
        {
          id: '1',
          name: 'Sarah Williams',
          age: '25',
          gender: 'female',
          description: 'Professional model and content creator. Passionate about fashion, photography, and travel. Available for collaborations and brand partnerships.',
          contactNumber: '+1234567890',
          location: 'New York, USA',
          images: [
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&h=800&fit=crop'
          ]
        },
        {
          id: '2',
          name: 'Emily Johnson',
          age: '28',
          gender: 'female',
          description: 'Certified yoga instructor and wellness coach. Helping people achieve balance and inner peace through mindful practices.',
          contactNumber: '+1234567891',
          location: 'Los Angeles, USA',
          images: [
            'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&h=800&fit=crop'
          ]
        },
        {
          id: '3',
          name: 'Michael Chen',
          age: '30',
          gender: 'male',
          description: 'Fitness coach and personal trainer. Specialized in strength training and nutrition. Let\'s achieve your fitness goals together!',
          contactNumber: '+1234567892',
          location: 'Miami, USA',
          images: [
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&h=800&fit=crop'
          ]
        },
        {
          id: '4',
          name: 'David Rodriguez',
          age: '27',
          gender: 'male',
          description: 'Professional photographer and videographer. Capturing moments that last forever. Available for events and creative projects.',
          contactNumber: '+1234567893',
          location: 'Chicago, USA',
          images: [
            'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&h=800&fit=crop'
          ]
        },
        {
          id: '5',
          name: 'Jessica Martinez',
          age: '26',
          gender: 'female',
          description: 'Makeup artist and beauty influencer. Creating stunning looks for all occasions. Book your session today!',
          contactNumber: '+1234567894',
          location: 'Dallas, USA',
          images: [
            'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&h=800&fit=crop'
          ]
        },
        {
          id: '6',
          name: 'Alex Thompson',
          age: '29',
          gender: 'male',
          description: 'Music producer and DJ. Creating beats and vibes for your events. Let\'s make some magic together!',
          contactNumber: '+1234567895',
          location: 'Atlanta, USA',
          images: [
            'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?w=800&h=800&fit=crop'
          ]
        }
      ];
      setProfiles(sampleProfiles);
      localStorage.setItem('blogify_profiles', JSON.stringify(sampleProfiles));
    }
  }, []);

  // Save profiles to localStorage whenever they change
  useEffect(() => {
    if (profiles.length > 0) {
      localStorage.setItem('blogify_profiles', JSON.stringify(profiles));
    }
  }, [profiles]);

  const handleLogin = (username: string, password: string) => {
    if (username === 'admin' && password === 'admin123') {
      setIsAdmin(true);
      setShowAdminLogin(false);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsAdmin(false);
  };

  const handleAddProfile = (profile: Omit<Profile, 'id'>) => {
    const newProfile: Profile = {
      ...profile,
      id: Date.now().toString()
    };
    setProfiles([...profiles, newProfile]);
  };

  const handleEditProfile = (id: string, updatedProfile: Omit<Profile, 'id'>) => {
    setProfiles(profiles.map(profile => 
      profile.id === id ? { ...updatedProfile, id } : profile
    ));
  };

  const handleDeleteProfile = (id: string) => {
    setProfiles(profiles.filter(profile => profile.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Header 
        isAdmin={isAdmin}
        onAdminClick={() => setShowAdminLogin(true)}
        onLogout={handleLogout}
      />

      {!isAdmin && <Hero />}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {isAdmin ? (
          <AdminDashboard
            profiles={profiles}
            onAddProfile={handleAddProfile}
            onEditProfile={handleEditProfile}
            onDeleteProfile={handleDeleteProfile}
          />
        ) : (
          <ProfileList profiles={profiles} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-purple-900 via-pink-900 to-blue-900 text-white py-6 sm:py-8 mt-12 sm:mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-purple-200 text-sm sm:text-base">© 2025 Blogify. Connect, Discover, Grow.</p>
        </div>
      </footer>

      {showAdminLogin && (
        <AdminLogin
          onLogin={handleLogin}
          onClose={() => setShowAdminLogin(false)}
        />
      )}
    </div>
  );
}