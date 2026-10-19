import prisma from "@/lib/prisma";

export interface BilingualBullet {
  emoji: string;
  hindiLabel?: string;
  hindiText: string;
  englishLabel?: string;
  englishText: string;
}

export interface BilingualDocSection {
  pageNumber: number;
  emoji: string;
  titleHi: string;
  titleEn: string;
  subtitleHi: string;
  subtitleEn: string;
  introHi: string[];
  introEn: string[];
  initiativesHeadingHi: string;
  initiativesHeadingEn: string;
  bulletPoints: BilingualBullet[];
  highlightStatementHi?: string;
  highlightStatementEn?: string;
  quoteHi: string;
  quoteEn: string;
  subSection?: {
    headingHi: string;
    headingEn: string;
    textHi: string;
    textEn: string;
  };
  callToAction?: {
    headingHi: string;
    headingEn: string;
    textHi: string;
    textEn: string;
  };
}

export interface ProgramData {
  id: string;
  slug: string;
  title: string;
  hindiTitle?: string | null;
  category: string;
  icon: string;
  imageUrl: string;
  description: string;
  detailedContent: string;
  targetGroup: string;
  target?: string;
  location: string;
  objectives: string[];
  displayOrder?: number;
  bilingualDoc?: BilingualDocSection;
}

// -------------------------------------------------------------
// EXACT BILINGUAL CONTENT REFERENCE FROM PDF (PAGES 1 - 6)
// -------------------------------------------------------------

export const BILINGUAL_SOCIAL_WELFARE: BilingualDocSection = {
  pageNumber: 1,
  emoji: "🤝",
  titleHi: "Social Welfare (सामाजिक कल्याण)",
  titleEn: "Social Welfare",
  subtitleHi: "“सेवा केवल एक कार्य नहीं, बल्कि समाज के प्रति हमारी जिम्मेदारी है।”",
  subtitleEn: "“Service is not merely an action, but our shared responsibility towards society.”",
  introHi: [
    "Arogya Bandhan Foundation का उद्देश्य समाज के जरूरतमंद, वंचित और कमजोर वर्गों तक सहयोग और सहायता पहुँचाने की दिशा में निरंतर प्रयास करना है।",
    "हमारा विश्वास है कि समाज का विकास तभी संभव है जब हर व्यक्ति को सम्मान, अवसर और आवश्यक सहयोग मिले। इसी सोच के साथ हम शिक्षा, स्वास्थ्य, भोजन, महिला सशक्तिकरण, सामूहिक विवाह और अन्य सामाजिक कल्याण से जुड़ी पहलों को बढ़ावा देने का प्रयास करते हैं।",
  ],
  introEn: [
    "The mission of Arogya Bandhan Foundation is to make continuous, dedicated efforts toward extending support and humanitarian aid to the needy, marginalized, and vulnerable sections of society.",
    "We firmly believe that true societal progress is achievable only when every individual receives dignity, opportunities, and essential support. Guided by this conviction, we strive to advance initiatives across education, healthcare, nutrition, women empowerment, mass marriage, and other social welfare causes.",
  ],
  initiativesHeadingHi: "🌱 हमारी सामाजिक पहल",
  initiativesHeadingEn: "🌱 Our Social Initiatives",
  bulletPoints: [
    {
      emoji: "📚",
      hindiLabel: "Child Education",
      hindiText: "जरूरतमंद बच्चों को शिक्षा से जोड़ने और उनके भविष्य को बेहतर बनाने का प्रयास।",
      englishLabel: "Child Education",
      englishText: "Striving to connect underprivileged children with quality education and build a brighter future for them.",
    },
    {
      emoji: "🏥",
      hindiLabel: "Health Camps",
      hindiText: "स्वास्थ्य जाँच, स्वास्थ्य जागरूकता और आवश्यक मार्गदर्शन तक पहुँच बढ़ाने का प्रयास।",
      englishLabel: "Health Camps",
      englishText: "Expanding access to free health checkups, preventive health awareness, and essential medical guidance.",
    },
    {
      emoji: "🍲",
      hindiLabel: "Food Drives",
      hindiText: "जरूरतमंद एवं वंचित लोगों तक भोजन और खाद्य सहायता पहुँचाने की पहल।",
      englishLabel: "Food Drives",
      englishText: "An initiative delivering hot meals and vital grocery nutritional support to needy and vulnerable individuals.",
    },
    {
      emoji: "💍",
      hindiLabel: "Mass Marriage",
      hindiText: "आर्थिक रूप से कमजोर परिवारों को सम्मानपूर्वक विवाह के अवसर पर सहयोग देने का प्रयास।",
      englishLabel: "Mass Marriage",
      englishText: "Assisting economically weaker families with dignity and support on the sacred occasion of marriage.",
    },
    {
      emoji: "👩",
      hindiLabel: "Women Upliftment",
      hindiText: "महिलाओं को आत्मनिर्भर, जागरूक और सशक्त बनाने की दिशा में प्रयास।",
      englishLabel: "Women Upliftment",
      englishText: "Empowering women to become self-reliant, socially aware, and economically independent.",
    },
    {
      emoji: "🌳",
      hindiLabel: "Community Awareness",
      hindiText: "स्वच्छता, स्वास्थ्य, शिक्षा और सामाजिक जिम्मेदारी के प्रति जागरूकता बढ़ाना।",
      englishLabel: "Community Awareness",
      englishText: "Raising community consciousness regarding hygiene, healthcare, primary education, and civic social responsibility.",
    },
    {
      emoji: "🤝",
      hindiLabel: "Community Support",
      hindiText: "जरूरत के समय समाज के कमजोर वर्गों के साथ खड़े होने और सहयोग देने का प्रयास।",
      englishLabel: "Community Support",
      englishText: "Standing steadfastly beside vulnerable sections of society in times of distress and extending compassionate relief.",
    },
  ],
  subSection: {
    headingHi: "❤️ हमारा संकल्प",
    headingEn: "❤️ Our Pledge",
    textHi: "हम मानते हैं कि बदलाव हमेशा बड़े कदमों से नहीं, बल्कि छोटे-छोटे नेक प्रयासों से शुरू होता है। किसी बच्चे की शिक्षा में सहयोग, किसी जरूरतमंद को भोजन, किसी परिवार की मदद या किसी महिला को आत्मनिर्भर बनने का अवसर — ये सभी प्रयास मिलकर एक बेहतर समाज का निर्माण कर सकते हैं।",
    textEn: "We believe that transformative change never begins solely with massive gestures, but with small, noble, consistent efforts. Supporting a child's education, feeding someone in need, helping a struggling family, or offering a woman the opportunity to become self-reliant — all these united efforts forge a more compassionate and equitable society.",
  },
  callToAction: {
    headingHi: "🌟 आइए, बदलाव का हिस्सा बनें",
    headingEn: "🌟 Come, Be a Part of the Change",
    textHi: "आपका समय, सहयोग और योगदान किसी जरूरतमंद व्यक्ति के जीवन में उम्मीद की एक नई किरण ला सकता है। आइए, मिलकर ऐसा समाज बनाने की दिशा में कदम बढ़ाएँ जहाँ सेवा हो, सम्मान हो, समान अवसर हों और हर व्यक्ति के जीवन में आगे बढ़ने की उम्मीद हो।",
    textEn: "Your time, support, and contribution can illuminate a fresh ray of hope in the life of a person in need. Come, let us walk together to build a society anchored in selfless service, human dignity, equal opportunity, and the genuine hope for every individual to thrive.",
  },
  quoteHi: "“एक साथ मिलकर किया गया छोटा सा प्रयास, समाज में बड़ा बदलाव ला सकता है।”",
  quoteEn: "“A small collective effort made together can bring about a monumental transformation in society.”",
};

