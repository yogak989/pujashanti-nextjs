import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function WebDesignSingular({ post, latestPosts }) {
  // Jika data belum ada (loading)
  if (!post) return null;

  return (
    <>
      <Head>
        <title>{post.title} | PujaShanti WebDev</title>
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
              <div className="ps-toc-container">
                {/* ToC biasanya di-generate otomatis dari heading konten */}
                <nav id="ps-toc">
                   <ul>
                     <li><a href="#section1">Strategi SEO 2026</a></li>
                     <li><a href="#section2">Kecepatan Core Web Vitals</a></li>
                     <li><a href="#section3">Kesimpulan</a></li>
                   </ul>
                </nav>
              </div>
            </div>

            {/* Widget 2: Latest Artikel Loop */}
            <div className="ps-widget">
              <h3 className="ps-widget-title">Artikel Terbaru</h3>
              <div className="ps-latest-posts">
                {latestPosts?.map((item) => (
                  <div key={item.id} className="ps-post-item">
                    <img src={item.thumbnail} alt={item.title} />
                    <div className="ps-post-info">
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

      <Footer />

      <style jsx>{`
        .ps-singular-wrapper {
          background: #fdfdfd;
          padding-top: 110px; /* Jarak aman dari fixed header */
          padding-bottom: 60px;
        }
        .ps-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          gap: 40px;
        }

        /* MAIN CONTENT */
        .ps-main-content {
          flex: 0 0 70%;
          background: #fff;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 2px 15px rgba(0,0,0,0.05);
        }
        .ps-post-title {
          font-size: 2.5rem;
          color: #1a3a5a;
          margin-bottom: 15px;
          line-height: 1.2;
        }
        .ps-post-meta {
          color: #718096;
          font-size: 0.9rem;
          margin-bottom: 30px;
          border-bottom: 1px solid #edf2f7;
          padding-bottom: 15px;
        }
        .ps-entry-content {
          line-height: 1.8;
          font-size: 1.1rem;
          color: #2d3748;
        }

        /* SIDEBAR */
        .ps-sidebar {
          flex: 0 0 30%;
        }
        .ps-widget {
          background: #fff;
          padding: 25px;
          border-radius: 12px;
          margin-bottom: 30px;
          border: 1px solid #f0f0f0;
        }
        .ps-widget-title {
          font-size: 1.2rem;
          color: #1a3a5a;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 2px solid #b8860b; /* Aksen Gold */
          display: inline-block;
        }

        /* TOC STYLE */
        .ps-toc-container ul {
          list-style: none;
          padding: 0;
        }
        .ps-toc-container li { margin-bottom: 10px; }
        .ps-toc-container a {
          text-decoration: none;
          color: #4a5568;
          font-size: 0.95rem;
          transition: 0.2s;
        }
        .ps-toc-container a:hover { color: #b8860b; padding-left: 5px; }

        /* LATEST POSTS LOOP */
        .ps-post-item {
          display: flex;
          gap: 12px;
          margin-bottom: 15px;
          align-items: center;
        }
        .ps-post-item img {
          width: 60px;
          height: 60px;
          border-radius: 8px;
          object-fit: cover;
        }
        .ps-post-info a {
          display: block;
          text-decoration: none;
          color: #2d3748;
          font-weight: 600;
          font-size: 0.9rem;
          line-height: 1.4;
          margin-bottom: 4px;
        }
        .ps-post-info small { color: #a0aec0; }

        /* RESPONSIVE */
        @media (max-width: 991px) {
          .ps-container { flex-direction: column; }
          .ps-main-content, .ps-sidebar { flex: 0 0 100%; width: 100%; }
          .ps-post-title { font-size: 1.8rem; }
        }
      `}</style>
    </>
  );
}
