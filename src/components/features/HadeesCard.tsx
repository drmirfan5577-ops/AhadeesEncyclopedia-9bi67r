import { Bookmark, BookmarkCheck, Share2, Copy, ChevronDown, ChevronUp, Volume2, VolumeX, Printer, StickyNote, ImageIcon } from 'lucide-react';
import { useState, useRef } from 'react';
import { Hadees, LanguageCode } from '@/types';
import { getLanguage, LANGUAGES } from '@/constants/languages';
import { toast } from 'sonner';
import TTSPlayer from '@/components/features/TTSPlayer';
import HadithShareCard from '@/components/features/HadithShareCard';
import NotesPanel from '@/components/features/NotesPanel';
import { useNotes } from '@/hooks/useNotes';

interface HadeesCardProps {
  hadees: Hadees;
  primaryLang: LanguageCode;
  secondaryLang: LanguageCode;
  showArabic: boolean;
  fontSize: string;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  animationDelay?: number;
  showNarrator?: boolean;
  showTags?: boolean;
}

const fontSizeMap = {
  sm: { arabic: 'text-lg', translation: 'text-sm', meta: 'text-xs' },
  md: { arabic: 'text-xl', translation: 'text-base', meta: 'text-sm' },
  lg: { arabic: 'text-2xl', translation: 'text-lg', meta: 'text-base' },
  xl: { arabic: 'text-3xl', translation: 'text-xl', meta: 'text-lg' },
};

