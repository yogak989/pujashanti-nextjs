import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

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

          <button className="ps-hamburger-btn" type="button" onClick={toggleMenu}>
            <div className="ps-hamburger-icon">
              <span></span><span></span><span></span>
            </div>
            <small>MENU</small>
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div id="ps-mobile-menu" className={`ps-dropdown-mobile ${isOpen ? 'is-open' : ''}`}>
        <div className="ps-close-wrapper">
          <button className="ps-close-btn" onClick={toggleMenu}>&times;</button>
        </div>
        <ul>
          <li><Link href="https://pujashanti.web.id/iptv-playlist/" onClick={toggleMenu}>IPTV</Link></li>
          <li><Link href="https://pujashanti.web.id/live/" onClick={toggleMenu}>Live TV</Link></li>
          <li><Link href="https://pujashanti.web.id/webseo/cloudstream/" onClick={toggleMenu}>Cloudstream</Link></li>
          <li><Link href="https://pujashanti.web.id/tentang-pujashanti/" onClick={toggleMenu}>Tentang Kami</Link></li>
          <li style={{marginTop: '15px'}}>
            <Link href="https://wa.me/6285737689037" className="ps-mobile-wa-btn" onClick={toggleMenu}>
              Chat WhatsApp
            </Link>
          </li>
        </ul>
      </div>

      {/* OVERLAY */}
      <div className={`ps-menu-overlay ${isOpen ? 'active' : ''}`} onClick={toggleMenu}></div>

      <style jsx>{`
        /* --- CSS DASAR & HEADER --- */
        .ps-custom-header {
            position: fixed; top: 0; left: 0; width: 100%; height: 75px;
            background: #ffffff; z-index: 9999;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            display: flex; align-items: center;
            font-family: 'Inter', sans-serif;
        }
        .ps-header-container {
            width: 100%; max-width: 1200px; margin: 0 auto;
            display: flex; justify-content: space-between; align-items: center;
            padding: 0 20px;
        }

        /* --- LOGO ALIGNMENT --- */
        .ps-logo :global(a) {
            display: flex !important;
            align-items: center !important;
            text-decoration: none !important;
            gap: 12px !important;
        }
        .is-round {
            width: 45px !important;
            height: 45px !important;
            border-radius: 50% !important;
            object-fit: cover !important;
        }
        .ps-logo span { 
            font-weight: 800 !important; 
            color: #1a3a5a !important; 
            text-transform: uppercase !important; 
            font-size: 1.1rem !important;
            letter-spacing: -0.5px;
        }

        /* --- DESKTOP NAV & HOVER --- */
        .ps-desktop-nav ul { display: flex; align-items: center; list-style: none; gap: 25px; margin: 0; }
        .ps-desktop-nav :global(a) { 
            text-decoration: none; 
            color: #333; 
            font-weight: 600; 
            font-size: 15px;
            position: relative;
            transition: color 0.3s ease;
        }
        .ps-desktop-nav :global(li a::after) {
            content: '';
            position: absolute;
            width: 0;
            height: 2px;
            bottom: -5px;
            left: 50%;
            background-color: #b8860b;
            transition: all 0.3s ease;
            transform: translateX(-50%);
        }
        .ps-desktop-nav :global(li a:hover) { color: #b8860b !important; }
        .ps-desktop-nav :global(li a:hover::after) { width: 100%; }

        /* --- BUTTON WA --- */
        .ps-desktop-nav :global(.ps-btn-wa) {
            background-color: #1a3a5a !important;
            color: #ffffff !important;
            padding: 10px 20px !important;
            border-radius: 5px !important;
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
            box-shadow: 0 4px 6px rgba(26, 58, 90, 0.2);
        }
        .ps-desktop-nav :global(.ps-btn-wa:hover) {
            background-color: #b8860b !important;
            transform: translateY(-3px) scale(1.05);
            box-shadow: 0 8px 15px rgba(184, 134, 11, 0.4);
        }

        /* --- HAMBURGER --- */
        .ps-hamburger-btn { 
            display: none; 
            cursor: pointer; 
            background: #f4f7f9; 
            border: 1px solid #ddd; 
            padding: 5px 12px; 
            border-radius: 5px;
            align-items: center;
            gap: 8px;
            transition: 0.3s;
        }
        .ps-hamburger-btn:hover { background-color: #e2e8f0 !important; }
        .ps-hamburger-icon span { display: block; width: 20px; height: 2px; background: #1a3a5a; margin: 4px 0; transition: 0.3s; }
        .ps-hamburger-btn:hover .ps-hamburger-icon span { background-color: #b8860b !important; }

        /* --- MOBILE MENU --- */
        .ps-dropdown-mobile {
            position: fixed; top: 0; right: -100%; width: 280px; height: 100vh;
            background: #ffffff; z-index: 10000; transition: 0.4s ease-in-out;
            box-shadow: -5px 0 15px rgba(0,0,0,0.1);
        }
        .ps-dropdown-mobile.is-open { right: 0; }
        .ps-close-wrapper { padding: 20px; text-align: right; border-bottom: 1px solid #eee; }
        .ps-close-btn {
            background: none; border: none; font-size: 28px; font-weight: 700;
            color: #1a3a5a; cursor: pointer; transition: 0.3s;
        }
        .ps-close-btn:hover { color: #ff0000 !important; transform: rotate(90deg); }

        .ps-dropdown-mobile ul { list-style: none; padding: 20px; margin: 0; }
        .ps-dropdown-mobile li { padding: 5px 0; }
        .ps-dropdown-mobile :global(a) { 
            text-decoration: none; color: #1a3a5a; font-weight: 700; display: block; 
            padding: 10px 0; transition: 0.3s;
        }
        .ps-dropdown-mobile :global(a:hover) { padding-left: 10px; color: #b8860b !important; }
        
        .ps-mobile-wa-btn { 
            color: #ffffff !important; 
            background-color: #1a3a5a !important; 
            padding: 12px !important; 
            text-align: center; 
            border-radius: 5px; 
        }

        .ps-menu-overlay {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.5); opacity: 0; visibility: hidden; transition: 0.3s; z-index: 9998;
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
