import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

async function fetchGraphQL(query) {
  const res = await fetch('https://pujashanti.web.id/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  });
  const json = await res.json();
  return json.data;
}

export default function Home({ posts }) {
  return (
    <>
      <Head>
        <title>Pujashanti | Pusat Panduan Web-Design SEO & Analytics</title>
        <meta name="description" content="Komitmen kami terhadap kecepatan akses, keamanan data, dan keterbukaan informasi performa situs melalui optimasi Web SEO modern." />
        <link rel="canonical" href="https://pujashanti.web.id/web-design" />
      </Head>

      <Header />

      <main style={{ paddingTop: '80px' }}>
        {/* 1. HERO & STATS SECTION */}
        <div className="ps-seo-wrapper" style={{ maxWidth: '1200px', margin: '10px auto', padding: '20px', fontFamily: "'Inter', sans-serif" }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', marginBottom: '20px', flexWrap: 'wrap' }}>
              <img src="https://pujashanti.web.id/wp-content/uploads/2026/01/IMG_20260123_143516.png" alt="Logo Pujashanti" width="390" height="174" style={{ width: '390px', height: 'auto' }} />
              <h1 style={{ fontSize: '2.2em', margin: 0, color: '#2d3748' }}>Pusat Panduan Web-Design SEO & Analytics</h1>
            </div>
            <p style={{ color: '#4a5568', fontSize: '1.2em', maxWidth: '700px', margin: '0 auto' }}>Komitmen kami terhadap kecepatan akses, keamanan data, dan keterbukaan informasi performa situs.</p>
            <div style={{ width: '60px', height: '4px', background: '#ed8936', margin: '25px auto' }}></div>
          </div>

          <div className="stats-grid">
            <div className="stat-card"><span>⚡</span><h3>Core Web Vitals</h3><div className="status-green">Optimized</div></div>
            <div className="stat-card"><span>🛡️</span><h3>Security</h3><div className="status-blue">Protected</div></div>
            <div className="stat-card"><span>📱</span><h3>Mobile Ready</h3><div className="status-purple">100% Responsive</div></div>
          </div>
        </div>

        {/* 2. SERVICES SECTION (Yang Tadi Terpotong) */}
        <section style={{ padding: '60px 0', backgroundColor: '#f8fafc' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
            <div style={{ textAlign: 'center', marginBottom: '50px' }}>
              <h2 style={{ color: '#003366', fontSize: '2.1rem', fontWeight: '800' }}>Layanan Utama Kami</h2>
              <div style={{ width: '80px', height: '4px', background: '#b38b4d', margin: '10px auto' }}></div>
            </div>
            <div className="ps-service-grid">
              <div className="ps-service-card">
                <div className="ps-icon-box">1</div>
                <h2>Custom Web Design & AMP</h2>
                <p>Desain web full HTML modern dan responsif. Halaman super ringan dengan optimasi AMP.</p>
                <div className="tag">Design Framework</div>
              </div>
              <div className="ps-service-card">
                <div className="ps-icon-box">2</div>
                <h2>Audit SEO & Performa</h2>
                <p>Memastikan skor performa PageSpeed Insight tetap di zona hijau.</p>
                <div className="tag">Google Toolset</div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. CLOUDFLARE SHOWCASE */}
        <section style={{ margin: '40px 0', padding: '0 20px' }}>
          <div className="showcase-container">
            <div className="showcase-content">
              <div className="partner-badge">
                <img src="https://pujashanti.web.id/wp-content/uploads/2026/03/Cloudflare_Logo.webp" alt="Cloudflare" style={{ height: '22px' }} />
                <span>Infrastructure Partner</span>
              </div>
              <h2>Mengapa Situs Web Anda Memerlukan Cloudflare?</h2>
              <p>PUJASHANTI merekomendasikan solusi ini karena perlindungan DDoS hingga Global CDN yang memangkas waktu muat secara drastis.</p>
              <Link href="/hubungi-kami/" className="btn-cta">Optimalkan Situs Saya →</Link>
            </div>
            <div className="showcase-dark">
              <h3 style={{ color: '#ed8936', marginBottom: '25px' }}>Benefit Utama:</h3>
              <div className="benefit-item">⚡ <strong>Advanced Cache Rules</strong></div>
              <div className="benefit-item">🛡️ <strong>Keamanan DDoS</strong></div>
            </div>
          </div>
        </section>

        {/* 4. POST LOOP SECTION */}
        <section style={{ padding: '60px 20px', maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', color: '#003366', fontWeight: '800' }}>Inspirasi & Insights</h2>
          <div className="post-grid">
            {posts?.map((post) => (
              <Link href={`/web-design/${post.slug}`} key={post.id} className="post-card">
                <div className="post-content">
                  <span className="post-date">{new Date(post.date).toLocaleDateString('id-ID')}</span>
                  <h3 dangerouslySetInnerHTML={{ __html: post.title }} />
                  <div className="post-excerpt" dangerouslySetInnerHTML={{ __html: post.excerpt?.substring(0, 100).replace(/<[^>]*>?/gm, '') + '...' }} />
                  <span className="read-more">Baca Selengkapnya →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 5. FAQ SECTION */}
        <section style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
          <details className="faq-item">
            <summary>Bagaimana cara menguji performa halaman?</summary>
            <div className="faq-content">Gunakan PageSpeed Insights Google untuk melihat skor Core Web Vitals Anda.</div>
          </details>
        </section>
      </main>

      <Footer />

      <style jsx>{`
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; }
        .stat-card { background: #fff; padding: 25px; border-radius: 15px; border: 1px solid #e2e8f0; text-align: center; transition: 0.3s; }
        .stat-card:hover { transform: translateY(-5px); border-color: #ed8936; }
        .status-green { color: #38a169; font-weight: bold; }
        
        .ps-service-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 25px; }
        .ps-service-card { background: #fff; padding: 30px; border-radius: 15px; border: 1px solid #e2e8f0; transition: 0.3s; }
        .ps-service-card:hover { border-color: #003366; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
        .ps-icon-box { width: 50px; height: 50px; background: #003366; color: #fff; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-bottom: 20px; }
        
        .showcase-container { display: flex; flex-wrap: wrap; background: #fff; border-radius: 20px; border: 1px solid #e2e8f0; overflow: hidden; }
        .showcase-content { flex: 1.5; padding: 40px; }
        .showcase-dark { flex: 1; background: #2d3748; padding: 40px; color: #fff; }
        
        .post-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 25px; margin-top: 40px; }
        .post-card { background: #fff; border-radius: 15px; border: 1px solid #e2e8f0; text-decoration: none; transition: 0.3s; }
        .post-card:hover { border-color: #ed8936; transform: translateY(-5px); }
        .post-content { padding: 25px; }
        .post-date { color: #ed8936; font-size: 12px; font-weight: bold; }
        
        .btn-cta { display: inline-block; background: #2d3748; color: #fff; padding: 12px 25px; border-radius: 8px; text-decoration: none; margin-top: 20px; transition: 0.3s; }
        .btn-cta:hover { background: #ed8936; }

        .faq-item { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; margin-bottom: 10px; }
        .faq-item summary { padding: 15px; cursor: pointer; font-weight: bold; }
        .faq-content { padding: 15px; background: #fff; border-top: 1px solid #e2e8f0; }
        
        @media (max-width: 768px) { .showcase-container { flex-direction: column; } }
      `}</style>
    </>
  );
}

export async function getStaticProps() {
  try {
    const data = await fetchGraphQL(`
      query GetWebDesignPosts {
        webDesigns(first: 20) {
          nodes {
            id
            title
            slug
            date
            excerpt
          }
        }
      }
    `);
    const allNodes = data?.webDesigns?.nodes || [];
    const shuffled = [...allNodes].sort(() => Math.random() - 0.5).slice(0, 6);
    return { props: { posts: JSON.parse(JSON.stringify(shuffled)) }, revalidate: 60 };
  } catch (e) {
    return { props: { posts: [] }, revalidate: 10 };
  }
}
