import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error('404 Error: User attempted to access non-existent route:', location.pathname);
  }, [location.pathname]);

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: 'radial-gradient(ellipse at center, #1a0000 0%, #000000 100%)' }}
    >
      <div className="text-center px-4">
        <div
          className="text-6xl font-bold mb-4"
          style={{
            color: '#dc2626',
            textShadow: '0 0 20px rgba(220,38,38,0.8), 0 0 40px rgba(220,38,38,0.4)',
          }}
        >
          404
        </div>
        <p className="text-gray-400 text-lg mb-2">Page Not Found</p>
        <p className="text-gray-600 mb-6" style={{ fontFamily: "'Amiri', serif" }}>
          صفحہ نہیں ملا
        </p>
        <button
          onClick={() => navigate('/')}
          className="ios-button px-6 py-3 text-white font-semibold"
        >
          Return Home • واپس جائیں
        </button>
      </div>
    </div>
  );
};

export default NotFound;
