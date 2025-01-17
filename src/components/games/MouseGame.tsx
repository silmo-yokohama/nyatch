"use client"
/**
 * マウスゲームのメインコンポーネント
 * 
 * @description
 * - マウスカーソルに追従するネズミを表示
 * - 右クリックで逃走/再出現
 * - スクロールでサイズ変更
 * - 移動時の足跡表示
 * - 草むらとの連携
 */
import React, { useState, useCallback } from 'react';
import type { MouseSize, MouseState } from '@/types/mouse-game';
import { Mouse } from '@/components/games/Mouse';
import { Flooring } from './Flooring';
import { Object } from './Object';

export const MouseGame: React.FC = () => {
  // 状態管理
  const [gameState, setGameState] = useState<MouseState>('waiting');
  const [mouseSize, setMouseSize] = useState<MouseSize>('md');

  // マウスサイズの変更処理
  const handleWheel = useCallback((event: WheelEvent) => {
    const sizes: MouseSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];
    const currentIndex = sizes.indexOf(mouseSize);

    if (event.deltaY > 0 && currentIndex > 0) {
      // 下スクロールで小さく
      setMouseSize(sizes[currentIndex - 1] as MouseSize);
    } else if (event.deltaY < 0 && currentIndex < sizes.length - 1) {
      // 上スクロールで大きく
      setMouseSize(sizes[currentIndex + 1] as MouseSize);
    }
  }, [mouseSize]);

  // スクロールイベントの登録
  React.useEffect(() => {
    if (gameState === 'playing') {
      window.addEventListener('wheel', handleWheel);
      return () => window.removeEventListener('wheel', handleWheel);
    }
  }, [gameState, handleWheel]);

  return (
    <div className="fixed inset-0 overflow-hidden bg-white cursor-none">
      <Flooring />
      {/* 草むら */}
      <Object position="center" image="/games/mouse/stone.png" size={30} />
      <Object position="top-left" image="/games/mouse/bush.png" size={30} />
      <Object position="top-right" image="/games/mouse/tree_bird.png" size={30} />
      <Object position="bottom-left" image="/games/mouse/tree.png" size={30} />
      <Object position="bottom-right" image="/games/mouse/bush.png" size={30} />

      {/* ネズミ */}
      {gameState === 'playing' && (
        <Mouse size={mouseSize} />
      )}

      {/* スタート画面 */}
      {gameState === 'waiting' && (
        <div className="absolute inset-0 h-full w-full flex flex-col items-center justify-center bg-white text-black bg-opacity-80 cursor-auto z-50">
          <h1 className="text-2xl font-bold mb-4 text-black">マウスチェイス</h1>
          <p className="mb-4 text-black">全画面表示を推奨します</p>
          <button
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            onClick={() => setGameState('playing')}
          >
            スタート
          </button>
        </div>
      )}
    </div>
  );
}; 