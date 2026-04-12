import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  // Mencegah scroll saat menu buka
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isOpen]);

  // Style Objek agar kode bersih
  const styles = {
    header: {
      position: 'fixed', top: 0, left: 0, width: '100%', height: '70px',
      backgroundColor: '#ffffff', zIndex: 9999, display: 'flex',
      alignItems: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      fontFamily: 'sans-serif'
    },
    container: {
      width: '100%', maxWidth: '1200px', margin: '0 auto',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '0 20px'
    },
    logo: {
      display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none'
    },
    hamburger: {
      display: 'flex', flexDirection: 'column', gap: '4px', cursor: 'pointer',
      background: '#f0f4f8', border: '1px solid #ddd', padding: '8px', borderRadius: '6px'
    },
    line: { width: '22px', height: '2px', backgroundColor: '#1a3a5a' },
    mobileMenu: {
      position: 'fixed', top: 0, right: isOpen ? '0' : '-100%',
      width: '80%', maxWidth: '300px', height: '100vh', backgroundColor: '#ffffff',
      zIndex: 10001, transition: '0.3s ease-in-out', padding: '20px',
      boxShadow: '-5px 0 15px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column'
    },
    overlay: {
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 10000,
      visibility: isOpen ? 'visible' : 'hidden', opacity: isOpen ? 1 : 0,
      transition: '0.3s'
    },
    navLink: {
      textDecoration: 'none', color: '#1a3a5a', fontWeight: 'bold',
      padding: '15px 0', borderBottom: '1px solid #f0f0f0', display: 'block'
    }
  };

  return (
    <>
      {/* HEADER UTAMA */}
      <header style={styles.header}>
        <div style={styles.container}>
          <Link href="https://pujashanti.web.id/web-design/" style={styles.logo}>
            <img 
              src="https://pujashanti.web.id/wp-content/uploads/2026/04/pujashanti-logo-100x100-1.webp" 
              style={{ width: '40px', height: '40px', borderRadius: '50%' }} 
              alt="Logo"
            />
            <span style={{ fontWeight: 'bold', color: '#1a3a5a' }}>PUJASHANTI</span>
          </Link>

          {/* Tombol Hamburger (Hanya muncul di mobile via CSS media query di bawah) */}
          <div onClick={() => setIsOpen(true)} style={styles.hamburger} className="hamburger-trigger">
            <div style={styles.line}></div>
            <div style={styles.line}></div>
            <div style={styles.line}></div>
          </div>

          {/* Desktop Nav (Hidden di mobile) */}
          <nav className="desktop-only">
            <Link href="https://pujashanti.web.id/iptv-playlist/" style={{marginLeft: '20px', textDecoration: 'none', color: '#333', fontWeight: '600'}}>IPTV</Link>
            <Link href="https://wa.me/6285737689037" style={{marginLeft: '20px', textDecoration: 'none', background: '#1a3a5a', color: '#fff', padding: '8px 15px', borderRadius: '5px'}}>WhatsApp</Link>
          </nav>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      <div style={styles.mobileMenu}>
        <div style={{ textAlign: 'right', marginBottom: '20px' }}>
          <button onClick={() => setIsOpen(false)} style={{ fontSize: '30px', border: 'none', background: 'none', cursor: 'pointer' }}>&times;</button>
        </div>
        <Link href="https://pujashanti.web.id/iptv-playlist/" style={styles.navLink} onClick={() => setIsOpen(false)}>IPTV List</Link>
        <Link href="https://pujashanti.web.id/live/" style={styles.navLink} onClick={() => setIsOpen(false)}>Live Streaming</Link>
        <Link href="https://pujashanti.web.id/tentang-pujashanti/" style={styles.navLink} onClick={() => setIsOpen(false)}>Tentang Kami</Link>
        <Link href="https://wa.me/6285737689037" style={{...styles.navLink, color: '#25D366'}} onClick={() => setIsOpen(false)}>Chat WhatsApp</Link>
      </div>

      {/* OVERLAY */}
      <div style={styles.overlay} onClick={() => setIsOpen(false)}></div>

      {/* Sedikit CSS untuk menyembunyikan elemen sesuai layar */}
      <style jsx>{`
        @media (min-width: 992px) {
          .hamburger-trigger { display: none !important; }
        }
        @media (max-width: 991px) {
          .desktop-only { display: none !important; }
        }
      `}</style>
    </>
  );
}
