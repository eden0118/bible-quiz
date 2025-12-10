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
  content: {
    zh: BibleCardContent;
    en: BibleCardContent;
  };
}

export const bibleCards: BibleCard[] = [
  {
    id: 1,
    testament: 'new',
    answer: 0,
    content: {
      zh: {
        verse: "神愛世人，甚至將他的獨生子賜給他們，叫一切信他的，不至滅亡，反得永生。",
        question: "這節經文出自哪裡？",
        options: ["約翰福音 3:16", "馬太福音 5:3", "詩篇 23:1", "羅馬書 8:28"],
        reference: "約翰福音 3:16"
      },
      en: {
        verse: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
        question: "Where is this verse found?",
        options: ["John 3:16", "Matthew 5:3", "Psalm 23:1", "Romans 8:28"],
        reference: "John 3:16"
      }
    }
  },
  {
    id: 2,
    testament: 'old',
    answer: 1,
    content: {
      zh: {
        verse: "耶和華是我的牧者，我必不致缺乏。",
        question: "這是大衛寫的詩，出自哪篇？",
        options: ["詩篇 1:1", "詩篇 23:1", "詩篇 119:105", "詩篇 91:1"],
        reference: "詩篇 23:1"
      },
      en: {
        verse: "The Lord is my shepherd, I lack nothing.",
        question: "This is a Psalm of David, which one?",
        options: ["Psalm 1:1", "Psalm 23:1", "Psalm 119:105", "Psalm 91:1"],
        reference: "Psalm 23:1"
      }
    }
  },
  {
    id: 3,
    testament: 'old',
    answer: 3,
    content: {
      zh: {
        verse: "起初，神創造天地。",
        question: "這是聖經的第一句話，位於？",
        options: ["約翰福音 1:1", "出埃及記 1:1", "啟示錄 1:1", "創世記 1:1"],
        reference: "創世記 1:1"
      },
      en: {
        verse: "In the beginning God created the heavens and the earth.",
        question: "This is the first verse of the Bible, found in?",
        options: ["John 1:1", "Exodus 1:1", "Revelation 1:1", "Genesis 1:1"],
        reference: "Genesis 1:1"
      }
    }
  },
  {
    id: 4,
    testament: 'new',
    answer: 1,
    content: {
      zh: {
        verse: "我靠著那加給我力量的，凡事都能做。",
        question: "保羅在監獄中寫下的這句話出自？",
        options: ["以弗所書 2:8", "腓立比書 4:13", "加拉太書 2:20", "歌羅西書 3:23"],
        reference: "腓立比書 4:13"
      },
      en: {
        verse: "I can do all this through him who gives me strength.",
        question: "Paul wrote this from prison, found in?",
        options: ["Ephesians 2:8", "Philippians 4:13", "Galatians 2:20", "Colossians 3:23"],
        reference: "Philippians 4:13"
      }
    }
  },
  {
    id: 5,
    testament: 'new',
    answer: 0,
    content: {
      zh: {
        verse: "我們曉得萬事都互相效力，叫愛神的人得益處，就是按他旨意被召的人。",
        question: "這節經文常被用來安慰信徒，出自？",
        options: ["羅馬書 8:28", "哥林多前書 10:13", "雅各書 1:2", "彼得前書 5:7"],
        reference: "羅馬書 8:28"
      },
      en: {
        verse: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
        question: "Often used to comfort believers, this is from?",
        options: ["Romans 8:28", "1 Corinthians 10:13", "James 1:2", "1 Peter 5:7"],
        reference: "Romans 8:28"
      }
    }
  },
  {
    id: 6,
    testament: 'old',
    answer: 1,
    content: {
      zh: {
        verse: "你要專心仰賴耶和華，不可倚靠自己的聰明，在你一切所行的事上都要認定他，他必指引你的路。",
        question: "這句智慧的箴言出自？",
        options: ["傳道書 3:1", "箴言 3:5-6", "約伯記 42:2", "詩篇 37:5"],
        reference: "箴言 3:5-6"
      },
      en: {
        verse: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
        question: "This proverb of wisdom is from?",
        options: ["Ecclesiastes 3:1", "Proverbs 3:5-6", "Job 42:2", "Psalm 37:5"],
        reference: "Proverbs 3:5-6"
      }
    }
  },
  {
    id: 7,
    testament: 'new',
    answer: 1,
    content: {
      zh: {
        verse: "愛是恆久忍耐，又有恩慈；愛是不嫉妒；愛是不自誇，不張狂。",
        question: "這段著名的「愛篇」出自？",
        options: ["約翰一書 4:8", "哥林多前書 13:4", "馬可福音 12:30", "雅歌 8:7"],
        reference: "哥林多前書 13:4"
      },
      en: {
        verse: "Love is patient, love is kind. It does not envy, it does not boast, it is not proud.",
        question: "This famous 'Love Chapter' passage is from?",
        options: ["1 John 4:8", "1 Corinthians 13:4", "Mark 12:30", "Song of Solomon 8:7"],
        reference: "1 Corinthians 13:4"
      }
    }
  },
  {
    id: 8,
    testament: 'new',
    answer: 0,
    content: {
      zh: {
        verse: "聖靈所結的果子，就是仁愛、喜樂、和平、忍耐、恩慈、良善、信實、溫柔、節制。",
        question: "這段關於聖靈果子的經文出自？",
        options: ["加拉太書 5:22-23", "以弗所書 5:9", "歌羅西書 3:12", "羅馬書 12:2"],
        reference: "加拉太書 5:22-23"
      },
      en: {
        verse: "But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness and self-control.",
        question: "This passage about the Fruit of the Spirit is from?",
        options: ["Galatians 5:22-23", "Ephesians 5:9", "Colossians 3:12", "Romans 12:2"],
        reference: "Galatians 5:22-23"
      }
    }
  },
  {
    id: 9,
    testament: 'old',
    answer: 2,
    content: {
      zh: {
        verse: "世人哪，耶和華已指示你何為善。他向你所要的是什麼呢？只要你行公義，好憐憫，存謙卑的心，與你的神同行。",
        question: "這段先知書的教導出自？",
        options: ["以賽亞書 6:8", "耶利米書 29:11", "彌迦書 6:8", "阿摩司書 5:24"],
        reference: "彌迦書 6:8"
      },
      en: {
        verse: "He has shown you, O mortal, what is good. And what does the Lord require of you? To act justly and to love mercy and to walk humbly with your God.",
        question: "This teaching from the Prophets is found in?",
        options: ["Isaiah 6:8", "Jeremiah 29:11", "Micah 6:8", "Amos 5:24"],
        reference: "Micah 6:8"
      }
    }
  },
  {
    id: 10,
    testament: 'new',
    answer: 1,
    content: {
      zh: {
        verse: "你們要先求他的國和他的義，這些東西都要加給你們了。",
        question: "耶穌在登山寶訓中的教導，出自？",
        options: ["路加福音 10:27", "馬太福音 6:33", "馬可福音 8:36", "約翰福音 14:6"],
        reference: "馬太福音 6:33"
      },
      en: {
        verse: "But seek first his kingdom and his righteousness, and all these things will be given to you as well.",
        question: "Jesus' teaching in the Sermon on the Mount, found in?",
        options: ["Luke 10:27", "Matthew 6:33", "Mark 8:36", "John 14:6"],
        reference: "Matthew 6:33"
      }
    }
  }
];
