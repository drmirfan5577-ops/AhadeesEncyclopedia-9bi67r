// ============================================================
// AHADEES ENCYCLOPEDIA — ENTERPRISE SEARCH
// Cross-collection search: static ahadees + live API
// EvEr SmArT-wOrLd | Dr M Irfan Qadir Thaheem | eversmart/drirfan
// ============================================================

import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon, X, BookOpen, ArrowRight, Loader, Filter, Globe } from 'lucide-react';
import { AHADEES } from '@/constants/ahadees';
import { BACKGROUNDS } from '@/constants/backgrounds';
import { useAppSettings } from '@/hooks/useAppSettings';
import { useHadithAPI, HADITH_BOOKS_META, APIHadith, BookSlug } from '@/hooks/useHadithAPI';
import ParticleEffect from '@/components/features/ParticleEffect';
import HadeesCard from '@/components/features/HadeesCard';
import Navbar from '@/components/layout/Navbar';
import FloatingSidebar from '@/components/features/FloatingSidebar';
import { toast } from 'sonner';

type SearchScope = 'local' | 'api' | 'all';

const SCOPE_LABELS: Record<SearchScope, string> = {
  local: '📚 Local (75+)',
  api: '🌐 API (29,969)',
  all: '🔍 All Sources',
};

interface APIResult {
  bookSlug: BookSlug;
  hadith: APIHadith;
}

