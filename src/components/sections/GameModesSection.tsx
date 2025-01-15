/**
 * ゲームモード一覧を表示するセクションコンポーネント
 */
import React from 'react';
import { Mouse, Target, Puzzle } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { GameCard } from '@/components/cards/GameCard';
import type { GameMode } from '@/types/game';

export const GameModesSection: React.FC = () => {
  const gamesModes: GameMode[] = [
    {
      id: 'mouse',
      title: 'マウスチェイス',
      description: '飼い主さんと一緒に遊べるモードです！マウスの起動に沿ってネズミが動きます。左クリックを押すと画面外へ逃げ、もう一度推すと戻ってきます。画面上を動き回るマウスを追いかけよう！【PC専用】',
      icon: Mouse,
      color: 'border-pink-500',
    },
    {
      id: 'laser',
      title: 'レーザーポインター',
      description: '赤い光を追いかけてみよう！',
      icon: Target,
      color: 'border-purple-500',
    },
    {
      id: 'butterfly',
      title: '蝶々チェイス',
      description: 'ひらひら舞う蝶々を捕まえよう！',
      icon: Puzzle,
      color: 'border-blue-500',
    },
  ];

  return (
    <Container className="py-8">
      <section>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          遊べるモード
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {gamesModes.map((game) => (
            <GameCard
              key={game.id}
              title={game.title}
              description={game.description}
              icon={game.icon}
              color={game.color}
            />
          ))}
        </div>
      </section>
    </Container>
  );
}; 