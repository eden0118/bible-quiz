/**
 * 聖經卡片資料模塊
 *
 * 結構：
 * - Testament: 經文分類 (舊約 | 新約)
 * - BibleCardContent: 單張卡片內容
 * - BibleCard: 完整卡片資料 (ID、分類、答案、內容)
 * - bibleCards: 所有卡片資料集合
 *
 */

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
  // ==========================================
  // 舊約 (Old Testament) - 智慧、情感與引導
  // ==========================================
  {
    id: 1,
    testament: 'old',
    answer: 2,
    content: {
      verse: '耶和華不像人看人：人是看外貌，耶和華是看內心。',
      question: '當我們過度在意別人的眼光或外表焦慮時，這節經文提醒我們神最看重什麼？',
      options: ['學歷', '財富', '內心', '才華'],
      reference: '撒母耳記上 16:7',
    },
  },
  {
    id: 2,
    testament: 'old',
    answer: 0,
    content: {
      verse: '凡事都有定期，天下萬務都有定時。生有時，死有時；栽種有時，拔出所栽種的也有時。',
      question: '當我們覺得人生停滯不前或因等待而焦急時，傳道書教導我們什麼智慧？',
      options: ['相信神有祂的時間表', '一定要立刻看到結果', '人生充滿了混亂', '我們應該放棄努力'],
      reference: '傳道書 3:1-2',
    },
  },
  {
    id: 3,
    testament: 'old',
    answer: 1,
    content: {
      verse: '你要保守你心，勝過保守一切，因為一生的果效是由心發出。',
      question: '這節經文提醒我們，影響我們人生方向最關鍵的核心是什麼？',
      options: ['銀行存款', '我們的心思意念', '外在的環境', '結交的朋友'],
      reference: '箴言 4:23',
    },
  },
  {
    id: 4,
    testament: 'old',
    answer: 3,
    content: {
      verse: '人心籌算自己的道路；惟耶和華指引他的腳步。',
      question: '關於人生規劃，這句箴言給了我們什麼現實的觀點？',
      options: [
        '人不需要做計畫',
        '計畫永遠趕不上變化',
        '靠自己就能掌控一切',
        '人負責計畫，但神掌管方向',
      ],
      reference: '箴言 16:9',
    },
  },
  {
    id: 5,
    testament: 'old',
    answer: 0,
    content: {
      verse: '耶和華靠近傷心的人，拯救靈性痛悔的人。',
      question: '當我們心碎、情緒低落時，神的位置在哪裡？',
      options: ['祂靠近我們', '祂遠離我們', '祂責備我們', '祂不關心我們'],
      reference: '詩篇 34:18',
    },
  },
  {
    id: 6,
    testament: 'old',
    answer: 2,
    content: {
      verse:
        '世人哪，耶和華已指示你何為善。他向你所要的是什麼呢？只要你行公義，好憐憫，存謙卑的心，與你的神同行。',
      question: '這節經文總結了神對我們生活的期待，不包括以下哪一項？',
      options: ['行公義', '好憐憫', '賺大錢', '存謙卑的心'],
      reference: '彌迦書 6:8',
    },
  },
  {
    id: 7,
    testament: 'old',
    answer: 1,
    content: {
      verse: '從前你們的意思是要害我，但神的意思原是好的，要保全許多人的性命。',
      question: '約瑟在被哥哥們出賣多年後重逢時說了這話，這展現了什麼態度？',
      options: ['君子報仇十年不晚', '用神的視角看苦難並饒恕', '無可奈何的接受', '為了利益而妥協'],
      reference: '創世記 50:20',
    },
  },
  {
    id: 8,
    testament: 'old',
    answer: 0,
    content: {
      verse: '你們要休息，要知道我是神！',
      question: '在忙碌混亂的世界中，詩篇建議我們如何重新得力？',
      options: ['安靜下來仰望神', '更努力工作', '大聲抱怨', '尋求人的幫助'],
      reference: '詩篇 46:10',
    },
  },
  {
    id: 9,
    testament: 'old',
    answer: 3,
    content: {
      verse: '我要向山舉目；我的幫助從何而來？我的幫助從造天地的耶和華而來。',
      question: '當我們感到孤立無援時，詩人提醒我們真正的幫助源頭是？',
      options: ['高山', '自己的智慧', '有勢力的朋友', '造天地的神'],
      reference: '詩篇 121:1-2',
    },
  },
  {
    id: 10,
    testament: 'old',
    answer: 1,
    content: {
      verse: '鐵磨鐵，磨出刃來；朋友相感也是如此。',
      question: '這句箴言如何描述朋友之間互相切磋成長的關係？',
      options: ['互相傷害', '互相砥礪使彼此更進步', '互相利用', '保持距離以策安全'],
      reference: '箴言 27:17',
    },
  },
  {
    id: 11,
    testament: 'old',
    answer: 2,
    content: {
      verse: '每早晨，這都是新的；你的誠實極其廣大！',
      question: '面對昨天的失敗，這節經文給了我們什麼盼望？',
      options: [
        '失敗是無法挽回的',
        '我們要為過去懊悔',
        '神的憐憫每天早晨都是新的',
        '時間會沖淡一切',
      ],
      reference: '耶利米哀歌 3:23',
    },
  },
  {
    id: 12,
    testament: 'old',
    answer: 0,
    content: {
      verse: '神就照著自己的形像造人，乃是照著他的形像造男造女。',
      question: '關於人類的自我價值，創世記告訴我們最根源的身份是什麼？',
      options: ['我們擁有神的形像', '我們是進化的產物', '我們是工作的工具', '我們是宇宙的塵埃'],
      reference: '創世記 1:27',
    },
  },
  {
    id: 13,
    testament: 'old',
    answer: 3,
    content: {
      verse: '婦人焉能忘記她吃奶的嬰孩...即或有忘記的，我卻不忘記你。',
      question: '神用什麼比喻來形容祂對我們不離不棄的愛？',
      options: ['君王對臣民', '牧人對羊', '朋友對朋友', '母親對嬰孩'],
      reference: '以賽亞書 49:15',
    },
  },
  {
    id: 14,
    testament: 'old',
    answer: 1,
    content: {
      verse: '我將你的話藏在心裡，免得我得罪你。',
      question: '詩人說如何能避免走偏或犯錯？',
      options: ['靠強大的意志力', '將神的話語記在心裡', '遠離人群', '不斷自我懲罰'],
      reference: '詩篇 119:11',
    },
  },
  {
    id: 15,
    testament: 'old',
    answer: 2,
    content: {
      verse: '兩個人總比一個人好，因為二人勞碌同得美好的果效。',
      question: '傳道書如何看待團隊合作或同伴的重要性？',
      options: [
        '一個人比較有效率',
        '人多口雜很麻煩',
        '兩個人互相扶持比單打獨鬥好',
        '要小心被同伴拖累',
      ],
      reference: '傳道書 4:9',
    },
  },

  // ==========================================
  // 新約 (New Testament) - 救恩、愛與生活
  // ==========================================
  {
    id: 16,
    testament: 'new',
    answer: 0,
    content: {
      verse: '凡勞苦擔重擔的人可以到我這裡來，我就使你們得安息。',
      question: '耶穌給那些生活壓力大、感到疲憊的人什麼邀請？',
      options: ['到祂這裡來得安息', '要更努力修行', '要忍受痛苦', '要靠自己解決'],
      reference: '馬太福音 11:28',
    },
  },
  {
    id: 17,
    testament: 'new',
    answer: 1,
    content: {
      verse: '應當一無掛慮，只要凡事藉著禱告、祈求和感謝，將你們所要的告訴神。',
      question: '面對焦慮，保羅提出的解方是什麼？',
      options: ['忽視它', '帶著感謝向神禱告', '找人發洩情緒', '擔心到問題解決為止'],
      reference: '腓立比書 4:6',
    },
  },
  {
    id: 18,
    testament: 'new',
    answer: 2,
    content: {
      verse: '愛是恆久忍耐，又有恩慈...愛是永不止息。',
      question: '這段著名的「愛的真諦」經文出自哪裡？',
      options: ['羅馬書', '約翰福音', '哥林多前書 13章', '啟示錄'],
      reference: '哥林多前書 13:4-8',
    },
  },
  {
    id: 19,
    testament: 'new',
    answer: 3,
    content: {
      verse: '我們曉得萬事都互相效力，叫愛神的人得益處。',
      question: '這節經文給在困境中的人什麼盼望？',
      options: [
        '所有事情都是好事',
        '壞事不會發生',
        '我們不需要做任何事',
        '神能讓好壞事交織，最終帶來益處',
      ],
      reference: '羅馬書 8:28',
    },
  },
  {
    id: 20,
    testament: 'new',
    answer: 0,
    content: {
      verse: '快快地聽，慢慢地說，慢慢地動怒。',
      question: '雅各書教導我們在溝通時應有的態度是什麼？',
      options: ['多聽少說，控制脾氣', '據理力爭，寸步不讓', '保持沈默，拒絕溝通', '先發制人'],
      reference: '雅各書 1:19',
    },
  },
  {
    id: 21,
    testament: 'new',
    answer: 1,
    content: {
      verse: '人若賺得全世界，賠上自己的生命，有什麼益處呢？',
      question: '耶穌提醒我們什麼比物質財富更重要？',
      options: ['名聲', '生命（靈魂）', '權力', '才華'],
      reference: '馬太福音 16:26',
    },
  },
  {
    id: 22,
    testament: 'new',
    answer: 2,
    content: {
      verse: '若有人在基督裡，他就是新造的人，舊事已過，都變成新的了。',
      question: '這節經文描述了信仰帶來的什麼改變？',
      options: ['改名換姓', '居住地的改變', '生命本質的更新', '外表的改變'],
      reference: '哥林多後書 5:17',
    },
  },
  {
    id: 23,
    testament: 'new',
    answer: 3,
    content: {
      verse: '我靠著那加給我力量的，凡事都能做。',
      question: '保羅自信的來源是什麼？',
      options: ['他受過高等教育', '他意志力堅強', '他朋友很多', '基督加給他的力量'],
      reference: '腓立比書 4:13',
    },
  },
  {
    id: 24,
    testament: 'new',
    answer: 0,
    content: {
      verse: '你們願意人怎樣待你們，你們也要怎樣待人。',
      question: '這就是著名的「黃金律」，它教導我們的人際原則是？',
      options: ['推己及人（換位思考）', '以眼還眼', '先保護自己', '利益交換'],
      reference: '馬太福音 7:12',
    },
  },
  {
    id: 25,
    testament: 'new',
    answer: 1,
    content: {
      verse: '神賜給我們，不是膽怯的心，乃是剛強、仁愛、謹守的心。',
      question: '當我們感到害怕懦弱時，這節經文說神賜給我們什麼力量？',
      options: ['逃避的力量', '剛強、仁愛、謹守的心', '報復的心', '冷漠的心'],
      reference: '提摩太後書 1:7',
    },
  },
  {
    id: 26,
    testament: 'new',
    answer: 2,
    content: {
      verse: '我們若認自己的罪，神是信實的，是公義的，必要赦免我們的罪。',
      question: '恢復與神關係的關鍵一步是什麼？',
      options: ['做更多好事', '懲罰自己', '誠實認罪', '指責別人'],
      reference: '約翰一書 1:9',
    },
  },
  {
    id: 27,
    testament: 'new',
    answer: 0,
    content: {
      verse: '喜樂的人，神愛他；捐得樂意的人，是神所喜愛的。',
      question: '關於奉獻或給予，神看重的是什麼？',
      options: ['甘心樂意的態度', '金額的大小', '別人的掌聲', '交換利益'],
      reference: '哥林多後書 9:7',
    },
  },
  {
    id: 28,
    testament: 'new',
    answer: 1,
    content: {
      verse: '你們要先求他的國和他的義，這些東西都要加給你們了。',
      question: '耶穌教導我們生活的優先次序是？',
      options: ['先賺錢再說', '先求神的心意', '先滿足家人的期待', '先追求享樂'],
      reference: '馬太福音 6:33',
    },
  },
  {
    id: 29,
    testament: 'new',
    answer: 3,
    content: {
      verse: '不可叫人小看你年輕，總要在言語、行為、愛心、信心、清潔上，都作信徒的榜樣。',
      question: '保羅勉勵年輕的提摩太要如何贏得尊重？',
      options: ['穿著成熟', '說話大聲', '爭取職位', '在品格行為上作榜樣'],
      reference: '提摩太前書 4:12',
    },
  },
  {
    id: 30,
    testament: 'new',
    answer: 2,
    content: {
      verse: '神愛世人，甚至將他的獨生子賜給他們...。',
      question: '這節被稱為「縮影的福音」，核心信息是什麼？',
      options: ['神會懲罰世人', '我們要努力修行', '神愛世人並賜下救恩', '世人都是無辜的'],
      reference: '約翰福音 3:16',
    },
  },
];