export const BILINGUAL_MASS_MARRIAGE: BilingualDocSection = {
  pageNumber: 2,
  emoji: "💍",
  titleHi: "Mass Marriage (सामूहिक विवाह)",
  titleEn: "Mass Marriage",
  subtitleHi: "“एक नई शुरुआत, सम्मान और खुशियों के साथ।”",
  subtitleEn: "“A new beginning, with dignity and happiness.”",
  introHi: [
    "Arogya Bandhan Foundation का उद्देश्य जरूरतमंद एवं आर्थिक रूप से कमजोर परिवारों को विवाह के अवसर पर सहयोग प्रदान करना और उन्हें सम्मानपूर्वक नई जिंदगी की शुरुआत करने में सहायता देना है।",
    "हम Mass Marriage के माध्यम से कई जोड़ों को एक साथ विवाह के पवित्र बंधन में जोड़ने का प्रयास करते हैं। हमारा मानना है कि आर्थिक कठिनाइयाँ किसी परिवार की खुशियों और विवाह जैसे महत्वपूर्ण संस्कार में बाधा नहीं बननी चाहिए।",
  ],
  introEn: [
    "Arogya Bandhan Foundation aims to extend compassionate assistance to needy and economically weaker families during weddings, supporting couples in embarking upon a new life with dignity.",
    "Through Mass Marriage, we unite multiple couples in the sacred bond of matrimony. We firmly believe that financial hardship should never become an insurmountable obstacle to a family's happiness or a milestone as culturally sacred as marriage.",
  ],
  initiativesHeadingHi: "हमारा प्रयास",
  initiativesHeadingEn: "Our Endeavor",
  bulletPoints: [
    {
      emoji: "🌸",
      hindiText: "जरूरतमंद परिवारों को विवाह के अवसर पर सहयोग प्रदान करना।",
      englishText: "Providing holistic support to underprivileged families on the auspicious occasion of marriage.",
    },
    {
      emoji: "🏛️",
      hindiText: "विवाह समारोह को सम्मानजनक और व्यवस्थित तरीके से आयोजित करना।",
      englishText: "Organizing traditional wedding ceremonies in a dignified, orderly, and respectful atmosphere.",
    },
    {
      emoji: "🎁",
      hindiText: "वर-वधू एवं उनके परिवारों को आवश्यक सहायता उपलब्ध कराने का प्रयास करना।",
      englishText: "Providing brides, grooms, and their families with essential household starter kits, attire, and wedding necessities.",
    },
    {
      emoji: "🤝",
      hindiText: "समाज में आपसी सहयोग, समानता और भाईचारे की भावना को बढ़ावा देना।",
      englishText: "Fostering mutual cooperation, social equality, and communal harmony across society.",
    },
    {
      emoji: "🛡️",
      hindiText: "परिवारों को आर्थिक बोझ कम करने में सहयोग देना।",
      englishText: "Relieving impoverished families of catastrophic, high-interest marriage borrowing and debt traps.",
    },
    {
      emoji: "💐",
      hindiText: "नवविवाहित जोड़ों को सुखद एवं सम्मानजनक भविष्य की शुभकामनाओं के साथ नई शुरुआत का अवसर देना।",
      englishText: "Blessing newly wedded couples with warmest wishes for a joyful, prosperous future and gifting them a dignified fresh start.",
    },
  ],
  highlightStatementHi: "हमारा उद्देश्य केवल विवाह कराना नहीं, बल्कि जरूरतमंद परिवारों के चेहरे पर मुस्कान लाना और उन्हें सम्मान के साथ एक नई शुरुआत का अवसर देना है।",
  highlightStatementEn: "Our purpose is not merely to solemnize weddings, but to bring genuine smiles to the faces of underprivileged families and empower them with a respectful, dignified new beginning.",
  quoteHi: "“जहाँ सहयोग से दो दिल जुड़ते हैं, वहाँ एक बेहतर समाज की नींव रखी जाती है।”",
  quoteEn: "“Where two hearts unite through compassionate support, the very foundation of an enlightened society is laid.”",
  callToAction: {
    headingHi: "🤝 आइए, इस नेक पहल का हिस्सा बनें",
    headingEn: "🤝 Come, Be a Part of this Noble Initiative",
    textHi: "आपका सहयोग किसी जरूरतमंद परिवार के लिए केवल एक मदद नहीं, बल्कि उनके जीवन की एक नई शुरुआत बन सकता है। आइए, मिलकर ऐसे विवाह समारोहों को बढ़ावा दें जहाँ सादगी, सम्मान, समानता और खुशियाँ सभी के लिए हों।",
    textEn: "Your support is far more than financial assistance — it marks the beginning of an entirely renewed life for a struggling family. Come, let us unite to champion community weddings where simplicity, dignity, equality, and celebration are accessible to all.",
  },
};

