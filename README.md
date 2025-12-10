# Bible Wisdom Flashcards 聖經智慧卡片

一個現代化、互動式的聖經卡片遊戲，使用 React、TypeScript、Tailwind CSS v4 和 Vite 建立。

## 📁 專案結構

```
bible-quiz/
├── src/
│   ├── components/          # UI 元件
│   │   ├── Button.tsx       # 按鈕元件 (CVA 變體系統)
│   │   ├── GlassCard.tsx    # 玻璃態卡片元件
│   │   ├── Background.tsx   # 背景層元件
│   │   ├── Footer.tsx       # 頁尾
│   │   ├── Leaderboard.tsx  # 排行榜
│   │   └── index.ts         # 元件匯出
│   ├── screens/             # 應用螢幕
│   │   ├── MenuScreen.tsx   # 菜單螢幕
│   │   ├── GameScreen.tsx   # 遊戲螢幕
│   │   ├── FinishedScreen.tsx # 結束螢幕
│   │   └── index.ts         # 螢幕匯出
│   ├── database/            # 資料與國際化
│   │   ├── data.ts          # 聖經卡片資料
│   │   ├── i18n.ts          # 多語言翻譯
│   │   └── index.ts         # 資料匯出
│   ├── lib/                 # 工具函數
│   │   └── cn.ts            # CSS class 合併工具
│   ├── styles/
│   │   └── globals.css      # 全局樣式與設計系統
│   ├── App.tsx              # 主應用邏輯
│   └── index.tsx            # 應用入點
├── index.html               # HTML 入點
├── vite.config.ts           # Vite 配置
├── tailwind.config.js       # Tailwind CSS 配置
├── tsconfig.json            # TypeScript 配置
├── package.json             # 專案依賴
└── README.md                # 此檔案
```

## ✨ 功能特性

- **雙語支援**: 繁體中文 (zh) 和英文 (en)
- **深色模式**: 完全支援亮色/深色主題，透過 CSS 變數自動切換
- **互動式 UI**: 動畫背景、玻璃效果設計、流暢的使用者互動
- **遊戲化機制**: 計分系統、本地排行榜 (localStorage)
- **響應式設計**: 行動優先的 Tailwind CSS v4 實現
- **類型安全**: 全程 TypeScript 支援

## 🛠️ 技術棧

| 工具 | 版本 | 用途 |
|------|------|------|
| **React** | ^19.2.1 | UI 框架 |
| **TypeScript** | ~5.8.2 | 類型安全 |
| **Tailwind CSS** | ^4.1.17 | 樣式框架 (CSS 優先) |
| **Vite** | ^6.2.0 | 建置工具 |
| **Prettier** | ^3.7.4 | 代碼格式化 |

## 📦 安裝與開發

### 安裝依賴
```bash
npm install
```

### 開發模式
```bash
npm run dev
# 訪問 http://localhost:5173
```

### 代碼格式化
```bash
npm run format              # 格式化全部文件
npm run format:check        # 檢查格式
```

### 構建生產版本
```bash
npm run build               # 編譯 TypeScript + Vite 構建
npm run preview             # 預覽生產構建
```

### 類型檢查
```bash
npm run type-check          # 檢查 TypeScript 錯誤
```

## 🎨 設計系統

本專案採用 **Tailwind CSS v4** 的 CSS 優先配置，透過 CSS 變數管理設計 Token。

### 色彩系統
所有色彩定義在 `src/styles/globals.css` 中的 `:root` CSS 變數：
- **主色**: `--color-primary` (橙紅)
- **次色**: `--color-secondary` (中性灰)
- **強調色**: `--color-accent` (黃色)
- **語意色**: `success`, `warning`, `error`
- **背景**: `--color-background`, `--color-foreground`

### 字體與排版
- **預設字體**: Noto Sans TC (繁體中文)
- **特殊字體**: Noto Serif TC (標題用)

### CVA 變體系統
Button 和 GlassCard 元件使用 **class-variance-authority** 提供類型安全的變體組合：

```tsx
<Button variant="primary" size="lg" fullWidth>
  主要按鈕
</Button>

<GlassCard variant="elevated" padding="lg">
  內容
</GlassCard>
```

## 📝 程式碼特色

### 簡潔的狀態管理
App 元件集中管理遊戲狀態，使用 React Hooks：
```tsx
const [gameState, setGameState] = useState<GameState>('menu');
const [score, setScore] = useState(0);
const [leaderboard, setLeaderboard] = useState([]);
```

### 條件式螢幕渲染
根據 `gameState` 渲染不同螢幕，使用簡潔的 if 語句。

### localStorage 排行榜
自動儲存玩家成績到本地，支援前 10 筆紀錄。

## 🚀 部署

可部署至 Vercel、Netlify 或任何支援靜態檔案的平台：

```bash
npm run build   # 生成 dist/ 資料夾
# 將 dist/ 部署至託管平台
```

## 📄 授權

© 2025 Eden Chang. All rights reserved.
