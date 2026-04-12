import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  // Fungsi toggle yang lebih solid
  const toggleMenu = (e) => {
    if (e) e.preventDefault();
    setIsOpen(!isOpen);
  };

  return (
    <>
      <header className="ps-custom-header">
        <div className="ps-header-container">
          <div className="ps-logo">
            <Link href="https://pujashanti.web.id/web-design/">
                <img 
                  src="https://pujashanti.web.id/wp-content/uploads/2026/04/pujashanti-logo-100x100-1.webp" 
                  className="is-round" 
                  alt="Logo PUJASHANTI" 
                />
                <span>PUJASHANTI WEB DESIGN</span>
            </Link>
          </div>

          <nav className="ps-desktop-nav">
            <ul>
              <li><Link href="https://pujashanti.web.id/iptv-playlist/">IPTV</Link></li>
              <li><Link href="https://pujashanti.web.id/live/">Live TV</Link></li>
              <li><Link href="https://pujashanti.web.id/webseo/cloudstream/">Cloudstream</Link></li>
              <li><Link href="https://pujashanti.web.id/tentang-pujashanti/">Tentang Kami</Link></li>
              <li><Link href="https://wa.me/6285737689037" className="ps-btn-wa">Chat WhatsApp</Link></li>
            </ul>
          </nav>

          {/* Tombol Hamburger dengan pointer-events yang dipastikan aktif */}
          <button 
            className="ps-hamburger-btn" 
            type="button" 
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            <div className="ps-hamburger-icon">
              <span></span><span></span><span></span>
            </div>
            <small>MENU</small>
          </button>
        </div>
      </header>

      {/* MOBILE MENU - Menggunakan z-index paling tinggi */}
      <div className={`ps-dropdown-mobile ${isOpen ? 'is-open' : ''}`}>
        <div className="ps-close-wrapper">
          <button className="ps-close-btn" onClick={() => setIsOpen(false)}>&times;</button>
        </div>
        <ul>
          <li><Link href="https://pujashanti.web.id/iptv-playlist/" onClick={() => setIsOpen(false)}>IPTV</Link></li>
          <li><Link href="https://pujashanti.web.id/live/" onClick={() => setIsOpen(false)}>Live TV</Link></li>
          <li><Link href="https://pujashanti.web.id/webseo/cloudstream/" onClick={() => setIsOpen(false)}>Cloudstream</Link></li>
          <li><Link href="https://pujashanti.web.id/tentang-pujashanti/" onClick={() => setIsOpen(false)}>Tentang Kami</Link></li>
          <li style={{marginTop: '15px'}}>
            <Link href="https://wa.me/6285737689037" className="ps-mobile-wa-btn" onClick={() => setIsOpen(false)}>
              Chat WhatsApp
            </Link>
          </li>
        </ul>
      </div>

      {/* OVERLAY - Memberikan efek klik untuk menutup */}
      <div className={`ps-menu-overlay ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(false)}></div>

      <style jsx>{`
        .ps-custom-header {
            position: fixed; top: 0; left: 0; width: 100%; height: 75px;
            background: #ffffff; z-index: 1000; /* Turunkan sedikit agar dropdown bisa di atasnya */
            display: flex; align-items: center;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            font-family: 'Inter', sans-serif;
        }
        .ps-header-container {
            width: 100%; max-width: 1200px; margin: 0 auto;
            display: flex; justify-content: space-between; align-items: center;
            padding: 0 20px;
        }

        .ps-logo :global(a) { display: flex; align-items: center; text-decoration: none; gap: 12px; }
        .is-round { width: 45px; height: 45px; border-radius: 50%; object-fit: cover; }
        .ps-logo span { font-weight: 800; color: #1a3a5a; text-transform: uppercase; font-size: 1.1rem; }

        /* DESKTOP NAV */
        .ps-desktop-nav ul { display: flex; list-style: none; gap: 25px; margin: 0; padding: 0; }
        .ps-desktop-nav :global(a) { text-decoration: none; color: #333; font-weight: 600; font-size: 15px; }
        .ps-desktop-nav :global(.ps-btn-wa) {
            background-color: #1a3a5a !important; color: #ffffff !important;
            padding: 10px 20px; border-radius: 5px;
        }

        /* HAMBURGER BUTTON - FIX CLICKABLE AREA */
        .ps-hamburger-btn { 
            display: none; 
            cursor: pointer; 
            background: #f4f7f9; 
            border: 1px solid #ddd; 
            padding: 8px 15px; 
            border-radius: 5px;
            align-items: center;
            gap: 8px;
            z-index: 1001;
            pointer-events: auto !important; /* Memastikan bisa diklik */
        }
        .ps-hamburger-icon span { display: block; width: 20px; height: 2px; background: #1a3a5a; margin: 4px 0; }

        /* MOBILE MENU & OVERLAY */
        .ps-dropdown-mobile {
            position: fixed; top: 0; right: -100%; width: 280px; height: 100vh;
            background: #ffffff; z-index: 99999; transition: 0.4s ease-in-out;
            box-shadow: -5px 0 15px rgba(0,0,0,0.1);
            pointer-events: auto;
        }
        .ps-dropdown-mobile.is-open { right: 0; }
        .ps-close-wrapper { padding: 20px; text-align: right; border-bottom: 1px solid #eee; }
        .ps-close-btn { background: none; border: none; font-size: 32px; cursor: pointer; color: #1a3a5a; }

        .ps-dropdown-mobile ul { list-style: none; padding: 20px; margin: 0; }
        .ps-dropdown-mobile :global(a) { text-decoration: none; color: #1a3a5a; font-weight: 700; display: block; padding: 15px 0; }
        
        .ps-mobile-wa-btn { 
            color: #ffffff !important; background-color: #1a3a5a !important; 
            padding: 12px !important; text-align: center; border-radius: 5px; 
        }

        .ps-menu-overlay {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.5); opacity: 0; visibility: hidden; 
            transition: 0.3s; z-index: 9998;
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
