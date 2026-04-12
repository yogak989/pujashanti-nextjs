import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function WebDesignSingular() {
  const router = useRouter();
  
  // 1. DATA DUMMY AMAN (Ganti dengan fetch API nanti)
  const post = {
    title: "Strategi Web Design High-Conversion 2026",
    date: "12 April 2026",
    content: `
      <p id="section1">Membangun website di tahun 2026 memerlukan pendekatan <strong>User Experience</strong> yang mendalam.</p>
      <h2 id="section2">Kecepatan adalah Kunci</h2>
      <p>Optimasi gambar dan penggunaan CDN sangat krusial untuk SEO.</p>
    `
  };

  const latestPosts = [
    { id: 1, title: "Tips SEO Lokal Bali", slug: "seo-bali", date: "10 Apr", thumbnail: "" },
    { id: 2, title: "Setting Cloudflare", slug: "cloudflare", date: "08 Apr", thumbnail: "" }
  ];

  // 2. PROTEKSI AWAL: Jika router belum siap, jangan render konten dulu
  if (!router.isReady) {
    return <div style={{ background: '#f7fafc', minHeight: '100vh' }}><Header /></div>;
  }

  return (
    <>
      <Head>
        <title>{post?.title || 'Loading...'} | PujaShanti</title>
      </Head>

      <Header />

      <div className="ps-page-container">
        <main className="ps-main-layout">
          <div className="ps-flex-wrapper">
            
            {/* --- KONTEN UTAMA (70%) --- */}
            <article className="ps-article-content">
              <header>
                <h1 className="ps-post-title">{post?.title}</h1>
                <p className="ps-meta">📅 {post?.date} | Admin PujaShanti</p>
              </header>

              <div 
                className="ps-entry-body"
                dangerouslySetInnerHTML={{ __html: post?.content || '' }} 
              />
            </article>

            {/* --- SIDEBAR (30%) --- */}
            <aside className="ps-sidebar-container">
              
              {/* Widget ToC */}
              <div className="ps-widget-box">
                <h3 className="ps-widget-title">Daftar Isi</h3>
                <nav className="ps-toc-list">
                   <ul>
                     <li><a href="#section1">Strategi 2026</a></li>
                     <li><a href="#section2">Kecepatan</a></li>
                   </ul>
                </nav>
              </div>

              {/* Widget Latest Artikel (Loop Aman) */}
              <div className="ps-widget-box">
                <h3 className="ps-widget-title">Artikel Terbaru</h3>
                <div className="ps-loop-container">
                  {latestPosts?.length > 0 ? (
                    latestPosts.map((item) => (
                      <div key={item.id} className="ps-loop-item">
                        <div className="ps-item-info">
                          <a href={`/web-design/${item.slug}`}>{item.title}</a>
                          <small>{item.date}</small>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>Memuat artikel...</p>
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
          padding-top: 100px; /* Jarak aman header fixed */
          min-height: 100vh;
        }
        .ps-main-layout {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }
        .ps-flex-wrapper {
          display: flex;
          gap: 30px;
          flex-wrap: wrap;
        }
        .ps-article-content {
          flex: 1 1 700px;
          background: #fff;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.05);
        }
        .ps-sidebar-container {
          flex: 1 1 300px;
        }
        .ps-widget-box {
          background: #fff;
          padding: 20px;
          border-radius: 10px;
          margin-bottom: 25px;
          border: 1px solid #e2e8f0;
        }
        .ps-widget-title {
          font-size: 1.1rem;
          color: #1a3a5a;
          margin-bottom: 15px;
          border-left: 4px solid #b8860b;
          padding-left: 10px;
        }
        .ps-post-title { font-size: 2.2rem; margin-bottom: 10px; color: #1a3a5a; }
        .ps-meta { color: #a0aec0; margin-bottom: 25px; border-bottom: 1px solid #eee; padding-bottom: 10px; }
        .ps-entry-body { line-height: 1.8; font-size: 1.1rem; color: #2d3748; }
        
        /* Nav & Loop Style */
        .ps-toc-list ul { list-style: none; padding: 0; }
        .ps-toc-list a { text-decoration: none; color: #4a5568; }
        .ps-loop-item { margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px dashed #eee; }
        .ps-item-info a { display: block; font-weight: 700; color: #2d3748; text-decoration: none; font-size: 0.9rem; }
        .ps-item-info small { color: #cbd5e0; }

        @media (max-width: 991px) {
          .ps-article-content { padding: 25px; }
        }
      `}</style>
    </>
  );
}
