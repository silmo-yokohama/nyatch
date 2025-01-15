import React from 'react';

type GameCardProps = {
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
};

/**
 * ゲームモードを表示するカードコンポーネント
 */
export const GameCard = ({ title, description, icon: Icon, color }: GameCardProps) => {
  return (
    <div className="motion-safe:transform motion-safe:transition-all motion-safe:duration-300 motion-safe:hover:scale-105">
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
        <button
          className={`mt-4 px-4 py-2 rounded-full ${color.replace('border', 'bg')} text-white font-medium motion-safe:transform motion-safe:transition-transform motion-safe:duration-200 motion-safe:hover:scale-105 motion-safe:active:scale-95`}
        >
          遊んでみる
        </button>
      </div>
    </div>
  );
}; 