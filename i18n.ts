export type Language = 'zh' | 'en';

export const translations = {
  zh: {
    title: {
      line1: '聖經',
      line2: '智慧卡片',
      sub: '翻卡學習 • 趣味挑戰',
      resources: '2025年 7月'
    },
    menu: {
      nameLabel: '玩家名字',
      namePlaceholder: '請輸入名字...',
      modeLabel: '選擇範圍',
      modes: {
        old: '舊約',
        new: '新約',
        all: '全部'
      },
      startBtn: '開始挑戰',
      footer: '聖經資源 2025'
    },
    game: {
      progress: '進度',
      score: '分數',
      testaments: {
        old: '舊約',
        new: '新約'
      },
      answer: '正確答案',
      timeBonus: '時間獎勵'
    },
    finish: {
      thankYou: '謝謝',
      sub: '參與挑戰！',
      message: '挑戰完成',
      totalScore: '總分',
      leaderboard: '排行榜',
      emptyLeaderboard: '還沒有紀錄，你是第一個！',
      backBtn: '返回主選單'
    }
  },
  en: {
    title: {
      line1: 'Bible',
      line2: 'Wisdom',
      sub: 'Flashcards & Quiz',
      resources: 'JULY 2025'
    },
    menu: {
      nameLabel: 'Player Name',
      namePlaceholder: 'Enter your name',
      modeLabel: 'Select Mode',
      modes: {
        old: 'Old',
        new: 'New',
        all: 'All'
      },
      startBtn: 'Start Game',
      footer: 'DESIGN RESOURCES 2025'
    },
    game: {
      progress: 'Progress',
      score: 'Score',
      testaments: {
        old: 'Old Testament',
        new: 'New Testament'
      },
      answer: 'Answer',
      timeBonus: 'Time Bonus'
    },
    finish: {
      thankYou: 'Thank',
      sub: 'You!',
      message: 'Challenge Complete',
      totalScore: 'Total Score',
      leaderboard: 'Leaderboard',
      emptyLeaderboard: 'No records yet, be the first!',
      backBtn: 'Back to Menu'
    }
  }
};
