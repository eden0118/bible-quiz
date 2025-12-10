# 輕量級設計系統實戰指南
## Pragmatic Design System for React + Tailwind v4

**核心理念**: CSS-First，無需過度元件化。讓樣式管理回歸 CSS，React 元件專注於邏輯與行為。

---

## 📋 目錄結構

```
src/
├── styles/
│   └── globals.css          # 設計系統的唯一真實源頭
│
├── lib/
│   ├── cn.ts                # Tailwind class 合併工具
│   └── design-tokens.ts     # Token 參考表（TypeScript）
│
├── components/
│   ├── Button.tsx           # 實用元件（CVA + Simple Logic）
│   ├── Card.tsx             # Compound Component Pattern
│   ├── Input.tsx            # 表單元件
│   ├── Background.tsx       # 特殊效果元件
│   └── index.ts             # 統一匯出點
```

---

## 🎯 第一層：Typography & Global Styles

### 原則：不建立 `<Heading>` 或 `<Paragraph>` 元件

**為什麼？**
- 文字樣式屬於 CSS 的領域，不應該是 React 元件
- 直接使用 className 更快，檔案跳轉更少
- Tailwind utilities 已經足夠

### 實作方式

在 `globals.css` 的 `@layer utilities` 中定義語意化的文字類別：

```css
/* globals.css */
@layer utilities {
  /* Heading Styles */
  .text-h1 {
    @apply text-3xl font-bold md:text-4xl;
    line-height: var(--line-height-tight);
    color: hsl(var(--color-foreground));
  }

  .text-h2 {
    @apply text-2xl font-bold md:text-3xl;
    line-height: var(--line-height-tight);
  }

  .text-h3 {
    @apply text-xl font-bold md:text-2xl;
    line-height: var(--line-height-tight);
  }

  /* Body Styles */
  .text-body {
    @apply text-sm md:text-base;
    line-height: var(--line-height-normal);
    color: hsl(var(--color-foreground));
  }

  .text-body-sm {
    @apply text-xs md:text-sm;
    color: hsl(var(--color-foreground));
  }

  /* Muted/Secondary Text */
  .text-muted {
    @apply text-sm;
    color: hsl(var(--color-muted-foreground));
  }
}
```

### 在 React 中使用

```tsx
// ❌ 舊做法（建立不必要的元件）
<Heading level={1} className="mb-4">標題</Heading>
<Paragraph size="large">內容</Paragraph>

// ✅ 新做法（直接使用 className）
<h1 className="text-h1 mb-4">標題</h1>
<p className="text-body-lg">內容</p>

// ✅ 或使用語意化 HTML + Utility
<h2 className="text-h2">副標題</h2>
<span className="text-muted">輔助文本 — 自動適應 Dark Mode</span>
```

### Dark Mode 自動化

**CSS Variables 在 Light/Dark 中定義：**

```css
:root {
  --color-foreground: 0 0% 9%;
  --line-height-tight: 1.2;
}

.dark {
  --color-foreground: 0 0% 98%;
  /* line-height 不變 */
}
```

**元件無需任何邏輯：**

```tsx
// 自動適應 Dark Mode，無需 dark:text-white
<h1 className="text-h1">標題</h1>
```

### 排版 Token 完整列表

| Class | 用途 | 響應式 | Dark Mode |
|-------|------|--------|-----------|
| `.text-h1` - `.text-h4` | 標題 1-4 級 | ✅ | ✅ 自動 |
| `.text-body-lg`, `.text-body`, `.text-body-sm` | 正文 | ✅ | ✅ 自動 |
| `.text-muted`, `.text-muted-sm` | 次要文本 | ❌ | ✅ 自動 |
| `.text-label` | 標籤/說明 | ❌ | ✅ 自動 |
| `.text-emphasis` | 強調文本 | ❌ | ✅ 自動 |
| `.text-display` | 大展示文本（serif） | ✅ | ✅ 自動 |

---

## 📐 第二層：Layout & Spacing

### 原則：不建立 `<Container>`, `<Stack>`, `<Box>` 元件

**為什麼？**
- 這些都是純樣式，無邏輯
- Utility 組合比 React props 更靈活
- Tailwind 原生 utilities 已經很強大

