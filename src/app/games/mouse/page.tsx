/**
 * マウスゲームページ
 * 
 * @description
 * - マウスゲームを表示するページ
 * - OGP情報を設定
 */
import React from 'react';
import type { Metadata } from 'next';
import { MouseGame } from '@/components/games/mouse/MouseGame';

export const metadata: Metadata = {
  title: 'マウスチェイス | Nyatch',
  description: '飼い主さんと一緒に遊べるモードです！マウスの起動に沿ってネズミが動きます。左クリックを押すと画面外へ逃げ、もう一度推すと戻ってきます。画面上を動き回るマウスを追いかけよう！',
  openGraph: {
    title: 'マウスチェイス | Nyatch',
    description: '飼い主さんと一緒に遊べるモードです！マウスの起動に沿ってネズミが動きます。左クリックを押すと画面外へ逃げ、もう一度推すと戻ってきます。画面上を動き回るマウスを追いかけよう！',
    images: ['/games/mouse/ogp.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'マウスチェイス | Nyatch',
    description: '飼い主さんと一緒に遊べるモードです！マウスの起動に沿ってネズミが動きます。左クリックを押すと画面外へ逃げ、もう一度推すと戻ってきます。画面上を動き回るマウスを追いかけよう！',
    images: ['/games/mouse/ogp.png'],
  },
};

export default function MouseGamePage() {
  return (
    <main className="min-h-screen">
      <MouseGame />
    </main>
  );
} 