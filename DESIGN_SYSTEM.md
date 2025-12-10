# 設計系統重構指南

## 📚 概述

此指南列出了針對你的聖經測驗應用的完整設計系統重構計畫。本重構遵循現代 React + TypeScript 的最佳實踐，重點在於可維護性、擴展性和語意化。

---

## 🎯 重構目標

1. **統一樣式管理** - 所有 Tailwind class 透過設計 Token 中心化管理
2. **語意化色彩系統** - 使用 `primary`, `secondary`, `success` 等而非 `blue-500`, `red-700`
3. **元件可重用性** - 使用 CVA (class-variance-authority) 建立靈活的元件變體
4. **Dark Mode 自動化** - CSS Variables 在 `:root` 和 `.dark` 中自動切換，無需額外邏輯
5. **型別安全** - TypeScript interfaces 確保元件屬性的正確性

---

## ✅ 已完成的重構步驟

### 1️⃣ 設計 Token 系統建立
**檔案**: `src/styles/globals.css`
- 定義了語意化的 CSS Variables (HSL 色彩)
- Light mode 在 `:root` 中定義
- Dark mode 在 `.dark` 中重新定義
- Token 涵蓋: 顏色、間距、圓角、陰影、排版

**優勢**:
```css
/* ❌ 舊做法 - 硬寫色碼 */
.button { background: #ff6b35; }
.dark .button { background: #ffa500; }

/* ✅ 新做法 - 使用 Token */
.button { background: hsl(var(--color-primary)); }
/* 自動適應 Dark mode，無需額外規則 */
```

### 2️⃣ Tailwind 配置更新
**檔案**: `tailwind.config.js`
- 建立語意化色彩 map (primary, secondary, accent, etc.)
- 所有色彩指向 CSS Variables
- 支援 opacity 修飾符 (`primary/50`)

### 3️⃣ CVA 架構元件
已建立的元件:

#### 🔘 Button.tsx
```typescript
// 支援變體組合
<Button variant="primary" size="lg" fullWidth>
  主要按鈕
</Button>

<Button variant="secondary" size="sm" disabled>
  次要按鈕
</Button>

<Button variant="ghost" size="md">
  幽靈按鈕
</Button>
```

**Button 變體**:
- `variant`: primary | secondary | ghost | danger
- `size`: sm | md | lg | xl
- `fullWidth`: true | false

#### 📦 GlassCard.tsx
```typescript
<GlassCard variant="elevated" padding="lg" rounded="xl">
  內容
</GlassCard>
```

**GlassCard 變體**:
- `variant`: default | elevated | subtle
- `padding`: sm | md | lg
- `rounded`: md | lg | xl

#### 📝 Input.tsx
```typescript
<Input
  variant="default"
  inputSize="md"
  placeholder="輸入文字..."
/>
```

**Input 變體**:
- `variant`: default | secondary
- `inputSize`: sm | md | lg

### 4️⃣ 工具函數
**檔案**: `src/lib/cn.ts`
- 合併 Tailwind class，自動解決優先級衝突
- 使用 `clsx` + `tailwind-merge`

**用法**:
```typescript
// ❌ 可能發生衝突
className={`px-8 ${className}`} // 若 className 包含 px-4

// ✅ 自動解決
className={cn('px-8', className)} // 正確合併
```

### 5️⃣ 設計 Token 參考檔案
**檔案**: `src/lib/design-tokens.ts`
- TypeScript 中參考 Token 的完整列表
- 用於設計系統文件和一致性檢查

---

## 📋 逐步重構計畫

### Phase 1: 基礎設施 ✅ (已完成)
- [x] globals.css 設計 Token 定義
- [x] tailwind.config.js 更新
- [x] 依賴安裝 (cva, tailwind-merge, clsx)
- [x] Button 和 GlassCard 重構
- [x] Input 元件建立

### Phase 2: 擴展基礎元件 ⏳ (建議下一步)

建立以下額外的基礎元件:

```typescript
// src/components/Badge.tsx
const Badge = ({ variant, children }) => {
  // variant: primary | success | warning | error | muted
};

// src/components/Checkbox.tsx
const Checkbox = ({ checked, onChange }) => {
  // label 和狀態指示
};

// src/components/Loading.tsx
const Loading = ({ size, variant }) => {
  // size: sm | md | lg
  // variant: spinner | skeleton
};
```

### Phase 3: 佈局元件
```typescript
// src/components/Container.tsx
// 固定寬度容器，響應式邊距

// src/components/Stack.tsx
// Flexbox 堆疊 (row/column)，可控制間距

// src/components/Grid.tsx
// CSS Grid 佈局
```

### Phase 4: 反饋元件
```typescript
// src/components/Modal.tsx
// 模態視窗

// src/components/Toast.tsx
// 吐司通知

// src/components/Alert.tsx
// 警告框
```

### Phase 5: 業務元件重構
逐一檢視並更新:
- [ ] MenuScreen.tsx - 使用新的 Button 和 GlassCard
- [ ] GameScreen.tsx - 應用語意化色彩和間距 Token
- [ ] FinishedScreen.tsx - 統一樣式
- [ ] Background.tsx - 確認樣式一致性

---

## 🎨 使用範例

### 色彩使用

```tsx
// ❌ 舊做法
<div className="bg-blue-500 dark:bg-blue-900">
  硬寫色碼，難以統一管理
</div>

// ✅ 新做法
<div className="bg-primary dark:bg-primary">
  {/* 自動適應 Light/Dark mode */}
</div>

// 帶有 opacity
<div className="bg-primary/50 border border-border/20">
  {/* 透明度變體 */}
</div>
```

