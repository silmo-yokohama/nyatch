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
import React, { useState, useEffect, useCallback } from 'react';
import { useAnimation } from 'framer-motion';
import type { MouseState, MouseSize, MousePosition, Footprint } from '@/types/mouse-game';
import { Bush } from '@/components/games/Bush';
import { Mouse } from '@/components/games/Mouse';
import { Footprints } from '@/components/games/effects/Footprints';
import { DustEffect } from '@/components/games/effects/DustEffect';

export const MouseGame: React.FC = () => {
  // 状態管理
  const [gameState, setGameState] = useState<MouseState>('waiting');
  const [mouseSize, setMouseSize] = useState<MouseSize>('md');
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0, direction: 0 });
  const [footprints, setFootprints] = useState<Footprint[]>([]);

  // アニメーションコントロール
  const dustControls = useAnimation();

  // マウスの移動処理
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (gameState !== 'playing') return;

    const newPosition = {
      x: e.clientX,
      y: e.clientY,
      direction: Math.atan2(e.movementY, e.movementX)
    };

    setMousePosition(newPosition);

    // 移動速度が一定以上の場合、足跡を追加
    const speed = Math.sqrt(e.movementX ** 2 + e.movementY ** 2);
    if (speed > 15) {
      const newFootprint: Footprint = {
        id: Date.now().toString(),
        x: mousePosition.x,
        y: mousePosition.y,
        timestamp: Date.now()
      };
      setFootprints(prev => [...prev.slice(-4), newFootprint]);
    }
  }, [gameState, mousePosition]);

  // 右クリック処理（逃走/再出現）
  const handleContextMenu = useCallback((e: MouseEvent) => {
    e.preventDefault();
    if (gameState === 'playing') {
      setGameState('hiding');
      dustControls.start({ opacity: 1, scale: 1 });
      // TODO: 最寄りの草むらを検出して逃走アニメーション
    } else if (gameState === 'hiding') {
      setGameState('playing');
      // TODO: ランダムな位置または最後の草むらから再出現
    }
  }, [gameState, dustControls]);

  // スクロールでサイズ変更
  const handleWheel = useCallback((e: WheelEvent) => {
    const sizes: MouseSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];
    const currentIndex = sizes.indexOf(mouseSize);
    const newIndex = Math.max(0, Math.min(sizes.length - 1, currentIndex + Math.sign(e.deltaY)));
    const newSize = sizes[newIndex];
    if (newSize) {
      setMouseSize(newSize);
    }
  }, [mouseSize]);

  // イベントリスナーの設定
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('wheel', handleWheel);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [handleMouseMove, handleContextMenu, handleWheel]);

  // 古い足跡を削除
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setFootprints(prev => prev.filter(fp => now - fp.timestamp < 3000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden bg-white">
      {/* 草むら */}
      <Bush position="top-left" />
      <Bush position="top-right" />
      <Bush position="bottom-left" />
      <Bush position="bottom-right" />

      {/* 足跡 */}
      <Footprints footprints={footprints} />

      {/* 土埃エフェクト */}
      <DustEffect controls={dustControls} position={mousePosition} />

      {/* ネズミ */}
      {gameState !== 'hiding' && (
        <Mouse
          position={mousePosition}
          size={mouseSize}
        />
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