export const BILINGUAL_FOOD_DRIVES: BilingualDocSection = {
  pageNumber: 3,
  emoji: "🍲",
  titleHi: "Food Drives (अन्नदान एवं भोजन वितरण)",
  titleEn: "Food Drives",
  subtitleHi: "“कोई भी व्यक्ति भूखा न सोए — यही हमारी छोटी सी कोशिश है।”",
  subtitleEn: "“May no person sleep hungry — that is our earnest endeavor.”",
  introHi: [
    "Arogya Bandhan Foundation जरूरतमंद, गरीब एवं वंचित लोगों तक सहायता पहुँचाने के उद्देश्य से Food Drives आयोजित करने का प्रयास करता है।",
    "हमारा मानना है कि भोजन केवल एक आवश्यकता नहीं, बल्कि हर व्यक्ति का सम्मान और जीवन की मूल जरूरत है। हमारी पहल का उद्देश्य ऐसे लोगों तक सहयोग पहुँचाना है जो आर्थिक कठिनाइयों के कारण पर्याप्त भोजन की व्यवस्था नहीं कर पाते।",
  ],
  introEn: [
    "Arogya Bandhan Foundation strives to organize ongoing Food Drives with the dedicated objective of delivering nutritional relief to needy, impoverished, and marginalized individuals.",
    "We believe that wholesome food is not just a biological necessity, but an essential mark of human dignity and a fundamental right of life. Our initiative aims to support families and vulnerable persons who cannot secure adequate meals due to severe economic constraints.",
  ],
  initiativesHeadingHi: "हमारी Food Drive पहल",
  initiativesHeadingEn: "Our Food Drive Initiative",
  bulletPoints: [
    {
      emoji: "🍛",
      hindiText: "जरूरतमंद लोगों के लिए भोजन वितरण",
      englishText: "Distribution of hygienic, freshly cooked, nutritious meals for underprivileged individuals.",
    },
    {
      emoji: "🥘",
      hindiText: "गरीब एवं वंचित परिवारों तक खाद्य सहायता पहुँचाने का प्रयास",
      englishText: "Reaching out to impoverished and marginalized households with sustaining food assistance.",
    },
    {
      emoji: "👨‍👩‍👧‍👦",
      hindiText: "जरूरतमंद परिवारों के बीच सामुदायिक सहयोग",
      englishText: "Fostering grassroots community cooperation and mutual assistance among struggling families.",
    },
    {
      emoji: "🧒",
      hindiText: "बच्चों एवं बुजुर्गों के लिए भोजन सहायता",
      englishText: "Dedicated nutritional food support tailored for vulnerable children and elderly citizens.",
    },
    {
      emoji: "📦",
      hindiText: "आवश्यक खाद्य सामग्री के वितरण का प्रयास",
      englishText: "Providing dry grocery ration kits containing grains, lentils, flour, and essential cooking staples.",
    },
    {
      emoji: "🤝",
      hindiText: "समाज में सेवा और सहयोग की भावना को बढ़ावा देना",
      englishText: "Inspiring a community culture of selfless service, compassion, and shared solidarity.",
    },
    {
      emoji: "🌱",
      hindiText: "भोजन की बर्बादी को कम करने के प्रति जागरूकता फैलाना",
      englishText: "Spreading civic awareness on preventing food wastage and promoting conscious consumption.",
    },
  ],
  highlightStatementHi: "हमारा उद्देश्य सिर्फ भोजन बाँटना नहीं, बल्कि जरूरतमंद व्यक्ति तक मदद, सम्मान और अपनापन पहुँचाना है।",
  highlightStatementEn: "Our goal is not simply distributing food packets, but delivering authentic compassion, human dignity, and heartfelt warmth to every person in need.",
  quoteHi: "“एक भोजन किसी का एक दिन बदल सकता है, लेकिन आपकी छोटी सी मदद किसी की जिंदगी में उम्मीद जगा सकती है।”",
  quoteEn: "“A single wholesome meal can change someone's day, but your compassionate support can rekindle lifelong hope.”",
  callToAction: {
    headingHi: "❤️ आइए, किसी की भूख मिटाने का माध्यम बनें",
    headingEn: "❤️ Come, Become a Medium to Alleviate Hunger",
    textHi: "आपका छोटा सा सहयोग किसी जरूरतमंद परिवार के लिए एक बड़ी मदद बन सकता है। आइए, मिलकर ऐसा समाज बनाने की दिशा में कदम बढ़ाएँ जहाँ भूख से मजबूर कोई व्यक्ति अकेला न रहे।",
    textEn: "Your modest contribution can serve as a lifeline for a struggling family. Come, let us walk together to build a caring society where no human being battling hunger ever has to stand alone.",
  },
};

