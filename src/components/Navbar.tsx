import React, { useState } from 'react';
import { useSEPAC } from '../context/SEPACContext';
import SEPACSeal from './SEPACSeal';
import { Menu, X, Globe, User, LogOut, Shield } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAuth: (mode?: 'login' | 'register') => void;
}

export default function Navbar({ activeTab, setActiveTab, onOpenAuth }: NavbarProps) {
  const { lang, setLang, t, user, logout } = useSEPAC();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleLanguage = () => {
    setLang(lang === 'en' ? 'rw' : 'en');
  };

  const menuItems = [
    { id: 'home', label: t('nav.home') },
    { id: 'about', label: t('nav.about') },
    { id: 'news', label: t('nav.news') },
    { id: 'events', label: t('nav.events') },
    { id: 'gallery', label: t('nav.gallery') },
    { id: 'adverts', label: t('nav.adverts') },
  ];

  // Dynamically build menu list based on auth and approval state
  const getAllItems = () => {
    const list = [...menuItems];
    list.push({ id: 'prayer', label: t('nav.prayer') });
    list.push({ id: 'members', label: t('nav.members') });
    list.push({ id: 'contact', label: t('nav.contact') });
    return list;
  };

  const allItems = getAllItems();

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  };

  const isAdmin = user && (user.role === 'admin' || user.role === 'super_admin' || user.role === 'moderator');

  return (
    <nav className="sticky top-0 z-50 bg-brand-navy text-white shadow-md border-b-4 border-brand-gold">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => handleTabClick('home')} 
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <SEPACSeal size={52} className="bg-white rounded-full p-0.5 border border-brand-gold group-hover:scale-105 transition-transform" />
            <div>
              <span className="font-serif-display text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-brand-gold transition-colors block">
                SEPAC
              </span>
              <span className="text-[9px] uppercase tracking-widest text-brand-gold/90 font-semibold block -mt-1 sm:block hidden">
                {t('hero.tagline')}
              </span>
            </div>
          </div>

          {/* Desktop Navigation links */}
          <div className="hidden lg:flex items-center space-x-1">
            {allItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`px-3 py-2 rounded-md text-xs font-medium uppercase tracking-wider transition-all duration-150 ${
                  activeTab === item.id
                    ? 'text-brand-gold font-bold border-b-2 border-brand-gold'
                    : 'text-gray-200 hover:text-brand-gold hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right menu (Lang Toggle, Auth controls) */}
          <div className="hidden lg:flex items-center space-x-4">
            
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-full border border-brand-gold/40 text-xs uppercase tracking-wider text-white hover:bg-brand-gold hover:text-brand-navy font-semibold transition-all"
              title="Change Language / Hindura Ururimi"
            >
              <Globe size={14} />
              <span>{lang === 'en' ? 'RW' : 'EN'}</span>
            </button>

            {/* Auth Buttons / Dropdown */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2 bg-brand-navy-light px-3 py-2 rounded-lg border border-brand-gold/30 hover:bg-brand-navy-dark transition-all"
                >
                  <img
                    src={user.avatar_url}
                    alt={user.name}
                    className="w-7 h-7 rounded-full object-cover border border-brand-gold/50"
                  />
                  <div className="text-left">
                    <p className="text-xs font-semibold max-w-[110px] truncate">{user.name}</p>
                    <p className="text-[10px] text-brand-gold capitalize">{user.role.replace('_', ' ')}</p>
                  </div>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white text-gray-800 ring-1 ring-black/5 divide-y divide-gray-100 z-50">
                    <div className="px-4 py-3">
                      <p className="text-xs text-gray-500">Logged in as</p>
                      <p className="text-sm font-semibold truncate text-brand-navy">{user.email}</p>
                      {!user.approved && (
                        <span className="inline-block mt-1 px-2 py-0.5 text-[9px] bg-amber-100 text-amber-800 rounded font-semibold">
                          Pending Admin Review
                        </span>
                      )}
                    </div>
                    
                    <div className="py-1">
                      <button
                        onClick={() => handleTabClick('profile')}
                        className="flex items-center w-full px-4 py-2 text-xs text-left hover:bg-brand-cream text-gray-700"
                      >
                        <User size={14} className="mr-2 text-brand-navy" />
                        {t('nav.profile')}
                      </button>
                      
                      {isAdmin && (
                        <button
                          onClick={() => handleTabClick('admin')}
                          className="flex items-center w-full px-4 py-2 text-xs text-left hover:bg-brand-cream text-brand-navy font-semibold"
                        >
                          <Shield size={14} className="mr-2 text-brand-gold" />
                          {t('nav.admin')}
                        </button>
                      )}
                    </div>

                    <div className="py-1">
                      <button
                        onClick={() => {
                          logout();
                          handleTabClick('home');
                        }}
                        className="flex items-center w-full px-4 py-2 text-xs text-left text-red-600 hover:bg-red-50"
                      >
                        <LogOut size={14} className="mr-2" />
                        {t('nav.logout')}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => onOpenAuth('login')}
                  className="text-gray-200 hover:text-brand-gold px-3 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  {t('nav.login')}
                </button>
                <button
                  onClick={() => onOpenAuth('register')}
                  className="bg-brand-gold text-brand-navy hover:bg-white hover:text-brand-navy hover:shadow-md px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-150 border border-brand-gold cursor-pointer"
                >
                  {t('nav.register')}
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-2">
            {/* Lang Switch Mobile */}
            <button
              onClick={toggleLanguage}
              className="p-1.5 rounded-full border border-brand-gold/30 text-[10px] font-bold text-brand-gold hover:bg-brand-gold hover:text-brand-navy transition-all"
            >
              {lang === 'en' ? 'RW' : 'EN'}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-200 hover:text-brand-gold hover:bg-brand-navy-light focus:outline-none"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-brand-navy-dark border-t border-brand-gold/20 px-2 pt-2 pb-4 space-y-1 animate-[fadeIn_0.15s_ease-out]">
          {allItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className={`block w-full text-left px-3 py-2.5 rounded-md text-sm font-semibold uppercase tracking-wider ${
                activeTab === item.id
                  ? 'bg-brand-gold text-brand-navy font-bold'
                  : 'text-gray-200 hover:bg-white/5 hover:text-brand-gold'
              }`}
            >
              {item.label}
            </button>
          ))}

          {/* Auth in Mobile Menu */}
          {user ? (
            <div className="pt-4 mt-4 border-t border-brand-gold/20">
              <div className="flex items-center px-3 py-2 mb-2">
                <img
                  src={user.avatar_url}
                  alt={user.name}
                  className="w-9 h-9 rounded-full object-cover border border-brand-gold"
                />
                <div className="ml-3">
                  <p className="text-sm font-bold text-white">{user.name}</p>
                  <p className="text-xs text-brand-gold capitalize">{user.role.replace('_', ' ')}</p>
                </div>
              </div>
              
              <button
                onClick={() => handleTabClick('profile')}
                className="flex items-center w-full px-3 py-2 text-sm text-gray-200 hover:text-brand-gold"
              >
                <User size={16} className="mr-2" />
                {t('nav.profile')}
              </button>

              {isAdmin && (
                <button
                  onClick={() => handleTabClick('admin')}
                  className="flex items-center w-full px-3 py-2 text-sm text-brand-gold font-bold"
                >
                  <Shield size={16} className="mr-2" />
                  {t('nav.admin')}
                </button>
              )}

              <button
                onClick={() => {
                  logout();
                  handleTabClick('home');
                }}
                className="flex items-center w-full px-3 py-2 text-sm text-red-400 hover:text-red-300"
              >
                <LogOut size={16} className="mr-2" />
                {t('nav.logout')}
              </button>
            </div>
          ) : (
            <div className="pt-4 mt-4 border-t border-brand-gold/20 px-3 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth('login');
                }}
                className="w-full bg-transparent border border-gray-300 text-white font-bold py-2.5 rounded-md text-center uppercase tracking-wider hover:bg-white/10 transition-all cursor-pointer"
              >
                {t('nav.login')}
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth('register');
                }}
                className="w-full bg-brand-gold text-brand-navy font-bold py-2.5 rounded-md text-center uppercase tracking-wider hover:bg-brand-gold-light transition-all cursor-pointer"
              >
                {t('nav.register')}
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
