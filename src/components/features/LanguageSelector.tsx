import { LANGUAGES } from '@/constants/languages';
import { LanguageCode } from '@/types';

interface LanguageSelectorProps {
  label: string;
  selected: LanguageCode;
  onSelect: (code: LanguageCode) => void;
  exclude?: LanguageCode[];
}

export default function LanguageSelector({ label, selected, onSelect, exclude = [] }: LanguageSelectorProps) {
  return (
    <div className="mb-4">
      <label className="text-xs font-bold mb-2 block" style={{ color: '#7f1d1d' }}>{label}</label>
      <div className="grid grid-cols-2 gap-2">
        {LANGUAGES.filter((l) => !exclude.includes(l.code)).map((lang) => {
          const isSelected = selected === lang.code;
          return (
            <button
              key={lang.code}
              onClick={() => onSelect(lang.code)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-left transition-all duration-200"
              style={{
                minHeight: 48,
                background: isSelected
                  ? 'linear-gradient(135deg, rgba(220,38,38,0.12), rgba(220,38,38,0.06))'
                  : 'rgba(255,255,255,0.6)',
                border: isSelected
                  ? '1.5px solid rgba(220,38,38,0.4)'
                  : '1px solid rgba(0,0,0,0.08)',
                boxShadow: isSelected ? '0 2px 8px rgba(220,38,38,0.12)' : 'none',
              }}
            >
              <span className="text-xl">{lang.flag}</span>
              <div className="min-w-0">
                <p
                  className={`text-xs font-bold truncate ${isSelected ? '' : 'text-gray-700'}`}
                  style={{ color: isSelected ? '#b91c1c' : undefined }}
                >
                  {lang.nativeName}
                </p>
                <p className="text-[10px] text-gray-400 truncate">{lang.name}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
