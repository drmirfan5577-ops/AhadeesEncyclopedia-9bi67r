import { useState, useCallback } from 'react';
import { AppSettings, LanguageCode } from '@/types';

export const DEFAULT_SETTINGS: AppSettings = {
  selectedBackground: 'crimson-cosmos',
  primaryLanguage: 'ar',
  secondaryLanguage: 'ur',
  fontSize: 'md',
  showArabic: true,
  bookmarks: [],
  fontFamily: 'noto',
  accentColor: 'red',
  animationLevel: 'medium',
  displayTexture: 'glass',
  cardStyle: 'default',
  showNarrator: true,
  showTags: true,
  darkMode: false,
};

const STORAGE_KEY = 'ahadees_app_settings_v3';

export function useAppSettings() {
  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
      }
    } catch {
      console.log('Settings load error, using defaults');
    }
    return DEFAULT_SETTINGS;
  });

  const saveSettings = useCallback((newSettings: AppSettings) => {
    setSettings(newSettings);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings));
    } catch {
      console.log('Settings save error');
    }
  }, []);

  const updateBackground = useCallback((id: string) => {
    saveSettings({ ...settings, selectedBackground: id });
  }, [settings, saveSettings]);

  const updatePrimaryLanguage = useCallback((lang: LanguageCode) => {
    saveSettings({ ...settings, primaryLanguage: lang });
  }, [settings, saveSettings]);

  const updateSecondaryLanguage = useCallback((lang: LanguageCode) => {
    saveSettings({ ...settings, secondaryLanguage: lang });
  }, [settings, saveSettings]);

  const updateFontSize = useCallback((size: AppSettings['fontSize']) => {
    saveSettings({ ...settings, fontSize: size });
  }, [settings, saveSettings]);

  const updateFontFamily = useCallback((family: AppSettings['fontFamily']) => {
    saveSettings({ ...settings, fontFamily: family });
  }, [settings, saveSettings]);

  const updateAccentColor = useCallback((color: AppSettings['accentColor']) => {
    saveSettings({ ...settings, accentColor: color });
  }, [settings, saveSettings]);

  const updateAnimationLevel = useCallback((level: AppSettings['animationLevel']) => {
    saveSettings({ ...settings, animationLevel: level });
  }, [settings, saveSettings]);

  const updateDisplayTexture = useCallback((texture: AppSettings['displayTexture']) => {
    saveSettings({ ...settings, displayTexture: texture });
  }, [settings, saveSettings]);

  const updateCardStyle = useCallback((style: AppSettings['cardStyle']) => {
    saveSettings({ ...settings, cardStyle: style });
  }, [settings, saveSettings]);

  const toggleBookmark = useCallback((id: string) => {
    const bookmarks = settings.bookmarks.includes(id)
      ? settings.bookmarks.filter((b) => b !== id)
      : [...settings.bookmarks, id];
    saveSettings({ ...settings, bookmarks });
  }, [settings, saveSettings]);

  const toggleShowArabic = useCallback(() => {
    saveSettings({ ...settings, showArabic: !settings.showArabic });
  }, [settings, saveSettings]);

  const toggleShowNarrator = useCallback(() => {
    saveSettings({ ...settings, showNarrator: !settings.showNarrator });
  }, [settings, saveSettings]);

  const toggleShowTags = useCallback(() => {
    saveSettings({ ...settings, showTags: !settings.showTags });
  }, [settings, saveSettings]);

  const toggleDarkMode = useCallback(() => {
    saveSettings({ ...settings, darkMode: !settings.darkMode });
  }, [settings, saveSettings]);

  const resetSettings = useCallback(() => {
    saveSettings(DEFAULT_SETTINGS);
  }, [saveSettings]);

  const exportSettings = useCallback(() => {
    const data = JSON.stringify(settings, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ahadees_settings.json';
    a.click();
    URL.revokeObjectURL(url);
  }, [settings]);

  const importSettings = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target?.result as string);
        saveSettings({ ...DEFAULT_SETTINGS, ...imported });
      } catch {
        console.log('Import error');
      }
    };
    reader.readAsText(file);
  }, [saveSettings]);

  return {
    settings,
    updateBackground,
    updatePrimaryLanguage,
    updateSecondaryLanguage,
    updateFontSize,
    updateFontFamily,
    updateAccentColor,
    updateAnimationLevel,
    updateDisplayTexture,
    updateCardStyle,
    toggleBookmark,
    toggleShowArabic,
    toggleShowNarrator,
    toggleShowTags,
    toggleDarkMode,
    resetSettings,
    exportSettings,
    importSettings,
  };
}
