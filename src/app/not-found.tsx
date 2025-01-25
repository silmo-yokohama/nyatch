/**
 * 404 Not Found ページコンポーネント
 * 
 * @description
 * - ページが見つからない場合に表示される404ページ
 * - ホームページへの戻りリンクを提供
 */

import NotFoundAnimation from '@/components/lotties/NotFoundAnimation'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-gray-600 mb-4">
          ページが見つかりません
        </h1>
        <NotFoundAnimation />
        <p className="text-gray-500 mb-8">
          お探しのページは存在しないか、移動した可能性があります。
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          ホームに戻る
        </Link>
      </div>
    </div>
  )
} 