import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AHADEES, CATEGORIES } from '@/constants/ahadees';
import { BACKGROUNDS } from '@/constants/backgrounds';
import { useAppSettings } from '@/hooks/useAppSettings';
import ParticleEffect from '@/components/features/ParticleEffect';
import Navbar from '@/components/layout/Navbar';
import FloatingSidebar from '@/components/features/FloatingSidebar';
import HadeesCard from '@/components/features/HadeesCard';

const CATEGORY_ICONS: Record<string, string> = {
  all: '🌟', faith: '☪️', prayer: '🕌', character: '💎', knowledge: '📚',
  charity: '🤲', family: '👨‍👩‍👧‍👦', social: '🤝', worship: '🙏', etiquette: '✨', patience: '🕊️',
};

const CATEGORY_COLORS: Record<string, string> = {
  all: '#dc2626', faith: '#7c3aed', prayer: '#1d4ed8', character: '#0f766e',
  knowledge: '#b45309', charity: '#15803d', family: '#be123c',
  social: '#0369a1', worship: '#7c3aed', etiquette: '#c2410c', patience: '#4f46e5',
};

const CATEGORY_DESC: Record<string, { ur: string; en: string }> = {
  faith: { ur: 'عقیدہ، ایمان اور یقین', en: 'Beliefs, faith and conviction' },
  prayer: { ur: 'نماز اور عبادت', en: 'Salah and acts of worship' },
  character: { ur: 'اخلاق اور کردار', en: 'Morals and character building' },
  knowledge: { ur: 'علم اور تعلیم', en: 'Learning and scholarship' },
  charity: { ur: 'صدقہ اور خیرات', en: 'Charity and generosity' },
  family: { ur: 'خاندان اور رشتے', en: 'Family and relationships' },
  social: { ur: 'معاشرتی زندگی', en: 'Social conduct and community' },
  worship: { ur: 'عبادات اور ارکانِ دین', en: 'Acts of devotion' },
  etiquette: { ur: 'آداب اور طریقے', en: 'Islamic manners and etiquette' },
  patience: { ur: 'صبر اور استقامت', en: 'Patience and perseverance' },
};

