import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import Index from '@/pages/Index';
import Reader from '@/pages/Reader';
import Search from '@/pages/Search';
import Bookmarks from '@/pages/Bookmarks';
import Settings from '@/pages/Settings';
import About from '@/pages/About';
import Library from '@/pages/Library';
import Categories from '@/pages/Categories';
import Quran from '@/pages/Quran';
import Admin from '@/pages/Admin';
import HadithBookReader from '@/pages/HadithBookReader';
import NotFound from '@/pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: 'rgba(255,255,255,0.97)',
            backdropFilter: 'blur(16px)',
            border: '1.5px solid rgba(220,38,38,0.25)',
            color: '#7f1d1d',
            fontFamily: "'Inter', sans-serif",
            fontSize: '13px',
            fontWeight: 600,
            boxShadow: '0 4px 24px rgba(220,38,38,0.15)',
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/reader" element={<Reader />} />
        <Route path="/search" element={<Search />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/about" element={<About />} />
        <Route path="/library" element={<Library />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/quran" element={<Quran />} />
        <Route path="/admin" element={<Admin />} />
        {/* Full book reader — any of the 6 Kutub Sitta */}
        <Route path="/book/:bookSlug" element={<HadithBookReader />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
