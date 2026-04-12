import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isOpen]);

  const styles = {
    header: {
      position: 'fixed', top: 0, left: 0, width: '100%', height: '75px',
      backgroundColor: '#ffffff', zIndex: 9999, display: 'flex',
      alignItems: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      fontFamily: "'Inter', sans-serif"
    },
    container: {
      width: '100%', maxWidth: '1200px', margin: '0 auto',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '0 20px'
    },
    logo: {
      display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none'
    },
    desktopNav: {
      display: 'flex', alignItems: 'center', gap: '25px'
    },
    desktopLink: {
      textDecoration: 'none', color: '#1a3a5a', fontWeight: '600', fontSize: '15px',
      transition: '0.3s'
    },
    btnWa: {
      backgroundColor: '#1a3a5a', color: '#ffffff', padding: '10px 20px',
      borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px'
    },
    hamburger: {
      display: 'none', flexDirection: 'column', gap: '4px', cursor: 'pointer',
      background: '#f4f7f9', border: '1px solid #ddd', padding: '8px', borderRadius: '6px'
    },
    line: { width: '22px', height: '2px', backgroundColor: '#1a3a5a' },
    mobileMenu: {
      position: 'fixed', top: 0, right: isOpen ? '0' : '-100%',
      width: '280px', height: '100vh', backgroundColor: '#ffffff',
      zIndex: 10001, transition: '0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)', 
      padding: '20px', boxShadow: '-5px 0 15px rgba(0,0,0,0.1)', 
      display: 'flex', flexDirection: 'column'
    },
    navLinkMobile: {
      textDecoration: 'none', color: '#1a3a5a', fontWeight: 'bold',
      padding: '15px 0', borderBottom: '1px solid #f0f0f0', display: 'block'
    }
  };

  return (
    <>
      <header style={styles.header}>
        <div style={styles.container}>
          {/* LOGO */}
          <Link href="https://pujashanti.web.id/web-design/" style={styles.logo}>
            <img 
              src="https://pujashanti.web.id/wp-content/uploads/2026/04/pujashanti-logo-100x100-1.webp" 
              style={{ width: '45px', height: '45px', borderRadius: '50%' }} 
              alt="Logo"
            />
            <span style={{ fontWeight: '800', color: '#1a3a5a', letterSpacing: '-0.5px' }}>PUJASHANTI</span>
          </Link>

          {/* DESKTOP NAV - Sekarang Lengkap */}
          <nav className="nav-desktop" style={styles.desktopNav}>
            <Link href="https://pujashanti.web.id/iptv-playlist/" style={styles.desktopLink}>IPTV</Link>
            <Link href="https://pujashanti.web.id/live/" style={styles.desktopLink}>Live TV</Link>
            <Link href="https://pujashanti.web.id/webseo/cloudstream/" style={styles.desktopLink}>Cloudstream</Link>
            <Link href="https://pujashanti.web.id/tentang-pujashanti/" style={styles.desktopLink}>Tentang Kami</Link>
            <Link href="https://wa.me/6285737689037" style={styles.btnWa}>WhatsApp</Link>
          </nav>

          {/* HAMBURGER BTN */}
          <div onClick={() => setIsOpen(true)} style={styles.hamburger} className="nav-mobile-btn">
            <div style={styles.line}></div>
            <div style={styles.line}></div>
            <div style={styles.line}></div>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div style={styles.mobileMenu}>
        <div style={{ textAlign: 'right', marginBottom: '20px' }}>
          <button onClick={() => setIsOpen(false)} style={{ fontSize: '32px', border: 'none', background: 'none', cursor: 'pointer', color: '#1a3a5a' }}>&times;</button>
        </div>
        <Link href="https://pujashanti.web.id/iptv-playlist/" style={styles.navLinkMobile} onClick={() => setIsOpen(false)}>IPTV List</Link>
        <Link href="https://pujashanti.web.id/live/" style={styles.navLinkMobile} onClick={() => setIsOpen(false)}>Live TV</Link>
        <Link href="https://pujashanti.web.id/webseo/cloudstream/" style={styles.navLinkMobile} onClick={() => setIsOpen(false)}>Cloudstream</Link>
        <Link href="https://pujashanti.web.id/tentang-pujashanti/" style={styles.navLinkMobile} onClick={() => setIsOpen(false)}>Tentang Kami</Link>
        <Link href="https://wa.me/6285737689037" style={{...styles.navLinkMobile, color: '#ffffff', backgroundColor: '#1a3a5a', textAlign: 'center', borderRadius: '6px', marginTop: '20px', borderBottom: 'none'}} onClick={() => setIsOpen(false)}>Chat WhatsApp</Link>
      </div>

      {/* OVERLAY */}
      <div 
        style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 10000,
          visibility: isOpen ? 'visible' : 'hidden', opacity: isOpen ? 1 : 0,
          transition: '0.3s'
        }} 
        onClick={() => setIsOpen(false)}
      ></div>

      <style jsx>{`
        @media (max-width: 991px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
