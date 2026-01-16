/**
 * 聖經卡片資料模塊
 * * 修改重點：推廣讀經運動
 * 1. 題目強調「回到聖經原文」的重要性。
 * 2. 凸顯神的話語是解決生活問題（焦慮、人際、方向）的說明書。
 * 3. 增加對「經文上下文」的好奇心引導。
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
  // 舊約 (Old Testament) - 挖掘聖經中的寶藏
  // ==========================================
  {
    id: 1,
    testament: 'old',
    answer: 2,
    content: {
      verse: '耶和華不像人看人：人是看外貌，耶和華是看內心。',
      question:
        '這段故事提醒我們讀經不要只看表面。當時耶西把所有兒子都叫來了，唯獨忘了誰，神卻偏偏選中他？',
      options: ['高大的以利押', '聰明的所羅門', '被父親忽略的大衛', '強壯的參孫'],
      reference: '撒母耳記上 16:7', // 16:11 提到大衛被遺忘
    },
  },
  {
    id: 2,
    testament: 'old',
    answer: 0,
    content: {
      verse: '凡事都有定期，天下萬務都有定時。',
      question:
        '當我們讀這卷書時，會發現作者不斷強調「日光之下」的虛空，是為了引導我們去尋找哪裡的滿足？',
      options: ['日光之上的神', '更多的財富', '更長的壽命', '更多的學問'],
      reference: '傳道書 3:1',
    },
  },
  {
    id: 3,
    testament: 'old',
    answer: 1,
    content: {
      verse: '你要保守你心，勝過保守一切，因為一生的果效是由心發出。',
      question:
        '這節經文告訴我們，如果不藉著神的話語來「保守」我們的心，人生最容易出問題的是什麼？',
      options: ['身體健康', '人生的方向與結果', '銀行存款', '人際關係'],
      reference: '箴言 4:23',
    },
  },
  {
    id: 4,
    testament: 'old',
    answer: 3,
    content: {
      verse: '你的話是我腳前的燈，是我路上的光。',
      question: '這節著名的經文形容神的話語（聖經）在我們人生中扮演什麼角色？',
      options: [
        '一本歷史教科書',
        '裝飾用的藝術品',
        '讓人頭痛的法律條文',
        '在黑暗與未知中，指引每一步方向的亮光',
      ],
      reference: '詩篇 119:105',
    },
  },
  {
    id: 5,
    testament: 'old',
    answer: 2,
    content: {
      verse: '耶和華靠近傷心的人，拯救靈性痛悔的人。',
      question:
        '許多人在痛苦時不願讀經，以為神會責備。但這節經文顯示，當我們心碎時，神的第一個反應是？',
      options: ['要求我們反省', '離我們遠去', '靠近並拯救我們', '測試我們的信心'],
      reference: '詩篇 34:18',
    },
  },
  {
    id: 6,
    testament: 'old',
    answer: 1,
    content: {
      verse: '世人哪，耶和華已指示你何為善...只要你行公義，好憐憫，存謙卑的心，與你的神同行。',
      question: '讀先知書會讓我們明白，神看重「我們與祂的關係（同行）」，勝過於什麼？',
      options: ['內心的誠實', '外在的宗教儀式與獻祭', '愛鄰舍的心', '照顧孤兒寡婦'],
      reference: '彌迦書 6:8',
    },
  },
  {
    id: 7,
    testament: 'old',
    answer: 3,
    content: {
      verse: '神的意思原是好的，要保全許多人的性命。',
      question:
        '如果沒有讀完約瑟整整13章的故事，我們就很難明白這句話的份量。這句話提醒我們在受苦時要堅持什麼？',
      options: ['堅持報復', '堅持放棄', '堅持靠自己', '堅持相信神有長遠且美好的劇本'],
      reference: '創世記 50:20',
    },
  },
  {
    id: 8,
    testament: 'old',
    answer: 0,
    content: {
      verse: '你們要休息，要知道我是神！',
      question: '在這忙碌的世代，這節經文邀請我們透過「讀經與默想」來達到什麼狀態？',
      options: ['停下自己的掙扎，承認神掌權', '睡更多的覺', '去度個假', '什麼都不做'],
      reference: '詩篇 46:10',
    },
  },
  {
    id: 9,
    testament: 'old',
    answer: 3,
    content: {
      verse: '這律法書不可離開你的口，總要晝夜思想，好使你謹守遵行...。',
      question: '神在約書亞接班面對巨大挑戰時，給他的唯一「成功秘訣」是什麼？',
      options: ['勤練武術', '多結交盟友', '儲備足夠糧食', '緊緊抓住神的話語（聖經）'],
      reference: '約書亞記 1:8',
    },
  },
  {
    id: 10,
    testament: 'old',
    answer: 1,
    content: {
      verse: '草必枯乾，花必凋殘，惟有我們神的話必永遠立定。',
      question: '這個世界瞬息萬變，這節經文鼓勵我們將生命投資在什麼事物上才最划算？',
      options: ['追求時尚潮流', '研讀並依靠神永恆的話語', '積攢地上的財寶', '追求名聲'],
      reference: '以賽亞書 40:8',
    },
  },
  {
    id: 11,
    testament: 'old',
    answer: 2,
    content: {
      verse: '每早晨，這都是新的；你的誠實極其廣大！',
      question:
        '這句話出自《耶利米哀歌》。若我們細讀這卷書，會發現這極大的盼望竟然是在什麼情況下寫出的？',
      options: ['國家繁榮時', '個人升遷時', '國家滅亡、極度痛苦時', '家庭團聚時'],
      reference: '耶利米哀歌 3:23',
    },
  },
  {
    id: 12,
    testament: 'old',
    answer: 0,
    content: {
      verse: '至於我和我家，我們必定事奉耶和華。',
      question: '約書亞在年老時，召聚百姓讀神的話並回顧歷史，是為了幫助他們做出什麼決定？',
      options: ['堅定跟隨神的決心', '分配土地', '選出新的領袖', '制定法律'],
      reference: '約書亞記 24:15',
    },
  },
  {
    id: 13,
    testament: 'old',
    answer: 2,
    content: {
      verse: '人活著不是單靠食物，乃是靠耶和華口裡所出的一切話。',
      question: '耶穌在曠野受試探時引用了這句申命記的話，這告訴我們靈命的糧食是什麼？',
      options: ['神蹟奇事', '宗教活動', '神的話語', '律法規條'],
      reference: '申命記 8:3',
    },
  },
  {
    id: 14,
    testament: 'old',
    answer: 1,
    content: {
      verse: '我將你的話藏在心裡，免得我得罪你。',
      question: '這節經文提供了對抗罪惡最有效的方法，不是靠意志力，而是？',
      options: ['靠朋友監督', '熟讀並背誦神的話', '自我懲罰', '遠離人群'],
      reference: '詩篇 119:11',
    },
  },
  {
    id: 15,
    testament: 'old',
    answer: 2,
    content: {
      verse: '惟喜愛耶和華的律法，晝夜思想，這人便為有福！',
      question: '詩篇第一篇提到，一個愛讀神話語的人，他的生命會像什麼一樣充滿生機？',
      options: ['像一座高山', '像一隻獅子', '像一棵樹栽在溪水旁', '像一顆寶石'],
      reference: '詩篇 1:2-3',
    },
  },

  // ==========================================
  // 新約 (New Testament) - 經歷話語的大能
  // ==========================================
  {
    id: 16,
    testament: 'new',
    answer: 0,
    content: {
      verse: '凡勞苦擔重擔的人可以到我這裡來，我就使你們得安息。',
      question: '當我們覺得讀經很累時，耶穌提醒我們，其實來到祂面前（讀經禱告）真正的目的是什麼？',
      options: ['卸下重擔得享安息', '領受更多的工作', '學習更多的規矩', '接受嚴厲的審判'],
      reference: '馬太福音 11:28',
    },
  },
  {
    id: 17,
    testament: 'new',
    answer: 1,
    content: {
      verse: '應當一無掛慮，只要凡事藉著禱告...。',
      question: '這節經文是治療「焦慮」的良藥。保羅教導我們將憂慮轉化為什麼行動？',
      options: ['轉化為憤怒', '轉化為帶著感謝的禱告', '轉化為逃避', '轉化為抱怨'],
      reference: '腓立比書 4:6',
    },
  },
  {
    id: 18,
    testament: 'new',
    answer: 3,
    content: {
      verse: '愛是恆久忍耐，又有恩慈...。',
      question:
        '我們常在婚禮聽到這段經文，但若回到哥林多前書，會發現這段話原本是為了解決什麼問題？',
      options: ['夫妻吵架', '親子教育', '單身問題', '教會內部的紛爭與恩賜比較'],
      reference: '哥林多前書 13章',
    },
  },
  {
    id: 19,
    testament: 'new',
    answer: 2,
    content: {
      verse: '聖經都是神所默示的，於教訓、督責、使人歸正...都是有益的。',
      question: '這節經文清楚說明了我們「為什麼要讀聖經」？',
      options: [
        '為了通過考試',
        '為了顯得有學問',
        '為了讓屬神的人得以完全，預備行善',
        '為了用來定別人的罪',
      ],
      reference: '提摩太後書 3:16-17',
    },
  },
  {
    id: 20,
    testament: 'new',
    answer: 0,
    content: {
      verse: '快快地聽，慢慢地說，慢慢地動怒。',
      question: '雅各書這段話非常實用。當我們在人際溝通快要吵架時，神的話語建議我們怎麼做？',
      options: [
        '先停下來聽，不要急著生氣',
        '先大聲壓過對方',
        '立刻掉頭就走',
        '把心裡的話全部倒出來',
      ],
      reference: '雅各書 1:19',
    },
  },
  {
    id: 21,
    testament: 'new',
    answer: 1,
    content: {
      verse: '人若賺得全世界，賠上自己的生命，有什麼益處呢？',
      question: '在這個追求物質的世界，耶穌這句話幫助我們在做人生重大決定時，能夠衡量什麼？',
      options: ['投資的報酬率', '靈魂與永恆的價值', '別人的評價', '身體的健康'],
      reference: '馬太福音 16:26',
    },
  },
  {
    id: 22,
    testament: 'new',
    answer: 3,
    content: {
      verse: '神的道是活潑的，是有功效的，比一切兩刃的劍更快...。',
      question: '希伯來書形容神的話（聖經）像一把手術刀（劍），它能對我們產生什麼作用？',
      options: ['用來攻擊敵人', '用來防身', '用來裝飾', '剖開並辨明我們心中的思念與主意'],
      reference: '希伯來書 4:12',
    },
  },
  {
    id: 23,
    testament: 'new',
    answer: 2,
    content: {
      verse: '我靠著那加給我力量的，凡事都能做。',
      question: '我們常斷章取義這句話。保羅寫這句話的背景是在監獄裡，他在談論的是什麼能力？',
      options: [
        '賺大錢的能力',
        '考第一名的能力',
        '在任何環境（豐富或缺乏）都能知足的能力',
        '擊敗敵人的能力',
      ],
      reference: '腓立比書 4:13',
    },
  },
  {
    id: 24,
    testament: 'new',
    answer: 0,
    content: {
      verse: '你們願意人怎樣待你們，你們也要怎樣待人。',
      question:
        '這節經文被稱為「黃金律」。如果我們每天讀經並應用這句話，我們的人際關係會變成怎樣？',
      options: ['懂得主動去愛與同理別人', '變得斤斤計較', '只保護自己的利益', '等待別人先對我好'],
      reference: '馬太福音 7:12',
    },
  },
  {
    id: 25,
    testament: 'new',
    answer: 3,
    content: {
      verse: '不要效法這個世界，只要心意更新而變化...。',
      question: '我們為什麼需要持續讀經？保羅指出這是為了對抗世界的同化，並察驗什麼？',
      options: [
        '察驗誰是異端',
        '察驗未來的趨勢',
        '察驗別人的錯誤',
        '察驗神善良、純全、可喜悅的旨意',
      ],
      reference: '羅馬書 12:2',
    },
  },
  {
    id: 26,
    testament: 'new',
    answer: 1,
    content: {
      verse: '我們若認自己的罪，神是信實的，是公義的，必要赦免我們的罪。',
      question: '讀這節經文能給「充滿罪惡感」的人什麼確據？',
      options: [
        '神會嚴厲處罰',
        '只要誠實認罪，神保證赦免並洗淨',
        '我們需要做更多善事來彌補',
        '時間過了神就會忘記',
      ],
      reference: '約翰一書 1:9',
    },
  },
  {
    id: 27,
    testament: 'new',
    answer: 2,
    content: {
      verse: '戴上救恩的頭盔，拿著聖靈的寶劍，就是神的道。',
      question:
        '在屬靈的軍裝中，唯一的「攻擊性武器」是什麼？（這暗示我們遇到屬靈爭戰要用什麼反擊？）',
      options: ['信心的盾牌', '公義的護心鏡', '神的道（聖經話語）', '平安的福音鞋'],
      reference: '以弗所書 6:17',
    },
  },
  {
    id: 28,
    testament: 'new',
    answer: 1,
    content: {
      verse: '你們要先求他的國和他的義，這些東西都要加給你們了。',
      question: '當我們為生活所需（吃什麼、穿什麼）憂慮時，耶穌調整我們的優先次序應該是？',
      options: ['先努力存錢', '先追求神的心意與法則', '先建立人脈', '先滿足別人的期待'],
      reference: '馬太福音 6:33',
    },
  },
  {
    id: 29,
    testament: 'new',
    answer: 3,
    content: {
      verse: '聽道而不行道的，就像人對著鏡子看自己本來的面目，看見，走後，隨即忘了...。',
      question: '雅各用「照鏡子」比喻讀經。這提醒我們讀完聖經後，最關鍵的一步是什麼？',
      options: ['背誦下來', '分析原文', '寫成心得', '在生活中實際行出來'],
      reference: '雅各書 1:23-24',
    },
  },
  {
    id: 30,
    testament: 'new',
    answer: 2,
    content: {
      verse: '耶穌說：我就是道路、真理、生命；若不藉著我，沒有人能到父那裡去。',
      question: '這節經文總結了整本聖經的核心。我們讀經最終的目的，是為了找到誰？',
      options: ['找到心靈寄託', '找到道德規範', '找到通往父神的唯一道路—耶穌', '找到成功的秘訣'],
      reference: '約翰福音 14:6',
    },
  },
];
