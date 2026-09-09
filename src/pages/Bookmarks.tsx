import { Star } from 'lucide-react';
import { AHADEES } from '@/constants/ahadees';
import { BACKGROUNDS } from '@/constants/backgrounds';
import { useAppSettings } from '@/hooks/useAppSettings';
import ParticleEffect from '@/components/features/ParticleEffect';
import HadeesCard from '@/components/features/HadeesCard';
import Navbar from '@/components/layout/Navbar';
import FloatingSidebar from '@/components/features/FloatingSidebar';
import { toast } from 'sonner';

export default function Bookmarks() {
  const { settings, toggleBookmark, exportSettings } = useAppSettings();
  const bg = BACKGROUNDS.find((b) => b.id === settings.selectedBackground) || BACKGROUNDS[0];
  const bookmarkedAhadees = AHADEES.filter((h) => settings.bookmarks.includes(h.id));

  const handleExportBookmarks = () => {
    let text = 'MY BOOKMARKED AHADEES\nAhadees Encyclopedia — eversmart/drirfan\nBy EvEr SmArT-wOrLd | Dr M Irfan Qadir Thaheem\n';
    text += '='.repeat(60) + '\n\n';
    bookmarkedAhadees.forEach((h, i) => {
      text += `${i + 1}. [${h.source} #${h.hadithNumber}]\n`;
      text += `Arabic: ${h.arabic}\nUrdu: ${h.translations.ur || ''}\nEnglish: ${h.translations.en || ''}\nNarrator: ${h.narrator}\n`;
      text += '-'.repeat(40) + '\n\n';
    });
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `my_bookmarks_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Bookmarks exported! • بُک مارکس محفوظ ہو گئے');
  };

  return (
    <div className="min-h-screen relative" style={bg.style}>
      <ParticleEffect />

      <div className="relative z-10 pb-28">
        {/* Luminous Header */}
        <div className="sticky top-0 z-20 header-luminous px-4 pt-10 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(217,119,6,0.15), rgba(217,119,6,0.05))',
                  border: '1.5px solid rgba(217,119,6,0.3)',
                }}
              >
                <Star size={18} style={{ color: '#d97706' }} />
              </div>
              <div>
                <h1 className="text-base font-bold led-text-red animate-glow-pulse">
                  محفوظ احادیث
                </h1>
                <p className="text-xs text-gray-500">Bookmarked Ahadees</p>
              </div>
            </div>
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
              style={{
                background: 'rgba(217,119,6,0.1)',
                border: '1px solid rgba(217,119,6,0.3)',
              }}
            >
              <Star size={12} style={{ color: '#d97706' }} />
              <span className="text-xs text-amber-700 font-bold">{bookmarkedAhadees.length}</span>
            </div>
          </div>
        </div>

        <div className="px-4 pt-4">
          {bookmarkedAhadees.length === 0 ? (
            <div
              className="text-center py-16 glass-panel-luminous p-8 mt-4"
              style={{ border: '1.5px solid rgba(217,119,6,0.2)' }}
            >
              <div
                className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(217,119,6,0.1), rgba(217,119,6,0.05))',
                  border: '1.5px solid rgba(217,119,6,0.2)',
                }}
              >
                <Star size={36} style={{ color: '#d97706', opacity: 0.4 }} />
              </div>
              <p className="text-gray-700 font-semibold">No bookmarks yet</p>
              <p className="text-gray-400 text-sm mt-1" style={{ fontFamily: "'Amiri', serif" }}>
                ابھی تک کوئی بُک مارک نہیں
              </p>
              <p className="text-gray-400 text-xs mt-3">
                Tap the bookmark icon on any Hadith to save it here.
              </p>
            </div>
          ) : (
            <div>
              <div className="flex justify-end mb-3">
                <button
                  onClick={handleExportBookmarks}
                  className="text-xs font-semibold px-3 py-1.5 rounded-full transition-all"
                  style={{
                    background: 'rgba(220,38,38,0.08)',
                    color: '#b91c1c',
                    border: '1px solid rgba(220,38,38,0.2)',
                  }}
                >
                  Export Bookmarks • برآمد کریں
                </button>
              </div>
              {bookmarkedAhadees.map((hadees, index) => (
                <HadeesCard
                  key={hadees.id}
                  hadees={hadees}
                  primaryLang={settings.primaryLanguage}
                  secondaryLang={settings.secondaryLanguage}
                  showArabic={settings.showArabic}
                  fontSize={settings.fontSize}
                  isBookmarked
                  onToggleBookmark={toggleBookmark}
                  animationDelay={index * 80}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <FloatingSidebar onExportText={handleExportBookmarks} />
      <Navbar />
    </div>
  );
}
