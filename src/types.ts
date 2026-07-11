export type UserRole = 'member' | 'moderator' | 'admin' | 'super_admin';

export interface Profile {
  id: string;
  email: string;
  name: string;
  graduation_year: number;
  years_studied?: string; // Years of study at ES Saint Esprit (e.g., 2009-2012)
  phone?: string;
  bio?: string;
  avatar_url?: string;
  school_photo_url?: string; // Graduation or old school photo
  role: UserRole;
  approved: boolean;
  created_at: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  author_id: string;
  author_name: string;
  author_avatar?: string;
  status: 'pending' | 'approved' | 'rejected';
  category: 'News' | 'Events' | 'Devotional' | 'Announcement';
  image_url?: string;
  created_at: string;
}

export interface Comment {
  id: string;
  post_id: string;
  author_id: string;
  author_name: string;
  author_avatar?: string;
  content: string;
  created_at: string;
}

export interface Like {
  post_id: string;
  user_id: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  image_url?: string;
  rsvps: string[]; // List of member profile IDs who RSVP'd
  created_at: string;
}

export interface GalleryItem {
  id: string;
  image_url: string;
  uploader_id: string;
  uploader_name: string;
  event_tag: string;
  approved: boolean;
  created_at: string;
}

export interface PrayerRequest {
  id: string;
  content: string;
  author_id: string;
  author_name: string;
  author_avatar?: string;
  visibility: 'public' | 'private';
  praying_users: string[]; // List of user IDs who clicked "pray" / reacted
  comments: PrayerEncouragement[];
  created_at: string;
}

export interface PrayerEncouragement {
  id: string;
  author_id: string;
  author_name: string;
  author_avatar?: string;
  content: string;
  created_at: string;
}

export interface Announcement {
  id: string;
  title: string;
  body: string;
  sent_by: string;
  created_at: string;
}

export interface Advertisement {
  id: string;
  title: string;
  description: string;
  image_url?: string;
  link?: string;
  created_at: string;
}

export type Language = 'en' | 'rw';

export interface TranslationDictionary {
  nav: {
    home: string;
    about: string;
    news: string;
    events: string;
    gallery: string;
    prayer: string;
    contact: string;
    members: string;
    admin: string;
    login: string;
    register: string;
    logout: string;
    profile: string;
    adverts: string;
  };
  hero: {
    title: string;
    tagline: string;
    joinUs: string;
    learnMore: string;
    viewEvents: string;
  };
  scripture: {
    verse: string;
    reference: string;
  };
  values: {
    unity: string;
    unityDesc: string;
    faith: string;
    faithDesc: string;
    fellowship: string;
    fellowshipDesc: string;
    service: string;
    serviceDesc: string;
  };
  about: {
    historyTitle: string;
    historyText1: string;
    historyText2: string;
    mission: string;
    missionText: string;
    vision: string;
    visionText: string;
    teamTitle: string;
  };
  auth: {
    loginTitle: string;
    registerTitle: string;
    email: string;
    password: string;
    fullName: string;
    gradYear: string;
    phone: string;
    bio: string;
    avatar: string;
    noAccount: string;
    hasAccount: string;
    submitLogin: string;
    submitRegister: string;
    errorFields: string;
    registerSuccess: string;
  };
  posts: {
    feedTitle: string;
    createPost: string;
    category: string;
    titleLabel: string;
    contentLabel: string;
    imageLabel: string;
    submitPost: string;
    pendingApproval: string;
    noPosts: string;
    comments: string;
    writeComment: string;
    like: string;
    comment: string;
    addCommentBtn: string;
  };
  eventsPage: {
    title: string;
    upcoming: string;
    past: string;
    rsvp: string;
    rsvped: string;
    noEvents: string;
    location: string;
    date: string;
  };
  galleryPage: {
    title: string;
    upload: string;
    eventTag: string;
    imageUrl: string;
    uploadSuccess: string;
    pendingApproval: string;
  };
  prayerPage: {
    title: string;
    submitRequest: string;
    placeholder: string;
    visibility: string;
    public: string;
    private: string;
    submitBtn: string;
    prayCount: string;
    prayAction: string;
    writeEncouragement: string;
    sendBtn: string;
  };
  contactPage: {
    title: string;
    name: string;
    email: string;
    message: string;
    send: string;
    success: string;
  };
}

export interface LeadershipTeamMember {
  id: string;
  name: string;
  role_en: string;
  role_rw: string;
  year: number;
  avatar: string;
}

export interface SiteSettings {
  historyTitle_en: string;
  historyTitle_rw: string;
  historyText1_en: string;
  historyText1_rw: string;
  historyText2_en: string;
  historyText2_rw: string;
  missionTitle_en: string;
  missionTitle_rw: string;
  missionText_en: string;
  missionText_rw: string;
  visionTitle_en: string;
  visionTitle_rw: string;
  visionText_en: string;
  visionText_rw: string;
  leadershipTeam: LeadershipTeamMember[];
  contacts: {
    email: string;
    phones: string[];
    address_en: string;
    address_rw: string;
  };
}

