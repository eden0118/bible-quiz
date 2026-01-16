# Bible Wisdom Flashcards 聖經智慧卡片

一個現代化、互動式的聖經卡片遊戲，使用 React、TypeScript、Tailwind CSS v4 和 Vite 建立。

## 📁 專案結構

```
bible-quiz/
├── src/
│   ├── pages/               # 頁面元件 (路由級別)
│   │   ├── MenuScreen.tsx   # 菜單頁面
│   │   ├── GameScreen.tsx   # 遊戲頁面
│   │   ├── FinishedScreen.tsx # 結果頁面
│   │   └── index.ts         # 頁面匯出
│   ├── components/          # 可複用的 UI 元件
│   │   ├── GlassCard.tsx    # 玻璃態卡片元件
│   │   ├── Background.tsx   # 背景層元件
│   │   ├── Footer.tsx       # 頁尾元件
│   │   ├── Leaderboard.tsx  # 排行榜元件
│   │   └── index.ts         # 元件匯出
│   ├── database/            # 資料與國際化
│   │   ├── data.ts          # 聖經卡片資料
│   │   ├── i18n.ts          # 多語言翻譯
│   │   └── index.ts         # 資料匯出
│   ├── lib/                 # 工具函數與狀態管理
│   │   ├── gameStore.ts     # Zustand 狀態管理
│   │   ├── gameLogic.ts     # 遊戲邏輯
│   │   ├── storage.ts       # localStorage 操作
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

## 資料夾組織原則

本項目遵循 **Vite 官方建議**的資料夾結構：

- **pages/** - 頁面級別元件（對應應用中的不同視圖）
- **components/** - 可跨頁面複用的 UI 元件
- **lib/** - 工具函數、狀態管理、業務邏輯
- **database/** - 靜態資料和國際化文本
- **styles/** - 全局樣式和設計系統

## 📋 題目選擇邏輯

遊戲採用多層篩選機制來決定每場遊戲的題目集合：

### 篩選步驟

1. **模式篩選**
   - 全部 (all): 使用所有卡片
   - 舊約 (old): 只選舊約相關卡片
   - 新約 (new): 只選新約相關卡片

2. **隨機打亂**
   - 使用 Fisher-Yates 算法進行隨機排序
   - 確保每次遊戲的題目順序不同

3. **題數限制**
   - 從打亂後的卡片中取前 N 題
   - 開發階段配置：`CARDS_PER_GAME = 5` (在 `src/App.tsx` 中修改)

### 範例

假設有 10 張舊約卡片，玩家選擇「舊約」模式：

- 步驟 1: 篩選出 10 張舊約卡片
- 步驟 2: 隨機排列 (例如: 3, 7, 1, 9, 5, ...)
- 步驟 3: 取前 5 張 → 卡片 3, 7, 1, 9, 5

### 開發階段調整

如需改變每次遊戲的題數：

```tsx
// src/App.tsx
const CARDS_PER_GAME = 5; // 修改此數值
```

---

## 🎮 遊戲特性

- **互動式 UI**: 動畫背景、玻璃效果設計、流暢的使用者互動
- **遊戲化機制**: 計分系統、本地排行榜 (localStorage)
- **隨機題目**: Fisher-Yates 算法確保題目隨機且多樣
- **三種模式**: 全部經文、舊約、新約
- **進度追蹤**: 實時顯示進度條和答題統計
- **響應式設計**: 行動優先的 Tailwind CSS v4 實現
- **類型安全**: 全程 TypeScript 支援

## ✨ 最新功能 (v1.1.0)

### 時間追蹤系統

- ⏱️ **遊戲時間統計**: 累積實際答題時間（不包括看結果和點下一題的停留時間）
- ⏱️ **單題耗時**: 實時顯示每個題目的答題時間
- ⏱️ **平均用時**: 計算每題平均耗時
- ⏱️ **時間精度**: 精確至小數點後兩位

### 答題詳細記錄

- 📋 **回答列表**: 顯示所有回答的題目及時間
- ✅ **正確題目**: 只顯示答案（綠色標記）
- ❌ **錯誤題目**: 並排顯示選擇的答案和正確答案（紅色標記）
- 📍 **經文出處**: 每題顯示經文來源和參考位置

### 數據持久化

- 💾 **進度恢復**: 刷新頁面後可繼續進行中的遊戲
- 💾 **結果保留**: 刷新頁面後仍能查看完整的遊戲結果及所有詳細記錄
- 💾 **Zustand 狀態**: 中央化狀態管理確保數據一致性

## 🛠️ 技術棧

| 工具             | 版本    | 用途                |
| ---------------- | ------- | ------------------- |
| **React**        | ^19.2.1 | UI 框架             |
| **TypeScript**   | ~5.8.2  | 類型安全            |
| **Tailwind CSS** | ^4.1.17 | 樣式框架 (CSS 優先) |
| **Zustand**      | ^5.0.10 | 狀態管理            |
| **Vite**         | ^6.2.0  | 建置工具            |
| **Vitest**       | ^4.0.17 | 單元測試框架        |
| **Prettier**     | ^3.7.4  | 代碼格式化          |

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

### 測試

```bash
npm run test                # 監視模式運行測試
npm run test:ui             # 在 UI 儀表板中運行測試
npm run test:coverage       # 生成代碼覆蓋率報告
```

#### 測試框架與工具

- **Vitest**: 現代化的 JavaScript 測試框架
- **@testing-library/react**: React 元件測試工具
- **happy-dom**: 輕量級 DOM 實現，用於測試環境

#### 測試覆蓋

當前測試覆蓋 **36 個用例**：

| 模組             | 測試數 | 涵蓋範圍                         |
| ---------------- | ------ | -------------------------------- |
| **gameLogic.ts** | 17     | 卡片篩選、計分、準確率、隨機排序 |
| **storage.ts**   | 8      | localStorage 操作、數據持久化    |
| **data.ts**      | 11     | 卡片數據結構、翻譯字段驗證       |

##### gameLogic 測試

- `filterCards()`: 卡片篩選、模式切換、數量限制
- `calculateScore()`: 時間轉分數的映射算法
- `calculateAccuracy()`: 準確率百分比計算
- `shuffleCards()`: Fisher-Yates 隨機算法

##### storage 測試

- `GameRecord`: 遊戲記錄的儲存、查詢、排序
- `GameProgress`: 進行中遊戲的進度保存和恢復
- `GameResult`: 遊戲結果的完整保存和清除
- `localStorage 模擬\*\*: 測試環境中的本地存儲功能

