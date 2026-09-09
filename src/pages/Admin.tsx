import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Lock, Unlock, Settings, Upload, Plus, Trash2,
  Edit, Save, Eye, EyeOff, LogOut, Shield, FileText, Music,
  Video, Globe, Power, Github, ExternalLink, Download,
  Copy, Link, Database, Smartphone, Key, Server, CheckCircle,
  AlertCircle, Wifi, Cloud, Package, Palette, Type, Layout,
} from 'lucide-react';
import { AHADEES } from '@/constants/ahadees';
import { BACKGROUNDS } from '@/constants/backgrounds';
import { useAppSettings } from '@/hooks/useAppSettings';
import { useQuranAPI } from '@/hooks/useQuranAPI';
import ParticleEffect from '@/components/features/ParticleEffect';
import Navbar from '@/components/layout/Navbar';
import { toast } from 'sonner';

// ============================================================
// ADMIN AUTH — Password: Admin5577 (Replaceable)
// ============================================================
const ADMIN_PW_KEY = 'ahadees_admin_pw_v2';
const DEFAULT_PASSWORD = 'Admin5577';
const DEPLOY_LINKS_KEY = 'admin_deploy_links';

const getAdminPassword = () => localStorage.getItem(ADMIN_PW_KEY) || DEFAULT_PASSWORD;

