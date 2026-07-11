import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  Profile,
  Post,
  Comment,
  Like,
  Event,
  GalleryItem,
  PrayerRequest,
  PrayerEncouragement,
  Announcement,
  Language,
  UserRole,
  Advertisement,
  SiteSettings
} from '../types';
import { translations } from '../translations';
import { supabase, UPLOAD_BUCKET } from '../lib/supabaseClient';

interface SEPACContextProps {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => any;
  user: Profile | null;
  setUser: (user: Profile | null) => void;
  members: Profile[];
  posts: Post[];
  events: Event[];
  gallery: GalleryItem[];
  prayerRequests: PrayerRequest[];
  announcements: Announcement[];
  advertisements: Advertisement[];
  analytics: any;
  likes: Like[];
  siteSettings: SiteSettings | null;

  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: Partial<Profile> & { password?: string }) => Promise<{ success: boolean; message?: string; error?: string }>;
  logout: () => void;
  updateProfile: (data: Partial<Profile>) => Promise<boolean>;

  approveMember: (id: string, approved: boolean) => Promise<boolean>;
  updateMemberRole: (id: string, role: UserRole) => Promise<boolean>;
  deleteMember: (id: string) => Promise<boolean>;

  createPost: (title: string, content: string, category: Post['category'], imageUrl?: string) => Promise<boolean>;
  updatePostStatus: (id: string, status: Post['status']) => Promise<boolean>;
  deletePost: (id: string) => Promise<boolean>;
  likePost: (postId: string) => Promise<boolean>;
  addComment: (postId: string, content: string) => Promise<boolean>;
  getCommentsForPost: (postId: string) => Promise<Comment[]>;
  deleteComment: (id: string) => Promise<boolean>;

  createEvent: (title: string, description: string, date: string, location: string, imageUrl?: string) => Promise<boolean>;
  rsvpEvent: (eventId: string) => Promise<boolean>;
  deleteEvent: (id: string) => Promise<boolean>;
  updateEvent: (id: string, title: string, description: string, date: string, location: string, imageUrl?: string) => Promise<boolean>;

  uploadPhoto: (imageUrl: string, eventTag: string) => Promise<boolean>;
  approvePhoto: (id: string, approved: boolean) => Promise<boolean>;
  deleteGalleryItem: (id: string) => Promise<boolean>;

  updateSiteSettings: (settings: SiteSettings) => Promise<boolean>;

  submitPrayer: (content: string, visibility: PrayerRequest['visibility']) => Promise<boolean>;
  prayForRequest: (id: string) => Promise<boolean>;
  addPrayerComment: (id: string, content: string) => Promise<boolean>;
  deletePrayerRequest: (id: string) => Promise<boolean>;
  deletePrayerComment: (id: string) => Promise<boolean>;

  createAnnouncement: (title: string, body: string, sentBy?: string) => Promise<boolean>;
  deleteAnnouncement: (id: string) => Promise<boolean>;

  createAdvertisement: (title: string, description: string, imageUrl?: string, link?: string) => Promise<boolean>;
  deleteAdvertisement: (id: string) => Promise<boolean>;

  uploadImageBase64: (base64Data: string, extension?: string) => Promise<string | null>;
  refreshAnalytics: () => void;
}

const SEPACContext = createContext<SEPACContextProps | undefined>(undefined);

