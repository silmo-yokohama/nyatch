import React from 'react';
import {
  Cat,
  Mouse,
  Target,
  Puzzle,
  PlayCircle,
  AlertTriangle,
  Monitor,
  Smartphone,
  Info
} from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { GameCard } from '@/components/cards/GameCard';
import { InstructionCard } from '@/components/cards/InstructionCard';
import type { GameMode } from '@/types/game';

const HomePage = () => {
  const gamesModes: GameMode[] = [
    {
      id: 'mouse',
      title: 'マウスチェイス',
      description: '画面上を動き回るマウスを追いかけよう！',
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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-blue-50 to-purple-50">
      {/* ヘッダーセクション */}
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

      {/* 遊び方と注意事項 */}
      <Container className="py-8">
        <div className="flex flex-col gap-6">
          <InstructionCard title="遊び方" icon={PlayCircle}>
            <ul className="space-y-3 mt-4 text-gray-600">
              <li className="flex items-start">
                <Info className="w-5 h-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                <span>好きなモードを選んで遊んでみましょう</span>
              </li>
              <li className="flex items-start">
                <Info className="w-5 h-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                <span>モードによって遊び方が異なります</span>
              </li>
              <li className="flex items-start">
                <Info className="w-5 h-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                <span>注意事項をよく読んでから遊んでください</span>
              </li>
            </ul>
          </InstructionCard>

          <InstructionCard title="注意事項" icon={AlertTriangle}>
            <ul className="mt-4 space-y-3 text-gray-600">
              <li className="flex items-start">
                <div className="flex gap-2 mr-2 flex-shrink-0">
                  <Monitor className="w-5 h-5 text-green-500" />
                </div>
                <span>PC又はタブレットに最適化されています</span>
              </li>
              <li className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5 mr-2 flex-shrink-0" />
                <span>遊ぶときはモニターが倒れたりモノが壊れないように注意してください</span>
              </li>
              <li className="flex items-start">
                <Smartphone className="w-5 h-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                <span>スマートフォンではあまり遊んでくれないと思います</span>
              </li>
            </ul>
          </InstructionCard>
        </div>
      </Container>

      {/* ゲームモード一覧 */}
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

      {/* フッター */}
      <footer className="py-6 bg-white/80 backdrop-blur-sm">
        <Container>
          <p className="text-center text-gray-600">
            © {new Date().getFullYear()} Nyatch - 猫ちゃんのための遊び場
            <Cat className="inline-block w-4 h-4 ml-2 text-pink-500" />
          </p>
        </Container>
      </footer>
    </div>
  );
};

export default HomePage;