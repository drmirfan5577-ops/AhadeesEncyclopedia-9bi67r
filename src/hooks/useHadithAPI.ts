// ============================================================
// AHADEES ENCYCLOPEDIA — COMPLETE HADITH API HOOK
// Source: api.hadith.gading.dev (Free • No API Key Required)
// Collections: All 6 Kutub Sitta — 29,969 Authentic Ahadees
//   • Sahih Al-Bukhari    : 7,563 ahadees
//   • Sahih Muslim        : 3,033 ahadees
//   • Sunan Abu Dawud     : 5,274 ahadees
//   • Jami At-Tirmidhi    : 3,956 ahadees
//   • Sunan An-Nasai      : 5,758 ahadees
//   • Sunan Ibn Majah     : 4,341 ahadees
// EvEr SmArT-wOrLd | Dr M Irfan Qadir Thaheem | eversmart/drirfan
// ============================================================

import { useState, useCallback } from 'react';
import { toast } from 'sonner';

// ─── Types ──────────────────────────────────────────────────
export interface APIHadith {
  number: number;       // Hadith number within book
  arab: string;         // Arabic text
  id: string;           // Indonesian (secondary)
}

export interface APIHadithPage {
  bookSlug: BookSlug;
  bookName: string;
  bookNameUr: string;
  hadiths: APIHadith[];
  totalHadiths: number;
  currentRange: { start: number; end: number };
  fetchedAt: number;
}

export type BookSlug =
  | 'bukhari'
  | 'muslim'
  | 'abu-dawud'
  | 'tirmidhi'
  | 'nasai'
  | 'ibn-majah';

