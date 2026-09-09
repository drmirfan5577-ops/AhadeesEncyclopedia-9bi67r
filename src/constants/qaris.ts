// ============================================================
// AHADEES ENCYCLOPEDIA — QURAN QARIS / RECITERS DATABASE
// 22+ Verified & Authenticated Qaris from Islamic Network CDN
// Audio Source: cdn.islamic.network (Free, No API Key Required)
// EvEr SmArT-wOrLd | Dr M Irfan Qadir Thaheem | eversmart/drirfan
// ============================================================

export interface Qari {
  id: string;
  name: string;
  nameAr: string;
  nameUr: string;
  edition: string;
  country: string;
  countryCode: string;
  style: 'Murattal' | 'Mujawwad' | 'Muallim';
  description: string;
  color: string;
}

export const QARIS: Qari[] = [
  {
    id: 'alafasy',
    name: 'Mishary Rashid Alafasy',
    nameAr: 'مشاري راشد العفاسي',
    nameUr: 'مشاری راشد العفاسی',
    edition: 'ar.alafasy',
    country: 'Kuwait',
    countryCode: '🇰🇼',
    style: 'Murattal',
    description: 'Most popular worldwide • عالمی مقبول ترین',
    color: '#7c3aed',
  },
  {
    id: 'sudais',
    name: 'Abdul Rahman Al-Sudais',
    nameAr: 'عبد الرحمن السديس',
    nameUr: 'عبدالرحمن السدیس',
    edition: 'ar.abdurrahmaansudais',
    country: 'Saudi Arabia',
    countryCode: '🇸🇦',
    style: 'Murattal',
    description: 'Imam of Masjid al-Haram, Makkah',
    color: '#dc2626',
  },
  {
    id: 'husary',
    name: 'Mahmoud Khalil Al-Husary',
    nameAr: 'محمود خليل الحصري',
    nameUr: 'محمود خلیل الحصری',
    edition: 'ar.husary',
    country: 'Egypt',
    countryCode: '🇪🇬',
    style: 'Murattal',
    description: 'Legendary Egyptian reciter • مصری افسانوی قاری',
    color: '#d97706',
  },
  {
    id: 'minshawi',
    name: 'Mohamed Siddiq El-Minshawi',
    nameAr: 'محمد صديق المنشاوي',
    nameUr: 'محمد صدیق المنشاوی',
    edition: 'ar.minshawi',
    country: 'Egypt',
    countryCode: '🇪🇬',
    style: 'Murattal',
    description: 'Master reciter of 20th century',
    color: '#0369a1',
  },
  {
    id: 'shaatree',
    name: 'Abu Bakr Al-Shatri',
    nameAr: 'أبو بكر الشاطري',
    nameUr: 'ابو بکر الشاطری',
    edition: 'ar.shaatree',
    country: 'Saudi Arabia',
    countryCode: '🇸🇦',
    style: 'Murattal',
    description: 'Beautiful melodious recitation',
    color: '#15803d',
  },
  {
    id: 'basfar',
    name: 'Abdullah Basfar',
    nameAr: 'عبد الله بصفر',
    nameUr: 'عبداللہ بصفر',
    edition: 'ar.abdullahbasfar',
    country: 'Saudi Arabia',
    countryCode: '🇸🇦',
    style: 'Murattal',
    description: 'Clear tajweed recitation',
    color: '#be123c',
  },
  {
    id: 'hanirifai',
    name: 'Hani Ar-Rifai',
    nameAr: 'هاني الرفاعي',
    nameUr: 'ہانی الرفاعی',
    edition: 'ar.hanirifai',
    country: 'Saudi Arabia',
    countryCode: '🇸🇦',
    style: 'Murattal',
    description: 'Calm soothing voice',
    color: '#0f766e',
  },
  {
    id: 'maher',
    name: 'Maher Al-Muaiqly',
    nameAr: 'ماهر المعيقلي',
    nameUr: 'ماہر المعیقلی',
    edition: 'ar.mahermuaiqly',
    country: 'Saudi Arabia',
    countryCode: '🇸🇦',
    style: 'Murattal',
    description: 'Current Imam of Masjid al-Haram',
    color: '#4f46e5',
  },
  {
    id: 'shuraym',
    name: 'Saood Ash-Shuraym',
    nameAr: 'سعود الشريم',
    nameUr: 'سعود الشریم',
    edition: 'ar.saoodshuraym',
    country: 'Saudi Arabia',
    countryCode: '🇸🇦',
    style: 'Murattal',
    description: 'Imam of Masjid al-Haram',
    color: '#9333ea',
  },
  {
    id: 'ghamadi',
    name: "Sa'd Al-Ghamdi",
    nameAr: 'سعد الغامدي',
    nameUr: 'سعد الغامدی',
    edition: 'ar.ghamadi',
    country: 'Saudi Arabia',
    countryCode: '🇸🇦',
    style: 'Murattal',
    description: 'Distinctive powerful voice',
    color: '#c2410c',
  },
  {
    id: 'muhammadayyoub',
    name: 'Muhammad Ayyub',
    nameAr: 'محمد أيوب',
    nameUr: 'محمد ایوب',
    edition: 'ar.muhammadayyoub',
    country: 'Saudi Arabia',
    countryCode: '🇸🇦',
    style: 'Murattal',
    description: 'Former Imam of Masjid An-Nabawi',
    color: '#1d4ed8',
  },
  {
    id: 'muhammadjibreel',
    name: 'Muhammad Jibreel',
    nameAr: 'محمد جبريل',
    nameUr: 'محمد جبریل',
    edition: 'ar.muhammadjibreel',
    country: 'Egypt',
    countryCode: '🇪🇬',
    style: 'Murattal',
    description: 'Moving emotional recitation',
    color: '#7c3aed',
  },
  {
    id: 'husarymujawwad',
    name: 'Al-Husary (Mujawwad)',
    nameAr: 'الحصري المجود',
    nameUr: 'الحصری مجود',
    edition: 'ar.husarymujawwad',
    country: 'Egypt',
    countryCode: '🇪🇬',
    style: 'Mujawwad',
    description: 'Mujawwad classical masterpiece',
    color: '#b45309',
  },
  {
    id: 'minshawimujawwad',
    name: 'El-Minshawi (Mujawwad)',
    nameAr: 'المنشاوي المجود',
    nameUr: 'المنشاوی مجود',
    edition: 'ar.minshawimujawwad',
    country: 'Egypt',
    countryCode: '🇪🇬',
    style: 'Mujawwad',
    description: 'Mujawwad classical style',
    color: '#0369a1',
  },
  {
    id: 'ibrahimakhdar',
    name: 'Ibrahim Al-Akhdar',
    nameAr: 'إبراهيم الأخضر',
    nameUr: 'ابراہیم الاخضر',
    edition: 'ar.ibrahimakhdar',
    country: 'Saudi Arabia',
    countryCode: '🇸🇦',
    style: 'Murattal',
    description: 'Imam of Masjid An-Nabawi',
    color: '#15803d',
  },
  {
    id: 'aymanswoaid',
    name: 'Ayman Sowaid',
    nameAr: 'أيمن سويد',
    nameUr: 'ایمن سوید',
    edition: 'ar.aymanswoaid',
    country: 'Saudi Arabia',
    countryCode: '🇸🇦',
    style: 'Murattal',
    description: 'Scholar & certified reciter',
    color: '#dc2626',
  },
  {
    id: 'fares',
    name: 'Fares Abbad',
    nameAr: 'فارس عباد',
    nameUr: 'فارس عباد',
    edition: 'ar.fares',
    country: 'Algeria',
    countryCode: '🇩🇿',
    style: 'Murattal',
    description: 'Algerian recitation style',
    color: '#6d28d9',
  },
  {
    id: 'khalid',
    name: 'Khalid Al-Qahtani',
    nameAr: 'خالد القحطاني',
    nameUr: 'خالد القحطانی',
    edition: 'ar.khalid',
    country: 'Saudi Arabia',
    countryCode: '🇸🇦',
    style: 'Murattal',
    description: 'Rhythmic clear recitation',
    color: '#0f766e',
  },
  {
    id: 'wadee',
    name: "Wadi' Al-Yamani",
    nameAr: 'وادي اليمني',
    nameUr: 'وادی الیمنی',
    edition: 'ar.wadee',
    country: 'Yemen',
    countryCode: '🇾🇪',
    style: 'Murattal',
    description: 'Yemeni recitation style',
    color: '#1d4ed8',
  },
  {
    id: 'parhizgar',
    name: 'Parhizgar',
    nameAr: 'بارهيزكار',
    nameUr: 'پرہیزگار',
    edition: 'ar.parhizgar',
    country: 'Iran',
    countryCode: '🇮🇷',
    style: 'Murattal',
    description: 'Persian style recitation',
    color: '#be123c',
  },
  {
    id: 'sahl',
    name: 'Sahl Yaseen',
    nameAr: 'سهل ياسين',
    nameUr: 'سہل یاسین',
    edition: 'ar.sahl',
    country: 'Saudi Arabia',
    countryCode: '🇸🇦',
    style: 'Murattal',
    description: 'Clear educational recitation',
    color: '#d97706',
  },
  {
    id: 'jakaria',
    name: 'Zakaria Al-Agamy',
    nameAr: 'زكريا العجمي',
    nameUr: 'زکریا العجمی',
    edition: 'ar.jakaria',
    country: 'Saudi Arabia',
    countryCode: '🇸🇦',
    style: 'Murattal',
    description: 'Soft melodious voice',
    color: '#7c3aed',
  },
];

// ============================================================
// AUDIO URL BUILDERS — Islamic Network CDN
// Bitrates: 64 (Standard) | 128 (HD) | 192 (UHD)
// ============================================================

export type AudioQuality = 64 | 128 | 192;

/**
 * Full Surah audio URL (MP3 stream)
 * Quality: 64=Standard, 128=HD, 192=UHD Plus
 */
export const getSurahAudioUrl = (
  edition: string,
  surahNumber: number,
  bitrate: AudioQuality = 128
): string =>
  `https://cdn.islamic.network/quran/audio-surah/${bitrate}/${edition}/${surahNumber}.mp3`;

/**
 * Individual Ayah audio URL (MP3)
 * globalAyahNumber: 1–6236 (continuous numbering)
 */
export const getAyahAudioUrl = (
  edition: string,
  globalAyahNumber: number,
  bitrate: AudioQuality = 128
): string =>
  `https://cdn.islamic.network/quran/audio/${bitrate}/${edition}/${globalAyahNumber}.mp3`;

export const QUALITY_LABELS: Record<AudioQuality, string> = {
  64: 'Standard',
  128: 'HD • 128kbps',
  192: 'UHD Plus • 192kbps',
};