export const BILINGUAL_CHILD_EDUCATION: BilingualDocSection = {
  pageNumber: 4,
  emoji: "📚",
  titleHi: "Child Education (बाल शिक्षा सहायता)",
  titleEn: "Child Education",
  subtitleHi: "“हर बच्चे को शिक्षा, हर बच्चे को बेहतर भविष्य।”",
  subtitleEn: "“Education for every child, a better future for every child.”",
  introHi: [
    "Arogya Bandhan Foundation का उद्देश्य आर्थिक रूप से कमजोर और जरूरतमंद परिवारों के बच्चों को शिक्षा के अवसरों से जोड़ने और उनके उज्ज्वल भविष्य की दिशा में सहयोग करने का प्रयास करना है।",
    "हमारा मानना है कि शिक्षा किसी भी बच्चे के जीवन को बदलने की सबसे मजबूत शक्ति है। आर्थिक परिस्थितियाँ किसी बच्चे के सपनों और सीखने की क्षमता के बीच बाधा नहीं बननी चाहिए।",
  ],
  introEn: [
    "Arogya Bandhan Foundation aims to connect children from economically vulnerable and underserved families with educational opportunities and support them on their journey to a brighter future.",
    "We believe that education is the single most transformative force in a child's life. Harsh financial circumstances must never stand as a roadblock between a child's dreams and their intrinsic potential to learn.",
  ],
  initiativesHeadingHi: "हमारा प्रयास",
  initiativesHeadingEn: "Our Endeavor",
  bulletPoints: [
    {
      emoji: "📖",
      hindiText: "जरूरतमंद बच्चों की शिक्षा में सहयोग करना।",
      englishText: "Providing academic guidance and educational retention support to underprivileged students.",
    },
    {
      emoji: "🎒",
      hindiText: "बच्चों को आवश्यक शैक्षणिक सामग्री उपलब्ध कराने का प्रयास करना।",
      englishText: "Equipping children with sturdy school bags, stationery, and vital learning supplies.",
    },
    {
      emoji: "✏️",
      hindiText: "किताबें, कॉपियाँ और स्टेशनरी जैसी आवश्यक सामग्री में सहायता करना।",
      englishText: "Supplying textbooks, practice notebooks, writing instruments, and core curricular aids.",
    },
    {
      emoji: "🏫",
      hindiText: "आर्थिक रूप से कमजोर परिवारों के बच्चों को शिक्षा से जोड़ने के लिए जागरूकता बढ़ाना।",
      englishText: "Conducting community enrollment drives to ensure children from poor families stay in school.",
    },
    {
      emoji: "👧👦",
      hindiText: "बच्चों में पढ़ाई के प्रति रुचि और आत्मविश्वास बढ़ाने का प्रयास करना।",
      englishText: "Cultivating academic curiosity, critical thinking, and unshakeable self-confidence in young minds.",
    },
    {
      emoji: "🌱",
      hindiText: "बच्चों के सर्वांगीण विकास और बेहतर भविष्य के लिए सहयोग करना।",
      englishText: "Supporting holistic childhood development, value-based education, and sports for a well-rounded future.",
    },
    {
      emoji: "🤝",
      hindiText: "समाज के लोगों को जरूरतमंद बच्चों की शिक्षा में योगदान देने के लिए प्रेरित करना।",
      englishText: "Inspiring citizens and community members to actively sponsor and advocate for children's learning.",
    },
  ],
  highlightStatementHi: "हमारा उद्देश्य केवल बच्चों को पढ़ाना नहीं, बल्कि उन्हें अपने सपनों को पूरा करने का अवसर देना है।",
  highlightStatementEn: "Our mission is not merely to provide classroom tutoring, but to empower young souls with the opportunity to pursue and accomplish their dearest dreams.",
  quoteHi: "“एक बच्चे की शिक्षा में किया गया सहयोग, उसके पूरे भविष्य को बदलने की शुरुआत हो सकता है।”",
  quoteEn: "“A helping hand extended towards a child's education can be the turning point that transforms their entire destiny.”",
  subSection: {
    headingHi: "🌟 शिक्षा से सपनों तक",
    headingEn: "🌟 From Education to Dreams",
    textHi: "हर बच्चा प्रतिभा और संभावनाओं से भरा होता है। सही मार्गदर्शन, शिक्षा और सहयोग मिलने पर वही बच्चा अपने परिवार और समाज के लिए एक बेहतर भविष्य का निर्माण कर सकता है।",
    textEn: "Every single child is filled with immense natural talent and boundless potential. Given proper guidance, quality education, and compassionate backing, that very child will rise to forge an enlightened future for their family and society.",
  },
  callToAction: {
    headingHi: "❤️ आइए, किसी बच्चे के सपनों को उड़ान दें",
    headingEn: "❤️ Come, Give Wings to a Child's Dreams",
    textHi: "आपका छोटा सा सहयोग किसी बच्चे के हाथ में किताब, आँखों में उम्मीद और जीवन में एक नया अवसर दे सकता है।",
    textEn: "Your small contribution can place a book in a child's hand, ignite bright hope in their eyes, and unlock a world of transformative opportunities.",
  },
};

