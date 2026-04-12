import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function WebDesignSingular() {
  const router = useRouter();
  const { slug } = router.query;

  // Data Dummy agar tidak kosong saat build
  const post = {
    title: "Project: " + (slug || "Web Design"),
    date: "12 April 2026",
    content: "<p>Sedang memuat konten dari " + slug + "...</p>"
  };

  const latestPosts = [
    { id: 1, title: "Optimasi SEO Next.js", slug: "seo-nextjs", date: "10 Apr" },
    { id: 2, title: "Desain UI Modern", slug: "ui-modern", date: "08 Apr" }
  ];

  return (
    <>
      <Head>
        <Head>
  <title>{post.seo_data.title}</title>
  <meta name="description" content={post.seo_data.description} />
  <link rel="canonical" href={post.seo_data.canonical} />
  <meta property="og:image" content={post.seo_data.og_image} />
</Head>
      </Head>

      <Header />

      {/* Gunakan ID unik agar tidak bentrok dengan CSS global */}
      <div id="ps-singular-page" className="ps-page-wrapper">
        <div className="ps-container">
          
          {/* KONTEN UTAMA */}
          <main className="ps-main-content">
            <article>
              <h1 className="ps-entry-title">{post.title}</h1>
              <div className="ps-entry-meta">📅 {post.date} | Admin</div>
              <hr />
              <div 
                className="ps-entry-body" 
                dangerouslySetInnerHTML={{ __html: post.content }} 
              />
            </article>
          </main>

          {/* SIDEBAR */}
          <aside className="ps-sidebar">
            <div className="ps-widget">
              <h3 className="ps-widget-title">Daftar Isi</h3>
              <ul className="ps-toc-list">
                <li><a href="#">Pendahuluan</a></li>
                <li><a href="#">Analisa Desain</a></li>
              </ul>
            </div>

            <div className="ps-widget">
              <h3 className="ps-widget-title">Terbaru</h3>
              <div className="ps-latest-list">
                {latestPosts.map(p => (
                  <div key={p.id} className="ps-latest-item">
                    <a href={`/web-design/${p.slug}`}>{p.title}</a>
                  </div>
                ))}
              </div>
            </div>
          </aside>

        </div>
      </div>

      <Footer />

      <style jsx>{`
        .ps-page-wrapper {
          background: #f4f7f9;
          padding-top: 100px;
          min-height: 80vh;
        }
        .ps-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          gap: 30px;
          padding: 0 20px;
        }
        .ps-main-content {
          flex: 0 0 70%;
          background: #fff;
          padding: 30px;
          border-radius: 8px;
        }
        .ps-sidebar {
          flex: 0 0 30%;
        }
        .ps-widget {
          background: #fff;
          padding: 20px;
          margin-bottom: 20px;
          border-radius: 8px;
        }
        .ps-widget-title {
          font-size: 1.1rem;
          margin-bottom: 15px;
          border-bottom: 2px solid #b8860b;
          display: inline-block;
        }
        .ps-entry-title { font-size: 2rem; color: #1a3a5a; }
        .ps-entry-meta { font-size: 0.8rem; color: #999; margin: 10px 0; }
        
        @media (max-width: 991px) {
          .ps-container { flex-direction: column; }
          .ps-main-content, .ps-sidebar { flex: 0 0 100%; }
        }
      `}</style>
    </>
  );
}
