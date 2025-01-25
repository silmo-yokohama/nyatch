/**
 * @file Footer.tsx
 * @description アプリケーションのフッターコンポーネント
 */
import React from 'react';
import { Cat } from 'lucide-react';
import { Container } from './Container';

export const Footer: React.FC = () => {
  return (
    <footer className="py-6 bg-white/80 backdrop-blur-sm">
      <Container>
        <p className="text-center text-gray-600">
          © {new Date().getFullYear()} Nyatch - 猫ちゃんのための遊び場
          <Cat className="inline-block w-4 h-4 ml-2 text-pink-500" />
        </p>
      </Container>
    </footer>
  );
}; 