### Layout Utilities 定義

```css
/* globals.css - @layer utilities */

/* Container - 內容容器 */
.layout-container {
  @apply mx-auto w-full max-w-6xl px-4 md:px-6;
}

.layout-container-sm {
  @apply mx-auto w-full max-w-4xl px-4 md:px-6;
}

/* Section - 區塊級垂直間距 */
.section-spacing {
  @apply py-12 md:py-16;
}

.section-spacing-sm {
  @apply py-6 md:py-8;
}

/* Stack - Flexbox 堆疊 */
.stack-vertical {
  @apply flex flex-col gap-4;
}

.stack-vertical-tight {
  @apply flex flex-col gap-2;
}

.stack-vertical-loose {
  @apply flex flex-col gap-6 md:gap-8;
}

.stack-horizontal {
  @apply flex flex-row items-center gap-4;
}

/* Grid */
.grid-2-cols {
  @apply grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6;
}

.grid-3-cols {
  @apply grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6;
}

/* Content Padding */
.content-padding {
  @apply p-6 md:p-8;
}

.content-padding-sm {
  @apply p-4 md:p-6;
}
```

### 在 React 中使用

```tsx
// 頁面佈局
<div className="layout-container section-spacing">
  <h1 className="text-h1 mb-8">頁面標題</h1>

  <div className="stack-vertical-loose">
    <Card>...</Card>
    <Card>...</Card>
  </div>
</div>

// 列表/網格
<div className="grid-2-cols">
  {items.map(item => (
    <Card key={item.id}>{item.name}</Card>
  ))}
</div>

// 表單
<form className="stack-vertical max-w-2xl">
  <input className="text-body" />
  <button className="mt-6">提交</button>
</form>
```

### Layout Utility 清單

| Class | 效果 | 何時使用 |
|-------|------|---------|
| `.layout-container` | max-w-6xl + 自動邊距 | 主要內容容器 |
| `.layout-container-sm` | max-w-4xl + 自動邊距 | 較窄的內容區 |
| `.section-spacing` | py-12 md:py-16 | 區塊間的垂直間距 |
| `.stack-vertical` | flex flex-col gap-4 | 垂直元素堆疊 |
| `.stack-horizontal` | flex flex-row gap-4 | 水平元素堆疊 |
| `.grid-2-cols` | 2 列响應式網格 | 卡片網格 |
| `.content-padding` | p-6 md:p-8 | 卡片/容器內部邊距 |

---

## 🧩 第三層：Pragmatic Component Pattern

### 原則：Single File + CVA + Compound Pattern

#### 案例 1：Card（Compound Component）

**為什麼用 Compound Pattern？**
- 子元件邏輯簡單，無需單獨檔案
- 一個檔案內所有邏輯一目了然
- 易於維護和修改

**檔案：`src/components/Card.tsx`**

```tsx
import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/cn';

// CVA 變體定義 - 清晰可見
const cardVariants = cva(
  'glass rounded-2xl border shadow-lg transition-colors duration-300',
  {
    variants: {
      variant: {
        default: '',
        elevated: 'shadow-xl',
        subtle: 'shadow-sm',
      },
      padding: {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md',
    },
  }
);

// 子元件樣式
const cardHeaderVariants = cva('border-b border-border/20', {
  variants: {
    spacing: {
      sm: 'pb-3',
      md: 'pb-4',
      lg: 'pb-6',
    },
  },
  defaultVariants: {
    spacing: 'md',
  },
});

// 元件定義（簡潔）
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, padding }), className)}
      {...props}
    />
  )
);

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, spacing, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardHeaderVariants({ spacing }), className)}
      {...props}
    />
  )
);

// ... CardContent, CardFooter

// Compound 導出
export const CardComponent = Object.assign(Card, {
  Header: CardHeader,
  Content: CardContent,
  Footer: CardFooter,
});
```

**使用方式：**

```tsx
import { Card } from './components/Card';

<Card variant="elevated" padding="lg">
  <Card.Header spacing="md">
    <h2 className="text-h3">卡片標題</h2>
  </Card.Header>

  <Card.Content spacing="md">
    <p className="text-body">卡片內容</p>
  </Card.Content>

  <Card.Footer spacing="md" className="flex gap-3 justify-end">
    <Button variant="secondary">取消</Button>
    <Button variant="primary">確認</Button>
  </Card.Footer>
</Card>
```

