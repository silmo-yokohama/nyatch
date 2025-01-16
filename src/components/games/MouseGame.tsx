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
import React, { useState } from 'react';
import type { MouseState } from '@/types/mouse-game';
import { Bush } from '@/components/games/Bush';
import { Mouse } from '@/components/games/Mouse';
import { Flooring } from './Flooring';

export const MouseGame: React.FC = () => {
  // 状態管理
  const [gameState, setGameState] = useState<MouseState>('waiting');

  return (
    <div className="fixed inset-0 overflow-hidden bg-white">
      <Flooring />
      {/* 草むら */}
      <Bush position="top-left" />
      <Bush position="top-right" />
      <Bush position="bottom-left" />
      <Bush position="bottom-right" />

      {/* ネズミ */}
      {gameState === 'playing' && (
        <Mouse size="xl" />
      )}

      {/* スタート画面 */}
      {gameState === 'waiting' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-80">
          <h1 className="text-2xl font-bold mb-4">マウスチェイス</h1>
          <p className="mb-4">全画面表示を推奨します</p>
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