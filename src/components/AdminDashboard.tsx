import React, { useState, useRef } from 'react';
import { useSEPAC } from '../context/SEPACContext';
import { UserRole } from '../types';

// Emails that can never be removed via the dashboard (must match the list
// in supabase-schema.sql's handle_new_user() trigger).
const SUPER_ADMIN_EMAILS = ['jemuvalos@gmail.com', 'ian.mugisha011@gmail.com'];
import { 
  Users, 
  FileText, 
  Calendar, 
  Image as ImageIcon, 
  Megaphone, 
  ShieldCheck, 
  Check, 
  X, 
  Upload, 
  CheckCircle, 
  TrendingUp,
  Settings,
  Plus,
  Trash2,
  Edit,
  Save,
  BookOpen,
  Sparkles
} from 'lucide-react';

export default function AdminDashboard() {
  const { 
    user, 
    members, 
    posts, 
    events, 
    gallery, 
    prayerRequests,
    announcements, 
    advertisements,
    analytics,
    siteSettings,
    approveMember, 
    updateMemberRole,
    deleteMember,
    updatePostStatus, 
    deletePost,
    createEvent, 
    approvePhoto, 
    createAnnouncement,
    deleteAnnouncement,
    createAdvertisement,
    deleteAdvertisement,
    uploadPhoto,
    uploadImageBase64,
    deleteEvent,
    updateEvent,
    deleteGalleryItem,
    deletePrayerRequest,
    deletePrayerComment,
    updateSiteSettings
  } = useSEPAC();

  const [activeSection, setActiveSection] = useState<'analytics' | 'members' | 'posts' | 'events' | 'gallery' | 'prayers' | 'announcements' | 'advertisements' | 'site_settings'>('analytics');

  
  // Event Form State
  const [eventTitle, setEventTitle] = useState('');
  const [eventDesc, setEventDesc] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventImgUrl, setEventImgUrl] = useState('');
  const [uploadingEventImg, setUploadingEventImg] = useState(false);
  const [eventError, setEventError] = useState('');
  const [eventSuccess, setEventSuccess] = useState('');
  const eventFileRef = useRef<HTMLInputElement>(null);

  // Announcement Form State
  const [annTitle, setAnnTitle] = useState('');
  const [annBody, setAnnBody] = useState('');
  const [annSentBy, setAnnSentBy] = useState('Executive Committee');
  const [annError, setAnnError] = useState('');
  const [annSuccess, setAnnSuccess] = useState('');

  // Admin Direct Photo Upload State
  const [directPhotoTag, setDirectPhotoTag] = useState('');
  const [directPhotoUrl, setDirectPhotoUrl] = useState('');
  const [uploadingDirectPhoto, setUploadingDirectPhoto] = useState(false);
  const [directPhotoError, setDirectPhotoError] = useState('');
  const [directPhotoSuccess, setDirectPhotoSuccess] = useState('');
  const directPhotoFileRef = useRef<HTMLInputElement>(null);

  // Advertisement Form State
  const [adTitle, setAdTitle] = useState('');
  const [adDesc, setAdDesc] = useState('');
  const [adLink, setAdLink] = useState('');
  const [adImgUrl, setAdImgUrl] = useState('');
  const [uploadingAdImg, setUploadingAdImg] = useState(false);
  const [adError, setAdError] = useState('');
  const [adSuccess, setAdSuccess] = useState('');
  const adFileRef = useRef<HTMLInputElement>(null);

  // Event Editing State
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [editEventTitle, setEditEventTitle] = useState('');
  const [editEventDesc, setEditEventDesc] = useState('');
  const [editEventDate, setEditEventDate] = useState('');
  const [editEventLocation, setEditEventLocation] = useState('');
  const [editEventImgUrl, setEditEventImgUrl] = useState('');
  const [uploadingEditEventImg, setUploadingEditEventImg] = useState(false);
  const editEventFileRef = useRef<HTMLInputElement>(null);

  // Site Content settings states
  const [historyTitleEn, setHistoryTitleEn] = useState('');
  const [historyTitleRw, setHistoryTitleRw] = useState('');
  const [historyText1En, setHistoryText1En] = useState('');
  const [historyText1Rw, setHistoryText1Rw] = useState('');
  const [historyText2En, setHistoryText2En] = useState('');
  const [historyText2Rw, setHistoryText2Rw] = useState('');

  const [missionTitleEn, setMissionTitleEn] = useState('');
  const [missionTitleRw, setMissionTitleRw] = useState('');
  const [missionTextEn, setMissionTextEn] = useState('');
  const [missionTextRw, setMissionTextRw] = useState('');

  const [visionTitleEn, setVisionTitleEn] = useState('');
  const [visionTitleRw, setVisionTitleRw] = useState('');
  const [visionTextEn, setVisionTextEn] = useState('');
  const [visionTextRw, setVisionTextRw] = useState('');

  const [contactsEmail, setContactsEmail] = useState('');
  const [contactsAddressEn, setContactsAddressEn] = useState('');
  const [contactsAddressRw, setContactsAddressRw] = useState('');
  const [contactsPhones, setContactsPhones] = useState<string[]>([]);
  const [newPhoneInput, setNewPhoneInput] = useState('');

  // Adding leader states
  const [newLeaderName, setNewLeaderName] = useState('');
  const [newLeaderRoleEn, setNewLeaderRoleEn] = useState('');
  const [newLeaderRoleRw, setNewLeaderRoleRw] = useState('');
  const [newLeaderYear, setNewLeaderYear] = useState(2020);
  const [newLeaderAvatar, setNewLeaderAvatar] = useState('');
  const [uploadingLeaderAvatar, setUploadingLeaderAvatar] = useState(false);
  const leaderAvatarFileRef = useRef<HTMLInputElement>(null);

  const [settingsError, setSettingsError] = useState('');
  const [settingsSuccess, setSettingsSuccess] = useState('');

  // Populate form from context on mount/change
  React.useEffect(() => {
    if (siteSettings) {
      setHistoryTitleEn(siteSettings.historyTitle_en || '');
      setHistoryTitleRw(siteSettings.historyTitle_rw || '');
      setHistoryText1En(siteSettings.historyText1_en || '');
      setHistoryText1Rw(siteSettings.historyText1_rw || '');
      setHistoryText2En(siteSettings.historyText2_en || '');
      setHistoryText2Rw(siteSettings.historyText2_rw || '');

      setMissionTitleEn(siteSettings.missionTitle_en || '');
      setMissionTitleRw(siteSettings.missionTitle_rw || '');
      setMissionTextEn(siteSettings.missionText_en || '');
      setMissionTextRw(siteSettings.missionText_rw || '');

      setVisionTitleEn(siteSettings.visionTitle_en || '');
      setVisionTitleRw(siteSettings.visionTitle_rw || '');
      setVisionTextEn(siteSettings.visionText_en || '');
      setVisionTextRw(siteSettings.visionText_rw || '');

      setContactsEmail(siteSettings.contacts?.email || '');
      setContactsAddressEn(siteSettings.contacts?.address_en || '');
      setContactsAddressRw(siteSettings.contacts?.address_rw || '');
      setContactsPhones(siteSettings.contacts?.phones || []);
    }
  }, [siteSettings]);

  const isSuperAdmin = user?.role === 'super_admin';

  // Handle Event image upload base64
  const handleEventImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadingEventImg(true);
      setEventError('');
      
      try {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async () => {
          const url = await uploadImageBase64(reader.result as string, file.name.split('.').pop());
          if (url) {
            setEventImgUrl(url);
          } else {
            setEventError('Image upload failed.');
          }
          setUploadingEventImg(false);
        };
      } catch (err) {
        setEventError('Error converting file.');
        setUploadingEventImg(false);
      }
    }
  };

  // Submit Event
  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setEventError('');
    setEventSuccess('');

    if (!eventTitle || !eventDesc || !eventDate || !eventLocation) {
      setEventError('Please fill out all required fields.');
      return;
    }

    const success = await createEvent(eventTitle, eventDesc, eventDate, eventLocation, eventImgUrl);
    if (success) {
      setEventSuccess('Event created and published successfully!');
      setEventTitle('');
      setEventDesc('');
      setEventDate('');
      setEventLocation('');
      setEventImgUrl('');
    } else {
      setEventError('Failed to publish event onto server.');
    }
  };

  // Submit Announcement
  const handleCreateAnn = async (e: React.FormEvent) => {
    e.preventDefault();
    setAnnError('');
    setAnnSuccess('');

    if (!annTitle || !annBody) {
      setAnnError('Please fill out all required fields.');
      return;
    }

    const success = await createAnnouncement(annTitle, annBody, annSentBy);
    if (success) {
      setAnnSuccess('Announcement sent successfully!');
      setAnnTitle('');
      setAnnBody('');
      setAnnSentBy('Executive Committee');
    } else {
      setAnnError('Failed to post announcement.');
    }
  };

  // Submit Direct Photo
  const handleDirectPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadingDirectPhoto(true);
      setDirectPhotoError('');
      
      try {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async () => {
          const url = await uploadImageBase64(reader.result as string, file.name.split('.').pop());
          if (url) {
            setDirectPhotoUrl(url);
          } else {
            setDirectPhotoError('Photo file upload failed.');
          }
          setUploadingDirectPhoto(false);
        };
      } catch (err) {
        setDirectPhotoError('Error processing image file.');
        setUploadingDirectPhoto(false);
      }
    }
  };

  const handleCreateDirectPhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    setDirectPhotoError('');
    setDirectPhotoSuccess('');

    if (!directPhotoUrl || !directPhotoTag) {
      setDirectPhotoError('Please select a photo and specify an event tag.');
      return;
    }

    const ok = await uploadPhoto(directPhotoUrl, directPhotoTag);
    if (ok) {
      setDirectPhotoSuccess('Photo posted directly and approved into the gallery successfully!');
      setDirectPhotoTag('');
      setDirectPhotoUrl('');
    } else {
      setDirectPhotoError('Failed to publish photo metadata.');
    }
  };

  // Submit Advertisement
  const handleAdImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadingAdImg(true);
      setAdError('');
      
      try {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async () => {
          const url = await uploadImageBase64(reader.result as string, file.name.split('.').pop());
          if (url) {
            setAdImgUrl(url);
          } else {
            setAdError('Ad cover image upload failed.');
          }
          setUploadingAdImg(false);
        };
      } catch (err) {
        setAdError('Error processing advertisement image.');
        setUploadingAdImg(false);
      }
    }
  };

  const handleCreateAd = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdError('');
    setAdSuccess('');

    if (!adTitle || !adDesc) {
      setAdError('Please fill out all required fields.');
      return;
    }

    const success = await createAdvertisement(adTitle, adDesc, adImgUrl || undefined, adLink || undefined);
    if (success) {
      setAdSuccess('Advertisement published successfully!');
      setAdTitle('');
      setAdDesc('');
      setAdLink('');
      setAdImgUrl('');
    } else {
      setAdError('Failed to publish advertisement.');
    }
  };

  // Edit Event Cover Image Upload
  const handleEditEventImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadingEditEventImg(true);
      setEventError('');
      try {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async () => {
          const url = await uploadImageBase64(reader.result as string, file.name.split('.').pop());
          if (url) {
            setEditEventImgUrl(url);
          } else {
            setEventError('Edit image upload failed.');
          }
          setUploadingEditEventImg(false);
        };
      } catch (err) {
        setEventError('Error converting edit file.');
        setUploadingEditEventImg(false);
      }
    }
  };

  // Start Editing Event
  const startEditingEvent = (ev: any) => {
    setEditingEventId(ev.id);
    setEditEventTitle(ev.title);
    setEditEventDesc(ev.description);
    setEditEventDate(ev.date);
    setEditEventLocation(ev.location);
    setEditEventImgUrl(ev.image_url || '');
  };

  // Submit Edited Event
  const handleEditEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEventError('');
    setEventSuccess('');
    if (!editingEventId) return;

    const ok = await updateEvent(editingEventId, {
      title: editEventTitle,
      description: editEventDesc,
      date: editEventDate,
      location: editEventLocation,
      image_url: editEventImgUrl || undefined
    });

    if (ok) {
      setEventSuccess('Event updated successfully!');
      setEditingEventId(null);
    } else {
      setEventError('Failed to update event.');
    }
  };

  // Leader Avatar Upload
  const handleLeaderAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadingLeaderAvatar(true);
      setSettingsError('');
      try {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async () => {
          const url = await uploadImageBase64(reader.result as string, file.name.split('.').pop());
          if (url) {
            setNewLeaderAvatar(url);
          } else {
            setSettingsError('Avatar upload failed.');
          }
          setUploadingLeaderAvatar(false);
        };
      } catch (err) {
        setSettingsError('Error processing avatar image.');
        setUploadingLeaderAvatar(false);
      }
    }
  };

  // Add Leader to settings
  const handleAddLeader = async () => {
    setSettingsError('');
    setSettingsSuccess('');
    if (!newLeaderName || !newLeaderRoleEn) {
      setSettingsError('Please specify name and English role for the new leader.');
      return;
    }

    const newLeader = {
      id: 'lead-' + Date.now(),
      name: newLeaderName,
      role_en: newLeaderRoleEn,
      role_rw: newLeaderRoleRw || newLeaderRoleEn,
      year: Number(newLeaderYear) || 2020,
      avatar: newLeaderAvatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
    };

    const updatedTeam = [...(siteSettings?.leadershipTeam || []), newLeader];
    const ok = await updateSiteSettings({ leadershipTeam: updatedTeam });
    if (ok) {
      setSettingsSuccess('Leadership team member added successfully!');
      setNewLeaderName('');
      setNewLeaderRoleEn('');
      setNewLeaderRoleRw('');
      setNewLeaderYear(2020);
      setNewLeaderAvatar('');
    } else {
      setSettingsError('Failed to add leadership team member.');
    }
  };

  // Delete Leader from settings
  const handleDeleteLeader = async (id: string) => {
    setSettingsError('');
    setSettingsSuccess('');
    const updatedTeam = (siteSettings?.leadershipTeam || []).filter(member => member.id !== id);
    const ok = await updateSiteSettings({ leadershipTeam: updatedTeam });
    if (ok) {
      setSettingsSuccess('Leadership member removed successfully.');
    } else {
      setSettingsError('Failed to remove leadership member.');
    }
  };

  // Submit Site Settings changes
  const handleSaveSiteSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsError('');
    setSettingsSuccess('');

    const payload = {
      historyTitle_en: historyTitleEn,
      historyTitle_rw: historyTitleRw,
      historyText1_en: historyText1En,
      historyText1_rw: historyText1Rw,
      historyText2_en: historyText2En,
      historyText2_rw: historyText2Rw,

      missionTitle_en: missionTitleEn,
      missionTitle_rw: missionTitleRw,
      missionText_en: missionTextEn,
      missionText_rw: missionTextRw,

      visionTitle_en: visionTitleEn,
      visionTitle_rw: visionTitleRw,
      visionText_en: visionTextEn,
      visionText_rw: visionTextRw,

      contacts: {
        email: contactsEmail,
        address_en: contactsAddressEn,
        address_rw: contactsAddressRw,
        phones: contactsPhones
      }
    };

    const ok = await updateSiteSettings(payload);
    if (ok) {
      setSettingsSuccess('Site settings and contact info updated successfully!');
    } else {
      setSettingsError('Failed to save site settings onto server.');
    }
  };

  const addPhone = () => {
    if (newPhoneInput.trim() && !contactsPhones.includes(newPhoneInput.trim())) {
      setContactsPhones([...contactsPhones, newPhoneInput.trim()]);
      setNewPhoneInput('');
    }
  };

  const removePhone = (phoneToRemove: string) => {
    setContactsPhones(contactsPhones.filter(p => p !== phoneToRemove));
  };

  // Derived lists for review
  const pendingMembers = members.filter(m => !m.approved);
  const pendingPosts = posts.filter(p => p.status === 'pending');
  const pendingPhotos = gallery.filter(g => !g.approved);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans">
      
      {/* Upper Title block */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between glass-pill px-6 py-4 mb-8">
        <div>
          <h1 className="font-serif-display text-3xl font-bold">
            SEPAC Executive Control Panel
          </h1>
          <p className="text-xs text-brand-gold font-bold uppercase tracking-widest mt-1">
            Logged in as: {user?.name} ({user?.role.replace('_', ' ')})
          </p>
        </div>
        
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
          <button
            onClick={() => setActiveSection('analytics')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
              activeSection === 'analytics'
                ? 'bg-brand-navy text-brand-gold'
                : 'glass-panel text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            Analytics
          </button>
          <button
            onClick={() => setActiveSection('members')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all relative ${
              activeSection === 'members'
                ? 'bg-brand-navy text-brand-gold'
                : 'glass-panel text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            Members
            {pendingMembers.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold">
                {pendingMembers.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveSection('posts')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all relative ${
              activeSection === 'posts'
                ? 'bg-brand-navy text-brand-gold'
                : 'glass-panel text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            News Review
            {pendingPosts.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold">
                {pendingPosts.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveSection('gallery')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all relative ${
              activeSection === 'gallery'
                ? 'bg-brand-navy text-brand-gold'
                : 'glass-panel text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            Photos Review
            {pendingPhotos.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold">
                {pendingPhotos.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveSection('events')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
              activeSection === 'events'
                ? 'bg-brand-navy text-brand-gold'
                : 'glass-panel text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            Manage Events
          </button>
          <button
            onClick={() => setActiveSection('prayers')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
              activeSection === 'prayers'
                ? 'bg-brand-navy text-brand-gold'
                : 'glass-panel text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            Prayer Requests
          </button>
          <button
            onClick={() => setActiveSection('announcements')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
              activeSection === 'announcements'
                ? 'bg-brand-navy text-brand-gold'
                : 'glass-panel text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            Broadcaster
          </button>
          <button
            onClick={() => setActiveSection('advertisements')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
              activeSection === 'advertisements'
                ? 'bg-brand-navy text-brand-gold'
                : 'glass-panel text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            Advertisements
          </button>
          {isSuperAdmin && (
            <button
              onClick={() => setActiveSection('site_settings')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                activeSection === 'site_settings'
                  ? 'bg-brand-navy text-brand-gold border-2 border-brand-gold/60'
                  : 'bg-amber-50 text-brand-navy hover:bg-amber-100 border border-brand-gold/30'
              }`}
            >
              Site Content
            </button>
          )}
        </div>
      </div>

      {/* 1. ANALYTICS PANEL */}
      {activeSection === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Approved members count */}
            <div className="glass-panel p-5 rounded-[1.75rem] border border-brand-navy/10 shadow-sm flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-blue-50 text-brand-navy">
                <Users size={20} />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Approved Alumni</p>
                <h3 className="text-2xl font-serif-display font-bold text-gray-800">{analytics.approvedMembers}</h3>
                <p className="text-[10px] text-gray-400">{analytics.totalMembers} registrations total</p>
              </div>
            </div>

            {/* Approved posts count */}
            <div className="glass-panel p-5 rounded-[1.75rem] border border-brand-navy/10 shadow-sm flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-amber-50 text-brand-gold">
                <FileText size={20} />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">News Posts</p>
                <h3 className="text-2xl font-serif-display font-bold text-gray-800">{analytics.approvedPosts}</h3>
                <p className="text-[10px] text-gray-400">{analytics.totalPosts} submitted total</p>
              </div>
            </div>

            {/* Event Assemblies */}
            <div className="glass-panel p-5 rounded-[1.75rem] border border-brand-navy/10 shadow-sm flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-emerald-50 text-emerald-700">
                <Calendar size={20} />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Assemblies</p>
                <h3 className="text-2xl font-serif-display font-bold text-gray-800">{analytics.eventsCount}</h3>
                <p className="text-[10px] text-emerald-600 font-semibold">Active & Archived</p>
              </div>
            </div>

            {/* Gallery images */}
            <div className="glass-panel p-5 rounded-[1.75rem] border border-brand-navy/10 shadow-sm flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-purple-50 text-purple-700">
                <ImageIcon size={20} />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Gallery Pictures</p>
                <h3 className="text-2xl font-serif-display font-bold text-gray-800">{analytics.totalGallery}</h3>
                <p className="text-[10px] text-purple-600 font-semibold">{pendingPhotos.length} pending moderation</p>
              </div>
            </div>

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Quick action items summary */}
            <div className="glass-panel rounded-[1.75rem] border border-brand-navy/15 shadow-sm p-5 lg:col-span-2 space-y-4">
              <h3 className="font-serif-display text-base font-bold text-brand-navy border-b border-brand-gold/20 pb-2">
                Pending Actions Summary
              </h3>
              
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between p-3 bg-brand-cream rounded-lg">
                  <span className="font-medium text-gray-700">Pending Registrations</span>
                  <span className={`px-2.5 py-0.5 rounded font-bold text-[10px] ${
                    pendingMembers.length > 0 ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {pendingMembers.length} review items
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-brand-cream rounded-lg">
                  <span className="font-medium text-gray-700">Pending Member News & Devotionals</span>
                  <span className={`px-2.5 py-0.5 rounded font-bold text-[10px] ${
                    pendingPosts.length > 0 ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {pendingPosts.length} review items
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-brand-cream rounded-lg">
                  <span className="font-medium text-gray-700">Pending Gallery Photo uploads</span>
                  <span className={`px-2.5 py-0.5 rounded font-bold text-[10px] ${
                    pendingPhotos.length > 0 ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {pendingPhotos.length} review items
                  </span>
                </div>
              </div>
            </div>

            {/* Quick tips */}
            <div className="bg-brand-navy text-white rounded-[1.75rem] p-5 border border-brand-gold/30 flex flex-col justify-between">
              <div>
                <h4 className="font-serif-display text-sm font-bold text-brand-gold mb-2">Administrative Guidelines</h4>
                <p className="text-xs text-gray-300 leading-relaxed mb-4">
                  All SEPAC member-submitted content goes through administrative moderation before becoming public. This maintains the dignity, security, and faith-centered environment of our community portal.
                </p>
                <p className="text-[11px] text-brand-gold font-semibold">
                  Hebrews 10:24 — Spur one another on toward love and good deeds.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-brand-gold/20 flex items-center space-x-2 text-[10px] text-gray-400">
                <ShieldCheck size={14} className="text-brand-gold" />
                <span>Security Policies enforced</span>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 2. MEMBERS DIRECTORY MODERATION */}
      {activeSection === 'members' && (
        <div className="space-y-6">
          <h2 className="font-serif-display text-lg font-bold text-brand-navy mb-4">
            Member Registry & Moderation
          </h2>

          {pendingMembers.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-700">
                Pending Registrations ({pendingMembers.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pendingMembers.map((member) => (
                  <div key={member.id} className="bg-amber-50/50 p-4 rounded-[1.75rem] border border-amber-200 flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src={member.avatar_url}
                        alt={member.name}
                        className="w-12 h-12 rounded-full object-cover border border-brand-gold"
                      />
                      <div>
                        <h4 className="text-sm font-bold text-gray-800">{member.name}</h4>
                        <p className="text-xs text-gray-500">Class of {member.graduation_year}</p>
                        <p className="text-[11px] text-gray-400">{member.email}</p>
                        {member.phone && <p className="text-[11px] text-gray-400">{member.phone}</p>}
                      </div>
                    </div>
                    <div className="flex space-x-1 shrink-0">
                      <button
                        onClick={() => approveMember(member.id, true)}
                        className="p-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md transition-colors"
                        title="Approve Member"
                      >
                        <Check size={14} />
                      </button>
                      <button
                        onClick={() => approveMember(member.id, false)}
                        className="p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
                        title="Reject/Ignore"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="glass-panel rounded-[1.75rem] border border-gray-200 overflow-hidden">
            <div className="px-4 py-3 bg-brand-cream border-b border-gray-200">
              <h3 className="text-xs font-bold uppercase text-brand-navy tracking-wider">All Members & Roles</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-xs">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left font-bold text-gray-500 uppercase tracking-wider">Member</th>
                    <th className="px-6 py-3 text-left font-bold text-gray-500 uppercase tracking-wider">Grad Year</th>
                    <th className="px-6 py-3 text-left font-bold text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left font-bold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-right font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 glass-panel">
                  {members.map((m) => (
                    <tr key={m.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <img src={m.avatar_url} className="w-8 h-8 rounded-full object-cover border" />
                          <div>
                            <p className="font-bold text-gray-800">{m.name}</p>
                            <p className="text-[11px] text-gray-500">{m.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                        {m.graduation_year}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap capitalize text-brand-navy font-semibold">
                        {m.role.replace('_', ' ')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          m.approved ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {m.approved ? 'Approved' : 'Pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        {/* Only super admin can manage roles, or general admin can approve if pending */}
                        <div className="flex justify-end space-x-1">
                          {!m.approved && (
                            <button
                              onClick={() => approveMember(m.id, true)}
                              className="px-2 py-1 bg-emerald-500 text-white rounded text-[10px] font-bold hover:bg-emerald-600 transition-colors"
                            >
                              Approve
                            </button>
                          )}
                          {isSuperAdmin && (
                            <select
                              value={m.role}
                              onChange={(e) => updateMemberRole(m.id, e.target.value as UserRole)}
                              className="text-[11px] border border-gray-300 rounded px-1.5 py-0.5 focus:outline-none focus:ring-1 focus:ring-brand-gold"
                            >
                              <option value="member">Member</option>
                              <option value="moderator">Moderator</option>
                              <option value="admin">Admin</option>
                              {m.role === 'super_admin' && <option value="super_admin">Super Admin</option>}
                            </select>
                          )}
                          {isSuperAdmin && !SUPER_ADMIN_EMAILS.includes(m.email.toLowerCase()) && (
                            <button
                              onClick={() => { if (confirm(`Remove ${m.name} from SEPAC? This cannot be undone.`)) deleteMember(m.id); }}
                              className="px-2 py-1 bg-red-600 text-white rounded text-[10px] font-bold hover:bg-red-700 transition-colors flex items-center gap-1"
                            >
                              <Trash2 size={10} />
                              <span>Remove</span>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 3. NEWS FEED REVIEW */}
      {activeSection === 'posts' && (
        <div className="space-y-6">
          <h2 className="font-serif-display text-lg font-bold text-brand-navy mb-4">
            Community Posts & Devotionals Review
          </h2>

          {pendingPosts.length === 0 ? (
            <div className="text-center py-12 glass-panel rounded-[1.75rem] border border-gray-200">
              <CheckCircle size={36} className="mx-auto text-emerald-500 mb-2" />
              <p className="text-sm font-semibold text-gray-700">No pending news posts for review.</p>
              <p className="text-xs text-gray-400">Approved posts will show directly on the feed tab.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingPosts.map((post) => (
                <div key={post.id} className="glass-panel p-5 rounded-[1.75rem] border border-gray-200 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-0.5 bg-brand-gold-light text-brand-navy-dark rounded text-[10px] font-bold uppercase tracking-wider">
                        {post.category}
                      </span>
                      <span className="text-[11px] text-gray-400">by {post.author_name}</span>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => updatePostStatus(post.id, 'approved')}
                        className="px-2.5 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 flex items-center space-x-1"
                      >
                        <Check size={12} />
                        <span>Approve</span>
                      </button>
                      <button
                        onClick={() => updatePostStatus(post.id, 'rejected')}
                        className="px-2.5 py-1.5 bg-red-600 text-white rounded-lg text-xs font-bold hover:bg-red-700 flex items-center space-x-1"
                      >
                        <X size={12} />
                        <span>Reject</span>
                      </button>
                      <button
                        onClick={() => { if (confirm('Permanently delete this post?')) deletePost(post.id); }}
                        className="px-2.5 py-1.5 bg-gray-700 text-white rounded-lg text-xs font-bold hover:bg-gray-800 flex items-center space-x-1"
                      >
                        <Trash2 size={12} />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-serif-display text-base font-bold text-brand-navy">{post.title}</h3>
                    <p className="text-xs text-gray-600 leading-relaxed mt-1">{post.content}</p>
                  </div>

                  {post.image_url && (
                    <img
                      src={post.image_url}
                      alt={post.title}
                      className="max-h-48 rounded-lg object-cover border"
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Live (already approved) posts — admin can remove any of these too */}
          <div className="pt-4">
            <h3 className="font-serif-display text-base font-bold text-brand-navy mb-3">Live Posts</h3>
            {posts.filter(p => p.status === 'approved').length === 0 ? (
              <p className="text-xs text-gray-400 italic">No live posts yet.</p>
            ) : (
              <div className="space-y-2">
                {posts.filter(p => p.status === 'approved').map((post) => (
                  <div key={post.id} className="flex items-center justify-between glass-panel p-3 rounded-lg border border-gray-200">
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-gray-800 truncate">{post.title}</p>
                      <p className="text-[10px] text-gray-400">by {post.author_name}</p>
                    </div>
                    <button
                      onClick={() => { if (confirm('Permanently delete this post?')) deletePost(post.id); }}
                      className="ml-3 shrink-0 px-2.5 py-1.5 bg-red-600 text-white rounded-lg text-[10px] font-bold hover:bg-red-700 flex items-center space-x-1"
                    >
                      <Trash2 size={10} />
                      <span>Delete</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      {activeSection === 'gallery' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Direct Photo Uploader */}
          <div className="glass-panel p-6 rounded-[1.75rem] border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-serif-display text-base font-bold text-brand-navy border-b border-brand-gold/20 pb-2">
              Add Photo Directly
            </h3>
            
            <form onSubmit={handleCreateDirectPhoto} className="space-y-4 text-xs">
              {directPhotoError && <p className="p-3 bg-red-50 text-red-700 rounded-lg font-medium">{directPhotoError}</p>}
              {directPhotoSuccess && <p className="p-3 bg-emerald-50 text-emerald-800 rounded-lg font-medium">{directPhotoSuccess}</p>}

              <div>
                <label className="block font-bold text-gray-700 mb-1">Event Tag / Year *</label>
                <input
                  type="text"
                  required
                  value={directPhotoTag}
                  onChange={(e) => setDirectPhotoTag(e.target.value)}
                  placeholder="e.g. General Assembly 2025"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-brand-gold focus:border-brand-gold"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Select Photo *</label>
                <div
                  onClick={() => directPhotoFileRef.current?.click()}
                  className="border border-dashed border-gray-300 hover:border-brand-gold rounded-lg p-6 text-center cursor-pointer hover:bg-brand-cream/20 transition-all flex flex-col items-center justify-center space-y-2"
                >
                  <input
                    ref={directPhotoFileRef}
                    type="file"
                    onChange={handleDirectPhotoUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  {directPhotoUrl ? (
                    <div className="space-y-2">
                      <img src={directPhotoUrl} alt="Preview" className="max-h-32 rounded object-cover mx-auto border" />
                      <p className="text-emerald-700 font-bold">Image loaded successfully</p>
                    </div>
                  ) : (
                    <>
                      <Upload size={20} className="text-brand-navy" />
                      <span className="font-medium text-gray-600">
                        {uploadingDirectPhoto ? 'Uploading image...' : 'Click to select photo'}
                      </span>
                    </>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={uploadingDirectPhoto || !directPhotoUrl}
                className="w-full py-2.5 bg-brand-navy hover:bg-brand-navy-light disabled:bg-gray-300 text-white rounded-lg font-bold uppercase tracking-wider transition-colors"
              >
                Post Photo Directly
              </button>
            </form>
          </div>

          {/* Pending Photo Moderation & Live Gallery Management */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-4">
              <h3 className="font-serif-display text-base font-bold text-brand-navy border-b border-brand-gold/20 pb-2">
                Pending Photos Review ({pendingPhotos.length})
              </h3>

              {pendingPhotos.length === 0 ? (
                <div className="text-center py-8 glass-panel rounded-[1.75rem] border border-gray-200">
                  <CheckCircle size={36} className="mx-auto text-emerald-500 mb-2" />
                  <p className="text-sm font-semibold text-gray-700">No pending photo uploads for review.</p>
                  <p className="text-xs text-gray-400">All photos have been moderated.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {pendingPhotos.map((photo) => (
                    <div key={photo.id} className="glass-panel rounded-[1.75rem] overflow-hidden border border-gray-200 shadow-sm flex flex-col justify-between">
                      <div>
                        <img
                          src={photo.image_url}
                          alt="Pending gallery"
                          className="w-full h-40 object-cover"
                        />
                        <div className="p-4 space-y-1 text-xs">
                          <p className="font-bold text-brand-navy">Tag: {photo.event_tag}</p>
                          <p className="text-gray-500 text-[11px]">Uploaded by: {photo.uploader_name}</p>
                        </div>
                      </div>

                      <div className="p-4 border-t border-gray-100 flex space-x-2">
                        <button
                          onClick={() => approvePhoto(photo.id, true)}
                          className="flex-1 py-1.5 bg-emerald-600 text-white rounded text-xs font-bold hover:bg-emerald-700"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => approvePhoto(photo.id, false)}
                          className="flex-1 py-1.5 bg-red-600 text-white rounded text-xs font-bold hover:bg-red-700"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Approved Photos Gallery Manage */}
            <div className="space-y-4 pt-6 border-t border-gray-100">
              <h3 className="font-serif-display text-base font-bold text-brand-navy">
                Approved Live Gallery ({gallery.filter(g => g.approved).length})
              </h3>
              {gallery.filter(g => g.approved).length === 0 ? (
                <p className="text-xs text-gray-400 italic">No approved photos in the live gallery yet.</p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-[350px] overflow-y-auto pr-1">
                  {gallery.filter(g => g.approved).map((photo) => (
                    <div key={photo.id} className="relative group rounded-lg overflow-hidden border border-gray-200 bg-gray-50 aspect-video">
                      <img
                        src={photo.image_url}
                        alt="Approved Live Gallery"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2 text-[10px] text-white">
                        <p className="font-bold truncate">{photo.event_tag}</p>
                        <button
                          type="button"
                          onClick={() => { if (confirm('Permanently delete this photo?')) deleteGalleryItem(photo.id); }}
                          title="Delete photo"
                          aria-label="Delete photo"
                          className="self-end p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-full transition-all cursor-pointer"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      )}

      {/* 5. CREATE AND MANAGE EVENTS */}
      {activeSection === 'events' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Create Event Form */}
          <div className="glass-panel p-6 rounded-[1.75rem] border border-gray-200 shadow-sm">
            {editingEventId ? (
              <>
                <div className="flex justify-between items-center border-b border-brand-gold/20 pb-2 mb-4">
                  <h3 className="font-serif-display text-base font-bold text-brand-navy">
                    Edit Event Assembly
                  </h3>
                  <button
                    onClick={() => setEditingEventId(null)}
                    className="text-xs text-gray-400 hover:text-gray-600 font-bold"
                  >
                    Cancel Edit
                  </button>
                </div>
                
                <form onSubmit={handleEditEventSubmit} className="space-y-4 text-xs">
                  {eventError && <p className="p-3 bg-red-50 text-red-700 rounded-lg font-medium">{eventError}</p>}
                  {eventSuccess && <p className="p-3 bg-emerald-50 text-emerald-800 rounded-lg font-medium">{eventSuccess}</p>}

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Event Title *</label>
                    <input
                      type="text"
                      required
                      value={editEventTitle}
                      onChange={(e) => setEditEventTitle(e.target.value)}
                      placeholder="e.g. Annual General Assembly 2026"
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-brand-gold focus:border-brand-gold"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Event Description *</label>
                    <textarea
                      required
                      rows={4}
                      value={editEventDesc}
                      onChange={(e) => setEditEventDesc(e.target.value)}
                      placeholder="Provide detailed information regarding the theme, speakers, and schedule..."
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-brand-gold focus:border-brand-gold resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Date & Time *</label>
                      <input
                        type="datetime-local"
                        required
                        value={editEventDate}
                        onChange={(e) => setEditEventDate(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-brand-gold focus:border-brand-gold"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Location *</label>
                      <input
                        type="text"
                        required
                        value={editEventLocation}
                        onChange={(e) => setEditEventLocation(e.target.value)}
                        placeholder="e.g. Saint Esprit School Hall"
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-brand-gold focus:border-brand-gold"
                      />
                    </div>
                  </div>

                  {/* Event Cover Image Base64 Uploader */}
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Event Cover Photo</label>
                    <div
                      onClick={() => editEventFileRef.current?.click()}
                      className="border border-dashed border-gray-300 hover:border-brand-gold rounded-lg p-3 text-center cursor-pointer hover:bg-brand-cream/20 transition-all flex items-center justify-center space-x-2"
                    >
                      <input
                        ref={editEventFileRef}
                        type="file"
                        onChange={handleEditEventImageUpload}
                        accept="image/*"
                        className="hidden"
                      />
                      {editEventImgUrl ? (
                        <div className="flex items-center space-x-2">
                          <img src={editEventImgUrl} alt="Cover Preview" className="w-8 h-8 rounded object-cover" />
                          <span className="text-emerald-700 font-bold">Image loaded successfully</span>
                        </div>
                      ) : (
                        <>
                          <Upload size={14} className="text-brand-navy" />
                          <span>{uploadingEditEventImg ? 'Uploading cover...' : 'Click to select cover picture'}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-brand-navy hover:bg-brand-navy-light text-white rounded-lg font-bold uppercase tracking-wider transition-colors"
                  >
                    Save Changes
                  </button>

                </form>
              </>
            ) : (
              <>
                <h3 className="font-serif-display text-base font-bold text-brand-navy border-b border-brand-gold/20 pb-2 mb-4">
                  Schedule New Event Assembly
                </h3>
                
                <form onSubmit={handleCreateEvent} className="space-y-4 text-xs">
                  
                  {eventError && <p className="p-3 bg-red-50 text-red-700 rounded-lg font-medium">{eventError}</p>}
                  {eventSuccess && <p className="p-3 bg-emerald-50 text-emerald-800 rounded-lg font-medium">{eventSuccess}</p>}

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Event Title *</label>
                    <input
                      type="text"
                      required
                      value={eventTitle}
                      onChange={(e) => setEventTitle(e.target.value)}
                      placeholder="e.g. Annual General Assembly 2026"
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-brand-gold focus:border-brand-gold"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Event Description *</label>
                    <textarea
                      required
                      rows={4}
                      value={eventDesc}
                      onChange={(e) => setEventDesc(e.target.value)}
                      placeholder="Provide detailed information regarding the theme, speakers, and schedule..."
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-brand-gold focus:border-brand-gold resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Date & Time *</label>
                      <input
                        type="datetime-local"
                        required
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-brand-gold focus:border-brand-gold"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Location *</label>
                      <input
                        type="text"
                        required
                        value={eventLocation}
                        onChange={(e) => setEventLocation(e.target.value)}
                        placeholder="e.g. Saint Esprit School Hall"
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-brand-gold focus:border-brand-gold"
                      />
                    </div>
                  </div>

                  {/* Event Cover Image Base64 Uploader */}
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Event Cover Photo</label>
                    <div
                      onClick={() => eventFileRef.current?.click()}
                      className="border border-dashed border-gray-300 hover:border-brand-gold rounded-lg p-3 text-center cursor-pointer hover:bg-brand-cream/20 transition-all flex items-center justify-center space-x-2"
                    >
                      <input
                        ref={eventFileRef}
                        type="file"
                        onChange={handleEventImageUpload}
                        accept="image/*"
                        className="hidden"
                      />
                      {eventImgUrl ? (
                        <div className="flex items-center space-x-2">
                          <img src={eventImgUrl} alt="Cover Preview" className="w-8 h-8 rounded object-cover" />
                          <span className="text-emerald-700 font-bold">Image loaded successfully</span>
                        </div>
                      ) : (
                        <>
                          <Upload size={14} className="text-brand-navy" />
                          <span>{uploadingEventImg ? 'Uploading cover...' : 'Click to select cover picture'}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-brand-navy hover:bg-brand-navy-light text-white rounded-lg font-bold uppercase tracking-wider transition-colors"
                  >
                    Publish Event
                  </button>

                </form>
              </>
            )}
          </div>

          {/* Current Events list */}
          <div className="space-y-4">
            <h3 className="font-serif-display text-base font-bold text-brand-navy border-b border-brand-gold/20 pb-2">
              Published Events ({events.length})
            </h3>
            
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
              {events.length === 0 ? (
                <p className="text-xs text-gray-400 italic">No published events found.</p>
              ) : (
                events.map((ev) => (
                  <div key={ev.id} className="glass-panel p-4 rounded-[1.75rem] border border-gray-200 shadow-sm flex space-x-3 text-xs">
                    {ev.image_url && (
                      <img src={ev.image_url} alt={ev.title} className="w-16 h-16 rounded object-cover border flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-800 truncate">{ev.title}</h4>
                      <p className="text-brand-navy font-medium mt-0.5">{new Date(ev.date).toLocaleDateString()} • {ev.location}</p>
                      <p className="text-gray-500 line-clamp-2 mt-1 leading-relaxed">{ev.description}</p>
                      
                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-50">
                        <span className="inline-block bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold">
                          {ev.rsvps.length} RSVP RSVPs
                        </span>
                        
                        <div className="flex items-center space-x-2">
                          <button
                            type="button"
                            onClick={() => startEditingEvent(ev)}
                            className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-[10px] font-bold flex items-center space-x-1 cursor-pointer transition-colors"
                          >
                            <Edit size={10} />
                            <span>Edit</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteEvent(ev.id)}
                            className="px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-600 rounded text-[10px] font-bold flex items-center space-x-1 cursor-pointer transition-colors"
                          >
                            <Trash2 size={10} />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      )}

      {/* PRAYER REQUESTS MODERATION */}
      {activeSection === 'prayers' && (
        <div className="space-y-4">
          <h2 className="font-serif-display text-lg font-bold text-brand-navy mb-4">
            Prayer Requests ({prayerRequests.length})
          </h2>

          {prayerRequests.length === 0 ? (
            <div className="text-center py-12 glass-panel rounded-[1.75rem] border border-gray-200">
              <p className="text-sm font-semibold text-gray-700">No prayer requests yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {prayerRequests.map((pr) => (
                <div key={pr.id} className="glass-panel p-4 rounded-[1.75rem] border border-gray-200 shadow-sm space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <img src={pr.author_avatar} className="w-6 h-6 rounded-full object-cover border" />
                      <span className="font-bold text-gray-800">{pr.author_name}</span>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                        pr.visibility === 'public' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {pr.visibility}
                      </span>
                    </div>
                    <button
                      onClick={() => { if (confirm('Delete this prayer request and its comments?')) deletePrayerRequest(pr.id); }}
                      className="px-2 py-1 bg-red-600 text-white rounded text-[10px] font-bold hover:bg-red-700 flex items-center gap-1"
                    >
                      <Trash2 size={10} />
                      <span>Delete</span>
                    </button>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{pr.content}</p>
                  <p className="text-[10px] text-gray-400">{pr.praying_users.length} praying &middot; {new Date(pr.created_at).toLocaleDateString()}</p>

                  {pr.comments && pr.comments.length > 0 && (
                    <div className="pt-2 mt-2 border-t border-gray-100 space-y-1.5">
                      {pr.comments.map((c) => (
                        <div key={c.id} className="flex items-center justify-between bg-gray-50 rounded px-2 py-1">
                          <span className="text-[11px] text-gray-600"><span className="font-bold">{c.author_name}:</span> {c.content}</span>
                          <button
                            onClick={() => { if (confirm('Delete this comment?')) deletePrayerComment(c.id); }}
                            className="ml-2 shrink-0 text-red-500 hover:text-red-700"
                          >
                            <Trash2 size={10} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 6. BROADCAST ANNOUNCEMENTS */}
      {activeSection === 'announcements' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Create Announcement */}
          <div className="glass-panel p-6 rounded-[1.75rem] border border-gray-200 shadow-sm">
            <h3 className="font-serif-display text-base font-bold text-brand-navy border-b border-brand-gold/20 pb-2 mb-4">
              Broadcast Official Announcement
            </h3>

            <form onSubmit={handleCreateAnn} className="space-y-4 text-xs">
              
              {annError && <p className="p-3 bg-red-50 text-red-700 rounded-lg font-medium">{annError}</p>}
              {annSuccess && <p className="p-3 bg-emerald-50 text-emerald-800 rounded-lg font-medium">{annSuccess}</p>}

              <div>
                <label className="block font-bold text-gray-700 mb-1">Announcement Title *</label>
                <input
                  type="text"
                  required
                  value={annTitle}
                  onChange={(e) => setAnnTitle(e.target.value)}
                  placeholder="e.g. Dues Payment & Registry Finalization"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-brand-gold focus:border-brand-gold"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Sent By / Sign-off *</label>
                <input
                  type="text"
                  required
                  value={annSentBy}
                  onChange={(e) => setAnnSentBy(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-brand-gold focus:border-brand-gold"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Announcement Content *</label>
                <textarea
                  required
                  rows={5}
                  value={annBody}
                  onChange={(e) => setAnnBody(e.target.value)}
                  placeholder="Type the message details here..."
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-brand-gold focus:border-brand-gold resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-brand-navy hover:bg-brand-navy-light text-white rounded-lg font-bold uppercase tracking-wider transition-colors"
              >
                Send & Broadcast
              </button>

            </form>
          </div>

          {/* Past Announcements list */}
          <div className="space-y-4">
            <h3 className="font-serif-display text-base font-bold text-brand-navy border-b border-brand-gold/20 pb-2">
              Broadcast Archives ({announcements.length})
            </h3>

            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
              {announcements.map((ann) => (
                <div key={ann.id} className="glass-panel p-4 rounded-[1.75rem] border border-gray-200 shadow-sm space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-brand-navy flex items-center space-x-1.5">
                      <Megaphone size={14} className="text-brand-gold" />
                      <span>{ann.title}</span>
                    </h4>
                    <span className="text-[10px] text-gray-400">
                      {new Date(ann.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{ann.body}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-bold text-brand-gold-dark uppercase tracking-wider">
                      Sign-off: {ann.sent_by}
                    </p>
                    <button
                      onClick={() => { if (confirm('Delete this announcement?')) deleteAnnouncement(ann.id); }}
                      className="px-2 py-1 bg-red-600 text-white rounded text-[10px] font-bold hover:bg-red-700 flex items-center gap-1"
                    >
                      <Trash2 size={10} />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* 6. MANAGE ADVERTISEMENTS */}
      {activeSection === 'advertisements' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Create Advertisement Form */}
          <div className="glass-panel p-6 rounded-[1.75rem] border border-gray-200 shadow-sm">
            <h3 className="font-serif-display text-base font-bold text-brand-navy border-b border-brand-gold/20 pb-2 mb-4">
              Publish New Advertisement
            </h3>
            
            <form onSubmit={handleCreateAd} className="space-y-4 text-xs">
              {adError && <p className="p-3 bg-red-50 text-red-700 rounded-lg font-medium">{adError}</p>}
              {adSuccess && <p className="p-3 bg-emerald-50 text-emerald-800 rounded-lg font-medium">{adSuccess}</p>}

              <div>
                <label className="block font-bold text-gray-700 mb-1">Ad / Campaign Title *</label>
                <input
                  type="text"
                  required
                  value={adTitle}
                  onChange={(e) => setAdTitle(e.target.value)}
                  placeholder="e.g. SEPAC Homecoming Custom Sweaters"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-brand-gold focus:border-brand-gold"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Ad Copy / Description *</label>
                <textarea
                  required
                  rows={4}
                  value={adDesc}
                  onChange={(e) => setAdDesc(e.target.value)}
                  placeholder="Provide attractive ad content, discount details, or alumni business message..."
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-brand-gold focus:border-brand-gold resize-none"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Contact Link or Phone Number</label>
                <input
                  type="text"
                  value={adLink}
                  onChange={(e) => setAdLink(e.target.value)}
                  placeholder="e.g. +250 788 123 456 or WhatsApp link"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-brand-gold focus:border-brand-gold"
                />
              </div>

              {/* Ad Image Base64 Upload Box */}
              <div>
                <label className="block font-bold text-gray-700 mb-1">Campaign Poster Image</label>
                <div
                  onClick={() => adFileRef.current?.click()}
                  className="border border-dashed border-gray-300 hover:border-brand-gold rounded-lg p-4 text-center cursor-pointer hover:bg-brand-cream/20 transition-all flex items-center justify-center space-x-2"
                >
                  <input
                    ref={adFileRef}
                    type="file"
                    onChange={handleAdImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  {adImgUrl ? (
                    <div className="space-y-2">
                      <img src={adImgUrl} alt="Ad Poster Preview" className="max-h-24 rounded object-cover mx-auto border" />
                      <p className="text-emerald-700 font-bold">Image loaded successfully</p>
                    </div>
                  ) : (
                    <>
                      <Upload size={16} className="text-brand-navy" />
                      <span className="font-medium text-gray-600">
                        {uploadingAdImg ? 'Uploading cover...' : 'Select custom campaign poster'}
                      </span>
                    </>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={uploadingAdImg}
                className="w-full py-2.5 bg-brand-navy hover:bg-brand-navy-light text-white rounded-lg font-bold uppercase tracking-wider transition-colors"
              >
                Publish Campaign
              </button>
            </form>
          </div>

          {/* Active Campaigns list */}
          <div className="space-y-4">
            <h3 className="font-serif-display text-base font-bold text-brand-navy border-b border-brand-gold/20 pb-2">
              Active Campaigns ({advertisements.length})
            </h3>

            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
              {advertisements.length === 0 ? (
                <div className="p-6 text-center bg-gray-50 border rounded-[1.75rem] text-gray-400 text-xs">
                  No active ad campaigns yet.
                </div>
              ) : (
                advertisements.map((ad) => (
                  <div key={ad.id} className="glass-panel p-4 rounded-[1.75rem] border border-gray-200 shadow-sm flex gap-4 text-xs">
                    {ad.image_url && (
                      <img
                        src={ad.image_url}
                        alt={ad.title}
                        className="w-20 h-20 object-cover rounded-lg border flex-shrink-0 bg-gray-50"
                      />
                    )}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-1">
                          <h4 className="font-bold text-brand-navy truncate">{ad.title}</h4>
                          <button
                            onClick={() => deleteAdvertisement(ad.id)}
                            className="text-red-500 hover:text-red-700 font-bold transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                        <p className="text-gray-500 line-clamp-2 mt-1 leading-relaxed">{ad.description}</p>
                      </div>
                      <div className="flex justify-between items-center text-[10px] text-gray-400 mt-2">
                        <span>{ad.link || 'No call-to-action'}</span>
                        <span>{new Date(ad.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      )}

      {/* 7. SITE SETTINGS & CONTENT MANAGEMENT */}
      {activeSection === 'site_settings' && isSuperAdmin && (
        <div className="space-y-8 animate-fade-in">
          
          <div className="bg-amber-50 border border-brand-gold/30 p-4 rounded-[1.75rem] text-xs text-brand-navy flex items-start space-x-3">
            <Settings className="text-brand-gold mt-0.5 shrink-0" size={16} />
            <div>
              <p className="font-bold">Super Admin Content Portal</p>
              <p className="text-gray-600 mt-0.5">As a super admin, you can dynamically customize core sections of the SEPAC website (History, Mission, Vision, Leadership Team, and Contacts) without changing code. Changes are instantly pushed in real-time to all visitors.</p>
            </div>
          </div>

          <form onSubmit={handleSaveSiteSettings} className="space-y-8">
            
            {settingsError && <p className="p-3 bg-red-50 text-red-700 rounded-lg font-medium text-xs">{settingsError}</p>}
            {settingsSuccess && <p className="p-3 bg-emerald-50 text-emerald-800 rounded-lg font-medium text-xs">{settingsSuccess}</p>}

            {/* History, Mission & Vision */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* History Card */}
              <div className="glass-panel p-6 rounded-[1.75rem] border border-gray-200 shadow-sm space-y-4">
                <div className="flex items-center space-x-2 border-b border-gray-100 pb-2">
                  <BookOpen size={16} className="text-brand-gold" />
                  <h3 className="font-serif-display text-sm font-bold text-brand-navy">History Section</h3>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Title (English)</label>
                    <input
                      type="text"
                      value={historyTitleEn}
                      onChange={(e) => setHistoryTitleEn(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-brand-gold"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Title (Kinyarwanda)</label>
                    <input
                      type="text"
                      value={historyTitleRw}
                      onChange={(e) => setHistoryTitleRw(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-brand-gold"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Paragraph 1 (English)</label>
                    <textarea
                      rows={4}
                      value={historyText1En}
                      onChange={(e) => setHistoryText1En(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-brand-gold resize-none"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Paragraph 1 (Kinyarwanda)</label>
                    <textarea
                      rows={4}
                      value={historyText1Rw}
                      onChange={(e) => setHistoryText1Rw(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-brand-gold resize-none"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Paragraph 2 (English)</label>
                    <textarea
                      rows={4}
                      value={historyText2En}
                      onChange={(e) => setHistoryText2En(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-brand-gold resize-none"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Paragraph 2 (Kinyarwanda)</label>
                    <textarea
                      rows={4}
                      value={historyText2Rw}
                      onChange={(e) => setHistoryText2Rw(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-brand-gold resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Mission Card */}
              <div className="glass-panel p-6 rounded-[1.75rem] border border-gray-200 shadow-sm space-y-4">
                <div className="flex items-center space-x-2 border-b border-gray-100 pb-2">
                  <Sparkles size={16} className="text-brand-gold" />
                  <h3 className="font-serif-display text-sm font-bold text-brand-navy">Mission Section</h3>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Title (English)</label>
                    <input
                      type="text"
                      value={missionTitleEn}
                      onChange={(e) => setMissionTitleEn(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-brand-gold"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Title (Kinyarwanda)</label>
                    <input
                      type="text"
                      value={missionTitleRw}
                      onChange={(e) => setMissionTitleRw(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-brand-gold"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Content (English)</label>
                    <textarea
                      rows={8}
                      value={missionTextEn}
                      onChange={(e) => setMissionTextEn(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-brand-gold resize-none"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Content (Kinyarwanda)</label>
                    <textarea
                      rows={8}
                      value={missionTextRw}
                      onChange={(e) => setMissionTextRw(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-brand-gold resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Vision Card */}
              <div className="glass-panel p-6 rounded-[1.75rem] border border-gray-200 shadow-sm space-y-4">
                <div className="flex items-center space-x-2 border-b border-gray-100 pb-2">
                  <ShieldCheck size={16} className="text-brand-gold" />
                  <h3 className="font-serif-display text-sm font-bold text-brand-navy">Vision Section</h3>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Title (English)</label>
                    <input
                      type="text"
                      value={visionTitleEn}
                      onChange={(e) => setVisionTitleEn(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-brand-gold"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Title (Kinyarwanda)</label>
                    <input
                      type="text"
                      value={visionTitleRw}
                      onChange={(e) => setVisionTitleRw(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-brand-gold"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Content (English)</label>
                    <textarea
                      rows={8}
                      value={visionTextEn}
                      onChange={(e) => setVisionTextEn(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-brand-gold resize-none"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Content (Kinyarwanda)</label>
                    <textarea
                      rows={8}
                      value={visionTextRw}
                      onChange={(e) => setVisionTextRw(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-brand-gold resize-none"
                    />
                  </div>
                </div>
              </div>

            </div>

            {/* Contacts & Support Details */}
            <div className="glass-panel p-6 rounded-[1.75rem] border border-gray-200 shadow-sm space-y-4">
              <div className="flex items-center space-x-2 border-b border-gray-100 pb-2">
                <Users size={16} className="text-brand-gold" />
                <h3 className="font-serif-display text-sm font-bold text-brand-navy">Contact & Location Details</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">General Office Email</label>
                  <input
                    type="email"
                    value={contactsEmail}
                    onChange={(e) => setContactsEmail(e.target.value)}
                    placeholder="sepacnyanza@gmail.com"
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-brand-gold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Physical Address (English)</label>
                  <input
                    type="text"
                    value={contactsAddressEn}
                    onChange={(e) => setContactsAddressEn(e.target.value)}
                    placeholder="ES Saint Esprit, Nyanza, Rwanda"
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-brand-gold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Physical Address (Kinyarwanda)</label>
                  <input
                    type="text"
                    value={contactsAddressRw}
                    onChange={(e) => setContactsAddressRw(e.target.value)}
                    placeholder="ES Saint Esprit, Nyanza, Rwanda"
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-brand-gold"
                  />
                </div>
              </div>

              <div className="text-xs pt-2">
                <label className="block font-bold text-gray-700 mb-1">Contact Phone Numbers</label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {contactsPhones.length === 0 ? (
                    <span className="text-gray-400 italic">No contact phones configured.</span>
                  ) : (
                    contactsPhones.map((phone) => (
                      <span key={phone} className="inline-flex items-center bg-gray-100 text-gray-800 px-3 py-1 rounded-full font-semibold">
                        {phone}
                        <button
                          type="button"
                          onClick={() => removePhone(phone)}
                          className="ml-2 text-red-500 hover:text-red-700 font-bold"
                        >
                          ×
                        </button>
                      </span>
                    ))
                  )}
                </div>

                <div className="flex max-w-sm gap-2">
                  <input
                    type="text"
                    value={newPhoneInput}
                    onChange={(e) => setNewPhoneInput(e.target.value)}
                    placeholder="e.g. +250 796 409 467"
                    className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-brand-gold"
                  />
                  <button
                    type="button"
                    onClick={addPhone}
                    className="px-4 py-2 bg-brand-navy hover:bg-brand-navy-light text-white rounded-lg font-bold"
                  >
                    Add Phone
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold uppercase tracking-wider rounded-[1.75rem] shadow-lg transition-all flex items-center space-x-2 cursor-pointer"
              >
                <Save size={16} />
                <span>Save Section & Contact Settings</span>
              </button>
            </div>
          </form>

          {/* Leadership Team management section */}
          <div className="glass-panel p-6 rounded-[1.75rem] border border-gray-200 shadow-sm space-y-6">
            <div className="flex items-center space-x-2 border-b border-gray-100 pb-2">
              <Users size={18} className="text-brand-gold" />
              <h3 className="font-serif-display text-base font-bold text-brand-navy">Leadership Team Members</h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Form to Add Team Member */}
              <div className="bg-gray-50 p-5 rounded-[1.75rem] border border-gray-100 space-y-4">
                <h4 className="font-bold text-xs text-brand-navy border-b pb-1">Add New Team Member</h4>
                
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      value={newLeaderName}
                      onChange={(e) => setNewLeaderName(e.target.value)}
                      placeholder="e.g. Eric Kalisa"
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Role/Position (English) *</label>
                    <input
                      type="text"
                      value={newLeaderRoleEn}
                      onChange={(e) => setNewLeaderRoleEn(e.target.value)}
                      placeholder="e.g. Treasurer"
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Role/Position (Kinyarwanda)</label>
                    <input
                      type="text"
                      value={newLeaderRoleRw}
                      onChange={(e) => setNewLeaderRoleRw(e.target.value)}
                      placeholder="e.g. Umbitsi"
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Graduation Year (Class of) *</label>
                    <input
                      type="number"
                      value={newLeaderYear}
                      onChange={(e) => setNewLeaderYear(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none"
                    />
                  </div>
                  
                  {/* Avatar Upload */}
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Leader Photo</label>
                    <div
                      onClick={() => leaderAvatarFileRef.current?.click()}
                      className="border border-dashed border-gray-300 hover:border-brand-gold glass-panel rounded-lg p-3 text-center cursor-pointer hover:bg-brand-cream/10 transition-all flex items-center justify-center space-x-2"
                    >
                      <input
                        ref={leaderAvatarFileRef}
                        type="file"
                        onChange={handleLeaderAvatarUpload}
                        accept="image/*"
                        className="hidden"
                      />
                      {newLeaderAvatar ? (
                        <div className="flex items-center space-x-2">
                          <img src={newLeaderAvatar} alt="Avatar Preview" className="w-8 h-8 rounded-full object-cover" />
                          <span className="text-emerald-700 font-bold text-[10px]">Photo loaded</span>
                        </div>
                      ) : (
                        <>
                          <Upload size={14} className="text-brand-navy" />
                          <span className="text-[11px] text-gray-500">{uploadingLeaderAvatar ? 'Uploading...' : 'Choose avatar photo'}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddLeader}
                    disabled={uploadingLeaderAvatar}
                    className="w-full py-2 bg-brand-navy hover:bg-brand-navy-light text-white font-bold uppercase rounded-lg transition-colors cursor-pointer"
                  >
                    Add to Team
                  </button>
                </div>
              </div>

              {/* Current Team list with remove action */}
              <div className="lg:col-span-2 space-y-3">
                <h4 className="font-bold text-xs text-brand-navy">Current Leadership Roll</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[420px] overflow-y-auto pr-1">
                  {(siteSettings?.leadershipTeam || []).length === 0 ? (
                    <p className="text-xs text-gray-400 italic">No team members added yet.</p>
                  ) : (
                    siteSettings?.leadershipTeam.map((member) => (
                      <div key={member.id} className="glass-panel p-4 rounded-[1.75rem] border border-gray-100 shadow-sm flex items-start space-x-3 text-xs justify-between">
                        <div className="flex items-center space-x-3 min-w-0">
                          <img
                            src={member.avatar}
                            alt={member.name}
                            className="w-12 h-12 rounded-full object-cover border-2 border-brand-gold shrink-0 font-sans"
                            referrerPolicy="no-referrer"
                          />
                          <div className="min-w-0">
                            <h5 className="font-bold text-gray-800 truncate">{member.name}</h5>
                            <p className="text-[10px] text-brand-navy font-semibold">{member.role_en}</p>
                            <p className="text-[9px] text-gray-400">Class of {member.year}</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleDeleteLeader(member.id)}
                          className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 shrink-0 transition-all"
                          title="Remove Leader"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

            </div>
          </div>

        </div>
      )}

    </div>
  );
}