### 元件變體組合

```tsx
// Button 組合
<Button variant="primary" size="lg">主要大按鈕</Button>
<Button variant="secondary" size="sm">次要小按鈕</Button>
<Button variant="danger" fullWidth>危險全寬按鈕</Button>

// GlassCard 組合
<GlassCard variant="elevated" padding="lg">
  <h2>標題</h2>
  <p>內容</p>
</GlassCard>

// Input 組合
<Input variant="default" inputSize="lg" placeholder="大型輸入" />
<Input variant="secondary" inputSize="sm" disabled />
```

### 自訂樣式疊加

```tsx
// CVA 生成的樣式 + 自訂 className
<Button
  variant="primary"
  size="md"
  className="rounded-lg" // 覆蓋預設的圓角
>
  自訂按鈕
</Button>

// cn() 自動解決衝突
className={cn(
  'px-4 py-2',
  isActive && 'bg-primary', // 條件式樣式
  customClass
)}
```

---

## 🔄 Dark Mode 自動化

**無需任何 JavaScript 邏輯**:

```css
/* globals.css 中已定義 */
:root {
  --color-primary: 33 81% 51%; /* Light */
}

.dark {
  --color-primary: 33 81% 55%; /* Dark */
}
```

**元件自動適應**:
```tsx
<div className="bg-primary text-foreground">
  {/* Light mode: bg-orange-500, text-neutral-900 */}
  {/* Dark mode: bg-orange-600, text-white */}
  {/* 無需寫 dark:bg-orange-600 dark:text-white */}
</div>
```

---

## 📊 重構前後對比

| 項目 | 重構前 | 重構後 |
|------|--------|--------|
| 色彩管理 | 硬寫 + `dark:` modifier | CSS Variables (自動) |
| 元件樣式 | 字串拼接 | CVA 變體 |
| 尺寸定義 | 重複在各元件 | 統一 Token |
| 型別安全 | ⚠️ `string` 型別 | ✅ Union types |
| 變體組合 | 手動字串 | 自動驗證 |
| 重用性 | 低 (少量元件) | 高 (多變體支援) |

---

## 🛠️ 常見任務

### 新增顏色 Token

1. 在 `globals.css` 的 `:root` 和 `.dark` 中加入:
```css
:root {
  --color-info: 220 90% 56%;
}

.dark {
  --color-info: 220 90% 56%;
}
```

2. 在 `tailwind.config.js` 中加入:
```javascript
colors: {
  info: 'hsl(var(--color-info) / <alpha-value>)',
}
```

3. 在元件中使用:
```tsx
<div className="bg-info text-white">Info message</div>
```

### 建立新元件變體

```typescript
// ❌ 舊做法
const Component = ({ type }) => {
  const style = type === 'a' ? 'px-4 py-2 bg-blue-500' : 'px-6 py-3 bg-red-500';
  return <div className={style}>...</div>;
};

// ✅ 新做法
import { cva } from 'class-variance-authority';

const componentVariants = cva('px-4 py-2 rounded-lg transition-colors', {
  variants: {
    type: {
      a: 'bg-primary text-white',
      b: 'bg-error text-white',
    },
    size: {
      sm: 'px-3 py-1 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    },
  },
  defaultVariants: {
    type: 'a',
    size: 'md',
  },
});

const Component = ({ type, size, className }) => {
  return <div className={cn(componentVariants({ type, size }), className)}>...</div>;
};
```

---

## 📚 相關文件

- `tailwind.config.js` - Tailwind 設定 (色彩 map)
- `src/styles/globals.css` - 全域 CSS Variables 和 @theme
- `src/lib/cn.ts` - class 合併工具
- `src/lib/design-tokens.ts` - Token 參考列表
- `src/components/Button.tsx` - CVA 元件範例
- `src/components/GlassCard.tsx` - CVA 元件範例
- `src/components/Input.tsx` - CVA 元件範例

---

## 🚀 最佳實踐

1. **永遠使用語意化色彩** - `bg-primary` 而非 `bg-orange-500`
2. **利用 Token 定義變體** - 避免硬寫樣式字串
3. **使用 CVA 管理變體** - 確保型別安全和可預測性
4. **使用 `cn()` 合併樣式** - 避免 Tailwind 衝突
5. **定義 forwardRef** - 允許外部存取 DOM 元素
6. **提供 TypeScript interfaces** - 更好的 IDE 支援和文件
7. **記錄變體選項** - 在註解中說明可用的 variant/size

---

## 💡 故障排除

### 色彩沒有改變 (Dark mode)
確保 `.dark` class 正確應用到 `<html>` 元素，並檢查 CSS Variables 是否正確定義在 `.dark` 選擇器中。

### Tailwind class 衝突
使用 `cn()` 而非字串拼接:
```tsx
// ❌ 可能有衝突
className={`px-4 ${userClass}`}

// ✅ 自動解決
className={cn('px-4', userClass)}
```

### 型別錯誤 (variant 不存在)
確保 CVA 定義中的 variant 名稱與使用時的參數相符。TypeScript 會在編譯時捕捉這些錯誤。

---

## 📞 後續步驟

1. 檢查 `MenuScreen`, `GameScreen`, `FinishedScreen` 是否需要更新
2. 根據 Phase 2-4 計畫逐步新增其他基礎元件
3. 建立設計系統文件頁面 (Storybook 或靜態 HTML)
4. 定期檢視和更新 Token (色彩、間距等)

---

**設計系統重構完成日期**: 2025-12-10
**狀態**: 基礎設施完成，元件逐步重構中
