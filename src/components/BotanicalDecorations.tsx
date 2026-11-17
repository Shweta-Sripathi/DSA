import React from 'react';

export const BotanicalLeaf: React.FC<{ className?: string }> = ({ className = "w-6 h-6 text-boho-sage-400" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
  </svg>
);

export const BotanicalFlower: React.FC<{ className?: string; color?: string }> = ({
  className = "w-6 h-6",
  color = "#D98880"
}) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    <g transform="translate(50,50)">
      {/* 6 petals */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <path
          key={i}
          d="M 0 0 C -12 -22 -10 -35 0 -42 C 10 -35 12 -22 0 0"
          fill={color}
          opacity="0.82"
          transform={`rotate(${angle})`}
        />
      ))}
      <circle cx="0" cy="0" r="10" fill="#FADBD8" />
      <circle cx="0" cy="0" r="5" fill="#C86D51" />
    </g>
  </svg>
);

export const BotanicalVineBorder: React.FC<{ className?: string }> = ({ className = "w-full h-8 text-boho-sage-300" }) => (
  <svg viewBox="0 0 600 24" fill="none" stroke="currentColor" strokeWidth="1.2" className={className}>
    <path d="M0,12 Q75,4 150,12 T300,12 T450,12 T600,12" />
    {/* Leaves along vine */}
    <path d="M70,8 Q78,2 86,9 Q78,14 70,8" fill="#A3B18A" opacity="0.6" />
    <path d="M140,15 Q148,22 156,16 Q148,10 140,15" fill="#A3B18A" opacity="0.6" />
    <path d="M220,7 Q228,1 236,8 Q228,13 220,7" fill="#A3B18A" opacity="0.6" />
    <path d="M370,16 Q378,23 386,17 Q378,11 370,16" fill="#A3B18A" opacity="0.6" />
    <path d="M460,8 Q468,2 476,9 Q468,14 460,8" fill="#A3B18A" opacity="0.6" />
    <circle cx="150" cy="12" r="2.5" fill="#D98880" />
    <circle cx="300" cy="12" r="3" fill="#E8A598" />
    <circle cx="450" cy="12" r="2.5" fill="#D98880" />
  </svg>
);

export const BotanicalWreath: React.FC<{ className?: string }> = ({ className = "w-32 h-32" }) => (
  <svg viewBox="0 0 200 200" fill="none" className={className}>
    {/* Left branch */}
    <path
      d="M100,185 C45,185 20,140 20,100 C20,55 50,20 95,15"
      stroke="#A3B18A"
      strokeWidth="2"
      strokeLinecap="round"
    />
    {/* Right branch */}
    <path
      d="M100,185 C155,185 180,140 180,100 C180,55 150,20 105,15"
      stroke="#A3B18A"
      strokeWidth="2"
      strokeLinecap="round"
    />
    {/* Delicate leaves */}
    <path d="M32,80 Q22,70 34,65 Q40,75 32,80 Z" fill="#8FBC8F" opacity="0.75" />
    <path d="M25,120 Q15,115 24,105 Q32,112 25,120 Z" fill="#A3B18A" opacity="0.75" />
    <path d="M45,155 Q36,160 40,170 Q48,162 45,155 Z" fill="#7A9A7B" opacity="0.75" />
    <path d="M168,80 Q178,70 166,65 Q160,75 168,80 Z" fill="#8FBC8F" opacity="0.75" />
    <path d="M175,120 Q185,115 176,105 Q168,112 175,120 Z" fill="#A3B18A" opacity="0.75" />
    <path d="M155,155 Q164,160 160,170 Q152,162 155,155 Z" fill="#7A9A7B" opacity="0.75" />
    {/* Little floral buds */}
    <circle cx="21" cy="98" r="4" fill="#D98880" />
    <circle cx="179" cy="98" r="4" fill="#D98880" />
    <circle cx="62" cy="35" r="3.5" fill="#FADBD8" />
    <circle cx="138" cy="35" r="3.5" fill="#FADBD8" />
    <circle cx="100" cy="186" r="4" fill="#C86D51" />
  </svg>
);
