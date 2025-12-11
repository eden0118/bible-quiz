/**
 * 國際化翻譯物件
 *
 * 結構：
 * - title: 應用標題和資源資訊
 * - menu: 菜單畫面文字
 * - game: 遊戲畫面文字
 * - finished: 結束畫面文字
 *
 * 日後擴展多語言時，可複製此物件並翻譯相應文字
 */
export const translations = {
  title: {
    sub: '聖經內容還記得多少？快來挑戰吧！',
    resources: 'December 2025',
  },
  menu: {
    nameLabel: '挑戰者',
    modeLabel: '選擇範圍',
    modes: {
      old: '舊約',
      new: '新約',
      all: '全部',
    },
    startBtn: '開始挑戰',
  },
  game: {
    progress: '進度',
    score: '分數',
    testaments: {
      old: '舊約',
      new: '新約',
    },
    answer: '正確答案',
  },
  finished: {
    title: '挑戰完成',
    score: '分數',
    answers: '答題數',
    accuracy: '正確率',
    questions: '題數',
    backBtn: '返回首頁',
  },
};
