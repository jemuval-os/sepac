import React, { useEffect, useState } from 'react';
import SEPACSeal from './SEPACSeal';
import { useSEPAC } from '../context/SEPACContext';

export default function WelcomeSplash() {
  const { t } = useSEPAC();
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const alreadyWelcomed = sessionStorage.getItem('sepac_welcomed');
    if (!alreadyWelcomed) {
      setVisible(true);
    }
  }, []);

  const dismiss = () => {
    setClosing(true);
    sessionStorage.setItem('sepac_welcomed', 'true');
    setTimeout(() => setVisible(false), 600);
  };

  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(dismiss, 3200);
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
          <SEPACSeal size={168} className="drop-shadow-[0_8px_40px_rgba(0,0,0,0.35)]" />
        </div>
        <div className="splash-text-in mt-6 glass-panel px-8 py-5 max-w-sm">
          <p className="font-serif-display text-xl font-bold text-brand-navy">
            Welcome to SEPAC
          </p>
          <p className="text-xs text-brand-navy/70 mt-1 tracking-wide">
            Saint Esprit Protestant Alumni Community
          </p>
          <p className="text-[11px] text-brand-gold-dark font-bold uppercase tracking-[0.2em] mt-3">
            Unity &middot; Faith &middot; Fellowship &middot; Service
          </p>
        </div>
        <p className="splash-text-in text-white/60 text-[11px] mt-8 uppercase tracking-widest">
          Tap anywhere to enter
        </p>
      </div>
    </div>
  );
}
