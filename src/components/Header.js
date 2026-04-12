import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  // Mencegah scroll body saat menu mobile terbuka
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <header className="ps-custom-header">
        <div className="ps-header-container">
          <div className="ps-logo">
            <Link href="https://pujashanti.web.id/web-design/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
                <img 
                  src="https://pujashanti.web.id/wp-content/uploads/2026/04/pujashanti-logo-100x100-1.webp" 
                  style={{ width: '45px', height: '45px', borderRadius: '50%', objectFit: 'cover' }}
                  alt="Logo" 
                />
                <span style={{ fontWeight: '800', color: '#1a3a5a', fontSize: '1.1rem' }}>PUJASHANTI</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="ps-desktop-nav">
            <ul>
              <li><Link href="https://pujashanti.web.id/iptv-playlist/">IPTV</Link></li>
              <li><Link href="https://pujashanti.web.id/live/">Live TV</Link></li>
              <li><Link href="https://pujashanti.web.id/tentang-pujashanti/">Tentang Kami</Link></li>
              <li><Link href="https://wa.me/6285737689037" className="ps-btn-wa">WhatsApp</Link></li>
            </ul>
          </nav>

          {/* Hamburger Button - Pastikan Z-index tinggi */}
          <button className="ps-hamburger-btn" onClick={toggleMenu} type="button">
            <div className="ps-hamburger-icon">
              <span></span><span></span><span></span>
            </div>
            <small>MENU</small>
          </button>
        </div>
      </header>

      {/* Mobile Menu - Inline Dynamic Style untuk Posisi */}
      <div 
        className="ps-dropdown-mobile" 
        style={{ right: isOpen ? '0' : '-100%' }}
      >
        <div className="ps-close-wrapper">
          <button className="ps-close-btn" onClick={() => setIsOpen(false)}>&times;</button>
        </div>
        <ul>
          <li><Link href="https://pujashanti.web.id/iptv-playlist/" onClick={() => setIsOpen(false)}>IPTV</Link></li>
          <li><Link href="https://pujashanti.web.id/live/" onClick={() => setIsOpen(false)}>Live TV</Link></li>
          <li><Link href="https://pujashanti.web.id/tentang-pujashanti/" onClick={() => setIsOpen(false)}>Tentang Kami</Link></li>
          <li style={{ marginTop: '20px' }}>
            <Link href="https://wa.me/6285737689037" className="ps-mobile-wa-btn" onClick={() => setIsOpen(false)}>
              Chat WhatsApp
            </Link>
          </li>
        </ul>
      </div>

      {/* Overlay */}
      <div 
        className={`ps-menu-overlay ${isOpen ? 'active' : ''}`} 
        onClick={() => setIsOpen(false)}
      ></div>

      {/* CSS INTERNAL (Global) - Agar tidak bergantung pada file .css luar */}
      <style jsx global>{`
        .ps-custom-header {
          position: fixed; top: 0; left: 0; width: 100%; height: 75px;
          background: #ffffff !important; z-index: 9999;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          display: flex; align-items: center;
        }
        .ps-header-container {
          width: 100%; max-width: 1200px; margin: 0 auto;
          display: flex; justify-content: space-between; align-items: center; padding: 0 20px;
        }
        .ps-desktop-nav ul { display: flex; gap: 20px; list-style: none; margin: 0; padding: 0; }
        .ps-desktop-nav :global(a) { text-decoration: none; color: #333; font-weight: 600; }
        .ps-btn-wa { background: #1a3a5a; color: #fff !important; padding: 8px 15px; border-radius: 5px; }

        /* Hamburger Styles */
        .ps-hamburger-btn {
          display: none; cursor: pointer; background: #f4f7f9; border: 1px solid #ddd;
          padding: 8px 12px; border-radius: 5px; align-items: center; gap: 8px;
        }
        .ps-hamburger-icon span { display: block; width: 20px; height: 2px; background: #1a3a5a; margin: 4px 0; }

        /* Mobile Menu Container */
        .ps-dropdown-mobile {
          position: fixed; top: 0; width: 280px; height: 100vh;
          background: #ffffff; z-index: 10000; transition: 0.4s ease-in-out;
          box-shadow: -5px 0 15px rgba(0,0,0,0.1);
        }
        .ps-close-wrapper { padding: 20px; text-align: right; border-bottom: 1px solid #eee; }
        .ps-close-btn { background: none; border: none; font-size: 30px; cursor: pointer; }
        .ps-dropdown-mobile ul { list-style: none; padding: 20px; }
        .ps-dropdown-mobile :global(a) { display: block; padding: 15px 0; text-decoration: none; color: #1a3a5a; font-weight: 700; }
        .ps-mobile-wa-btn { background: #1a3a5a; color: #fff !important; text-align: center; border-radius: 5px; }

        /* Overlay */
        .ps-menu-overlay {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(0,0,0,0.5); opacity: 0; visibility: hidden; transition: 0.3s; z-index: 9999;
        }
        .ps-menu-overlay.active { opacity: 1; visibility: visible; }

        @media (max-width: 991px) {
          .ps-desktop-nav { display: none; }
          .ps-hamburger-btn { display: flex; }
        }
      `}</style>
    </>
  );
}
