/**
 * レーザーポインターゲームのページ
 */
import type { Metadata } from 'next';
import { LaserGame } from '@/components/games/laser/LaserGame';

export const metadata: Metadata = {
  title: 'レーザーポインター | Nyatch',
  description: '画面内を縦横無尽に動き回る赤いレーザーポインターを追いかけよう！レーザーの数や速度を調整して、より楽しく遊べます。',
  openGraph: {
    title: 'レーザーポインター | Nyatch',
    description: '画面内を縦横無尽に動き回る赤いレーザーポインターを追いかけよう！レーザーの数や速度を調整して、より楽しく遊べます。',
    images: ['/games/laser/ogp.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'レーザーポインター | Nyatch',
    description: '画面内を縦横無尽に動き回る赤いレーザーポインターを追いかけよう！レーザーの数や速度を調整して、より楽しく遊べます。',
    images: ['/games/laser/ogp.png'],
  },
};

export default function LaserGamePage() {
  return (
    <main className="w-full h-screen bg-black">
      <LaserGame />
    </main>
  );
} 