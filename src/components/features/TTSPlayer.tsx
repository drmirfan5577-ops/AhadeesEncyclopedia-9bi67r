import { useState, useRef } from 'react';
import { Volume2, VolumeX, SkipBack, SkipForward, Play, Pause, Mic, Square, Download } from 'lucide-react';
import { toast } from 'sonner';

interface TTSPlayerProps {
  arabicText?: string;
  urduText?: string;
  englishText?: string;
  title?: string;
  onClose?: () => void;
}

export default function TTSPlayer({ arabicText = '', urduText = '', englishText = '', title = '', onClose }: TTSPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLang, setCurrentLang] = useState<'ar' | 'ur' | 'en'>('ar');
  const [rate, setRate] = useState(0.8);
  const [pitch, setPitch] = useState(1.0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const texts: Record<'ar' | 'ur' | 'en', string> = { ar: arabicText, ur: urduText, en: englishText };
  const langs: Record<'ar' | 'ur' | 'en', string> = { ar: 'ar-SA', ur: 'ur-PK', en: 'en-US' };
  const langNames: Record<'ar' | 'ur' | 'en', string> = { ar: 'عربی', ur: 'اردو', en: 'English' };

  const speak = (lang: typeof currentLang = currentLang) => {
    if (!('speechSynthesis' in window)) { toast.error('Audio not supported'); return; }
    window.speechSynthesis.cancel();
    const text = texts[lang];
    if (!text) { toast.error('No text available for this language'); return; }
    const u = new SpeechSynthesisUtterance(text);
    u.lang = langs[lang];
    u.rate = rate;
    u.pitch = pitch;
    u.volume = 1;
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find((v) => v.lang.startsWith(lang === 'ar' ? 'ar' : lang === 'ur' ? 'ur' : 'en'));
    if (voice) u.voice = voice;
    u.onstart = () => { setIsPlaying(true); setCurrentLang(lang); };
    u.onend = () => setIsPlaying(false);
    u.onerror = () => setIsPlaying(false);
    window.speechSynthesis.speak(u);
  };

  const stop = () => { window.speechSynthesis.cancel(); setIsPlaying(false); };

  const handleRecord = async () => {
    if (isRecording) {
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      chunksRef.current = [];
      const mr = new MediaRecorder(stream);
      mr.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data); };
      mr.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        setRecordedBlob(blob);
        stream.getTracks().forEach((t) => t.stop());
        toast.success('Recording saved! • ریکارڈنگ محفوظ ہوئی');
      };
      mr.start();
      mediaRecorderRef.current = mr;
      setIsRecording(true);
      toast.success('Recording started • ریکارڈنگ شروع ہوئی');
    } catch {
      toast.error('Microphone access denied • مائیکروفون تک رسائی نہیں');
    }
  };

  const downloadRecording = () => {
    if (!recordedBlob) return;
    const url = URL.createObjectURL(recordedBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ahadees_recording_${Date.now()}.webm`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Recording downloaded • ریکارڈنگ ڈاؤنلوڈ ہوئی');
  };

  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.08), rgba(255,255,255,0.97))', border: '1.5px solid rgba(124,58,237,0.3)', boxShadow: '0 8px 32px rgba(124,58,237,0.15)' }}>
      {/* Header */}
      <div className="px-4 py-3 flex items-center justify-between" style={{ background: 'linear-gradient(90deg, rgba(124,58,237,0.12), rgba(220,38,38,0.08))', borderBottom: '1px solid rgba(124,58,237,0.15)' }}>
        <div className="flex items-center gap-2">
          <Volume2 size={16} style={{ color: '#7c3aed' }} />
          <span className="text-xs font-bold" style={{ color: '#5b21b6' }}>TTS Player • صوتی تلاوت</span>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-xs text-gray-400 hover:text-gray-600 px-2 py-1 rounded" style={{ minHeight: 28 }}>✕</button>
        )}
      </div>

      <div className="p-4 space-y-3">
        {/* Title */}
        {title && <p className="text-xs text-gray-500 font-medium truncate">{title}</p>}

        {/* Language Selector */}
        <div className="flex gap-2">
          {(['ar', 'ur', 'en'] as const).map((lang) => (
            <button key={lang} onClick={() => setCurrentLang(lang)}
              className="flex-1 py-1.5 rounded-lg text-xs font-bold transition-all"
              style={{ minHeight: 32, background: currentLang === lang ? 'linear-gradient(135deg, rgba(124,58,237,0.85), rgba(91,33,182,0.9))' : 'rgba(124,58,237,0.08)', color: currentLang === lang ? '#fff' : '#7c3aed', border: `1px solid ${currentLang === lang ? 'rgba(124,58,237,0.7)' : 'rgba(124,58,237,0.2)'}` }}>
              {langNames[lang]}
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3">
          <button onClick={() => { const langs: Array<'ar' | 'ur' | 'en'> = ['ar', 'ur', 'en']; const i = langs.indexOf(currentLang); setCurrentLang(langs[(i - 1 + 3) % 3]); }}
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.25)' }}>
            <SkipBack size={14} style={{ color: '#7c3aed' }} />
          </button>

          <button onClick={isPlaying ? stop : () => speak()}
            className="w-14 h-14 rounded-full flex items-center justify-center transition-all"
            style={{ background: isPlaying ? 'linear-gradient(135deg, #ef4444, #b91c1c)' : 'linear-gradient(135deg, #7c3aed, #5b21b6)', boxShadow: `0 0 20px ${isPlaying ? 'rgba(220,38,38,0.5)' : 'rgba(124,58,237,0.5)'}` }}>
            {isPlaying ? <Pause size={22} color="#fff" /> : <Play size={22} color="#fff" />}
          </button>

          <button onClick={() => { const langs: Array<'ar' | 'ur' | 'en'> = ['ar', 'ur', 'en']; const i = langs.indexOf(currentLang); setCurrentLang(langs[(i + 1) % 3]); }}
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.25)' }}>
            <SkipForward size={14} style={{ color: '#7c3aed' }} />
          </button>
        </div>

        {/* Speed & Pitch */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] text-gray-500 font-medium">رفتار • Speed</span>
              <span className="text-[10px] font-bold" style={{ color: '#7c3aed' }}>{rate.toFixed(1)}x</span>
            </div>
            <input type="range" min="0.5" max="2" step="0.1" value={rate}
              onChange={(e) => setRate(parseFloat(e.target.value))}
              className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
              style={{ accentColor: '#7c3aed' }} />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] text-gray-500 font-medium">آواز • Pitch</span>
              <span className="text-[10px] font-bold" style={{ color: '#7c3aed' }}>{pitch.toFixed(1)}</span>
            </div>
            <input type="range" min="0.5" max="2" step="0.1" value={pitch}
              onChange={(e) => setPitch(parseFloat(e.target.value))}
              className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
              style={{ accentColor: '#7c3aed' }} />
          </div>
        </div>

        {/* Play All Sequence */}
        <button onClick={() => { speak('ar'); }}
          className="w-full py-2 rounded-xl text-xs font-bold"
          style={{ background: 'linear-gradient(135deg, rgba(220,38,38,0.1), rgba(124,58,237,0.1))', border: '1px solid rgba(124,58,237,0.2)', color: '#5b21b6' }}>
          ▶ تمام زبانوں میں چلائیں • Play All Languages
        </button>

        {/* Recorder */}
        <div className="p-3 rounded-xl" style={{ background: isRecording ? 'rgba(220,38,38,0.08)' : 'rgba(0,0,0,0.03)', border: `1px solid ${isRecording ? 'rgba(220,38,38,0.3)' : 'rgba(0,0,0,0.06)'}` }}>
          <p className="text-[10px] text-gray-500 font-medium mb-2">آڈیو ریکارڈر • Audio Recorder</p>
          <div className="flex items-center gap-2">
            <button onClick={handleRecord}
              className="flex-1 py-2 rounded-xl flex items-center justify-center gap-1.5 text-xs font-bold transition-all"
              style={{ background: isRecording ? 'linear-gradient(135deg, rgba(220,38,38,0.85), rgba(153,27,27,0.9))' : 'rgba(220,38,38,0.1)', color: isRecording ? '#fff' : '#dc2626', border: `1px solid ${isRecording ? 'rgba(220,38,38,0.7)' : 'rgba(220,38,38,0.25)'}`, minHeight: 36 }}>
              {isRecording ? <><Square size={12} /><span>روکیں • Stop</span></> : <><Mic size={12} /><span>ریکارڈ • Record</span></>}
            </button>
            {recordedBlob && (
              <button onClick={downloadRecording}
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(21,128,61,0.1)', border: '1px solid rgba(21,128,61,0.3)' }}>
                <Download size={14} style={{ color: '#15803d' }} />
              </button>
            )}
          </div>
          {isRecording && (
            <div className="flex items-center gap-2 mt-2">
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#dc2626' }} />
              <span className="text-[10px] text-red-600 font-bold">ریکارڈنگ جاری ہے • Recording...</span>
            </div>
          )}
          {recordedBlob && !isRecording && (
            <p className="text-[10px] text-green-600 font-medium mt-1">✅ ریکارڈنگ تیار • Recording ready</p>
          )}
        </div>
      </div>
    </div>
  );
}
