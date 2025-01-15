/**
 * 遊び方と注意事項を表示するセクションコンポーネント
 */
import React from 'react';
import {
  PlayCircle,
  AlertTriangle,
  Monitor,
  Smartphone,
  Info
} from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { InstructionCard } from '@/components/cards/InstructionCard';

export const InstructionsSection: React.FC = () => {
  return (
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
  );
}; 