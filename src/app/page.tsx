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
  Tablet,
  Info
} from 'lucide-react';

// Containerコンポーネントの型定義
type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

const Container = ({ children, className = '' }: ContainerProps) => {
  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
};

// GameCardコンポーネントの型定義
type GameCardProps = {
  title: string;
  description: string;
  icon: React.ElementType;  // Lucideアイコンコンポーネント用
  color: string;
};

const GameCard = ({ title, description, icon: Icon, color }: GameCardProps) => {
  return (
    <div className="transform transition-all duration-300 hover:scale-105">
      <div className={`p-6 rounded-2xl shadow-lg bg-white border-2 ${color} hover:shadow-xl`}>
        <div className="flex items-center mb-4">
          <div className={`p-3 rounded-full ${color.replace('border', 'bg')} bg-opacity-20`}>
            <Icon className={`w-8 h-8 ${color.replace('border', 'text')}`} />
          </div>
          <h3 className="ml-3 text-xl font-bold text-gray-800">
            {title}
          </h3>
        </div>
        <p className="text-gray-600">
          {description}
        </p>
        <button className={`mt-4 px-4 py-2 rounded-full ${color.replace('border', 'bg')} text-white font-medium transform transition-transform duration-200 hover:scale-105 active:scale-95`}>
          遊んでみる
        </button>
      </div>
    </div>
  );
};

// InstructionCardコンポーネントの型定義
type InstructionCardProps = {
  title: string;
  children: React.ReactNode;
  icon: React.ElementType;  // Lucideアイコンコンポーネント用
};

const InstructionCard = ({ title, children, icon: Icon }: InstructionCardProps) => {
  return (
    <div className="bg-white/90 rounded-xl p-6 shadow-lg backdrop-blur-sm">
      <div className="flex items-center mb-4">
        <Icon className="w-6 h-6 text-purple-500" />
        <h3 className="ml-3 text-xl font-bold text-gray-800">{title}</h3>
      </div>
      {children}
    </div>
  );
};

// gameModesの型定義
type GameMode = {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
};

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InstructionCard title="遊び方" icon={PlayCircle}>
            <ul className="space-y-3 text-gray-600">
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
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <div className="flex gap-2 mr-2 flex-shrink-0">
                  <Monitor className="w-5 h-5 text-green-500" />
                  <Tablet className="w-5 h-5 text-green-500" />
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