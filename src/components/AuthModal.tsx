import React, { useState, useRef, useEffect } from 'react';
import { useSEPAC } from '../context/SEPACContext';
import { X, Upload, CheckCircle2, AlertCircle } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
}

export default function AuthModal({ isOpen, onClose, initialMode = 'login' }: AuthModalProps) {
  const { t, login, register, uploadImageBase64 } = useSEPAC();
  const [isLogin, setIsLogin] = useState(initialMode === 'login');

  useEffect(() => {
    if (isOpen) {
      setIsLogin(initialMode === 'login');
    }
  }, [isOpen, initialMode]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [gradYear, setGradYear] = useState('2015');
  const [phone, setPhone] = useState('');
  const [bio, setBio] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // File Upload Handlers (Drag & Drop + Click)
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const processFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Only image files are supported for profile avatars.');
      return;
    }
    
    setUploading(true);
    setError('');
    
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        const base64 = reader.result as string;
        const extension = file.name.split('.').pop() || 'jpg';
        const uploadedUrl = await uploadImageBase64(base64, extension);
        if (uploadedUrl) {
          setAvatarUrl(uploadedUrl);
        } else {
          setError('Failed to upload image onto the server.');
        }
        setUploading(false);
      };
    } catch (err) {
      setError('Error processing photo file.');
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSubmitting(true);

    if (isLogin) {
      if (!email || !password) {
        setError(t('auth.errorFields'));
        setSubmitting(false);
        return;
      }
      
      const res = await login(email, password);
      if (res.success) {
        onClose();
      } else {
        setError(res.error || 'Authentication failed. Please check credentials.');
      }
    } else {
      if (!email || !name || !gradYear || !password) {
        setError(t('auth.errorFields'));
        setSubmitting(false);
        return;
      }

      const yearNum = Number(gradYear);
      if (isNaN(yearNum) || yearNum < 1960 || yearNum > 2027) {
        setError('Please enter a valid graduation year.');
        setSubmitting(false);
        return;
      }

      const res = await register({
        email,
        name,
        graduation_year: yearNum,
        phone,
        bio,
        avatar_url: avatarUrl,
        password
      });

      if (res.success) {
        if (email.toLowerCase() === 'jemuvalos@gmail.com') {
          // Logged in immediately as Super Admin
          onClose();
        } else {
          setSuccess(res.message || t('auth.registerSuccess'));
          // Reset fields
          setEmail('');
          setName('');
          setPhone('');
          setBio('');
          setAvatarUrl('');
          setIsLogin(true);
        }
      } else {
        setError(res.error || 'Registration failed.');
      }
    }
    setSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-navy-dark/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg glass-panel rounded-3xl shadow-2xl border border-white/60 overflow-hidden my-8">
        
        {/* Header Block */}
        <div className="bg-brand-navy text-white px-6 py-4 flex items-center justify-between border-b border-brand-gold/40">
          <h2 className="font-serif-display text-lg font-bold tracking-wide text-brand-gold">
            {isLogin ? t('auth.loginTitle') : t('auth.registerTitle')}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-300 hover:text-white hover:bg-white/10 p-1.5 rounded-full transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Block */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {error && (
            <div className="flex items-start space-x-2 bg-red-50 text-red-700 p-3 rounded-lg text-xs border border-red-100">
              <AlertCircle size={16} className="mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="flex items-start space-x-2 bg-emerald-50 text-emerald-800 p-3 rounded-lg text-xs border border-emerald-100">
              <CheckCircle2 size={16} className="mt-0.5 shrink-0" />
              <span>{success}</span>
            </div>
          )}

          {!isLogin && (
            <div className="space-y-4">
              {/* Profile Image Drag-and-Drop Uploader */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  {t('auth.avatar')}
                </label>
                <div
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                  onClick={triggerFileSelect}
                  className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
                    dragActive 
                      ? 'border-brand-gold bg-brand-cream' 
                      : avatarUrl 
                        ? 'border-emerald-300 bg-emerald-50/25' 
                        : 'border-gray-300 hover:border-brand-gold hover:bg-brand-cream/30'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                  {avatarUrl ? (
                    <div className="flex items-center justify-center space-x-3">
                      <img
                        src={avatarUrl}
                        alt="Avatar Preview"
                        className="w-12 h-12 rounded-full object-cover border border-brand-gold"
                      />
                      <div className="text-left">
                        <p className="text-xs font-bold text-emerald-800">Photo Uploaded Successfully</p>
                        <p className="text-[10px] text-gray-500">Drag another photo or click to change</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-1 text-gray-600">
                      <Upload size={20} className="mx-auto text-brand-navy" />
                      <p className="text-xs font-medium">
                        {uploading ? 'Uploading picture...' : 'Drag and drop your profile photo, or click to upload'}
                      </p>
                      <p className="text-[10px] text-gray-400">Supports PNG, JPG, GIF up to 5MB</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  {t('auth.fullName')} *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jean de Dieu Niyomugabo"
                  className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-brand-gold focus:border-brand-gold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Graduation Year */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    {t('auth.gradYear')} *
                  </label>
                  <input
                    type="number"
                    required
                    min="1960"
                    max="2027"
                    value={gradYear}
                    onChange={(e) => setGradYear(e.target.value)}
                    placeholder="2015"
                    className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-brand-gold focus:border-brand-gold"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    {t('auth.phone')}
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+250 788 000 000"
                    className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-brand-gold focus:border-brand-gold"
                  />
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  {t('auth.bio')}
                </label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell us about yourself and your faith journey..."
                  rows={2}
                  className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-brand-gold focus:border-brand-gold resize-none"
                />
              </div>
            </div>
          )}

          {/* Email Address */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              {t('auth.email')} *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-brand-gold focus:border-brand-gold"
            />
            {email.toLowerCase() === 'jemuvalos@gmail.com' && (
              <p className="mt-1 text-[10px] text-brand-gold-dark font-bold">
                ✓ Special Email: This account will register directly as Super Admin.
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              {t('auth.password')} *
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-brand-gold focus:border-brand-gold"
            />
            {isLogin && (
              <p className="mt-1 text-[10px] text-gray-400">
                Tip: Standard password accepted.
              </p>
            )}
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            disabled={submitting || uploading}
            className="w-full bg-brand-navy hover:bg-brand-navy-light disabled:bg-gray-400 text-white font-bold py-3 rounded-lg text-xs uppercase tracking-wider transition-all duration-150 shadow-md border border-brand-navy/20"
          >
            {submitting 
              ? 'Processing...' 
              : isLogin 
                ? t('auth.submitLogin') 
                : t('auth.submitRegister')}
          </button>

          {/* Switch Action */}
          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
                setSuccess('');
              }}
              className="text-xs text-brand-navy-light hover:text-brand-gold hover:underline font-medium transition-colors"
            >
              {isLogin ? t('auth.noAccount') : t('auth.hasAccount')}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
