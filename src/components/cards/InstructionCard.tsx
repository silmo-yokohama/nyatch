import React, { useId } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

type InstructionCardProps = {
  title: string;
  children: React.ReactNode;
  icon: React.ElementType;
  defaultOpen?: boolean;
};

/**
 * 説明用のアコーディオンカードコンポーネント
 * SSR/SSG対応のため、CSS-onlyで実装
 * 
 * @param title - カードのタイトル
 * @param children - カードの内容
 * @param icon - タイトルの横に表示するアイコン
 * @param defaultOpen - デフォルトの開閉状態（デフォルトは閉じている）
 */
export const InstructionCard = ({
  title,
  children,
  icon: Icon,
  defaultOpen = false
}: InstructionCardProps) => {
  const id = useId();
  const contentId = `content-${id}`;

  return (
    <div className="bg-white/90 rounded-xl p-6 shadow-lg backdrop-blur-sm">
      <div className="group">
        <label
          htmlFor={contentId}
          className="w-full flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center">
            <Icon className="w-6 h-6 text-purple-500" />
            <h3 className="ml-3 text-xl font-bold text-gray-800">{title}</h3>
          </div>
          <ChevronDownIcon
            className="w-5 h-5 text-gray-500 transition-transform duration-300 group-has-[:checked]:rotate-180"
          />
        </label>
        <input
          type="checkbox"
          id={contentId}
          className="hidden peer"
          defaultChecked={defaultOpen}
        />
        <div className="overflow-hidden transition-all duration-300 max-h-0 opacity-0 peer-checked:max-h-[1000px] peer-checked:opacity-100">
          {children}
        </div>
      </div>
    </div>
  );
}; 