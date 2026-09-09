// ============================================================
// AHADEES ENCYCLOPEDIA — ENTERPRISE LIBRARY PAGE
// Complete Islamic Book Catalog with Real Statistics
// All 6 Kutub Sitta + Tafseer + Seerah + Islamic Books
// EvEr SmArT-wOrLd | Dr M Irfan Qadir Thaheem | eversmart/drirfan
// ============================================================

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen, ChevronRight, ChevronDown, ChevronUp, Library,
  ScrollText, Star, Globe, Users, TrendingUp, Search, ArrowRight,
} from 'lucide-react';
import {
  KUTUB_SITTA, OTHER_HADITH_BOOKS, TAFSEER_BOOKS,
  SEERAH_BOOKS, OTHER_ISLAMIC_BOOKS,
} from '@/constants/islamicLibrary';
import { HADITH_BOOKS_META, BookSlug } from '@/hooks/useHadithAPI';
import { BACKGROUNDS } from '@/constants/backgrounds';
import { useAppSettings } from '@/hooks/useAppSettings';
import ParticleEffect from '@/components/features/ParticleEffect';
import Navbar from '@/components/layout/Navbar';
import FloatingSidebar from '@/components/features/FloatingSidebar';

type LibrarySection = 'hadith' | 'tafseer' | 'seerah' | 'other';

// ─── Book slug mapping ─────────────────────────────────────
const BOOK_SLUGS: Record<string, BookSlug> = {
  'sahih-bukhari': 'bukhari',
  'sahih-muslim': 'muslim',
  'sunan-abu-dawud': 'abu-dawud',
  'sunan-tirmidhi': 'tirmidhi',
  'sunan-nasai': 'nasai',
  'sunan-ibn-majah': 'ibn-majah',
};

const TOTAL_HADITHS = Object.values(HADITH_BOOKS_META).reduce((s, b) => s + b.total, 0);