export function SEPACProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    return (localStorage.getItem('sepac_lang') as Language) || 'en';
  });

  const [user, setUserState] = useState<Profile | null>(null);
  const [members, setMembers] = useState<Profile[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [likes, setLikes] = useState<Like[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [prayerRequests, setPrayerRequests] = useState<PrayerRequest[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);
  const [analytics, setAnalytics] = useState<any>({
    approvedMembers: 0,
    totalMembers: 0,
    approvedPosts: 0,
    totalPosts: 0,
    prayerRequestsCount: 0,
    eventsCount: 0,
    totalGallery: 0
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('sepac_lang', newLang);
  };

  const t = (path: string): any => {
    const keys = path.split('.');
    let current: any = translations[lang];
    for (const key of keys) {
      if (current && current[key] !== undefined) {
        current = current[key];
      } else {
        return path;
      }
    }
    return current;
  };

  // ---------- fetchers ----------
  const fetchProfile = async (id: string): Promise<Profile | null> => {
    const { data } = await supabase.from('profiles').select('*').eq('id', id).maybeSingle();
    return data as Profile | null;
  };

  const fetchMembers = useCallback(async () => {
    const { data } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
    if (data) setMembers(data as Profile[]);
  }, []);

  const fetchPosts = useCallback(async () => {
    const { data } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
    if (data) setPosts(data as Post[]);
  }, []);

  const fetchLikes = useCallback(async () => {
    const { data } = await supabase.from('likes').select('*');
    if (data) setLikes(data as Like[]);
  }, []);

  const fetchEvents = useCallback(async () => {
    const { data } = await supabase.from('events').select('*').order('date', { ascending: true });
    if (data) setEvents(data as Event[]);
  }, []);

  const fetchGallery = useCallback(async () => {
    const { data } = await supabase.from('gallery_items').select('*').order('created_at', { ascending: false });
    if (data) setGallery(data as GalleryItem[]);
  }, []);

  const fetchPrayers = useCallback(async () => {
    const { data: prayers } = await supabase.from('prayer_requests').select('*').order('created_at', { ascending: false });
    const { data: comments } = await supabase.from('prayer_comments').select('*').order('created_at', { ascending: true });
    if (prayers) {
      const withComments: PrayerRequest[] = prayers.map((p: any) => ({
        ...p,
        comments: (comments || []).filter((c: any) => c.prayer_id === p.id) as PrayerEncouragement[]
      }));
      setPrayerRequests(withComments);
    }
  }, []);

  const fetchAnnouncements = useCallback(async () => {
    const { data } = await supabase.from('announcements').select('*').order('created_at', { ascending: false });
    if (data) setAnnouncements(data as Announcement[]);
  }, []);

  const fetchAds = useCallback(async () => {
    const { data } = await supabase.from('advertisements').select('*').order('created_at', { ascending: false });
    if (data) setAdvertisements(data as Advertisement[]);
  }, []);

  const fetchSiteSettings = useCallback(async () => {
    const { data } = await supabase.from('site_settings').select('data').eq('id', 1).maybeSingle();
    if (data) setSiteSettings(data.data as SiteSettings);
  }, []);

  const refreshAnalytics = useCallback(() => {
    setAnalytics((prev: any) => ({ ...prev }));
  }, []);

  useEffect(() => {
    setAnalytics({
      approvedMembers: members.filter(m => m.approved).length,
      totalMembers: members.length,
      approvedPosts: posts.filter(p => p.status === 'approved').length,
      totalPosts: posts.length,
      prayerRequestsCount: prayerRequests.length,
      eventsCount: events.length,
      totalGallery: gallery.length
    });
  }, [members, posts, prayerRequests, events, gallery]);

  const fetchAllData = useCallback(async () => {
    await Promise.all([
      fetchMembers(), fetchPosts(), fetchLikes(), fetchEvents(), fetchGallery(),
      fetchPrayers(), fetchAnnouncements(), fetchAds(), fetchSiteSettings()
    ]);
  }, [fetchMembers, fetchPosts, fetchLikes, fetchEvents, fetchGallery, fetchPrayers, fetchAnnouncements, fetchAds, fetchSiteSettings]);

  // ---------- session + realtime bootstrap ----------
  useEffect(() => {
    fetchAllData();

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        const profile = await fetchProfile(session.user.id);
        setUserState(profile);
      }
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const profile = await fetchProfile(session.user.id);
        setUserState(profile);
      } else {
        setUserState(null);
      }
    });

    const channel = supabase
      .channel('sepac-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles' }, fetchMembers)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'posts' }, fetchPosts)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'likes' }, fetchLikes)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'comments' }, () => {})
      .on('postgres_changes', { event: '*', schema: 'public', table: 'events' }, fetchEvents)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'gallery_items' }, fetchGallery)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'prayer_requests' }, fetchPrayers)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'prayer_comments' }, fetchPrayers)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'announcements' }, fetchAnnouncements)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'advertisements' }, fetchAds)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'site_settings' }, fetchSiteSettings)
      .subscribe();

    return () => {
      authListener.subscription.unsubscribe();
      supabase.removeChannel(channel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---------- auth ----------
  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error || !data.user) {
        return { success: false, error: error?.message || 'Invalid email or password' };
      }
      const profile = await fetchProfile(data.user.id);
      setUserState(profile);
      return { success: true };
    } catch (err) {
      return { success: false, error: 'Network error connecting to SEPAC Auth' };
    }
  };

  const register = async (data: Partial<Profile> & { password?: string }): Promise<{ success: boolean; message?: string; error?: string }> => {
    try {
      const { data: signUpData, error } = await supabase.auth.signUp({
        email: data.email!,
        password: data.password || '',
        options: {
          data: {
            name: data.name,
            graduation_year: data.graduation_year,
            years_studied: data.years_studied,
            phone: data.phone,
            bio: data.bio,
            avatar_url: data.avatar_url,
            school_photo_url: data.school_photo_url
          }
        }
      });
      if (error || !signUpData.user) {
        return { success: false, error: error?.message || 'Registration failed' };
      }

      const profile = await fetchProfile(signUpData.user.id);
      if (profile?.role === 'super_admin') {
        setUserState(profile);
      }

      return {
        success: true,
        message: 'Account created and activated. Welcome to SEPAC!'
      };
    } catch (err) {
      return { success: false, error: 'Registration failed due to networking issues' };
    }
  };

  const logout = () => {
    supabase.auth.signOut();
    setUserState(null);
  };

  const updateProfile = async (data: Partial<Profile>): Promise<boolean> => {
    if (!user) return false;
    const { data: updated, error } = await supabase.from('profiles').update(data).eq('id', user.id).select().maybeSingle();
    if (error || !updated) return false;
    setUserState(updated as Profile);
    return true;
  };

  // ---------- admin: members ----------
  const approveMember = async (id: string, approved: boolean): Promise<boolean> => {
    const { error } = await supabase.from('profiles').update({ approved }).eq('id', id);
    return !error;
  };

  const updateMemberRole = async (id: string, role: UserRole): Promise<boolean> => {
    const { error } = await supabase.from('profiles').update({ role }).eq('id', id);
    return !error;
  };

  const deleteMember = async (id: string): Promise<boolean> => {
    const { error } = await supabase.from('profiles').delete().eq('id', id);
    return !error;
  };

  // ---------- posts ----------
  const createPost = async (title: string, content: string, category: Post['category'], imageUrl?: string): Promise<boolean> => {
    if (!user) return false;
    const { error } = await supabase.from('posts').insert({
      title, content, category, image_url: imageUrl,
      author_id: user.id, author_name: user.name, author_avatar: user.avatar_url
    });
    return !error;
  };

  const updatePostStatus = async (id: string, status: Post['status']): Promise<boolean> => {
    const { error } = await supabase.from('posts').update({ status }).eq('id', id);
    return !error;
  };

  const deletePost = async (id: string): Promise<boolean> => {
    const { error } = await supabase.from('posts').delete().eq('id', id);
    return !error;
  };

  const likePost = async (postId: string): Promise<boolean> => {
    if (!user) return false;
    const existing = likes.find(l => l.post_id === postId && l.user_id === user.id);
    if (existing) {
      const { error } = await supabase.from('likes').delete().eq('post_id', postId).eq('user_id', user.id);
      return !error;
    }
    const { error } = await supabase.from('likes').insert({ post_id: postId, user_id: user.id });
    return !error;
  };

  const addComment = async (postId: string, content: string): Promise<boolean> => {
    if (!user) return false;
    const { error } = await supabase.from('comments').insert({
      post_id: postId, author_id: user.id, author_name: user.name, author_avatar: user.avatar_url, content
    });
    return !error;
  };

  const getCommentsForPost = async (postId: string): Promise<Comment[]> => {
    const { data } = await supabase.from('comments').select('*').eq('post_id', postId).order('created_at', { ascending: true });
    return (data || []) as Comment[];
  };

  const deleteComment = async (id: string): Promise<boolean> => {
    const { error } = await supabase.from('comments').delete().eq('id', id);
    return !error;
  };

  // ---------- events ----------
  const createEvent = async (title: string, description: string, date: string, location: string, imageUrl?: string): Promise<boolean> => {
    const { error } = await supabase.from('events').insert({ title, description, date, location, image_url: imageUrl });
    return !error;
  };

  const rsvpEvent = async (eventId: string): Promise<boolean> => {
    if (!user) return false;
    const ev = events.find(e => e.id === eventId);
    if (!ev) return false;
    const has = ev.rsvps.includes(user.id);
    const newRsvps = has ? ev.rsvps.filter(id => id !== user.id) : [...ev.rsvps, user.id];
    const { error } = await supabase.from('events').update({ rsvps: newRsvps }).eq('id', eventId);
    return !error;
  };

  const deleteEvent = async (id: string): Promise<boolean> => {
    const { error } = await supabase.from('events').delete().eq('id', id);
    return !error;
  };

  const updateEvent = async (id: string, title: string, description: string, date: string, location: string, imageUrl?: string): Promise<boolean> => {
    const { error } = await supabase.from('events').update({ title, description, date, location, image_url: imageUrl }).eq('id', id);
    return !error;
  };

  // ---------- gallery ----------
  const uploadPhoto = async (imageUrl: string, eventTag: string): Promise<boolean> => {
    if (!user) return false;
    const { error } = await supabase.from('gallery_items').insert({
      image_url: imageUrl, event_tag: eventTag, uploader_id: user.id, uploader_name: user.name
    });
    return !error;
  };

  const approvePhoto = async (id: string, approved: boolean): Promise<boolean> => {
    const { error } = await supabase.from('gallery_items').update({ approved }).eq('id', id);
    return !error;
  };

  const deleteGalleryItem = async (id: string): Promise<boolean> => {
    const { error } = await supabase.from('gallery_items').delete().eq('id', id);
    return !error;
  };

  // ---------- prayers ----------
  const submitPrayer = async (content: string, visibility: PrayerRequest['visibility']): Promise<boolean> => {
    if (!user) return false;
    const { error } = await supabase.from('prayer_requests').insert({
      content, visibility, author_id: user.id, author_name: user.name, author_avatar: user.avatar_url
    });
    return !error;
  };

  const prayForRequest = async (id: string): Promise<boolean> => {
    if (!user) return false;
    const pr = prayerRequests.find(p => p.id === id);
    if (!pr) return false;
    const has = pr.praying_users.includes(user.id);
    const newPraying = has ? pr.praying_users.filter(uid => uid !== user.id) : [...pr.praying_users, user.id];
    const { error } = await supabase.from('prayer_requests').update({ praying_users: newPraying }).eq('id', id);
    return !error;
  };

  const addPrayerComment = async (id: string, content: string): Promise<boolean> => {
    if (!user) return false;
    const { error } = await supabase.from('prayer_comments').insert({
      prayer_id: id, author_id: user.id, author_name: user.name, author_avatar: user.avatar_url, content
    });
    return !error;
  };

  const deletePrayerRequest = async (id: string): Promise<boolean> => {
    const { error } = await supabase.from('prayer_requests').delete().eq('id', id);
    return !error;
  };

  const deletePrayerComment = async (id: string): Promise<boolean> => {
    const { error } = await supabase.from('prayer_comments').delete().eq('id', id);
    return !error;
  };

  // ---------- announcements ----------
  const createAnnouncement = async (title: string, body: string, sentBy?: string): Promise<boolean> => {
    const { error } = await supabase.from('announcements').insert({ title, body, sent_by: sentBy });
    return !error;
  };

  const deleteAnnouncement = async (id: string): Promise<boolean> => {
    const { error } = await supabase.from('announcements').delete().eq('id', id);
    return !error;
  };

  // ---------- advertisements ----------
  const createAdvertisement = async (title: string, description: string, imageUrl?: string, link?: string): Promise<boolean> => {
    const { error } = await supabase.from('advertisements').insert({ title, description, image_url: imageUrl, link });
    return !error;
  };

  const deleteAdvertisement = async (id: string): Promise<boolean> => {
    const { error } = await supabase.from('advertisements').delete().eq('id', id);
    return !error;
  };

  // ---------- site settings ----------
  const updateSiteSettings = async (settings: SiteSettings): Promise<boolean> => {
    const { error } = await supabase.from('site_settings').update({ data: settings, updated_at: new Date().toISOString() }).eq('id', 1);
    return !error;
  };

  // ---------- image upload (Supabase Storage) ----------
  const uploadImageBase64 = async (base64Data: string, extension: string = 'jpg'): Promise<string | null> => {
    try {
      const res = await fetch(base64Data);
      const blob = await res.blob();
      const fileName = `${crypto.randomUUID()}.${extension}`;
      const { error } = await supabase.storage.from(UPLOAD_BUCKET).upload(fileName, blob, {
        contentType: blob.type || `image/${extension}`,
        upsert: false
      });
      if (error) {
        console.error('Upload failed', error);
        return null;
      }
      const { data } = supabase.storage.from(UPLOAD_BUCKET).getPublicUrl(fileName);
      return data.publicUrl;
    } catch (err) {
      console.error('Failed to upload image', err);
      return null;
    }
  };

  return (
    <SEPACContext.Provider value={{
      lang, setLang, t, user, setUser: setUserState,
      members, posts, events, gallery, prayerRequests, announcements, advertisements,
      analytics, likes, siteSettings,
      login, register, logout, updateProfile,
      approveMember, updateMemberRole, deleteMember,
      createPost, updatePostStatus, deletePost, likePost, addComment, getCommentsForPost, deleteComment,
      createEvent, rsvpEvent, deleteEvent, updateEvent,
      uploadPhoto, approvePhoto, deleteGalleryItem,
      updateSiteSettings,
      submitPrayer, prayForRequest, addPrayerComment, deletePrayerRequest, deletePrayerComment,
      createAnnouncement, deleteAnnouncement,
      createAdvertisement, deleteAdvertisement,
      uploadImageBase64, refreshAnalytics
    }}>
      {children}
    </SEPACContext.Provider>
  );
}

export function useSEPAC() {
  const context = useContext(SEPACContext);
  if (!context) {
    throw new Error('useSEPAC must be used within a SEPACProvider');
  }
  return context;
}
