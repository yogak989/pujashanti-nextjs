// Tambahkan baris ini di paling atas
export const runtime = 'experimental-edge';

export default function Home() {
  return (
    <div style={{ textAlign: 'center', padding: '100px 20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '2.5rem', color: '#333' }}>Selamat Datang di PujaShanti</h1>
      <p style={{ fontSize: '1.2rem', color: '#666' }}>
        Situs utama sedang dalam pengembangan menggunakan Headless WordPress + Next.js.
      </p>
      <div style={{ marginTop: '30px' }}>
        <a 
          href="/web-design/contoh-postingan" 
          style={{ color: '#0070f3', textDecoration: 'underline' }}
        >
          Lihat Contoh Halaman Web Design
        </a>
      </div>
    </div>
  );
}
