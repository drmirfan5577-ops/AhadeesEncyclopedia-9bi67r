import { useState } from 'react';
import {
  Settings2, Palette, Type, Layers, Zap, Sun, Moon, RotateCcw,
  ChevronRight, Check, Download, Upload,
} from 'lucide-react';
import { BACKGROUNDS } from '@/constants/backgrounds';
import { useAppSettings } from '@/hooks/useAppSettings';
import ParticleEffect from '@/components/features/ParticleEffect';
import Navbar from '@/components/layout/Navbar';
import FloatingSidebar from '@/components/features/FloatingSidebar';
import BackgroundSelector from '@/components/features/BackgroundSelector';
import LanguageSelector from '@/components/features/LanguageSelector';
import ExportImport from '@/components/features/ExportImport';
import { toast } from 'sonner';
import { AppSettings } from '@/types';

type SettingsTab = 'appearance' | 'display' | 'language' | 'data';

export default function Settings() {
  const {
    settings, updateBackground, updateFontSize, updateFontFamily,
    updateAccentColor, updateAnimationLevel, updateDisplayTexture,
    updateCardStyle, toggleShowArabic, toggleShowNarrator, toggleShowTags,
    toggleDarkMode, resetSettings, exportSettings, importSettings,
    updatePrimaryLanguage, updateSecondaryLanguage,
  } = useAppSettings();

  const [activeTab, setActiveTab] = useState<SettingsTab>('appearance');
  const bg = BACKGROUNDS.find((b) => b.id === settings.selectedBackground) || BACKGROUNDS[0];

  const tabs = [
    { id: 'appearance', label: 'ظاہری', labelEn: 'Appearance', icon: Palette },
    { id: 'display', label: 'ڈسپلے', labelEn: 'Display', icon: Layers },
    { id: 'language', label: 'زبان', labelEn: 'Language', icon: Type },
    { id: 'data', label: 'ڈیٹا', labelEn: 'Data', icon: Download },
  ];

  const accentColors: { id: AppSettings['accentColor']; label: string; color: string }[] = [
    { id: 'red', label: 'سرخ', color: '#dc2626' },
    { id: 'blue', label: 'نیلا', color: '#2563eb' },
    { id: 'green', label: 'سبز', color: '#16a34a' },
    { id: 'gold', label: 'سنہرا', color: '#d97706' },
    { id: 'purple', label: 'بنفشہ', color: '#7c3aed' },
    { id: 'teal', label: 'فیروزی', color: '#0f766e' },
  ];

  const fontFamilies: { id: AppSettings['fontFamily']; label: string; labelEn: string; sample: string }[] = [
    { id: 'noto', label: 'نوٹو نسخ', labelEn: 'Noto Naskh', sample: 'بِسْمِ اللَّهِ' },
    { id: 'amiri', label: 'امیری', labelEn: 'Amiri', sample: 'بِسْمِ اللَّهِ' },
    { id: 'inter', label: 'انٹر', labelEn: 'Inter', sample: 'Bismillah' },
    { id: 'scheherazade', label: 'شہرزاد', labelEn: 'Scheherazade', sample: 'بِسْمِ اللَّهِ' },
  ];

  const fontSizes: { id: AppSettings['fontSize']; label: string; size: string }[] = [
    { id: 'sm', label: 'چھوٹا', size: '14px' },
    { id: 'md', label: 'درمیانہ', size: '16px' },
    { id: 'lg', label: 'بڑا', size: '18px' },
    { id: 'xl', label: 'بہت بڑا', size: '22px' },
  ];

  const animLevels: { id: AppSettings['animationLevel']; label: string; labelEn: string }[] = [
    { id: 'off', label: 'بند', labelEn: 'Off' },
    { id: 'low', label: 'کم', labelEn: 'Low' },
    { id: 'medium', label: 'درمیانہ', labelEn: 'Medium' },
    { id: 'high', label: 'زیادہ', labelEn: 'High' },
  ];

  const textures: { id: AppSettings['displayTexture']; label: string; labelEn: string; desc: string }[] = [
    { id: 'glass', label: 'شیشہ', labelEn: 'Glass', desc: 'Glossy translucent' },
    { id: 'frosted', label: 'فراسٹڈ', labelEn: 'Frosted', desc: 'Matte frosted' },
    { id: 'crystal', label: 'کرسٹل', labelEn: 'Crystal', desc: 'Clear crystal' },
    { id: 'neon', label: 'نیون', labelEn: 'Neon', desc: 'Glow neon' },
    { id: 'solid', label: 'ٹھوس', labelEn: 'Solid', desc: 'Clean solid' },
  ];

  const cardStyles: { id: AppSettings['cardStyle']; label: string; labelEn: string }[] = [
    { id: 'default', label: 'معیاری', labelEn: 'Default' },
    { id: 'minimal', label: 'سادہ', labelEn: 'Minimal' },
    { id: 'bordered', label: 'بارڈر', labelEn: 'Bordered' },
    { id: 'glow', label: 'گلو', labelEn: 'Glow' },
    { id: 'shadow', label: 'سایہ', labelEn: 'Shadow' },
  ];

  const activeAccent = accentColors.find((c) => c.id === settings.accentColor)?.color || '#dc2626';

  const Toggle = ({ value, onChange, label }: { value: boolean; onChange: () => void; label: string }) => (
    <div className="flex items-center justify-between py-3" style={{ borderBottom: '1px solid rgba(220,38,38,0.08)' }}>
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <button
        onClick={onChange}
        className="relative w-12 h-6 rounded-full transition-all duration-300"
        style={{ background: value ? activeAccent : '#e5e7eb', border: `1.5px solid ${value ? activeAccent : '#d1d5db'}`, minWidth: 48, minHeight: 28 }}
      >
        <div className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all duration-300" style={{ left: value ? '22px' : '2px' }} />
      </button>
    </div>
  );

  return (
    <div className="min-h-screen relative" style={bg.style}>
      <ParticleEffect />
      <div className="relative z-10 pb-28">

        {/* Header */}
        <div className="sticky top-0 z-20 header-luminous px-4 pt-10 pb-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${activeAccent}18, ${activeAccent}08)`, border: `1.5px solid ${activeAccent}35` }}>
                <Settings2 size={18} style={{ color: activeAccent }} />
              </div>
              <div>
                <h1 className="text-base font-bold" style={{ color: activeAccent, textShadow: `0 0 8px ${activeAccent}50` }}>
                  ترتیبات • Settings
                </h1>
                <p className="text-xs text-gray-500">Customize your experience</p>
              </div>
            </div>
            <button onClick={() => { resetSettings(); toast.success('Settings reset • ترتیبات ری سیٹ'); }} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold" style={{ background: 'rgba(220,38,38,0.06)', color: '#b91c1c', border: '1px solid rgba(220,38,38,0.2)', minHeight: 36 }}>
              <RotateCcw size={12} /><span>Reset</span>
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-1.5 overflow-x-auto pb-1">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button key={id} onClick={() => setActiveTab(id as SettingsTab)} className="flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all" style={{ minHeight: 36, background: activeTab === id ? `${activeAccent}18` : 'rgba(255,255,255,0.5)', border: activeTab === id ? `1.5px solid ${activeAccent}50` : '1px solid rgba(0,0,0,0.08)', color: activeTab === id ? activeAccent : '#9ca3af' }}>
                <Icon size={12} /><span>{label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="px-4 pt-4 space-y-4">

          {/* APPEARANCE TAB */}
          {activeTab === 'appearance' && (
            <>
              {/* Accent Color */}
              <div className="glass-panel-luminous p-4">
                <h3 className="text-sm font-bold mb-3" style={{ color: '#7f1d1d' }}>رنگ تھیم • Accent Color</h3>
                <div className="grid grid-cols-3 gap-2">
                  {accentColors.map((c) => (
                    <button key={c.id} onClick={() => updateAccentColor(c.id)} className="flex items-center gap-2 p-3 rounded-xl transition-all" style={{ background: settings.accentColor === c.id ? `${c.color}15` : 'rgba(255,255,255,0.5)', border: `1.5px solid ${settings.accentColor === c.id ? c.color : 'rgba(0,0,0,0.08)'}`, minHeight: 48 }}>
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: c.color }}>
                        {settings.accentColor === c.id && <Check size={10} color="#fff" />}
                      </div>
                      <span className="text-xs font-semibold text-gray-700">{c.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Background */}
              <div className="glass-panel-luminous p-4">
                <h3 className="text-sm font-bold mb-3" style={{ color: '#7f1d1d' }}>بیک گراؤنڈ • Background Themes</h3>
                <BackgroundSelector selectedId={settings.selectedBackground} onSelect={updateBackground} />
              </div>

              {/* Animation */}
              <div className="glass-panel-luminous p-4">
                <h3 className="text-sm font-bold mb-3" style={{ color: '#7f1d1d' }}>اینیمیشن • Animation Level</h3>
                <div className="grid grid-cols-2 gap-2">
                  {animLevels.map((a) => (
                    <button key={a.id} onClick={() => updateAnimationLevel(a.id)} className="flex items-center gap-2 p-3 rounded-xl transition-all" style={{ minHeight: 44, background: settings.animationLevel === a.id ? `${activeAccent}12` : 'rgba(255,255,255,0.5)', border: `1.5px solid ${settings.animationLevel === a.id ? activeAccent : 'rgba(0,0,0,0.08)'}`, color: settings.animationLevel === a.id ? activeAccent : '#6b7280' }}>
                      <Zap size={13} style={{ color: 'inherit' }} />
                      <span className="text-xs font-semibold">{a.label} / {a.labelEn}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dark Mode */}
              <div className="glass-panel-luminous p-4">
                <Toggle value={settings.darkMode} onChange={toggleDarkMode} label="Dark Mode • ڈارک موڈ" />
              </div>
            </>
          )}

          {/* DISPLAY TAB */}
          {activeTab === 'display' && (
            <>
              {/* Font Family */}
              <div className="glass-panel-luminous p-4">
                <h3 className="text-sm font-bold mb-3" style={{ color: '#7f1d1d' }}>خط • Font Style</h3>
                <div className="space-y-2">
                  {fontFamilies.map((f) => (
                    <button key={f.id} onClick={() => updateFontFamily(f.id)} className="w-full flex items-center justify-between p-3 rounded-xl transition-all" style={{ minHeight: 52, background: settings.fontFamily === f.id ? `${activeAccent}10` : 'rgba(255,255,255,0.5)', border: `1.5px solid ${settings.fontFamily === f.id ? activeAccent : 'rgba(0,0,0,0.08)'}` }}>
                      <div>
                        <p className="text-xs font-bold text-gray-800">{f.label} / {f.labelEn}</p>
                        <p className="text-lg" style={{ fontFamily: f.id === 'amiri' ? "'Amiri',serif" : f.id === 'inter' ? "'Inter',sans-serif" : "'Noto Naskh Arabic',serif", direction: 'rtl' }}>{f.sample}</p>
                      </div>
                      {settings.fontFamily === f.id && <Check size={16} style={{ color: activeAccent }} />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Font Size */}
              <div className="glass-panel-luminous p-4">
                <h3 className="text-sm font-bold mb-3" style={{ color: '#7f1d1d' }}>سائز • Text Size</h3>
                <div className="grid grid-cols-2 gap-2">
                  {fontSizes.map((s) => (
                    <button key={s.id} onClick={() => updateFontSize(s.id)} className="flex items-center justify-between p-3 rounded-xl transition-all" style={{ minHeight: 52, background: settings.fontSize === s.id ? `${activeAccent}12` : 'rgba(255,255,255,0.5)', border: `1.5px solid ${settings.fontSize === s.id ? activeAccent : 'rgba(0,0,0,0.08)'}` }}>
                      <span className="text-xs font-bold" style={{ color: settings.fontSize === s.id ? activeAccent : '#6b7280' }}>{s.label}</span>
                      <span style={{ fontSize: s.size, fontWeight: 700, color: settings.fontSize === s.id ? activeAccent : '#374151' }}>ا</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Display Texture */}
              <div className="glass-panel-luminous p-4">
                <h3 className="text-sm font-bold mb-3" style={{ color: '#7f1d1d' }}>ٹیکسچر • Display Texture</h3>
                <div className="space-y-2">
                  {textures.map((t) => (
                    <button key={t.id} onClick={() => updateDisplayTexture(t.id)} className="w-full flex items-center justify-between p-3 rounded-xl transition-all" style={{ minHeight: 44, background: settings.displayTexture === t.id ? `${activeAccent}10` : 'rgba(255,255,255,0.5)', border: `1.5px solid ${settings.displayTexture === t.id ? activeAccent : 'rgba(0,0,0,0.08)'}` }}>
                      <div>
                        <p className="text-xs font-bold text-gray-800">{t.label} / {t.labelEn}</p>
                        <p className="text-[10px] text-gray-400">{t.desc}</p>
                      </div>
                      {settings.displayTexture === t.id && <Check size={15} style={{ color: activeAccent }} />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Card Style */}
              <div className="glass-panel-luminous p-4">
                <h3 className="text-sm font-bold mb-3" style={{ color: '#7f1d1d' }}>کارڈ اسٹائل • Card Style</h3>
                <div className="grid grid-cols-3 gap-2">
                  {cardStyles.map((c) => (
                    <button key={c.id} onClick={() => updateCardStyle(c.id)} className="p-2 rounded-xl text-center transition-all" style={{ minHeight: 44, background: settings.cardStyle === c.id ? `${activeAccent}12` : 'rgba(255,255,255,0.5)', border: `1.5px solid ${settings.cardStyle === c.id ? activeAccent : 'rgba(0,0,0,0.08)'}`, color: settings.cardStyle === c.id ? activeAccent : '#6b7280', fontSize: 10, fontWeight: 600 }}>
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Visibility Toggles */}
              <div className="glass-panel-luminous p-4">
                <h3 className="text-sm font-bold mb-2" style={{ color: '#7f1d1d' }}>نمائش • Visibility</h3>
                <Toggle value={settings.showArabic} onChange={toggleShowArabic} label="Arabic Text • عربی متن" />
                <Toggle value={settings.showNarrator} onChange={toggleShowNarrator} label="Narrator • راوی" />
                <Toggle value={settings.showTags} onChange={toggleShowTags} label="Tags • ٹیگز" />
              </div>
            </>
          )}

          {/* LANGUAGE TAB */}
          {activeTab === 'language' && (
            <div className="glass-panel-luminous p-4">
              <LanguageSelector
                primaryLang={settings.primaryLanguage}
                secondaryLang={settings.secondaryLanguage}
                onPrimaryChange={updatePrimaryLanguage}
                onSecondaryChange={updateSecondaryLanguage}
                showUrdu
              />
            </div>
          )}

          {/* DATA TAB */}
          {activeTab === 'data' && (
            <>
              <div className="glass-panel-luminous p-4">
                <ExportImport settings={settings} onImport={importSettings} showUrdu />
              </div>
              <div className="glass-panel-luminous p-4">
                <h3 className="text-sm font-bold mb-3" style={{ color: '#7f1d1d' }}>ترتیبات • Settings Data</h3>
                <button onClick={exportSettings} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all" style={{ background: 'rgba(21,128,61,0.06)', border: '1.5px solid rgba(21,128,61,0.2)', minHeight: 52 }}>
                  <Download size={18} color="#15803d" />
                  <div className="text-left">
                    <p className="text-sm font-bold text-gray-800">Export Settings</p>
                    <p className="text-xs text-gray-400">Save your preferences as JSON</p>
                  </div>
                </button>
                <div className="p-3 rounded-xl text-center" style={{ background: 'rgba(220,38,38,0.04)', border: '1px solid rgba(220,38,38,0.1)' }}>
                  <p className="text-xs text-gray-500">بُک مارکس: {settings.bookmarks.length} محفوظ | Bookmarks: {settings.bookmarks.length} saved</p>
                </div>
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
