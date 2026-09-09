export type LanguageCode =
  | 'ar'
  | 'ur'
  | 'en'
  | 'fa'
  | 'bn'
  | 'sd'
  | 'bal'
  | 'ps'
  | 'hi'
  | 'tr'
  | 'ru'
  | 'zh'
  | 'ja';

export interface LanguageInfo {
  code: LanguageCode;
  name: string;
  nativeName: string;
  dir: 'ltr' | 'rtl';
  flag: string;
}

export interface HadeesTranslations {
  ar: string;
  ur?: string;
  en?: string;
  fa?: string;
  bn?: string;
  sd?: string;
  bal?: string;
  ps?: string;
  hi?: string;
  tr?: string;
  ru?: string;
  zh?: string;
  ja?: string;
}

export interface Hadees {
  id: string;
  arabic: string;
  narrator: string;
  source: string;
  bookNumber?: string;
  hadithNumber?: string;
  translations: HadeesTranslations;
  category: string;
  tags: string[];
  bookmarked?: boolean;
}

export interface Background {
  id: string;
  name: string;
  nameUr: string;
  style: React.CSSProperties;
  className?: string;
  description: string;
  descriptionUr: string;
  accentColor: string;
}

export interface AppSettings {
  selectedBackground: string;
  primaryLanguage: LanguageCode;
  secondaryLanguage: LanguageCode;
  fontSize: 'sm' | 'md' | 'lg' | 'xl';
  showArabic: boolean;
  bookmarks: string[];
  // Customization
  fontFamily: 'amiri' | 'noto' | 'inter' | 'scheherazade';
  accentColor: 'red' | 'blue' | 'green' | 'gold' | 'purple' | 'teal';
  animationLevel: 'off' | 'low' | 'medium' | 'high';
  displayTexture: 'glass' | 'solid' | 'frosted' | 'neon' | 'crystal';
  cardStyle: 'default' | 'minimal' | 'bordered' | 'glow' | 'shadow';
  showNarrator: boolean;
  showTags: boolean;
  darkMode: boolean;
}

export type CategoryKey =
  | 'faith'
  | 'prayer'
  | 'character'
  | 'knowledge'
  | 'charity'
  | 'family'
  | 'social'
  | 'worship'
  | 'etiquette'
  | 'patience';