// ─── Book Metadata ───────────────────────────────────────────
export const HADITH_BOOKS_META: Record<BookSlug, {
  nameAr: string; nameUr: string; nameEn: string;
  author: string; authorUr: string;
  total: number; color: string; icon: string;
  chapters: { number: number; nameUr: string; nameEn: string; from: number; to: number }[];
}> = {
  bukhari: {
    nameAr: 'صحيح البخاري',
    nameUr: 'صحیح البخاری',
    nameEn: 'Sahih Al-Bukhari',
    author: 'Imam Muhammad ibn Ismail Al-Bukhari',
    authorUr: 'امام محمد بن اسماعیل البخاری',
    total: 7563,
    color: '#dc2626',
    icon: '📕',
    chapters: [
      { number: 1, nameUr: 'وحی کا آغاز', nameEn: 'Revelation', from: 1, to: 7 },
      { number: 2, nameUr: 'ایمان', nameEn: 'Belief (Iman)', from: 8, to: 58 },
      { number: 3, nameUr: 'علم', nameEn: 'Knowledge', from: 59, to: 134 },
      { number: 4, nameUr: 'وضو', nameEn: 'Ablution (Wudu)', from: 135, to: 247 },
      { number: 5, nameUr: 'غسل', nameEn: 'Bathing (Ghusl)', from: 248, to: 293 },
      { number: 6, nameUr: 'حیض', nameEn: 'Menstruation', from: 294, to: 333 },
      { number: 7, nameUr: 'تیمم', nameEn: 'Dry Ablution', from: 334, to: 348 },
      { number: 8, nameUr: 'نماز', nameEn: 'Prayer (Salat)', from: 349, to: 520 },
      { number: 9, nameUr: 'نماز کے اوقات', nameEn: 'Times of Prayer', from: 521, to: 601 },
      { number: 10, nameUr: 'اذان', nameEn: 'Call to Prayer', from: 602, to: 685 },
      { number: 11, nameUr: 'نماز جمعہ', nameEn: 'Friday Prayer', from: 876, to: 941 },
      { number: 12, nameUr: 'خوف کی نماز', nameEn: 'Fear Prayer', from: 942, to: 948 },
      { number: 13, nameUr: 'عید کی نماز', nameEn: 'Eid Prayer', from: 956, to: 987 },
      { number: 14, nameUr: 'وتر', nameEn: 'Witr Prayer', from: 988, to: 1005 },
      { number: 15, nameUr: 'نماز استسقاء', nameEn: 'Rain Prayer', from: 1006, to: 1036 },
      { number: 16, nameUr: 'سجدہ سہو', nameEn: 'Prostration of Forgetfulness', from: 1224, to: 1235 },
      { number: 17, nameUr: 'جنازہ', nameEn: 'Funerals', from: 1237, to: 1392 },
      { number: 18, nameUr: 'زکوٰۃ', nameEn: 'Obligatory Charity (Zakat)', from: 1393, to: 1523 },
      { number: 19, nameUr: 'حج', nameEn: 'Pilgrimage (Hajj)', from: 1513, to: 1773 },
      { number: 20, nameUr: 'روزہ', nameEn: 'Fasting (Sawm)', from: 1891, to: 2009 },
      { number: 21, nameUr: 'لیلۃ القدر', nameEn: 'Night of Power', from: 2010, to: 2024 },
      { number: 22, nameUr: 'اعتکاف', nameEn: 'Retreat (I\'tikaf)', from: 2025, to: 2045 },
      { number: 23, nameUr: 'خرید و فروخت', nameEn: 'Sales & Trade', from: 2064, to: 2245 },
      { number: 24, nameUr: 'سلم', nameEn: 'Advance Sales', from: 2239, to: 2259 },
      { number: 25, nameUr: 'کرایہ', nameEn: 'Hiring', from: 2260, to: 2284 },
      { number: 26, nameUr: 'قرض', nameEn: 'Loans & Debts', from: 2285, to: 2407 },
      { number: 27, nameUr: 'جھگڑے', nameEn: 'Disputes', from: 2409, to: 2425 },
      { number: 28, nameUr: 'وصیت', nameEn: 'Wills & Testaments', from: 2738, to: 2782 },
      { number: 29, nameUr: 'جہاد', nameEn: 'Jihad & Expeditions', from: 2783, to: 3085 },
      { number: 30, nameUr: 'انبیاء کے قصے', nameEn: 'Prophets', from: 3189, to: 3461 },
      { number: 31, nameUr: 'مناقب', nameEn: 'Virtues', from: 3462, to: 3779 },
      { number: 32, nameUr: 'مناقب انصار', nameEn: 'Companions\' Virtues', from: 3780, to: 3954 },
      { number: 33, nameUr: 'غزوات', nameEn: 'Military Expeditions', from: 3949, to: 4473 },
      { number: 34, nameUr: 'تفسیر', nameEn: 'Quran Commentary', from: 4474, to: 5062 },
      { number: 35, nameUr: 'نکاح', nameEn: 'Marriage', from: 5063, to: 5231 },
      { number: 36, nameUr: 'طلاق', nameEn: 'Divorce', from: 5232, to: 5332 },
      { number: 37, nameUr: 'نفقہ', nameEn: 'Supporting Family', from: 5355, to: 5368 },
      { number: 38, nameUr: 'کھانا پینا', nameEn: 'Food & Drink', from: 5369, to: 5528 },
      { number: 39, nameUr: 'عقیقہ', nameEn: 'Aqiqah', from: 5467, to: 5474 },
      { number: 40, nameUr: 'شکار', nameEn: 'Hunting', from: 5478, to: 5526 },
      { number: 41, nameUr: 'قربانی', nameEn: 'Sacrifice', from: 5549, to: 5574 },
      { number: 42, nameUr: 'مشروبات', nameEn: 'Drinks', from: 5575, to: 5639 },
      { number: 43, nameUr: 'بیمار', nameEn: 'Patients & Medicine', from: 5641, to: 5762 },
      { number: 44, nameUr: 'لباس', nameEn: 'Dress', from: 5763, to: 5892 },
      { number: 45, nameUr: 'آداب', nameEn: 'Good Manners', from: 5893, to: 6015 },
      { number: 46, nameUr: 'اجازت', nameEn: 'Asking Permission', from: 6220, to: 6283 },
      { number: 47, nameUr: 'دعا', nameEn: 'Supplications', from: 6305, to: 6411 },
      { number: 48, nameUr: 'قرآن', nameEn: 'Quran Virtues', from: 4927, to: 5061 },
      { number: 49, nameUr: 'قدر', nameEn: 'Divine Decree', from: 6594, to: 6621 },
      { number: 50, nameUr: 'قسم', nameEn: 'Oaths', from: 6622, to: 6675 },
      { number: 51, nameUr: 'حدود', nameEn: 'Prescribed Punishments', from: 6779, to: 6858 },
      { number: 52, nameUr: 'دیت', nameEn: 'Blood Money', from: 6877, to: 6946 },
      { number: 53, nameUr: 'فتنے', nameEn: 'Trials & Tribulations', from: 7059, to: 7135 },
      { number: 54, nameUr: 'آخری زمانہ', nameEn: 'End Times', from: 7121, to: 7198 },
      { number: 55, nameUr: 'خوابیں', nameEn: 'Dreams & Visions', from: 6982, to: 7047 },
      { number: 56, nameUr: 'توحید', nameEn: 'Oneness of Allah', from: 7372, to: 7563 },
    ],
  },
  muslim: {
    nameAr: 'صحيح مسلم',
    nameUr: 'صحیح مسلم',
    nameEn: 'Sahih Muslim',
    author: 'Imam Muslim ibn al-Hajjaj',
    authorUr: 'امام مسلم بن الحجاج',
    total: 3033,
    color: '#1d4ed8',
    icon: '📘',
    chapters: [
      { number: 1, nameUr: 'ایمان', nameEn: 'Faith (Iman)', from: 1, to: 237 },
      { number: 2, nameUr: 'طہارت', nameEn: 'Purification', from: 223, to: 612 },
      { number: 3, nameUr: 'حیض', nameEn: 'Menstruation', from: 441, to: 485 },
      { number: 4, nameUr: 'نماز', nameEn: 'Prayer', from: 395, to: 885 },
      { number: 5, nameUr: 'مساجد', nameEn: 'Mosques', from: 524, to: 776 },
      { number: 6, nameUr: 'مسافر کی نماز', nameEn: 'Traveler\'s Prayer', from: 686, to: 824 },
      { number: 7, nameUr: 'جمعہ', nameEn: 'Friday Prayer', from: 854, to: 879 },
      { number: 8, nameUr: 'عیدین', nameEn: 'Eid Prayers', from: 885, to: 900 },
      { number: 9, nameUr: 'استسقاء', nameEn: 'Rain Prayer', from: 896, to: 904 },
      { number: 10, nameUr: 'کسوف', nameEn: 'Eclipse Prayer', from: 901, to: 915 },
      { number: 11, nameUr: 'جنازہ', nameEn: 'Funerals', from: 916, to: 975 },
      { number: 12, nameUr: 'زکوٰۃ', nameEn: 'Zakat', from: 979, to: 1100 },
      { number: 13, nameUr: 'روزہ', nameEn: 'Fasting', from: 1080, to: 1160 },
      { number: 14, nameUr: 'اعتکاف', nameEn: 'Retreat', from: 1167, to: 1174 },
      { number: 15, nameUr: 'حج', nameEn: 'Pilgrimage', from: 1175, to: 1357 },
      { number: 16, nameUr: 'نکاح', nameEn: 'Marriage', from: 1400, to: 1495 },
      { number: 17, nameUr: 'رضاعت', nameEn: 'Suckling', from: 1448, to: 1460 },
      { number: 18, nameUr: 'طلاق', nameEn: 'Divorce', from: 1471, to: 1527 },
      { number: 19, nameUr: 'لعان', nameEn: 'Li\'an', from: 1493, to: 1502 },
      { number: 20, nameUr: 'تجارت', nameEn: 'Business', from: 1528, to: 1619 },
      { number: 21, nameUr: 'وصیت', nameEn: 'Wills', from: 1627, to: 1638 },
      { number: 22, nameUr: 'وصیت نامہ', nameEn: 'Bequests', from: 1630, to: 1638 },
      { number: 23, nameUr: 'قسم و نذر', nameEn: 'Oaths & Vows', from: 1639, to: 1677 },
      { number: 24, nameUr: 'قضاء', nameEn: 'Judicial Decisions', from: 1713, to: 1733 },
      { number: 25, nameUr: 'لقطہ', nameEn: 'Lost Property', from: 1722, to: 1728 },
      { number: 26, nameUr: 'جہاد', nameEn: 'Jihad', from: 1731, to: 1930 },
      { number: 27, nameUr: 'امارت', nameEn: 'Leadership', from: 1826, to: 1866 },
      { number: 28, nameUr: 'شکار', nameEn: 'Hunting', from: 1929, to: 1971 },
      { number: 29, nameUr: 'قربانی', nameEn: 'Sacrifice', from: 1960, to: 1981 },
      { number: 30, nameUr: 'مشروبات', nameEn: 'Drinks', from: 2001, to: 2076 },
      { number: 31, nameUr: 'لباس و زینت', nameEn: 'Dress & Adornment', from: 2077, to: 2173 },
      { number: 32, nameUr: 'آداب', nameEn: 'Good Manners', from: 2150, to: 2231 },
      { number: 33, nameUr: 'سلام', nameEn: 'Greetings', from: 2160, to: 2180 },
      { number: 34, nameUr: 'الفاظ', nameEn: 'Words & Expressions', from: 2246, to: 2267 },
      { number: 35, nameUr: 'شعر', nameEn: 'Poetry', from: 2255, to: 2261 },
      { number: 36, nameUr: 'خوابیں', nameEn: 'Dreams', from: 2261, to: 2272 },
      { number: 37, nameUr: 'فضائل', nameEn: 'Virtues', from: 2272, to: 2399 },
      { number: 38, nameUr: 'صحابہ کرام', nameEn: 'Companions', from: 2400, to: 2546 },
      { number: 39, nameUr: 'نیکی', nameEn: 'Virtue & Kinship', from: 2547, to: 2624 },
      { number: 40, nameUr: 'قدر', nameEn: 'Divine Decree', from: 2644, to: 2664 },
      { number: 41, nameUr: 'علم', nameEn: 'Knowledge', from: 2673, to: 2694 },
      { number: 42, nameUr: 'ذکر و دعا', nameEn: 'Remembrance & Supplication', from: 2695, to: 2842 },
      { number: 43, nameUr: 'توبہ', nameEn: 'Repentance', from: 2744, to: 2762 },
      { number: 44, nameUr: 'منافقین', nameEn: 'Hypocrites', from: 2777, to: 2800 },
      { number: 45, nameUr: 'جنت', nameEn: 'Paradise', from: 2824, to: 2848 },
      { number: 46, nameUr: 'فتنے', nameEn: 'Tribulations', from: 2880, to: 2955 },
      { number: 47, nameUr: 'تفسیر', nameEn: 'Quran Exegesis', from: 3011, to: 3033 },
      { number: 48, nameUr: 'حدود', nameEn: 'Legal Punishments', from: 1685, to: 1712 },
    ],
  },
  'abu-dawud': {
    nameAr: 'سنن أبي داود',
    nameUr: 'سنن ابی داؤد',
    nameEn: 'Sunan Abu Dawud',
    author: 'Imam Abu Dawud Sulayman ibn al-Ash\'ath',
    authorUr: 'امام ابو داؤد سلیمان بن الاشعث',
    total: 5274,
    color: '#15803d',
    icon: '📗',
    chapters: [
      { number: 1, nameUr: 'طہارت', nameEn: 'Purification', from: 1, to: 390 },
      { number: 2, nameUr: 'نماز', nameEn: 'Prayer', from: 391, to: 1065 },
      { number: 3, nameUr: 'زکوٰۃ', nameEn: 'Zakat', from: 1558, to: 1693 },
      { number: 4, nameUr: 'لقطہ', nameEn: 'Lost Property', from: 1700, to: 1720 },
      { number: 5, nameUr: 'مناسکِ حج', nameEn: 'Rites of Hajj', from: 1723, to: 2006 },
      { number: 6, nameUr: 'نکاح', nameEn: 'Marriage', from: 2049, to: 2268 },
      { number: 7, nameUr: 'طلاق', nameEn: 'Divorce', from: 2169, to: 2313 },
      { number: 8, nameUr: 'روزہ', nameEn: 'Fasting', from: 2314, to: 2455 },
      { number: 9, nameUr: 'جہاد', nameEn: 'Jihad', from: 2469, to: 2880 },
      { number: 10, nameUr: 'قربانی', nameEn: 'Sacrifice', from: 2788, to: 2834 },
      { number: 11, nameUr: 'شکار', nameEn: 'Hunting', from: 2849, to: 2895 },
      { number: 12, nameUr: 'وصیت', nameEn: 'Wills', from: 2863, to: 2878 },
      { number: 13, nameUr: 'وراثت', nameEn: 'Inheritance', from: 2885, to: 2925 },
      { number: 14, nameUr: 'خراج', nameEn: 'Land Tax', from: 3003, to: 3084 },
      { number: 15, nameUr: 'امارت', nameEn: 'Leadership', from: 2608, to: 2790 },
      { number: 16, nameUr: 'قضاء', nameEn: 'Judiciary', from: 3573, to: 3646 },
      { number: 17, nameUr: 'علم', nameEn: 'Knowledge', from: 3641, to: 3681 },
      { number: 18, nameUr: 'مشروبات', nameEn: 'Drinks', from: 3669, to: 3745 },
      { number: 19, nameUr: 'کھانا', nameEn: 'Food', from: 3757, to: 3838 },
      { number: 20, nameUr: 'طب', nameEn: 'Medicine', from: 3855, to: 3967 },
      { number: 21, nameUr: 'دیوانگی', nameEn: 'Divination', from: 3898, to: 3919 },
      { number: 22, nameUr: 'حمام', nameEn: 'Bathing', from: 4000, to: 4014 },
      { number: 23, nameUr: 'لباس', nameEn: 'Dress', from: 4007, to: 4118 },
      { number: 24, nameUr: 'بال', nameEn: 'Hair', from: 4183, to: 4213 },
      { number: 25, nameUr: 'انگوٹھی', nameEn: 'Rings', from: 4215, to: 4236 },
      { number: 26, nameUr: 'خیمہ', nameEn: 'Tents & Houses', from: 4238, to: 4251 },
      { number: 27, nameUr: 'سلام', nameEn: 'Greetings', from: 5195, to: 5228 },
      { number: 28, nameUr: 'آداب', nameEn: 'General Behavior', from: 4800, to: 5000 },
      { number: 29, nameUr: 'حدود', nameEn: 'Prescribed Punishments', from: 4362, to: 4462 },
      { number: 30, nameUr: 'دیت', nameEn: 'Blood Money', from: 4485, to: 4568 },
      { number: 31, nameUr: 'سنت', nameEn: 'Model Behavior', from: 4596, to: 4772 },
      { number: 32, nameUr: 'ملاحم', nameEn: 'Battles', from: 4242, to: 4361 },
      { number: 33, nameUr: 'مہدی', nameEn: 'Mahdi', from: 4282, to: 4296 },
      { number: 34, nameUr: 'فتنے', nameEn: 'Tribulations', from: 4242, to: 4261 },
      { number: 35, nameUr: 'آخرت', nameEn: 'Afterlife', from: 5207, to: 5274 },
    ],
  },
  tirmidhi: {
    nameAr: 'جامع الترمذي',
    nameUr: 'جامع الترمذی',
    nameEn: 'Jami At-Tirmidhi',
    author: 'Imam Abu Isa Muhammad ibn Isa At-Tirmidhi',
    authorUr: 'امام ابو عیسیٰ محمد بن عیسیٰ الترمذی',
    total: 3956,
    color: '#7c3aed',
    icon: '📙',
    chapters: [
      { number: 1, nameUr: 'طہارت', nameEn: 'Purification', from: 1, to: 148 },
      { number: 2, nameUr: 'نماز', nameEn: 'Prayer', from: 149, to: 421 },
      { number: 3, nameUr: 'وتر', nameEn: 'Witr', from: 447, to: 470 },
      { number: 4, nameUr: 'جمعہ', nameEn: 'Friday', from: 488, to: 521 },
      { number: 5, nameUr: 'عیدین', nameEn: 'Eid Prayers', from: 530, to: 539 },
      { number: 6, nameUr: 'سفر کی نماز', nameEn: 'Travel Prayer', from: 544, to: 575 },
      { number: 7, nameUr: 'زکوٰۃ', nameEn: 'Zakat', from: 619, to: 669 },
      { number: 8, nameUr: 'روزہ', nameEn: 'Fasting', from: 682, to: 805 },
      { number: 9, nameUr: 'حج', nameEn: 'Hajj', from: 809, to: 1005 },
      { number: 10, nameUr: 'جنازہ', nameEn: 'Funerals', from: 1021, to: 1073 },
      { number: 11, nameUr: 'نکاح', nameEn: 'Marriage', from: 1074, to: 1218 },
      { number: 12, nameUr: 'طلاق', nameEn: 'Divorce', from: 1185, to: 1205 },
      { number: 13, nameUr: 'تجارت', nameEn: 'Commerce', from: 1206, to: 1320 },
      { number: 14, nameUr: 'قضاء', nameEn: 'Judgments', from: 1330, to: 1380 },
      { number: 15, nameUr: 'دیت', nameEn: 'Blood Money', from: 1382, to: 1441 },
      { number: 16, nameUr: 'حدود', nameEn: 'Legal Punishments', from: 1442, to: 1498 },
      { number: 17, nameUr: 'صید', nameEn: 'Hunting', from: 1465, to: 1497 },
      { number: 18, nameUr: 'قربانی', nameEn: 'Sacrifice', from: 1494, to: 1521 },
      { number: 19, nameUr: 'نذر', nameEn: 'Vows', from: 1535, to: 1560 },
      { number: 20, nameUr: 'آداب', nameEn: 'Good Manners', from: 2736, to: 2861 },
      { number: 21, nameUr: 'لباس', nameEn: 'Dress', from: 1720, to: 1815 },
      { number: 22, nameUr: 'کھانا', nameEn: 'Food', from: 1832, to: 1901 },
      { number: 23, nameUr: 'مشروبات', nameEn: 'Drinks', from: 1861, to: 1919 },
      { number: 24, nameUr: 'طب', nameEn: 'Medicine', from: 2038, to: 2096 },
      { number: 25, nameUr: 'وراثت', nameEn: 'Inheritance', from: 2089, to: 2126 },
      { number: 26, nameUr: 'وصیت', nameEn: 'Wills', from: 2116, to: 2135 },
      { number: 27, nameUr: 'قدر', nameEn: 'Divine Decree', from: 2142, to: 2161 },
      { number: 28, nameUr: 'فتنے', nameEn: 'Tribulations', from: 2185, to: 2240 },
      { number: 29, nameUr: 'قیامت', nameEn: 'Day of Judgment', from: 2307, to: 2430 },
      { number: 30, nameUr: 'جہنم', nameEn: 'Hell', from: 2430, to: 2590 },
      { number: 31, nameUr: 'جنت', nameEn: 'Paradise', from: 2520, to: 2600 },
      { number: 32, nameUr: 'ایمان', nameEn: 'Faith', from: 2608, to: 2684 },
      { number: 33, nameUr: 'علم', nameEn: 'Knowledge', from: 2682, to: 2717 },
      { number: 34, nameUr: 'اجازت', nameEn: 'Permission', from: 2699, to: 2718 },
      { number: 35, nameUr: 'مثالیں', nameEn: 'Parables', from: 2861, to: 2880 },
      { number: 36, nameUr: 'قرآن', nameEn: 'Quran Virtues', from: 2907, to: 2978 },
      { number: 37, nameUr: 'قراءت', nameEn: 'Recitation', from: 2940, to: 2955 },
      { number: 38, nameUr: 'تفسیر', nameEn: 'Quran Commentary', from: 2955, to: 3360 },
      { number: 39, nameUr: 'فضائل', nameEn: 'Virtues of Prophet', from: 3593, to: 3666 },
      { number: 40, nameUr: 'صحابہ', nameEn: 'Companions', from: 3663, to: 3940 },
      { number: 41, nameUr: 'مناقب', nameEn: 'Virtues', from: 3941, to: 3956 },
    ],
  },
  nasai: {
    nameAr: 'سنن النسائي',
    nameUr: 'سنن النسائی',
    nameEn: 'Sunan An-Nasai',
    author: 'Imam Ahmad ibn Shu\'ayb An-Nasai',
    authorUr: 'امام احمد بن شعیب النسائی',
    total: 5758,
    color: '#0369a1',
    icon: '📔',
    chapters: [
      { number: 1, nameUr: 'طہارت', nameEn: 'Purification', from: 1, to: 178 },
      { number: 2, nameUr: 'پانی', nameEn: 'Water', from: 179, to: 378 },
      { number: 3, nameUr: 'حیض', nameEn: 'Menstruation', from: 357, to: 395 },
      { number: 4, nameUr: 'غسل', nameEn: 'Bathing', from: 395, to: 442 },
      { number: 5, nameUr: 'وضو', nameEn: 'Ablution', from: 83, to: 178 },
      { number: 6, nameUr: 'تیمم', nameEn: 'Dry Ablution', from: 441, to: 479 },
      { number: 7, nameUr: 'نماز', nameEn: 'Prayer', from: 479, to: 1372 },
      { number: 8, nameUr: 'قبلہ', nameEn: 'Qibla', from: 743, to: 769 },
      { number: 9, nameUr: 'اذان', nameEn: 'Call to Prayer', from: 625, to: 709 },
      { number: 10, nameUr: 'مساجد', nameEn: 'Mosques', from: 693, to: 745 },
      { number: 11, nameUr: 'جمعہ', nameEn: 'Friday Prayer', from: 1374, to: 1432 },
      { number: 12, nameUr: 'کسوف', nameEn: 'Eclipse Prayer', from: 1459, to: 1498 },
      { number: 13, nameUr: 'استسقاء', nameEn: 'Rain Prayer', from: 1506, to: 1527 },
      { number: 14, nameUr: 'خوف', nameEn: 'Fear Prayer', from: 1528, to: 1555 },
      { number: 15, nameUr: 'عیدین', nameEn: 'Eid Prayers', from: 1556, to: 1601 },
      { number: 16, nameUr: 'جنازہ', nameEn: 'Funerals', from: 1831, to: 2081 },
      { number: 17, nameUr: 'روزہ', nameEn: 'Fasting', from: 2084, to: 2394 },
      { number: 18, nameUr: 'زکوٰۃ', nameEn: 'Zakat', from: 2435, to: 2584 },
      { number: 19, nameUr: 'حج', nameEn: 'Hajj', from: 2628, to: 3082 },
      { number: 20, nameUr: 'جہاد', nameEn: 'Jihad', from: 3083, to: 3216 },
      { number: 21, nameUr: 'نکاح', nameEn: 'Marriage', from: 3218, to: 3434 },
      { number: 22, nameUr: 'طلاق', nameEn: 'Divorce', from: 3393, to: 3636 },
      { number: 23, nameUr: 'گھوڑے', nameEn: 'Horses', from: 3560, to: 3596 },
      { number: 24, nameUr: 'وقف', nameEn: 'Endowments', from: 3598, to: 3642 },
      { number: 25, nameUr: 'وصیت', nameEn: 'Wills', from: 3639, to: 3671 },
      { number: 26, nameUr: 'عطایا', nameEn: 'Gifts', from: 3671, to: 3762 },
      { number: 27, nameUr: 'بیعت', nameEn: 'Pledging Allegiance', from: 4144, to: 4183 },
      { number: 28, nameUr: 'قضاء', nameEn: 'Judgment', from: 5387, to: 5429 },
      { number: 29, nameUr: 'قسم', nameEn: 'Oaths', from: 3770, to: 3830 },
      { number: 30, nameUr: 'صید', nameEn: 'Hunting', from: 4288, to: 4332 },
      { number: 31, nameUr: 'ذبح', nameEn: 'Slaughter', from: 4381, to: 4434 },
      { number: 32, nameUr: 'اشربہ', nameEn: 'Drinks', from: 5583, to: 5719 },
      { number: 33, nameUr: 'ایمان', nameEn: 'Faith', from: 4977, to: 5040 },
      { number: 34, nameUr: 'آداب', nameEn: 'Manners', from: 5041, to: 5093 },
      { number: 35, nameUr: 'تحریم', nameEn: 'Forbidden Matters', from: 5758, to: 5758 },
    ],
  },
  'ibn-majah': {
    nameAr: 'سنن ابن ماجه',
    nameUr: 'سنن ابن ماجہ',
    nameEn: 'Sunan Ibn Majah',
    author: 'Imam Muhammad ibn Yazid ibn Majah',
    authorUr: 'امام محمد بن یزید بن ماجہ',
    total: 4341,
    color: '#b45309',
    icon: '📒',
    chapters: [
      { number: 1, nameUr: 'مقدمہ', nameEn: 'Introduction', from: 1, to: 224 },
      { number: 2, nameUr: 'طہارت', nameEn: 'Purification', from: 267, to: 664 },
      { number: 3, nameUr: 'نماز', nameEn: 'Prayer', from: 672, to: 1085 },
      { number: 4, nameUr: 'اذان', nameEn: 'Call to Prayer', from: 706, to: 742 },
      { number: 5, nameUr: 'مساجد', nameEn: 'Mosques', from: 739, to: 809 },
      { number: 6, nameUr: 'اقامت نماز', nameEn: 'Establishing Prayer', from: 810, to: 1084 },
      { number: 7, nameUr: 'جنازہ', nameEn: 'Funerals', from: 1458, to: 1591 },
      { number: 8, nameUr: 'روزہ', nameEn: 'Fasting', from: 1641, to: 1790 },
      { number: 9, nameUr: 'زکوٰۃ', nameEn: 'Zakat', from: 1791, to: 1899 },
      { number: 10, nameUr: 'نکاح', nameEn: 'Marriage', from: 1846, to: 2087 },
      { number: 11, nameUr: 'طلاق', nameEn: 'Divorce', from: 2016, to: 2107 },
      { number: 12, nameUr: 'کفارہ', nameEn: 'Expiation', from: 2113, to: 2135 },
      { number: 13, nameUr: 'تجارت', nameEn: 'Commerce', from: 2143, to: 2323 },
      { number: 14, nameUr: 'احکام', nameEn: 'Rulings', from: 2304, to: 2381 },
      { number: 15, nameUr: 'صدقات', nameEn: 'Charity', from: 2382, to: 2410 },
      { number: 16, nameUr: 'رہن', nameEn: 'Pledges', from: 2438, to: 2454 },
      { number: 17, nameUr: 'شفعہ', nameEn: 'Pre-emption', from: 2494, to: 2503 },
      { number: 18, nameUr: 'لقطہ', nameEn: 'Lost Property', from: 2504, to: 2512 },
      { number: 19, nameUr: 'عتق', nameEn: 'Manumission', from: 2512, to: 2531 },
      { number: 20, nameUr: 'حدود', nameEn: 'Legal Punishments', from: 2532, to: 2620 },
      { number: 21, nameUr: 'دیت', nameEn: 'Blood Money', from: 2621, to: 2692 },
      { number: 22, nameUr: 'وصایا', nameEn: 'Wills', from: 2699, to: 2718 },
      { number: 23, nameUr: 'جہاد', nameEn: 'Jihad', from: 2753, to: 2877 },
      { number: 24, nameUr: 'شکار', nameEn: 'Hunting', from: 3178, to: 3228 },
      { number: 25, nameUr: 'قربانی', nameEn: 'Sacrifice', from: 3120, to: 3177 },
      { number: 26, nameUr: 'ذبائح', nameEn: 'Slaughter', from: 3166, to: 3202 },
      { number: 27, nameUr: 'کھانا', nameEn: 'Food', from: 3282, to: 3378 },
      { number: 28, nameUr: 'مشروبات', nameEn: 'Drinks', from: 3379, to: 3441 },
      { number: 29, nameUr: 'طب', nameEn: 'Medicine', from: 3436, to: 3544 },
      { number: 30, nameUr: 'لباس', nameEn: 'Dress', from: 3551, to: 3648 },
      { number: 31, nameUr: 'آداب', nameEn: 'Manners', from: 3649, to: 3760 },
      { number: 32, nameUr: 'دعا', nameEn: 'Supplication', from: 3830, to: 3898 },
      { number: 33, nameUr: 'تعبیر', nameEn: 'Dream Interpretation', from: 3899, to: 3921 },
      { number: 34, nameUr: 'فتنے', nameEn: 'Tribulations', from: 3952, to: 4087 },
      { number: 35, nameUr: 'زہد', nameEn: 'Asceticism', from: 4100, to: 4341 },
    ],
  },
};

