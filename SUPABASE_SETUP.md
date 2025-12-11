# Supabase 設置指南

## 1. 創建 Supabase 項目

1. 訪問 [Supabase 官網](https://supabase.com)
2. 點擊 "Create a new project"
3. 填寫項目名稱、密碼等信息
4. 等待項目創建完成

## 2. 創建數據庫表

在 Supabase SQL 編輯器中執行以下 SQL：

```sql
-- 創建遊戲記錄表
CREATE TABLE game_records (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  player_name VARCHAR(255) NOT NULL,
  score INT NOT NULL,
  quiz_time INT NOT NULL,
  game_mode VARCHAR(50) NOT NULL,
  correct_count INT NOT NULL,
  total_questions INT NOT NULL,
  accuracy DECIMAL(5, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 添加索引以提高查詢性能
CREATE INDEX idx_player_name ON game_records(player_name);
CREATE INDEX idx_score ON game_records(score DESC);
CREATE INDEX idx_created_at ON game_records(created_at DESC);
```

## 3. 配置環境變數

1. 複製 `.env.local.example` 並重命名為 `.env.local`
2. 從 Supabase 項目設置頁面複製 API 鑰匙：
   - 項目 URL → `VITE_SUPABASE_URL`
   - Anon Key → `VITE_SUPABASE_ANON_KEY`

## 4. 設置行級安全策略 (可選)

在 Supabase 中設置 RLS 以保護數據：

```sql
-- 啟用 RLS
ALTER TABLE game_records ENABLE ROW LEVEL SECURITY;

-- 允許所有用戶讀取記錄
CREATE POLICY "Allow read access"
  ON game_records
  FOR SELECT
  USING (true);

-- 允許所有用戶插入記錄
CREATE POLICY "Allow insert access"
  ON game_records
  FOR INSERT
  WITH CHECK (true);
```

## 5. 測試連接

啟動應用並完成一局遊戲。檢查：

- 瀏覽器控制台是否顯示 "✅ 遊戲記錄已上傳到 Supabase"
- Supabase 數據庫中是否出現新記錄

## 數據結構

| 欄位名          | 類型      | 說明                   |
| --------------- | --------- | ---------------------- |
| id              | UUID      | 記錄唯一 ID            |
| player_name     | VARCHAR   | 玩家名稱               |
| score           | INT       | 最終分數               |
| quiz_time       | INT       | 測驗時間 (秒)          |
| game_mode       | VARCHAR   | 遊戲模式 (all/old/new) |
| correct_count   | INT       | 答對題數               |
| total_questions | INT       | 總題數                 |
| accuracy        | DECIMAL   | 準確率 (%)             |
| created_at      | TIMESTAMP | 創建時間               |
