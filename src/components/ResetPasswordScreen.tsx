import React, { useState } from 'react';
import { Eye, EyeOff, CheckCircle2, AlertCircle } from 'lucide-react';
import { useSEPAC } from '../context/SEPACContext';
import SEPACSeal from './SEPACSeal';

export default function ResetPasswordScreen() {
  const { updatePassword, setPasswordRecoveryMode } = useSEPAC();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setSubmitting(true);
    const res = await updatePassword(password);
    setSubmitting(false);

    if (res.success) {
      setSuccess(true);
      setTimeout(() => setPasswordRecoveryMode(false), 2500);
    } else {
      setError(res.error || 'Could not update password. Please try the reset link again.');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="sepac-wallpaper" />
      <div className="relative w-full max-w-md glass-panel rounded-3xl shadow-2xl border border-white/60 overflow-hidden">
        <div className="bg-brand-navy/40 px-8 pt-8 pb-6 text-center">
          <div className="flex justify-center mb-3">
            <SEPACSeal size={64} />
          </div>
          <h2 className="font-serif-display text-xl font-bold text-brand-navy">Set a New Password</h2>
          <p className="text-xs text-brand-navy/70 mt-1">Choose a new password for your SEPAC account.</p>
        </div>

        <div className="px-8 py-6">
          {success ? (
            <div className="text-center py-6">
              <CheckCircle2 className="mx-auto text-emerald-600 mb-3" size={40} />
              <p className="font-bold text-emerald-800">Password updated!</p>
              <p className="text-xs text-gray-600 mt-1">You can now log in with your new password.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {error && (
                <p className="p-2.5 bg-red-50 text-red-700 rounded-lg font-medium flex items-center gap-2">
                  <AlertCircle size={14} className="shrink-0" /> {error}
                </p>
              )}

              <div>
                <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">New Password *</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-brand-gold focus:border-brand-gold"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-navy"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">Confirm Password *</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-brand-gold focus:border-brand-gold"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-2.5 bg-brand-navy hover:bg-brand-navy-light text-white font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer disabled:opacity-60"
              >
                {submitting ? 'Updating...' : 'Update Password'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
