import { useRef, useState } from 'react';
import { Download, Share2, X } from 'lucide-react';
import { Hadees } from '@/types';
import { toast } from 'sonner';

interface HadithShareCardProps {
  hadees: Hadees;
  onClose: () => void;
}

const CARD_STYLES = [
  { id: 'red-glass', name: 'Red Glass', bg: 'linear-gradient(135deg, #7f1d1d, #991b1b, #b91c1c)', textColor: '#fff', borderColor: 'rgba(255,100,100,0.5)' },
  { id: 'dark-gold', name: 'Dark Gold', bg: 'linear-gradient(135deg, #1c1008, #2d1a06, #78350f)', textColor: '#fef3c7', borderColor: 'rgba(251,191,36,0.6)' },
  { id: 'emerald', name: 'Emerald', bg: 'linear-gradient(135deg, #052e16, #14532d, #15803d)', textColor: '#d1fae5', borderColor: 'rgba(52,211,153,0.5)' },
  { id: 'royal-blue', name: 'Royal Blue', bg: 'linear-gradient(135deg, #0c1445, #1e3a8a, #1d4ed8)', textColor: '#dbeafe', borderColor: 'rgba(96,165,250,0.5)' },
  { id: 'purple-night', name: 'Purple Night', bg: 'linear-gradient(135deg, #2e1065, #4c1d95, #7c3aed)', textColor: '#ede9fe', borderColor: 'rgba(167,139,250,0.5)' },
  { id: 'rose-gold', name: 'Rose Gold', bg: 'linear-gradient(135deg, #fff1f2, #ffe4e6, #fecdd3)', textColor: '#881337', borderColor: 'rgba(220,38,38,0.3)' },
];

