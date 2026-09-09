import { useNavigate, useLocation } from 'react-router-dom';
import {
  Home, BookOpen, BookMarked, Grid3X3, Library,
  Search, Star, Settings, Info, ShieldCheck,
} from 'lucide-react';

const navItems = [
  { icon: Home,        label: 'Home',    labelUr: 'ہوم',    path: '/' },
  { icon: BookOpen,    label: 'Hadith',  labelUr: 'احادیث', path: '/reader' },
  { icon: BookMarked,  label: 'Quran',   labelUr: 'قرآن',   path: '/quran' },
  { icon: Grid3X3,     label: 'Cat.',    labelUr: 'زمرے',   path: '/categories' },
  { icon: Library,     label: 'Library', labelUr: 'کتب',    path: '/library' },
  { icon: Search,      label: 'Search',  labelUr: 'تلاش',   path: '/search' },
  { icon: Star,        label: 'Saved',   labelUr: 'محفوظ',  path: '/bookmarks' },
  { icon: Settings,    label: 'Setup',   labelUr: 'ترتیب',  path: '/settings' },
  { icon: Info,        label: 'About',   labelUr: 'بارے',   path: '/about' },
  { icon: ShieldCheck, label: 'Admin',   labelUr: 'ایڈمن',  path: '/admin' },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  // Treat /book/* as active for library
  const getActivePath = (path: string) => {
    if (path === '/library' && location.pathname.startsWith('/book/')) return true;
    return location.pathname === path;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 safe-bottom">
      <div
        className="mx-2 mb-2 px-1 py-1.5 rounded-2xl"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(255,248,248,0.96) 100%)',
          backdropFilter: 'blur(24px) saturate(200%)',
          WebkitBackdropFilter: 'blur(24px) saturate(200%)',
          border: '1.5px solid rgba(220,38,38,0.22)',
          boxShadow: '0 -2px 20px rgba(220,38,38,0.1), 0 4px 24px rgba(0,0,0,0.08)',
        }}
      >
        <div className="flex items-center justify-around overflow-x-auto scrollbar-red">
          {navItems.map(({ icon: Icon, label, labelUr, path }) => {
            const isActive = getActivePath(path);
            const isAdmin = path === '/admin';
            const activeColor = isAdmin ? '#7c3aed' : '#b91c1c';
            const inactiveColor = isAdmin ? '#a78bfa' : '#9ca3af';

            return (
              <button
                key={path}
                onClick={() => navigate(path)}
                className="nav-item flex-shrink-0 flex flex-col items-center"
                style={{ minWidth: 36, minHeight: 44 }}
              >
                <Icon
                  size={15}
                  style={{
                    color: isActive ? activeColor : inactiveColor,
                    filter: isActive ? `drop-shadow(0 0 4px ${isActive ? activeColor : 'transparent'}90)` : 'none',
                  }}
                />
                <span
                  className="mt-0.5 font-semibold truncate"
                  style={{ fontSize: 7, color: isActive ? activeColor : inactiveColor }}
                >
                  {labelUr}
                </span>
                {isActive && (
                  <div className="w-1 h-1 rounded-full mt-0.5"
                    style={{ background: activeColor, boxShadow: `0 0 4px ${activeColor}` }} />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
