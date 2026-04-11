import Link from 'next/link';

export default function Header() {
  return (
    <header style={{ borderBottom: '1px solid #eee', padding: '15px 0' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <strong>PUJASHANTI</strong>
        <nav>
          <Link href="/"><a>Utama</a></Link> | 
          <Link href="/web-design/"><a style={{ marginLeft: '10px' }}>Web Design</a></Link>
        </nav>
      </div>
    </header>
  );
}