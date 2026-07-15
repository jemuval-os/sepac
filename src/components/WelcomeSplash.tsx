import React, { useEffect, useState } from 'react';
import SEPACSeal from './SEPACSeal';
import { useSEPAC } from '../context/SEPACContext';

export default function WelcomeSplash() {
  const { t } = useSEPAC();
  // Read sessionStorage synchronously during state init (not in a useEffect)
  // so the correct value is used on the very first render — this is what
  // prevents the main site from flashing behind the splash for a frame.
  const [visible, setVisible] = useState(() => !sessionStorage.getItem('sepac_welcomed'));
  const [closing, setClosing] = useState(false);

  const dismiss = () => {
    setClosing(true);
    sessionStorage.setItem('sepac_welcomed', 'true');
    setTimeout(() => setVisible(false), 600);
  };

  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(dismiss, 5000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      onClick={dismiss}
      className={`fixed inset-0 z-[100] flex items-center justify-center cursor-pointer ${closing ? 'splash-fade-out' : ''}`}
    >
      <div className="sepac-wallpaper" />
      <div className="relative flex flex-col items-center px-6 text-center">
        <div className="splash-logo-in">
          <SEPACSeal size={260} className="drop-shadow-[0_10px_50px_rgba(0,0,0,0.4)]" />
        </div>
        <div className="splash-text-in mt-8 glass-panel px-12 py-8 max-w-md">
          <p className="font-serif-display text-3xl font-bold text-brand-navy">
            Welcome to SEPAC
          </p>
          <p className="text-sm text-brand-navy/70 mt-2 tracking-wide">
            Saint Esprit Protestant Alumni Community
          </p>
          <p className="text-xs text-brand-gold-dark font-bold uppercase tracking-[0.2em] mt-4">
            Unity &middot; Faith &middot; Fellowship &middot; Service
          </p>
        </div>
        <p className="splash-text-in text-white/60 text-xs mt-10 uppercase tracking-widest">
          Tap anywhere to enter
        </p>
      </div>
    </div>
  );
}
