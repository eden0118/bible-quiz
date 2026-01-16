/**
 * 國際化翻譯物件
 *
 * 結構：
 * - title: 應用標題和資訊
 * - menu: 菜單畫面文字
 * - game: 遊戲畫面文字
 * - finished: 結束畫面文字
 * - leaderboard: 排行榜相關文字
 * - common: 通用文字
 *
 * 日後擴展多語言時，可複製此物件並翻譯相應文字
 */
export const translations = {
  title: {
    main: 'BIBLE WISDOM',
    sub: '聖經內容還記得多少？快來挑戰吧！',
    resources: 'December 2025',
  },
  menu: {
    nameLabel: '挑戰者',
    namePlaceholder: '輸入你的名字...',
    modeLabel: '選擇範圍',
    modes: {
      old: '舊約',
      new: '新約',
      all: '全部',
    },
    startBtn: '開始挑戰',
    startBtnDisabled: '請輸入名字',
  },
  game: {
    progress: '進度',
    score: '分數',
    answer: '正確答案',
    option: (letter: string) => `${letter}.`,
    nextBtn: '下一題',
    finishBtn: '完成',
    pleaseAnswer: '請選擇答案',
    backBtn: '離開',
    testaments: {
      old: '舊約',
      new: '新約',
      all: '全部',
    },
  },
  finished: {
    title: '挑戰完成',
    subtitle: (emoji: string) => `${emoji} 挑戰完成`,
    score: '分數',
    answers: '答題數',
    accuracy: '正確率',
    questions: '題數',
    backBtn: '返回首頁',
  },
  leaderboard: {
    title: '🏆 排行榜 TOP 5',
    loading: '加載中...',
    empty: '暫無排行',
    rank: (index: number) => index + 1,
    gameMode: (mode: string) => mode,
    date: (dateString: string) => {
      if (!dateString) return '無日期';
      try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return '無日期';

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${year}.${month}.${day} ${hours}:${minutes}`;
      } catch (error) {
        console.error('日期格式化失敗:', dateString, error);
        return '無日期';
      }
    },
  },
  common: {
    ok: '確定',
    cancel: '取消',
    confirm: '確認',
  },
};
