import { BACKGROUNDS } from '@/constants/backgrounds';
import { Check } from 'lucide-react';

interface BackgroundSelectorProps {
  selectedId: string;
  onSelect: (id: string) => void;
  showUrdu?: boolean;
}

export default function BackgroundSelector({ selectedId, onSelect, showUrdu = false }: BackgroundSelectorProps) {
  return (
    <div>
      <h3 className="text-sm font-bold mb-3" style={{ color: '#7f1d1d' }}>
        {showUrdu ? 'پس منظر / تھیم منتخب کریں' : 'Select Background Theme'}
        <span className="text-gray-400 text-xs font-normal ml-2">({BACKGROUNDS.length} themes)</span>
      </h3>
      <div className="grid grid-cols-3 gap-2">
        {BACKGROUNDS.map((bg) => (
          <button
            key={bg.id}
            onClick={() => onSelect(bg.id)}
            className="relative rounded-2xl overflow-hidden flex flex-col items-center justify-center transition-all duration-300 group"
            style={{
              ...bg.style,
              minHeight: 80,
              border: selectedId === bg.id
                ? `2px solid ${bg.accentColor}`
                : '2px solid rgba(220,38,38,0.15)',
              boxShadow: selectedId === bg.id
                ? `0 0 16px ${bg.accentColor}50, 0 4px 16px ${bg.accentColor}25`
                : '0 2px 8px rgba(0,0,0,0.06)',
            }}
          >
            {/* Hover highlight */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity rounded-2xl"
              style={{
                background: `radial-gradient(circle at center, ${bg.accentColor}30, transparent 70%)`,
              }}
            />

            {selectedId === bg.id && (
              <div
                className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full flex items-center justify-center"
                style={{
                  background: bg.accentColor,
                  boxShadow: `0 0 8px ${bg.accentColor}80`,
                }}
              >
                <Check size={10} color="white" />
              </div>
            )}

            <p
              className="text-center px-1 leading-tight z-10 font-bold"
              style={{
                fontSize: 9,
                color: '#1a0000',
                textShadow: '0 1px 3px rgba(255,255,255,0.9)',
              }}
            >
              {showUrdu ? bg.nameUr : bg.name}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
