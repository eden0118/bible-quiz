export type Testament = 'old' | 'new';

export interface BibleCardContent {
  verse: string;
  question: string;
  options: string[];
  reference: string;
}

export interface BibleCard {
  id: number;
  testament: Testament;
  answer: number; // Index of the correct option
  content: BibleCardContent;
}

export const bibleCards: BibleCard[] = [
  {
    id: 1,
    testament: 'new',
    answer: 0,
    content: {
      verse: '神愛世人，甚至將他的獨生子賜給他們，叫一切信他的，不至滅亡，反得永生。',
      question: '這節經文出自哪裡？',
      options: ['約翰福音 3:16', '馬太福音 5:3', '詩篇 23:1', '羅馬書 8:28'],
      reference: '約翰福音 3:16',
    },
  },
  {
    id: 2,
    testament: 'new',
    answer: 1,
    content: {
      verse: '所以，你們無論做什麼，或說什麼，都要奉主耶穌的名，藉著他感謝父神。',
      question: '這句話強調了什麼？',
      options: ['要常常禱告', '凡事要奉耶穌的名感謝父神', '要謙虛受教', '要互相幫助'],
      reference: '歌羅西書 3:17',
    },
  },
  {
    id: 3,
    testament: 'old',
    answer: 2,
    content: {
      verse: '耶和華是我的牧者，我必不至缺乏。',
      question: '詩篇23篇的開頭描述了什麼？',
      options: ['神的憤怒', '神如牧者照顧我們', '人生的苦難', '信仰的疑惑'],
      reference: '詩篇 23:1',
    },
  },
  {
    id: 4,
    testament: 'new',
    answer: 0,
    content: {
      verse:
        '我將這些事告訴你們，是叫你們在我裡面有平安。在世上你們有苦難，但你們可以放心，我已經勝了世界。',
      question: '耶穌在這段話中給了什麼應許？',
      options: ['平安和勝利', '健康和長壽', '財富和榮耀', '權力和影響力'],
      reference: '約翰福音 16:33',
    },
  },
  {
    id: 5,
    testament: 'old',
    answer: 3,
    content: {
      verse: '惟喜愛耶和華的律法，晝夜思想，這人便為有福。',
      question: '詩篇1篇描述了誰是有福的？',
      options: ['富有的人', '聰明的人', '健康的人', '喜愛神律法並晝夜思想的人'],
      reference: '詩篇 1:2',
    },
  },
  {
    id: 6,
    testament: 'new',
    answer: 1,
    content: {
      verse: '愛是恆久忍耐，又有恩慈；愛是不嫉妒；愛是不自誇；不張狂。',
      question: '這段經文描述的愛有什麼特質？',
      options: ['是感性的', '是忍耐和充滿恩慈的', '是強大的', '是快樂的'],
      reference: '哥林多前書 13:4',
    },
  },
  {
    id: 7,
    testament: 'old',
    answer: 0,
    content: {
      verse: '我們生下來赤身露體，將來也必如此；凡我們所有的，都是耶和華所賜的。',
      question: '約伯記提醒我們什麼？',
      options: ['我們所有的都是神所賜的', '生活是不公平的', '應該積累財富', '我們應該為自己驕傲'],
      reference: '約伯記 1:21',
    },
  },
  {
    id: 8,
    testament: 'new',
    answer: 2,
    content: {
      verse: '我靠著那加給我力量的，凡事都能做。',
      question: '保羅在這裡說靠什麼能做凡事？',
      options: ['靠自己的努力', '靠他人的幫助', '靠基督加給的力量', '靠運氣'],
      reference: '腓立比書 4:13',
    },
  },
  {
    id: 9,
    testament: 'old',
    answer: 3,
    content: {
      verse: '你要盡心、盡性、盡力、盡意愛主你的神；其次，也相倣，要愛人如己。',
      question: '律法中最重要的兩條誡命是什麼？',
      options: [
        '不可殺人和不可偷盜',
        '要守安息日和獻祭',
        '盡心愛主，愛人如己',
        '要孝敬父母和不可作假見證',
      ],
      reference: '路加福音 10:27',
    },
  },
  {
    id: 10,
    testament: 'new',
    answer: 0,
    content: {
      verse: '但那等候耶和華的必重獲力量，他們必如鷹展翅上騰，奔跑而不困倦，行走而不疲乏。',
      question: '這段經文告訴我們什麼？',
      options: ['等候神的人必重獲力量', '我們應該不斷奔跑', '鷹是神的象徵', '疲乏是軟弱的表現'],
      reference: '以賽亞書 40:31',
    },
  },
];
