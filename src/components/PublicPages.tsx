import React, { useState, useRef } from 'react';
import { useSEPAC } from '../context/SEPACContext';
import SEPACSeal from './SEPACSeal';
import { Post, Event, PrayerRequest, Profile, GalleryItem } from '../types';
import { 
  Heart, 
  MessageSquare, 
  MapPin, 
  Calendar as CalendarIcon, 
  Plus, 
  Upload, 
  Search, 
  Filter, 
  BookOpen, 
  Sparkles, 
  Send, 
  AlertCircle, 
  CheckCircle,
  ThumbsUp,
  User,
  ExternalLink,
  Users,
  Phone,
  Mail,
  X
} from 'lucide-react';

interface PublicPagesProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAuth: (mode?: 'login' | 'register') => void;
}

export default function PublicPages({ activeTab, setActiveTab, onOpenAuth }: PublicPagesProps) {
  switch (activeTab) {
    case 'home':
      return <HomeSection setActiveTab={setActiveTab} onOpenAuth={onOpenAuth} />;
    case 'about':
      return <AboutSection />;
    case 'news':
      return <NewsSection onOpenAuth={onOpenAuth} />;
    case 'events':
      return <EventsSection onOpenAuth={onOpenAuth} />;
    case 'gallery':
      return <GallerySection />;
    case 'prayer':
      return <PrayersSection onOpenAuth={onOpenAuth} />;
    case 'adverts':
      return <AdvertsSection />;
    case 'members':
      return <MembersSection onOpenAuth={onOpenAuth} />;
    case 'contact':
      return <ContactSection />;
    case 'profile':
      return <ProfileSection />;
    default:
      return <HomeSection setActiveTab={setActiveTab} onOpenAuth={onOpenAuth} />;
  }
}

