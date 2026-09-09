import { Download, Upload, FileJson, FileText, FileSpreadsheet } from 'lucide-react';
import { useRef } from 'react';
import { AHADEES } from '@/constants/ahadees';
import { AppSettings } from '@/types';
import { toast } from 'sonner';

interface ExportImportProps {
  settings: AppSettings;
  onImport: (file: File) => void;
  showUrdu?: boolean;
}

export default function ExportImport({ settings, onImport, showUrdu = false }: ExportImportProps) {
  const fileRef = useRef<HTMLInputElement>(null);

  const exportAsJSON = () => {
    const data = {
      appName: 'Ahadees Encyclopedia',
      version: '2.0',
      author: 'EvEr SmArT-wOrLd | Dr M Irfan Qadir Thaheem | eversmart/drirfan',
      exportDate: new Date().toISOString(),
      settings,
      bookmarkedAhadees: AHADEES.filter((h) => settings.bookmarks.includes(h.id)),
      totalAhadees: AHADEES.length,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ahadees_encyclopedia_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(showUrdu ? 'JSON فائل محفوظ ہو گئی' : 'JSON exported!');
  };

  const exportAsText = () => {
    let text = `AHADEES ENCYCLOPEDIA\nBy EvEr SmArT-wOrLd | Dr M Irfan Qadir Thaheem\neversmart/drirfan\n`;
    text += `Exported: ${new Date().toLocaleDateString()}\n`;
    text += `${'='.repeat(60)}\n\n`;
    const toExport = settings.bookmarks.length > 0
      ? AHADEES.filter((h) => settings.bookmarks.includes(h.id))
      : AHADEES;
    toExport.forEach((h, i) => {
      text += `${i + 1}. [${h.source} #${h.hadithNumber}]\n`;
      text += `Arabic: ${h.arabic}\nUrdu: ${h.translations.ur || ''}\nEnglish: ${h.translations.en || ''}\nNarrator: ${h.narrator}\n`;
      text += `${'-'.repeat(40)}\n\n`;
    });
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ahadees_encyclopedia_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(showUrdu ? 'ٹیکسٹ فائل محفوظ ہو گئی' : 'Text exported!');
  };

  const exportAsCSV = () => {
    const toExport = settings.bookmarks.length > 0
      ? AHADEES.filter((h) => settings.bookmarks.includes(h.id))
      : AHADEES;
    const header = 'ID,Source,HadithNumber,Arabic,Urdu,English,Narrator,Category\n';
    const rows = toExport.map((h) =>
      `"${h.id}","${h.source}","${h.hadithNumber}","${h.arabic.replace(/"/g, '""')}","${(h.translations.ur || '').replace(/"/g, '""')}","${(h.translations.en || '').replace(/"/g, '""')}","${h.narrator.replace(/"/g, '""')}","${h.category}"`
    ).join('\n');
    const blob = new Blob(['\uFEFF' + header + rows], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ahadees_encyclopedia_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(showUrdu ? 'CSV فائل محفوظ ہو گئی' : 'CSV exported!');
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImport(file);
      toast.success(showUrdu ? 'ترتیبات درآمد ہو گئیں' : 'Settings imported!');
    }
    e.target.value = '';
  };

  const exportBtnStyle = (color: string) => ({
    background: `linear-gradient(135deg, ${color}10, ${color}06)`,
    border: `1.5px solid ${color}30`,
    color: color,
  });

  return (
    <div>
      <h3 className="text-sm font-bold mb-3" style={{ color: '#7f1d1d' }}>
        {showUrdu ? 'برآمد / درآمد' : 'Export / Import'}
      </h3>
      <p className="text-xs text-gray-500 mb-4">
        {showUrdu
          ? 'احادیث اور ترتیبات کو مختلف فارمیٹس میں محفوظ کریں'
          : 'Save ahadees and settings in multiple formats'}
      </p>

      <div className="space-y-2">
        {/* JSON Export */}
        <button
          onClick={exportAsJSON}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold"
          style={{ ...exportBtnStyle('#1d4ed8'), minHeight: 52 }}
        >
          <FileJson size={20} style={{ color: '#1d4ed8' }} />
          <div className="text-left flex-1">
            <p className="text-sm font-bold">{showUrdu ? 'JSON فارمیٹ' : 'Export as JSON'}</p>
            <p className="text-xs opacity-70 font-normal">{showUrdu ? 'تمام ڈیٹا اور ترتیبات' : 'All data + settings'}</p>
          </div>
          <Download size={16} />
        </button>

        {/* Text Export */}
        <button
          onClick={exportAsText}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold"
          style={{ ...exportBtnStyle('#dc2626'), minHeight: 52 }}
        >
          <FileText size={20} style={{ color: '#dc2626' }} />
          <div className="text-left flex-1">
            <p className="text-sm font-bold">{showUrdu ? 'ٹیکسٹ فارمیٹ' : 'Export as Text (.txt)'}</p>
            <p className="text-xs opacity-70 font-normal">{showUrdu ? 'سادہ متن' : 'Plain readable text'}</p>
          </div>
          <Download size={16} />
        </button>

        {/* CSV Export */}
        <button
          onClick={exportAsCSV}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold"
          style={{ ...exportBtnStyle('#15803d'), minHeight: 52 }}
        >
          <FileSpreadsheet size={20} style={{ color: '#15803d' }} />
          <div className="text-left flex-1">
            <p className="text-sm font-bold">{showUrdu ? 'CSV فارمیٹ' : 'Export as CSV'}</p>
            <p className="text-xs opacity-70 font-normal">{showUrdu ? 'ایکسل کے لیے' : 'For Excel / spreadsheets'}</p>
          </div>
          <Download size={16} />
        </button>

        {/* Import */}
        <button
          onClick={() => fileRef.current?.click()}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold"
          style={{ ...exportBtnStyle('#d97706'), minHeight: 52 }}
        >
          <Upload size={20} style={{ color: '#d97706' }} />
          <div className="text-left flex-1">
            <p className="text-sm font-bold">{showUrdu ? 'ترتیبات درآمد کریں' : 'Import Settings'}</p>
            <p className="text-xs opacity-70 font-normal">{showUrdu ? 'JSON فائل سے' : 'From JSON file'}</p>
          </div>
          <Upload size={16} />
        </button>
      </div>

      <input
        ref={fileRef}
        type="file"
        accept=".json"
        className="hidden"
        onChange={handleImport}
      />

      <div
        className="mt-4 p-3 rounded-xl text-center"
        style={{ background: 'rgba(220,38,38,0.04)', border: '1px solid rgba(220,38,38,0.1)' }}
      >
        <p className="text-[11px] text-gray-400">
          All formats supported: JSON, TXT, CSV • تمام فارمیٹس سپورٹڈ
        </p>
      </div>
    </div>
  );
}
