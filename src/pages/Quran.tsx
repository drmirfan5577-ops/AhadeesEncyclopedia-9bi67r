import { useState, useMemo, useCallback } from 'react';
import { Search, X, Volume2, Printer, Share2, BookOpen, ChevronDown, ChevronUp, Globe, Wifi, WifiOff } from 'lucide-react';
import { BACKGROUNDS } from '@/constants/backgrounds';
import { useAppSettings } from '@/hooks/useAppSettings';
import ParticleEffect from '@/components/features/ParticleEffect';
import Navbar from '@/components/layout/Navbar';
import FloatingSidebar from '@/components/features/FloatingSidebar';
import QuranRadio from '@/components/features/QuranRadio';
import { QURAN_SURAHS, QuranSurah } from '@/constants/quranData';
import { useQuranAPI, APIAyah, APISurahData } from '@/hooks/useQuranAPI';
import { toast } from 'sonner';

type TransKey = 'urdu_jalandhry' | 'urdu_junagarhi' | 'urdu_maududi' | 'english';

const TRANS_OPTIONS: { key: TransKey; label: string; labelUr: string; dir: 'rtl' | 'ltr'; color: string }[] = [
  { key: 'urdu_jalandhry', label: 'Jalandhari', labelUr: 'جالندھری', dir: 'rtl', color: '#7c3aed' },
  { key: 'urdu_junagarhi', label: 'Junagarhi', labelUr: 'جوناگڑھی', dir: 'rtl', color: '#15803d' },
  { key: 'urdu_maududi', label: 'Maududi', labelUr: 'مودودی', dir: 'rtl', color: '#d97706' },
  { key: 'english', label: 'Saheeh Intl.', labelUr: 'صحیح انٹرنیشنل', dir: 'ltr', color: '#0369a1' },
];

function LoadingSkeleton() {
  return (
    <div className="space-y-3">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="hadees-card p-4 animate-pulse" style={{ animationDelay: `${i * 100}ms` }}>
          <div className="h-4 rounded-lg mb-2" style={{ background: 'rgba(21,128,61,0.08)', width: '30%' }} />
          <div className="h-8 rounded-lg mb-3" style={{ background: 'rgba(21,128,61,0.06)', width: '100%' }} />
          <div className="h-3 rounded-lg mb-1" style={{ background: 'rgba(0,0,0,0.04)', width: '85%' }} />
          <div className="h-3 rounded-lg" style={{ background: 'rgba(0,0,0,0.04)', width: '70%' }} />
        </div>
      ))}
      <div className="text-center py-4">
        <div className="w-6 h-6 rounded-full border-2 border-green-600 border-t-transparent animate-spin mx-auto mb-2" />
        <p className="text-xs text-gray-500 font-medium">AlQuran.cloud سے آیات لوڈ ہو رہی ہیں…</p>
        <p className="text-[10px] text-gray-400 mt-0.5">Loading from AlQuran.cloud API</p>
      </div>
    </div>
  );
}