export const BILINGUAL_WOMEN_UPLIFTMENT: BilingualDocSection = {
  pageNumber: 5,
  emoji: "👩",
  titleHi: "Women Upliftment (महिला सशक्तिकरण)",
  titleEn: "Women Upliftment",
  subtitleHi: "“सशक्त महिला, सशक्त परिवार और सशक्त समाज।”",
  subtitleEn: "“Empowered woman, resilient family, and thriving society.”",
  introHi: [
    "Arogya Bandhan Foundation का उद्देश्य महिलाओं को आत्मनिर्भर, जागरूक और सशक्त बनाने की दिशा में सहयोग करना है। हमारा मानना है कि जब एक महिला को आगे बढ़ने का अवसर मिलता है, तो उसका सकारात्मक प्रभाव पूरे परिवार और समाज पर पड़ता है।",
    "हम महिलाओं को शिक्षा, कौशल विकास, स्वास्थ्य जागरूकता और आत्मनिर्भरता के अवसरों से जोड़ने के लिए विभिन्न सामाजिक पहलों को बढ़ावा देने का प्रयास करते हैं।",
  ],
  introEn: [
    "Arogya Bandhan Foundation is committed to assisting women in becoming self-reliant, socially aware, and empowered. We believe that when a woman is granted the opportunity to advance, its uplifting ripple effect benefits her entire household and the broader community.",
    "We strive to foster grassroots initiatives connecting women with literacy, vocational skill training, preventive health awareness, and pathways toward financial autonomy.",
  ],
  initiativesHeadingHi: "हमारा प्रयास",
  initiativesHeadingEn: "Our Endeavor",
  bulletPoints: [
    {
      emoji: "👩",
      hindiText: "महिलाओं को आत्मनिर्भर बनने के लिए प्रोत्साहित करना।",
      englishText: "Encouraging and mentoring rural women and young girls to achieve dignified self-reliance.",
    },
    {
      emoji: "📚",
      hindiText: "शिक्षा एवं जागरूकता के महत्व को बढ़ावा देना।",
      englishText: "Promoting functional literacy, digital awareness, and the foundational power of education.",
    },
    {
      emoji: "🧵",
      hindiText: "कौशल विकास एवं रोजगार के अवसरों से जोड़ने का प्रयास करना।",
      englishText: "Providing vocational training in tailoring, textiles, and handicrafts tied to sustainable livelihood opportunities.",
    },
    {
      emoji: "💡",
      hindiText: "महिलाओं में आत्मविश्वास और नेतृत्व क्षमता को बढ़ावा देना।",
      englishText: "Building self-esteem, articulate leadership, and decision-making capabilities among women.",
    },
    {
      emoji: "🩺",
      hindiText: "महिलाओं के स्वास्थ्य एवं स्वच्छता के प्रति जागरूकता फैलाना।",
      englishText: "Conducting specialized workshops on maternal health, menstrual hygiene, and routine medical wellness.",
    },
    {
      emoji: "🤝",
      hindiText: "जरूरतमंद महिलाओं को सामाजिक एवं सामुदायिक सहयोग उपलब्ध कराने का प्रयास करना।",
      englishText: "Providing mutual-aid circles, counseling, and community-backed support to women in distress.",
    },
    {
      emoji: "🌱",
      hindiText: "महिलाओं को अपने अधिकारों और अवसरों के प्रति जागरूक करना।",
      englishText: "Educating women on statutory legal protections, government welfare schemes, and economic entitlements.",
    },
  ],
  highlightStatementHi: "हमारा उद्देश्य महिलाओं के लिए केवल सहायता उपलब्ध कराना नहीं, बल्कि उन्हें अपने पैरों पर खड़े होने और अपने भविष्य के फैसले स्वयं लेने के लिए सक्षम बनाने की दिशा में प्रयास करना है।",
  highlightStatementEn: "Our mission is not merely to extend interim relief, but to equip women to stand proudly on their own feet and take independent charge of their life decisions and future.",
  quoteHi: "“जब एक महिला सशक्त होती है, तो एक परिवार मजबूत होता है और समाज आगे बढ़ता है।”",
  quoteEn: "“When a woman becomes empowered, a family grows resilient and an entire society moves forward.”",
  callToAction: {
    headingHi: "🌸 आइए, बदलाव का हिस्सा बनें",
    headingEn: "🌸 Come, Be a Part of the Change",
    textHi: "हर महिला के अंदर आगे बढ़ने की क्षमता और अपने सपनों को पूरा करने की शक्ति है। सही अवसर, मार्गदर्शन और सहयोग के माध्यम से हम एक ऐसे समाज की दिशा में कदम बढ़ा सकते हैं जहाँ महिलाएँ सम्मान, आत्मविश्वास और आत्मनिर्भरता के साथ आगे बढ़ें।",
    textEn: "Every woman harbors the resilience to overcome barriers and the strength to realize her aspirations. Through equal opportunity, compassionate mentorship, and community solidarity, we can march toward a world where women lead with honor, confidence, and complete self-reliance.",
  },
};

export const BILINGUAL_HEALTH_CAMPS: BilingualDocSection = {
  pageNumber: 6,
  emoji: "🏥",
  titleHi: "Health Camps (स्वास्थ्य जाँच एवं जागरूकता शिविर)",
  titleEn: "Health Camps",
  subtitleHi: "“स्वस्थ समाज की ओर एक सार्थक कदम”",
  subtitleEn: "“A meaningful step towards a healthy society”",
  introHi: [
    "Arogya Bandhan Foundation जरूरतमंद और वंचित लोगों तक स्वास्थ्य सेवाओं की पहुँच बढ़ाने के उद्देश्य से Health Camps आयोजित करने के लिए प्रतिबद्ध है।",
    "हमारा प्रयास है कि आर्थिक रूप से कमजोर परिवारों को समय पर स्वास्थ्य संबंधी जानकारी, प्राथमिक स्वास्थ्य जाँच और आवश्यक मार्गदर्शन उपलब्ध कराया जा सके।",
  ],
  introEn: [
    "Arogya Bandhan Foundation is deeply committed to organizing community Health Camps to expand direct access to essential healthcare services for needy and marginalized families.",
    "Our focus is to ensure that economically vulnerable households receive timely diagnostic checkups, professional medical advice, and vital health awareness right at their doorstep.",
  ],
  initiativesHeadingHi: "हमारे Health Camps में:",
  initiativesHeadingEn: "In Our Health Camps:",
  bulletPoints: [
    {
      emoji: "🩺",
      hindiText: "सामान्य स्वास्थ्य जाँच",
      englishText: "Comprehensive general health checkups and primary clinical screenings.",
    },
    {
      emoji: "🩸",
      hindiText: "रक्तचाप एवं शुगर की जाँच",
      englishText: "Routine blood pressure monitoring and random blood glucose (sugar) testing.",
    },
    {
      emoji: "👨‍⚕️",
      hindiText: "चिकित्सकीय परामर्श एवं स्वास्थ्य मार्गदर्शन",
      englishText: "Free doctor consultations, clinical evaluations, and preventive lifestyle guidance.",
    },
    {
      emoji: "👩‍⚕️",
      hindiText: "महिलाओं के स्वास्थ्य के प्रति जागरूकता",
      englishText: "Dedicated counseling on maternal wellness, reproductive health, and hygiene.",
    },
    {
      emoji: "👶",
      hindiText: "बच्चों के स्वास्थ्य एवं पोषण संबंधी जागरूकता",
      englishText: "Pediatric growth monitoring, nutritional guidance, and childhood immunization awareness.",
    },
    {
      emoji: "💊",
      hindiText: "आवश्यक स्वास्थ्य संबंधी जानकारी एवं मार्गदर्शन",
      englishText: "Distribution of essential primary medicines and proper pharmaceutical usage instructions.",
    },
    {
      emoji: "📢",
      hindiText: "स्वच्छता, पोषण और स्वस्थ जीवनशैली के प्रति जागरूकता",
      englishText: "Grassroots education on potable water, community sanitation, balanced diet, and active living.",
    },
  ],
  highlightStatementHi: "हमारा उद्देश्य केवल स्वास्थ्य जाँच करना नहीं, बल्कि लोगों को अपने स्वास्थ्य के प्रति जागरूक और जिम्मेदार बनाना है।",
  highlightStatementEn: "Our goal is not merely to conduct routine checkups, but to enlighten citizens and inspire them to become conscious and proactive caretakers of their health.",
  quoteHi: "“स्वस्थ व्यक्ति, स्वस्थ परिवार और स्वस्थ समाज — यही हमारे प्रयास की दिशा है।”",
  quoteEn: "“A healthy individual, a healthy family, and a healthy society — this is the defining mission of our collective effort.”",
};

