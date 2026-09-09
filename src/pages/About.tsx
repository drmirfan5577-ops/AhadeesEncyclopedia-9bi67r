import { Mail, Globe, Heart, Shield, AlertCircle, Star, Copyright, Target, Eye } from 'lucide-react';
import { BACKGROUNDS } from '@/constants/backgrounds';
import { useAppSettings } from '@/hooks/useAppSettings';
import ParticleEffect from '@/components/features/ParticleEffect';
import Navbar from '@/components/layout/Navbar';
import FloatingSidebar from '@/components/features/FloatingSidebar';
import { useState } from 'react';

const TABS = [
  { id: 'about', label: 'بارے میں', labelEn: 'About' },
  { id: 'vision', label: 'وژن', labelEn: 'Vision' },
  { id: 'disclaimer', label: 'دستبرداری', labelEn: 'Disclaimer' },
  { id: 'privacy', label: 'رازداری', labelEn: 'Privacy' },
  { id: 'legal', label: 'قانونی', labelEn: 'Legal' },
  { id: 'copyright', label: 'کاپی رائٹ', labelEn: 'Copyright' },
];

export default function About() {
  const { settings } = useAppSettings();
  const [activeSection, setActiveSection] = useState<string>('about');
  const bg = BACKGROUNDS.find((b) => b.id === settings.selectedBackground) || BACKGROUNDS[0];

  const tabStyle = (id: string) => ({
    minHeight: 34,
    background: activeSection === id ? 'linear-gradient(135deg, rgba(220,38,38,0.85), rgba(153,27,27,0.9))' : 'rgba(255,255,255,0.6)',
    border: activeSection === id ? '1.5px solid rgba(220,38,38,0.6)' : '1px solid rgba(220,38,38,0.12)',
    color: activeSection === id ? '#fff' : '#9ca3af',
    boxShadow: activeSection === id ? '0 2px 10px rgba(220,38,38,0.3)' : 'none',
  });

  return (
    <div className="min-h-screen relative" style={bg.style}>
      <ParticleEffect />
      <div className="relative z-10 pb-28">
        {/* Header */}
        <div className="sticky top-0 z-20 header-luminous px-4 pt-10 pb-3">
          <h1 className="text-lg font-bold led-text-red mb-3 animate-glow-pulse">ہمارے بارے میں • About</h1>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-red">
            {TABS.map(({ id, label }) => (
              <button key={id} onClick={() => setActiveSection(id)}
                className="flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
                style={tabStyle(id)}>
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="px-4 pt-4 space-y-4">
          {/* ABOUT */}
          {activeSection === 'about' && (
            <>
              <div className="glass-panel-luminous p-5 text-center"
                style={{ background: 'linear-gradient(135deg, rgba(220,38,38,0.06), rgba(255,255,255,0.96))', border: '1.5px solid rgba(220,38,38,0.3)', boxShadow: '0 4px 24px rgba(220,38,38,0.1)' }}>
                <div className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl animate-float"
                  style={{ background: 'linear-gradient(135deg, rgba(220,38,38,0.1), rgba(220,38,38,0.05))', border: '2px solid rgba(220,38,38,0.3)', boxShadow: '0 0 24px rgba(220,38,38,0.15)' }}>
                  📖
                </div>
                <h2 className="text-xl font-bold shimmer-text mb-1">EvEr SmArT-wOrLd</h2>
                <p className="text-base text-gray-700 mb-1 font-medium" style={{ fontFamily: "'Amiri',serif" }}>ایور سمارٹ ورلڈ</p>
                <p className="text-sm font-bold" style={{ color: '#d97706' }}>Dr M Irfan Qadir Thaheem</p>
                <p className="text-xs text-gray-500 mt-0.5">The One Man Army • ایک آدمی کی فوج</p>
                <div className="mt-3 px-4 py-1.5 rounded-full text-xs font-semibold inline-block"
                  style={{ background: 'rgba(220,38,38,0.08)', color: '#b91c1c', border: '1px solid rgba(220,38,38,0.2)' }}>
                  eversmart/drirfan
                </div>
              </div>

              <div className="glass-panel-luminous p-4" style={{ border: '1.5px solid rgba(220,38,38,0.15)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <Heart size={16} style={{ color: '#dc2626' }} />
                  <h3 className="text-sm font-bold" style={{ color: '#7f1d1d' }}>ہمارا مشن • Our Mission</h3>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed mb-3">
                  We are committed to enhancing the whole world in every field of life within Unity, Integrity and Universality — In-sha-Allah Azza wa-Jall.
                </p>
                <p className="text-sm text-gray-600 leading-relaxed text-right" style={{ fontFamily: "'Amiri',serif", direction: 'rtl' }}>
                  ہم اتحاد، سالمیت اور عالمگیریت کے ساتھ زندگی کے ہر شعبے میں پوری دنیا کو بہتر بنانے کے لیے پرعزم ہیں — ان شاء اللہ عزوجل۔
                </p>
              </div>

              <div className="glass-panel-luminous p-4" style={{ border: '1.5px solid rgba(220,38,38,0.15)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <Globe size={16} style={{ color: '#d97706' }} />
                  <h3 className="text-sm font-bold" style={{ color: '#7f1d1d' }}>پروجیکٹ • Project Info</h3>
                </div>
                {[
                  { key: 'Project', value: 'SMART WORLD ORDER' },
                  { key: 'Vision', value: 'A Global Family Platform' },
                  { key: 'URL', value: 'eversmart/drirfan' },
                  { key: 'Version', value: '3.5 — Ahadees Encyclopedia' },
                  { key: 'Languages', value: '13 زبانیں Supported' },
                  { key: 'Ahadees', value: '75+ Authentic Ahadees' },
                  { key: 'Quran', value: '114 Surahs • 6,236 Ayahs' },
                ].map(({ key, value }) => (
                  <div key={key} className="flex items-center gap-2 p-2.5 rounded-xl mb-2"
                    style={{ background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.06)' }}>
                    <span className="text-xs text-gray-400 w-28 flex-shrink-0 font-medium">{key}:</span>
                    <span className="text-xs font-bold" style={{ color: '#7f1d1d' }}>{value}</span>
                  </div>
                ))}
              </div>

              <div className="glass-panel-luminous p-4" style={{ border: '1.5px solid rgba(220,38,38,0.15)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <Mail size={16} style={{ color: '#dc2626' }} />
                  <h3 className="text-sm font-bold" style={{ color: '#7f1d1d' }}>رابطہ • Contact</h3>
                </div>
                <a href="mailto:dr.mirfan5577@gmail.com" className="block text-sm font-bold underline" style={{ color: '#b91c1c' }}>
                  dr.mirfan5577@gmail.com
                </a>
                <div className="mt-3 p-3 rounded-xl text-center" style={{ background: 'rgba(220,38,38,0.04)', border: '1px solid rgba(220,38,38,0.12)' }}>
                  <p className="text-xs font-bold text-gray-600">EvEr_SmArT_wOrLd • Dr M Irfan Qadir Thaheem</p>
                  <p className="text-xs text-gray-400 mt-0.5" style={{ fontFamily: "'Amiri',serif" }}>A Project of SMART WORLD ORDER</p>
                </div>
              </div>
            </>
          )}

          {/* VISION & MISSION */}
          {activeSection === 'vision' && (
            <div className="space-y-4">
              <div className="glass-panel-luminous p-4" style={{ border: '1.5px solid rgba(124,58,237,0.3)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <Eye size={16} style={{ color: '#7c3aed' }} />
                  <h3 className="text-sm font-bold" style={{ color: '#5b21b6' }}>وژن • Vision</h3>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed mb-3">
                  To become the world's most comprehensive, accessible and authentic Islamic knowledge platform — available in every major language, empowering Muslims across all continents with authentic Ahadees, Quran, Tafseer and Islamic literature.
                </p>
                <p className="text-sm text-gray-600 leading-relaxed text-right" style={{ fontFamily: "'Amiri',serif", direction: 'rtl' }}>
                  دنیا کا سب سے جامع، قابل رسائی اور مستند اسلامی علم کا پلیٹ فارم بننا — ہر بڑی زبان میں دستیاب، تمام براعظموں کے مسلمانوں کو مستند احادیث، قرآن، تفسیر اور اسلامی ادب سے بااختیار بنانا۔
                </p>
              </div>

              <div className="glass-panel-luminous p-4" style={{ border: '1.5px solid rgba(220,38,38,0.25)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <Target size={16} style={{ color: '#dc2626' }} />
                  <h3 className="text-sm font-bold" style={{ color: '#7f1d1d' }}>مشن • Mission</h3>
                </div>
                {[
                  { en: 'Preserve and propagate authentic Islamic teachings', ur: 'مستند اسلامی تعلیمات کا تحفظ اور فروغ' },
                  { en: 'Make Islamic knowledge accessible in 13+ languages', ur: '13+ زبانوں میں اسلامی علم قابل رسائی بنانا' },
                  { en: 'Build a unified global Muslim learning community', ur: 'متحد عالمی مسلم تعلیمی برادری کی تشکیل' },
                  { en: 'Provide tools for research, study and sharing', ur: 'تحقیق، مطالعہ اور اشتراک کے اوزار فراہم کرنا' },
                  { en: 'Promote Unity, Integrity and Universality', ur: 'اتحاد، سالمیت اور عالمگیریت کو فروغ دینا' },
                ].map(({ en, ur }, i) => (
                  <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg mb-2"
                    style={{ background: 'rgba(220,38,38,0.04)', border: '1px solid rgba(220,38,38,0.1)' }}>
                    <span className="text-xs font-bold mt-0.5" style={{ color: '#dc2626', minWidth: 16 }}>{i + 1}.</span>
                    <div>
                      <p className="text-xs text-gray-700 font-medium">{en}</p>
                      <p className="text-xs text-gray-500 mt-0.5 text-right" style={{ fontFamily: "'Amiri',serif", direction: 'rtl' }}>{ur}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="glass-panel-luminous p-4 text-center"
                style={{ background: 'linear-gradient(135deg, rgba(220,38,38,0.06), rgba(255,255,255,0.96))', border: '1.5px solid rgba(220,38,38,0.25)' }}>
                <p className="text-base font-bold shimmer-text mb-2">SMART WORLD ORDER</p>
                <p className="text-xs text-gray-600 leading-relaxed">A Global Family Platform Vision</p>
                <p className="text-xs text-gray-500 mt-1" style={{ fontFamily: "'Amiri',serif", direction: 'rtl' }}>ایک عالمی خاندان کے پلیٹ فارم کا تصور</p>
                <p className="text-sm font-bold mt-3" style={{ color: '#d97706', fontFamily: "'Amiri',serif" }}>
                  ان شاء اللہ عزوجل
                </p>
              </div>
            </div>
          )}

          {/* DISCLAIMER */}
          {activeSection === 'disclaimer' && (
            <div className="space-y-3">
              <div className="glass-panel-luminous p-4" style={{ border: '1.5px solid rgba(217,119,6,0.3)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle size={16} style={{ color: '#d97706' }} />
                  <h3 className="text-sm font-bold" style={{ color: '#78350f' }}>دستبرداری • Disclaimer</h3>
                </div>
                <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
                  {[
                    { num: 1, title: 'Educational Purpose', body: 'This app is created solely for educational, research, and spiritual learning. All Ahadees are sourced from authentic classical collections (Kutub Sitta and other reliable sources).', ur: 'یہ ایپ صرف تعلیمی، تحقیقی اور روحانی مقاصد کے لیے بنائی گئی ہے۔' },
                    { num: 2, title: 'Scholarly Verification', body: 'Users are encouraged to cross-verify translations with certified Islamic scholars. Minor variations may exist across scholarly opinions.' },
                    { num: 3, title: 'No Legal Fatwa', body: 'This application does not issue religious verdicts (Fatwas). For rulings, consult qualified Islamic scholars.' },
                    { num: 4, title: 'Translation Note', body: 'Translations provided are based on scholarly works and may vary. Arabic text is primary; translations are for understanding only.' },
                    { num: 5, title: 'Content Accuracy', body: 'Every effort has been made to ensure accuracy. However, the developers are not liable for any unintentional errors.' },
                    { num: 6, title: 'AI Assistance', body: 'Some translations and features are AI-assisted. Cross-verification with original sources is always recommended.' },
                  ].map(({ num, title, body, ur }) => (
                    <div key={num} className="p-3 rounded-xl" style={{ background: 'rgba(217,119,6,0.05)', border: '1px solid rgba(217,119,6,0.12)' }}>
                      <p className="font-bold text-gray-800 mb-1">{num}. {title}</p>
                      <p className="text-gray-600 text-xs">{body}</p>
                      {ur && <p className="text-xs text-gray-500 mt-1 text-right" style={{ fontFamily: "'Amiri',serif", direction: 'rtl' }}>{ur}</p>}
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-panel-luminous p-4" style={{ border: '1.5px solid rgba(220,38,38,0.2)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <Shield size={16} style={{ color: '#dc2626' }} />
                  <h3 className="text-sm font-bold" style={{ color: '#7f1d1d' }}>تنبیہات • Warnings</h3>
                </div>
                {[
                  '⚠️ Do not misuse or misrepresent Ahadees out of context',
                  '⚠️ Sharing must be done responsibly with proper attribution',
                  '⚠️ Not for commercial exploitation without written permission',
                  '⚠️ Respectful use expected in accordance with Islamic values',
                  '⚠️ احادیث کو سیاق و سباق سے باہر غلط استعمال نہ کریں',
                  '⚠️ اشتراک کرتے وقت حوالہ دینا لازم ہے',
                  '⚠️ کمرشل استعمال تحریری اجازت کے بغیر ممنوع ہے',
                ].map((w, i) => (
                  <div key={i} className="flex items-start gap-2 p-2 rounded-lg mb-1.5" style={{ background: 'rgba(220,38,38,0.04)' }}>
                    <span className="text-sm text-gray-700" style={{ fontFamily: i >= 4 ? "'Amiri',serif" : 'inherit', direction: i >= 4 ? 'rtl' : 'ltr' }}>{w}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PRIVACY */}
          {activeSection === 'privacy' && (
            <div className="glass-panel-luminous p-4 space-y-4" style={{ border: '1.5px solid rgba(220,38,38,0.15)' }}>
              <div className="flex items-center gap-2 mb-1">
                <Shield size={16} style={{ color: '#dc2626' }} />
                <h3 className="text-sm font-bold" style={{ color: '#7f1d1d' }}>رازداری کی پالیسی • Privacy Policy</h3>
              </div>
              {[
                { title: '🔒 Data Collection', body: 'This app stores ONLY your settings and bookmarks locally on your device. No personal data is collected, transmitted, or stored on external servers.' },
                { title: '💾 Local Storage Only', body: "All preferences (themes, language settings, bookmarks, notes) are saved in your browser's localStorage. Clear this anytime through browser settings." },
                { title: '🚫 No Tracking', body: 'We do not use cookies, analytics, or third-party data collection. Your reading activity remains completely private.' },
                { title: '🌐 Social Media', body: "When sharing content, it uses your device's native sharing. We are not responsible for third-party platform privacy policies." },
                { title: '🎤 Microphone', body: 'Microphone is only accessed for the Audio Recorder feature when you explicitly tap Record. No audio is saved remotely.' },
              ].map(({ title, body }) => (
                <div key={title} className="p-3 rounded-xl" style={{ background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.06)' }}>
                  <p className="text-sm font-bold text-gray-800 mb-1">{title}</p>
                  <p className="text-xs text-gray-600 leading-relaxed">{body}</p>
                </div>
              ))}
              <p className="text-right text-sm text-gray-500" style={{ fontFamily: "'Amiri',serif", direction: 'rtl' }}>
                یہ ایپ آپ کا کوئی ذاتی ڈیٹا اکٹھا نہیں کرتی۔ تمام ترتیبات صرف آپ کے آلے پر محفوظ ہوتی ہیں۔
              </p>
            </div>
          )}

          {/* LEGAL */}
          {activeSection === 'legal' && (
            <div className="space-y-3">
              <div className="glass-panel-luminous p-4" style={{ border: '1.5px solid rgba(220,38,38,0.15)' }}>
                <h3 className="text-sm font-bold mb-3" style={{ color: '#7f1d1d' }}>سوشل میڈیا قوانین • Social Media Rules</h3>
                {[
                  "Comply with each platform's Community Guidelines and Terms of Service",
                  "Always attribute Ahadees to their proper source (Bukhari, Muslim, etc.)",
                  "Respectful representation of Islamic content is mandatory",
                  "Do not post content that misrepresents Islamic teachings",
                  "Respect copyright and intellectual property laws",
                  "Follow local and international broadcasting regulations",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-gray-700 p-2 rounded-lg mb-1.5"
                    style={{ background: 'rgba(0,0,0,0.03)' }}>
                    <span style={{ color: '#dc2626', minWidth: 14 }}>•</span>{item}
                  </div>
                ))}
              </div>

              <div className="glass-panel-luminous p-4" style={{ border: '1.5px solid rgba(217,119,6,0.2)' }}>
                <h3 className="text-sm font-bold mb-3" style={{ color: '#78350f' }}>بین الاقوامی قانون • International Law</h3>
                {[
                  'GDPR (European Union) data protection compliance',
                  'Local religious content broadcasting laws',
                  'International copyright agreements & Berne Convention',
                  'UNESCO cultural heritage protection guidelines',
                  'Islamic media ethics and scholarly standards',
                  'Digital Millennium Copyright Act (DMCA) compliance',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-gray-700 p-2 rounded-lg mb-1.5"
                    style={{ background: 'rgba(217,119,6,0.04)' }}>
                    <span style={{ color: '#d97706', minWidth: 14 }}>•</span>{item}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* COPYRIGHT */}
          {activeSection === 'copyright' && (
            <div className="space-y-4">
              <div className="glass-panel-luminous p-5 text-center"
                style={{ background: 'linear-gradient(135deg, rgba(220,38,38,0.06), rgba(255,255,255,0.96))', border: '1.5px solid rgba(220,38,38,0.3)' }}>
                <Copyright size={32} style={{ color: '#dc2626', margin: '0 auto 12px' }} />
                <p className="text-base font-bold shimmer-text">© 2024–2026 EvEr SmArT-wOrLd</p>
                <p className="text-xs font-bold text-gray-700 mt-1">All Rights Reserved • جملہ حقوق محفوظ ہیں</p>
                <p className="text-xs text-gray-500 mt-1">Dr M Irfan Qadir Thaheem | SMART WORLD ORDER</p>
                <p className="text-xs text-gray-400 mt-0.5">eversmart/drirfan</p>
              </div>

              <div className="glass-panel-luminous p-4" style={{ border: '1.5px solid rgba(220,38,38,0.2)' }}>
                <h3 className="text-sm font-bold mb-3" style={{ color: '#7f1d1d' }}>🛡️ Intellectual Property Rights</h3>
                {[
                  { title: 'App Design & Code', body: 'The design, UI/UX, code, and structure of this application are protected intellectual property of EvEr SmArT-wOrLd.' },
                  { title: 'Translations', body: 'Original Urdu translations and editorial arrangements are copyright of Dr M Irfan Qadir Thaheem.' },
                  { title: 'Quran & Hadith Text', body: 'The Arabic text of the Holy Quran and Ahadees are in the public domain as sacred texts. Their arrangement and presentation in this app are protected.' },
                  { title: 'Brand Identity', body: '"EvEr SmArT-wOrLd", "SMART WORLD ORDER", and "eversmart/drirfan" are registered identifiers of Dr M Irfan Qadir Thaheem.' },
                ].map(({ title, body }) => (
                  <div key={title} className="p-3 rounded-xl mb-2"
                    style={{ background: 'rgba(220,38,38,0.04)', border: '1px solid rgba(220,38,38,0.1)' }}>
                    <p className="text-xs font-bold mb-1" style={{ color: '#7f1d1d' }}>{title}</p>
                    <p className="text-xs text-gray-600 leading-relaxed">{body}</p>
                  </div>
                ))}
              </div>

              <div className="glass-panel-luminous p-4" style={{ border: '1.5px solid rgba(21,128,61,0.2)' }}>
                <h3 className="text-sm font-bold mb-3" style={{ color: '#14532d' }}>✅ Permitted Use</h3>
                {[
                  'Personal study and spiritual growth',
                  'Sharing individual Ahadees with proper attribution',
                  'Educational and non-commercial research',
                  'Teaching in Islamic institutions with credit',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-gray-700 p-2 rounded-lg mb-1"
                    style={{ background: 'rgba(21,128,61,0.05)' }}>
                    <span style={{ color: '#15803d' }}>✓</span>{item}
                  </div>
                ))}
              </div>

              <div className="glass-panel-luminous p-4" style={{ border: '1.5px solid rgba(220,38,38,0.3)' }}>
                <h3 className="text-sm font-bold mb-3" style={{ color: '#7f1d1d' }}>🚫 Prohibited Use</h3>
                {[
                  'Commercial use without written permission',
                  'Modifying and republishing as your own work',
                  'Removing copyright notices or attributions',
                  'Bulk reproduction for commercial distribution',
                  'Using the brand name for unauthorized projects',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-gray-700 p-2 rounded-lg mb-1"
                    style={{ background: 'rgba(220,38,38,0.04)' }}>
                    <span style={{ color: '#dc2626' }}>✕</span>{item}
                  </div>
                ))}
              </div>

              <div className="glass-panel-luminous p-4 text-center" style={{ border: '1px solid rgba(220,38,38,0.12)' }}>
                <Star size={16} style={{ color: '#dc2626', margin: '0 auto 8px' }} />
                <p className="text-xs text-gray-500 font-medium">Ahadees Encyclopedia v3.5 • احادیث انسائیکلوپیڈیا</p>
                <p className="text-xs text-gray-400 mt-1">© 2024–2026 EvEr SmArT-wOrLd | All Rights Reserved</p>
                <p className="text-xs text-gray-400 mt-0.5">Dr M Irfan Qadir Thaheem | SMART WORLD ORDER</p>
                <p className="text-xs font-semibold mt-2" style={{ color: '#dc2626' }}>eversmart/drirfan</p>
                <p className="text-xs text-gray-300 mt-1" style={{ fontFamily: "'Amiri',serif" }}>جملہ حقوق بحق EvEr SmArT-wOrLd محفوظ ہیں</p>
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
