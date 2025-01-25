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
import React, { useState, useCallback, useEffect } from 'react';
import type { MouseSize, MouseState } from '@/types/mouse-game';
import { Mouse } from '@/components/games/mouse/Mouse';
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
  useEffect(() => {
    if (typeof window === 'undefined' || gameState !== 'playing') {
      return () => { };
    }

    window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, [gameState, handleWheel]);

  return (
    <div className="fixed inset-0 overflow-hidden bg-white cursor-none">
      <Flooring />
      {/* 草むら */}
      <Object position="bottom-right" image="/games/mouse/stone.png" size={30} />
      <Object position="top-left" image="/games/mouse/bush.png" size={30} />
      <Object position="top-right" image="/games/mouse/tree_bird.png" size={30} />
      <Object position="bottom-left" image="/games/mouse/tree.png" size={30} />

      {/* ネズミ */}
      {gameState === 'playing' && (
        <Mouse size={mouseSize} />
      )}

      {/* スタート画面 */}
      {gameState === 'waiting' && (
        <div className="absolute inset-0 h-full w-full flex flex-col items-center justify-center bg-white/90 text-black cursor-auto z-50">
          <div className="max-w-md w-full p-8 rounded-2xl bg-white shadow-lg transform transition-all duration-500 hover:scale-105">
            <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              マウスチェイス
            </h1>

            <div className="space-y-4 mb-8">
              <div className="text-gray-700">
                <h2 className="font-bold mb-2 text-lg">遊び方</h2>
                <ul className="list-disc list-inside space-y-2">
                  <li>マウスカーソルを動かすとネズミが追いかけてきます</li>
                  <li>右クリックでネズミが逃げ出します</li>
                  <li>マウスホイールでネズミのサイズを変更できます</li>
                  <li>草むらに隠れたりして遊んでみましょう</li>
                </ul>
              </div>
            </div>

            <div className="text-center">
              <button
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg
                          hover:from-blue-600 hover:to-purple-600 transform transition-all duration-300
                          hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                          font-bold text-lg shadow-lg"
                onClick={() => setGameState('playing')}
              >
                ゲームスタート
              </button>
              <p className="mt-4 text-sm text-gray-500">※ 全画面表示を推奨します</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 