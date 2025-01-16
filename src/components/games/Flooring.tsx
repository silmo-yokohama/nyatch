import Image from 'next/image';
import React from 'react';


export const Flooring: React.FC = () => {
  return (
    <div className="fixed h-screen w-screen">
      <Image
        src="/games/mouse/flooring.jpg"
        alt="フローリング"
        fill
        style={{ objectFit: 'cover' }}
        priority
      />
    </div>
  );
};