import { useState } from 'react';
import {
  Bookmark, Copy, Share2, Download, Volume2, VolumeX,
  X, Menu, FileText, FileJson, Printer, ChevronLeft,
} from 'lucide-react';
import { toast } from 'sonner';

interface FloatingSidebarProps {
  onExportText?: () => void;
  onExportJSON?: () => void;
  onCopy?: () => void;
  onShare?: () => void;
  onBookmark?: () => void;
  isBookmarked?: boolean;
}

export default function FloatingSidebar({
  onExportText, onExportJSON, onCopy, onShare, onBookmark, isBookmarked,
}: FloatingSidebarProps) {
  const [open, setOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleGlobalSpeak = () => {
    if (!('speechSynthesis' in window)) { toast.error('Speech not supported'); return; }
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    const selected = window.getSelection()?.toString();
    if (selected) {
      const u = new SpeechSynthesisUtterance(selected);
      const isArabic = /[\u0600-\u06FF]/.test(selected);
      u.lang = isArabic ? 'ar-SA' : 'en-US';
      u.rate = 0.85;
      u.onstart = () => setIsSpeaking(true);
      u.onend = () => setIsSpeaking(false);
      u.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(u);
      toast.success(isArabic ? 'تلاوت شروع • Playing selected text' : 'Playing selected text');
    } else {
      toast.success('Select text on screen then tap Listen • متن منتخب کریں پھر سنیں دبائیں');
    }
  };

  const handleGlobalPrint = () => {
    window.print();
    toast.success('Print dialog opened • پرنٹ ڈائیلاگ کھل گیا');
  };

  const actions = [
    { icon: isBookmarked ? Bookmark : Bookmark, label: isBookmarked ? 'بُک مارکڈ' : 'بُک مارک', labelEn: 'Bookmark', color: isBookmarked ? '#d97706' : '#dc2626', onClick: onBookmark },
    { icon: Copy, label: 'کاپی', labelEn: 'Copy', color: '#1d4ed8', onClick: onCopy },
    { icon: Share2, label: 'شیئر', labelEn: 'Share', color: '#15803d', onClick: onShare },
    { icon: isSpeaking ? VolumeX : Volume2, label: isSpeaking ? 'روکیں' : 'سنیں', labelEn: isSpeaking ? 'Stop' : 'Listen', color: '#7c3aed', onClick: handleGlobalSpeak },
    { icon: Printer, label: 'پرنٹ', labelEn: 'Print', color: '#0f766e', onClick: handleGlobalPrint },
    { icon: FileText, label: 'TXT', labelEn: 'Export TXT', color: '#be123c', onClick: onExportText },
    { icon: FileJson, label: 'JSON', labelEn: 'Export JSON', color: '#0369a1', onClick: onExportJSON },
    { icon: Download, label: 'ڈاؤنلوڈ', labelEn: 'Download', color: '#b45309', onClick: onExportText },
  ];

  return (
    <div style={{ position: 'fixed', right: 8, top: '50%', transform: 'translateY(-50%)', zIndex: 45, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
      {/* Toggle */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: 44, height: 44, borderRadius: 12,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: open ? 'linear-gradient(135deg, rgba(220,38,38,0.92), rgba(153,27,27,0.97))' : 'linear-gradient(135deg, rgba(255,255,255,0.97), rgba(255,240,240,0.95))',
          border: `1.5px solid ${open ? 'rgba(220,38,38,0.7)' : 'rgba(220,38,38,0.4)'}`,
          boxShadow: open ? '0 0 16px rgba(220,38,38,0.5)' : '0 4px 16px rgba(220,38,38,0.15)',
          cursor: 'pointer', transition: 'all 0.2s ease',
        }}
        aria-label="Features panel"
        title="Features Panel"
      >
        {open ? <X size={18} color="#fff" /> : <Menu size={18} color="#dc2626" />}
      </button>

      {/* Panel */}
      {open && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, padding: '8px 5px', borderRadius: 16, background: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(20px)', border: '1.5px solid rgba(220,38,38,0.22)', boxShadow: '0 8px 32px rgba(220,38,38,0.15)' }}>
          {/* Collapse hint */}
          <button onClick={() => setOpen(false)} style={{ width: 44, height: 28, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(220,38,38,0.05)', border: '1px solid rgba(220,38,38,0.15)', cursor: 'pointer', marginBottom: 2 }}>
            <ChevronLeft size={12} color="#dc2626" />
          </button>
          {actions.map(({ icon: Icon, label, labelEn, color, onClick }) => (
            <button
              key={labelEn}
              onClick={() => { onClick?.(); if (!['Bookmark', 'Bookmarked', 'Listen', 'Stop'].includes(labelEn)) setOpen(false); }}
              title={`${labelEn} • ${label}`}
              style={{ width: 44, height: 44, borderRadius: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: `linear-gradient(135deg, ${color}12, ${color}07)`, border: `1px solid ${color}28`, cursor: 'pointer', transition: 'all 0.2s ease', gap: 1 }}
              onMouseEnter={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.background = `${color}20`; b.style.transform = 'scale(1.08)'; }}
              onMouseLeave={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.background = `linear-gradient(135deg, ${color}12, ${color}07)`; b.style.transform = 'scale(1)'; }}
            >
              <Icon size={15} color={color} />
              <span style={{ fontSize: 7, color, fontWeight: 700, lineHeight: 1 }}>{label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