export default function HadeesCard({
  hadees, primaryLang, secondaryLang, showArabic, fontSize,
  isBookmarked, onToggleBookmark, animationDelay = 0, showNarrator = true, showTags = true,
}: HadeesCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showTTS, setShowTTS] = useState(false);
  const [showShareCard, setShowShareCard] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const { getNotesForHadees } = useNotes();
  const notesCount = getNotesForHadees(hadees.id).length;

  const fs = fontSizeMap[fontSize as keyof typeof fontSizeMap] || fontSizeMap.md;
  const primaryInfo = getLanguage(primaryLang);
  const secondaryInfo = getLanguage(secondaryLang);
  const primaryText = hadees.translations[primaryLang] || hadees.translations.en || '';
  const secondaryText = hadees.translations[secondaryLang] || '';

  const handleCopy = () => {
    const text = `${hadees.arabic}\n\n${primaryText}\n\n— ${hadees.narrator} | ${hadees.source} #${hadees.hadithNumber}\n\nAhadees Encyclopedia — eversmart/drirfan`;
    navigator.clipboard.writeText(text).then(() => toast.success('Copied! • کاپی ہو گیا'));
  };

  const handleShare = () => {
    const text = `📖 ${hadees.arabic}\n\n${primaryText}\n\n— ${hadees.narrator}\n${hadees.source} #${hadees.hadithNumber}\n\nAhadees Encyclopedia | eversmart/drirfan`;
    if (navigator.share) { navigator.share({ title: 'Hadith', text }); }
    else { navigator.clipboard.writeText(text).then(() => toast.success('Copied for sharing!')); }
  };

  const handleSpeak = () => {
    if (!('speechSynthesis' in window)) { toast.error('Audio not supported'); return; }
    if (isSpeaking) { window.speechSynthesis.cancel(); setIsSpeaking(false); return; }
    const u = new SpeechSynthesisUtterance(hadees.arabic);
    u.lang = 'ar-SA'; u.rate = 0.8; u.pitch = 1.1;
    const voices = window.speechSynthesis.getVoices();
    const v = voices.find((v) => v.lang.startsWith('ar'));
    if (v) u.voice = v;
    u.onstart = () => setIsSpeaking(true);
    u.onend = () => setIsSpeaking(false);
    u.onerror = () => setIsSpeaking(false);
    utteranceRef.current = u;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
    toast.success('Playing • تلاوت شروع ہوئی');
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`<!DOCTYPE html><html dir="rtl"><head><meta charset="UTF-8"><title>Hadith - ${hadees.source} #${hadees.hadithNumber}</title>
      <link href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Inter:wght@400;600&display=swap" rel="stylesheet">
      <style>body{font-family:'Inter',sans-serif;background:#fff;color:#111;padding:40px;max-width:700px;margin:auto;direction:rtl}.header{text-align:center;border-bottom:3px solid #dc2626;padding-bottom:20px;margin-bottom:24px}.app-title{font-size:22px;font-weight:700;color:#dc2626}.badge{display:inline-block;background:#fef2f2;color:#dc2626;border:1px solid #fca5a5;border-radius:20px;padding:4px 12px;font-size:12px;margin:4px}.arabic{font-family:'Amiri',serif;font-size:26px;line-height:2.2;text-align:right;color:#111;background:#fef2f2;padding:20px;border-radius:12px;margin:20px 0;border:1px solid #fca5a5}.trans-block{background:#fff8f8;border:1px solid #fecaca;border-radius:8px;padding:16px;margin:12px 0}.trans-label{font-size:11px;color:#dc2626;font-weight:700;margin-bottom:6px}.trans-text{font-size:15px;line-height:1.8;color:#333}.narrator{background:#fffbeb;border:1px solid #fde68a;border-radius:8px;padding:12px 16px;margin:16px 0;text-align:right;color:#92400e;font-size:14px}.footer{text-align:center;margin-top:32px;font-size:11px;color:#aaa;border-top:1px solid #eee;padding-top:16px;direction:ltr}@media print{body{padding:20px}}</style></head><body>
      <div class="header"><div class="app-title">📖 احادیث انسائیکلوپیڈیا</div><div style="font-size:12px;color:#888;margin-top:4px">Ahadees Encyclopedia • eversmart/drirfan</div>
      <div style="margin-top:12px"><span class="badge">${hadees.source}</span><span class="badge">#${hadees.hadithNumber}</span><span class="badge">${hadees.category}</span></div></div>
      ${showArabic ? `<div class="arabic">${hadees.arabic}</div>` : ''}
      ${Object.entries(hadees.translations).filter(([,v])=>v).map(([code,text])=>`<div class="trans-block"><div class="trans-label">${LANGUAGES.find(l=>l.code===code)?.nativeName||code}</div><div class="trans-text" style="direction:${['ar','ur','fa','sd','bal','ps'].includes(code)?'rtl':'ltr'};text-align:${['ar','ur','fa','sd','bal','ps'].includes(code)?'right':'left'}">${text}</div></div>`).join('')}
      <div class="narrator">📜 راوی: ${hadees.narrator}</div>
      ${showTags && hadees.tags.length>0?`<div style="margin:12px 0">${hadees.tags.map(t=>`<span class="badge">${t}</span>`).join('')}</div>`:''}
      <div class="footer">EvEr SmArT-wOrLd • Dr M Irfan Qadir Thaheem • eversmart/drirfan<br>Printed on ${new Date().toLocaleDateString()} | Ahadees Encyclopedia v3.5</div>
      </body></html>`);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => { printWindow.print(); printWindow.close(); }, 500);
    toast.success('Print window opened • پرنٹ ونڈو کھل گئی');
  };

  return (
    <div className="hadees-card p-4 mb-4 animate-slide-up" style={{ animationDelay: `${animationDelay}ms` }}>
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex flex-wrap gap-1.5 flex-1">
          <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.25)', color: '#b91c1c' }}>{hadees.source}</span>
          <span className="text-xs font-semibold px-2 py-1 rounded-full" style={{ background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.08)', color: '#6b7280' }}>#{hadees.hadithNumber}</span>
        </div>
        <button onClick={() => onToggleBookmark(hadees.id)} className="p-2 rounded-lg transition-all" style={{ minWidth: 44, minHeight: 44 }}>
          {isBookmarked ? <BookmarkCheck size={20} style={{ color: '#d97706', filter: 'drop-shadow(0 0 4px rgba(217,119,6,0.5))' }} /> : <Bookmark size={20} color="#9ca3af" />}
        </button>
      </div>

      {/* Arabic */}
      {showArabic && (
        <>
          <div className="arabic-text mb-3 leading-loose p-3 rounded-xl" style={{ background: 'linear-gradient(135deg, rgba(220,38,38,0.04), rgba(255,255,255,0.6))', border: '1px solid rgba(220,38,38,0.1)' }}>
            <p className={`${fs.arabic} text-gray-900 leading-relaxed font-bold`} style={{ fontFamily: "'Noto Naskh Arabic','Amiri',serif", direction: 'rtl', textAlign: 'right' }}>
              {hadees.arabic}
            </p>
          </div>
          <div className="mb-3" style={{ height: 1, background: 'linear-gradient(90deg,transparent,rgba(220,38,38,0.3),transparent)' }} />
        </>
      )}

      {/* Primary Translation */}
      <div className={`mb-3 ${primaryInfo.dir === 'rtl' ? 'text-right' : 'text-left'}`}>
        <div className="flex items-center gap-1.5 mb-1.5">
          <span className="text-base">{primaryInfo.flag}</span>
          <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(220,38,38,0.08)', color: '#b91c1c', border: '1px solid rgba(220,38,38,0.15)' }}>{primaryInfo.nativeName}</span>
        </div>
        <p className={`${fs.translation} text-gray-800 leading-relaxed font-medium`} style={{ direction: primaryInfo.dir, fontFamily: primaryInfo.dir === 'rtl' ? "'Noto Naskh Arabic','Amiri',serif" : 'inherit' }}>
          {primaryText}
        </p>
      </div>

      {/* Secondary Translation */}
      {secondaryText && secondaryLang !== primaryLang && (
        <div className={`mb-3 ${secondaryInfo.dir === 'rtl' ? 'text-right' : 'text-left'}`}>
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-base">{secondaryInfo.flag}</span>
            <span className="text-xs font-medium text-gray-400">{secondaryInfo.nativeName}</span>
          </div>
          <p className={`${fs.translation} text-gray-600 leading-relaxed`} style={{ direction: secondaryInfo.dir, fontFamily: secondaryInfo.dir === 'rtl' ? "'Noto Naskh Arabic','Amiri',serif" : 'inherit' }}>
            {secondaryText}
          </p>
        </div>
      )}

      {/* Narrator */}
      {showNarrator && (
        <div className="mb-2 p-2 rounded-lg flex items-center justify-end gap-1" style={{ background: 'rgba(217,119,6,0.06)', border: '1px solid rgba(217,119,6,0.15)' }}>
          <p className={`${fs.meta} font-semibold text-right`} style={{ color: '#92400e', fontFamily: "'Noto Naskh Arabic','Amiri',serif", direction: 'rtl' }}>راوی: {hadees.narrator}</p>
          <span style={{ fontSize: 14 }}>📜</span>
        </div>
      )}

      {/* Tags */}
      {showTags && hadees.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-2">
          {hadees.tags.map((tag) => (
            <span key={tag} className="text-[10px] font-medium px-2 py-0.5 rounded-full" style={{ background: 'rgba(220,38,38,0.06)', color: '#b91c1c', border: '1px solid rgba(220,38,38,0.12)' }}>{tag}</span>
          ))}
        </div>
      )}

      {/* All Languages */}
      {expanded && (
        <div className="mt-3 space-y-3 p-3 rounded-xl" style={{ background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.06)' }}>
          {LANGUAGES.filter((l) => l.code !== primaryLang && l.code !== secondaryLang && l.code !== 'ar' && hadees.translations[l.code]).map((lang) => (
            <div key={lang.code} className={lang.dir === 'rtl' ? 'text-right' : 'text-left'}>
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-sm">{lang.flag}</span>
                <span className="text-xs text-gray-400 font-medium">{lang.nativeName}</span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed" style={{ direction: lang.dir, fontFamily: lang.dir === 'rtl' ? "'Noto Naskh Arabic','Amiri',serif" : 'inherit' }}>
                {hadees.translations[lang.code]}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Footer Actions */}
      <div className="flex items-center justify-between mt-4 pt-3" style={{ borderTop: '1px solid rgba(220,38,38,0.1)' }}>
        <div className="flex gap-1 flex-wrap">
          {[
            { icon: Copy, label: 'Copy', onClick: handleCopy, color: '#6b7280' },
            { icon: Share2, label: 'Share', onClick: handleShare, color: '#6b7280' },
            { icon: isSpeaking ? VolumeX : Volume2, label: isSpeaking ? 'Stop' : 'Listen', onClick: handleSpeak, color: isSpeaking ? '#7c3aed' : '#6b7280', active: isSpeaking },
            { icon: Printer, label: 'Print', onClick: handlePrint, color: '#6b7280' },
          ].map(({ icon: Icon, label, onClick, color, active }) => (
            <button key={label} onClick={onClick}
              className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs font-medium transition-all"
              style={{ minHeight: 36, background: active ? 'rgba(124,58,237,0.1)' : 'rgba(0,0,0,0.04)', color, border: active ? '1px solid rgba(124,58,237,0.3)' : 'none' }}>
              <Icon size={12} /><span>{label}</span>
            </button>
          ))}
          {/* Notes Button */}
          <button onClick={() => { setShowNotes(!showNotes); setShowTTS(false); setShowShareCard(false); }}
            className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs font-medium transition-all relative"
            style={{ minHeight: 36, background: showNotes ? 'rgba(14,165,233,0.1)' : 'rgba(0,0,0,0.04)', color: showNotes ? '#0369a1' : '#6b7280', border: showNotes ? '1px solid rgba(14,165,233,0.3)' : 'none' }}>
            <StickyNote size={12} /><span>Notes{notesCount > 0 ? ` (${notesCount})` : ''}</span>
          </button>
          {/* Share Card */}
          <button onClick={() => { setShowShareCard(!showShareCard); setShowNotes(false); setShowTTS(false); }}
            className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs font-medium transition-all"
            style={{ minHeight: 36, background: showShareCard ? 'rgba(220,38,38,0.1)' : 'rgba(0,0,0,0.04)', color: showShareCard ? '#b91c1c' : '#6b7280', border: showShareCard ? '1px solid rgba(220,38,38,0.3)' : 'none' }}>
            <ImageIcon size={12} /><span>Card</span>
          </button>
          {/* TTS */}
          <button onClick={() => { setShowTTS(!showTTS); setShowNotes(false); setShowShareCard(false); }}
            className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs font-medium transition-all"
            style={{ minHeight: 36, background: showTTS ? 'rgba(124,58,237,0.1)' : 'rgba(0,0,0,0.04)', color: showTTS ? '#7c3aed' : '#6b7280', border: showTTS ? '1px solid rgba(124,58,237,0.3)' : 'none' }}>
            <Volume2 size={12} /><span>TTS</span>
          </button>
        </div>
        <button onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all"
          style={{ minHeight: 36, color: '#b91c1c', background: 'rgba(220,38,38,0.06)', border: '1px solid rgba(220,38,38,0.15)' }}>
          <span>{expanded ? 'کم' : 'تمام'}</span>
          {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
        </button>
      </div>

      {/* TTS Panel */}
      {showTTS && (
        <div className="mt-3 animate-slide-up">
          <TTSPlayer
            arabicText={hadees.arabic}
            urduText={hadees.translations.ur}
            englishText={hadees.translations.en}
            title={`${hadees.source} #${hadees.hadithNumber}`}
            onClose={() => setShowTTS(false)}
          />
        </div>
      )}

      {/* Share Card Panel */}
      {showShareCard && (
        <div className="mt-3 animate-slide-up">
          <HadithShareCard hadees={hadees} onClose={() => setShowShareCard(false)} />
        </div>
      )}

      {/* Notes Panel */}
      {showNotes && (
        <div className="mt-3 animate-slide-up">
          <NotesPanel hadeesId={hadees.id} hadeesArabic={hadees.arabic} onClose={() => setShowNotes(false)} />
        </div>
      )}
    </div>
  );
}
