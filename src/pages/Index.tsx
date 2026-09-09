import { useNavigate } from 'react-router-dom';
import {
  BookOpen, ChevronRight, Star, Library, Grid3X3,
  Sparkles, Globe, Search, BookMarked, Mic,
} from 'lucide-react';
import { useAppSettings } from '@/hooks/useAppSettings';
import { BACKGROUNDS } from '@/constants/backgrounds';
import ParticleEffect from '@/components/features/ParticleEffect';
import Navbar from '@/components/layout/Navbar';
import FloatingSidebar from '@/components/features/FloatingSidebar';
import { AHADEES } from '@/constants/ahadees';
import { LANGUAGES } from '@/constants/languages';
import { KUTUB_SITTA } from '@/constants/islamicLibrary';
import heroImage from '@/assets/hero-bg.jpg';

export default function Index() {
  const navigate = useNavigate();
  const { settings } = useAppSettings();
  const bg = BACKGROUNDS.find((b) => b.id === settings.selectedBackground) || BACKGROUNDS[0];
  const bookmarkedCount = settings.bookmarks.length;
  const todayIndex = new Date().getDate() % AHADEES.length;
  const todayHadith = AHADEES[todayIndex];

  const quickAccess = [
    { icon: BookOpen, label: 'Ahadees', labelUr: 'احادیث', path: '/reader', color: '#dc2626', count: '29,969' },
    { icon: Grid3X3, label: 'Categories', labelUr: 'زمرے', path: '/categories', color: '#7c3aed', count: '11' },
    { icon: BookMarked, label: 'Quran', labelUr: 'قرآن', path: '/quran', color: '#15803d', count: '114' },
    { icon: Library, label: 'Library', labelUr: 'کتب خانہ', path: '/library', color: '#0369a1', count: '20+' },
    { icon: Search, label: 'Search', labelUr: 'تلاش', path: '/search', color: '#b45309', count: '' },
    { icon: Star, label: 'Saved', labelUr: 'محفوظ', path: '/bookmarks', color: '#d97706', count: `${bookmarkedCount}` },
  ];

  return (
    <div className="min-h-screen relative overflow-x-hidden" style={bg.style}>
      <ParticleEffect />

      <div className="relative z-10 pb-28">
        {/* ===== HERO SECTION ===== */}
        <div className="relative overflow-hidden" style={{ height: 300 }}>
          <img src={heroImage} alt="Ahadees Encyclopedia" className="w-full h-full object-cover" style={{ objectPosition: 'center top' }} />

          {/* Multi-layer luminous overlay */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(120,0,0,0.2) 40%, rgba(255,255,255,0.92) 100%)' }} />

          {/* Animated top LED strip */}
          <div className="absolute top-0 left-0 right-0" style={{ height: 4, background: 'linear-gradient(90deg, transparent, rgba(220,38,38,0.9), rgba(255,255,255,1), rgba(251,191,36,0.8), rgba(255,255,255,1), rgba(220,38,38,0.9), transparent)', boxShadow: '0 0 20px rgba(220,38,38,0.7)', animation: 'shimmer 3s linear infinite', backgroundSize: '200% auto' }} />

          {/* Corner LED accents */}
          <div className="absolute top-4 left-4 w-8 h-8 rounded-lg" style={{ border: '2px solid rgba(220,38,38,0.7)', boxShadow: '0 0 12px rgba(220,38,38,0.5)', background: 'rgba(220,38,38,0.1)' }} />
          <div className="absolute top-4 right-4 w-8 h-8 rounded-lg" style={{ border: '2px solid rgba(220,38,38,0.7)', boxShadow: '0 0 12px rgba(220,38,38,0.5)', background: 'rgba(220,38,38,0.1)' }} />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-6 px-4">
            {/* Bismillah */}
            <p className="text-sm text-white/80 mb-1 animate-float" style={{ fontFamily: "'Noto Naskh Arabic','Amiri',serif", textShadow: '0 0 12px rgba(220,38,38,0.8)', direction: 'rtl' }}>
              بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
            </p>
            <h1 className="text-3xl font-bold text-white text-center animate-led-flicker" style={{ fontFamily: "'Noto Naskh Arabic','Amiri',serif", textShadow: '0 0 24px rgba(220,38,38,1), 0 0 48px rgba(220,38,38,0.5), 0 2px 4px rgba(0,0,0,0.9)' }}>
              احادیث انسائیکلوپیڈیا
            </h1>
            <p className="text-xs font-bold mt-1 shimmer-text">
              Ahadees Encyclopedia • eversmart/drirfan
            </p>
            {/* Marquee stats */}
            <div className="mt-3 flex items-center gap-3 overflow-hidden">
              {['29,969 Ahadees', `${LANGUAGES.length} Languages`, '6 Kutub Sitta', '8 Tafseer', '20+ Books'].map((item) => (
                <span key={item} className="flex-shrink-0 text-[10px] font-bold px-2.5 py-1 rounded-full" style={{ background: 'rgba(220,38,38,0.7)', color: 'white', border: '1px solid rgba(255,200,200,0.5)', backdropFilter: 'blur(8px)' }}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ===== STATS ROW ===== */}
        <div className="px-4 py-3 grid grid-cols-4 gap-2">
          {[
            { value: '29,969', label: 'احادیث', color: '#dc2626' },
            { value: LANGUAGES.length, label: 'زبانیں', color: '#1d4ed8' },
            { value: '114', label: 'سورتیں', color: '#15803d' },
            { value: bookmarkedCount, label: 'محفوظ', color: '#d97706' },
          ].map(({ value, label, color }) => (
            <div key={label} className="glass-panel-luminous text-center py-2.5 px-1" style={{ border: `1.5px solid ${color}20` }}>
              <p className="text-lg font-bold" style={{ color, textShadow: `0 0 8px ${color}50` }}>{value}</p>
              <p className="text-[9px] font-semibold text-gray-600" style={{ fontFamily: "'Amiri',serif" }}>{label}</p>
            </div>
          ))}
        </div>

        {/* ===== KUTUB SITTA ===== */}
        <div className="px-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-bold" style={{ color: '#7f1d1d' }}>کتبِ ستہ</h2>
            <button onClick={() => navigate('/library')} className="text-xs flex items-center gap-1" style={{ color: '#dc2626' }}>تمام <ChevronRight size={12} /></button>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-red">
            {KUTUB_SITTA.map((book) => (
              <button key={book.id} onClick={() => navigate('/library')} className="flex-shrink-0 flex flex-col items-center gap-1 p-2.5 rounded-2xl transition-all" style={{ minWidth: 75, background: 'linear-gradient(135deg, rgba(255,255,255,0.94), rgba(255,248,248,0.9))', border: `1.5px solid ${book.color}22`, boxShadow: `0 2px 12px ${book.color}10` }}>
                <span className="text-2xl">{book.icon}</span>
                <p className="text-[9px] font-bold text-center leading-tight" style={{ color: book.color }}>{book.nameUr.split(' ').slice(0, 2).join(' ')}</p>
                <span className="text-[8px] px-1 py-0.5 rounded-full font-semibold" style={{ background: `${book.color}12`, color: book.color }}>{(book.hadithCount / 1000).toFixed(1)}k</span>
              </button>
            ))}
          </div>
        </div>

        {/* ===== HADITH OF THE DAY ===== */}
        <div className="px-4 mb-4">
          <div className="glass-panel-luminous p-4 cursor-pointer" onClick={() => navigate('/reader')} style={{ background: 'linear-gradient(135deg, rgba(220,38,38,0.05), rgba(255,255,255,0.96))', border: '1.5px solid rgba(220,38,38,0.28)', boxShadow: '0 4px 24px rgba(220,38,38,0.1)' }}>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: 'rgba(217,119,6,0.15)', border: '1px solid rgba(217,119,6,0.3)' }}>
                <Sparkles size={12} style={{ color: '#d97706' }} />
              </div>
              <span className="text-xs font-bold" style={{ color: '#d97706' }}>حدیث روز • Hadith of the Day</span>
            </div>
            <p className="text-xl text-right leading-loose mb-2" style={{ fontFamily: "'Noto Naskh Arabic','Amiri',serif", direction: 'rtl', color: '#1a0000' }}>
              {todayHadith.arabic}
            </p>
            <div className="h-px mb-2" style={{ background: 'linear-gradient(90deg, transparent, rgba(220,38,38,0.3), transparent)' }} />
            <p className="text-sm text-gray-700 leading-relaxed mb-1">{todayHadith.translations.en}</p>
            <p className="text-sm text-right text-gray-600 leading-relaxed" style={{ fontFamily: "'Amiri',serif", direction: 'rtl' }}>{todayHadith.translations.ur}</p>
            <div className="flex items-center justify-between mt-3">
              <span className="text-xs font-semibold px-2 py-1 rounded-full" style={{ background: 'rgba(220,38,38,0.08)', color: '#b91c1c', border: '1px solid rgba(220,38,38,0.2)' }}>
                {todayHadith.source} • #{todayHadith.hadithNumber}
              </span>
              <span className="text-xs flex items-center gap-1 font-medium" style={{ color: '#dc2626' }}>مزید پڑھیں <ChevronRight size={12} /></span>
            </div>
          </div>
        </div>

        {/* ===== QUICK ACCESS ===== */}
        <div className="px-4 mb-4">
          <h2 className="text-sm font-bold mb-3" style={{ color: '#7f1d1d' }}>فوری رسائی • Quick Access</h2>
          <div className="grid grid-cols-3 gap-2">
            {quickAccess.map(({ icon: Icon, label, labelUr, path, color, count }) => (
              <button key={path} onClick={() => navigate(path)} className="glass-panel-luminous p-3 text-left flex flex-col gap-2 transition-all duration-200" style={{ border: `1.5px solid ${color}18`, boxShadow: `0 2px 12px ${color}08`, minHeight: 80 }}>
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${color}15, ${color}08)`, border: `1.5px solid ${color}22` }}>
                    <Icon size={16} style={{ color }} />
                  </div>
                  {count && <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: `${color}12`, color }}>{count}</span>}
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900 leading-tight">{label}</p>
                  <p className="text-[10px] text-gray-400" style={{ fontFamily: "'Amiri',serif" }}>{labelUr}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* ===== RECENT AHADEES ===== */}
        <div className="px-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-bold" style={{ color: '#7f1d1d' }}>تازہ احادیث • Recent</h2>
            <button onClick={() => navigate('/reader')} className="text-xs flex items-center gap-1" style={{ color: '#dc2626' }}>تمام <ChevronRight size={12} /></button>
          </div>
          <div className="space-y-2">
            {AHADEES.slice(0, 3).map((h) => (
              <button key={h.id} onClick={() => navigate('/reader')} className="w-full book-card p-3">
                <p className="text-sm text-gray-900 leading-relaxed mb-1 line-clamp-2 text-right" style={{ fontFamily: "'Noto Naskh Arabic','Amiri',serif", direction: 'rtl' }}>{h.arabic}</p>
                <p className="text-xs text-gray-500 text-left line-clamp-1">{h.translations.en}</p>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs font-medium" style={{ color: '#dc2626' }}>{h.source}</p>
                  <p className="text-xs text-gray-400">#{h.hadithNumber}</p>
                </div>
              </button>
            ))}
          </div>
          <button onClick={() => navigate('/library')} className="ios-button w-full mt-3 py-3 flex items-center justify-center gap-2">
            <Globe size={15} />
            <span className="text-sm font-bold">مکمل کتب خانہ • 29,969 Ahadees</span>
            <ChevronRight size={14} />
          </button>
        </div>

        {/* ===== AUDIO FEATURE PROMO ===== */}
        <div className="px-4 mb-4">
          <div className="glass-panel-luminous p-4 flex items-center gap-3" style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.06), rgba(255,255,255,0.94))', border: '1.5px solid rgba(124,58,237,0.2)' }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(124,58,237,0.08))', border: '1.5px solid rgba(124,58,237,0.3)' }}>
              <Mic size={18} color="#7c3aed" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-gray-800">Audio Recitation • صوتی تلاوت</p>
              <p className="text-xs text-gray-500">Listen to any Hadith in Arabic via Text-to-Speech</p>
            </div>
            <button onClick={() => navigate('/reader')} className="text-xs font-semibold px-2 py-1.5 rounded-lg" style={{ background: 'rgba(124,58,237,0.1)', color: '#7c3aed', border: '1px solid rgba(124,58,237,0.25)', minHeight: 36 }}>
              Try
            </button>
          </div>
        </div>

        {/* Brand footer */}
        <div className="px-4 mt-2 text-center pb-2">
          <p className="text-[11px] text-gray-400">EvEr SmArT-wOrLd • Dr M Irfan Qadir Thaheem</p>
          <p className="text-[10px] text-gray-300 mt-0.5">eversmart/drirfan</p>
        </div>
      </div>

      <FloatingSidebar />
      <Navbar />
    </div>
  );
}