export default function CategoriesPage() {
  const { settings, toggleBookmark } = useAppSettings();
  const navigate = useNavigate();
  const [selectedCat, setSelectedCat] = useState<string | null>(null);
  const bg = BACKGROUNDS.find((b) => b.id === settings.selectedBackground) || BACKGROUNDS[0];

  const getCategoryCount = (catId: string) =>
    catId === 'all' ? AHADEES.length : AHADEES.filter((h) => h.category === catId).length;

  const filteredAhadees = selectedCat
    ? AHADEES.filter((h) => h.category === selectedCat)
    : [];

  const displayCategories = CATEGORIES.filter((c) => c.id !== 'all');

  return (
    <div className="min-h-screen relative" style={bg.style}>
      <ParticleEffect />
      <div className="relative z-10 pb-28">
        {/* Header */}
        <div className="sticky top-0 z-20 header-luminous px-4 pt-10 pb-4">
          <div className="flex items-center justify-between mb-1">
            <div>
              <h1 className="text-lg font-bold led-text-red animate-glow-pulse">زمرہ جات</h1>
              <p className="text-xs text-gray-500">Hadith Categories • {AHADEES.length} Total</p>
            </div>
            {selectedCat && (
              <button onClick={() => setSelectedCat(null)}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold"
                style={{ background: 'rgba(220,38,38,0.08)', color: '#b91c1c', border: '1px solid rgba(220,38,38,0.25)', minHeight: 36 }}>
                ← واپس
              </button>
            )}
          </div>
          {selectedCat && (
            <div className="mt-2 px-3 py-2 rounded-xl flex items-center gap-2"
              style={{ background: `${CATEGORY_COLORS[selectedCat]}12`, border: `1px solid ${CATEGORY_COLORS[selectedCat]}30` }}>
              <span className="text-lg">{CATEGORY_ICONS[selectedCat]}</span>
              <div>
                <p className="text-xs font-bold" style={{ color: CATEGORY_COLORS[selectedCat] }}>
                  {CATEGORIES.find(c => c.id === selectedCat)?.labelUr} • {filteredAhadees.length} احادیث
                </p>
                <p className="text-[10px] text-gray-400">{CATEGORY_DESC[selectedCat]?.en}</p>
              </div>
            </div>
          )}
        </div>

        <div className="px-4 pt-4">
          {selectedCat ? (
            /* Hadith List for selected category */
            <div>
              {filteredAhadees.map((hadees, index) => (
                <HadeesCard
                  key={hadees.id}
                  hadees={hadees}
                  primaryLang={settings.primaryLanguage}
                  secondaryLang={settings.secondaryLanguage}
                  showArabic={settings.showArabic}
                  fontSize={settings.fontSize}
                  isBookmarked={settings.bookmarks.includes(hadees.id)}
                  onToggleBookmark={toggleBookmark}
                  animationDelay={index * 40}
                  showNarrator={settings.showNarrator}
                  showTags={settings.showTags}
                />
              ))}
              {filteredAhadees.length === 0 && (
                <div className="glass-panel-luminous p-8 text-center">
                  <p className="text-gray-500">اس زمرے میں کوئی حدیث نہیں • No ahadees in this category</p>
                </div>
              )}
            </div>
          ) : (
            /* Category Grid */
            <>
              {/* All Ahadees Banner */}
              <button onClick={() => navigate('/reader')}
                className="w-full book-card p-4 mb-5 text-left"
                style={{ background: 'linear-gradient(135deg, rgba(220,38,38,0.08), rgba(255,255,255,0.96))', border: '1.5px solid rgba(220,38,38,0.3)', boxShadow: '0 6px 28px rgba(220,38,38,0.14)' }}>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                    style={{ background: 'linear-gradient(135deg, rgba(220,38,38,0.15), rgba(220,38,38,0.05))', border: '1.5px solid rgba(220,38,38,0.3)', boxShadow: '0 0 16px rgba(220,38,38,0.2)' }}>
                    {CATEGORY_ICONS.all}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-bold" style={{ color: '#7f1d1d' }}>تمام احادیث مبارکہ</h3>
                    <p className="text-xs text-gray-500 mt-0.5">All Authentic Ahadees</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-2xl font-bold leading-none" style={{ color: '#dc2626' }}>{AHADEES.length}</span>
                      <span className="text-xs font-medium text-gray-400">احادیث شریف</span>
                    </div>
                  </div>
                  <div className="w-9 h-9 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.2)' }}>
                    <span style={{ color: '#dc2626', fontSize: 18, lineHeight: 1 }}>›</span>
                  </div>
                </div>
              </button>

              {/* Section Header */}
              <div className="flex items-center gap-3 mb-4">
                <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, rgba(220,38,38,0.3))' }} />
                <span className="text-xs font-bold px-2" style={{ color: '#7f1d1d' }}>موضوعات • Topics</span>
                <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, rgba(220,38,38,0.3), transparent)' }} />
              </div>

              {/* Category Grid — 2 columns */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                {displayCategories.map((cat) => {
                  const count = getCategoryCount(cat.id);
                  const color = CATEGORY_COLORS[cat.id] || '#dc2626';
                  const icon = CATEGORY_ICONS[cat.id] || '📖';
                  const desc = CATEGORY_DESC[cat.id];
                  const pct = Math.round((count / AHADEES.length) * 100);

                  return (
                    <button key={cat.id} onClick={() => setSelectedCat(cat.id)}
                      className="category-card p-4 text-left flex flex-col gap-2.5"
                      style={{ border: `1.5px solid ${color}25`, minHeight: 130, position: 'relative', overflow: 'hidden' }}>
                      {/* Progress fill */}
                      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: `${pct * 0.5}%`, background: `${color}08`, zIndex: 0 }} />
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                        style={{ background: `linear-gradient(135deg, ${color}18, ${color}08)`, border: `1.5px solid ${color}28`, zIndex: 1 }}>
                        {icon}
                      </div>
                      <div style={{ zIndex: 1 }}>
                        <h3 className="text-sm font-bold text-gray-900">{cat.labelUr}</h3>
                        {desc && <p className="text-[10px] text-gray-400 mt-0.5 leading-tight">{desc.ur}</p>}
                      </div>
                      <div className="flex items-center justify-between mt-auto" style={{ zIndex: 1 }}>
                        <span className="text-xl font-bold" style={{ color, textShadow: `0 0 8px ${color}30` }}>{count}</span>
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded-full"
                          style={{ background: `${color}14`, color, border: `1px solid ${color}28` }}>احادیث</span>
                      </div>
                      {/* Progress Bar */}
                      <div className="h-1 rounded-full overflow-hidden" style={{ background: `${color}15`, zIndex: 1 }}>
                        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: color, boxShadow: `0 0 4px ${color}50` }} />
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Info Banner */}
              <div className="p-4 rounded-2xl text-center"
                style={{ background: 'linear-gradient(135deg, rgba(220,38,38,0.06), rgba(255,255,255,0.9))', border: '1px solid rgba(220,38,38,0.15)' }}>
                <p className="text-sm font-medium text-gray-700 leading-relaxed" style={{ fontFamily: "'Amiri',serif", direction: 'rtl' }}>
                  احادیث مبارکہ کا یہ ذخیرہ مسلسل اپڈیٹ ہوتا رہے گا — ان شاء اللہ
                </p>
                <p className="text-xs text-gray-400 mt-1">This collection is continuously updated with authentic Ahadees</p>
              </div>
            </>
          )}
        </div>
      </div>
      <FloatingSidebar />
      <Navbar />
    </div>
  );
}
