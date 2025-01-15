/**
 * @file Header.tsx
 * @description アプリケーションのヘッダーコンポーネント
 */
import React from 'react';
import { Cat } from 'lucide-react';
import { Container } from './Container';

export const Header: React.FC = () => {
  return (
    <header className="py-8 bg-white/80 backdrop-blur-sm">
      <Container>
        <div className="flex items-center justify-center">
          <Cat className="w-12 h-12 text-pink-500 animate-bounce" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent ml-4">
            Nyatch
          </h1>
        </div>
        <p className="mt-4 text-xl text-center text-gray-600 font-medium">
          猫ちゃんと一緒に遊ぼう！
        </p>
      </Container>
    </header>
  );
}; 