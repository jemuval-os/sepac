import React from 'react';

interface SEPACSealProps {
  className?: string;
  size?: number;
}

export default function SEPACSeal({ className = '', size = 200 }: SEPACSealProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 500 500"
      className={`select-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Path for curving text at the top */}
        <path
          id="textPathTop"
          d="M 60,250 A 190,190 0 1,1 440,250"
          fill="none"
        />
        {/* Path for curving text at the bottom */}
        <path
          id="textPathBottom"
          d="M 440,250 A 190,190 0 0,1 60,250"
          fill="none"
        />
        {/* Gold gradients */}
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D8B556" />
          <stop offset="50%" stopColor="#C9A84C" />
          <stop offset="100%" stopColor="#A28434" />
        </linearGradient>
      </defs>

      {/* Background Outer Circle */}
      <circle cx="250" cy="250" r="235" fill="none" stroke="url(#goldGradient)" strokeWidth="8" />
      <circle cx="250" cy="250" r="224" fill="#FFFFFF" stroke="#1B2A6B" strokeWidth="3" />
      
      {/* Inner Decorative Rings */}
      <circle cx="250" cy="250" r="172" fill="none" stroke="#1B2A6B" strokeWidth="2.5" />
      <circle cx="250" cy="250" r="165" fill="none" stroke="url(#goldGradient)" strokeWidth="1.5" />

      {/* Arched Top Text: SAINT ESPRIT PROTESTANT ALUMNI COMMUNITY */}
      <text fill="#1B2A6B" fontSize="18.5" fontWeight="600" letterSpacing="3" fontFamily="Playfair Display, Georgia, serif">
        <textPath href="#textPathTop" startOffset="50%" textAnchor="middle">
          SAINT ESPRIT PROTESTANT ALUMNI COMMUNITY
        </textPath>
      </text>

      {/* Arched Bottom Values: UNITY | FAITH | FELLOWSHIP | SERVICE */}
      <text fill="#1B2A6B" fontSize="13" fontWeight="bold" letterSpacing="1.5" fontFamily="Inter, sans-serif">
        <textPath href="#textPathBottom" startOffset="50%" textAnchor="middle">
          UNITY  •  FAITH  •  FELLOWSHIP  •  SERVICE
        </textPath>
      </text>

      {/* Center Rays (Light burst behind Cross) */}
      <g opacity="0.15">
        <line x1="250" y1="210" x2="250" y2="70" stroke="url(#goldGradient)" strokeWidth="2" />
        <line x1="250" y1="210" x2="350" y2="110" stroke="url(#goldGradient)" strokeWidth="2" />
        <line x1="250" y1="210" x2="390" y2="210" stroke="url(#goldGradient)" strokeWidth="2" />
        <line x1="250" y1="210" x2="350" y2="310" stroke="url(#goldGradient)" strokeWidth="2" />
        <line x1="250" y1="210" x2="250" y2="350" stroke="url(#goldGradient)" strokeWidth="2" />
        <line x1="250" y1="210" x2="150" y2="310" stroke="url(#goldGradient)" strokeWidth="2" />
        <line x1="250" y1="210" x2="110" y2="210" stroke="url(#goldGradient)" strokeWidth="2" />
        <line x1="250" y1="210" x2="150" y2="110" stroke="url(#goldGradient)" strokeWidth="2" />
        
        {/* Intermediate rays */}
        <line x1="250" y1="210" x2="300" y2="80" stroke="url(#goldGradient)" strokeWidth="1" />
        <line x1="250" y1="210" x2="380" y2="150" stroke="url(#goldGradient)" strokeWidth="1" />
        <line x1="250" y1="210" x2="380" y2="270" stroke="url(#goldGradient)" strokeWidth="1" />
        <line x1="250" y1="210" x2="300" y2="340" stroke="url(#goldGradient)" strokeWidth="1" />
        <line x1="250" y1="210" x2="200" y2="340" stroke="url(#goldGradient)" strokeWidth="1" />
        <line x1="250" y1="210" x2="120" y2="270" stroke="url(#goldGradient)" strokeWidth="1" />
        <line x1="250" y1="210" x2="120" y2="150" stroke="url(#goldGradient)" strokeWidth="1" />
        <line x1="250" y1="210" x2="200" y2="80" stroke="url(#goldGradient)" strokeWidth="1" />
      </g>

      {/* Central Cross */}
      <path
        d="M 238,110 L 262,110 L 262,135 L 295,135 L 295,155 L 262,155 L 262,230 L 238,230 L 238,155 L 205,155 L 205,135 L 238,135 Z"
        fill="#1B2A6B"
        stroke="#FFFFFF"
        strokeWidth="1.5"
      />

      {/* 4 Community Figures (Hands upraised, behind Bible, around the Cross) */}
      <g fill="#1B2A6B">
        {/* Leftmost Figure */}
        <circle cx="165" cy="180" r="10" />
        <path d="M 165,190 C 150,195 140,205 135,215 L 145,215 C 152,210 160,205 165,200 L 175,215 Z" />
        <path d="M 165,190 L 150,185 C 145,182 140,186 142,192 L 155,202 Z" />

        {/* Inner Left Figure */}
        <circle cx="210" cy="175" r="10" />
        <path d="M 210,185 C 198,190 190,198 185,210 L 195,210 C 202,203 208,198 210,195 L 218,210 Z" />
        <path d="M 210,185 L 192,180 C 187,178 184,183 186,188 L 199,198 Z" />

        {/* Inner Right Figure */}
        <circle cx="290" cy="175" r="10" />
        <path d="M 290,185 C 302,190 310,198 315,210 L 305,210 C 298,203 292,198 290,195 L 282,210 Z" />
        <path d="M 290,185 L 308,180 C 313,178 316,183 314,188 L 301,198 Z" />

        {/* Rightmost Figure */}
        <circle cx="335" cy="180" r="10" />
        <path d="M 335,190 C 350,195 360,205 365,215 L 355,215 C 348,210 340,205 335,200 L 325,215 Z" />
        <path d="M 335,190 L 350,185 C 355,182 360,186 358,192 L 345,202 Z" />
      </g>

      {/* Open Bible (Beneath cross, curving pages) */}
      <g>
        {/* Left page background */}
        <path d="M 250,265 C 210,250 160,250 130,260 L 130,230 C 160,220 210,220 250,235 Z" fill="#FFFFFF" stroke="#1B2A6B" strokeWidth="2.5" />
        {/* Right page background */}
        <path d="M 250,265 C 290,250 340,250 370,260 L 370,230 C 340,220 290,220 250,235 Z" fill="#FFFFFF" stroke="#1B2A6B" strokeWidth="2.5" />
        
        {/* Center fold shadow */}
        <line x1="250" y1="235" x2="250" y2="265" stroke="#1B2A6B" strokeWidth="2" />

        {/* Text lines in Bible (symbolic) */}
        <path d="M 145,236 Q 180,228 235,242" stroke="#1B2A6B" strokeWidth="1.5" opacity="0.6" fill="none" />
        <path d="M 145,244 Q 180,236 235,250" stroke="#1B2A6B" strokeWidth="1.5" opacity="0.6" fill="none" />
        <path d="M 145,252 Q 180,244 235,258" stroke="#1B2A6B" strokeWidth="1.5" opacity="0.6" fill="none" />
        
        <path d="M 265,242 Q 320,228 355,236" stroke="#1B2A6B" strokeWidth="1.5" opacity="0.6" fill="none" />
        <path d="M 265,250 Q 320,236 355,244" stroke="#1B2A6B" strokeWidth="1.5" opacity="0.6" fill="none" />
        <path d="M 265,258 Q 320,244 355,252" stroke="#1B2A6B" strokeWidth="1.5" opacity="0.6" fill="none" />
      </g>

      {/* Left Sprig / Olive branch */}
      <g stroke="url(#goldGradient)" strokeWidth="3" fill="url(#goldGradient)">
        <path d="M 115,225 C 110,215 105,200 115,190" fill="none" />
        <ellipse cx="115" cy="190" rx="4" ry="7" transform="rotate(-30 115 190)" />
        <ellipse cx="111" cy="200" rx="4" ry="7" transform="rotate(-20 111 200)" />
        <ellipse cx="110" cy="212" rx="4" ry="7" transform="rotate(-10 110 212)" />
        <ellipse cx="112" cy="222" rx="4" ry="7" transform="rotate(0 112 222)" />
      </g>

      {/* Right Flying Dove with Olive Branch */}
      <g>
        {/* Dove wings and body */}
        <path
          d="M 370,215 C 385,210 395,195 410,205 C 418,210 422,218 425,224 C 418,223 410,221 405,224 C 395,227 388,235 380,232 L 375,220 Z"
          fill="#FFFFFF"
          stroke="url(#goldGradient)"
          strokeWidth="1.5"
        />
        {/* Tail */}
        <path d="M 425,224 L 435,218 L 430,228 Z" fill="#FFFFFF" stroke="url(#goldGradient)" strokeWidth="1" />
        {/* Olive sprig in beak */}
        <path d="M 371,215 C 367,213 365,216 363,215" stroke="url(#goldGradient)" strokeWidth="1.5" fill="none" />
        <circle cx="363" cy="215" r="2" fill="url(#goldGradient)" />
      </g>

      {/* Large central "SEPAC" text */}
      <text
        x="250"
        y="335"
        fill="#1B2A6B"
        fontFamily="Playfair Display, Georgia, serif"
        fontSize="54"
        fontWeight="bold"
        letterSpacing="8"
        textAnchor="middle"
      >
        SEPAC
      </text>

      {/* Small Scripture block: HEB 10:24-25 in the middle under SEPAC */}
      <text
        x="250"
        y="375"
        fill="#1B2A6B"
        fontFamily="Playfair Display, Georgia, serif"
        fontSize="12.5"
        fontWeight="600"
        fontStyle="italic"
        letterSpacing="1"
        textAnchor="middle"
      >
        HEB 10:24-25
      </text>

      {/* Aesthetic lines above and below values */}
      <line x1="150" y1="365" x2="350" y2="365" stroke="url(#goldGradient)" strokeWidth="1.2" />
    </svg>
  );
}