// -------------------------------------------------------------
// ALL REGISTERED PROGRAMS LIST
// -------------------------------------------------------------

export const ALL_PROGRAMS: ProgramData[] = [
  {
    id: "prog-social-welfare",
    slug: "social-welfare",
    title: "Social Welfare & Community Upliftment",
    hindiTitle: "सामाजिक कल्याण एवं जनकल्याण पहल",
    category: "Social Welfare",
    icon: "HeartHandshake",
    imageUrl: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=1200&auto=format&fit=crop",
    description: "A comprehensive social welfare umbrella advancing education, healthcare, nutrition, women empowerment, mass marriages, and mutual aid for underprivileged communities.",
    detailedContent: "Arogya Bandhan Foundation is committed to serving marginalized and underprivileged sections of society. We believe sustainable societal development is possible only when every individual receives dignity, opportunities, and necessary support. Through child education, community health camps, food drives, mass marriages, women upliftment, and civic awareness, we continuously strive to uplift lives across Bihar.",
    targetGroup: "Underprivileged children, destitute seniors, women & marginalized families",
    target: "Underprivileged children, destitute seniors, women & marginalized families",
    location: "Grassroots Clusters & Rural Panchayats, Bihar",
    objectives: [
      "Extending continuous support and assistance to the needy and vulnerable.",
      "Ensuring dignity, equal opportunity, and essential welfare access for all.",
      "Bridging grassroots gaps in education, healthcare, nutrition, and livelihoods.",
      "Mobilizing community volunteers to spark collective social change.",
    ],
    displayOrder: 1,
    bilingualDoc: BILINGUAL_SOCIAL_WELFARE,
  },
  {
    id: "prog-health-camps",
    slug: "health-camps",
    title: "Community Health Camps",
    hindiTitle: "सामुदायिक स्वास्थ्य शिविर",
    category: "Healthcare",
    icon: "Stethoscope",
    imageUrl: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=1200&auto=format&fit=crop",
    description: "Free medical checkups, doctor consultations, essential medicine distribution, and specialized eye and diagnostic screenings in remote and underserved villages.",
    detailedContent: "Our health camps bring certified physicians, diagnostic equipment, and life-saving medicines directly to doorsteps of marginalized rural families who lack primary healthcare access. We organize comprehensive multi-specialty camps offering general medicine, pediatric care, eye screenings with free spectacles, diabetes and hypertension testing, and distribution of essential medicines without charge.",
    targetGroup: "Rural families, elderly citizens & underserved communities",
    target: "Rural families, elderly citizens & underserved communities",
    location: "Grassroots Villages & Remote Clusters, Bihar",
    objectives: [
      "Free doctor consultations and diagnostic health checkups in underserved rural areas.",
      "Distribution of essential life-saving medicines and pediatric supplements.",
      "Preventive health awareness, eye screenings, and maternal care guidance.",
      "100% transparent reporting and zero middlemen execution.",
    ],
    displayOrder: 2,
    bilingualDoc: BILINGUAL_HEALTH_CAMPS,
  },
  {
    id: "prog-food-drives",
    slug: "food-drives",
    title: "Food Distribution & Annadaan",
    hindiTitle: "अन्नदान एवं भोजन वितरण",
    category: "Food Support",
    icon: "Utensils",
    imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop",
    description: "Weekly community food drives, nutritious meal distribution for impoverished children, and grocery ration kits for destitute elderly and daily-wage families.",
    detailedContent: "Ensuring no child or vulnerable family sleeps hungry through community kitchens, fortified nutrition programs, and monthly grain distribution to destitute households. Our Annadaan drives provide hot wholesome meals, dry ration kits containing rice, pulses, wheat flour, and cooking oil to daily-wage laborers, widows, and vulnerable rural families.",
    targetGroup: "Underprivileged children, destitute seniors & daily-wage families",
    target: "Underprivileged children, destitute seniors & daily-wage families",
    location: "Urban Slums & Rural Communities, Bihar",
    objectives: [
      "Weekly Annadaan community kitchens providing nutritious hot meals.",
      "Monthly dry ration kits distribution for destitute elderly and widows.",
      "Supplementary nutritional snacks and milk drives for slum children.",
      "Emergency hunger relief during cold waves and local crises.",
    ],
    displayOrder: 3,
    bilingualDoc: BILINGUAL_FOOD_DRIVES,
  },
  {
    id: "prog-mass-marriage",
    slug: "mass-marriage",
    title: "Samuhik Vivah / Mass Marriage",
    hindiTitle: "सामूहिक विवाह महोत्सव",
    category: "Social Welfare",
    icon: "HeartHandshake",
    imageUrl: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1200&auto=format&fit=crop",
    description: "Assisting economically weaker families by organizing dignified mass wedding ceremonies, providing essential household starter kits, and blessing new beginnings.",
    detailedContent: "Alleviating catastrophic marriage debt for impoverished families by arranging community weddings with full cultural dignity, clothing, and household starter essentials. We support eligible underprivileged brides and grooms with wedding attire, utensils, bedding, and community feasts while adhering to legal marriage registration.",
    targetGroup: "Economically disadvantaged brides, grooms & vulnerable families",
    target: "Economically disadvantaged brides, grooms & vulnerable families",
    location: "Community Centers & Civic Grounds, Bihar",
    objectives: [
      "Organizing grand, dignified traditional ceremonies for eligible couples.",
      "Providing essential household gift hampers and starter utilities.",
      "Facilitating legal marriage registration and government documentation.",
      "Protecting impoverished rural families from debilitating high-interest wedding debts.",
    ],
    displayOrder: 4,
    bilingualDoc: BILINGUAL_MASS_MARRIAGE,
  },
  {
    id: "prog-child-education",
    slug: "child-education",
    title: "Child Welfare & Education (Vidyadaan)",
    hindiTitle: "बाल कल्याण एवं शिक्षा सहायता (विद्यादान)",
    category: "Education & Child Welfare",
    icon: "BookOpen",
    imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop",
    description: "Distribution of school bags, textbooks, stationery kits, digital learning aids, and remedial coaching camps to prevent dropouts in rural schools.",
    detailedContent: "Breaking the cycle of poverty by ensuring underprivileged boys and girls have books, uniforms, school bags, and remedial teachers to excel in school. We establish after-school learning centers, promote girl child education, and provide nutrition and health screenings to keep children healthy and eager to learn.",
    targetGroup: "Children aged 0-14, rural students & out-of-school youth",
    target: "Children aged 0-14 in distressed socioeconomic settlements",
    location: "Rural Government Schools & Slum Learning Centers, Bihar",
    objectives: [
      "Distribution of school bags, notebooks, stationery kits, and textbooks.",
      "Free after-school remedial coaching for children struggling in basic literacy and math.",
      "Encouraging girl-child school retention and reducing dropout rates.",
      "Nutritional support and routine pediatric checkups for enrolled children.",
    ],
    displayOrder: 5,
    bilingualDoc: BILINGUAL_CHILD_EDUCATION,
  },
  {
    id: "prog-women-empowerment",
    slug: "women-empowerment",
    title: "Women Empowerment & Livelihood",
    hindiTitle: "महिला सशक्तिकरण एवं स्वावलंबन",
    category: "Women Empowerment",
    icon: "Sparkles",
    imageUrl: "https://images.unsplash.com/photo-1594708767771-a7502209ff51?q=80&w=1200&auto=format&fit=crop",
    description: "Vocational skill training in tailoring, handicrafts, computer basics, and financial literacy to empower rural women with dignified self-reliance.",
    detailedContent: "Equipping rural homemakers, single mothers, and adolescent girls with certified tailoring training, free sewing machines, and access to self-help micro-finance groups. Our empowerment centers foster financial independence, entrepreneurial spirit, and confidence so women can lead dignified, self-sustaining lives.",
    targetGroup: "Rural women, adolescent girls & Self-Help Group (SHG) members",
    target: "Rural women, adolescent girls & Self-Help Group (SHG) members",
    location: "Women Skill Centers & Village Clusters, Bihar",
    objectives: [
      "Professional tailoring, embroidery, and handicraft training courses.",
      "Distribution of sewing machines to graduating underprivileged women.",
      "Basic digital literacy and household financial management workshops.",
      "Formation and mentoring of women Self-Help Groups (SHGs) for micro-enterprises.",
    ],
    displayOrder: 6,
    bilingualDoc: BILINGUAL_WOMEN_UPLIFTMENT,
  },
  {
    id: "prog-community-awareness",
    slug: "community-awareness",
    title: "Community Awareness & Social Welfare",
    hindiTitle: "सामाजिक जागरूकता एवं जन कल्याण",
    category: "Community Awareness",
    icon: "Users",
    imageUrl: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=1200&auto=format&fit=crop",
    description: "Grassroots awareness drives on hygiene, sanitation, government welfare schemes, child rights, and legal literacy for underserved citizens.",
    detailedContent: "Empowering rural and slum communities through interactive awareness workshops, street plays (Nukkad Natak), and guidance desks explaining entitlement schemes such as Ayushman Bharat, widow pensions, and educational subsidies. We bridge the critical information gap so eligible citizens can access their rightful public benefits.",
    targetGroup: "Rural citizens, daily-wage laborers & marginalized communities",
    target: "Rural citizens, daily-wage laborers & marginalized communities",
    location: "Gram Panchayats & Community Chaupals, Bihar",
    objectives: [
      "Grassroots legal literacy and public welfare scheme registration camps.",
      "Water, sanitation, and hygiene (WASH) community workshops.",
      "De-addiction and health awareness in rural localities.",
      "Mobilizing citizen volunteers for local community problem-solving.",
    ],
    displayOrder: 7,
  },
  {
    id: "prog-community-support",
    slug: "community-support",
    title: "Community Support & Social Service",
    hindiTitle: "सामुदायिक सहयोग एवं सामाजिक सेवा",
    category: "Community Support",
    icon: "Users",
    imageUrl: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1200&auto=format&fit=crop",
    description: "Elderly care companionship, winter clothing distribution, destitute family aid, and fostering grassroots mutual-aid volunteer networks.",
    detailedContent: "Strengthening community bonds through senior citizen support circles, annual winter blanket distribution drives, and localized mutual-aid neighborhood volunteer squads. We provide direct humanitarian aid to destitute families, abandoned elderly, and differently-abled individuals.",
    targetGroup: "Elderly persons, destitute individuals & marginalized citizens",
    target: "Elderly persons, destitute individuals & marginalized citizens",
    location: "Community Centers & Local Neighborhoods, Bihar",
    objectives: [
      "Annual winter relief drives distributing warm blankets and woolens.",
      "Care, mobility aids, and medical assistance for destitute seniors.",
      "Emergency financial aid and dry rations for families in distress.",
      "Building local volunteer networks to support vulnerable neighbors.",
    ],
    displayOrder: 8,
  },
  {
    id: "prog-rural-development",
    slug: "rural-development",
    title: "Rural & Village Development",
    hindiTitle: "ग्रामोत्थान एवं ग्रामीण विकास",
    category: "Rural Welfare",
    icon: "Trees",
    imageUrl: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1200&auto=format&fit=crop",
    description: "Clean drinking water installations, community sanitation drives, solar street lights, and village chaupal renovation for sustainable community living.",
    detailedContent: "Partnering with village panchayats to establish clean drinking water kiosks, community soak pits, solar street lighting, and village tree-planting drives to foster sustainable rural living.",
    targetGroup: "Remote rural villages, farmer communities & tribal belts",
    target: "Remote rural villages, farmer communities & tribal belts",
    location: "Remote Villages & Panchayats, Bihar",
    objectives: [
      "Installation of clean drinking water filtration points.",
      "Solar street lights in unlit rural village paths.",
      "Tree plantation and environmental conservation drives.",
      "Community sanitation and village hygiene infrastructure.",
    ],
    displayOrder: 9,
  },
  {
    id: "prog-emergency-relief",
    slug: "emergency-relief",
    title: "Emergency & Disaster Relief",
    hindiTitle: "आपदा राहत एवं आपातकालीन सहायता",
    category: "Disaster Relief",
    icon: "LifeBuoy",
    imageUrl: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=1200&auto=format&fit=crop",
    description: "Rapid on-ground deployment during floods, extreme cold waves, or crises with emergency dry rations, tarpaulins, warm blankets, and medical kits.",
    detailedContent: "Rapid response volunteer teams delivering immediate emergency sustenance kits, winter blankets, tarpaulins, and temporary shelter rehabilitation during natural calamities and seasonal crises.",
    targetGroup: "Disaster-affected families & homeless individuals",
    target: "Disaster-affected families & homeless individuals",
    location: "Disaster Affected Regions & Slums, Bihar",
    objectives: [
      "Immediate emergency dry food rations and drinking water packets.",
      "Temporary shelter tarpaulins, warm bedding, and winter clothes.",
      "Mobile medical first-aid teams and water-purifying tablets.",
      "Long-term recovery and rehabilitation assistance for displaced families.",
    ],
    displayOrder: 10,
  },
  {
    id: "prog-blood-donation-camps",
    slug: "blood-donation-camps",
    title: "Voluntary Blood Donation Drives",
    hindiTitle: "रक्तदान महादान शिविर",
    category: "Healthcare",
    icon: "Droplet",
    imageUrl: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?q=80&w=1200&auto=format&fit=crop",
    description: "Partnering with certified government blood banks to conduct safe voluntary blood donation drives, emergency donor matching, and thalassemia support.",
    detailedContent: "Mobilizing youth and civic volunteers to build a dependable emergency donor registry and support thalassemic children requiring monthly transfusions. We partner with certified government blood banks under sterile medical protocols.",
    targetGroup: "Patients in urgent need of life-saving blood and platelets",
    target: "Patients in urgent need of life-saving blood and platelets",
    location: "Civic Halls, Colleges & Hospital Blood Banks, Bihar",
    objectives: [
      "Conducting voluntary blood donation camps with certified blood banks.",
      "Building a 24/7 verified emergency donor helpline and database.",
      "Free blood support for children suffering from Thalassemia and Hemophilia.",
      "Promoting awareness to debunk myths around voluntary blood donation.",
    ],
    displayOrder: 11,
  },
];