#### 案例 2：Button（Simple CVA Component）

**邏輯最小化，樣式集中：**

```tsx
import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center font-medium transition-all duration-200 focus-ring disabled:disabled-state',
  {
    variants: {
      variant: {
        primary: 'bg-gradient-to-r from-[hsl(var(--color-primary))] to-[hsl(var(--color-accent))] text-white hover:shadow-lg active:scale-95',
        secondary: 'bg-secondary text-foreground hover:bg-secondary/90 active:scale-95',
        ghost: 'border border-border text-foreground hover:bg-muted/50 active:scale-95',
        danger: 'bg-error text-white hover:shadow-lg active:scale-95',
      },
      size: {
        sm: 'h-8 px-3 text-sm rounded-md',
        md: 'h-10 px-4 text-base rounded-lg',
        lg: 'h-12 px-6 text-lg rounded-xl',
        xl: 'h-14 px-8 rounded-full',
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-auto',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size, fullWidth }), className)}
      {...props}
    />
  )
);

Button.displayName = 'Button';
```

**使用方式：**

```tsx
// 變體組合
<Button variant="primary" size="lg" fullWidth>
  主要操作
</Button>

<Button variant="ghost" size="sm">
  取消
</Button>

// 自訂樣式疊加
<Button className="uppercase">
  特殊按鈕
</Button>
```

---

## 🌙 Dark Mode：CSS Variables 自動切換

### 設計理念

**所有色彩透過 CSS Variables 定義，無需額外的 `dark:` modifier：**

```css
:root {
  --color-foreground: 0 0% 9%;
  --color-primary: 33 81% 51%;
}

.dark {
  --color-foreground: 0 0% 98%;
  --color-primary: 33 81% 55%;
}
```

**React 元件無感知：**

```tsx
// ❌ 舊做法 - 需要手動管理 Dark Mode
<div className="text-black dark:text-white">...</div>

// ✅ 新做法 - 自動適應
<div className="text-foreground">...</div>
```

### 為什麼這樣做？

| 項目 | 舊做法 | 新做法 |
|------|--------|--------|
| Dark Mode 邏輯 | 分散在各元件的 `dark:` modifier | 集中在 CSS Variables |
| 修改主題色 | 需要搜尋並替換多個檔案 | 只需改 1 個 CSS 變數 |
| 程式碼閱讀 | className 充滿 `dark:` 很雜亂 | 乾淨且簡潔 |
| 新增元件 | 需要記得加 `dark:` modifier | 自動適應，無需額外設定 |

### 實作檢查清單

```css
/* 1. 在 :root 定義 Light Mode 變數 */
:root {
  --color-foreground: 0 0% 9%;
  --color-background: 0 0% 95%;
}

/* 2. 在 .dark 重新定義變數 */
.dark {
  --color-foreground: 0 0% 98%;
  --color-background: 0 0% 3%;
}

/* 3. 在 @layer utilities 中使用變數 */
.text-body {
  color: hsl(var(--color-foreground));
}

/* 4. 元件中直接使用 className，無需 dark: modifier */
<div className="text-body bg-background">
  {/* 自動適應 Light/Dark mode */}
</div>
```

---

## ✅ 最佳實踐檢查清單

### Typography 層

- [ ] 使用 `.text-h1` ~ `.text-h4` 代替 `<Heading>` 元件
- [ ] 使用 `.text-body` 代替 `<Paragraph>` 元件
- [ ] 使用 `.text-muted` 代替條件式的 `dark:text-gray-400`
- [ ] 所有排版透過 CSS Variables 定義，支援 Dark Mode

### Layout 層

- [ ] 使用 `.layout-container` 包裹頁面內容
- [ ] 使用 `.stack-vertical` / `.stack-horizontal` 代替 `<Wrapper>` 元件
- [ ] 使用 `.grid-2-cols` / `.grid-3-cols` 代替自訂 grid 樣式
- [ ] 使用 `.content-padding` 代替硬寫 `p-6 md:p-8`

### Component 層