function AyahCard({
  ayah, surah, activeTranslations, onSpeak,
}: {
  ayah: APIAyah;
  surah: QuranSurah;
  activeTranslations: TransKey[];
  onSpeak: (text: string, lang: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);

  const printAyah = () => {
    const w = window.open('', '_blank');
    if (!w) return;
    w.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>${surah.nameUr} ${ayah.numberInSurah}</title>
    <link href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Inter:wght@400;600&display=swap" rel="stylesheet">
    <style>body{font-family:Inter,sans-serif;padding:40px;max-width:700px;margin:auto}.header{text-align:center;border-bottom:3px solid #15803d;padding-bottom:16px;margin-bottom:20px}
    .arabic{font-family:Amiri,serif;font-size:28px;line-height:2.2;background:#f0fdf4;padding:20px;border-radius:12px;border:1px solid #bbf7d0;direction:rtl;text-align:right;margin:16px 0}
    .trans{padding:12px;border-radius:8px;background:#f0fdf4;border:1px solid #bbf7d0;margin:8px 0;font-size:15px;line-height:1.8}
    .footer{text-align:center;margin-top:24px;font-size:11px;color:#aaa;border-top:1px solid #eee;padding-top:12px}</style></head>
    <body><div class="header"><h2 style="color:#15803d">${surah.nameAr} — ${surah.nameUr}</h2>
    <p style="font-size:13px;color:#6b7280">آیت ${ayah.numberInSurah} | Ayah ${ayah.numberInSurah} | Juz ${ayah.juz} | Page ${ayah.page}</p></div>
    <div class="arabic">${ayah.arabic}</div>
    <div class="trans" style="direction:rtl;text-align:right">${ayah.urdu_jalandhry} <small style="color:#7c3aed">(جالندھری)</small></div>
    <div class="trans" style="direction:rtl;text-align:right">${ayah.urdu_junagarhi} <small style="color:#15803d">(جوناگڑھی)</small></div>
    <div class="trans" style="direction:rtl;text-align:right">${ayah.urdu_maududi} <small style="color:#d97706">(مودودی)</small></div>
    <div class="trans" style="direction:ltr;text-align:left">${ayah.english} <small style="color:#0369a1">(Saheeh International)</small></div>
    <div class="footer">Ahadees Encyclopedia • EvEr SmArT-wOrLd • eversmart/drirfan</div></body></html>`);
    w.document.close();
    setTimeout(() => { w.print(); w.close(); }, 500);
  };

  const shareAyah = () => {
    const text = `${ayah.arabic}\n\n${ayah.urdu_jalandhry}\n\n${ayah.english}\n\n— ${surah.nameUr} ${surah.nameAr} آیت ${ayah.numberInSurah}\n\nAhadees Encyclopedia | eversmart/drirfan`;
    if (navigator.share) navigator.share({ title: `${surah.name} ${ayah.numberInSurah}`, text });
    else navigator.clipboard.writeText(text).then(() => toast.success('Copied!'));
  };

  return (
    <div className="hadees-card p-4 mb-3" style={{ border: '1.5px solid rgba(21,128,61,0.2)' }}>
      {/* Ayah Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-2 py-0.5 rounded-full"
            style={{ background: 'rgba(21,128,61,0.1)', color: '#15803d', border: '1px solid rgba(21,128,61,0.2)' }}>
            {ayah.numberInSurah}
          </span>
          {ayah.juz && (
            <span className="text-[10px] px-1.5 py-0.5 rounded-full" style={{ background: 'rgba(0,0,0,0.04)', color: '#9ca3af' }}>
              پارہ {ayah.juz}
            </span>
          )}
          {ayah.sajda && (
            <span className="text-[10px] px-1.5 py-0.5 rounded-full font-bold" style={{ background: 'rgba(220,38,38,0.08)', color: '#dc2626' }}>
              ۩ سجدہ
            </span>
          )}
        </div>
        <div className="flex gap-1">
          <button onClick={() => onSpeak(ayah.arabic, 'ar-SA')}
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.2)' }}>
            <Volume2 size={11} style={{ color: '#7c3aed' }} />
          </button>
          <button onClick={printAyah}
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: 'rgba(15,118,110,0.08)', border: '1px solid rgba(15,118,110,0.2)' }}>
            <Printer size={11} style={{ color: '#0f766e' }} />
          </button>
          <button onClick={shareAyah}
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: 'rgba(21,128,61,0.08)', border: '1px solid rgba(21,128,61,0.2)' }}>
            <Share2 size={11} style={{ color: '#15803d' }} />
          </button>
        </div>
      </div>

      {/* Arabic Text */}
      <p className="text-xl leading-loose font-bold mb-3 p-3 rounded-xl text-right"
        style={{ fontFamily: "'Noto Naskh Arabic','Amiri',serif", direction: 'rtl', color: '#111', background: 'rgba(21,128,61,0.04)', border: '1px solid rgba(21,128,61,0.1)' }}>
        {ayah.arabic}
      </p>

      {/* Divider */}
      <div className="h-px mb-3" style={{ background: 'linear-gradient(90deg,transparent,rgba(21,128,61,0.3),transparent)' }} />

      {/* Active Translations */}
      {TRANS_OPTIONS.filter((t) => activeTranslations.includes(t.key)).map((trans) => (
        <div key={trans.key} className="mb-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={{ background: `${trans.color}12`, color: trans.color, border: `1px solid ${trans.color}25` }}>
              {trans.labelUr}
            </span>
            <button onClick={() => onSpeak(ayah[trans.key], trans.dir === 'rtl' ? 'ur-PK' : 'en-US')}
              className="w-6 h-6 rounded-lg flex items-center justify-center opacity-60"
              style={{ background: `${trans.color}10` }}>
              <Volume2 size={10} style={{ color: trans.color }} />
            </button>
          </div>
          <p className={`text-sm text-gray-700 leading-relaxed ${trans.dir === 'rtl' ? 'text-right' : 'text-left'}`}
            style={{ direction: trans.dir, fontFamily: trans.dir === 'rtl' ? "'Amiri',serif" : 'inherit' }}>
            {ayah[trans.key] || '—'}
          </p>
        </div>
      ))}

      {/* Expand for all translations */}
      {!expanded && activeTranslations.length < TRANS_OPTIONS.length && (
        <button onClick={() => setExpanded(true)}
          className="flex items-center gap-1 text-[10px] font-semibold mt-1"
          style={{ color: '#15803d' }}>
          <ChevronDown size={11} /><span>تمام ترجمے دیکھیں</span>
        </button>
      )}
      {expanded && (
        <>
          {TRANS_OPTIONS.filter((t) => !activeTranslations.includes(t.key)).map((trans) => (
            <div key={trans.key} className="mb-2 mt-2 pt-2" style={{ borderTop: '1px solid rgba(0,0,0,0.05)' }}>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full mb-1 inline-block"
                style={{ background: `${trans.color}10`, color: trans.color, border: `1px solid ${trans.color}20` }}>
                {trans.labelUr}
              </span>
              <p className={`text-sm text-gray-600 leading-relaxed ${trans.dir === 'rtl' ? 'text-right' : 'text-left'}`}
                style={{ direction: trans.dir, fontFamily: trans.dir === 'rtl' ? "'Amiri',serif" : 'inherit' }}>
                {ayah[trans.key] || '—'}
              </p>
            </div>
          ))}
          <button onClick={() => setExpanded(false)}
            className="flex items-center gap-1 text-[10px] font-semibold mt-2"
            style={{ color: '#6b7280' }}>
            <ChevronUp size={11} /><span>بند کریں</span>
          </button>
        </>
      )}
    </div>
  );
}

export default function QuranPage() {
  const { settings } = useAppSettings();
  const { fetchSurah, loading, error, getCacheStats } = useQuranAPI();
  const [query, setQuery] = useState('');
  const [selectedSurah, setSelectedSurah] = useState<QuranSurah | null>(null);
  const [apiData, setApiData] = useState<APISurahData | null>(null);
  const [viewMode, setViewMode] = useState<'surahs' | 'juz'>('surahs');
  const [selectedJuz, setSelectedJuz] = useState<number | null>(null);
  const [activeTranslations, setActiveTranslations] = useState<TransKey[]>(['urdu_jalandhry', 'english']);
  const [showTransPicker, setShowTransPicker] = useState(false);
  const bg = BACKGROUNDS.find((b) => b.id === settings.selectedBackground) || BACKGROUNDS[0];
  const cacheStats = getCacheStats();

  const filteredSurahs = useMemo(() => {
    if (!query.trim()) return QURAN_SURAHS;
    const q = query.toLowerCase();
    return QURAN_SURAHS.filter((s) =>
      s.name.toLowerCase().includes(q) ||
      s.nameUr.includes(q) ||
      s.nameAr.includes(q) ||
      s.meaning.toLowerCase().includes(q) ||
      s.meaningUr.includes(q) ||
      String(s.id).includes(q)
    );
  }, [query]);

  const surahsByJuz = useMemo(() => {
    if (selectedJuz === null) return QURAN_SURAHS;
    return QURAN_SURAHS.filter((s) => s.juz === selectedJuz);
  }, [selectedJuz]);

  const handleSelectSurah = useCallback(async (surah: QuranSurah) => {
    setSelectedSurah(surah);
    setApiData(null);
    const data = await fetchSurah(surah.id);
    setApiData(data);
  }, [fetchSurah]);

  const speakArabic = (text: string, lang = 'ar-SA') => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang;
    u.rate = 0.75;
    const v = window.speechSynthesis.getVoices().find((v) => v.lang.startsWith(lang.split('-')[0]));
    if (v) u.voice = v;
    window.speechSynthesis.speak(u);
    toast.success('تلاوت شروع ہوئی');
  };

  const toggleTranslation = (key: TransKey) => {
    setActiveTranslations((prev) =>
      prev.includes(key) ? (prev.length > 1 ? prev.filter((k) => k !== key) : prev) : [...prev, key]
    );
  };

  return (
    <div className="min-h-screen relative" style={bg.style}>
      <ParticleEffect />
      <div className="relative z-10 pb-28">
        {/* Header */}
        <div className="sticky top-0 z-20 header-luminous px-4 pt-10 pb-3">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
              style={{ background: 'linear-gradient(135deg, rgba(21,128,61,0.15), rgba(21,128,61,0.05))', border: '1.5px solid rgba(21,128,61,0.3)' }}>📖</div>
            <div className="flex-1">
              <h1 className="text-base font-bold" style={{ color: '#14532d', textShadow: '0 0 8px rgba(21,128,61,0.3)' }}>قرآنِ کریم</h1>
              <p className="text-[10px] text-gray-500">Holy Quran • 114 Surahs • 6,236 Ayahs • AlQuran.cloud API</p>
            </div>
            {/* Cache indicator */}
            <div className="flex items-center gap-1 px-2 py-1 rounded-lg"
              style={{ background: cacheStats.cachedSurahs > 0 ? 'rgba(21,128,61,0.08)' : 'rgba(0,0,0,0.04)', border: `1px solid ${cacheStats.cachedSurahs > 0 ? 'rgba(21,128,61,0.2)' : 'rgba(0,0,0,0.08)'}` }}>
              {cacheStats.cachedSurahs > 0 ? <Wifi size={10} style={{ color: '#15803d' }} /> : <WifiOff size={10} color="#9ca3af" />}
              <span className="text-[9px] font-bold" style={{ color: cacheStats.cachedSurahs > 0 ? '#15803d' : '#9ca3af' }}>
                {cacheStats.cachedSurahs}/114
              </span>
            </div>
          </div>

          {!selectedSurah && (
            <>
              {/* View Mode */}
              <div className="flex gap-2 mb-2">
                {[{ id: 'surahs', label: '📚 سورتیں' }, { id: 'juz', label: '📖 پارے' }].map(({ id, label }) => (
                  <button key={id}
                    onClick={() => { setViewMode(id as typeof viewMode); setSelectedJuz(null); }}
                    className="flex-1 py-1.5 rounded-xl text-xs font-bold"
                    style={{ background: viewMode === id ? 'rgba(21,128,61,0.15)' : 'rgba(255,255,255,0.6)', color: viewMode === id ? '#15803d' : '#9ca3af', border: `1.5px solid ${viewMode === id ? 'rgba(21,128,61,0.4)' : 'rgba(21,128,61,0.1)'}`, minHeight: 36 }}>
                    {label}
                  </button>
                ))}
              </div>

              {/* Translation Selector */}
              <div className="flex gap-1.5 mb-2 items-center">
                <Globe size={11} style={{ color: '#9ca3af' }} />
                {TRANS_OPTIONS.map((t) => (
                  <button key={t.key}
                    onClick={() => toggleTranslation(t.key)}
                    className="flex-shrink-0 px-2 py-0.5 rounded-lg text-[10px] font-bold transition-all"
                    style={{
                      background: activeTranslations.includes(t.key) ? `${t.color}15` : 'rgba(0,0,0,0.04)',
                      color: activeTranslations.includes(t.key) ? t.color : '#9ca3af',
                      border: `1px solid ${activeTranslations.includes(t.key) ? `${t.color}35` : 'transparent'}`,
                    }}>
                    {t.labelUr}
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Search */}
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#15803d' }} />
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)}
              placeholder="سورت تلاش کریں — Surah name, number..."
              className="w-full pl-9 pr-8 py-2.5 rounded-xl text-sm outline-none"
              style={{ background: 'rgba(255,255,255,0.85)', border: '1.5px solid rgba(21,128,61,0.3)', color: '#111' }} />
            {query && <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2"><X size={13} color="#9ca3af" /></button>}
          </div>

          {selectedSurah && (
            <button onClick={() => { setSelectedSurah(null); setApiData(null); }}
              className="mt-2 text-xs flex items-center gap-1 font-medium" style={{ color: '#15803d' }}>
              ← واپس / Back to Surahs
            </button>
          )}
        </div>

        <div className="px-4 pt-4">
          {/* Surah Detail View */}
          {selectedSurah ? (
            <div>
              {/* Surah Header Card */}
              <div className="glass-panel-luminous p-4 mb-4"
                style={{ background: 'linear-gradient(135deg, rgba(21,128,61,0.08), rgba(255,255,255,0.95))', border: '1.5px solid rgba(21,128,61,0.3)' }}>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-sm font-bold" style={{ color: '#15803d' }}>{selectedSurah.nameUr} • {selectedSurah.name}</p>
                    <p className="text-xs text-gray-500">{selectedSurah.meaning} • {selectedSurah.meaningUr}</p>
                    <div className="flex gap-2 mt-2 flex-wrap">
                      {[
                        `${selectedSurah.ayahCount} آیات`,
                        selectedSurah.type === 'Makki' ? 'مکی' : 'مدنی',
                        `پارہ ${selectedSurah.juz}`,
                      ].map((tag) => (
                        <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                          style={{ background: 'rgba(21,128,61,0.1)', color: '#15803d', border: '1px solid rgba(21,128,61,0.2)' }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                  <p className="text-2xl font-bold ml-3" style={{ fontFamily: "'Amiri',serif", color: '#14532d' }}>{selectedSurah.nameAr}</p>
                </div>
                {/* Bismillah */}
                {selectedSurah.id !== 1 && selectedSurah.id !== 9 && (
                  <div className="mt-3 p-2 rounded-xl text-center"
                    style={{ background: 'rgba(21,128,61,0.06)', border: '1px solid rgba(21,128,61,0.15)' }}>
                    <p className="text-lg font-bold" style={{ fontFamily: "'Amiri',serif", color: '#15803d', direction: 'rtl' }}>
                      بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
                    </p>
                  </div>
                )}
                {/* Active Translations badge */}
                <div className="flex gap-1.5 mt-2">
                  {TRANS_OPTIONS.filter((t) => activeTranslations.includes(t.key)).map((t) => (
                    <span key={t.key} className="text-[9px] px-1.5 py-0.5 rounded font-bold"
                      style={{ background: `${t.color}10`, color: t.color }}>{t.labelUr}</span>
                  ))}
                </div>
              </div>

              {/* API Status / Loading */}
              {loading && <LoadingSkeleton />}

              {/* Error State */}
              {error && !loading && (
                <div className="glass-panel-luminous p-6 text-center mb-4" style={{ border: '1.5px solid rgba(220,38,38,0.2)' }}>
                  <WifiOff size={32} color="#dc2626" style={{ opacity: 0.4, margin: '0 auto 12px' }} />
                  <p className="text-sm font-bold text-gray-700">انٹرنیٹ کنیکشن درکار ہے</p>
                  <p className="text-xs text-gray-400 mt-1">Internet connection required to load Ayahs</p>
                  <button onClick={() => handleSelectSurah(selectedSurah)}
                    className="mt-3 px-4 py-2 rounded-xl text-xs font-bold text-white"
                    style={{ background: '#dc2626' }}>
                    دوبارہ کوشش کریں • Retry
                  </button>
                </div>
              )}

              {/* Ayahs from API */}
              {apiData && !loading && (
                <>
                  <div className="flex items-center gap-2 mb-3 px-1">
                    <Wifi size={11} style={{ color: '#15803d' }} />
                    <span className="text-[10px] text-gray-400">AlQuran.cloud • {apiData.ayahs.length} آیات لوڈ ہوئیں</span>
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                  </div>
                  {apiData.ayahs.map((ayah) => (
                    <AyahCard
                      key={ayah.numberInSurah}
                      ayah={ayah}
                      surah={selectedSurah}
                      activeTranslations={activeTranslations}
                      onSpeak={speakArabic}
                    />
                  ))}
                </>
              )}

              {/* Fallback static ayahs if API fails */}
              {!apiData && !loading && !error && selectedSurah.ayahs.length > 0 && (
                <>
                  <div className="glass-panel-luminous p-3 mb-3 flex items-center gap-2"
                    style={{ border: '1px solid rgba(217,119,6,0.2)', background: 'rgba(217,119,6,0.04)' }}>
                    <span className="text-sm">⚠️</span>
                    <p className="text-xs text-amber-700">Static preview — connect to internet for all {selectedSurah.ayahCount} Ayahs</p>
                  </div>
                  {selectedSurah.ayahs.map((ayah) => (
                    <div key={ayah.number} className="hadees-card p-4 mb-3" style={{ border: '1.5px solid rgba(21,128,61,0.2)' }}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                          style={{ background: 'rgba(21,128,61,0.1)', color: '#15803d', border: '1px solid rgba(21,128,61,0.2)' }}>
                          آیت {ayah.number}
                        </span>
                        <div className="flex gap-1">
                          <button onClick={() => speakArabic(ayah.arabic)}
                            className="w-7 h-7 rounded-lg flex items-center justify-center"
                            style={{ background: 'rgba(124,58,237,0.08)' }}>
                            <Volume2 size={11} style={{ color: '#7c3aed' }} />
                          </button>
                        </div>
                      </div>
                      <p className="text-xl text-right leading-loose font-bold mb-3 p-3 rounded-xl"
                        style={{ fontFamily: "'Noto Naskh Arabic','Amiri',serif", direction: 'rtl', color: '#111', background: 'rgba(21,128,61,0.04)' }}>
                        {ayah.arabic}
                      </p>
                      <p className="text-sm text-right text-gray-700 leading-relaxed mb-2"
                        style={{ fontFamily: "'Amiri',serif", direction: 'rtl' }}>{ayah.urdu}</p>
                      <p className="text-sm text-gray-600 leading-relaxed">{ayah.english}</p>
                    </div>
                  ))}
                </>
              )}
            </div>
          ) : viewMode === 'juz' && !query ? (
            /* Juz View */
            <div>
              {selectedJuz === null ? (
                <div className="grid grid-cols-3 gap-2">
                  {Array.from({ length: 30 }, (_, i) => i + 1).map((juz) => {
                    const count = QURAN_SURAHS.filter((s) => s.juz === juz).length;
                    return (
                      <button key={juz} onClick={() => setSelectedJuz(juz)}
                        className="glass-panel-luminous p-3 text-center"
                        style={{ border: '1.5px solid rgba(21,128,61,0.2)', minHeight: 70 }}>
                        <p className="text-xl font-bold" style={{ color: '#15803d' }}>{juz}</p>
                        <p className="text-[9px] text-gray-500 font-medium">پارہ</p>
                        <p className="text-[9px] text-gray-400">{count} سورتیں</p>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div>
                  <button onClick={() => setSelectedJuz(null)} className="mb-3 text-xs flex items-center gap-1 font-medium" style={{ color: '#15803d' }}>
                    ← تمام پارے
                  </button>
                  <div className="glass-panel-luminous p-3 mb-4 text-center" style={{ border: '1.5px solid rgba(21,128,61,0.2)' }}>
                    <p className="text-sm font-bold" style={{ color: '#14532d' }}>پارہ {selectedJuz} • Juz {selectedJuz}</p>
                    <p className="text-xs text-gray-400">{surahsByJuz.length} Surahs</p>
                  </div>
                  {surahsByJuz.map((surah) => (
                    <button key={surah.id} onClick={() => handleSelectSurah(surah)}
                      className="w-full book-card p-3 mb-2 text-left flex items-center gap-3"
                      style={{ border: '1.5px solid rgba(21,128,61,0.2)' }}>
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0"
                        style={{ background: 'rgba(21,128,61,0.12)', color: '#15803d', border: '1px solid rgba(21,128,61,0.25)' }}>{surah.id}</div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-gray-900">{surah.nameUr}</p>
                        <p className="text-xs text-gray-400">{surah.name} • {surah.ayahCount} آیات</p>
                      </div>
                      <p className="text-xl font-bold" style={{ fontFamily: "'Amiri',serif", color: '#14532d' }}>{surah.nameAr}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* Main Surah Grid */
            <>
              <div className="glass-panel-luminous p-3 mb-3 flex items-center gap-2"
                style={{ background: 'rgba(21,128,61,0.04)', border: '1px solid rgba(21,128,61,0.15)' }}>
                <Wifi size={11} style={{ color: '#15803d' }} />
                <p className="text-[10px] text-gray-500">
                  <strong className="text-green-700">{filteredSurahs.length}</strong> سورتیں • تلاوت کے لیے کسی سورت کو دبائیں — سمپل اور مکمل
                </p>
                {cacheStats.cachedSurahs > 0 && (
                  <span className="ml-auto text-[9px] font-bold" style={{ color: '#15803d' }}>{cacheStats.cachedSurahs} cached</span>
                )}
              </div>
              <div className="space-y-2">
                {filteredSurahs.map((surah) => (
                  <button key={surah.id} onClick={() => handleSelectSurah(surah)}
                    className="w-full book-card p-4 text-left flex items-center gap-3"
                    style={{ border: '1.5px solid rgba(21,128,61,0.2)' }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0"
                      style={{ background: 'linear-gradient(135deg, rgba(21,128,61,0.15), rgba(21,128,61,0.08))', border: '1.5px solid rgba(21,128,61,0.3)', color: '#15803d' }}>
                      {surah.id}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-sm font-bold text-gray-900">{surah.nameUr}</p>
                          <p className="text-xs text-gray-500">{surah.name} • {surah.meaning}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-xl font-bold" style={{ fontFamily: "'Amiri',serif", color: '#14532d' }}>{surah.nameAr}</p>
                          <div className="flex items-center gap-1 justify-end mt-0.5">
                            <span className="text-[9px] text-gray-400">{surah.ayahCount} آیات</span>
                            <span className="text-[8px] px-1 py-0.5 rounded font-semibold"
                              style={{ background: surah.type === 'Makki' ? 'rgba(21,128,61,0.1)' : 'rgba(29,78,216,0.1)', color: surah.type === 'Makki' ? '#15803d' : '#1d4ed8' }}>
                              {surah.type === 'Makki' ? 'مکی' : 'مدنی'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
                {filteredSurahs.length === 0 && (
                  <div className="text-center py-12 glass-panel-luminous p-8">
                    <BookOpen size={40} color="#15803d" style={{ opacity: 0.3, margin: '0 auto 16px' }} />
                    <p className="text-gray-600">کوئی نتیجہ نہیں • No results found</p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      <QuranRadio />
      <FloatingSidebar />
      <Navbar />
    </div>
  );
}