// Slug alias resolver
const SLUG_ALIASES: Record<string, string> = {
  "social-welfare": "social-welfare",
  "food-distribution": "food-drives",
  "food-drives": "food-drives",
  "annadaan": "food-drives",
  "child-welfare": "child-education",
  "education-support": "child-education",
  "child-education": "child-education",
  "vidyadaan": "child-education",
  "community-welfare": "community-support",
  "community-support": "community-support",
  "community-awareness": "community-awareness",
  "health-camps": "health-camps",
  "mass-marriage": "mass-marriage",
  "samuhik-vivah": "mass-marriage",
  "women-empowerment": "women-empowerment",
  "women-upliftment": "women-empowerment",
  "rural-development": "rural-development",
  "emergency-relief": "emergency-relief",
  "blood-donation-camps": "blood-donation-camps",
};

export async function getProgramBySlug(rawSlug: string): Promise<ProgramData | null> {
  const normalized = (rawSlug || "").toLowerCase().trim();
  const canonicalSlug = SLUG_ALIASES[normalized] || normalized;

  // 1. Find the canonical fallback definition in memory
  const fallback = ALL_PROGRAMS.find(
    (p) => p.slug === canonicalSlug || p.slug === normalized || p.id === normalized
  );

  // 2. Try DB if available, augmenting DB record with bilingual document if present
  try {
    const dbProgram = await prisma.program.findFirst({
      where: {
        OR: [
          { slug: canonicalSlug },
          { slug: normalized },
          { id: normalized },
        ],
      },
    });

    if (dbProgram) {
      return {
        id: dbProgram.id,
        slug: dbProgram.slug,
        title: dbProgram.title,
        hindiTitle: dbProgram.hindiTitle || fallback?.hindiTitle,
        category: fallback?.category || "Social Welfare",
        icon: dbProgram.icon || fallback?.icon || "Heart",
        imageUrl: dbProgram.imageUrl || fallback?.imageUrl || "/images/program_medical.jpg",
        description: dbProgram.description,
        detailedContent: dbProgram.detailedContent || fallback?.detailedContent || dbProgram.description,
        targetGroup: dbProgram.targetGroup || fallback?.targetGroup || "Vulnerable Communities",
        target: dbProgram.targetGroup || fallback?.targetGroup || "Vulnerable Communities",
        location: dbProgram.location || fallback?.location || "Grassroots Communities, Bihar",
        objectives: fallback?.objectives || [
          "Direct grassroots distribution and execution ensuring zero middlemen leakage.",
          "Active engagement of verified local community volunteers and coordinators.",
          "100% transparent reporting and auditable outcomes.",
        ],
        displayOrder: dbProgram.displayOrder,
        bilingualDoc: fallback?.bilingualDoc,
      };
    }
  } catch {
    // Database unavailable, gracefully proceed with fallback
  }

  return fallback || null;
}

export function getOtherPrograms(currentSlug: string, count = 3): ProgramData[] {
  const canonical = SLUG_ALIASES[currentSlug] || currentSlug;
  return ALL_PROGRAMS.filter((p) => p.slug !== canonical && p.slug !== currentSlug).slice(0, count);
}
