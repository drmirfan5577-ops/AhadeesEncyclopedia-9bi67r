import { LanguageInfo, LanguageCode } from '@/types';

export const LANGUAGES: LanguageInfo[] = [
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', dir: 'rtl', flag: '🇸🇦' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', dir: 'rtl', flag: '🇵🇰' },
  { code: 'en', name: 'English', nativeName: 'English', dir: 'ltr', flag: '🇬🇧' },
  { code: 'fa', name: 'Persian', nativeName: 'فارسی', dir: 'rtl', flag: '🇮🇷' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', dir: 'ltr', flag: '🇧🇩' },
  { code: 'sd', name: 'Sindhi', nativeName: 'سنڌي', dir: 'rtl', flag: '🇵🇰' },
  { code: 'bal', name: 'Balochi', nativeName: 'بلوچی', dir: 'rtl', flag: '🇵🇰' },
  { code: 'ps', name: 'Pashto', nativeName: 'پښتو', dir: 'rtl', flag: '🇦🇫' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', dir: 'ltr', flag: '🇮🇳' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', dir: 'ltr', flag: '🇹🇷' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', dir: 'ltr', flag: '🇷🇺' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', dir: 'ltr', flag: '🇨🇳' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', dir: 'ltr', flag: '🇯🇵' },
];

export const getLanguage = (code: LanguageCode): LanguageInfo =>
  LANGUAGES.find((l) => l.code === code) || LANGUAGES[0];

export const CATEGORY_LABELS: Record<string, Record<string, string>> = {
  en: {
    faith: 'Faith & Belief',
    prayer: 'Prayer & Worship',
    character: 'Good Character',
    knowledge: 'Knowledge & Wisdom',
    charity: 'Charity & Giving',
    family: 'Family & Relations',
    social: 'Social Conduct',
    worship: 'Acts of Worship',
    etiquette: 'Islamic Etiquette',
    patience: 'Patience & Gratitude',
  },
  ur: {
    faith: 'ایمان و عقیدہ',
    prayer: 'نماز و عبادت',
    character: 'حسنِ اخلاق',
    knowledge: 'علم و حکمت',
    charity: 'صدقہ و خیرات',
    family: 'خاندان و رشتے',
    social: 'معاشرتی آداب',
    worship: 'عبادات',
    etiquette: 'اسلامی آداب',
    patience: 'صبر و شکر',
  },
};
