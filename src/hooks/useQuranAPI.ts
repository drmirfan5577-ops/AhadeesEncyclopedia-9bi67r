// ============================================================
// AHADEES ENCYCLOPEDIA — AL-QURAN CLOUD API HOOK
// Source: api.alquran.cloud (Free, No API Key Required)
// Caching: localStorage with 7-day TTL
// Translations: Arabic, Urdu (3 scholars), English (Saheeh Int.)
// EvEr SmArT-wOrLd | Dr M Irfan Qadir Thaheem
// ============================================================

import { useState, useCallback } from 'react';
import { toast } from 'sonner';

export interface APIAyah {
  number: number;           // Global ayah number (1–6236)
  numberInSurah: number;    // Ayah number within surah
  arabic: string;           // Arabic text (Uthmani script)
  urdu_jalandhry: string;   // Fateh Muhammad Jalandhri
  urdu_junagarhi: string;   // Muhammad Junagarhi
  urdu_maududi: string;     // Sayyid Abu Ala Maududi
  english: string;          // Saheeh International
  juz: number;
  page: number;
  sajda: boolean | { id: number; recommended: boolean; obligatory: boolean };
  hizbQuarter: number;
}

export interface APISurahData {
  surahNumber: number;
  name: string;
  englishName: string;
  numberOfAyahs: number;
  revelationType: string;
  ayahs: APIAyah[];
  fetchedAt: number;
}

// API editions to fetch simultaneously
const EDITIONS = 'quran-uthmani,ur.jalandhry,ur.junagarhi,ur.maududi,en.sahih';
const CACHE_PREFIX = 'quran_api_v3_s';
const CACHE_TTL = 14 * 24 * 60 * 60 * 1000; // 14 days

const getFromCache = (surahNumber: number): APISurahData | null => {
  try {
    const raw = localStorage.getItem(`${CACHE_PREFIX}${surahNumber}`);
    if (!raw) return null;
    const data: APISurahData = JSON.parse(raw);
    if (Date.now() - data.fetchedAt > CACHE_TTL) {
      localStorage.removeItem(`${CACHE_PREFIX}${surahNumber}`);
      return null;
    }
    return data;
  } catch {
    return null;
  }
};

const saveToCache = (surahNumber: number, data: APISurahData) => {
  try {
    localStorage.setItem(`${CACHE_PREFIX}${surahNumber}`, JSON.stringify(data));
  } catch {
    // Storage full — clear old caches
    try {
      const keys = Object.keys(localStorage).filter((k) => k.startsWith(CACHE_PREFIX));
      if (keys.length > 5) {
        keys.slice(0, 3).forEach((k) => localStorage.removeItem(k));
        localStorage.setItem(`${CACHE_PREFIX}${surahNumber}`, JSON.stringify(data));
      }
    } catch { /* silent */ }
  }
};

export function useQuranAPI() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSurah = useCallback(async (surahNumber: number): Promise<APISurahData | null> => {
    // Serve from cache if fresh
    const cached = getFromCache(surahNumber);
    if (cached) return cached;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `https://api.alquran.cloud/v1/surah/${surahNumber}/editions/${EDITIONS}`,
        { signal: AbortSignal.timeout(15000) }
      );

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      if (json.code !== 200) throw new Error('API error');

      // json.data is array: [arabic, jalandhry, junagarhi, maududi, english]
      const [arabicEdition, jalandhryEd, junagarhi, maududiEd, englishEd] = json.data as any[];

      const ayahs: APIAyah[] = arabicEdition.ayahs.map((a: any, i: number) => ({
        number: a.number,
        numberInSurah: a.numberInSurah,
        arabic: a.text,
        urdu_jalandhry: jalandhryEd.ayahs[i]?.text ?? '',
        urdu_junagarhi: junagarhi.ayahs[i]?.text ?? '',
        urdu_maududi: maududiEd.ayahs[i]?.text ?? '',
        english: englishEd.ayahs[i]?.text ?? '',
        juz: a.juz,
        page: a.page,
        sajda: a.sajda,
        hizbQuarter: a.hizbQuarter,
      }));

      const data: APISurahData = {
        surahNumber,
        name: arabicEdition.name,
        englishName: arabicEdition.englishName,
        numberOfAyahs: arabicEdition.numberOfAyahs,
        revelationType: arabicEdition.revelationType,
        ayahs,
        fetchedAt: Date.now(),
      };

      saveToCache(surahNumber, data);
      return data;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Network error';
      setError(msg);
      toast.error(`Failed to load Surah — ${msg}. Check internet connection.`);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearCache = useCallback(() => {
    const keys = Object.keys(localStorage).filter((k) => k.startsWith(CACHE_PREFIX));
    keys.forEach((k) => localStorage.removeItem(k));
    toast.success(`Cache cleared — ${keys.length} Surahs removed`);
  }, []);

  const getCacheStats = useCallback(() => {
    const keys = Object.keys(localStorage).filter((k) => k.startsWith(CACHE_PREFIX));
    return { cachedSurahs: keys.length, totalSurahs: 114 };
  }, []);

  return { fetchSurah, loading, error, clearCache, getCacheStats };
}
