import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Radio, Play, Pause, SkipBack, SkipForward, Volume2, VolumeX,
  Shuffle, Repeat, ChevronDown, ChevronUp, List, X, Music2,
  Settings2, Loader,
} from 'lucide-react';
import { QARIS, Qari, getSurahAudioUrl, AudioQuality, QUALITY_LABELS } from '@/constants/qaris';
import { QURAN_SURAHS } from '@/constants/quranData';
import { toast } from 'sonner';

// Module-level audio singleton for persistent background play
let globalAudio: HTMLAudioElement | null = null;
const getGlobalAudio = (): HTMLAudioElement => {
  if (!globalAudio) {
    globalAudio = new Audio();
    globalAudio.preload = 'auto';
    globalAudio.crossOrigin = 'anonymous';
  }
  return globalAudio;
};

export default function QuranRadio() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedQari, setSelectedQari] = useState<Qari>(QARIS[0]);
  const [currentSurah, setCurrentSurah] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [quality, setQuality] = useState<AudioQuality>(128);
  const [showQariList, setShowQariList] = useState(false);
  const [showSurahList, setShowSurahList] = useState(false);
  const [showQualityPicker, setShowQualityPicker] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(getGlobalAudio());

  const currentSurahInfo = QURAN_SURAHS.find((s) => s.id === currentSurah) || QURAN_SURAHS[0];

  // MediaSession API for lock-screen controls
  const updateMediaSession = useCallback(() => {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: `${currentSurahInfo.nameUr} — ${currentSurahInfo.nameAr}`,
        artist: selectedQari.nameUr,
        album: 'قرآنِ کریم • Holy Quran',
      });
      navigator.mediaSession.setActionHandler('play', () => handlePlayPause());
      navigator.mediaSession.setActionHandler('pause', () => handlePlayPause());
      navigator.mediaSession.setActionHandler('previoustrack', () => prevSurah());
      navigator.mediaSession.setActionHandler('nexttrack', () => nextSurah());
    }
  }, [currentSurah, selectedQari]);

  useEffect(() => {
    const audio = audioRef.current;

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      if (audio.duration) setProgress((audio.currentTime / audio.duration) * 100);
    };
    const onDuration = () => setDuration(audio.duration || 0);
    const onPlay = () => { setIsPlaying(true); setIsLoading(false); };
    const onPause = () => setIsPlaying(false);
    const onWaiting = () => setIsLoading(true);
    const onCanPlay = () => setIsLoading(false);
    const onError = () => { setIsLoading(false); setIsPlaying(false); };
    const onEnded = () => {
      if (repeat) {
        audio.currentTime = 0;
        audio.play().catch(() => {});
      } else if (shuffle) {
        const next = Math.floor(Math.random() * 114) + 1;
        loadAndPlay(next);
      } else {
        loadAndPlay(currentSurah < 114 ? currentSurah + 1 : 1);
      }
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('durationchange', onDuration);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('waiting', onWaiting);
    audio.addEventListener('canplay', onCanPlay);
    audio.addEventListener('error', onError);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('durationchange', onDuration);
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('waiting', onWaiting);
      audio.removeEventListener('canplay', onCanPlay);
      audio.removeEventListener('error', onError);
      audio.removeEventListener('ended', onEnded);
    };
  }, [currentSurah, repeat, shuffle]);

  const loadAndPlay = useCallback(async (surahNum: number, qari: Qari = selectedQari, q: AudioQuality = quality) => {
    const audio = audioRef.current;
    const url = getSurahAudioUrl(qari.edition, surahNum, q);
    audio.src = url;
    audio.volume = isMuted ? 0 : volume;
    setCurrentSurah(surahNum);
    setProgress(0);
    setCurrentTime(0);
    setIsLoading(true);
    try {
      await audio.play();
      updateMediaSession();
      toast.success(`${QURAN_SURAHS.find(s => s.id === surahNum)?.nameUr} — ${qari.nameUr}`);
    } catch (e) {
      setIsLoading(false);
      toast.error('Audio playback failed — check internet connection');
    }
  }, [selectedQari, quality, volume, isMuted, updateMediaSession]);

  const handlePlayPause = useCallback(async () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      if (!audio.src || audio.ended) {
        await loadAndPlay(currentSurah);
      } else {
        await audio.play().catch(() => {});
      }
    }
  }, [isPlaying, currentSurah, loadAndPlay]);

  const nextSurah = useCallback(() => {
    const next = shuffle
      ? Math.floor(Math.random() * 114) + 1
      : currentSurah < 114 ? currentSurah + 1 : 1;
    loadAndPlay(next);
  }, [currentSurah, shuffle, loadAndPlay]);

  const prevSurah = useCallback(() => {
    const prev = currentSurah > 1 ? currentSurah - 1 : 114;
    loadAndPlay(prev);
  }, [currentSurah, loadAndPlay]);

  const handleVolumeChange = (val: number) => {
    const audio = audioRef.current;
    setVolume(val);
    setIsMuted(val === 0);
    audio.volume = val;
  };

  const handleMute = () => {
    const audio = audioRef.current;
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    audio.volume = newMuted ? 0 : volume;
  };

  const handleSeek = (pct: number) => {
    const audio = audioRef.current;
    if (audio.duration) {
      audio.currentTime = (pct / 100) * audio.duration;
    }
  };

  const handleQariChange = (qari: Qari) => {
    setSelectedQari(qari);
    setShowQariList(false);
    if (isPlaying) loadAndPlay(currentSurah, qari, quality);
  };

  const handleQualityChange = (q: AudioQuality) => {
    setQuality(q);
    setShowQualityPicker(false);
    if (isPlaying) loadAndPlay(currentSurah, selectedQari, q);
  };

  const fmtTime = (s: number) => {
    if (!s || !isFinite(s)) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-4 z-40 w-12 h-12 rounded-full flex items-center justify-center transition-all active:scale-95"
        style={{
          background: isPlaying
            ? 'linear-gradient(135deg, #7c3aed, #4f46e5)'
            : 'linear-gradient(135deg, rgba(124,58,237,0.9), rgba(79,70,229,0.85))',
          boxShadow: isPlaying
            ? '0 0 20px rgba(124,58,237,0.7), 0 4px 16px rgba(0,0,0,0.2)'
            : '0 4px 16px rgba(124,58,237,0.4)',
          border: '1.5px solid rgba(255,255,255,0.3)',
        }}
      >
        {isPlaying ? (
          <div className="flex items-end gap-[2px] h-5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-[3px] rounded-full bg-white"
                style={{ height: `${[60, 100, 70][i - 1]}%`, animation: `equalizer 0.${i + 4}s ease-in-out infinite alternate` }} />
            ))}
          </div>
        ) : (
          <Radio size={20} color="#fff" />
        )}
        {isPlaying && (
          <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-white animate-pulse" />
        )}
      </button>
    );
  }

  return (
    <div
      className="fixed bottom-20 right-3 left-3 z-40 rounded-2xl overflow-hidden transition-all"
      style={{
        background: 'linear-gradient(145deg, rgba(255,255,255,0.98), rgba(248,245,255,0.97))',
        border: '1.5px solid rgba(124,58,237,0.35)',
        boxShadow: '0 -4px 32px rgba(124,58,237,0.2), 0 8px 40px rgba(0,0,0,0.12)',
        backdropFilter: 'blur(24px)',
        maxHeight: isExpanded ? '90vh' : 'auto',
        overflowY: isExpanded ? 'auto' : 'hidden',
      }}
    >
      {/* Header Bar */}
      <div
        className="px-4 py-3 flex items-center gap-3"
        style={{
          background: 'linear-gradient(90deg, rgba(124,58,237,0.12), rgba(79,70,229,0.08))',
          borderBottom: '1px solid rgba(124,58,237,0.15)',
        }}
      >
        <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #7c3aed, #4f46e5)', boxShadow: '0 0 12px rgba(124,58,237,0.5)' }}>
          <Radio size={14} color="#fff" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold truncate" style={{ color: '#5b21b6' }}>
            قرآن ریڈیو • Quran Radio
          </p>
          <p className="text-[10px] text-gray-400 truncate">{selectedQari.nameUr} • {QUALITY_LABELS[quality]}</p>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => setIsExpanded(!isExpanded)}
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: 'rgba(124,58,237,0.1)' }}>
            {isExpanded ? <ChevronDown size={13} style={{ color: '#7c3aed' }} /> : <ChevronUp size={13} style={{ color: '#7c3aed' }} />}
          </button>
          <button onClick={() => { setIsOpen(false); }}
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.06)' }}>
            <X size={13} color="#9ca3af" />
          </button>
        </div>
      </div>

      {/* Now Playing */}
      <div className="px-4 py-3">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
            style={{
              background: `linear-gradient(135deg, ${selectedQari.color}20, ${selectedQari.color}08)`,
              border: `1.5px solid ${selectedQari.color}30`,
              boxShadow: isPlaying ? `0 0 16px ${selectedQari.color}30` : 'none',
            }}>
            📖
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-base font-bold truncate" style={{ fontFamily: "'Amiri',serif", color: '#111', direction: 'rtl', textAlign: 'right' }}>
              {currentSurahInfo.nameAr}
            </p>
            <p className="text-xs text-gray-600 font-semibold truncate">{currentSurahInfo.nameUr} • {currentSurahInfo.name}</p>
            <p className="text-[10px] text-gray-400 truncate">{currentSurahInfo.ayahCount} آیات • {currentSurahInfo.type === 'Makki' ? 'مکی' : 'مدنی'}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-2">
          <input
            type="range" min={0} max={100} step={0.1} value={progress}
            onChange={(e) => handleSeek(parseFloat(e.target.value))}
            className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
            style={{ accentColor: selectedQari.color }}
          />
          <div className="flex justify-between mt-0.5">
            <span className="text-[10px] text-gray-400">{fmtTime(currentTime)}</span>
            <span className="text-[10px] text-gray-400">{fmtTime(duration)}</span>
          </div>
        </div>

        {/* Main Controls */}
        <div className="flex items-center justify-center gap-4 mb-3">
          <button onClick={() => setShuffle(!shuffle)}
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: shuffle ? `${selectedQari.color}15` : 'rgba(0,0,0,0.04)', border: shuffle ? `1px solid ${selectedQari.color}40` : 'none' }}>
            <Shuffle size={14} style={{ color: shuffle ? selectedQari.color : '#9ca3af' }} />
          </button>

          <button onClick={prevSurah}
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)' }}>
            <SkipBack size={16} style={{ color: '#7c3aed' }} />
          </button>

          <button onClick={handlePlayPause}
            className="w-14 h-14 rounded-full flex items-center justify-center transition-all"
            style={{
              background: `linear-gradient(135deg, ${selectedQari.color}, ${selectedQari.color}cc)`,
              boxShadow: `0 0 24px ${selectedQari.color}60`,
            }}>
            {isLoading ? (
              <Loader size={22} color="#fff" className="animate-spin" />
            ) : isPlaying ? (
              <Pause size={22} color="#fff" />
            ) : (
              <Play size={22} color="#fff" style={{ marginLeft: 2 }} />
            )}
          </button>

          <button onClick={nextSurah}
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)' }}>
            <SkipForward size={16} style={{ color: '#7c3aed' }} />
          </button>

          <button onClick={() => setRepeat(!repeat)}
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: repeat ? `${selectedQari.color}15` : 'rgba(0,0,0,0.04)', border: repeat ? `1px solid ${selectedQari.color}40` : 'none' }}>
            <Repeat size={14} style={{ color: repeat ? selectedQari.color : '#9ca3af' }} />
          </button>
        </div>

        {/* Volume + Quality */}
        <div className="flex items-center gap-3 mb-3">
          <button onClick={handleMute} className="flex-shrink-0">
            {isMuted ? <VolumeX size={14} color="#9ca3af" /> : <Volume2 size={14} style={{ color: selectedQari.color }} />}
          </button>
          <input
            type="range" min={0} max={1} step={0.05} value={isMuted ? 0 : volume}
            onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
            className="flex-1 h-1.5 rounded-full appearance-none cursor-pointer"
            style={{ accentColor: selectedQari.color }}
          />
          <button onClick={() => setShowQualityPicker(!showQualityPicker)}
            className="flex-shrink-0 px-2 py-1 rounded-lg text-[9px] font-bold"
            style={{ background: `${selectedQari.color}12`, color: selectedQari.color, border: `1px solid ${selectedQari.color}25` }}>
            {quality}k
          </button>
        </div>

        {/* Quality Picker */}
        {showQualityPicker && (
          <div className="flex gap-2 mb-3 p-2 rounded-xl" style={{ background: 'rgba(0,0,0,0.04)' }}>
            {([64, 128, 192] as AudioQuality[]).map((q) => (
              <button key={q} onClick={() => handleQualityChange(q)}
                className="flex-1 py-1.5 rounded-lg text-[10px] font-bold"
                style={{
                  background: quality === q ? `linear-gradient(135deg, ${selectedQari.color}, ${selectedQari.color}cc)` : 'rgba(255,255,255,0.7)',
                  color: quality === q ? '#fff' : '#6b7280',
                  border: `1px solid ${quality === q ? selectedQari.color : 'rgba(0,0,0,0.08)'}`,
                  minHeight: 30,
                }}>
                {QUALITY_LABELS[q]}
              </button>
            ))}
          </div>
        )}

        {/* Qari Selector Button */}
        <button onClick={() => { setShowQariList(!showQariList); setShowSurahList(false); }}
          className="w-full flex items-center gap-2 p-3 rounded-xl mb-2 transition-all"
          style={{
            background: 'rgba(0,0,0,0.03)',
            border: '1px solid rgba(124,58,237,0.15)',
          }}>
          <span className="text-lg">{selectedQari.countryCode}</span>
          <div className="flex-1 text-left">
            <p className="text-xs font-bold" style={{ color: '#5b21b6' }}>{selectedQari.nameUr}</p>
            <p className="text-[10px] text-gray-400">{selectedQari.name} • {selectedQari.style}</p>
          </div>
          <Music2 size={13} style={{ color: '#7c3aed' }} />
        </button>

        {/* Qari List */}
        {showQariList && (
          <div className="rounded-xl overflow-hidden mb-3 max-h-48 overflow-y-auto"
            style={{ border: '1px solid rgba(124,58,237,0.2)', background: 'rgba(255,255,255,0.9)' }}>
            {QARIS.map((qari) => (
              <button key={qari.id} onClick={() => handleQariChange(qari)}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-left transition-all border-b last:border-b-0"
                style={{
                  background: selectedQari.id === qari.id ? `${qari.color}10` : 'transparent',
                  borderColor: 'rgba(0,0,0,0.05)',
                }}>
                <span className="text-base">{qari.countryCode}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold truncate" style={{ color: qari.color }}>{qari.nameUr}</p>
                  <p className="text-[9px] text-gray-400 truncate">{qari.description}</p>
                </div>
                {selectedQari.id === qari.id && (
                  <div className="w-2 h-2 rounded-full" style={{ background: qari.color }} />
                )}
              </button>
            ))}
          </div>
        )}

        {/* Surah List Toggle */}
        <button onClick={() => { setShowSurahList(!showSurahList); setShowQariList(false); }}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold"
          style={{ background: 'rgba(124,58,237,0.06)', color: '#7c3aed', border: '1px solid rgba(124,58,237,0.15)' }}>
          <List size={12} />
          <span>{showSurahList ? 'بند کریں' : 'سورتیں منتخب کریں • Select Surah'}</span>
        </button>

        {/* Surah List */}
        {showSurahList && (
          <div className="mt-2 rounded-xl overflow-hidden max-h-52 overflow-y-auto"
            style={{ border: '1px solid rgba(124,58,237,0.2)' }}>
            {QURAN_SURAHS.map((surah) => (
              <button key={surah.id} onClick={() => { loadAndPlay(surah.id); setShowSurahList(false); }}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-left border-b last:border-b-0 transition-all"
                style={{
                  background: currentSurah === surah.id ? 'rgba(124,58,237,0.1)' : 'rgba(255,255,255,0.9)',
                  borderColor: 'rgba(0,0,0,0.04)',
                }}>
                <span className="text-[10px] font-bold w-6 text-center" style={{ color: '#7c3aed' }}>{surah.id}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold truncate text-gray-800">{surah.nameUr}</p>
                  <p className="text-[9px] text-gray-400">{surah.name} • {surah.ayahCount} آیات</p>
                </div>
                <p className="text-base flex-shrink-0" style={{ fontFamily: "'Amiri',serif", color: '#5b21b6' }}>{surah.nameAr}</p>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Mini Footer */}
      <div className="px-4 pb-3 flex items-center justify-between">
        <p className="text-[9px] text-gray-300">Islamic Network CDN • UHD Audio</p>
        <p className="text-[9px] font-bold" style={{ color: '#7c3aed' }}>eversmart/drirfan</p>
      </div>

      <style>{`
        @keyframes equalizer {
          from { transform: scaleY(0.4); }
          to { transform: scaleY(1); }
        }
      `}</style>
    </div>
  );
}
