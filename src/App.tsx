/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { SEPACProvider, useSEPAC } from './context/SEPACContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import PublicPages from './components/PublicPages';
import AdminDashboard from './components/AdminDashboard';
import WelcomeSplash from './components/WelcomeSplash';
import { Megaphone, X, Bell } from 'lucide-react';

function SEPACAppContent() {
  const [activeTab, setActiveTab] = useState('home');
  const [authOpen, setAuthOpen] = useState(false);
  const [authInitialMode, setAuthInitialMode] = useState<'login' | 'register'>('login');
  const { announcements, user } = useSEPAC();
  const [latestAnnouncement, setLatestAnnouncement] = useState<any>(null);

  const handleOpenAuth = (mode?: 'login' | 'register') => {
    setAuthInitialMode(mode || 'login');
    setAuthOpen(true);
  };

  // Monitor real-time announcements to show a floating alert toast
  useEffect(() => {
    if (announcements.length > 0) {
      const newest = announcements[0];
      const dismissed = JSON.parse(localStorage.getItem('sepac_dismissed_announcements') || '[]');
      if (!dismissed.includes(newest.id)) {
        setLatestAnnouncement(newest);
      }
    }
  }, [announcements]);

  const handleDismissAnnouncement = () => {
    if (latestAnnouncement) {
      const dismissed = JSON.parse(localStorage.getItem('sepac_dismissed_announcements') || '[]');
      dismissed.push(latestAnnouncement.id);
      localStorage.setItem('sepac_dismissed_announcements', JSON.stringify(dismissed));
      setLatestAnnouncement(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col text-gray-800 antialiased selection:bg-brand-gold/30">

      <div className="sepac-wallpaper" />
      <WelcomeSplash />
      {/* Floating Real-time Announcement Toast */}
      {latestAnnouncement && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[80] w-full max-w-xl px-4 animate-[bounce_1s_ease_1]">
          <div className="bg-brand-navy border-2 border-brand-gold text-white p-4 rounded-xl shadow-2xl flex items-start justify-between space-x-3">
            <div className="flex items-start space-x-2.5">
              <div className="p-2 bg-brand-gold/15 rounded-lg text-brand-gold shrink-0">
                <Megaphone size={18} />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-brand-gold tracking-widest block">
                  Official Announcement Broadcast
                </span>
                <h4 className="font-serif-display text-sm font-bold text-white mt-0.5">
                  {latestAnnouncement.title}
                </h4>
                <p className="text-xs text-gray-200 mt-1 leading-relaxed">
                  {latestAnnouncement.body}
                </p>
                <span className="text-[9px] text-brand-gold-light mt-1.5 block font-bold">
                  Issued by: {latestAnnouncement.sent_by}
                </span>
              </div>
            </div>
            
            <button
              onClick={handleDismissAnnouncement}
              className="text-gray-300 hover:text-white hover:bg-white/10 p-1 rounded-full transition-colors shrink-0"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Navigation */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenAuth={handleOpenAuth} 
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        {activeTab === 'admin' && user && (user.role === 'admin' || user.role === 'super_admin' || user.role === 'moderator') ? (
          <AdminDashboard />
        ) : (
          <PublicPages 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            onOpenAuth={handleOpenAuth} 
          />
        )}
      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* Authentication Register/Login Sliding Panel */}
      <AuthModal 
        isOpen={authOpen} 
        onClose={() => setAuthOpen(false)} 
        initialMode={authInitialMode}
      />

    </div>
  );
}

export default function App() {
  return (
    <SEPACProvider>
      <SEPACAppContent />
    </SEPACProvider>
  );
}
