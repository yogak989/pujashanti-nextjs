import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export const runtime = 'experimental-edge';

export default function WebDesignSingular() {
  const router = useRouter();
  
  // Data dummy yang aman (Nanti bisa diganti fetch API)
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

  // Jika router belum siap, jangan tampilkan apa-apa dulu agar tidak white screen
  if (!router.isReady) return null;

  return (
    <>
      <Head>
        <title>{post?.title || 'Loading...'} | PujaShanti</title>
      </Head>

      <Header />

      <div className="ps-page-container">
        <main className="ps-main-layout">
          <div className="ps-content-wrapper">
            
            {/* --- KOLOM KIRI: KONTEN --- */}
            <article className="ps-post-article">
              <header className="ps-header-meta">
                <h1 className="ps-title">{post?.title}</h1>
                <p className="ps-date">📅 {post?.date} | Admin PujaShanti</p>
              </header>

              <div 
                className="ps-body-text"
                dangerouslySetInnerHTML={{ __html: post?.content || '' }} 
              />
            </article>

            {/* --- KOLOM KANAN: SIDEBAR --- */}
            <aside className="ps-sidebar-layout">
              
              {/* Widget Daftar Isi */}
              <div className="ps-sidebar-widget">
                <h3 className="ps-widget-heading">Daftar Isi</h3>
                <nav className="ps-toc-links">
                   <ul>
                     <li><a href="#section1">Strategi 2026</a></li>
                     <li><a href="#section2">Core Web Vitals</a></li>
                     <li><a href="#section3">Kesimpulan</a></li>
                   </ul>
                </nav>
              </div>

              {/* Widget Latest Artikel (Loop Aman) */}
              <div className="ps-sidebar-widget">
                <h3 className="ps-widget-heading">Terbaru di Web Design</h3>
                <div className="ps-posts-list">
                  {latestPosts && latestPosts.length > 0 ? (
                    latestPosts.map((item) => (
                      <div key={item.id} className="ps-item-card">
                        <img src={item.thumbnail} alt={item.title} />
                        <div className="ps-item-text">
                          <a href={`/web-design/${item.slug}`}>{item.title}</a>
                          <span>{item.date}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>Tidak ada artikel terbaru.</p>
                  )}
                </div>
              </div>

            </aside>
          </div>
        </main>
      </div>

      <Footer />

      <style jsx>{`
        .ps-page-container {
          background: #f7fafc;
          padding-top: 100px; /* Padding agar tidak ketutup header fixed */
          min-height: 100vh;
        }
        .ps-main-layout {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }
        .ps-content-wrapper {
          display: flex;
          gap: 30px;
          flex-wrap: wrap;
        }

        /* Kolom Konten 70% */
        .ps-post-article {
          flex: 1 1 700px;
          background: #ffffff;
          padding: 40px;
          border-radius: 15px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.05);
        }
        .ps-title { font-size: 2.4rem; color: #1a3a5a; margin-bottom: 10px; line-height: 1.2; }
        .ps-date { color: #a0aec0; font-size: 0.9rem; margin-bottom: 30px; border-bottom: 1px solid #edf2f7; padding-bottom: 15px; }
        .ps-body-text { line-height: 1.8; font-size: 1.15rem; color: #2d3748; }

        /* Kolom Sidebar 30% */
        .ps-sidebar-layout {
          flex: 1 1 300px;
        }
        .ps-sidebar-widget {
          background: #ffffff;
          padding: 25px;
          border-radius: 12px;
          margin-bottom: 25px;
          border: 1px solid #e2e8f0;
        }
        .ps-widget-heading {
          font-size: 1.2rem;
          color: #1a3a5a;
          margin-bottom: 15px;
          border-left: 5px solid #b8860b;
          padding-left: 12px;
        }

        .ps-toc-links ul { list-style: none; padding: 0; }
        .ps-toc-links li { margin-bottom: 10px; }
        .ps-toc-links a { text-decoration: none; color: #4a5568; transition: 0.3s; }
        .ps-toc-links a:hover { color: #b8860b; padding-left: 5px; }

        .ps-item-card { display: flex; gap: 12px; margin-bottom: 15px; align-items: center; }
        .ps-item-card img { width: 60px; height: 60px; border-radius: 8px; object-fit: cover; }
        .ps-item-text a { display: block; text-decoration: none; color: #2d3748; font-weight: 700; font-size: 0.9rem; line-height: 1.3; }
        .ps-item-text span { color: #a0aec0; font-size: 0.8rem; }

        @media (max-width: 991px) {
          .ps-post-article { padding: 25px; }
        }
      `}</style>
    </>
  );
}
