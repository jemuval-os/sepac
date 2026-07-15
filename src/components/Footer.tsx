import React from 'react';
import { useSEPAC } from '../context/SEPACContext';
import SEPACSeal from './SEPACSeal';
import { Mail, Phone, MapPin, Heart } from 'lucide-react';

export default function Footer({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  const { t, siteSettings, lang } = useSEPAC();

  const email = siteSettings?.contacts?.email || 'sepacnyanza@gmail.com';
  const phones = siteSettings?.contacts?.phones || ['+250 796 409 467', '+250 786 047 305', '+250 796 379 882'];
  const address = (lang === 'rw' ? siteSettings?.contacts?.address_rw : siteSettings?.contacts?.address_en) || 'ES Saint Esprit, Nyanza, Rwanda';

  return (
    <footer className="glass-panel-dark rounded-none border-x-0 border-b-0 font-sans mt-12">
      
      {/* Upper Scripture Banner */}
      <div className="bg-black/15 border-b border-white/10 py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-serif-display text-base sm:text-lg italic text-brand-gold-light leading-relaxed tracking-wide">
            "{t('scripture.verse')}"
          </p>
          <p className="mt-2 text-brand-gold text-xs font-bold uppercase tracking-widest">
            — {t('scripture.reference')}
          </p>
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand & Logo block */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <SEPACSeal size={64} className="glass-panel rounded-full p-0.5 border border-brand-gold" />
              <div>
                <h3 className="font-serif-display text-lg font-bold text-white tracking-wider">SEPAC</h3>
                <p className="text-[10px] text-brand-gold uppercase tracking-widest font-bold -mt-1">
                  {t('hero.tagline')}
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed max-w-sm">
              Saint Esprit Protestant Alumni Community (SEPAC) is a fellowship dedicated to uniting graduates in faith, supporting our alma mater, and reaching out to the community in Christ.
            </p>
          </div>

          {/* Quick Nav links */}
          <div>
            <h4 className="font-serif-display text-sm font-bold text-brand-gold uppercase tracking-widest border-b border-brand-gold/30 pb-2 mb-4">
              Explore
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveTab('home')} className="text-gray-300 hover:text-brand-gold transition-colors">
                  {t('nav.home')}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('about')} className="text-gray-300 hover:text-brand-gold transition-colors">
                  {t('nav.about')}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('news')} className="text-gray-300 hover:text-brand-gold transition-colors">
                  {t('nav.news')}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('events')} className="text-gray-300 hover:text-brand-gold transition-colors">
                  {t('nav.events')}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('contact')} className="text-gray-300 hover:text-brand-gold transition-colors">
                  {t('nav.contact')}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact info block */}
          <div>
            <h4 className="font-serif-display text-sm font-bold text-brand-gold uppercase tracking-widest border-b border-brand-gold/30 pb-2 mb-4">
              Contact
            </h4>
            <ul className="space-y-3 text-xs text-gray-300">
              <li className="flex items-start space-x-2">
                <Mail size={14} className="mt-0.5 text-brand-gold shrink-0" />
                <span className="select-all">{email}</span>
              </li>
              <li className="flex items-start space-x-2">
                <Phone size={14} className="mt-0.5 text-brand-gold shrink-0" />
                <span className="flex flex-col space-y-0.5">
                  {phones.map((phone, index) => (
                    <span key={index}>{phone}</span>
                  ))}
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin size={14} className="mt-0.5 text-brand-gold shrink-0" />
                <span>{address}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Lower copyright bar */}
        <div className="mt-12 pt-8 border-t border-brand-gold/10 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400">
          <p>© {new Date().getFullYear()} SEPAC. All Rights Reserved.</p>
          <p className="flex items-center mt-2 sm:mt-0">
            Together in Faith and Service
            <Heart size={12} className="mx-1 text-brand-gold fill-brand-gold" />
            Class of Saint Esprit
          </p>
        </div>
      </div>
    </footer>
  );
}
