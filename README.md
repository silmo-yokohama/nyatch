# Nyatch - Cat Entertainment App

猫ちゃんが遊べるブラウザベースのエンターテインメントアプリケーションです。モニターに映して猫ちゃんが遊べる様々なモードを提供します。

## 開発環境

- Node.js
- Next.js
- Tailwind CSS
- TypeScript

## 必要要件

- Node.js 20.x以上
- npm 10.x以上

## プロジェクトのセットアップ

1. リポジトリのクローン:
```bash
git clone [リポジトリURL]
cd nyatch
```

2. Next.jsプロジェクトの作成:
```bash
npx create-next-app@latest .
```

セットアップ時の選択項目:
```
✔ Would you like to use TypeScript? ... Yes
✔ Would you like to use ESLint? ... Yes
✔ Would you like to use Tailwind CSS? ... Yes
✔ Would you like to use `src/` directory? ... Yes
✔ Would you like to use App Router? (recommended) ... Yes
✔ Would you like to customize the default import alias? ... Yes
```

3. 依存関係のインストール:
```bash
npm install
```

4. 開発サーバーの起動:
```bash
npm run dev
```

ブラウザで `http://localhost:3000` を開いて確認できます。

## プロジェクト構成

```
nyatch/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   └── games/
│   ├── components/
│   │   ├── common/
│   │   ├── games/
│   │   └── ui/
│   ├── hooks/
│   ├── styles/
│   ├── types/
│   ├── utils/
│   └── constants/
├── public/
│   ├── images/
│   ├── sounds/
│   └── animations/
└── package.json
```

## 開発ガイドライン

- `src/` ディレクトリ以下にすべてのソースコードを配置
- コンポーネントは `components/` ディレクトリに配置
- ページは `app/` ディレクトリに配置
- 静的ファイルは `public/` ディレクトリに配置

## デプロイ

Vercelを使用してデプロイします。デプロイ手順は後日追加予定。

## ライセンス

[ライセンス情報をここに記載]