export default function LibraryPage() {
  const { settings } = useAppSettings();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<LibrarySection>('hadith');
  const [expandedBook, setExpandedBook] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const bg = BACKGROUNDS.find(b => b.id === settings.selectedBackground) || BACKGROUNDS[0];

  const sectionTabs = [
    { id: 'hadith', label: 'احادیث', labelEn: 'Ahadees', icon: BookOpen, count: '29,969' },
    { id: 'tafseer', label: 'تفاسیر', labelEn: 'Tafseer', icon: ScrollText, count: '8' },
    { id: 'seerah', label: 'سیرت', labelEn: 'Seerah', icon: Star, count: '12' },
    { id: 'other', label: 'دیگر', labelEn: 'Islamic', icon: Library, count: '20+' },
  ];

  return (
    <div className="min-h-screen relative" style={bg.style}>
      <ParticleEffect />
      <div className="relative z-10 pb-28">

        {/* ─── Header ─── */}
        <div className="sticky top-0 z-20 header-luminous px-4 pt-10 pb-3">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, rgba(220,38,38,0.15), rgba(220,38,38,0.05))', border: '1.5px solid rgba(220,38,38,0.3)' }}>
              <Library size={20} color="#dc2626" />
            </div>
            <div className="flex-1">
              <h1 className="text-base font-bold led-text-red animate-glow-pulse">اسلامی کتب خانہ</h1>
              <p className="text-[10px] text-gray-500">Islamic Library • Encyclopedia</p>
            </div>
            {/* Global stats */}
            <div className="text-right">
              <p className="text-sm font-bold" style={{ color: '#dc2626' }}>{TOTAL_HADITHS.toLocaleString()}</p>
              <p className="text-[8px] text-gray-400 font-medium">Total Ahadees</p>
            </div>
          </div>

          {/* Section Tabs */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 mb-2 scrollbar-red">
            {sectionTabs.map(({ id, label, icon: Icon, count }) => (
              <button key={id} onClick={() => setActiveSection(id as LibrarySection)}
                className="flex-shrink-0 flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all"
                style={{
                  minHeight: 34,
                  background: activeSection === id
                    ? 'linear-gradient(135deg, rgba(220,38,38,0.15), rgba(220,38,38,0.08))'
                    : 'rgba(255,255,255,0.5)',
                  border: activeSection === id ? '1.5px solid rgba(220,38,38,0.5)' : '1px solid rgba(220,38,38,0.1)',
                  color: activeSection === id ? '#b91c1c' : '#9ca3af',
                  boxShadow: activeSection === id ? '0 2px 8px rgba(220,38,38,0.15)' : 'none',
                }}>
                <Icon size={11} />
                <span>{label}</span>
                <span className="text-[8px] opacity-70">({count})</span>
              </button>
            ))}
          </div>
        </div>

        <div className="px-4 pt-3 space-y-3">

          {/* ─── AHADEES SECTION ─── */}
          {activeSection === 'hadith' && (
            <>
              {/* Encyclopedia Stats */}
              <div className="glass-panel-luminous p-4"
                style={{ background: 'linear-gradient(135deg, rgba(220,38,38,0.06), rgba(255,255,255,0.97))', border: '1.5px solid rgba(220,38,38,0.3)' }}>
                <h2 className="text-sm font-bold mb-3 flex items-center gap-2" style={{ color: '#7f1d1d' }}>
                  <TrendingUp size={14} /> کتبِ ستہ — مکمل احادیث ڈیٹابیس
                </h2>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(HADITH_BOOKS_META).map(([slug, meta]) => (
                    <button key={slug} onClick={() => navigate(`/book/${slug}`)}
                      className="flex items-center gap-2 p-2.5 rounded-xl transition-all text-left"
                      style={{ background: `${meta.color}08`, border: `1.5px solid ${meta.color}20`, minHeight: 52 }}>
                      <span className="text-lg flex-shrink-0">{meta.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold truncate" style={{ color: meta.color }}>{meta.nameUr}</p>
                        <p className="text-[9px] text-gray-500">{meta.total.toLocaleString()} احادیث</p>
                      </div>
                      <ArrowRight size={10} style={{ color: meta.color, flexShrink: 0 }} />
                    </button>
                  ))}
                </div>
                <div className="mt-3 p-2.5 rounded-xl text-center"
                  style={{ background: 'rgba(220,38,38,0.06)', border: '1px solid rgba(220,38,38,0.15)' }}>
                  <p className="text-xs font-bold" style={{ color: '#7f1d1d' }}>
                    مجموعی: <span className="text-base" style={{ color: '#dc2626' }}>{TOTAL_HADITHS.toLocaleString()}</span> مستند احادیث
                  </p>
                  <p className="text-[9px] text-gray-400 mt-0.5">via api.hadith.gading.dev • Live API • Free Access</p>
                </div>
              </div>

              {/* Kutub Sitta Banner */}
              <div className="glass-panel-luminous p-3"
                style={{ background: 'linear-gradient(135deg, rgba(220,38,38,0.06), rgba(255,255,255,0.95))', border: '1.5px solid rgba(220,38,38,0.3)' }}>
                <div className="flex items-center gap-2">
                  <span className="text-xl">📚</span>
                  <div>
                    <h2 className="text-sm font-bold" style={{ color: '#7f1d1d' }}>کتبِ ستہ — The Six Authentic Books</h2>
                    <p className="text-[10px] text-gray-500">ہر کتاب مکمل — پوری احادیث لائیو API سے</p>
                  </div>
                </div>
              </div>

              {/* Kutub Sitta — Live Books */}
              {Object.entries(HADITH_BOOKS_META).map(([slug, meta]) => (
                <div key={slug} className="book-card"
                  style={{ borderLeft: `3px solid ${meta.color}` }}>
                  <div style={{ height: 2, background: `linear-gradient(90deg, ${meta.color}, ${meta.color}30, transparent)` }} />
                  <div className="p-4">
                    <button onClick={() => setExpandedBook(expandedBook === slug ? null : slug)}
                      className="w-full flex items-start gap-3 text-left">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                        style={{ background: `${meta.color}12`, border: `1.5px solid ${meta.color}30` }}>
                        {meta.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h3 className="text-sm font-bold" style={{ color: meta.color }}>{meta.nameUr}</h3>
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full text-white"
                            style={{ background: meta.color }}>کتبِ ستہ</span>
                        </div>
                        <p className="text-xs text-gray-500">{meta.nameEn}</p>
                        <div className="flex items-center gap-3 mt-1 flex-wrap">
                          <span className="text-[11px] font-bold" style={{ color: meta.color }}>
                            {meta.total.toLocaleString()} احادیث
                          </span>
                          <span className="text-[10px] text-gray-400">{meta.chapters.length} ابواب</span>
                          <span className="text-[9px] px-1.5 py-0.5 rounded-full font-semibold"
                            style={{ background: 'rgba(21,128,61,0.1)', color: '#15803d', border: '1px solid rgba(21,128,61,0.2)' }}>
                            ✓ مکمل
                          </span>
                        </div>
                      </div>
                      {expandedBook === slug ? <ChevronUp size={15} color="#9ca3af" /> : <ChevronDown size={15} color="#9ca3af" />}
                    </button>

                    {expandedBook === slug && (
                      <div className="mt-3 pt-3" style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                        <div className="p-3 rounded-xl mb-3"
                          style={{ background: `${meta.color}06`, border: `1px solid ${meta.color}15` }}>
                          <p className="text-xs font-semibold text-gray-700 mb-0.5">مصنف</p>
                          <p className="text-sm font-bold text-gray-900" style={{ fontFamily: "'Amiri',serif" }}>{meta.authorUr}</p>
                          <p className="text-[10px] text-gray-500">{meta.author}</p>
                        </div>

                        {/* Chapters preview */}
                        <p className="text-[10px] text-gray-500 mb-2 font-medium">ابواب • Chapters ({meta.chapters.length})</p>
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {meta.chapters.slice(0, 12).map(c => (
                            <button key={c.number}
                              onClick={() => navigate(`/book/${slug}`)}
                              className="px-2 py-1 rounded-lg text-[9px] font-bold transition-all"
                              style={{ background: `${meta.color}10`, color: meta.color, border: `1px solid ${meta.color}25`, minHeight: 28 }}>
                              {c.nameUr}
                            </button>
                          ))}
                          {meta.chapters.length > 12 && (
                            <button onClick={() => navigate(`/book/${slug}`)}
                              className="px-2 py-1 rounded-lg text-[9px] font-bold"
                              style={{ background: 'rgba(0,0,0,0.06)', color: '#9ca3af' }}>
                              +{meta.chapters.length - 12} مزید
                            </button>
                          )}
                        </div>

                        {/* CTA */}
                        <button onClick={() => navigate(`/book/${slug}`)}
                          className="w-full py-3 rounded-xl flex items-center justify-center gap-2 font-bold text-white transition-all"
                          style={{ background: `linear-gradient(135deg, ${meta.color}, ${meta.color}cc)`, boxShadow: `0 4px 16px ${meta.color}40` }}>
                          <BookOpen size={15} />
                          <span>{meta.nameUr} پڑھیں — Read Full Book</span>
                          <ChevronRight size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Other Hadith Books */}
              <div className="mt-4 mb-2 flex items-center gap-2">
                <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, rgba(220,38,38,0.3))' }} />
                <span className="text-xs font-semibold px-2" style={{ color: '#b91c1c' }}>دیگر مستند کتب</span>
                <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, rgba(220,38,38,0.3), transparent)' }} />
              </div>
              {OTHER_HADITH_BOOKS.map(book => (
                <OtherBookCard
                  key={book.id} book={book}
                  isExpanded={expandedBook === book.id}
                  onToggle={() => setExpandedBook(expandedBook === book.id ? null : book.id)}
                  onRead={() => navigate('/reader')}
                />
              ))}
            </>
          )}

          {/* ─── TAFSEER SECTION ─── */}
          {activeSection === 'tafseer' && (
            <>
              <div className="glass-panel-luminous p-4 mb-1"
                style={{ background: 'linear-gradient(135deg, rgba(21,128,61,0.06), rgba(255,255,255,0.96))', border: '1.5px solid rgba(21,128,61,0.3)' }}>
                <h2 className="text-sm font-bold" style={{ color: '#14532d' }}>📖 تفاسیرِ قرآن</h2>
                <p className="text-xs text-gray-500 mt-0.5">Quranic Commentaries — 8 Major Works</p>
                <p className="text-xs text-gray-600 mt-1 text-right" style={{ fontFamily: "'Amiri',serif", direction: 'rtl' }}>
                  قرآن کریم کی مستند تفاسیر — علماء کرام کی شرح و تفسیر
                </p>
              </div>
              {TAFSEER_BOOKS.map(book => (
                <OtherBookCard
                  key={book.id} book={book}
                  isExpanded={expandedBook === book.id}
                  onToggle={() => setExpandedBook(expandedBook === book.id ? null : book.id)}
                  onRead={() => navigate('/quran')}
                  readLabel="قرآن صفحہ پر جائیں"
                />
              ))}
            </>
          )}

          {/* ─── SEERAH SECTION ─── */}
          {activeSection === 'seerah' && (
            <>
              <div className="glass-panel-luminous p-4 mb-1"
                style={{ background: 'linear-gradient(135deg, rgba(180,83,9,0.06), rgba(255,255,255,0.96))', border: '1.5px solid rgba(180,83,9,0.3)' }}>
                <h2 className="text-sm font-bold" style={{ color: '#78350f' }}>🌙 سیرتِ نبوی ﷺ</h2>
                <p className="text-xs text-gray-500 mt-0.5">Life of Prophet Muhammad ﷺ</p>
              </div>
              {SEERAH_BOOKS.map(book => (
                <OtherBookCard
                  key={book.id} book={book}
                  isExpanded={expandedBook === book.id}
                  onToggle={() => setExpandedBook(expandedBook === book.id ? null : book.id)}
                />
              ))}
            </>
          )}

          {/* ─── OTHER ISLAMIC BOOKS ─── */}
          {activeSection === 'other' && (
            <>
              <div className="glass-panel-luminous p-4 mb-1"
                style={{ background: 'linear-gradient(135deg, rgba(3,105,161,0.06), rgba(255,255,255,0.96))', border: '1.5px solid rgba(3,105,161,0.3)' }}>
                <h2 className="text-sm font-bold" style={{ color: '#0c4a6e' }}>📗 اسلامی علوم و فنون</h2>
                <p className="text-xs text-gray-500 mt-0.5">Islamic Sciences, Ethics & Social Teachings</p>
              </div>
              {OTHER_ISLAMIC_BOOKS.map(book => (
                <OtherBookCard
                  key={book.id} book={book}
                  isExpanded={expandedBook === book.id}
                  onToggle={() => setExpandedBook(expandedBook === book.id ? null : book.id)}
                />
              ))}
            </>
          )}
        </div>
      </div>

      <FloatingSidebar />
      <Navbar />
    </div>
  );
}

// ─── Generic expandable book card ─────────────────────────
function OtherBookCard({
  book, isExpanded, onToggle, onRead, readLabel = 'پڑھیں • Read',
}: {
  book: any;
  isExpanded: boolean;
  onToggle: () => void;
  onRead?: () => void;
  readLabel?: string;
}) {
  return (
    <div className="book-card mb-3">
      <div style={{ height: 3, background: `linear-gradient(90deg, ${book.color}, ${book.color}40, transparent)` }} />
      <div className="p-4">
        <button onClick={onToggle} className="w-full flex items-start gap-3 text-left" style={{ minHeight: 44 }}>
          <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
            style={{ background: `${book.color}12`, border: `1.5px solid ${book.color}30` }}>
            {book.icon}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-gray-900">{book.nameUr}</h3>
            <p className="text-xs text-gray-400">{book.name}</p>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              {book.hadithCount && (
                <span className="text-[10px] font-semibold" style={{ color: book.color }}>
                  {typeof book.hadithCount === 'number' ? book.hadithCount.toLocaleString() : book.hadithCount} احادیث
                </span>
              )}
              {book.volumes && <span className="text-[10px] text-gray-400">{book.volumes} جلد</span>}
              {book.categoryUr && (
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                  style={{ background: `${book.color}10`, color: book.color, border: `1px solid ${book.color}20` }}>
                  {book.categoryUr}
                </span>
              )}
            </div>
          </div>
          {isExpanded ? <ChevronUp size={14} color="#9ca3af" /> : <ChevronDown size={14} color="#9ca3af" />}
        </button>

        {isExpanded && (
          <div className="mt-3 pt-3 space-y-2" style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
            <div className="p-3 rounded-xl" style={{ background: `${book.color}06`, border: `1px solid ${book.color}12` }}>
              <p className="text-xs text-gray-500 mb-0.5">مصنف:</p>
              <p className="text-xs font-semibold text-gray-800" style={{ fontFamily: "'Amiri',serif" }}>{book.authorUr}</p>
              {book.author && <p className="text-[10px] text-gray-400">{book.author}</p>}
              {book.language && <p className="text-[10px] text-gray-400 mt-0.5">زبان: {book.language}</p>}
            </div>
            {(book.description || book.descriptionUr) && (
              <div className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(0,0,0,0.06)' }}>
                {book.description && <p className="text-xs text-gray-700 mb-1">{book.description}</p>}
                {book.descriptionUr && (
                  <p className="text-xs text-gray-600 text-right" style={{ fontFamily: "'Amiri',serif", direction: 'rtl' }}>
                    {book.descriptionUr}
                  </p>
                )}
              </div>
            )}
            {onRead && (
              <button onClick={onRead}
                className="w-full py-2.5 rounded-xl flex items-center justify-center gap-2 text-sm font-bold text-white"
                style={{ background: `linear-gradient(135deg, ${book.color}, ${book.color}cc)`, minHeight: 44 }}>
                <BookOpen size={14} /><span>{readLabel}</span><ChevronRight size={13} />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
