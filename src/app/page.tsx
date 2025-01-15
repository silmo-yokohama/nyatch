/**
 * ゲームアプリのホームページ
 */
import React from 'react';
import { InstructionsSection } from '@/components/sections/InstructionsSection';
import { GameModesSection } from '@/components/sections/GameModesSection';

const HomePage = () => {
  return (
    <>
      <InstructionsSection />
      <GameModesSection />
    </>
  );
};

export default HomePage;