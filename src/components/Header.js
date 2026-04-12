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
            <Link href="https://pujashanti.web.id/webseo/">
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
              <li><Link href="https://pujashanti.web.id/webseo/">SEO & Analytics</Link></li>
            </ul>
          </nav>

          <button className="ps-hamburger-btn" type="button" onClick={toggleMenu}>
            <div className={`ps-hamburger-icon ${isOpen ? 'active' : ''}`}>
              <span></span><span></span><span></span>
            </div>
            <small>MENU</small>
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div id="ps-mobile-menu" className={`ps-dropdown-mobile ${isOpen ? 'show' : ''}`}>
        <div className="ps-close-wrapper">
          <button className="ps-close-btn" onClick={toggleMenu}>&times;</button>
        </div>
        <ul>
          <li><Link href="https://pujashanti.web.id/iptv-playlist/" onClick={toggleMenu}>IPTV</Link></li>
          <li><Link href="https://pujashanti.web.id/live/" onClick={toggleMenu}>Live TV</Link></li>
          <li><Link href="https://pujashanti.web.id/webseo/cloudstream/" onClick={toggleMenu}>Cloudstream</Link></li>
          <li><Link href="https://pujashanti.web.id/tentang-pujashanti/" onClick={toggleMenu}>Tentang Kami</Link></li>
          <li><Link href="https://pujashanti.web.id/webseo/" onClick={toggleMenu}>SEO & Analytics</Link></li>
        </ul>
      </div>

      {/* OVERLAY */}
      <div className={`ps-menu-overlay ${isOpen ? 'show' : ''}`} onClick={toggleMenu}></div>

      <style jsx>{`
        .ps-custom-header {
          background: #ffffff;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          padding: 10px 0;
          position: sticky;
          top: 0;
          z-index: 999;
          font-family: sans-serif;
        }
        .ps-header-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 20px;
        }
        .ps-logo a {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          color: #2d3748;
          font-weight: bold;
        }
        .is-round { border-radius: 50%; width: 40px; height: 40px; }
        
        .ps-desktop-nav ul {
          display: flex;
          list-style: none;
          gap: 20px;
          margin: 0;
        }
        .ps-desktop-nav a {
          text-decoration: none;
          color: #4a5568;
          font-size: 14px;
          font-weight: 500;
        }
        .ps-desktop-nav a:hover { color: #ed8936; }

        .ps-hamburger-btn {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          flex-direction: column;
          align-items: center;
        }
        .ps-hamburger-icon span {
          display: block;
          width: 25px;
          height: 3px;
          background: #2d3748;
          margin: 4px 0;
          transition: 0.3s;
        }

        /* MOBILE MENU LOGIC */
        .ps-dropdown-mobile {
          position: fixed;
          top: 0;
          right: -300px;
          width: 280px;
          height: 100vh;
          background: #ffffff;
          z-index: 1001;
          transition: 0.4s;
          padding: 20px;
          box-shadow: -5px 0 15px rgba(0,0,0,0.1);
        }
        .ps-dropdown-mobile.show { right: 0; }
        .ps-dropdown-mobile ul { list-style: none; padding: 0; margin-top: 40px; }
        .ps-dropdown-mobile li { border-bottom: 1px solid #f0f0f0; }
        .ps-dropdown-mobile a { 
          display: block; 
          padding: 15px 0; 
          text-decoration: none; 
          color: #2d3748; 
          font-weight: bold;
        }
        
        .ps-close-btn {
          font-size: 30px;
          background: none;
          border: none;
          cursor: pointer;
          float: right;
        }

        .ps-menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.5);
          display: none;
          z-index: 1000;
        }
        .ps-menu-overlay.show { display: block; }

        @media (max-width: 992px) {
          .ps-desktop-nav { display: none; }
          .ps-hamburger-btn { display: flex; }
        }
      `}</style>
    </>
  );
}