##### data 測試

- 卡片數據有效性驗證（ID、選項、答案索引）
- 翻譯文本的完整性檢查
- 數據結構一致性驗證

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

使用 **Zustand** 進行中央化狀態管理，所有遊戲狀態存儲在 `useGameStore`：

````tsx
const {
  gameState,        // 遊戲狀態: menu | playing | finished
  score,            // 當前分數
  cardTimes,        // 每題耗時陣列
  accumulatedGameTime, // 累積遊戲時間
  wrongAnswers,     // 答錯的題目清單
  startGame,        // 開始遊戲
  addCardTime,      // 記錄單題耗時
  addAccumulatedGameTime, // 累積遊戲時間
} = useGameStore();

### 條件式螢幕渲染

根據 `gameState` 渲染不同螢幕，使用簡潔的 if 語句。

### localStorage 狀態持久化

採用分層持久化設計：

- **遊戲進度** (`bible_quiz_progress`):
  - 自動儲存當前遊戲進度、答題記錄、時間數據
  - 刷新後可恢復到中斷前的狀態
  - 開始新遊戲時清除

- **遊戲結果** (`bible_quiz_result`):
  - 遊戲結束後自動儲存完整結果
  - 包含所有回答、時間、錯誤題目等詳細信息
  - 返回菜單時清除

- **排行榜** (`bible_quiz_records`):
  - 自動儲存玩家成績
  - 支援前 10 筆紀錄查詢
  - 持續累積，可用於長期進度追蹤

## 🚀 部署

可部署至 Vercel、Netlify 或任何支援靜態檔案的平台：

```bash
npm run build   # 生成 dist/ 資料夾
# 將 dist/ 部署至託管平台
````

## 📄 授權

© 2026 Eden. All rights reserved.