export default function Search() {
  const { settings, toggleBookmark } = useAppSettings();
  const navigate = useNavigate();
  const { fetchHadiths, loading: apiLoading } = useHadithAPI();
  const bg = BACKGROUNDS.find(b => b.id === settings.selectedBackground) || BACKGROUNDS[0];

  const [query, setQuery] = useState('');
  const [scope, setScope] = useState<SearchScope>('local');
  const [apiResults, setApiResults] = useState<APIResult[]>([]);
  const [selectedBook, setSelectedBook] = useState<BookSlug | 'all'>('all');
  const [searched, setSearched] = useState(false);

  // ─── Local search ─────────────────────────────────────────
  const localResults = useMemo(() => {
    if (!query.trim() || (scope === 'api')) return [];
    const q = query.toLowerCase();
    return AHADEES.filter(h => {
      const text = [h.arabic, h.narrator, h.source, ...Object.values(h.translations), ...h.tags].join(' ').toLowerCase();
      return text.includes(q);
    });
  }, [query, scope]);

  // ─── API search ───────────────────────────────────────────
  const handleAPISearch = useCallback(async () => {
    if (!query.trim()) return;
    setSearched(true);
    const books = selectedBook === 'all'
      ? Object.keys(HADITH_BOOKS_META) as BookSlug[]
      : [selectedBook];

    const results: APIResult[] = [];
    for (const bookSlug of books) {
      const data = await fetchHadiths(bookSlug, 1, 100);
      if (data) {
        const matches = data.hadiths.filter(h =>
          h.arab.includes(query) ||
          h.id?.toLowerCase().includes(query.toLowerCase()) ||
          String(h.number) === query
        );
        matches.forEach(h => results.push({ bookSlug, hadith: h }));
      }
    }
    setApiResults(results);
    if (results.length === 0) toast.info('اس صفحے پر کوئی نتیجہ نہیں — کوئی اور صفحہ آزمائیں');
  }, [query, selectedBook, fetchHadiths]);

  const handleSearch = () => {
    if (!query.trim()) return;
    if (scope === 'api' || scope === 'all') handleAPISearch();
    setSearched(true);
  };

  const clearSearch = () => {
    setQuery('');
    setApiResults([]);
    setSearched(false);
  };

  const SUGGESTIONS = [
    { label: 'ایمان', q: 'ایمان' }, { label: 'prayer', q: 'prayer' },
    { label: 'علم', q: 'علم' }, { label: 'صبر', q: 'صبر' },
    { label: 'mother', q: 'mother' }, { label: 'charity', q: 'charity' },
    { label: 'جنت', q: 'جنت' }, { label: 'knowledge', q: 'knowledge' },
    { label: 'رحمت', q: 'رحمت' }, { label: 'نماز', q: 'نماز' },
    { label: 'fasting', q: 'fasting' }, { label: 'تقوی', q: 'تقوی' },
  ];

  return (
    <div className="min-h-screen relative" style={bg.style}>
      <ParticleEffect />
      <div className="relative z-10 pb-28">

        {/* ─── Header ─── */}
        <div className="sticky top-0 z-20 header-luminous px-4 pt-10 pb-3">
          <div className="flex items-center gap-2 mb-3">
            <SearchIcon size={18} style={{ color: '#dc2626' }} />
            <h1 className="text-base font-bold led-text-red animate-glow-pulse">
              جامع تلاش • Encyclopedic Search
            </h1>
          </div>

          {/* Search Bar */}
          <div className="relative mb-2">
            <SearchIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#dc2626' }} />
            <input
              type="text" value={query}
              onChange={e => { setQuery(e.target.value); setSearched(false); }}
              onKeyDown={e => e.key === 'Enter' && handleSearch()}
              placeholder="احادیث میں تلاش… Arabic, Urdu, English"
              className="w-full pl-9 pr-20 py-3 rounded-xl text-sm outline-none"
              style={{
                background: 'rgba(255,255,255,0.9)',
                border: '1.5px solid rgba(220,38,38,0.35)',
                color: '#111',
                fontFamily: query && /[\u0600-\u06FF]/.test(query) ? "'Amiri',serif" : 'inherit',
              }}
              autoFocus
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              {query && (
                <button onClick={clearSearch} className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{ background: 'rgba(0,0,0,0.06)' }}>
                  <X size={12} color="#9ca3af" />
                </button>
              )}
              <button onClick={handleSearch}
                className="px-2.5 py-1 rounded-lg text-[10px] font-bold text-white"
                style={{ background: '#dc2626', minHeight: 28 }}>
                تلاش
              </button>
            </div>
          </div>

          {/* Scope Selector */}
          <div className="flex gap-1.5 mb-2">
            {(Object.keys(SCOPE_LABELS) as SearchScope[]).map(s => (
              <button key={s} onClick={() => setScope(s)}
                className="flex-1 py-1 rounded-lg text-[10px] font-bold transition-all"
                style={{
                  background: scope === s ? 'rgba(220,38,38,0.12)' : 'rgba(255,255,255,0.6)',
                  color: scope === s ? '#b91c1c' : '#9ca3af',
                  border: `1px solid ${scope === s ? 'rgba(220,38,38,0.35)' : 'rgba(0,0,0,0.06)'}`,
                  minHeight: 30,
                }}>
                {SCOPE_LABELS[s]}
              </button>
            ))}
          </div>

          {/* API Book Filter */}
          {(scope === 'api' || scope === 'all') && (
            <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-red">
              <button onClick={() => setSelectedBook('all')}
                className="flex-shrink-0 px-2 py-1 rounded-lg text-[9px] font-bold"
                style={{ background: selectedBook === 'all' ? '#dc2626' : 'rgba(255,255,255,0.7)', color: selectedBook === 'all' ? '#fff' : '#9ca3af', border: '1px solid rgba(220,38,38,0.2)', minHeight: 28 }}>
                تمام
              </button>
              {(Object.entries(HADITH_BOOKS_META) as [BookSlug, any][]).map(([slug, m]) => (
                <button key={slug} onClick={() => setSelectedBook(slug)}
                  className="flex-shrink-0 px-2 py-1 rounded-lg text-[9px] font-bold"
                  style={{
                    background: selectedBook === slug ? m.color : 'rgba(255,255,255,0.7)',
                    color: selectedBook === slug ? '#fff' : m.color,
                    border: `1px solid ${m.color}30`,
                    minHeight: 28,
                  }}>
                  {m.icon} {m.nameUr.split(' ')[1] || m.nameUr}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="px-4 pt-4">
          {/* Empty state */}
          {!query && (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, rgba(220,38,38,0.1), rgba(220,38,38,0.05))', border: '1.5px solid rgba(220,38,38,0.2)' }}>
                <SearchIcon size={28} color="#dc262630" />
              </div>
              <p className="text-gray-600 text-sm font-medium">احادیث انسائیکلوپیڈیا تلاش</p>
              <p className="text-gray-400 text-xs mt-1">29,969 احادیث — 6 کتب — 13 زبانیں</p>

              {/* Scope info */}
              <div className="mt-4 glass-panel-luminous p-3 text-left"
                style={{ border: '1px solid rgba(220,38,38,0.1)' }}>
                <p className="text-xs font-bold text-gray-700 mb-2">📌 تلاش کے اختیارات:</p>
                <div className="space-y-1.5">
                  <div className="flex items-start gap-2">
                    <span className="text-xs">📚</span>
                    <p className="text-[10px] text-gray-600"><strong>Local:</strong> ہماری 75+ مکمل احادیث (تیز، آفلائن)</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-xs">🌐</span>
                    <p className="text-[10px] text-gray-600"><strong>API:</strong> 29,969 احادیث لائیو (عربی متن، انٹرنیٹ)</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-xs">🔍</span>
                    <p className="text-[10px] text-gray-600"><strong>All:</strong> دونوں ذرائع یکجا (بہترین نتائج)</p>
                  </div>
                </div>
              </div>

              {/* Suggestions */}
              <div className="mt-4">
                <p className="text-xs text-gray-400 mb-2 font-medium">تجاویز • Suggestions</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {SUGGESTIONS.map(s => (
                    <button key={s.label}
                      onClick={() => { setQuery(s.q); }}
                      className="px-3 py-1.5 rounded-full text-xs font-medium"
                      style={{ background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.2)', color: '#b91c1c', minHeight: 32 }}>
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Loading */}
          {apiLoading && (
            <div className="text-center py-8">
              <div className="w-10 h-10 rounded-full border-2 border-red-600 border-t-transparent animate-spin mx-auto mb-3" />
              <p className="text-sm font-medium text-gray-600">API سے تلاش جاری ہے…</p>
              <p className="text-xs text-gray-400 mt-1">Searching {TOTAL_BOOKS(selectedBook)} book(s)</p>
            </div>
          )}

          {/* LOCAL RESULTS */}
          {localResults.length > 0 && (scope === 'local' || scope === 'all') && (
            <>
              <div className="flex items-center gap-2 mb-3 p-2.5 rounded-xl"
                style={{ background: 'rgba(220,38,38,0.06)', border: '1px solid rgba(220,38,38,0.15)' }}>
                <BookOpen size={12} style={{ color: '#dc2626' }} />
                <p className="text-xs font-bold text-gray-700">
                  <span style={{ color: '#dc2626' }}>{localResults.length}</span> نتائج — Local Encyclopedia
                </p>
              </div>
              {localResults.map((hadees, i) => (
                <HadeesCard
                  key={hadees.id}
                  hadees={hadees}
                  primaryLang={settings.primaryLanguage}
                  secondaryLang={settings.secondaryLanguage}
                  showArabic={settings.showArabic}
                  fontSize={settings.fontSize}
                  isBookmarked={settings.bookmarks.includes(hadees.id)}
                  onToggleBookmark={toggleBookmark}
                  animationDelay={i * 50}
                />
              ))}
            </>
          )}

          {/* API RESULTS */}
          {apiResults.length > 0 && (scope === 'api' || scope === 'all') && (
            <>
              <div className="flex items-center gap-2 mb-3 p-2.5 rounded-xl mt-2"
                style={{ background: 'rgba(21,128,61,0.06)', border: '1px solid rgba(21,128,61,0.15)' }}>
                <Globe size={12} style={{ color: '#15803d' }} />
                <p className="text-xs font-bold text-gray-700">
                  <span style={{ color: '#15803d' }}>{apiResults.length}</span> نتائج — Live API
                </p>
              </div>
              {apiResults.map(({ bookSlug, hadith }) => {
                const meta = HADITH_BOOKS_META[bookSlug];
                return (
                  <div key={`${bookSlug}_${hadith.number}`} className="hadees-card p-4 mb-3"
                    style={{ border: `1.5px solid ${meta.color}18` }}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                          style={{ background: `${meta.color}12`, color: meta.color, border: `1px solid ${meta.color}25` }}>
                          #{hadith.number}
                        </span>
                        <span className="text-[10px] text-gray-500">{meta.nameUr}</span>
                      </div>
                      <button onClick={() => navigate(`/book/${bookSlug}`)}
                        className="text-[10px] font-bold flex items-center gap-1 px-2 py-1 rounded-lg"
                        style={{ background: `${meta.color}10`, color: meta.color, minHeight: 28 }}>
                        <span>کتاب کھولیں</span><ArrowRight size={9} />
                      </button>
                    </div>
                    <p className="text-lg font-bold text-right leading-loose p-3 rounded-xl"
                      style={{ fontFamily: "'Noto Naskh Arabic','Amiri',serif", direction: 'rtl', color: '#111', background: `${meta.color}05` }}>
                      {hadith.arab}
                    </p>
                    {hadith.id && (
                      <p className="text-xs text-gray-500 mt-2 leading-relaxed">{hadith.id}</p>
                    )}
                  </div>
                );
              })}
            </>
          )}

          {/* No results */}
          {searched && !apiLoading && query &&
            localResults.length === 0 && apiResults.length === 0 && (
              <div className="text-center py-10 glass-panel-luminous p-6">
                <SearchIcon size={32} color="#dc2626" style={{ opacity: 0.3, margin: '0 auto 12px' }} />
                <p className="text-gray-700 font-medium mb-1">کوئی نتیجہ نہیں</p>
                <p className="text-xs text-gray-400">No results for "{query}"</p>
                <p className="text-xs text-gray-400 mt-1">
                  API search only covers first 100 hadiths per book.
                  Try browsing a full book for complete results.
                </p>
                <button onClick={() => navigate('/library')}
                  className="mt-3 px-4 py-2 rounded-xl text-xs font-bold text-white"
                  style={{ background: '#dc2626' }}>
                  کتب خانہ کھولیں
                </button>
              </div>
            )}

          {/* Books Quick Access */}
          {!query && (
            <div className="mt-2 glass-panel-luminous p-4" style={{ border: '1.5px solid rgba(220,38,38,0.12)' }}>
              <p className="text-xs font-bold text-gray-600 mb-3">📚 براہ راست کتاب پڑھیں • Browse Full Books</p>
              <div className="space-y-2">
                {(Object.entries(HADITH_BOOKS_META) as [BookSlug, any][]).map(([slug, meta]) => (
                  <button key={slug} onClick={() => navigate(`/book/${slug}`)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all"
                    style={{ background: `${meta.color}08`, border: `1.5px solid ${meta.color}18`, minHeight: 52 }}>
                    <span className="text-xl flex-shrink-0">{meta.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold" style={{ color: meta.color }}>{meta.nameUr}</p>
                      <p className="text-[9px] text-gray-400">{meta.total.toLocaleString()} احادیث • {meta.chapters.length} ابواب</p>
                    </div>
                    <ArrowRight size={13} style={{ color: meta.color, flexShrink: 0 }} />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <FloatingSidebar />
      <Navbar />
    </div>
  );
}

function TOTAL_BOOKS(selectedBook: BookSlug | 'all') {
  return selectedBook === 'all' ? Object.keys(HADITH_BOOKS_META).length : 1;
}
