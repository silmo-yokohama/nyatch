/**
 * ゲームモード一覧を表示するセクションコンポーネント
 */
import React from 'react';
import { Mouse, Target } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { GameCard } from '@/components/cards/GameCard';
import type { GameMode } from '@/types/game';
import Link from 'next/link';

export const GameModesSection: React.FC = () => {
  const gamesModes: GameMode[] = [
    {
      id: 'mouse',
      title: 'マウスチェイス',
      description: 'マウスでマウスを動かして遊ぼう！',
      icon: Mouse,
      color: 'border-pink-500',
      to: '/games/mouse',
    },
    {
      id: 'laser',
      title: 'レーザーポインター',
      description: '赤い光を追いかけてみよう！',
      icon: Target,
      color: 'border-purple-500',
      to: '/games/laser',
    },
  ];

  return (
    <Container className="py-8">
      <section>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          遊べるモード
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {gamesModes.map((game) => (
            <Link href={game.to} key={game.id}>
              <GameCard
                title={game.title}
                description={game.description}
                icon={game.icon}
                color={game.color}
              />
            </Link>
          ))}
        </div>
      </section>
    </Container>
  );
}; 