export default function HadithShareCard({ hadees, onClose }: HadithShareCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedStyle, setSelectedStyle] = useState(CARD_STYLES[0]);
  const [includeArabic, setIncludeArabic] = useState(true);
  const [includeUrdu, setIncludeUrdu] = useState(true);
  const [includeEnglish, setIncludeEnglish] = useState(true);
  const [includeSource, setIncludeSource] = useState(true);

  const generateCard = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = 800;
    const H = 900;
    canvas.width = W;
    canvas.height = H;

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, W, H);
    const bgColors = selectedStyle.bg.match(/#[0-9a-f]{6}|#[0-9a-f]{3}/gi) || ['#7f1d1d', '#b91c1c'];
    gradient.addColorStop(0, bgColors[0]);
    gradient.addColorStop(0.5, bgColors[1] || bgColors[0]);
    gradient.addColorStop(1, bgColors[2] || bgColors[0]);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, W, H);

    // Decorative border glow
    ctx.strokeStyle = selectedStyle.borderColor;
    ctx.lineWidth = 3;
    ctx.shadowColor = selectedStyle.borderColor;
    ctx.shadowBlur = 20;
    const r = 24;
    ctx.beginPath();
    ctx.moveTo(r, 4); ctx.lineTo(W - r, 4);
    ctx.quadraticCurveTo(W - 4, 4, W - 4, r);
    ctx.lineTo(W - 4, H - r);
    ctx.quadraticCurveTo(W - 4, H - 4, W - r, H - 4);
    ctx.lineTo(r, H - 4);
    ctx.quadraticCurveTo(4, H - 4, 4, H - r);
    ctx.lineTo(4, r);
    ctx.quadraticCurveTo(4, 4, r, 4);
    ctx.closePath();
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Top decoration line
    ctx.strokeStyle = selectedStyle.borderColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(60, 60); ctx.lineTo(W - 60, 60);
    ctx.stroke();

    // Header text
    ctx.fillStyle = selectedStyle.textColor;
    ctx.font = 'bold 22px Inter, Arial';
    ctx.textAlign = 'center';
    ctx.fillText('احادیث انسائیکلوپیڈیا', W / 2, 45);
    ctx.font = '14px Inter, Arial';
    ctx.globalAlpha = 0.7;
    ctx.fillText('Ahadees Encyclopedia • eversmart/drirfan', W / 2, 82);
    ctx.globalAlpha = 1;

    let y = 120;

    // Arabic text
    if (includeArabic && hadees.arabic) {
      ctx.fillStyle = selectedStyle.textColor;
      ctx.font = 'bold 26px "Noto Naskh Arabic", Arial';
      ctx.textAlign = 'right';
      const maxW = W - 100;
      const words = hadees.arabic.split(' ');
      let line = '';
      const lines: string[] = [];
      for (const word of words) {
        const test = line ? `${word} ${line}` : word;
        if (ctx.measureText(test).width > maxW && line) { lines.push(line); line = word; }
        else line = test;
      }
      if (line) lines.push(line);
      for (const l of lines) { ctx.fillText(l, W - 50, y); y += 40; }
      y += 20;
    }

    // Divider
    ctx.strokeStyle = selectedStyle.borderColor;
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.5;
    ctx.beginPath();
    ctx.moveTo(60, y); ctx.lineTo(W - 60, y);
    ctx.stroke();
    ctx.globalAlpha = 1;
    y += 20;

    // Urdu text
    if (includeUrdu && hadees.translations.ur) {
      ctx.fillStyle = selectedStyle.textColor;
      ctx.font = '20px "Amiri", Arial';
      ctx.textAlign = 'right';
      const words = hadees.translations.ur.split(' ');
      let line = '';
      const lines: string[] = [];
      for (const word of words) {
        const test = line ? `${word} ${line}` : word;
        if (ctx.measureText(test).width > W - 100 && line) { lines.push(line); line = word; }
        else line = test;
      }
      if (line) lines.push(line);
      for (const l of lines) { ctx.fillText(l, W - 50, y); y += 32; }
      y += 16;
    }

    // English text
    if (includeEnglish && hadees.translations.en) {
      ctx.fillStyle = selectedStyle.textColor;
      ctx.globalAlpha = 0.85;
      ctx.font = '17px Inter, Arial';
      ctx.textAlign = 'left';
      const words = hadees.translations.en.split(' ');
      let line = '';
      const lines: string[] = [];
      for (const word of words) {
        const test = line ? `${line} ${word}` : word;
        if (ctx.measureText(test).width > W - 100 && line) { lines.push(line); line = word; }
        else line = test;
      }
      if (line) lines.push(line);
      for (const l of lines) { ctx.fillText(l, 50, y); y += 28; }
      ctx.globalAlpha = 1;
      y += 16;
    }

    // Source
    if (includeSource) {
      ctx.fillStyle = selectedStyle.borderColor;
      ctx.font = 'bold 15px Inter, Arial';
      ctx.textAlign = 'center';
      ctx.fillText(`— ${hadees.narrator} | ${hadees.source} #${hadees.hadithNumber}`, W / 2, y + 10);
      y += 40;
    }

    // Footer
    ctx.fillStyle = selectedStyle.textColor;
    ctx.globalAlpha = 0.5;
    ctx.font = '12px Inter, Arial';
    ctx.textAlign = 'center';
    ctx.fillText('EvEr SmArT-wOrLd • Dr M Irfan Qadir Thaheem', W / 2, H - 30);
    ctx.globalAlpha = 1;

    // Bottom line
    ctx.strokeStyle = selectedStyle.borderColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(60, H - 55); ctx.lineTo(W - 60, H - 55);
    ctx.stroke();
  };

  const handleDownload = () => {
    generateCard();
    setTimeout(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const url = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = url;
      a.download = `hadith_card_${hadees.hadithNumber}_${Date.now()}.png`;
      a.click();
      toast.success('Card downloaded! • کارڈ ڈاؤنلوڈ ہوئی');
    }, 100);
  };

  const handleShare = async () => {
    generateCard();
    setTimeout(async () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        const file = new File([blob], 'hadith_card.png', { type: 'image/png' });
        if (navigator.share && navigator.canShare({ files: [file] })) {
          await navigator.share({ title: 'Hadith', files: [file], text: `${hadees.arabic}\n\nAhadees Encyclopedia — eversmart/drirfan` });
        } else {
          handleDownload();
        }
      });
    }, 100);
  };

  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.97)', border: '1.5px solid rgba(220,38,38,0.3)', boxShadow: '0 8px 32px rgba(220,38,38,0.15)' }}>
      {/* Header */}
      <div className="px-4 py-3 flex items-center justify-between" style={{ background: 'linear-gradient(90deg, rgba(220,38,38,0.08), rgba(255,255,255,0.95))', borderBottom: '1px solid rgba(220,38,38,0.12)' }}>
        <span className="text-xs font-bold" style={{ color: '#b91c1c' }}>🎴 شیئر کارڈ • Share Card</span>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600" style={{ minWidth: 28, minHeight: 28 }}>✕</button>
      </div>

      <div className="p-4 space-y-3">
        {/* Style Selector */}
        <div>
          <p className="text-xs font-bold text-gray-600 mb-2">کارڈ اسٹائل • Card Style</p>
          <div className="grid grid-cols-3 gap-2">
            {CARD_STYLES.map((style) => (
              <button key={style.id} onClick={() => setSelectedStyle(style)}
                className="h-10 rounded-xl font-bold text-xs transition-all"
                style={{ background: style.bg, color: style.textColor, border: selectedStyle.id === style.id ? '2.5px solid #dc2626' : '1.5px solid transparent', boxShadow: selectedStyle.id === style.id ? '0 0 12px rgba(220,38,38,0.4)' : 'none' }}>
                {style.name}
              </button>
            ))}
          </div>
        </div>

        {/* Content Options */}
        <div>
          <p className="text-xs font-bold text-gray-600 mb-2">مواد • Content</p>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'عربی', value: includeArabic, set: setIncludeArabic },
              { label: 'اردو', value: includeUrdu, set: setIncludeUrdu },
              { label: 'English', value: includeEnglish, set: setIncludeEnglish },
              { label: 'Source', value: includeSource, set: setIncludeSource },
            ].map(({ label, value, set }) => (
              <button key={label} onClick={() => set(!value)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all"
                style={{ background: value ? 'rgba(220,38,38,0.1)' : 'rgba(0,0,0,0.04)', border: `1px solid ${value ? 'rgba(220,38,38,0.35)' : 'rgba(0,0,0,0.08)'}`, color: value ? '#b91c1c' : '#9ca3af', minHeight: 36 }}>
                <span>{value ? '✓' : '○'}</span><span>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Preview Button */}
        <button onClick={generateCard}
          className="w-full py-2.5 rounded-xl text-xs font-bold"
          style={{ background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.2)', color: '#b91c1c' }}>
          👁 پریویو بنائیں • Generate Preview
        </button>

        {/* Canvas Preview */}
        <div className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(0,0,0,0.1)' }}>
          <canvas ref={canvasRef} className="w-full" style={{ display: 'block', maxHeight: 200, objectFit: 'contain', background: '#f5f5f5' }} />
        </div>

        {/* Download / Share */}
        <div className="grid grid-cols-2 gap-2">
          <button onClick={handleDownload}
            className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white"
            style={{ background: 'linear-gradient(135deg, rgba(220,38,38,0.85), rgba(153,27,27,0.9))' }}>
            <Download size={14} /><span>ڈاؤنلوڈ</span>
          </button>
          <button onClick={handleShare}
            className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold"
            style={{ background: 'rgba(220,38,38,0.08)', border: '1.5px solid rgba(220,38,38,0.3)', color: '#b91c1c' }}>
            <Share2 size={14} /><span>شیئر</span>
          </button>
        </div>
      </div>
    </div>
  );
}
