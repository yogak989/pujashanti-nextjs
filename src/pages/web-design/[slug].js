import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export const runtime = 'experimental-edge';

export default function WebDesignSingular() {
  const router = useRouter();
  const { slug } = router.query;

  // DATA DUMMY (Ganti dengan fetch data dari WP-API Om nanti)
  // Ini mencegah White Screen karena data langsung tersedia
  const post = {
    title: "Strategi Web Design High-Conversion 2026",
    date: "12 April 2026",
    content: `
      <p id="section1">Membangun website di tahun 2026 bukan lagi sekadar estetika. Kecepatan akses melalui <strong>Edge Computing</strong> adalah kunci utama.</p>
      <h2 id="section2">Optimasi Core Web Vitals</h2>
      <p>LCP dan CLS harus tetap berada di zona hijau. Dengan optimasi gambar otomatis dan Cloudflare, hal ini sangat mungkin dicapai.</p>
      <h2 id="section3">Kesimpulan</h2>
      <p>Gunakan teknologi Next.js untuk hasil yang maksimal dan SEO yang lebih baik.</p>
    `
  };

  const latestPosts = [
    { id: 1, title: "Tips SEO Lokal UMKM Bali", slug: "seo-umkm-bali", date: "10 April", thumbnail: "https://pujashanti.web.id/wp-content/uploads/2026/04/images-1.webp" },
    { id: 2, title: "Cara Setting Cloudflare Pro", slug: "cloudflare-pro", date: "08 April", thumbnail: "https://pujashanti.web.id/wp-content/uploads/2026/03/Cloudflare_Logo.webp" }
  ];

  // LOGIKA PENCEGAH WHITE SCREEN
  // Jika router belum siap (loading slug), tampilkan loading sebentar
  if (!router.isReady) return <div style={{textAlign:'center', padding:'100px'}}>Loading...</div>;

  return (
    <>
      <Head>
        <title>{post.title} | PujaShanti</title>
        <meta name="description" content={post.title} />
      </Head>

      <Header />

      <main className="ps-singular-wrapper">
        <div className="ps-container">
          
          {/* KOLOM KIRI: KONTEN UTAMA (70%) */}
          <article className="ps-main-content">
            <header className="ps-entry-header">
              <h1 className="ps-post-title">{post.title}</h1>
              <div className="ps-post-meta">
                <span>📅 {post.date}</span> | <span>👤 Admin PujaShanti</span>
              </div>
            </header>

            <div 
              className="ps-entry-content"
              dangerouslySetInnerHTML={{ __html: post.content }} 
            />
          </article>

          {/* KOLOM KANAN: SIDEBAR (30%) */}
          <aside className="ps-sidebar">
            
            {/* Widget 1: Table of Contents */}
            <div className="ps-widget">
              <h3 className="ps-widget-title">Daftar Isi</h3>
              <nav className="ps-toc-nav">
                 <ul>
                   <li><a href="#section1">Strategi 2026</a></li>
                   <li><a href="#section2">Core Web Vitals</a></li>
                   <li><a href="#section3">Kesimpulan</a></li>
                 </ul>
              </nav>
            </div>

            {/* Widget 2: Latest Artikel Loop */}
            <div className="ps-widget">
              <h3 className="ps-widget-title">Artikel Terbaru</h3>
              <div className="ps-latest-loop">
                {latestPosts.map((item) => (
                  <div key={item.id} className="ps-loop-item">
                    <img src={item.thumbnail} alt={item.title} />
                    <div className="ps-loop-info">
                      <a href={`/web-design/${item.slug}`}>{item.title}</a>
                      <small>{item.date}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </aside>
        </div>
      </main>

      {/* FOOTER HOOK YANG KITA BUAT SEBELUMNYA */}
      <Footer />

      <style jsx>{`
        .ps-singular-wrapper {
          background: #f4f7f9;
          padding-top: 110px; /* Jarak agar tidak tertutup header fixed */
          padding-bottom: 60px;
          min-height: 100vh;
        }
        .ps-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          gap: 30px;
        }

        /* --- CONTENT COLUMN --- */
        .ps-main-content {
          flex: 7;
          background: #ffffff;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 2px 15px rgba(0,0,0,0.05);
        }
        .ps-post-title { font-size: 2.2rem; color: #1a3a5a; line-height: 1.2; margin-bottom: 10px; }
        .ps-post-meta { font-size: 0.9rem; color: #718096; margin-bottom: 30px; border-bottom: 1px solid #eee; padding-bottom: 15px; }
        .ps-entry-content { line-height: 1.8; color: #2d3748; font-size: 1.1rem; }

        /* --- SIDEBAR COLUMN --- */
        .ps-sidebar { flex: 3; }
        .ps-widget { 
          background: #fff; 
          padding: 20px; 
          border-radius: 12px; 
          margin-bottom: 25px; 
          box-shadow: 0 2px 10px rgba(0,0,0,0.03);
          border: 1px solid #eef2f7;
        }
        .ps-widget-title { 
          font-size: 1.1rem; 
          color: #1a3a5a; 
          margin-bottom: 15px; 
          border-left: 4px solid #b8860b; 
          padding-left: 10px;
        }

        /* TOC STYLE */
        .ps-toc-nav ul { list-style: none; padding: 0; }
        .ps-toc-nav li { margin-bottom: 8px; }
        .ps-toc-nav a { text-decoration: none; color: #4a5568; font-size: 0.95rem; transition: 0.3s; }
        .ps-toc-nav a:hover { color: #b8860b; padding-left: 5px; }

        /* LOOP STYLE */
        .ps-loop-item { display: flex; gap: 12px; margin-bottom: 15px; align-items: center; }
        .ps-loop-item img { width: 55px; height: 55px; border-radius: 6px; object-fit: cover; background: #eee; }
        .ps-loop-info a { display: block; text-decoration: none; color: #2d3748; font-weight: 700; font-size: 0.85rem; line-height: 1.3; }
        .ps-loop-info small { color: #a0aec0; font-size: 0.75rem; }

        @media (max-width: 991px) {
          .ps-container { flex-direction: column; }
          .ps-main-content { padding: 25px; }
        }
      `}</style>
    </>
  );
}
