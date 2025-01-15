/**
 * ゲーム用レイアウト
 * 
 * @description
 * - ヘッダーとフッターを非表示
 * - 全画面表示
 */
export default function GamesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
} 