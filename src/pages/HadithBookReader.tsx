// ============================================================
// AHADEES ENCYCLOPEDIA — COMPLETE HADITH BOOK READER
// Displays all ahadees from any of the 6 Kutub Sitta
// via api.hadith.gading.dev — 29,969 total ahadees
// Chapter navigation, pagination, TTS, print, share, bookmark
// EvEr SmArT-wOrLd | Dr M Irfan Qadir Thaheem | eversmart/drirfan
// ============================================================

import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ChevronLeft, ChevronRight, Search, X, Volume2, Printer,
  Share2, Bookmark, BookmarkCheck, Copy, ChevronDown, ChevronUp,
  List, BookOpen, Wifi, WifiOff, Loader, Home, Filter,
} from 'lucide-react';
import { BACKGROUNDS } from '@/constants/backgrounds';
import { useAppSettings } from '@/hooks/useAppSettings';
import { useHadithAPI, HADITH_BOOKS_META, APIHadith, BookSlug } from '@/hooks/useHadithAPI';
import { AHADEES } from '@/constants/ahadees';
import ParticleEffect from '@/components/features/ParticleEffect';
import Navbar from '@/components/layout/Navbar';
import { toast } from 'sonner';

const PAGE_SIZE = 50; // hadiths per page

// ─── Single Hadith Card ────────────────────────────────────
function HadithCard({
  hadith, bookSlug, bookMeta, bookmarks, onToggleBookmark,
}: {
  hadith: APIHadith;
  bookSlug: BookSlug;
  bookMeta: typeof HADITH_BOOKS_META[BookSlug];
  bookmarks: string[];
  onToggleBookmark: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const bookmarkId = `${bookSlug}_${hadith.number}`;
  const isBookmarked = bookmarks.includes(bookmarkId);

  // Find matching local hadith for Urdu translation if available
  const localMatch = AHADEES.find(a =>
    a.source.toLowerCase().includes(bookMeta.nameEn.split(' ')[1]?.toLowerCase() || '') &&
    Math.abs(parseInt(a.hadithNumber) - hadith.number) < 3
  );

  const speak = (text: string, lang: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang; u.rate = 0.8;
    const v = window.speechSynthesis.getVoices().find(v => v.lang.startsWith(lang.split('-')[0]));
    if (v) u.voice = v;
    window.speechSynthesis.speak(u);
    toast.success('تلاوت شروع ہوئی');
  };

  const handleCopy = () => {
    const text = `${hadith.arab}\n\n— ${bookMeta.nameUr} #${hadith.number}\nAhadees Encyclopedia | eversmart/drirfan`;
    navigator.clipboard.writeText(text).then(() => toast.success('Copied!'));
  };

  const handleShare = () => {
    const text = `${hadith.arab}\n\n— ${bookMeta.nameEn} Hadith #${hadith.number}\nAhadees Encyclopedia | eversmart/drirfan`;
    if (navigator.share) navigator.share({ title: `${bookMeta.nameUr} #${hadith.number}`, text });
    else navigator.clipboard.writeText(text).then(() => toast.success('Copied for sharing!'));
  };

  const handlePrint = () => {
    const w = window.open('', '_blank');
    if (!w) return;
    w.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8">
      <link href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Inter:wght@400;600&display=swap" rel="stylesheet">
      <style>body{font-family:Inter,sans-serif;padding:32px;max-width:680px;margin:auto}
      .header{text-align:center;border-bottom:3px solid ${bookMeta.color};padding-bottom:16px;margin-bottom:20px}
      .arabic{font-family:Amiri,serif;font-size:24px;line-height:2.2;direction:rtl;text-align:right;padding:16px;border-radius:8px;background:#fef2f2;border:1px solid #fca5a5;margin:16px 0}
      .footer{text-align:center;margin-top:24px;font-size:11px;color:#aaa;border-top:1px solid #eee;padding-top:12px}</style></head>
      <body>
      <div class="header">
        <h2 style="color:${bookMeta.color}">${bookMeta.nameUr} • ${bookMeta.nameEn}</h2>
        <p style="color:#666;font-size:13px">حدیث #${hadith.number} | ${bookMeta.author}</p>
      </div>
      <div class="arabic">${hadith.arab}</div>
      ${localMatch ? `<div style="padding:12px;background:#fffbeb;border:1px solid #fde68a;border-radius:8px;margin:12px 0;direction:rtl;text-align:right;font-family:Amiri,serif">${localMatch.translations.ur || ''}</div>` : ''}
      ${localMatch?.translations.en ? `<div style="padding:12px;background:#f0f9ff;border:1px solid #bae6fd;border-radius:8px;margin:12px 0">${localMatch.translations.en}</div>` : ''}
      <div class="footer">Ahadees Encyclopedia • EvEr SmArT-wOrLd • eversmart/drirfan<br>Printed: ${new Date().toLocaleDateString()}</div>
      </body></html>`);
    w.document.close();
    setTimeout(() => { w.print(); w.close(); }, 400);
  };

  return (
    <div className="hadees-card p-4 mb-3" style={{ border: `1.5px solid ${bookMeta.color}18` }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-2.5 py-1 rounded-full"
            style={{ background: `${bookMeta.color}12`, color: bookMeta.color, border: `1px solid ${bookMeta.color}30` }}>
            #{hadith.number}
          </span>
          <span className="text-[10px] text-gray-400 font-medium">{bookMeta.nameUr}</span>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => speak(hadith.arab, 'ar-SA')}
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.2)' }}>
            <Volume2 size={12} style={{ color: '#7c3aed' }} />
          </button>
          <button onClick={() => onToggleBookmark(bookmarkId)}
            className="w-8 h-8 rounded-lg flex items-center justify-center">
            {isBookmarked
              ? <BookmarkCheck size={14} style={{ color: '#d97706', filter: 'drop-shadow(0 0 4px rgba(217,119,6,0.5))' }} />
              : <Bookmark size={14} color="#9ca3af" />}
          </button>
        </div>
      </div>

      {/* Arabic Text */}
      <div className="p-3 rounded-xl mb-3"
        style={{ background: `${bookMeta.color}06`, border: `1px solid ${bookMeta.color}15` }}>
        <p className="text-lg font-bold leading-loose text-right"
          style={{ fontFamily: "'Noto Naskh Arabic','Amiri',serif", direction: 'rtl', color: '#111' }}>
          {hadith.arab}
        </p>
      </div>

      {/* Local Urdu translation if available */}
      {localMatch?.translations.ur && (
        <div className="mb-2 p-2.5 rounded-xl"
          style={{ background: 'rgba(180,83,9,0.05)', border: '1px solid rgba(180,83,9,0.12)' }}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(180,83,9,0.1)', color: '#92400e', border: '1px solid rgba(180,83,9,0.2)' }}>
              🇵🇰 اردو
            </span>
            <button onClick={() => speak(localMatch.translations.ur || '', 'ur-PK')}
              className="w-6 h-6 rounded flex items-center justify-center opacity-60"
              style={{ background: 'rgba(180,83,9,0.08)' }}>
              <Volume2 size={10} style={{ color: '#92400e' }} />
            </button>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed text-right"
            style={{ fontFamily: "'Amiri',serif", direction: 'rtl' }}>
            {localMatch.translations.ur}
          </p>
        </div>
      )}

      {/* English translation if available */}
      {localMatch?.translations.en && (
        <div className="mb-2 p-2.5 rounded-xl"
          style={{ background: 'rgba(3,105,161,0.05)', border: '1px solid rgba(3,105,161,0.1)' }}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(3,105,161,0.1)', color: '#0c4a6e', border: '1px solid rgba(3,105,161,0.2)' }}>
              🇬🇧 English
            </span>
            <button onClick={() => speak(localMatch.translations.en || '', 'en-US')}
              className="w-6 h-6 rounded flex items-center justify-center opacity-60"
              style={{ background: 'rgba(3,105,161,0.08)' }}>
              <Volume2 size={10} style={{ color: '#0369a1' }} />
            </button>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">{localMatch.translations.en}</p>
        </div>
      )}

      {/* Expand for Indonesian (secondary) */}
      {hadith.id && (
        <>
          {expanded ? (
            <div className="mb-2 p-2.5 rounded-xl"
              style={{ background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.06)' }}>
              <span className="text-[10px] font-bold text-gray-500 mb-1 block">🇮🇩 Indonesian</span>
              <p className="text-xs text-gray-600 leading-relaxed">{hadith.id}</p>
            </div>
          ) : null}
          <button onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-[10px] font-semibold mb-2"
            style={{ color: bookMeta.color }}>
            {expanded ? <><ChevronUp size={10} /><span>کم کریں</span></> : <><ChevronDown size={10} /><span>مزید ترجمے</span></>}
          </button>
        </>
      )}

      {/* Actions */}
      <div className="flex items-center gap-1.5 pt-2" style={{ borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        {[
          { icon: Copy, label: 'Copy', onClick: handleCopy },
          { icon: Share2, label: 'Share', onClick: handleShare },
          { icon: Printer, label: 'Print', onClick: handlePrint },
        ].map(({ icon: Icon, label, onClick }) => (
          <button key={label} onClick={onClick}
            className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs font-medium"
            style={{ background: 'rgba(0,0,0,0.04)', color: '#6b7280', minHeight: 32 }}>
            <Icon size={11} /><span>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Skeleton Loader ───────────────────────────────────────
function LoadingSkeleton() {
  return (
    <div className="space-y-3">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="hadees-card p-4 animate-pulse" style={{ animationDelay: `${i * 80}ms` }}>
          <div className="flex items-center gap-2 mb-3">
            <div className="h-5 w-16 rounded-full" style={{ background: 'rgba(220,38,38,0.1)' }} />
            <div className="h-4 w-24 rounded" style={{ background: 'rgba(0,0,0,0.04)' }} />
          </div>
          <div className="h-16 rounded-xl mb-2" style={{ background: 'rgba(220,38,38,0.05)' }} />
          <div className="h-3 w-4/5 rounded mb-1" style={{ background: 'rgba(0,0,0,0.04)' }} />
          <div className="h-3 w-3/5 rounded" style={{ background: 'rgba(0,0,0,0.04)' }} />
        </div>
      ))}
      <div className="text-center py-4">
        <div className="w-6 h-6 rounded-full border-2 border-red-600 border-t-transparent animate-spin mx-auto mb-2" />
        <p className="text-xs text-gray-500 font-medium">احادیث لوڈ ہو رہی ہیں…</p>
        <p className="text-[10px] text-gray-400">Loading from api.hadith.gading.dev</p>
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────
export default function HadithBookReader() {
  const { bookSlug } = useParams<{ bookSlug: string }>();
  const navigate = useNavigate();
  const { settings, toggleBookmark } = useAppSettings();
  const { fetchHadiths, loading, error } = useHadithAPI();
  const bg = BACKGROUNDS.find(b => b.id === settings.selectedBackground) || BACKGROUNDS[0];

  const slug = (bookSlug || 'bukhari') as BookSlug;
  const meta = HADITH_BOOKS_META[slug] || HADITH_BOOKS_META.bukhari;

  const [currentPage, setCurrentPage] = useState(1);
  const [hadiths, setHadiths] = useState<APIHadith[]>([]);
  const [totalHadiths, setTotalHadiths] = useState(meta.total);
  const [searchQuery, setSearchQuery] = useState('');
  const [showChapters, setShowChapters] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const [showBookSelector, setShowBookSelector] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  const totalPages = Math.ceil(totalHadiths / PAGE_SIZE);
  const startNum = (currentPage - 1) * PAGE_SIZE + 1;
  const endNum = Math.min(currentPage * PAGE_SIZE, totalHadiths);

  // All 6 books for selector
  const ALL_BOOKS = Object.entries(HADITH_BOOKS_META).map(([k, v]) => ({
    slug: k as BookSlug, ...v,
  }));

  const loadPage = useCallback(async (page: number) => {
    const s = (page - 1) * PAGE_SIZE + 1;
    const e = Math.min(page * PAGE_SIZE, meta.total);
    const data = await fetchHadiths(slug, s, e);
    if (data) {
      setHadiths(data.hadiths);
      setTotalHadiths(data.totalHadiths || meta.total);
    }
    topRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [slug, meta.total, fetchHadiths]);

  // Load chapter
  const goToChapter = (chap: typeof meta.chapters[0]) => {
    const page = Math.max(1, Math.ceil(chap.from / PAGE_SIZE));
    setCurrentPage(page);
    setSelectedChapter(chap.number);
    setShowChapters(false);
    loadPage(page);
  };

  useEffect(() => {
    setCurrentPage(1);
    setHadiths([]);
    setSelectedChapter(null);
    loadPage(1);
  }, [slug]);

  useEffect(() => {
    loadPage(currentPage);
  }, [currentPage]);

  // Filter by search
  const filteredHadiths = searchQuery.trim()
    ? hadiths.filter(h =>
        h.arab.includes(searchQuery) ||
        h.id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(h.number).includes(searchQuery)
      )
    : hadiths;

  return (
    <div className="min-h-screen relative" style={bg.style}>
      <ParticleEffect />
      <div className="relative z-10 pb-28" ref={topRef}>

        {/* ─── Sticky Header ─── */}
        <div className="sticky top-0 z-20 header-luminous px-4 pt-10 pb-3">
          {/* Back + Title */}
          <div className="flex items-center gap-3 mb-3">
            <button onClick={() => navigate('/library')}
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(220,38,38,0.08)', border: '1.5px solid rgba(220,38,38,0.2)' }}>
              <ChevronLeft size={16} style={{ color: meta.color }} />
            </button>
            <div className="flex-1 min-w-0">
              <h1 className="text-sm font-bold truncate" style={{ color: meta.color, textShadow: `0 0 8px ${meta.color}40` }}>
                {meta.icon} {meta.nameUr}
              </h1>
              <p className="text-[10px] text-gray-500 truncate">{meta.nameEn} • {meta.author}</p>
            </div>
            {/* Book Selector */}
            <button onClick={() => setShowBookSelector(!showBookSelector)}
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: `${meta.color}10`, border: `1.5px solid ${meta.color}30` }}>
              <BookOpen size={14} style={{ color: meta.color }} />
            </button>
          </div>

          {/* Book Selector Dropdown */}
          {showBookSelector && (
            <div className="rounded-xl overflow-hidden mb-2"
              style={{ border: '1.5px solid rgba(220,38,38,0.2)', background: 'rgba(255,255,255,0.98)' }}>
              {ALL_BOOKS.map(book => (
                <button key={book.slug} onClick={() => { navigate(`/book/${book.slug}`); setShowBookSelector(false); }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-left border-b last:border-b-0 transition-all"
                  style={{ background: slug === book.slug ? `${book.color}10` : 'transparent', borderColor: 'rgba(0,0,0,0.05)' }}>
                  <span className="text-lg">{book.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold truncate" style={{ color: book.color }}>{book.nameUr}</p>
                    <p className="text-[9px] text-gray-400">{book.total.toLocaleString()} احادیث</p>
                  </div>
                  {slug === book.slug && <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: book.color }} />}
                </button>
              ))}
            </div>
          )}

          {/* Stats Bar */}
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg"
              style={{ background: `${meta.color}10`, border: `1px solid ${meta.color}20` }}>
              <BookOpen size={10} style={{ color: meta.color }} />
              <span className="text-[10px] font-bold" style={{ color: meta.color }}>
                {meta.total.toLocaleString()} احادیث
              </span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg"
              style={{ background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.08)' }}>
              <span className="text-[10px] font-medium text-gray-500">
                صفحہ {currentPage} / {totalPages}
              </span>
            </div>
            <div className="flex items-center gap-1 px-2 py-1 rounded-lg ml-auto"
              style={{ background: loading ? 'rgba(217,119,6,0.08)' : 'rgba(21,128,61,0.08)', border: `1px solid ${loading ? 'rgba(217,119,6,0.2)' : 'rgba(21,128,61,0.2)'}` }}>
              {loading ? <Loader size={9} style={{ color: '#d97706' }} className="animate-spin" /> : <Wifi size={9} style={{ color: '#15803d' }} />}
              <span className="text-[9px] font-bold" style={{ color: loading ? '#d97706' : '#15803d' }}>
                {loading ? 'Loading…' : 'Live API'}
              </span>
            </div>
          </div>

          {/* Search + Chapter */}
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: meta.color }} />
              <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                placeholder="اس کتاب میں تلاش… Search within book"
                className="w-full pl-8 pr-7 py-2 rounded-xl text-xs outline-none"
                style={{ background: 'rgba(255,255,255,0.85)', border: `1.5px solid ${meta.color}30`, color: '#111' }} />
              {searchQuery && <button onClick={() => setSearchQuery('')} className="absolute right-2.5 top-1/2 -translate-y-1/2"><X size={12} color="#9ca3af" /></button>}
            </div>
            <button onClick={() => setShowChapters(!showChapters)}
              className="px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 flex-shrink-0"
              style={{ background: showChapters ? `${meta.color}15` : 'rgba(255,255,255,0.8)', color: meta.color, border: `1.5px solid ${meta.color}30`, minHeight: 40 }}>
              <List size={13} /><span>ابواب</span>
            </button>
          </div>
        </div>

        {/* ─── Chapter List ─── */}
        {showChapters && (
          <div className="mx-4 mt-2 rounded-2xl overflow-hidden"
            style={{ border: `1.5px solid ${meta.color}25`, background: 'rgba(255,255,255,0.97)' }}>
            <div className="p-3 border-b" style={{ borderColor: `${meta.color}15`, background: `${meta.color}08` }}>
              <p className="text-xs font-bold" style={{ color: meta.color }}>ابواب • Chapters ({meta.chapters.length})</p>
            </div>
            <div className="max-h-64 overflow-y-auto">
              {meta.chapters.map(chap => (
                <button key={chap.number} onClick={() => goToChapter(chap)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-left border-b last:border-b-0 transition-all"
                  style={{
                    background: selectedChapter === chap.number ? `${meta.color}10` : 'transparent',
                    borderColor: 'rgba(0,0,0,0.04)',
                  }}>
                  <span className="text-[10px] font-bold w-6 text-center flex-shrink-0" style={{ color: meta.color }}>{chap.number}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-gray-800 truncate" style={{ fontFamily: "'Amiri',serif" }}>{chap.nameUr}</p>
                    <p className="text-[9px] text-gray-400">{chap.nameEn} • #{chap.from}–{chap.to}</p>
                  </div>
                  <ChevronRight size={10} color="#9ca3af" className="flex-shrink-0" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ─── Content ─── */}
        <div className="px-4 pt-4">

          {/* Book Header Card */}
          <div className="glass-panel-luminous p-4 mb-4"
            style={{ background: `linear-gradient(135deg, ${meta.color}08, rgba(255,255,255,0.96))`, border: `1.5px solid ${meta.color}30` }}>
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ background: `${meta.color}12`, border: `1.5px solid ${meta.color}30` }}>
                {meta.icon}
              </div>
              <div className="flex-1">
                <p className="text-base font-bold" style={{ fontFamily: "'Amiri',serif", color: meta.color }}>{meta.nameAr}</p>
                <p className="text-xs font-bold text-gray-700">{meta.nameUr} • {meta.nameEn}</p>
                <p className="text-[10px] text-gray-500 mt-0.5">{meta.authorUr} | {meta.author}</p>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {[
                    `${meta.total.toLocaleString()} احادیث`,
                    `${meta.chapters.length} ابواب`,
                    'مستند',
                  ].map(tag => (
                    <span key={tag} className="text-[9px] font-bold px-2 py-0.5 rounded-full"
                      style={{ background: `${meta.color}10`, color: meta.color, border: `1px solid ${meta.color}20` }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
            {/* Progress bar */}
            <div className="mt-3">
              <div className="flex justify-between text-[9px] text-gray-400 mb-1">
                <span>#{startNum}</span>
                <span>#{endNum} / {meta.total.toLocaleString()}</span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: `${meta.color}15` }}>
                <div className="h-full rounded-full transition-all"
                  style={{ width: `${(endNum / meta.total) * 100}%`, background: `linear-gradient(90deg, ${meta.color}, ${meta.color}80)` }} />
              </div>
            </div>
          </div>

          {/* Loading */}
          {loading && hadiths.length === 0 && <LoadingSkeleton />}

          {/* Error */}
          {error && !loading && hadiths.length === 0 && (
            <div className="glass-panel-luminous p-6 text-center" style={{ border: '1.5px solid rgba(220,38,38,0.2)' }}>
              <WifiOff size={32} color="#dc2626" style={{ opacity: 0.4, margin: '0 auto 12px' }} />
              <p className="text-sm font-bold text-gray-700">انٹرنیٹ کنیکشن درکار ہے</p>
              <p className="text-xs text-gray-400 mt-1">Internet required to load Ahadees</p>
              <button onClick={() => loadPage(currentPage)}
                className="mt-3 px-4 py-2 rounded-xl text-xs font-bold text-white"
                style={{ background: '#dc2626' }}>
                دوبارہ کوشش کریں
              </button>
            </div>
          )}

          {/* Search result count */}
          {searchQuery && !loading && (
            <div className="mb-3 px-1 flex items-center gap-2">
              <Filter size={11} style={{ color: meta.color }} />
              <span className="text-[10px] text-gray-500 font-medium">
                <strong style={{ color: meta.color }}>{filteredHadiths.length}</strong> نتائج "{searchQuery}" کے لیے
              </span>
            </div>
          )}

          {/* Hadith Cards */}
          {filteredHadiths.map(hadith => (
            <HadithCard
              key={hadith.number}
              hadith={hadith}
              bookSlug={slug}
              bookMeta={meta}
              bookmarks={settings.bookmarks}
              onToggleBookmark={toggleBookmark}
            />
          ))}

          {/* No results */}
          {searchQuery && filteredHadiths.length === 0 && !loading && (
            <div className="text-center py-8 glass-panel-luminous p-6">
              <p className="text-gray-600 font-medium">اس صفحہ پر کوئی نتیجہ نہیں</p>
              <p className="text-xs text-gray-400 mt-1">No results on this page — try another page</p>
            </div>
          )}

          {/* ─── Pagination ─── */}
          {!searchQuery && hadiths.length > 0 && (
            <div className="mt-4">
              {/* Page number chips */}
              <div className="flex items-center gap-2 justify-center flex-wrap mb-3">
                <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold disabled:opacity-40"
                  style={{ background: 'rgba(255,255,255,0.8)', border: `1.5px solid ${meta.color}25`, color: meta.color }}>
                  ««
                </button>
                <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}
                  className="w-9 h-9 rounded-xl flex items-center justify-center disabled:opacity-40"
                  style={{ background: 'rgba(255,255,255,0.8)', border: `1.5px solid ${meta.color}25`, color: meta.color }}>
                  <ChevronLeft size={15} />
                </button>

                {/* Page chips — show nearby pages */}
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let page = currentPage - 2 + i;
                  if (page < 1) page = i + 1;
                  if (page > totalPages) page = totalPages - (4 - i);
                  if (page < 1 || page > totalPages) return null;
                  return (
                    <button key={page} onClick={() => setCurrentPage(page)}
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold transition-all"
                      style={{
                        background: currentPage === page ? `linear-gradient(135deg, ${meta.color}, ${meta.color}cc)` : 'rgba(255,255,255,0.8)',
                        color: currentPage === page ? '#fff' : meta.color,
                        border: `1.5px solid ${meta.color}${currentPage === page ? '80' : '25'}`,
                        boxShadow: currentPage === page ? `0 2px 12px ${meta.color}40` : 'none',
                        minHeight: 36,
                      }}>
                      {page}
                    </button>
                  );
                })}

                <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}
                  className="w-9 h-9 rounded-xl flex items-center justify-center disabled:opacity-40"
                  style={{ background: 'rgba(255,255,255,0.8)', border: `1.5px solid ${meta.color}25`, color: meta.color }}>
                  <ChevronRight size={15} />
                </button>
                <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold disabled:opacity-40"
                  style={{ background: 'rgba(255,255,255,0.8)', border: `1.5px solid ${meta.color}25`, color: meta.color }}>
                  »»
                </button>
              </div>

              {/* Jump to hadith number */}
              <div className="glass-panel-luminous p-3 flex items-center gap-2"
                style={{ border: `1px solid ${meta.color}15` }}>
                <span className="text-xs text-gray-500 font-medium flex-shrink-0">حدیث نمبر پر جائیں:</span>
                <input type="number" min={1} max={meta.total} placeholder={`1 – ${meta.total}`}
                  className="flex-1 text-xs p-2 rounded-lg outline-none"
                  style={{ background: 'rgba(255,255,255,0.8)', border: `1px solid ${meta.color}25`, color: '#333', minHeight: 36 }}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      const val = parseInt((e.target as HTMLInputElement).value);
                      if (val >= 1 && val <= meta.total) {
                        const targetPage = Math.ceil(val / PAGE_SIZE);
                        setCurrentPage(targetPage);
                      }
                    }
                  }} />
                <span className="text-[9px] text-gray-400">↵ Enter</span>
              </div>
            </div>
          )}

          {/* All Books Quick Nav */}
          <div className="mt-6 glass-panel-luminous p-4" style={{ border: '1.5px solid rgba(220,38,38,0.15)' }}>
            <p className="text-xs font-bold text-gray-600 mb-3">تمام کتب • All Collections</p>
            <div className="grid grid-cols-3 gap-2">
              {ALL_BOOKS.map(book => (
                <button key={book.slug} onClick={() => navigate(`/book/${book.slug}`)}
                  className="flex flex-col items-center gap-1 p-2.5 rounded-xl transition-all"
                  style={{
                    background: slug === book.slug ? `${book.color}12` : 'rgba(255,255,255,0.7)',
                    border: `1.5px solid ${book.color}${slug === book.slug ? '40' : '15'}`,
                    minHeight: 60,
                  }}>
                  <span className="text-xl">{book.icon}</span>
                  <span className="text-[8px] font-bold text-center leading-tight" style={{ color: book.color }}>{book.nameUr}</span>
                  <span className="text-[7px] text-gray-400">{book.total.toLocaleString()}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Navbar />
    </div>
  );
}