// ─── Cache helpers ─────────────────────────────────────────
const CACHE_PREFIX = 'hadith_api_v2_';
const CACHE_TTL = 30 * 24 * 60 * 60 * 1000; // 30 days

export const getFromCache = (key: string): APIHadithPage | null => {
  try {
    const raw = localStorage.getItem(CACHE_PREFIX + key);
    if (!raw) return null;
    const d: APIHadithPage = JSON.parse(raw);
    if (Date.now() - d.fetchedAt > CACHE_TTL) { localStorage.removeItem(CACHE_PREFIX + key); return null; }
    return d;
  } catch { return null; }
};

export const saveToCache = (key: string, data: APIHadithPage) => {
  try {
    localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(data));
  } catch {
    // Storage quota exceeded — clear oldest entries
    try {
      const keys = Object.keys(localStorage).filter(k => k.startsWith(CACHE_PREFIX));
      if (keys.length > 20) { keys.slice(0, 5).forEach(k => localStorage.removeItem(k)); }
      localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(data));
    } catch { /* silent */ }
  }
};

// ─── Hook ─────────────────────────────────────────────────
export function useHadithAPI() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch hadiths from a specific book with range
   * @param bookSlug - book identifier
   * @param start - start hadith number (1-based)
   * @param end - end hadith number
   */
  const fetchHadiths = useCallback(async (
    bookSlug: BookSlug,
    start: number,
    end: number
  ): Promise<APIHadithPage | null> => {
    const cacheKey = `${bookSlug}_${start}_${end}`;
    const cached = getFromCache(cacheKey);
    if (cached) return cached;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `https://api.hadith.gading.dev/books/${bookSlug}?range=${start}-${end}`,
        { signal: AbortSignal.timeout(15000) }
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      if (!json.data) throw new Error('No data returned');

      const meta = HADITH_BOOKS_META[bookSlug];
      const page: APIHadithPage = {
        bookSlug,
        bookName: meta.nameEn,
        bookNameUr: meta.nameUr,
        hadiths: json.data.hadiths || [],
        totalHadiths: json.data.range?.total || meta.total,
        currentRange: { start, end },
        fetchedAt: Date.now(),
      };

      saveToCache(cacheKey, page);
      return page;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Network error';
      setError(msg);
      toast.error(`Failed to load ${HADITH_BOOKS_META[bookSlug]?.nameUr} — Check internet connection`);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Search hadiths across a book (fetches larger batches)
   */
  const searchInBook = useCallback(async (
    bookSlug: BookSlug,
    query: string,
    pageSize = 200
  ): Promise<APIHadith[]> => {
    const meta = HADITH_BOOKS_META[bookSlug];
    const results: APIHadith[] = [];
    const q = query.toLowerCase();

    // Fetch first batch to search
    const page = await fetchHadiths(bookSlug, 1, Math.min(pageSize, meta.total));
    if (!page) return [];

    return page.hadiths.filter(h =>
      h.arab.includes(query) || h.id?.toLowerCase().includes(q)
    );
  }, [fetchHadiths]);

  const clearHadithCache = useCallback(() => {
    const keys = Object.keys(localStorage).filter(k => k.startsWith(CACHE_PREFIX));
    keys.forEach(k => localStorage.removeItem(k));
    toast.success(`Hadith cache cleared — ${keys.length} entries removed`);
  }, []);

  const getHadithCacheStats = useCallback(() => {
    const keys = Object.keys(localStorage).filter(k => k.startsWith(CACHE_PREFIX));
    return { cachedPages: keys.length };
  }, []);

  return { fetchHadiths, searchInBook, loading, error, clearHadithCache, getHadithCacheStats };
}
