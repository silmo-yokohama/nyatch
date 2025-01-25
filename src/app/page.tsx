/**
 * ゲームアプリのホームページ
 */
import React from 'react';
import { InstructionsSection } from '@/components/sections/InstructionsSection';
import { GameModesSection } from '@/components/sections/GameModesSection';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const HomePage = () => {
  return (
    <>
      <Header />
      <InstructionsSection />
      <GameModesSection />
      <Footer />
    </>
  );
};

export default HomePage;