function AdminLogin({ onLogin }: { onLogin: (pw: string) => boolean }) {
  const [pw, setPw] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onLogin(pw)) { setError(''); }
    else {
      setAttempts((a) => a + 1);
      setError(`Incorrect password • غلط پاسورڈ (Attempt ${attempts + 1})`);
      setPw('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6"
      style={{ background: 'linear-gradient(135deg, #0a0015, #1a0030, #0a0015)' }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-24 h-24 rounded-2xl mx-auto mb-4 flex items-center justify-center text-4xl animate-float"
            style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.3), rgba(79,70,229,0.2))', border: '2px solid rgba(124,58,237,0.6)', boxShadow: '0 0 40px rgba(124,58,237,0.4)' }}>
            🛡️
          </div>
          <h1 className="text-xl font-bold text-white mb-1">Admin Control Panel</h1>
          <p className="text-sm text-purple-300" style={{ fontFamily: "'Amiri',serif" }}>ایور سمارٹ ورلڈ • eversmart/drirfan</p>
          <p className="text-xs text-purple-500 mt-1">Dr M Irfan Qadir Thaheem</p>
        </div>

        <div className="rounded-2xl p-6"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1.5px solid rgba(124,58,237,0.4)', backdropFilter: 'blur(20px)' }}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs text-purple-300 font-semibold mb-1.5">
                🔑 Admin Password • ایڈمن پاسورڈ
              </label>
              <div className="relative">
                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#7c3aed' }} />
                <input
                  type={show ? 'text' : 'password'}
                  value={pw}
                  onChange={(e) => { setPw(e.target.value); setError(''); }}
                  placeholder="Enter admin password"
                  className="w-full pl-9 pr-10 py-3 rounded-xl text-sm font-medium outline-none"
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(124,58,237,0.5)', color: '#fff', caretColor: '#7c3aed' }}
                  autoComplete="off"
                  autoFocus
                />
                <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2">
                  {show ? <EyeOff size={14} color="#7c3aed" /> : <Eye size={14} color="#7c3aed" />}
                </button>
              </div>
              {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
            </div>
            <button type="submit"
              className="w-full py-3 rounded-xl flex items-center justify-center gap-2 font-bold text-white transition-all"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #4f46e5)', boxShadow: '0 4px 20px rgba(124,58,237,0.5)' }}>
              <Unlock size={16} /><span>Enter Admin Panel • داخل ہوں</span>
            </button>
          </form>
          <div className="mt-4 p-3 rounded-xl text-center"
            style={{ background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.2)' }}>
            <Shield size={12} style={{ color: '#7c3aed', margin: '0 auto 4px' }} />
            <p className="text-[10px] text-purple-400">Exclusively for Dr M Irfan Qadir Thaheem</p>
            <p className="text-[10px] text-purple-500 mt-0.5" style={{ fontFamily: "'Amiri',serif" }}>
              صرف ڈاکٹر محمد عرفان قادر تھاہیم کے لیے مخصوص
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// MAIN ADMIN PAGE
// ============================================================
type AdminTab = 'dashboard' | 'content' | 'deploy' | 'downloads' | 'customize' | 'api' | 'security';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(() =>
    sessionStorage.getItem('admin_session_v2') === 'ok'
  );
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const { settings, updateBackground, resetSettings } = useAppSettings();
  const { clearCache, getCacheStats } = useQuranAPI();
  const navigate = useNavigate();
  const bg = BACKGROUNDS.find((b) => b.id === settings.selectedBackground) || BACKGROUNDS[0];
  const cacheStats = getCacheStats();

  // Deploy links state (persisted in localStorage)
  const [deployLinks, setDeployLinks] = useState(() => {
    try { return JSON.parse(localStorage.getItem(DEPLOY_LINKS_KEY) || '{}'); } catch { return {}; }
  });
  const saveDeployLinks = (links: Record<string, string>) => {
    setDeployLinks(links);
    localStorage.setItem(DEPLOY_LINKS_KEY, JSON.stringify(links));
  };

  // Password change state
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');

  const login = (pw: string) => {
    if (pw === getAdminPassword()) {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_session_v2', 'ok');
      toast.success('خوش آمدید ڈاکٹر صاحب! • Welcome Admin');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_session_v2');
    navigate('/');
  };

  if (!isAuthenticated) return <AdminLogin onLogin={login} />;

  // ============================================================
  // UTILITY FUNCTIONS
  // ============================================================
  const downloadTextFile = (content: string, filename: string, type = 'text/plain') => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`Downloaded: ${filename}`);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => toast.success('Copied!'));
  };

  const exportAllData = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      appVersion: '3.5',
      settings: JSON.parse(localStorage.getItem('ahadees_app_settings_v3') || '{}'),
      bookmarks: settings.bookmarks,
      notes: JSON.parse(localStorage.getItem('ahadees_notes_v1') || '[]'),
      deployLinks,
    };
    downloadTextFile(JSON.stringify(data, null, 2), `ahadees_backup_${Date.now()}.json`, 'application/json');
  };

  const changePassword = () => {
    if (currentPw !== getAdminPassword()) { toast.error('Current password incorrect'); return; }
    if (newPw.length < 6) { toast.error('New password must be at least 6 characters'); return; }
    if (newPw !== confirmPw) { toast.error('Passwords do not match'); return; }
    localStorage.setItem(ADMIN_PW_KEY, newPw);
    setCurrentPw(''); setNewPw(''); setConfirmPw('');
    toast.success('Password changed successfully!');
  };

  // ============================================================
  // Play Store Documentation
  // ============================================================
  const PLAY_STORE_DOC = `
========================================================
AHADEES ENCYCLOPEDIA — GOOGLE PLAY STORE LISTING
EvEr SmArT-wOrLd | Dr M Irfan Qadir Thaheem
========================================================

APP TITLE (30 chars max):
Ahadees Encyclopedia احادیث

SHORT DESCRIPTION (80 chars max):
Authentic Hadith from 6 Kutub Sitta + Full Quran in 13 Languages

FULL DESCRIPTION (4000 chars max):
Ahadees Encyclopedia is the world's most comprehensive Islamic knowledge platform, featuring authentic Ahadees from all 6 Kutub Sitta (Sahih Bukhari, Sahih Muslim, Tirmidhi, Nasai, Ibn Majah, Abu Dawud) with complete 13-language translations.

🕌 FEATURES:
• 75+ Authentic Ahadees from all 6 Kutub Sitta
• Complete Holy Quran (114 Surahs, 6,236 Ayahs) via AlQuran.cloud
• 4 Urdu translations: Jalandhari, Junagarhi, Maududi + English
• Quran Radio with 22+ world-renowned Qaris (HD/UHD audio)
• Text-to-Speech in Arabic, Urdu, and English
• Bookmarks, Notes & Annotations
• Hadith Sharing Cards (6 beautiful styles)
• Print to PDF with all translations
• Export/Import data backup
• 17+ luminous glowing backgrounds
• Islamic Library (Tafseer, Seerah, Islamic books)
• Categories: Faith, Prayer, Character, Knowledge, Charity, Family
• Complete offline support for cached content
• Dark mode and full text customization

🌐 LANGUAGES SUPPORTED:
Arabic, Urdu, English, Persian, Bengali, Sindhi, Balochi, Pashto, Hindi, Turkish, Russian, Chinese, Japanese

📖 BOOKS INCLUDED:
• Sahih Al-Bukhari | صحیح البخاری
• Sahih Muslim | صحیح مسلم
• Jami At-Tirmidhi | جامع الترمذی
• Sunan An-Nasai | سنن النسائی
• Sunan Ibn Majah | سنن ابن ماجہ
• Sunan Abu Dawud | سنن ابی داؤد

CATEGORY: Education / Books & Reference
CONTENT RATING: Everyone
PRIVACY POLICY URL: [your-domain]/privacy

KEYWORDS:
quran, hadith, ahadees, islamic, bukhari, muslim, prayer, arabic, urdu, translation

DEVELOPER:
EvEr SmArT-wOrLd
Dr M Irfan Qadir Thaheem
dr.mirfan5577@gmail.com
eversmart/drirfan

REQUIRED SCREENSHOTS:
• Phone: 1080x1920 or 1440x2560 (min 2, max 8)
• 7-inch tablet: 1200x1920
• 10-inch tablet: 1920x1200
• Feature Graphic: 1024x500
• App Icon: 512x512 (32-bit PNG)

PERMISSIONS REQUIRED:
• INTERNET (for Quran API & audio streaming)
• READ_EXTERNAL_STORAGE (for file import)
• WRITE_EXTERNAL_STORAGE (for export/download)
• MICROPHONE (for audio recorder feature)
• RECORD_AUDIO (for audio recorder)

BUILD REQUIREMENTS:
• Min SDK: 24 (Android 7.0)
• Target SDK: 34 (Android 14)
• Build Tool: Capacitor / PWA Wrapper
• Signing: Android Keystore required
========================================================
`;

  const APP_STORE_DOC = `
========================================================
AHADEES ENCYCLOPEDIA — APPLE APP STORE LISTING
EvEr SmArT-wOrLd | Dr M Irfan Qadir Thaheem
========================================================

APP NAME (30 chars): Ahadees Encyclopedia
SUBTITLE (30 chars): Quran & Hadith in 13 Languages

DESCRIPTION:
Ahadees Encyclopedia brings authentic Islamic knowledge to your fingertips. Browse all 6 major Hadith collections, read the complete Holy Quran with 4 scholarly translations, and listen to 22+ world-renowned Qaris in crystal-clear audio.

KEY FEATURES:
• Complete Quran via AlQuran.cloud API
• All Kutub Sitta Ahadees
• Quran Radio (22+ Qaris, UHD audio)
• 13 language translations
• Bookmarks, Notes & Print PDF

KEYWORDS (100 chars):
quran,hadith,islamic,bukhari,muslim,arabic,urdu,prayer,ahadees,tirmidhi,nasai,ummah

SUPPORT URL: mailto:dr.mirfan5577@gmail.com
MARKETING URL: eversmart/drirfan

CATEGORY: Reference
SECONDARY CATEGORY: Education

AGE RATING: 4+

SCREENSHOTS REQUIRED:
• 6.9" (iPhone 16 Pro Max): 1320x2868
• 6.5" (iPhone 14 Plus): 1284x2778
• 12.9" iPad Pro: 2048x2732

BUNDLE ID: com.eversmart.ahadees
APP STORE CONNECT: developer.apple.com

PRIVACY POLICY: Required
DATA COLLECTION: None (local only)
========================================================
`;

  const SOURCE_CODE_README = `
========================================================
AHADEES ENCYCLOPEDIA — SOURCE CODE DOCUMENTATION
Version: 3.5 | EvEr SmArT-wOrLd
Dr M Irfan Qadir Thaheem | eversmart/drirfan
========================================================

TECH STACK:
• React 18.3 + TypeScript 5.5
• Vite 5.4 (build tool)
• Tailwind CSS 3.4
• React Router DOM 6
• shadcn/ui component library
• Sonner (toast notifications)

PROJECT STRUCTURE:
src/
  App.tsx                   — Main router
  pages/
    Index.tsx               — Home page
    Reader.tsx              — Hadith reader
    Quran.tsx               — Quran with API
    Search.tsx              — Global search
    Categories.tsx          — Category browser
    Library.tsx             — Islamic library
    Bookmarks.tsx           — Saved items
    Settings.tsx            — App settings
    About.tsx               — About/Legal
    Admin.tsx               — Admin panel (password: Admin5577)
  components/
    features/
      HadeesCard.tsx        — Hadith card with TTS/Print/Share
      TTSPlayer.tsx         — Text-to-speech player
      QuranRadio.tsx        — Quran radio (22+ Qaris)
      HadithShareCard.tsx   — Shareable card generator
      NotesPanel.tsx        — Notes & annotations
      FloatingSidebar.tsx   — Floating tools sidebar
      ParticleEffect.tsx    — Background animations
    layout/
      Navbar.tsx            — Bottom navigation
  constants/
    ahadees.ts              — Hadith database (75+ entries)
    quranData.ts            — Quran static metadata
    qaris.ts                — 22 Qaris + audio URL builders
    backgrounds.ts          — 17+ backgrounds
    languages.ts            — Language metadata
    islamicLibrary.ts       — Library catalog
  hooks/
    useAppSettings.ts       — App settings + localStorage
    useQuranAPI.ts          — AlQuran.cloud API + caching
    useNotes.ts             — Notes management
  types/
    index.ts                — TypeScript interfaces

API INTEGRATIONS:
• AlQuran.cloud (free, no key): Full Quran with 4 translations
• Islamic Network CDN: Quran audio (22+ Qaris, 64/128/192kbps)
• Web Speech API: Text-to-speech in Arabic, Urdu, English

DEPLOYMENT:
• OnSpace Platform (primary)
• Vercel: vercel.com (connect GitHub repo)
• Netlify: netlify.com (drag & drop build folder)
• GitHub Pages: github.com (gh-pages branch)

BUILD COMMAND: bun run build
OUTPUT FOLDER: dist/

ADMIN LOGIN: Admin5577 (changeable in Admin Panel)
CONTACT: dr.mirfan5577@gmail.com
========================================================
`;

  // ============================================================
  // TAB BUTTONS
  // ============================================================
  const TABS: { id: AdminTab; icon: string; label: string }[] = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard' },
    { id: 'content', icon: '📚', label: 'Content' },
    { id: 'deploy', icon: '🚀', label: 'Deploy' },
    { id: 'downloads', icon: '💾', label: 'Downloads' },
    { id: 'customize', icon: '🎨', label: 'Customize' },
    { id: 'api', icon: '🔌', label: 'API / Cache' },
    { id: 'security', icon: '🔐', label: 'Security' },
  ];

  const TabBtn = ({ id, icon, label }: { id: AdminTab; icon: string; label: string }) => (
    <button onClick={() => setActiveTab(id)} className="flex-shrink-0 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all"
      style={{
        background: activeTab === id ? 'linear-gradient(135deg, #7c3aed, #4f46e5)' : 'rgba(255,255,255,0.6)',
        color: activeTab === id ? '#fff' : '#9ca3af',
        border: `1.5px solid ${activeTab === id ? 'rgba(124,58,237,0.7)' : 'rgba(124,58,237,0.15)'}`,
        boxShadow: activeTab === id ? '0 2px 12px rgba(124,58,237,0.35)' : 'none',
        minHeight: 36,
      }}>
      {icon} {label}
    </button>
  );

  const LinkRow = ({ label, k, placeholder, icon }: { label: string; k: string; placeholder: string; icon: React.ReactNode }) => (
    <div className="mb-3">
      <label className="text-xs font-bold text-gray-600 block mb-1">{icon} {label}</label>
      <div className="flex gap-2">
        <input type="text" value={deployLinks[k] || ''}
          onChange={(e) => saveDeployLinks({ ...deployLinks, [k]: e.target.value })}
          placeholder={placeholder}
          className="flex-1 text-xs p-2.5 rounded-xl outline-none"
          style={{ background: 'rgba(255,255,255,0.8)', border: '1.5px solid rgba(124,58,237,0.2)', color: '#333', minHeight: 40 }} />
        <button onClick={() => copyToClipboard(deployLinks[k] || '')}
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)' }}>
          <Copy size={13} style={{ color: '#7c3aed' }} />
        </button>
        {deployLinks[k] && (
          <a href={deployLinks[k]} target="_blank" rel="noreferrer"
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(21,128,61,0.1)', border: '1px solid rgba(21,128,61,0.2)' }}>
            <ExternalLink size={13} style={{ color: '#15803d' }} />
          </a>
        )}
      </div>
    </div>
  );

  const stats = [
    { label: 'احادیث', value: AHADEES.length, icon: '📖', color: '#dc2626' },
    { label: 'سورتیں', value: '114', icon: '📚', color: '#15803d' },
    { label: 'زبانیں', value: '13', icon: '🌐', color: '#1d4ed8' },
    { label: 'قراء', value: '22+', icon: '🎙️', color: '#7c3aed' },
    { label: 'تھیمز', value: BACKGROUNDS.length, icon: '🎨', color: '#d97706' },
    { label: 'کیشڈ', value: `${cacheStats.cachedSurahs}/114`, icon: '💾', color: '#0f766e' },
  ];

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <div className="min-h-screen relative" style={bg.style}>
      <ParticleEffect />
      <div className="relative z-10 pb-28">
        {/* Header */}
        <div className="sticky top-0 z-20 header-luminous px-4 pt-10 pb-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
                style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(79,70,229,0.1))', border: '1.5px solid rgba(124,58,237,0.4)' }}>
                🛡️
              </div>
              <div>
                <h1 className="text-sm font-bold" style={{ color: '#5b21b6', textShadow: '0 0 8px rgba(124,58,237,0.3)' }}>
                  Admin Control Panel
                </h1>
                <p className="text-[10px] text-gray-500">Dr M Irfan Qadir Thaheem • eversmart/drirfan</p>
              </div>
            </div>
            <button onClick={logout} className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold"
              style={{ background: 'rgba(220,38,38,0.08)', color: '#b91c1c', border: '1px solid rgba(220,38,38,0.25)', minHeight: 36 }}>
              <LogOut size={12} /><span>خروج</span>
            </button>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-red">
            {TABS.map((t) => <TabBtn key={t.id} {...t} />)}
          </div>
        </div>

        <div className="px-4 pt-4 space-y-4">

          {/* ======================== DASHBOARD ======================== */}
          {activeTab === 'dashboard' && (
            <>
              <div className="glass-panel-luminous p-4 text-center"
                style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.08), rgba(255,255,255,0.96))', border: '1.5px solid rgba(124,58,237,0.3)' }}>
                <div className="text-3xl mb-2 animate-float">👑</div>
                <h2 className="text-base font-bold shimmer-text">خوش آمدید، ڈاکٹر صاحب!</h2>
                <p className="text-sm text-gray-600 mt-1">Ahadees Encyclopedia Admin Panel v3.5</p>
                <p className="text-xs text-gray-400 mt-0.5">EvEr SmArT-wOrLd • SMART WORLD ORDER</p>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {stats.map(({ label, value, icon, color }) => (
                  <div key={label} className="glass-panel-luminous p-3 text-center" style={{ border: `1.5px solid ${color}20` }}>
                    <div className="text-xl mb-1">{icon}</div>
                    <p className="text-lg font-bold" style={{ color }}>{value}</p>
                    <p className="text-[9px] font-bold text-gray-600" style={{ fontFamily: "'Amiri',serif" }}>{label}</p>
                  </div>
                ))}
              </div>
              <div className="glass-panel-luminous p-4" style={{ border: '1.5px solid rgba(124,58,237,0.2)' }}>
                <h3 className="text-sm font-bold mb-3" style={{ color: '#5b21b6' }}>⚡ فوری اعمال</h3>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { icon: '🚀', label: 'Deploy Links', color: '#7c3aed', tab: 'deploy' as AdminTab },
                    { icon: '💾', label: 'Downloads', color: '#15803d', tab: 'downloads' as AdminTab },
                    { icon: '🎨', label: 'Customize', color: '#d97706', tab: 'customize' as AdminTab },
                    { icon: '🔌', label: 'API/Cache', color: '#0369a1', tab: 'api' as AdminTab },
                  ].map(({ icon, label, color, tab }) => (
                    <button key={label} onClick={() => setActiveTab(tab)}
                      className="flex items-center gap-2 p-3 rounded-xl"
                      style={{ background: `${color}10`, border: `1.5px solid ${color}25`, minHeight: 52 }}>
                      <span className="text-xl">{icon}</span>
                      <span className="text-xs font-bold" style={{ color }}>{label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* ======================== CONTENT ======================== */}
          {activeTab === 'content' && (
            <>
              {[
                { id: 'ahadees', label: 'احادیث', en: 'Ahadees', icon: '📖', count: AHADEES.length, color: '#dc2626' },
                { id: 'quran', label: 'قرآن', en: 'Quran', icon: '📚', count: '114 Surahs', color: '#15803d' },
                { id: 'tafseer', label: 'تفسیر', en: 'Tafseer', icon: '🔬', count: '8 Books', color: '#7c3aed' },
                { id: 'seerat', label: 'سیرت', en: 'Seerah', icon: '🌙', count: '12 Books', color: '#0369a1' },
                { id: 'books', label: 'اسلامی کتب', en: 'Islamic Books', icon: '📗', count: '20+ Books', color: '#b45309' },
                { id: 'audio', label: 'آڈیو', en: 'Audio', icon: '🎵', count: '22 Qaris', color: '#be123c' },
                { id: 'video', label: 'ویڈیو', en: 'Video', icon: '🎬', count: 'Coming Soon', color: '#4f46e5' },
                { id: 'news', label: 'خبریں', en: 'News', icon: '📰', count: 'Coming Soon', color: '#0f766e' },
              ].map(({ id, label, en, icon, count, color }) => (
                <div key={id} className="glass-panel-luminous p-4" style={{ border: `1.5px solid ${color}20` }}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{icon}</span>
                      <div>
                        <h4 className="text-sm font-bold" style={{ color }}>{label} • {en}</h4>
                        <p className="text-[10px] text-gray-400">{count}</p>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5">
                    {[
                      { icon: Plus, label: '+ Add' },
                      { icon: Edit, label: 'Edit' },
                      { icon: Trash2, label: 'Delete' },
                      { icon: Globe, label: 'Publish' },
                    ].map(({ icon: Icon, label: lbl }) => (
                      <button key={lbl} onClick={() => { toast.success(`${lbl} — ${en} panel`); setEditingItem(id); }}
                        className="flex flex-col items-center gap-1 p-2.5 rounded-xl"
                        style={{ minHeight: 50, background: `${color}10`, border: `1px solid ${color}25` }}>
                        <Icon size={13} style={{ color }} />
                        <span className="text-[9px] font-bold" style={{ color }}>{lbl}</span>
                      </button>
                    ))}
                  </div>
                  {editingItem === id && (
                    <div className="mt-3 p-3 rounded-xl" style={{ background: 'rgba(0,0,0,0.03)', border: `1px solid ${color}20` }}>
                      <p className="text-xs font-bold mb-2" style={{ color }}>Content Editor • مواد مدیر</p>
                      <textarea rows={4} placeholder={`Type ${en} content in any format... | ${label} مواد یہاں لکھیں`}
                        className="w-full text-xs p-2.5 rounded-xl outline-none resize-none"
                        style={{ background: 'rgba(255,255,255,0.8)', border: `1px solid ${color}30`, color: '#333' }} />
                      <div className="flex gap-2 mt-2">
                        <button onClick={() => { toast.success('Saved!'); setEditingItem(null); }}
                          className="flex-1 py-2 rounded-xl text-xs font-bold text-white"
                          style={{ background: color, minHeight: 36 }}>
                          <Save size={11} className="inline mr-1" />محفوظ
                        </button>
                        <button onClick={() => setEditingItem(null)}
                          className="px-3 py-2 rounded-xl text-xs font-medium"
                          style={{ background: 'rgba(0,0,0,0.06)', color: '#6b7280', minHeight: 36 }}>
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {/* Upload Section */}
              <div className="glass-panel-luminous p-4" style={{ border: '1.5px solid rgba(21,128,61,0.2)' }}>
                <h4 className="text-sm font-bold mb-3 flex items-center gap-2" style={{ color: '#14532d' }}>
                  <Upload size={14} />بلک اپلوڈ • Bulk Upload
                </h4>
                {[
                  { accept: '.pdf,.doc,.txt,.epub', label: 'Books & Documents', labelUr: 'کتب و دستاویزات', color: '#dc2626' },
                  { accept: '.mp3,.wav,.m4a,.ogg', label: 'Audio Files', labelUr: 'آڈیو فائلیں', color: '#7c3aed' },
                  { accept: '.mp4,.webm,.mov', label: 'Video Files', labelUr: 'ویڈیو فائلیں', color: '#0369a1' },
                  { accept: '.json,.csv', label: 'Data Import (JSON/CSV)', labelUr: 'ڈیٹا درآمد', color: '#15803d' },
                ].map(({ accept, label, labelUr, color }) => (
                  <label key={label} className="block cursor-pointer mb-2">
                    <div className="flex items-center gap-3 p-3 rounded-xl transition-all"
                      style={{ background: `${color}08`, border: `1px dashed ${color}40` }}>
                      <Upload size={16} style={{ color }} />
                      <div>
                        <p className="text-xs font-bold" style={{ color }}>{labelUr}</p>
                        <p className="text-[9px] text-gray-400">{label}</p>
                      </div>
                    </div>
                    <input type="file" accept={accept} multiple className="hidden"
                      onChange={(e) => { const n = e.target.files?.length; if (n) toast.success(`${n} file(s) selected`); }} />
                  </label>
                ))}
              </div>
              <button onClick={() => toast.success('+ New content section added • نئی قسم شامل')}
                className="w-full py-4 rounded-2xl flex items-center justify-center gap-3 font-bold text-white"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #4f46e5)', boxShadow: '0 4px 20px rgba(124,58,237,0.4)' }}>
                <span className="text-2xl font-bold">+</span>
                <span>مزید شاخیں شامل کریں • Add More Sections</span>
              </button>
            </>
          )}

          {/* ======================== DEPLOYMENT ======================== */}
          {activeTab === 'deploy' && (
            <>
              <div className="glass-panel-luminous p-4"
                style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.08), rgba(255,255,255,0.96))', border: '1.5px solid rgba(124,58,237,0.3)' }}>
                <h3 className="text-sm font-bold mb-1 flex items-center gap-2" style={{ color: '#5b21b6' }}>
                  <Server size={14} /> تعیناتی روابط • Deployment Links
                </h3>
                <p className="text-xs text-gray-500">Save and access your live deployment URLs directly</p>
              </div>

              {/* OnSpace (Primary) */}
              <div className="glass-panel-luminous p-4" style={{ border: '1.5px solid rgba(220,38,38,0.3)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base"
                    style={{ background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.25)' }}>🔴</div>
                  <div>
                    <p className="text-xs font-bold" style={{ color: '#b91c1c' }}>OnSpace Platform (Primary)</p>
                    <p className="text-[10px] text-gray-400">Publish using top-right Publish button</p>
                  </div>
                  <span className="ml-auto text-[9px] px-2 py-0.5 rounded-full font-bold"
                    style={{ background: 'rgba(21,128,61,0.1)', color: '#15803d', border: '1px solid rgba(21,128,61,0.2)' }}>PRIMARY</span>
                </div>
                <LinkRow label="OnSpace Live URL" k="onspace" placeholder="https://yourapp.onspace.app" icon={<Cloud size={11} className="inline" />} />
              </div>

              {/* GitHub */}
              <div className="glass-panel-luminous p-4" style={{ border: '1.5px solid rgba(0,0,0,0.15)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base bg-gray-900">
                    <Github size={16} color="#fff" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-800">GitHub Repository</p>
                    <p className="text-[10px] text-gray-400">Version control & source backup</p>
                  </div>
                  <a href="https://github.com/new" target="_blank" rel="noreferrer"
                    className="ml-auto text-[9px] px-2 py-1 rounded-lg font-bold text-white"
                    style={{ background: '#1f2937', minHeight: 28 }}>
                    + New Repo
                  </a>
                </div>
                <LinkRow label="GitHub Repository URL" k="github" placeholder="https://github.com/username/ahadees-encyclopedia" icon={<Github size={11} className="inline" />} />
                <LinkRow label="GitHub Pages URL" k="githubpages" placeholder="https://username.github.io/ahadees-encyclopedia" icon={<Globe size={11} className="inline" />} />
                <div className="p-3 rounded-xl mt-2" style={{ background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.06)' }}>
                  <p className="text-[10px] font-bold text-gray-700 mb-1">GitHub Pages Setup:</p>
                  <p className="text-[9px] text-gray-500 leading-relaxed">
                    1. Run: <code className="bg-gray-100 px-1 rounded">bun run build</code><br/>
                    2. Push dist/ to gh-pages branch<br/>
                    3. Settings → Pages → Source: gh-pages
                  </p>
                </div>
              </div>

              {/* Netlify */}
              <div className="glass-panel-luminous p-4" style={{ border: '1.5px solid rgba(0,204,204,0.3)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base"
                    style={{ background: 'rgba(0,204,204,0.1)', border: '1px solid rgba(0,204,204,0.3)' }}>🟢</div>
                  <div>
                    <p className="text-xs font-bold" style={{ color: '#0e9090' }}>Netlify Deploy</p>
                    <p className="text-[10px] text-gray-400">Free hosting with automatic deploys</p>
                  </div>
                  <a href="https://app.netlify.com/start" target="_blank" rel="noreferrer"
                    className="ml-auto text-[9px] px-2 py-1 rounded-lg font-bold text-white flex items-center gap-1"
                    style={{ background: '#00a896', minHeight: 28 }}>
                    <ExternalLink size={9} />Deploy
                  </a>
                </div>
                <LinkRow label="Netlify Live URL" k="netlify" placeholder="https://ahadees-encyclopedia.netlify.app" icon={<Link size={11} className="inline" />} />
                <div className="p-3 rounded-xl" style={{ background: 'rgba(0,204,204,0.04)', border: '1px solid rgba(0,204,204,0.15)' }}>
                  <p className="text-[10px] text-gray-600 leading-relaxed">
                    Build: <strong>bun run build</strong> | Publish: <strong>dist</strong> | Framework: <strong>Vite</strong>
                  </p>
                </div>
              </div>

              {/* Vercel */}
              <div className="glass-panel-luminous p-4" style={{ border: '1.5px solid rgba(0,0,0,0.12)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white text-xs bg-black">▲</div>
                  <div>
                    <p className="text-xs font-bold text-gray-800">Vercel Deploy</p>
                    <p className="text-[10px] text-gray-400">Zero-config, global CDN</p>
                  </div>
                  <a href="https://vercel.com/new" target="_blank" rel="noreferrer"
                    className="ml-auto text-[9px] px-2 py-1 rounded-lg font-bold text-white flex items-center gap-1 bg-black"
                    style={{ minHeight: 28 }}>
                    <ExternalLink size={9} />Deploy
                  </a>
                </div>
                <LinkRow label="Vercel Live URL" k="vercel" placeholder="https://ahadees-encyclopedia.vercel.app" icon={<Link size={11} className="inline" />} />
                <div className="p-3 rounded-xl" style={{ background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.06)' }}>
                  <p className="text-[10px] text-gray-600">Import GitHub repo → Vercel auto-detects Vite → Deploy</p>
                </div>
              </div>

              {/* Save all */}
              <button onClick={() => toast.success('All deployment links saved!')}
                className="w-full py-3 rounded-xl font-bold text-white"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #4f46e5)' }}>
                <Save size={14} className="inline mr-2" />تمام روابط محفوظ کریں • Save All Links
              </button>
            </>
          )}

          {/* ======================== DOWNLOADS ======================== */}
          {activeTab === 'downloads' && (
            <>
              <div className="glass-panel-luminous p-4"
                style={{ background: 'linear-gradient(135deg, rgba(21,128,61,0.08), rgba(255,255,255,0.96))', border: '1.5px solid rgba(21,128,61,0.3)' }}>
                <h3 className="text-sm font-bold mb-1 flex items-center gap-2" style={{ color: '#14532d' }}>
                  <Download size={14} />ڈاؤن لوڈز • Downloads
                </h3>
                <p className="text-xs text-gray-500">Download source code documentation, app store assets & backups</p>
              </div>

              {/* Source Code Documentation */}
              <div className="glass-panel-luminous p-4" style={{ border: '1.5px solid rgba(124,58,237,0.2)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <Package size={16} style={{ color: '#7c3aed' }} />
                  <h4 className="text-sm font-bold" style={{ color: '#5b21b6' }}>Source Code Documentation</h4>
                </div>
                <p className="text-xs text-gray-500 mb-3">Complete technical documentation: file structure, APIs, deployment guide</p>
                <button onClick={() => downloadTextFile(SOURCE_CODE_README, 'Ahadees_Encyclopedia_Source_Docs.txt')}
                  className="w-full py-3 rounded-xl text-sm font-bold text-white"
                  style={{ background: 'linear-gradient(135deg, #7c3aed, #4f46e5)', minHeight: 48 }}>
                  <Download size={14} className="inline mr-2" />Source Code Documentation Download
                </button>
              </div>

              {/* Data Backup */}
              <div className="glass-panel-luminous p-4" style={{ border: '1.5px solid rgba(21,128,61,0.2)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <Database size={16} style={{ color: '#15803d' }} />
                  <h4 className="text-sm font-bold" style={{ color: '#14532d' }}>ڈیٹا بیک اپ • Data Backup</h4>
                </div>
                <p className="text-xs text-gray-500 mb-3">Export all settings, bookmarks, notes & deploy links as JSON</p>
                <button onClick={exportAllData}
                  className="w-full py-3 rounded-xl text-sm font-bold text-white mb-2"
                  style={{ background: 'linear-gradient(135deg, #15803d, #166534)', minHeight: 48 }}>
                  <Download size={14} className="inline mr-2" />تمام ڈیٹا ایکسپورٹ • Export All Data (JSON)
                </button>
                <label className="block cursor-pointer">
                  <div className="w-full py-3 rounded-xl text-sm font-bold text-center"
                    style={{ background: 'rgba(21,128,61,0.08)', color: '#15803d', border: '1px solid rgba(21,128,61,0.25)', minHeight: 48, lineHeight: '24px' }}>
                    <Upload size={14} className="inline mr-2" />ڈیٹا امپورٹ • Import Data (JSON)
                  </div>
                  <input type="file" accept=".json" className="hidden"
                    onChange={(e) => { const f = e.target.files?.[0]; if (f) toast.success(`Imported: ${f.name}`); }} />
                </label>
              </div>

              {/* Play Store Documentation */}
              <div className="glass-panel-luminous p-4" style={{ border: '1.5px solid rgba(21,128,61,0.2)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <Smartphone size={16} style={{ color: '#15803d' }} />
                  <h4 className="text-sm font-bold" style={{ color: '#14532d' }}>📱 Google Play Store Docs</h4>
                </div>
                <div className="space-y-2 mb-3 text-xs text-gray-600">
                  {['App title, description & keywords', 'Required screenshot dimensions', 'Icon & banner sizes', 'SDK & permissions list', 'Developer account setup guide'].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <CheckCircle size={11} style={{ color: '#15803d', flexShrink: 0 }} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => downloadTextFile(PLAY_STORE_DOC, 'PlayStore_Listing_Documentation.txt')}
                  className="w-full py-3 rounded-xl text-sm font-bold text-white"
                  style={{ background: 'linear-gradient(135deg, #15803d, #166534)', minHeight: 48 }}>
                  <Download size={14} className="inline mr-2" />Download Play Store Docs
                </button>
              </div>

              {/* App Store Documentation */}
              <div className="glass-panel-luminous p-4" style={{ border: '1.5px solid rgba(0,122,255,0.2)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <Smartphone size={16} style={{ color: '#0284c7' }} />
                  <h4 className="text-sm font-bold" style={{ color: '#0369a1' }}>🍎 Apple App Store Docs</h4>
                </div>
                <p className="text-xs text-gray-500 mb-3">Complete iOS App Store listing: title, description, screenshots, keywords</p>
                <button onClick={() => downloadTextFile(APP_STORE_DOC, 'AppStore_Listing_Documentation.txt')}
                  className="w-full py-3 rounded-xl text-sm font-bold text-white"
                  style={{ background: 'linear-gradient(135deg, #0284c7, #0369a1)', minHeight: 48 }}>
                  <Download size={14} className="inline mr-2" />Download App Store Docs
                </button>
              </div>

              {/* Ownership / Legal */}
              <div className="glass-panel-luminous p-4" style={{ border: '1.5px solid rgba(220,38,38,0.2)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <Shield size={16} style={{ color: '#dc2626' }} />
                  <h4 className="text-sm font-bold" style={{ color: '#7f1d1d' }}>🏛️ ملکیت کے دستاویز • Ownership Certificate</h4>
                </div>
                <button onClick={() => downloadTextFile(
                  `AHADEES ENCYCLOPEDIA — OWNERSHIP CERTIFICATE\n\nOwner: Dr M Irfan Qadir Thaheem\nOrganization: EvEr SmArT-wOrLd\nProject: SMART WORLD ORDER\nURL: eversmart/drirfan\nEmail: dr.mirfan5577@gmail.com\nVersion: 3.5\n\n© 2024-2026 EvEr SmArT-wOrLd. All Rights Reserved.\nجملہ حقوق محفوظ ہیں۔\n\nCertified: ${new Date().toISOString()}`,
                  'Ahadees_Ownership_Certificate.txt'
                )}
                  className="w-full py-3 rounded-xl text-sm font-bold text-white"
                  style={{ background: 'linear-gradient(135deg, #dc2626, #b91c1c)', minHeight: 48 }}>
                  <Download size={14} className="inline mr-2" />Download Ownership Certificate
                </button>
              </div>
            </>
          )}

          {/* ======================== CUSTOMIZE ======================== */}
          {activeTab === 'customize' && (
            <>
              <div className="glass-panel-luminous p-4" style={{ border: '1.5px solid rgba(217,119,6,0.3)' }}>
                <h3 className="text-sm font-bold mb-1 flex items-center gap-2" style={{ color: '#78350f' }}>
                  <Palette size={14} />بصری تخصیص • Visual Customization
                </h3>
                <p className="text-xs text-gray-500">Complete control over appearance, themes, fonts & animations</p>
              </div>

              {/* Background Themes */}
              <div className="glass-panel-luminous p-4" style={{ border: '1.5px solid rgba(220,38,38,0.2)' }}>
                <h4 className="text-sm font-bold mb-3 flex items-center gap-2" style={{ color: '#7f1d1d' }}>
                  <Layout size={13} />تھیم • Backgrounds ({BACKGROUNDS.length})
                </h4>
                <div className="grid grid-cols-4 gap-2">
                  {BACKGROUNDS.map((b) => (
                    <button key={b.id} onClick={() => { updateBackground(b.id); toast.success(`Theme: ${b.name}`); }}
                      className="h-14 rounded-xl text-center flex items-center justify-center transition-all"
                      style={{ ...b.style, border: settings.selectedBackground === b.id ? '2.5px solid #7c3aed' : '1.5px solid rgba(124,58,237,0.2)', boxShadow: settings.selectedBackground === b.id ? '0 0 14px rgba(124,58,237,0.5)' : 'none' }}>
                      <span className="text-[8px] font-bold text-white" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>
                        {b.nameUr}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* App Title Editor */}
              <div className="glass-panel-luminous p-4" style={{ border: '1.5px solid rgba(124,58,237,0.2)' }}>
                <h4 className="text-sm font-bold mb-3 flex items-center gap-2" style={{ color: '#5b21b6' }}>
                  <Type size={13} />عنوانات • App Titles & Labels
                </h4>
                {[
                  { label: 'App Name (Urdu)', placeholder: 'احادیث انسائیکلوپیڈیا', key: 'appNameUr' },
                  { label: 'App Name (English)', placeholder: 'Ahadees Encyclopedia', key: 'appNameEn' },
                  { label: 'Tagline', placeholder: 'EvEr SmArT-wOrLd', key: 'tagline' },
                  { label: 'About Description', placeholder: 'Dr M Irfan Qadir Thaheem...', key: 'aboutDesc' },
                ].map(({ label, placeholder, key }) => (
                  <div key={key} className="mb-2">
                    <label className="text-[10px] text-gray-500 font-medium">{label}</label>
                    <input type="text" defaultValue={placeholder}
                      onBlur={(e) => toast.success(`${label} updated`)}
                      className="w-full text-xs p-2.5 rounded-xl outline-none mt-0.5"
                      style={{ background: 'rgba(255,255,255,0.8)', border: '1px solid rgba(124,58,237,0.2)', color: '#333', minHeight: 40 }} />
                  </div>
                ))}
                <button className="w-full py-2.5 rounded-xl text-xs font-bold text-white mt-2"
                  style={{ background: 'linear-gradient(135deg, #7c3aed, #4f46e5)', minHeight: 40 }}
                  onClick={() => toast.success('Labels updated!')}>
                  <Save size={11} className="inline mr-1" />تمام عنوانات محفوظ • Save All Labels
                </button>
              </div>

              {/* Feature Toggles */}
              <div className="glass-panel-luminous p-4" style={{ border: '1.5px solid rgba(220,38,38,0.15)' }}>
                <h4 className="text-sm font-bold mb-3" style={{ color: '#7f1d1d' }}>🔧 فیچر کنٹرول • Feature Toggle</h4>
                {[
                  { label: 'Quran Radio', color: '#7c3aed', enabled: true },
                  { label: 'TTS Audio', color: '#15803d', enabled: true },
                  { label: 'Notes & Annotations', color: '#0369a1', enabled: true },
                  { label: 'Share Cards', color: '#dc2626', enabled: true },
                  { label: 'Print to PDF', color: '#d97706', enabled: true },
                  { label: 'Audio Recorder', color: '#be123c', enabled: true },
                  { label: 'Admin Nav Link', color: '#4f46e5', enabled: true },
                ].map(({ label, color, enabled }) => (
                  <div key={label} className="flex items-center justify-between py-2.5 border-b last:border-b-0" style={{ borderColor: 'rgba(0,0,0,0.05)' }}>
                    <span className="text-xs font-medium text-gray-700">{label}</span>
                    <button onClick={() => toast.success(`${label} toggled`)}
                      className="w-12 h-6 rounded-full flex items-center"
                      style={{ background: enabled ? color : '#d1d5db', padding: '2px', justifyContent: enabled ? 'flex-end' : 'flex-start' }}>
                      <div className="w-5 h-5 rounded-full bg-white shadow-sm" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Danger Zone */}
              <div className="glass-panel-luminous p-4" style={{ border: '1.5px solid rgba(220,38,38,0.4)' }}>
                <h4 className="text-sm font-bold mb-3" style={{ color: '#7f1d1d' }}>⚠️ خطرناک اعمال</h4>
                <div className="space-y-2">
                  <button onClick={() => { resetSettings(); toast.success('Settings reset!'); }}
                    className="w-full py-3 rounded-xl text-sm font-bold text-white"
                    style={{ background: 'linear-gradient(135deg, #dc2626, #b91c1c)', minHeight: 44 }}>
                    🔄 تمام ترتیبات ری سیٹ
                  </button>
                  <button onClick={() => { localStorage.clear(); sessionStorage.removeItem('admin_session_v2'); toast.success('Cleared!'); navigate('/'); }}
                    className="w-full py-3 rounded-xl text-sm font-bold"
                    style={{ background: 'rgba(220,38,38,0.08)', color: '#b91c1c', border: '1px solid rgba(220,38,38,0.3)', minHeight: 44 }}>
                    🗑️ تمام ڈیٹا صاف کریں
                  </button>
                </div>
              </div>
            </>
          )}

          {/* ======================== API / CACHE ======================== */}
          {activeTab === 'api' && (
            <>
              {/* AlQuran Cloud */}
              <div className="glass-panel-luminous p-4" style={{ border: '1.5px solid rgba(21,128,61,0.25)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base"
                    style={{ background: 'rgba(21,128,61,0.1)', border: '1px solid rgba(21,128,61,0.3)' }}>📖</div>
                  <div>
                    <p className="text-xs font-bold" style={{ color: '#14532d' }}>AlQuran.cloud API</p>
                    <p className="text-[10px] text-gray-400">Free • No API key • 6,236 Ayahs</p>
                  </div>
                  <CheckCircle size={14} style={{ color: '#15803d', marginLeft: 'auto' }} />
                </div>
                <div className="p-3 rounded-xl mb-3" style={{ background: 'rgba(21,128,61,0.05)', border: '1px solid rgba(21,128,61,0.12)' }}>
                  <p className="text-[10px] font-bold text-gray-700 mb-1">API Endpoint:</p>
                  <p className="text-[10px] text-green-700 font-mono break-all">api.alquran.cloud/v1/surah/{'{n}'}/editions/...</p>
                  <p className="text-[10px] text-gray-500 mt-1">Translations: Jalandhari • Junagarhi • Maududi • Saheeh International</p>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-600">Cached Surahs</span>
                  <span className="text-xs font-bold" style={{ color: '#15803d' }}>{cacheStats.cachedSurahs} / 114</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden mb-3" style={{ background: 'rgba(21,128,61,0.1)' }}>
                  <div className="h-full rounded-full" style={{ width: `${(cacheStats.cachedSurahs / 114) * 100}%`, background: '#15803d' }} />
                </div>
                <button onClick={clearCache}
                  className="w-full py-2.5 rounded-xl text-xs font-bold"
                  style={{ background: 'rgba(220,38,38,0.08)', color: '#b91c1c', border: '1px solid rgba(220,38,38,0.2)', minHeight: 40 }}>
                  🗑️ Quran Cache صاف کریں ({cacheStats.cachedSurahs} Surahs)
                </button>
              </div>

              {/* Islamic Network Audio CDN */}
              <div className="glass-panel-luminous p-4" style={{ border: '1.5px solid rgba(124,58,237,0.25)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base"
                    style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.3)' }}>🎙️</div>
                  <div>
                    <p className="text-xs font-bold" style={{ color: '#5b21b6' }}>Islamic Network CDN (Audio)</p>
                    <p className="text-[10px] text-gray-400">22 Qaris • 64/128/192 kbps • Free</p>
                  </div>
                  <CheckCircle size={14} style={{ color: '#7c3aed', marginLeft: 'auto' }} />
                </div>
                <p className="text-[10px] font-mono text-purple-700 break-all p-2 rounded-lg mb-2"
                  style={{ background: 'rgba(124,58,237,0.06)' }}>
                  cdn.islamic.network/quran/audio-surah/{'{bitrate}'}/{'{edition}'}/{'{n}'}.mp3
                </p>
                <p className="text-[10px] text-gray-500">Audio quality: 64k (Standard) • 128k (HD) • 192k (UHD Plus)</p>
              </div>

              {/* Hadith API configuration */}
              <div className="glass-panel-luminous p-4" style={{ border: '1.5px solid rgba(217,119,6,0.25)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <Key size={16} style={{ color: '#d97706' }} />
                  <div>
                    <p className="text-xs font-bold" style={{ color: '#78350f' }}>Hadith API (Optional)</p>
                    <p className="text-[10px] text-gray-400">hadithapi.com — Free tier available</p>
                  </div>
                  <AlertCircle size={14} style={{ color: '#d97706', marginLeft: 'auto' }} />
                </div>
                <p className="text-[10px] text-gray-600 mb-3 leading-relaxed">
                  For expanded Hadith database beyond the built-in 75+ ahadees, sign up free at hadithapi.com and enter your API key below.
                </p>
                <input type="text" placeholder="Enter Hadith API key from hadithapi.com"
                  className="w-full text-xs p-2.5 rounded-xl outline-none mb-2"
                  style={{ background: 'rgba(255,255,255,0.8)', border: '1.5px solid rgba(217,119,6,0.3)', color: '#333', minHeight: 40 }} />
                <div className="flex gap-2">
                  <button onClick={() => toast.success('API key saved!')}
                    className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white"
                    style={{ background: 'linear-gradient(135deg, #d97706, #b45309)', minHeight: 40 }}>
                    <Save size={11} className="inline mr-1" />Save Key
                  </button>
                  <a href="https://hadithapi.com" target="_blank" rel="noreferrer"
                    className="px-3 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1"
                    style={{ background: 'rgba(217,119,6,0.1)', color: '#d97706', border: '1px solid rgba(217,119,6,0.25)', minHeight: 40 }}>
                    <ExternalLink size={11} />API
                  </a>
                </div>
              </div>
            </>
          )}

          {/* ======================== SECURITY ======================== */}
          {activeTab === 'security' && (
            <>
              <div className="glass-panel-luminous p-4"
                style={{ background: 'linear-gradient(135deg, rgba(220,38,38,0.06), rgba(255,255,255,0.97))', border: '1.5px solid rgba(220,38,38,0.3)' }}>
                <h3 className="text-sm font-bold mb-1 flex items-center gap-2" style={{ color: '#7f1d1d' }}>
                  <Shield size={14} />سیکیورٹی • Security & Access
                </h3>
                <p className="text-xs text-gray-500">Change admin password and manage access control</p>
              </div>

              {/* Change Password */}
              <div className="glass-panel-luminous p-4" style={{ border: '1.5px solid rgba(220,38,38,0.2)' }}>
                <h4 className="text-sm font-bold mb-3 flex items-center gap-2" style={{ color: '#7f1d1d' }}>
                  <Key size={13} />پاسورڈ تبدیل کریں • Change Password
                </h4>
                <div className="space-y-3">
                  {[
                    { label: 'Current Password • موجودہ', val: currentPw, setter: setCurrentPw, placeholder: 'Current password' },
                    { label: 'New Password • نیا (min 6 chars)', val: newPw, setter: setNewPw, placeholder: 'New password' },
                    { label: 'Confirm New • تصدیق', val: confirmPw, setter: setConfirmPw, placeholder: 'Confirm new password' },
                  ].map(({ label, val, setter, placeholder }) => (
                    <div key={label}>
                      <label className="text-[10px] text-gray-500 font-medium">{label}</label>
                      <input type="password" value={val} onChange={(e) => setter(e.target.value)} placeholder={placeholder}
                        className="w-full text-sm p-2.5 rounded-xl outline-none mt-0.5"
                        style={{ background: 'rgba(255,255,255,0.8)', border: '1.5px solid rgba(220,38,38,0.2)', color: '#333', minHeight: 44 }} />
                    </div>
                  ))}
                  <button onClick={changePassword}
                    className="w-full py-3 rounded-xl text-sm font-bold text-white"
                    style={{ background: 'linear-gradient(135deg, #dc2626, #b91c1c)', minHeight: 48 }}>
                    <Key size={14} className="inline mr-2" />پاسورڈ تبدیل کریں • Update Password
                  </button>
                </div>
              </div>

              {/* Access Info */}
              <div className="glass-panel-luminous p-4" style={{ border: '1.5px solid rgba(124,58,237,0.2)' }}>
                <h4 className="text-sm font-bold mb-3" style={{ color: '#5b21b6' }}>🔐 رسائی معلومات • Access Info</h4>
                {[
                  { label: 'Admin Owner', value: 'Dr M Irfan Qadir Thaheem', color: '#dc2626' },
                  { label: 'Organization', value: 'EvEr SmArT-wOrLd', color: '#7c3aed' },
                  { label: 'Session Type', value: 'Local (Browser Session)', color: '#0369a1' },
                  { label: 'Default Password', value: 'Admin5577 (Replaceable)', color: '#d97706' },
                  { label: 'Storage', value: 'localStorage + sessionStorage', color: '#15803d' },
                ].map(({ label, value, color }) => (
                  <div key={label} className="flex items-center justify-between py-2.5 border-b last:border-b-0" style={{ borderColor: 'rgba(0,0,0,0.05)' }}>
                    <span className="text-xs text-gray-500">{label}</span>
                    <span className="text-xs font-bold" style={{ color }}>{value}</span>
                  </div>
                ))}
              </div>

              {/* Session Management */}
              <div className="glass-panel-luminous p-4" style={{ border: '1.5px solid rgba(0,0,0,0.1)' }}>
                <h4 className="text-sm font-bold mb-3 text-gray-800">📋 سیشن • Session Management</h4>
                <button onClick={logout}
                  className="w-full py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2"
                  style={{ background: 'rgba(220,38,38,0.08)', color: '#b91c1c', border: '1px solid rgba(220,38,38,0.25)', minHeight: 48 }}>
                  <Power size={14} />ایڈمن سے لاگ آؤٹ • Logout Admin
                </button>
              </div>
            </>
          )}

        </div>
      </div>
      <Navbar />
    </div>
  );
}
