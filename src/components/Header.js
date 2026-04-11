import Link from 'next/link';

export default function Header() {
  return (
    <header style={{ 
      padding: '1rem 2rem', 
      borderBottom: '1px solid #eaeaea',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#fff'
    }}>
      <div style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
        <Link href="/" style={{ textDecoration: 'none', color: '#000' }}>
          PujaShanti
        </Link>
      </div>
      <nav style={{ display: 'flex', gap: '20px' }}>
        <Link href="/" style={{ textDecoration: 'none', color: '#333' }}>
          Home
        </Link>
        {/* Diarahkan langsung ke slug 'seo' yang sudah ada di CPT WordPress */}
        <Link href="/web-design/seo" style={{ textDecoration: 'none', color: '#0070f3', fontWeight: 'bold' }}>
          SEO Service
        </Link>
      </nav>
    </header>
  );
}
