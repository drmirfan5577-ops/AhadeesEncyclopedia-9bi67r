import { useState, useMemo } from 'react';
import { Filter, ChevronDown, BookOpen } from 'lucide-react';
import { AHADEES, CATEGORIES } from '@/constants/ahadees';
import { BACKGROUNDS } from '@/constants/backgrounds';
import { useAppSettings } from '@/hooks/useAppSettings';
import ParticleEffect from '@/components/features/ParticleEffect';
import HadeesCard from '@/components/features/HadeesCard';
import Navbar from '@/components/layout/Navbar';
import FloatingSidebar from '@/components/features/FloatingSidebar';
import { toast } from 'sonner';

export default function Reader() {
  const { settings, toggleBookmark, exportSettings } = useAppSettings();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);

  const bg = BACKGROUNDS.find((b) => b.id === settings.selectedBackground) || BACKGROUNDS[0];

  const filteredAhadees = useMemo(() => {
    if (selectedCategory === 'all') return AHADEES;
    return AHADEES.filter((h) => h.category === selectedCategory);
  }, [selectedCategory]);

  const selectedCat = CATEGORIES.find((c) => c.id === selectedCategory);

  const handleExportText = () => {
    let text = 'AHADEES ENCYCLOPEDIA\nBy EvEr SmArT-wOrLd | Dr M Irfan Qadir Thaheem\neversmart/drirfan\n';
    text += '='.repeat(60) + '\n\n';
    filteredAhadees.forEach((h, i) => {
      text += `${i + 1}. [${h.source} #${h.hadithNumber}]\n`;
      text += `Arabic: ${h.arabic}\nUrdu: ${h.translations.ur || ''}\nEnglish: ${h.translations.en || ''}\nNarrator: ${h.narrator}\n`;
      text += '-'.repeat(40) + '\n\n';
    });
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ahadees_${selectedCategory}_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Text exported! • ٹیکسٹ محفوظ ہو گیا');
  };

  const handleExportJSON = () => {
    const data = { category: selectedCategory, ahadees: filteredAhadees, exportDate: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ahadees_${selectedCategory}_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('JSON exported! • JSON محفوظ ہو گیا');
  };

  const handleCopy = () => {
    const text = filteredAhadees.map((h) =>
      `${h.arabic}\n${h.translations.ur || ''}\n${h.translations.en || ''}\n— ${h.narrator} | ${h.source}`
    ).join('\n\n---\n\n');
    navigator.clipboard.writeText(text).then(() => toast.success('Copied! • کاپی ہو گیا'));
  };

  const handleShare = () => {
    const text = `📖 Ahadees Encyclopedia\nBy EvEr SmArT-wOrLd | eversmart/drirfan\n\n${filteredAhadees[0]?.arabic}\n${filteredAhadees[0]?.translations.en}`;
    if (navigator.share) {
      navigator.share({ title: 'Ahadees Encyclopedia', text });
    } else {
      navigator.clipboard.writeText(text).then(() => toast.success('Copied for sharing!'));
    }
  };

  return (
    <div className="min-h-screen relative" style={bg.style}>
      <ParticleEffect />

      <div className="relative z-10 pb-28">
        {/* Luminous Header */}
        <div className="sticky top-0 z-20 header-luminous px-4 pt-10 pb-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(220,38,38,0.12), rgba(220,38,38,0.05))',
                  border: '1.5px solid rgba(220,38,38,0.25)',
                }}
              >
                <BookOpen size={18} color="#dc2626" />
              </div>
              <div>
                <h1 className="text-base font-bold led-text-red animate-glow-pulse">احادیث</h1>
                <p className="text-xs text-gray-500">Ahadees Encyclopedia</p>
              </div>
            </div>
            <div
              className="text-xs px-2.5 py-1 rounded-full font-semibold"
              style={{
                background: 'rgba(220,38,38,0.08)',
                border: '1px solid rgba(220,38,38,0.25)',
                color: '#b91c1c',
              }}
            >
              {filteredAhadees.length} احادیث
            </div>
          </div>

          {/* Category Filter */}
          <button
            onClick={() => setShowCategoryFilter(!showCategoryFilter)}
            className="flex items-center gap-2 w-full px-3 py-2.5 rounded-xl text-left transition-all"
            style={{
              background: 'rgba(255,255,255,0.7)',
              border: '1.5px solid rgba(220,38,38,0.2)',
              boxShadow: '0 2px 8px rgba(220,38,38,0.06)',
            }}
          >
            <Filter size={14} color="#dc2626" />
            <span className="text-sm text-gray-700 flex-1 font-medium">
              {selectedCat?.labelUr} / {selectedCat?.label}
            </span>
            <ChevronDown
              size={14}
              color="#9ca3af"
              style={{ transform: showCategoryFilter ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
            />
          </button>

          {showCategoryFilter && (
            <div className="mt-2 grid grid-cols-3 gap-1.5 pb-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setShowCategoryFilter(false);
                  }}
                  className="px-2 py-2 rounded-xl text-center text-xs font-semibold transition-all"
                  style={{
                    minHeight: 40,
                    background: selectedCategory === cat.id
                      ? 'linear-gradient(135deg, rgba(220,38,38,0.15), rgba(220,38,38,0.08))'
                      : 'rgba(255,255,255,0.6)',
                    border: selectedCategory === cat.id
                      ? '1.5px solid rgba(220,38,38,0.5)'
                      : '1px solid rgba(220,38,38,0.12)',
                    color: selectedCategory === cat.id ? '#b91c1c' : '#6b7280',
                    boxShadow: selectedCategory === cat.id ? '0 2px 8px rgba(220,38,38,0.15)' : 'none',
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Ahadees List */}
        <div className="px-4 pt-4 scrollbar-red">
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
            <div
              className="glass-panel-luminous p-8 text-center mt-4"
              style={{ border: '1.5px solid rgba(220,38,38,0.2)' }}
            >
              <p className="text-gray-600 font-medium">No Ahadees in this category</p>
              <p className="text-gray-400 text-sm mt-1" style={{ fontFamily: "'Amiri', serif" }}>
                اس زمرے میں کوئی حدیث نہیں
              </p>
            </div>
          )}
        </div>
      </div>

      <FloatingSidebar
        onExportText={handleExportText}
        onExportJSON={handleExportJSON}
        onCopy={handleCopy}
        onShare={handleShare}
      />
      <Navbar />
    </div>
  );
}