- [ ] Button, Card 等都使用 CVA 定義變體
- [ ] Compound Components 放在同一檔案內
- [ ] 邏輯簡單的元件不超過 150 行
- [ ] 所有元件支援 `className` prop 用於自訂樣式

### Dark Mode

- [ ] 所有色彩使用 CSS Variables（`hsl(var(--color-xxx))`）
- [ ] `.dark` 選擇器中覆蓋變數值
- [ ] React 元件無需 `dark:` modifier
- [ ] 測試切換 Dark Mode 時樣式是否正確

---

## 🔧 常見場景

### 場景 1：建立新頁面

```tsx
export default function HomePage() {
  return (
    <div className="layout-container section-spacing">
      {/* 頁面標題 */}
      <h1 className="text-h1 mb-8">頁面標題</h1>

      {/* 內容區域 */}
      <div className="stack-vertical-loose">
        <Card>
          <Card.Header>
            <h2 className="text-h3">卡片 1</h2>
          </Card.Header>
          <Card.Content>
            <p className="text-body">內容</p>
          </Card.Content>
        </Card>

        <Card>
          <Card.Header>
            <h2 className="text-h3">卡片 2</h2>
          </Card.Header>
          <Card.Content>
            <p className="text-body">內容</p>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
}
```

### 場景 2：表單設計

```tsx
<Card padding="lg">
  <Card.Header>
    <h2 className="text-h3">表單標題</h2>
  </Card.Header>

  <Card.Content className="stack-vertical">
    <div>
      <label className="text-label mb-2 block">名稱</label>
      <Input placeholder="輸入名稱" />
    </div>

    <div>
      <label className="text-label mb-2 block">說明</label>
      <textarea className="text-body w-full rounded-lg border border-border p-3" />
    </div>
  </Card.Content>

  <Card.Footer className="flex gap-3 justify-end">
    <Button variant="ghost">取消</Button>
    <Button variant="primary">保存</Button>
  </Card.Footer>
</Card>
```

### 場景 3：自訂樣式覆蓋

```tsx
// CVA 提供的樣式 + 自訂 className
<Button
  variant="primary"
  className="uppercase tracking-widest"
>
  特殊按鈕
</Button>

// cn() 自動解決衝突
<Card
  padding="md"
  className="max-w-2xl"
>
  ...
</Card>
```

---

## 📊 與傳統方式的對比

| 面向 | 傳統（過度元件化） | 新方式（CSS-First） |
|------|------------------|------------------|
| **檔案數量** | Heading.tsx, Paragraph.tsx, Container.tsx, Stack.tsx... | Button.tsx, Card.tsx, Input.tsx |
| **Dark Mode** | 每個元件需要 `dark:` modifier | CSS Variables，自動切換 |
| **學習曲線** | 需記住所有 props | Tailwind utilities + CSS Variables |
| **修改主題色** | 搜尋並替換多個檔案 | 修改 1 個 CSS 變數 |
| **程式碼量** | 多 | 少（專注於邏輯） |
| **維護性** | 低（分散） | 高（集中） |

---

## 🎓 總結

### 核心原則

1. **CSS > React** - 樣式屬於 CSS，不應該是 React 邏輯
2. **Co-location** - 相關邏輯放在同一個檔案
3. **Semantic Naming** - 使用有意義的 class 名稱（`.text-h1`, `.layout-container`）
4. **Dark Mode Automation** - CSS Variables 負責切換，React 無感知
5. **CVA for Variants** - 複雜元件才用 CVA，簡單樣式用 utilities

### 檔案清單

- ✅ `src/styles/globals.css` - 所有設計 Token 與 Utilities 的真實源頭
- ✅ `src/components/Button.tsx` - 實用的 CVA 元件範例
- ✅ `src/components/Card.tsx` - Compound Component 範例
- ✅ `src/lib/cn.ts` - Class 合併工具
- ✅ `src/lib/design-tokens.ts` - Token 參考（可選）

### 下一步

1. 檢視現有元件（MenuScreen, GameScreen）
2. 用新的 Typography utilities 替換硬寫的樣式
3. 用 Layout utilities 簡化佈局 JSX
4. 確保所有色彩都使用 CSS Variables

---

**設計系統即服務 (DX First)** - 不是追求完美，而是追求團隊效率。