// ==========================================
// 1. HOME SECTION
// ==========================================
function HomeSection({ setActiveTab, onOpenAuth }: { setActiveTab: (tab: string) => void; onOpenAuth: (mode?: 'login' | 'register') => void }) {
  const { t, user, posts, events, gallery } = useSEPAC();

  const approvedPosts = posts.filter(p => p.status === 'approved').slice(0, 3);
  const upcomingEvents = events.filter(e => new Date(e.date) >= new Date()).slice(0, 3);
  const approvedPhotos = gallery.filter(g => g.approved).slice(0, 6);

  return (
    <div className="space-y-16 pb-16 font-sans">
      
      {/* Premium Hero block */}
      <div className="relative bg-brand-navy-dark text-white py-20 px-4 sm:px-6 lg:px-8 border-b-4 border-brand-gold overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-navy-light/45 via-brand-navy-dark/95 to-brand-navy-dark/100" />
        
        <div className="relative max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 z-10">
          
          <div className="text-center md:text-left space-y-6 max-w-2xl">
            <h1 className="font-serif-display text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              {t('hero.title')}
            </h1>
            <p className="text-brand-gold font-serif-display text-lg sm:text-2xl italic">
              "{t('hero.tagline')}"
            </p>
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
              We are a dedicated union of Saint Esprit School alumni, bound together by the love of Christ, sharing fellowship, and serving our community to expand God's Kingdom.
            </p>
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-4">
              {!user ? (
                <>
                  <button
                    onClick={() => onOpenAuth('register')}
                    className="bg-brand-gold hover:bg-white text-brand-navy font-bold px-6 py-3 rounded-lg text-xs uppercase tracking-wider shadow-lg transition-all border border-brand-gold cursor-pointer"
                  >
                    {t('nav.register')} / Sign Up
                  </button>
                  <button
                    onClick={() => onOpenAuth('login')}
                    className="bg-transparent border border-white hover:bg-white hover:text-brand-navy text-white px-6 py-3 rounded-lg text-xs uppercase tracking-wider transition-all cursor-pointer"
                  >
                    {t('nav.login')} / Sign In
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setActiveTab('news')}
                  className="bg-brand-gold hover:bg-white text-brand-navy font-bold px-6 py-3 rounded-lg text-xs uppercase tracking-wider shadow-lg transition-all border border-brand-gold cursor-pointer"
                >
                  Enter Alumni Portal
                </button>
              )}
              <button
                onClick={() => setActiveTab('about')}
                className="bg-transparent border border-gray-300 hover:border-brand-gold text-white hover:text-brand-gold px-6 py-3 rounded-lg text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                {t('hero.learnMore')}
              </button>
            </div>
          </div>

          <div className="shrink-0">
            <SEPACSeal size={280} className="bg-white rounded-full p-2 border-2 border-brand-gold shadow-2xl" />
          </div>

        </div>
      </div>

      {/* Scripture spotlight block */}
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="bg-white border-y-2 border-brand-gold/30 py-8 px-6 shadow-sm rounded-lg">
          <BookOpen className="mx-auto text-brand-gold mb-3" size={28} />
          <p className="font-serif-display text-base sm:text-lg italic text-gray-700 leading-relaxed">
            "{t('scripture.verse')}"
          </p>
          <p className="mt-2 text-xs font-bold uppercase tracking-widest text-brand-navy">
            — {t('scripture.reference')}
          </p>
        </div>
      </div>

      {/* Core values bento grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center">
          <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-brand-navy">Our Core Pillars</h2>
          <div className="h-1 w-16 bg-brand-gold mx-auto mt-2" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-brand-navy text-center hover:shadow-md transition-shadow">
            <Sparkles className="mx-auto text-brand-gold mb-3" size={24} />
            <h3 className="font-serif-display text-base font-bold text-brand-navy mb-2">{t('values.unity')}</h3>
            <p className="text-xs text-gray-500 leading-relaxed">{t('values.unityDesc')}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-brand-gold text-center hover:shadow-md transition-shadow">
            <BookOpen className="mx-auto text-brand-navy mb-3" size={24} />
            <h3 className="font-serif-display text-base font-bold text-brand-navy mb-2">{t('values.faith')}</h3>
            <p className="text-xs text-gray-500 leading-relaxed">{t('values.faithDesc')}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-brand-navy text-center hover:shadow-md transition-shadow">
            <Users className="mx-auto text-brand-gold mb-3" size={24} />
            <h3 className="font-serif-display text-base font-bold text-brand-navy mb-2">{t('values.fellowship')}</h3>
            <p className="text-xs text-gray-500 leading-relaxed">{t('values.fellowshipDesc')}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-brand-gold text-center hover:shadow-md transition-shadow">
            <Heart className="mx-auto text-brand-navy mb-3" size={24} />
            <h3 className="font-serif-display text-base font-bold text-brand-navy mb-2">{t('values.service')}</h3>
            <p className="text-xs text-gray-500 leading-relaxed">{t('values.serviceDesc')}</p>
          </div>
        </div>
      </div>

      {/* Upcoming Events preview & Latest News preview side-by-side */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Events preview */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-brand-gold/30 pb-3">
            <h3 className="font-serif-display text-xl font-bold text-brand-navy">Assemblies & Gatherings</h3>
            <button onClick={() => setActiveTab('events')} className="text-xs font-bold uppercase tracking-wider text-brand-gold-dark hover:underline">
              See All
            </button>
          </div>

          {upcomingEvents.length === 0 ? (
            <div className="p-8 bg-white border rounded-xl text-center text-xs text-gray-400">
              No upcoming events scheduled. Check back soon!
            </div>
          ) : (
            <div className="space-y-4">
              {upcomingEvents.map((ev) => (
                <div key={ev.id} className="bg-white p-4 rounded-xl shadow-sm border border-brand-navy/10 flex gap-4">
                  {ev.image_url && (
                    <img src={ev.image_url} alt={ev.title} className="w-20 h-20 rounded-lg object-cover border" />
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif-display text-sm font-bold text-gray-800 truncate">{ev.title}</h4>
                    <p className="text-brand-navy font-bold text-[11px] mt-0.5 flex items-center">
                      <CalendarIcon size={12} className="mr-1 text-brand-gold" />
                      {new Date(ev.date).toLocaleDateString()}
                    </p>
                    <p className="text-gray-500 text-[11px] flex items-center mt-0.5">
                      <MapPin size={12} className="mr-1 text-brand-gold" />
                      {ev.location}
                    </p>
                    <p className="text-gray-500 text-[11px] line-clamp-1 mt-1.5">{ev.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* News Feed preview */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-brand-gold/30 pb-3">
            <h3 className="font-serif-display text-xl font-bold text-brand-navy">Community News</h3>
            <button onClick={() => setActiveTab('news')} className="text-xs font-bold uppercase tracking-wider text-brand-gold-dark hover:underline">
              Read Feed
            </button>
          </div>

          {approvedPosts.length === 0 ? (
            <div className="p-8 bg-white border rounded-xl text-center text-xs text-gray-400">
              No recent news articles published yet.
            </div>
          ) : (
            <div className="space-y-4">
              {approvedPosts.map((post) => (
                <div key={post.id} className="bg-white p-4 rounded-xl shadow-sm border border-brand-navy/10 space-y-2">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="px-2 py-0.5 bg-brand-gold-light text-brand-navy font-bold rounded uppercase">
                      {post.category}
                    </span>
                    <span className="text-gray-400">
                      {new Date(post.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <h4 className="font-serif-display text-sm font-bold text-gray-800 line-clamp-1">
                    {post.title}
                  </h4>
                  <p className="text-gray-500 text-[11px] line-clamp-2 leading-relaxed">
                    {post.content}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Gallery Carousel strip */}
      {approvedPhotos.length > 0 && (
        <div className="bg-brand-cream-dark py-10 border-y border-brand-gold/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="text-center">
              <h3 className="font-serif-display text-lg font-bold text-brand-navy">Moments in Fellowship</h3>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-0.5">Capturing unity & joy</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              {approvedPhotos.map((p) => (
                <div key={p.id} className="aspect-square rounded-lg overflow-hidden border border-brand-navy/10 group cursor-pointer shadow-sm">
                  <img
                    src={p.image_url}
                    alt={p.event_tag}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// ==========================================
// 2. ABOUT SECTION
// ==========================================
function AboutSection() {
  const { t, siteSettings, lang } = useSEPAC();

  const historyTitle = siteSettings ? (lang === 'rw' ? siteSettings.historyTitle_rw : siteSettings.historyTitle_en) : t('about.historyTitle');
  const historyText1 = siteSettings ? (lang === 'rw' ? siteSettings.historyText1_rw : siteSettings.historyText1_en) : t('about.historyText1');
  const historyText2 = siteSettings ? (lang === 'rw' ? siteSettings.historyText2_rw : siteSettings.historyText2_en) : t('about.historyText2');
  
  const missionTitle = siteSettings ? (lang === 'rw' ? siteSettings.missionTitle_rw : siteSettings.missionTitle_en) : t('about.mission');
  const missionText = siteSettings ? (lang === 'rw' ? siteSettings.missionText_rw : siteSettings.missionText_en) : t('about.missionText');
  
  const visionTitle = siteSettings ? (lang === 'rw' ? siteSettings.visionTitle_rw : siteSettings.visionTitle_en) : t('about.vision');
  const visionText = siteSettings ? (lang === 'rw' ? siteSettings.visionText_rw : siteSettings.visionText_en) : t('about.visionText');

  const team = siteSettings?.leadershipTeam || [
    { id: 'lead-1', name: 'Jean Claude Jemuvalos', role_en: 'President & Super Admin', role_rw: 'Perezida & Super Admin', year: 2012, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150' },
    { id: 'lead-2', name: 'Alice Uwase', role_en: 'Vice President & Coordinator', role_rw: 'Visi Perezida & Coordinator', year: 2018, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' },
    { id: 'lead-3', name: 'Eric Kalisa', role_en: 'Treasurer & Worship Leader', role_rw: 'Umbitsi & Worship Leader', year: 2015, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150' },
    { id: 'lead-4', name: 'Sister Chantal', role_en: 'Mentorship Coordinator', role_rw: 'Mentorship Coordinator', year: 2010, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150' }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 font-sans">
      
      {/* History and Intro */}
      <div className="bg-white p-8 rounded-xl shadow-sm border border-brand-navy/10 space-y-4">
        <h2 className="font-serif-display text-2xl font-bold text-brand-navy border-b border-brand-gold/30 pb-3">
          {historyTitle}
        </h2>
        <p className="text-xs text-gray-600 leading-relaxed">
          {historyText1}
        </p>
        <p className="text-xs text-gray-600 leading-relaxed">
          {historyText2}
        </p>
      </div>

      {/* Mission & Vision double column */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div className="bg-white p-6 rounded-xl border border-brand-navy/10 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-full bg-blue-50 text-brand-navy flex items-center justify-center">
            <BookOpen size={20} />
          </div>
          <h3 className="font-serif-display text-lg font-bold text-brand-navy">{missionTitle}</h3>
          <p className="text-xs text-gray-500 leading-relaxed">{missionText}</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-brand-navy/10 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-full bg-amber-50 text-brand-gold flex items-center justify-center">
            <Sparkles size={20} />
          </div>
          <h3 className="font-serif-display text-lg font-bold text-brand-navy">{visionTitle}</h3>
          <p className="text-xs text-gray-500 leading-relaxed">{visionText}</p>
        </div>

      </div>

      {/* Team section */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="font-serif-display text-2xl font-bold text-brand-navy">{t('about.teamTitle')}</h2>
          <div className="h-0.5 w-12 bg-brand-gold mx-auto mt-1" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <div key={member.id || i} className="bg-white p-4 rounded-xl border border-brand-navy/10 shadow-sm text-center space-y-2">
              <img
                src={member.avatar}
                alt={member.name}
                className="w-20 h-20 rounded-full object-cover border-2 border-brand-gold mx-auto font-sans"
                referrerPolicy="no-referrer"
              />
              <div>
                <h4 className="text-xs font-bold text-gray-800">{member.name}</h4>
                <p className="text-[10px] text-brand-navy font-semibold">
                  {lang === 'rw' ? member.role_rw : member.role_en}
                </p>
                <p className="text-[9px] text-gray-400 uppercase">Class of {member.year}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

// ==========================================
// 3. MEMBER DIRECTORY (MEMBERS ONLY)
// ==========================================
function MembersSection({ onOpenAuth }: { onOpenAuth: (mode?: 'login' | 'register') => void }) {
  const { members, t, user } = useSEPAC();
  const [search, setSearch] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'verified', 'pending'
  const [selectedMember, setSelectedMember] = useState<Profile | null>(null);

  const filtered = members.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase()) || 
                          (m.bio && m.bio.toLowerCase().includes(search.toLowerCase()));
    
    const matchesYear = yearFilter === '' || m.graduation_year.toString() === yearFilter;
    
    let matchesStatus = true;
    if (statusFilter === 'verified') {
      matchesStatus = m.approved;
    } else if (statusFilter === 'pending') {
      matchesStatus = !m.approved;
    }

    return matchesSearch && matchesYear && matchesStatus;
  });

  // Get unique graduation years for filter
  const years = Array.from(new Set(members.map(m => m.graduation_year))).sort((a: number, b: number) => b - a);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 font-sans">
      
      <div className="text-center md:text-left">
        <h1 className="font-serif-display text-2xl sm:text-3xl font-bold text-brand-navy">SEPAC Registered Members Directory</h1>
        <p className="text-xs text-gray-500 mt-1">
          Explore registered members, view their digital alumni credentials, and see their school memory photos.
        </p>
      </div>

      {!user && (
        <div className="bg-gradient-to-r from-brand-navy to-brand-navy-light text-white p-6 rounded-2xl border border-brand-gold/30 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="font-serif-display text-base font-bold text-brand-gold">Are you a Saint Esprit Alumnus?</h4>
            <p className="text-xs text-gray-300 leading-relaxed max-w-xl">
              Register an account to appear in this directory with your official alumni ID card, search and filter other members, and connect with fellow graduates! If you already have an account, please sign in.
            </p>
          </div>
          <div className="flex items-center space-x-3 shrink-0">
            <button
              onClick={() => onOpenAuth('login')}
              className="text-white hover:text-brand-gold px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors border border-white/20 cursor-pointer"
            >
              {t('nav.login')} / Sign In
            </button>
            <button
              onClick={() => onOpenAuth('register')}
              className="bg-brand-gold hover:bg-white text-brand-navy font-bold px-5 py-2.5 rounded-lg text-xs uppercase tracking-wider transition-all border border-brand-gold cursor-pointer shadow"
            >
              {t('nav.register')} / Sign Up
            </button>
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white p-4 rounded-xl border border-brand-navy/10 shadow-sm">
        
        {/* Search */}
        <div className="md:col-span-2 relative">
          <Search className="absolute left-3 top-3.5 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search alumni by name, bio..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-brand-gold focus:border-brand-gold"
          />
        </div>

        {/* Year Filter */}
        <div className="relative">
          <Filter className="absolute left-3 top-3.5 text-gray-400" size={14} />
          <select
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            className="w-full text-xs pl-9 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-brand-gold focus:border-brand-gold appearance-none bg-white cursor-pointer"
          >
            <option value="">All Graduation Years</option>
            {years.map(y => (
              <option key={y} value={y}>Class of {y}</option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div className="relative">
          <Filter className="absolute left-3 top-3.5 text-gray-400" size={14} />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full text-xs pl-9 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-brand-gold focus:border-brand-gold appearance-none bg-white cursor-pointer"
          >
            <option value="all">All Verification States</option>
            <option value="verified">Verified Alumni Only</option>
            <option value="pending">Pending Verification</option>
          </select>
        </div>

      </div>

      {/* Directory Grid */}
      {filtered.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-xl border border-gray-150 text-gray-400 text-xs max-w-lg mx-auto">
          No registered members match your search or filter criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((m) => {
            const memberCardId = `SEPAC-ST-${m.graduation_year || '2015'}-${m.id.substring(m.id.length - 4).toUpperCase()}`;
            return (
              <div 
                key={m.id} 
                className="bg-white rounded-2xl overflow-hidden border border-brand-navy/10 shadow-sm flex flex-col justify-between hover:shadow-md transition-all group hover:border-brand-gold/40 cursor-pointer"
                onClick={() => setSelectedMember(m)}
              >
                <div className="p-5 text-center space-y-3 relative">
                  {/* Status Badge */}
                  <div className="absolute top-3 right-3">
                    <span className={`inline-block px-1.5 py-0.5 text-[8px] uppercase tracking-wide font-bold rounded ${
                      m.approved ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-amber-50 text-amber-600 border border-amber-100'
                    }`}>
                      {m.approved ? 'Verified' : 'Pending'}
                    </span>
                  </div>

                  <img
                    src={m.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(m.name)}`}
                    alt={m.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-brand-gold mx-auto group-hover:scale-105 transition-transform"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-brand-navy leading-snug group-hover:text-brand-gold transition-colors">{m.name}</h3>
                    <p className="text-[10px] text-gray-400 font-mono mt-0.5">{memberCardId}</p>
                    <span className="inline-block px-2 py-0.5 bg-brand-cream text-brand-navy font-bold rounded text-[9px] uppercase mt-1.5">
                      Class of {m.graduation_year}
                    </span>
                  </div>
                  {m.bio && (
                    <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed h-8">
                      {m.bio}
                    </p>
                  )}
                </div>
                
                <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-[11px]">
                  <span className="text-gray-400 text-[9px] font-bold uppercase tracking-wider">
                    {m.role?.replace('_', ' ')}
                  </span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedMember(m);
                    }}
                    className="text-brand-navy font-bold hover:text-brand-gold transition-colors text-[10px] uppercase tracking-wider cursor-pointer"
                  >
                    View ID Card
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Alumni ID Modal Overlay */}
      {selectedMember && (
        <div className="fixed inset-0 bg-brand-navy/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div 
            className="relative bg-brand-navy border-2 border-brand-gold rounded-2xl p-6 text-white shadow-2xl max-w-xl w-full overflow-hidden animate-[fadeIn_0.2s_ease-out]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={() => setSelectedMember(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white bg-white/10 hover:bg-white/20 p-1.5 rounded-full transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>

            {/* Subtle Watermark Seal */}
            <div className="absolute right-0 bottom-0 opacity-10 translate-x-12 translate-y-12 pointer-events-none">
              <SEPACSeal size={280} />
            </div>

            {/* Card Header */}
            <div className="flex items-center justify-between border-b border-brand-gold/30 pb-4 mb-5 relative z-10">
              <div className="flex items-center space-x-2">
                <SEPACSeal size={42} className="bg-white rounded-full p-0.5 border border-brand-gold" />
                <div>
                  <h3 className="font-serif-display text-base font-bold tracking-tight text-white leading-none">SEPAC ALUMNI</h3>
                  <p className="text-[8px] uppercase tracking-widest text-brand-gold font-bold">ES Saint Esprit de Nyanza</p>
                </div>
              </div>
              <div className="text-right pr-8">
                <span className={`inline-block px-2 py-0.5 text-[8px] uppercase tracking-wider font-bold rounded ${
                  selectedMember.approved ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                }`}>
                  {selectedMember.approved ? 'Verified Alumni' : 'Pending Review'}
                </span>
              </div>
            </div>

            {/* Card Body */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative z-10">
              {/* Photos Block */}
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="relative">
                  <img
                    src={selectedMember.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(selectedMember.name)}`}
                    alt={selectedMember.name}
                    className="w-24 h-24 rounded-full object-cover border-2 border-brand-gold shadow"
                  />
                  {selectedMember.approved && (
                    <span className="absolute bottom-0 right-1 w-4 h-4 bg-emerald-500 border-2 border-brand-navy rounded-full" />
                  )}
                </div>
                {selectedMember.school_photo_url && (
                  <div className="text-center">
                    <p className="text-[8px] text-brand-gold/80 font-bold uppercase tracking-wider mb-1">School Memory</p>
                    <img
                      src={selectedMember.school_photo_url}
                      alt="School Memory"
                      className="w-16 h-16 rounded object-cover border border-white/20 shadow-sm mx-auto"
                    />
                  </div>
                )}
              </div>

              {/* Details Block */}
              <div className="sm:col-span-2 space-y-4 text-xs self-center">
                <div className="space-y-1">
                  <p className="text-[9px] uppercase text-brand-gold/80 font-bold tracking-wider">Full Name</p>
                  <p className="text-base font-bold font-serif-display text-white tracking-wide">{selectedMember.name}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-[9px] uppercase text-brand-gold/80 font-bold tracking-wider">Graduation Year</p>
                    <p className="font-semibold text-white">Class of {selectedMember.graduation_year || 'N/A'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[9px] uppercase text-brand-gold/80 font-bold tracking-wider">Years Studied</p>
                    <p className="font-semibold text-white">{selectedMember.years_studied || 'N/A'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-[9px] uppercase text-brand-gold/80 font-bold tracking-wider">Member ID</p>
                    <p className="font-mono text-[10px] text-gray-300 font-semibold">
                      {`SEPAC-ST-${selectedMember.graduation_year || '2015'}-${selectedMember.id.substring(selectedMember.id.length - 4).toUpperCase()}`}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[9px] uppercase text-brand-gold/80 font-bold tracking-wider">Role</p>
                    <p className="font-semibold text-brand-gold uppercase tracking-wider text-[9px]">
                      {selectedMember.role?.replace('_', ' ')}
                    </p>
                  </div>
                </div>

                {selectedMember.bio && (
                  <div className="space-y-1 pt-1 border-t border-white/10">
                    <p className="text-[9px] uppercase text-brand-gold/80 font-bold tracking-wider">Bio & Testimony</p>
                    <p className="text-[11px] text-gray-300 italic leading-relaxed line-clamp-3">"{selectedMember.bio}"</p>
                  </div>
                )}

                {selectedMember.phone && (
                  <div className="pt-1 border-t border-white/10 flex items-center space-x-2">
                    <span className="text-[9px] uppercase text-brand-gold/80 font-bold tracking-wider">Phone:</span>
                    <a href={`tel:${selectedMember.phone}`} className="text-white font-semibold hover:text-brand-gold transition-colors hover:underline">
                      {selectedMember.phone}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Scripture / Moto */}
            <div className="border-t border-brand-gold/20 pt-4 mt-5 text-center">
              <p className="text-[9px] italic text-gray-300">"Together in Christ, Stronger in Purpose" — Heb 10:24-25</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// ==========================================
// 4. NEWS & FEED SECTION
// ==========================================
function NewsSection({ onOpenAuth }: { onOpenAuth: () => void }) {
  const { user, posts, createPost, uploadImageBase64, likePost, likes, addComment, getCommentsForPost } = useSEPAC();
  
  // Submit Post states
  const [showSubmit, setShowSubmit] = useState(false);
  const [postTitle, setPostTitle] = useState('');
  const [postCategory, setPostCategory] = useState<'News' | 'Events' | 'Devotional' | 'Announcement'>('News');
  const [postContent, setPostContent] = useState('');
  const [postImg, setPostImg] = useState('');
  const [uploadingImg, setUploadingImg] = useState(false);
  const [postError, setPostError] = useState('');
  const [postSuccess, setPostSuccess] = useState('');

  // Active Comments Section state
  const [expandedCommentsPost, setExpandedCommentsPost] = useState<string | null>(null);
  const [commentsMap, setCommentsMap] = useState<Record<string, Comment[]>>({});
  const [commentInput, setCommentInput] = useState('');

  const postFileRef = useRef<HTMLInputElement>(null);

  const approvedPosts = posts.filter(p => p.status === 'approved');

  // Handle post image upload base64
  const handlePostImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadingImg(true);
      setPostError('');
      
      try {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async () => {
          const url = await uploadImageBase64(reader.result as string, file.name.split('.').pop());
          if (url) {
            setPostImg(url);
          } else {
            setPostError('Post photo upload failed.');
          }
          setUploadingImg(false);
        };
      } catch (err) {
        setPostError('Error processing photo file.');
        setUploadingImg(false);
      }
    }
  };

  const handleSubmitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    setPostError('');
    setPostSuccess('');

    if (!postTitle || !postContent || !postCategory) {
      setPostError('Please fill out all required fields.');
      return;
    }

    const success = await createPost(postTitle, postContent, postCategory, postImg);
    if (success) {
      const isAutoApproved = user?.role === 'admin' || user?.role === 'super_admin' || user?.role === 'moderator';
      setPostSuccess(
        isAutoApproved 
          ? 'Post published successfully!' 
          : 'Post submitted for administrative review before going live.'
      );
      setPostTitle('');
      setPostContent('');
      setPostImg('');
      setTimeout(() => setShowSubmit(false), 3000);
    } else {
      setPostError('Failed to publish post onto server.');
    }
  };

  const loadComments = async (postId: string) => {
    try {
      const data = await getCommentsForPost(postId);
      setCommentsMap(prev => ({ ...prev, [postId]: data }));
    } catch (err) {
      console.error('Failed to load comments', err);
    }
  };

  const handleToggleComments = (postId: string) => {
    if (expandedCommentsPost === postId) {
      setExpandedCommentsPost(null);
    } else {
      setExpandedCommentsPost(postId);
      loadComments(postId);
    }
  };

  const handleSubmitComment = async (postId: string) => {
    if (!commentInput.trim()) return;
    const ok = await addComment(postId, commentInput);
    if (ok) {
      setCommentInput('');
      loadComments(postId);
    }
  };

  const getLikesCount = (postId: string) => {
    return likes.filter(l => l.post_id === postId).length;
  };

  const hasLiked = (postId: string) => {
    return user && likes.some(l => l.post_id === postId && l.user_id === user.id);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 font-sans">
      
      <div className="flex items-center justify-between border-b border-brand-gold/30 pb-4">
        <div>
          <h1 className="font-serif-display text-2xl sm:text-3xl font-bold text-brand-navy">
            Alumni News & Devotionals
          </h1>
          <p className="text-xs text-gray-500 mt-1">Read publications, spiritual devotionals, and notices from SEPAC.</p>
        </div>
        
        {user ? (
          <button
            onClick={() => {
              setShowSubmit(!showSubmit);
              setPostError('');
              setPostSuccess('');
            }}
            className="flex items-center space-x-1 px-4 py-2 bg-brand-navy hover:bg-brand-navy-light text-white text-xs font-bold rounded-lg uppercase tracking-wider transition-colors shadow"
          >
            <Plus size={14} />
            <span>Post something</span>
          </button>
        ) : (
          <button
            onClick={onOpenAuth}
            className="px-4 py-2 bg-brand-gold text-brand-navy text-xs font-bold rounded-lg uppercase tracking-wider hover:bg-white hover:text-brand-navy transition-all border border-brand-gold"
          >
            Login to post
          </button>
        )}
      </div>

      {/* Write Post Panel */}
      {showSubmit && (
        <div className="bg-white p-6 rounded-xl border border-brand-navy/15 shadow-md space-y-4">
          <h3 className="font-serif-display text-base font-bold text-brand-navy">Share news or devotional</h3>
          
          <form onSubmit={handleSubmitPost} className="space-y-4 text-xs">
            
            {postError && <p className="p-3 bg-red-50 text-red-700 rounded font-semibold">{postError}</p>}
            {postSuccess && <p className="p-3 bg-emerald-50 text-emerald-800 rounded font-semibold">{postSuccess}</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Headline Title *</label>
                <input
                  type="text"
                  required
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                  placeholder="e.g. Seeking Strength in Fellowship"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-brand-gold"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Category *</label>
                <select
                  value={postCategory}
                  onChange={(e: any) => setPostCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-brand-gold bg-white"
                >
                  <option value="News">News</option>
                  <option value="Devotional">Spiritual Devotional</option>
                  <option value="Events">Events</option>
                  <option value="Announcement">Announcement</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Post Content *</label>
              <textarea
                required
                rows={4}
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                placeholder="Share your spiritual encouragement, updates, or announcements with other alumni..."
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-brand-gold resize-none"
              />
            </div>

            {/* Post Base64 image attachment */}
            <div>
              <label className="block font-bold text-gray-700 mb-1">Attach Photo / Banner</label>
              <div
                onClick={() => postFileRef.current?.click()}
                className="border border-dashed border-gray-300 hover:border-brand-gold rounded-lg p-3 text-center cursor-pointer hover:bg-brand-cream/20 transition-all flex items-center justify-center space-x-2"
              >
                <input
                  ref={postFileRef}
                  type="file"
                  onChange={handlePostImageUpload}
                  accept="image/*"
                  className="hidden"
                />
                {postImg ? (
                  <div className="flex items-center space-x-2">
                    <img src={postImg} alt="Cover Preview" className="w-8 h-8 rounded object-cover" />
                    <span className="text-emerald-700 font-bold">Image attached successfully</span>
                  </div>
                ) : (
                  <>
                    <Upload size={14} className="text-brand-navy" />
                    <span>{uploadingImg ? 'Uploading cover...' : 'Click to select picture'}</span>
                  </>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={uploadingImg}
              className="w-full py-2.5 bg-brand-navy hover:bg-brand-navy-light text-white font-bold uppercase tracking-wider rounded-lg transition-colors"
            >
              Submit Publication
            </button>

          </form>
        </div>
      )}

      {/* Publications Stream */}
      {approvedPosts.length === 0 ? (
        <div className="p-12 text-center bg-white border rounded-xl text-gray-400 text-xs">
          No approved news articles available on the feed.
        </div>
      ) : (
        <div className="space-y-6">
          {approvedPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-xl border border-brand-navy/10 shadow-sm overflow-hidden flex flex-col">
              
              {/* Post Header */}
              <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={post.author_avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(post.author_name)}`}
                    alt={post.author_name}
                    className="w-9 h-9 rounded-full object-cover border"
                  />
                  <div>
                    <h3 className="text-xs font-bold text-gray-800">{post.author_name}</h3>
                    <p className="text-[10px] text-gray-400">{new Date(post.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
                
                <span className="px-2.5 py-0.5 bg-brand-navy text-brand-gold text-[10px] font-bold uppercase rounded-full">
                  {post.category}
                </span>
              </div>

              {/* Post Content */}
              <div className="p-5 space-y-4">
                <h2 className="font-serif-display text-lg font-bold text-brand-navy leading-snug">
                  {post.title}
                </h2>
                <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-wrap">
                  {post.content}
                </p>

                {post.image_url && (
                  <img
                    src={post.image_url}
                    alt={post.title}
                    className="w-full max-h-96 object-cover rounded-lg border border-brand-navy/10"
                  />
                )}
              </div>

              {/* Interaction Bar */}
              <div className="px-5 py-3 bg-brand-cream border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                <div className="flex space-x-4">
                  <button
                    onClick={() => likePost(post.id)}
                    className={`flex items-center space-x-1.5 font-bold transition-colors ${
                      hasLiked(post.id) ? 'text-blue-600' : 'hover:text-blue-600'
                    }`}
                  >
                    <ThumbsUp size={14} />
                    <span>{getLikesCount(post.id)} likes</span>
                  </button>

                  <button
                    onClick={() => handleToggleComments(post.id)}
                    className="flex items-center space-x-1.5 font-bold hover:text-brand-navy transition-colors"
                  >
                    <MessageSquare size={14} />
                    <span>Comments</span>
                  </button>
                </div>
              </div>

              {/* Expand Comments block */}
              {expandedCommentsPost === post.id && (
                <div className="px-5 py-4 border-t border-gray-100 bg-gray-50/50 space-y-4 text-xs">
                  <h4 className="font-bold text-brand-navy">Comments</h4>
                  
                  {/* Comments list */}
                  <div className="space-y-3">
                    {(commentsMap[post.id] || []).length === 0 ? (
                      <p className="text-[11px] text-gray-400 italic">No comments posted yet. Write an encouraging word!</p>
                    ) : (
                      (commentsMap[post.id] || []).map((comm) => (
                        <div key={comm.id} className="flex items-start space-x-2.5">
                          <img
                            src={comm.author_avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(comm.author_name)}`}
                            alt={comm.author_name}
                            className="w-7 h-7 rounded-full object-cover border"
                          />
                          <div className="bg-white p-2.5 rounded-lg border flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="font-bold text-gray-800 text-[11px]">{comm.author_name}</p>
                              <span className="text-[9px] text-gray-400">{new Date(comm.created_at).toLocaleDateString()}</span>
                            </div>
                            <p className="text-[11px] text-gray-600 leading-relaxed mt-0.5 whitespace-pre-wrap">{comm.content}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Add comment Form */}
                  {user ? (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Write an encouraging reply..."
                        value={commentInput}
                        onChange={(e) => setCommentInput(e.target.value)}
                        className="flex-1 text-xs px-3.5 py-2 rounded-lg border focus:outline-none focus:ring-1 focus:ring-brand-gold bg-white"
                        onKeyDown={(e) => e.key === 'Enter' && handleSubmitComment(post.id)}
                      />
                      <button
                        onClick={() => handleSubmitComment(post.id)}
                        className="px-4 py-2 bg-brand-navy hover:bg-brand-navy-light text-white font-bold rounded-lg uppercase tracking-wider"
                      >
                        Send
                      </button>
                    </div>
                  ) : (
                    <p className="text-[10px] text-amber-700 font-medium italic">
                      Please log in to participate in the conversation.
                    </p>
                  )}
                </div>
              )}

            </div>
          ))}
        </div>
      )}

    </div>
  );
}

// ==========================================
// 5. EVENTS SECTION
// ==========================================
function EventsSection({ onOpenAuth }: { onOpenAuth: () => void }) {
  const { user, events, rsvpEvent } = useSEPAC();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  const now = new Date();
  const upcoming = events.filter(e => new Date(e.date) >= now).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const past = events.filter(e => new Date(e.date) < now).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const currentList = activeTab === 'upcoming' ? upcoming : past;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 font-sans">
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-brand-gold/30 pb-4">
        <div>
          <h1 className="font-serif-display text-2xl sm:text-3xl font-bold text-brand-navy">Events & Assemblies</h1>
          <p className="text-xs text-gray-500 mt-1">Participate in our alumni gatherings, general assemblies, and worship nights.</p>
        </div>

        {/* Calendar toggles */}
        <div className="flex mt-4 sm:mt-0 border rounded-lg overflow-hidden shrink-0">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors ${
              activeTab === 'upcoming' ? 'bg-brand-navy text-brand-gold' : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors ${
              activeTab === 'past' ? 'bg-brand-navy text-brand-gold' : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Past Archives
          </button>
        </div>
      </div>

      {currentList.length === 0 ? (
        <div className="p-12 text-center bg-white border rounded-xl text-gray-400 text-xs">
          No assemblies scheduled in this category at this time.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {currentList.map((ev) => (
            <div key={ev.id} className="bg-white rounded-xl overflow-hidden border border-brand-navy/10 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                {ev.image_url && (
                  <img src={ev.image_url} alt={ev.title} className="w-full h-48 object-cover" />
                )}
                
                <div className="p-5 space-y-3">
                  <h3 className="font-serif-display text-lg font-bold text-brand-navy leading-snug">
                    {ev.title}
                  </h3>
                  
                  <div className="space-y-1 text-xs text-gray-500">
                    <p className="flex items-center">
                      <CalendarIcon size={14} className="mr-2 text-brand-gold shrink-0" />
                      <span>{new Date(ev.date).toLocaleString()}</span>
                    </p>
                    <p className="flex items-center">
                      <MapPin size={14} className="mr-2 text-brand-gold shrink-0" />
                      <span>{ev.location}</span>
                    </p>
                  </div>

                  <p className="text-xs text-gray-600 leading-relaxed">
                    {ev.description}
                  </p>
                </div>
              </div>

              <div className="p-5 border-t border-gray-100 bg-brand-cream flex items-center justify-between text-xs">
                <span className="font-bold text-brand-navy">
                  {ev.rsvps.length} alumni going
                </span>

                {activeTab === 'upcoming' && (
                  user ? (
                    <button
                      onClick={() => rsvpEvent(ev.id)}
                      className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
                        ev.rsvps.includes(user.id)
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                          : 'bg-brand-navy hover:bg-brand-navy-light text-white'
                      }`}
                    >
                      {ev.rsvps.includes(user.id) ? 'Going ✓' : 'RSVP'}
                    </button>
                  ) : (
                    <button
                      onClick={onOpenAuth}
                      className="px-3 py-1.5 border border-brand-gold text-brand-navy font-bold rounded-lg uppercase tracking-wider text-[10px] hover:bg-white"
                    >
                      Login to RSVP
                    </button>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

// ==========================================
// 6. GALLERY SECTION
// ==========================================
function GallerySection() {
  const { user, gallery, uploadPhoto, uploadImageBase64 } = useSEPAC();
  
  const [showUpload, setShowUpload] = useState(false);
  const [uploadTag, setUploadTag] = useState('');
  const [uploadUrl, setUploadUrl] = useState('');
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState('');

  const photoFileRef = useRef<HTMLInputElement>(null);

  const approvedPhotos = gallery.filter(g => g.approved);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadingPhoto(true);
      setUploadError('');
      
      try {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async () => {
          const url = await uploadImageBase64(reader.result as string, file.name.split('.').pop());
          if (url) {
            setUploadUrl(url);
          } else {
            setUploadError('Photo file upload failed.');
          }
          setUploadingPhoto(false);
        };
      } catch (err) {
        setUploadError('Error processing picture.');
        setUploadingPhoto(false);
      }
    }
  };

  const handleSubmitPhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploadError('');
    setUploadSuccess('');

    if (!uploadUrl || !uploadTag) {
      setUploadError('Please select a photo and enter a descriptive tag.');
      return;
    }

    const ok = await uploadPhoto(uploadUrl, uploadTag);
    if (ok) {
      const isAutoApproved = user?.role === 'admin' || user?.role === 'super_admin' || user?.role === 'moderator';
      setUploadSuccess(
        isAutoApproved 
          ? 'Photo posted successfully!' 
          : 'Photo uploaded! It will be visible in the gallery once approved by an administrator.'
      );
      setUploadTag('');
      setUploadUrl('');
      setTimeout(() => setShowUpload(false), 4000);
    } else {
      setUploadError('Failed to publish photo metadata.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 font-sans">
      
      <div className="flex items-center justify-between border-b border-brand-gold/30 pb-4">
        <div>
          <h1 className="font-serif-display text-2xl sm:text-3xl font-bold text-brand-navy">Community Gallery</h1>
          <p className="text-xs text-gray-500 mt-1">Cherish the beautiful memories of our assemblies and activities.</p>
        </div>

        {user && (
          <button
            onClick={() => {
              setShowUpload(!showUpload);
              setUploadError('');
              setUploadSuccess('');
            }}
            className="flex items-center space-x-1 px-4 py-2 bg-brand-navy hover:bg-brand-navy-light text-white text-xs font-bold rounded-lg uppercase tracking-wider transition-colors shadow"
          >
            <Plus size={14} />
            <span>Upload Photo</span>
          </button>
        )}
      </div>

      {showUpload && (
        <div className="bg-white p-6 rounded-xl border border-brand-navy/15 shadow-md max-w-lg mx-auto">
          <h3 className="font-serif-display text-base font-bold text-brand-navy mb-3">Upload Gallery Image</h3>
          
          <form onSubmit={handleSubmitPhoto} className="space-y-4 text-xs">
            {uploadError && <p className="p-3 bg-red-50 text-red-700 rounded font-semibold">{uploadError}</p>}
            {uploadSuccess && <p className="p-3 bg-emerald-50 text-emerald-800 rounded font-semibold">{uploadSuccess}</p>}

            <div>
              <label className="block font-bold text-gray-700 mb-1">Event Tag / Year *</label>
              <input
                type="text"
                required
                value={uploadTag}
                onChange={(e) => setUploadTag(e.target.value)}
                placeholder="e.g. General Assembly 2025"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-brand-gold bg-white"
              />
            </div>

            {/* Base64 Gallery drag and drop file box */}
            <div>
              <label className="block font-bold text-gray-700 mb-1">Select Photo *</label>
              <div
                onClick={() => photoFileRef.current?.click()}
                className="border-2 border-dashed border-gray-300 hover:border-brand-gold rounded-lg p-6 text-center cursor-pointer hover:bg-brand-cream/20 transition-all flex flex-col items-center justify-center space-y-2"
              >
                <input
                  ref={photoFileRef}
                  type="file"
                  onChange={handlePhotoUpload}
                  accept="image/*"
                  className="hidden"
                />
                {uploadUrl ? (
                  <div className="space-y-2">
                    <img src={uploadUrl} alt="Gallery Preview" className="max-h-40 rounded object-cover mx-auto border" />
                    <p className="text-emerald-700 font-bold">Image loaded successfully</p>
                  </div>
                ) : (
                  <>
                    <Upload size={24} className="text-brand-navy" />
                    <span className="font-medium text-gray-600">
                      {uploadingPhoto ? 'Uploading cover...' : 'Drag and drop or click to upload gallery photo'}
                    </span>
                  </>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={uploadingPhoto || !uploadUrl}
              className="w-full py-2.5 bg-brand-navy hover:bg-brand-navy-light disabled:bg-gray-300 text-white font-bold uppercase tracking-wider rounded-lg transition-colors"
            >
              Post Photo
            </button>

          </form>
        </div>
      )}

      {approvedPhotos.length === 0 ? (
        <div className="p-12 text-center bg-white border rounded-xl text-gray-400 text-xs">
          No approved photos in the gallery yet. Be the first to upload!
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {approvedPhotos.map((photo) => (
            <div key={photo.id} className="bg-white rounded-xl overflow-hidden border border-brand-navy/15 shadow-sm group hover:shadow-md transition-shadow">
              <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                <img
                  src={photo.image_url}
                  alt={photo.event_tag}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 space-y-1 text-xs">
                <p className="font-bold text-brand-navy truncate">{photo.event_tag}</p>
                <p className="text-[10px] text-gray-400">by {photo.uploader_name}</p>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

// ==========================================
// 7. PRAYER WALL SECTION
// ==========================================
function PrayersSection({ onOpenAuth }: { onOpenAuth: (mode?: 'login' | 'register') => void }) {
  const { user, prayerRequests, submitPrayer, prayForRequest, addPrayerComment } = useSEPAC();
  
  const [content, setContent] = useState('');
  const [visibility, setVisibility] = useState<'public' | 'private'>('public');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Encouragement states
  const [commentingId, setCommentingId] = useState<string | null>(null);
  const [commentInput, setCommentInput] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSubmitting(true);

    if (!content.trim()) {
      setError('Please type your prayer request.');
      setSubmitting(false);
      return;
    }

    const ok = await submitPrayer(content, visibility);
    if (ok) {
      setSuccess('Your prayer request has been published to the wall.');
      setContent('');
    } else {
      setError('Failed to submit prayer request.');
    }
    setSubmitting(false);
  };

  const handleSendEncouragement = async (id: string) => {
    if (!commentInput.trim()) return;
    const ok = await addPrayerComment(id, commentInput);
    if (ok) {
      setCommentInput('');
      setCommentingId(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 font-sans">
      
      <div>
        <h1 className="font-serif-display text-2xl sm:text-3xl font-bold text-brand-navy">SEPAC Prayer Wall</h1>
        <p className="text-xs text-gray-500 mt-1">"Carry each other’s burdens, and in this way you will fulfill the law of Christ." — Galatians 6:2</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Submit Form */}
        <div className="bg-white p-5 rounded-xl border border-brand-navy/15 shadow-sm space-y-4 lg:sticky lg:top-24">
          <h3 className="font-serif-display text-base font-bold text-brand-navy border-b border-brand-gold/20 pb-2">
            Share a Prayer Request
          </h3>

          {user ? (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              {error && <p className="p-2 bg-red-50 text-red-700 rounded font-medium">{error}</p>}
              {success && <p className="p-2 bg-emerald-50 text-emerald-800 rounded font-medium">{success}</p>}

              <div>
                <label className="block font-bold text-gray-700 mb-1">Your Request *</label>
                <textarea
                  required
                  rows={4}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="How can your SEPAC alumni family pray for you today?"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-brand-gold resize-none"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Visibility</label>
                <select
                  value={visibility}
                  onChange={(e: any) => setVisibility(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-brand-gold bg-white"
                >
                  <option value="public">Public (Everyone can see)</option>
                  <option value="private">Members Only</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-2.5 bg-brand-navy hover:bg-brand-navy-light text-white font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
              >
                Post Prayer Request
              </button>

            </form>
          ) : (
            <div className="space-y-4 text-center py-4">
              <p className="text-xs text-gray-500 leading-relaxed">
                Join our SEPAC Prayer Union to share your prayer requests, pray for others, and reply with encouragement.
              </p>
              <div className="space-y-2">
                <button
                  onClick={() => onOpenAuth('login')}
                  className="w-full bg-brand-navy hover:bg-brand-navy-light text-white font-bold py-2.5 rounded-lg text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md"
                >
                  Sign In / Login
                </button>
                <button
                  onClick={() => onOpenAuth('register')}
                  className="w-full bg-transparent border border-gray-300 text-brand-navy hover:bg-gray-50 font-bold py-2.5 rounded-lg text-xs uppercase tracking-wider transition-all cursor-pointer"
                >
                  Sign Up / Register
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Requests List */}
        <div className="lg:col-span-2 space-y-6">
          {prayerRequests.length === 0 ? (
            <div className="p-12 text-center bg-white border rounded-xl text-gray-400 text-xs">
              No prayer requests shared yet. Keep our community in prayer.
            </div>
          ) : (
            prayerRequests.map((req) => (
              <div key={req.id} className="bg-white p-5 rounded-xl border border-brand-navy/10 shadow-sm space-y-4">
                
                {/* Author info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={req.author_avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(req.author_name)}`}
                      alt={req.author_name}
                      className="w-8 h-8 rounded-full object-cover border"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-gray-800">{req.author_name}</h4>
                      <p className="text-[10px] text-gray-400">{new Date(req.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                    req.visibility === 'public' ? 'bg-blue-50 text-blue-700' : 'bg-purple-50 text-purple-700'
                  }`}>
                    {req.visibility === 'public' ? 'Public' : 'Members Only'}
                  </span>
                </div>

                {/* Content */}
                <p className="text-xs text-gray-700 leading-relaxed font-serif-display italic bg-brand-cream p-3 rounded-lg border-l-4 border-brand-gold">
                  "{req.content}"
                </p>

                {/* Pray Reactions */}
                <div className="flex items-center justify-between text-xs">
                  <button
                    onClick={() => prayForRequest(req.id)}
                    className={`flex items-center space-x-1.5 font-bold transition-all ${
                      user && req.praying_users.includes(user.id) ? 'text-amber-600Scale' : 'text-gray-500 hover:text-amber-600'
                    }`}
                  >
                    <Heart size={14} className={user && req.praying_users.includes(user.id) ? 'fill-amber-500 text-amber-500' : ''} />
                    <span>{req.praying_users.length} praying with them</span>
                  </button>

                  <button
                    onClick={() => setCommentingId(commentingId === req.id ? null : req.id)}
                    className="text-brand-navy hover:underline font-bold"
                  >
                    Send Encouragement reply ({req.comments.length})
                  </button>
                </div>

                {/* Encouragements List / Comments */}
                <div className="space-y-3 bg-gray-50 p-4 rounded-lg border border-gray-100 text-[11px]">
                  
                  {req.comments.length > 0 && (
                    <div className="space-y-3 divide-y divide-gray-200/50">
                      {req.comments.map((comm) => (
                        <div key={comm.id} className="pt-2 flex items-start space-x-2.5">
                          <img
                            src={comm.author_avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(comm.author_name)}`}
                            alt={comm.author_name}
                            className="w-6 h-6 rounded-full object-cover border mt-0.5"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between font-semibold text-gray-700">
                              <span>{comm.author_name}</span>
                              <span className="text-[9px] text-gray-400 font-normal">{new Date(comm.created_at).toLocaleDateString()}</span>
                            </div>
                            <p className="text-gray-600 mt-0.5 leading-relaxed">{comm.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {commentingId === req.id && (
                    <div className="flex gap-2 pt-2 border-t border-gray-200 mt-2">
                      <input
                        type="text"
                        placeholder="Type a word of faith and encouragement..."
                        value={commentInput}
                        onChange={(e) => setCommentInput(e.target.value)}
                        className="flex-1 text-xs px-3 py-1.5 rounded border focus:outline-none focus:ring-1 focus:ring-brand-gold bg-white"
                        onKeyDown={(e) => e.key === 'Enter' && handleSendEncouragement(req.id)}
                      />
                      <button
                        onClick={() => handleSendEncouragement(req.id)}
                        className="px-3 py-1.5 bg-brand-navy hover:bg-brand-navy-light text-white font-bold rounded"
                      >
                        Send
                      </button>
                    </div>
                  )}

                </div>

              </div>
            ))
          )}
        </div>

      </div>

    </div>
  );
}

// ==========================================
// 8. CONTACT SECTION
// ==========================================
function ContactSection() {
  const { t, siteSettings, lang } = useSEPAC();
  const [name, setName] = useState('');
  const [msg, setMsg] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !userEmail || !msg) return;
    setSuccess(true);
    setName('');
    setUserEmail('');
    setMsg('');
    setTimeout(() => setSuccess(false), 5000);
  };

  const email = siteSettings?.contacts?.email || 'sepacnyanza@gmail.com';
  const phones = siteSettings?.contacts?.phones || ['+250 796 409 467', '+250 786 047 305', '+250 796 379 882'];
  const address = (lang === 'rw' ? siteSettings?.contacts?.address_rw : siteSettings?.contacts?.address_en) || 'ES Saint Esprit, Nyanza, Rwanda';

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 font-sans">
      
      <div className="text-center">
        <h1 className="font-serif-display text-2xl sm:text-3xl font-bold text-brand-navy">{t('contactPage.title')}</h1>
        <p className="text-xs text-gray-500 mt-1">Do you have questions, contributions, or seek pastoral counselling? Reach out to SEPAC leadership.</p>
        <div className="h-0.5 w-12 bg-brand-gold mx-auto mt-2" />
      </div>

      {/* Contact Form */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-brand-navy/10 shadow-sm max-w-xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {success && (
            <p className="p-3 bg-emerald-50 text-emerald-800 rounded font-semibold">
              {t('contactPage.success')}
            </p>
          )}

          <div>
            <label className="block font-bold text-gray-700 mb-1">{t('contactPage.name')} *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Eric Kalisa"
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-brand-gold"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">{t('contactPage.email')} *</label>
            <input
              type="email"
              required
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder="eric.kalisa@gmail.com"
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-brand-gold"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">{t('contactPage.message')} *</label>
            <textarea
              required
              rows={5}
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              placeholder="Write your query, suggestions, or spiritual prayer requests..."
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-brand-gold resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-brand-navy hover:bg-brand-navy-light text-white font-bold uppercase tracking-wider rounded-lg transition-colors shadow cursor-pointer"
          >
            {t('contactPage.send')}
          </button>
        </form>
      </div>

      {/* Contact Info at the Bottom ("Contact Down") */}
      <div className="border-t border-gray-200 pt-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center max-w-2xl mx-auto">
          
          {/* Location */}
          <div className="flex flex-col items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
            <div className="bg-brand-gold/10 p-2.5 rounded-full text-brand-gold mb-2">
              <MapPin size={18} />
            </div>
            <h4 className="text-xs font-bold text-brand-navy uppercase tracking-wider mb-1">Our Location</h4>
            <p className="text-[11px] text-gray-600 font-medium">{address}</p>
          </div>

          {/* Email */}
          <div className="flex flex-col items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
            <div className="bg-brand-gold/10 p-2.5 rounded-full text-brand-gold mb-2">
              <Mail size={18} />
            </div>
            <h4 className="text-xs font-bold text-brand-navy uppercase tracking-wider mb-1">Email Us</h4>
            <p className="text-[11px] text-gray-600 font-semibold select-all">{email}</p>
          </div>

          {/* Phones */}
          <div className="flex flex-col items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
            <div className="bg-brand-gold/10 p-2.5 rounded-full text-brand-gold mb-2">
              <Phone size={18} />
            </div>
            <h4 className="text-xs font-bold text-brand-navy uppercase tracking-wider mb-1">Call Us</h4>
            <div className="text-[11px] text-gray-600 font-semibold space-y-1">
              {phones.map((phone, i) => (
                <p key={i}>
                  <a href={`tel:${phone.replace(/\s+/g, '')}`} className="hover:text-brand-gold transition-colors">
                    {phone}
                  </a>
                </p>
              ))}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

// ==========================================
// 9. PROFILE SECTION
// ==========================================
function ProfileSection() {
  const { user, updateProfile, uploadImageBase64, logout, t } = useSEPAC();
  
  const [name, setName] = useState(user?.name || '');
  const [gradYear, setGradYear] = useState(user?.graduation_year?.toString() || '');
  const [yearsStudied, setYearsStudied] = useState(user?.years_studied || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [avatar, setAvatar] = useState(user?.avatar_url || '');
  const [schoolPhoto, setSchoolPhoto] = useState(user?.school_photo_url || '');
  
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [uploadingSchool, setUploadingSchool] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const avatarInputRef = useRef<HTMLInputElement>(null);
  const schoolInputRef = useRef<HTMLInputElement>(null);

  if (!user) return null;

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadingAvatar(true);
      setError('');
      
      try {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async () => {
          const url = await uploadImageBase64(reader.result as string, file.name.split('.').pop());
          if (url) {
            setAvatar(url);
          } else {
            setError('Profile picture upload failed.');
          }
          setUploadingAvatar(false);
        };
      } catch (err) {
        setError('Error processing picture.');
        setUploadingAvatar(false);
      }
    }
  };

  const handleSchoolPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadingSchool(true);
      setError('');
      
      try {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async () => {
          const url = await uploadImageBase64(reader.result as string, file.name.split('.').pop());
          if (url) {
            setSchoolPhoto(url);
          } else {
            setError('School/graduation photo upload failed.');
          }
          setUploadingSchool(false);
        };
      } catch (err) {
        setError('Error processing school photo.');
        setUploadingSchool(false);
      }
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!name || !gradYear) {
      setError('Please fill in required fields.');
      return;
    }

    const ok = await updateProfile({
      name,
      graduation_year: Number(gradYear),
      years_studied: yearsStudied,
      phone,
      bio,
      avatar_url: avatar,
      school_photo_url: schoolPhoto
    });

    if (ok) {
      setSuccess('Profile updated successfully!');
    } else {
      setError('Failed to update profile.');
    }
  };

  const memberId = `SEPAC-ST-${gradYear || '2015'}-${user.id.substring(user.id.length - 4).toUpperCase()}`;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 font-sans space-y-8">
      
      {/* 1. SEPAC Alumni Digital Identification Card */}
      <div className="text-center">
        <h2 className="font-serif-display text-2xl font-bold text-brand-navy mb-1 tracking-tight">
          Alumni Account Portal
        </h2>
        <p className="text-xs text-gray-500">Your personalized identification and community credential</p>
      </div>

      <div className="relative bg-brand-navy border-2 border-brand-gold rounded-2xl p-6 text-white shadow-xl overflow-hidden max-w-xl mx-auto">
        {/* Subtle Watermark Seal */}
        <div className="absolute right-0 bottom-0 opacity-10 translate-x-12 translate-y-12 pointer-events-none">
          <SEPACSeal size={280} />
        </div>

        {/* Card Header */}
        <div className="flex items-center justify-between border-b border-brand-gold/30 pb-4 mb-4 relative z-10">
          <div className="flex items-center space-x-2">
            <SEPACSeal size={42} className="bg-white rounded-full p-0.5 border border-brand-gold" />
            <div>
              <h3 className="font-serif-display text-base font-bold tracking-tight text-white leading-none">SEPAC ALUMNI</h3>
              <p className="text-[8px] uppercase tracking-widest text-brand-gold font-bold">ES Saint Esprit de Nyanza</p>
            </div>
          </div>
          <div className="text-right">
            <span className={`inline-block px-2 py-0.5 text-[8px] uppercase tracking-wider font-bold rounded ${
              user.approved ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
            }`}>
              {user.approved ? 'Verified Alumni' : 'Pending Review'}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          {/* Avatar and School Photo */}
          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="relative">
              <img
                src={avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`}
                alt={name}
                className="w-24 h-24 rounded-full object-cover border-2 border-brand-gold shadow"
              />
              <span className="absolute bottom-0 right-1 w-4 h-4 bg-emerald-500 border-2 border-brand-navy rounded-full" />
            </div>
            {schoolPhoto && (
              <div className="text-center">
                <p className="text-[8px] text-brand-gold/80 font-bold uppercase tracking-wider mb-1">School Memory</p>
                <img
                  src={schoolPhoto}
                  alt="School Memory"
                  className="w-16 h-16 rounded object-cover border border-white/20 shadow-sm"
                />
              </div>
            )}
          </div>

          {/* Identification Details */}
          <div className="md:col-span-2 space-y-3 text-xs self-center">
            <div className="space-y-1">
              <p className="text-[9px] uppercase text-brand-gold/80 font-bold tracking-wider">Full Name</p>
              <p className="text-base font-bold font-serif-display text-white tracking-wide">{name || user.name}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-[9px] uppercase text-brand-gold/80 font-bold tracking-wider">Graduation Year</p>
                <p className="font-semibold text-white">{gradYear || user.graduation_year || 'N/A'}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[9px] uppercase text-brand-gold/80 font-bold tracking-wider">Years Studied</p>
                <p className="font-semibold text-white">{yearsStudied || user.years_studied || 'N/A'}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-1">
              <div className="space-y-1">
                <p className="text-[9px] uppercase text-brand-gold/80 font-bold tracking-wider">Member ID</p>
                <p className="font-mono text-[10px] text-gray-300 font-semibold">{memberId}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[9px] uppercase text-brand-gold/80 font-bold tracking-wider">Role</p>
                <p className="font-semibold text-brand-gold uppercase tracking-wider text-[9px]">{user.role?.replace('_', ' ')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Card Footer scripture */}
        <div className="border-t border-brand-gold/20 pt-3 mt-4 text-center">
          <p className="text-[9px] italic text-gray-300">"Together in Christ, Stronger in Purpose" — Heb 10:24-25</p>
        </div>
      </div>

      {/* 2. Editing Portal Form */}
      <div className="bg-white rounded-2xl border border-brand-navy/15 shadow-sm overflow-hidden max-w-xl mx-auto">
        <div className="bg-brand-navy text-white px-6 py-4 border-b border-brand-gold/40 flex justify-between items-center">
          <h3 className="font-serif-display text-sm font-bold tracking-wide text-brand-gold">Update Account Identification</h3>
          <span className="text-[9px] uppercase text-brand-gold/80 font-bold">ES Saint Esprit</span>
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-5 text-xs">
          
          {error && <p className="p-3 bg-red-50 text-red-700 rounded font-medium">{error}</p>}
          {success && <p className="p-3 bg-emerald-50 text-emerald-800 rounded font-medium">{success}</p>}

          {/* Photo upload blocks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gray-100 pb-5">
            {/* Profile Avatar Upload */}
            <div className="flex flex-col items-center p-3 bg-brand-cream/40 rounded-xl border border-brand-navy/5">
              <span className="text-[10px] font-bold text-gray-700 uppercase mb-2">Profile Picture</span>
              <img
                src={avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`}
                alt="Avatar"
                className="w-16 h-16 rounded-full object-cover border-2 border-brand-gold shadow mb-2"
              />
              <input
                ref={avatarInputRef}
                type="file"
                onChange={handleAvatarUpload}
                accept="image/*"
                className="hidden"
              />
              <button
                type="button"
                onClick={() => avatarInputRef.current?.click()}
                className="px-3 py-1 bg-white border border-gray-300 hover:border-brand-gold text-brand-navy font-bold rounded-lg uppercase text-[9px] transition-all"
              >
                {uploadingAvatar ? 'Uploading...' : 'Change Avatar'}
              </button>
            </div>

            {/* Graduation/School Photo Upload */}
            <div className="flex flex-col items-center p-3 bg-brand-cream/40 rounded-xl border border-brand-navy/5">
              <span className="text-[10px] font-bold text-gray-700 uppercase mb-2">School/Grad Photo</span>
              {schoolPhoto ? (
                <img
                  src={schoolPhoto}
                  alt="School Memory"
                  className="w-16 h-16 rounded object-cover border-2 border-brand-gold shadow mb-2"
                />
              ) : (
                <div className="w-16 h-16 rounded border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 bg-gray-50 mb-2">
                  <Upload size={18} />
                </div>
              )}
              <input
                ref={schoolInputRef}
                type="file"
                onChange={handleSchoolPhotoUpload}
                accept="image/*"
                className="hidden"
              />
              <button
                type="button"
                onClick={() => schoolInputRef.current?.click()}
                className="px-3 py-1 bg-white border border-gray-300 hover:border-brand-gold text-brand-navy font-bold rounded-lg uppercase text-[9px] transition-all"
              >
                {uploadingSchool ? 'Uploading...' : 'Upload School Photo'}
              </button>
            </div>
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">Full Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-brand-gold"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-gray-700 mb-1">Graduation Year *</label>
              <input
                type="number"
                required
                value={gradYear}
                onChange={(e) => setGradYear(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-brand-gold"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-1">Years Studied at ES Saint Esprit</label>
              <input
                type="text"
                value={yearsStudied}
                onChange={(e) => setYearsStudied(e.target.value)}
                placeholder="e.g. 2012 - 2015"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-brand-gold"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+250 788 123 456"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-brand-gold"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">Short Bio & Testimony</label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us about your faith journey and life path after school..."
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-brand-gold resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-brand-navy hover:bg-brand-navy-light text-white font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
          >
            Save Account Portal Changes
          </button>

          {/* Secure Sign Out Section */}
          <div className="border-t border-gray-100 pt-5 mt-5">
            <button
              type="button"
              onClick={() => {
                logout();
                window.location.reload();
              }}
              className="w-full py-2.5 bg-red-50 hover:bg-red-100 text-red-700 hover:text-red-800 font-bold uppercase tracking-wider rounded-lg transition-colors border border-red-200 cursor-pointer"
            >
              Sign Out / Logout
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

// ==========================================
// 10. ADVERTISEMENTS SECTION
// ==========================================
function AdvertsSection() {
  const { advertisements, t } = useSEPAC();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 font-sans">
      <div className="text-center mb-10">
        <h2 className="font-serif-display text-3xl font-bold text-brand-navy mb-2 tracking-tight">
          {t('nav.adverts')}
        </h2>
        <div className="w-24 h-1 bg-brand-gold mx-auto mb-4 rounded-full"></div>
        <p className="text-sm text-gray-500 max-w-xl mx-auto">
          Discover campaigns, alumni businesses, merchandise, and announcements hosted by our fellow Saint Esprit alumni.
        </p>
      </div>

      {advertisements.length === 0 ? (
        <div className="bg-white border border-gray-150 p-12 text-center rounded-xl shadow-sm max-w-xl mx-auto">
          <p className="text-gray-500 font-medium mb-3">No active advertisements at this time.</p>
          <p className="text-xs text-gray-400">
            Are you an alumnus wishing to advertise your business, services, or events to the community? Contact the SEPAC executive committee via the Contact tab!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advertisements.map((ad) => (
            <div key={ad.id} className="bg-white border border-brand-navy/10 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col h-full">
              {ad.image_url && (
                <img
                  src={ad.image_url}
                  alt={ad.title}
                  className="w-full h-48 object-cover border-b border-gray-100"
                />
              )}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-brand-gold tracking-wider block mb-1">
                    Alumni Campaign & Ad
                  </span>
                  <h3 className="font-serif-display text-lg font-bold text-brand-navy mb-2">
                    {ad.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed mb-4 whitespace-pre-line">
                    {ad.description}
                  </p>
                </div>
                
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  {ad.link ? (
                    <a
                      href={ad.link.startsWith('http') ? ad.link : `https://${ad.link}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-brand-navy text-white font-bold rounded-lg text-[10px] uppercase tracking-wider hover:bg-brand-navy-light transition-colors inline-flex items-center space-x-1"
                    >
                      <span>Visit Website</span>
                      <ExternalLink size={10} />
                    </a>
                  ) : (
                    <span className="text-[10px] text-gray-400 italic">No link provided</span>
                  )}
                  <span className="text-[9px] text-gray-400">
                    {new Date(ad.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
