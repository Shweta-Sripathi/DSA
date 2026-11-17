import React from 'react';
import { AvatarStyle } from '../types';

interface JourneyAvatarProps {
  style: AvatarStyle;
  isCelebrating?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const JourneyAvatar: React.FC<JourneyAvatarProps> = ({
  style,
  isCelebrating = false,
  size = 'md',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24'
  };

  // Color schemes for styles
  const stylesConfig = {
    botanist: {
      cloak: '#A3B18A', // sage
      accent: '#D98880', // rose
      hair: '#5A3E28',
      accessory: '🌿',
      title: 'The Botanist'
    },
    scholar: {
      cloak: '#9DBFBE', // muted teal
      accent: '#B89BC7', // lavender
      hair: '#362B28',
      accessory: '✨',
      title: 'The Scholar'
    },
    sage: {
      cloak: '#C86D51', // terracotta
      accent: '#EDE0D4', // cream
      hair: '#2B2320',
      accessory: '🧭',
      title: 'The Sage'
    },
    coder: {
      cloak: '#F8A17E', // peach
      accent: '#A3B18A', // sage
      hair: '#4A3525',
      accessory: '☕',
      title: 'The Coder'
    }
  };

  const current = stylesConfig[style] || stylesConfig.botanist;

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${sizeClasses[size]} ${className}`}
      title={current.title}
    >
      {/* Subtle floating aura */}
      <div
        className={`absolute inset-0 rounded-full blur-md opacity-35 transition-all duration-700 ${
          isCelebrating ? 'bg-boho-rose-400 scale-125 animate-ping' : 'bg-boho-peach-300'
        }`}
      />

      {/* SVG illustrated boho adventurer */}
      <svg
        viewBox="0 0 100 100"
        className={`w-full h-full drop-shadow-md transition-transform duration-500 ${
          isCelebrating ? 'animate-bounce scale-110' : 'hover:scale-105'
        }`}
      >
        {/* Soft shadow base */}
        <ellipse cx="50" cy="94" rx="28" ry="5" fill="#3D312A" opacity="0.12" />

        {/* Cloak / Body */}
        <path
          d="M 28 62 C 28 50, 40 44, 50 44 C 60 44, 72 50, 72 62 L 78 88 C 78 91, 72 92, 50 92 C 28 92, 22 91, 22 88 Z"
          fill={current.cloak}
        />
        
        {/* Inner tunic / scarf */}
        <path
          d="M 42 46 Q 50 54 58 46 L 56 68 Q 50 72 44 68 Z"
          fill={current.accent}
        />

        {/* Head */}
        <circle cx="50" cy="32" r="16" fill="#FCEADE" />

        {/* Hair */}
        <path
          d="M 34 30 C 33 20, 42 16, 50 16 C 58 16, 67 20, 66 30 C 66 35, 64 36, 62 33 C 58 28, 42 28, 38 33 C 36 36, 34 35, 34 30 Z"
          fill={current.hair}
        />
        
        {/* Boho hat / beret or flower crown */}
        <path
          d="M 32 24 C 36 12, 64 12, 68 24 C 71 25, 68 27, 50 26 C 32 27, 29 25, 32 24 Z"
          fill={current.accent}
        />
        <circle cx="50" cy="14" r="3.5" fill={current.cloak} />

        {/* Closed calm eyes & blushing cheeks */}
        <path d="M 43 32 Q 46 34 49 32" stroke="#4A3525" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <path d="M 51 32 Q 54 34 57 32" stroke="#4A3525" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        
        {/* Gentle smile */}
        <path d="M 47 38 Q 50 40 53 38" stroke="#A94E46" strokeWidth="1.4" fill="none" strokeLinecap="round" />

        {/* Rosy cheeks */}
        <ellipse cx="42" cy="35" rx="2.5" ry="1.5" fill="#E8A598" opacity="0.65" />
        <ellipse cx="58" cy="35" rx="2.5" ry="1.5" fill="#E8A598" opacity="0.65" />

        {/* Satchel strap across shoulder */}
        <line x1="38" y1="52" x2="64" y2="76" stroke="#4A3525" strokeWidth="2.2" strokeLinecap="round" />
        <rect x="58" y="70" width="12" height="10" rx="3" fill="#D98880" stroke="#4A3525" strokeWidth="1" />
      </svg>

      {/* Floating accessory badge */}
      <span className="absolute -top-1 -right-1 text-xs select-none filter drop-shadow">
        {current.accessory}
      </span>
    </div>
  );
};
