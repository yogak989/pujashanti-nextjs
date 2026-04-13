import Head from 'next/head';
import Link from 'next/link'; // WAJIB ADA
import Header from '../../components/Header';
import Footer from '../../components/Footer';

// Fungsi Fetch (Diletakkan di luar komponen utama)
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
        {/* HERO SECTION */}
        <div className="ps-seo-wrapper" style={{ maxWidth: '1200px', margin: '10px auto', padding: '20px', fontFamily: "'Inter', sans-serif", color: '#2d3748' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', marginBottom: '20px', flexWrap: 'wrap' }}>
              <img 
                src="https://pujashanti.web.id/wp-content/uploads/2026/01/IMG_20260123_143516.png" 
                alt="Logo Pujashanti web seo" 
                width="390" 
                height="174" 
                style={{ width: '390px', height: 'auto', aspectRatio: '390 / 174' }} 
              />
              <h1 style={{ fontSize: '2.2em', margin: 0, color: '#2d3748' }}>Pusat Panduan Web-Design SEO & Analytics</h1>
            </div>
            <p style={{ color: '#4a5568', fontSize: '1.2em', maxWidth: '700px', margin: '0 auto' }}>
              Komitmen kami terhadap kecepatan akses, keamanan data, dan keterbukaan informasi performa situs.
            </p>
            <div style={{ width: '60px', height: '4px', background: '#ed8936', margin: '25px auto', borderRadius: '2px' }}></div>
          </div>

          {/* STATS GRID */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '25px', marginBottom: '60px' }}>
            <div className="stat-card">
              <div style={{ fontSize: '35px', marginBottom: '10px' }}>⚡</div>
              <h3>Core Web Vitals</h3>
              <div style={{ color: '#38a169', fontWeight: 'bold' }}>Optimized</div>
              <p style={{ fontSize: '13px', color: '#4a5568', marginTop: '10px' }}>LCP, FID, & CLS Standard</p>
            </div>
            <div className="stat-card">
              <div style={{ fontSize: '35px', marginBottom: '10px' }}>🛡️</div>
              <h3>Security Status</h3>
              <div style={{ color: '#3182ce', fontWeight: 'bold' }}>Protected</div>
              <p style={{ fontSize: '13px', color: '#4a5568', marginTop: '10px' }}>SSL & Cloudflare WAF</p>
            </div>
            <div className="stat-card">
              <div style={{ fontSize: '35px', marginBottom: '10px' }}>📱</div>
              <h3>Mobile Ready</h3>
              <div style={{ color: '#805ad5', fontWeight: 'bold' }}>100% Responsive</div>
              <p style={{ fontSize: '13px', color: '#4a5568', marginTop: '10px' }}>Mobile-First Design</p>
            </div>
          </div>

          {/* CLOUDFLARE BANNER */}
          <div style={{ background: '#2d3748', color: 'white', borderRadius: '20px', padding: '40px 20px', marginBottom: '60px' }}>
            <div style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
              <h2 style={{ fontSize: '2.1rem', fontWeight: '800', color: 'white', marginBottom: '15px' }}>Layanan Optimasi & Performa Web</h2>
              <p style={{ lineHeight: '1.8', color: 'white', marginBottom: '30px' }}>Solusi berbasis Cloudflare untuk aset digital yang aman dan instan.</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', textAlign: 'left' }}>
                <div className="benefit-box">
                  <strong style={{ color: '#ed8936', display: 'block', marginBottom: '10px' }}>CDN & Edge Computing</strong>
                  <p style={{ fontSize: '14px', color: '#cbd5e0', margin: 0 }}>Konten didistribusikan dari server terdekat dengan lokasi pengguna.</p>
                </div>
                <div className="benefit-box">
                  <strong style={{ color: '#ed8936', display: 'block', marginBottom: '10px' }}>Object Caching</strong>
                  <p style={{ fontSize: '14px', color: '#cbd5e0', margin: 0 }}>Optimalisasi Cache Rules untuk loading halaman yang hemat data.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION ARTIKEL TERBARU (QUERY LOOP) */}
        <section style={{ padding: '60px 20px', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ color: '#003366', fontSize: '2.1rem', fontWeight: '800' }}>Inspirasi & Insights</h2>
            <div style={{ width: '50px', height: '3px', background: '#ed8936', margin: '15px auto' }}></div>
          </div>
          
          <div className="post-grid">
            {posts && posts.length > 0 ? (
              posts.map((post) => (
                <Link href={`/web-design/${post.slug}`} key={post.id} className="post-card">
                  <div className="post-content">
                    <span className="post-date">
                      {new Date(post.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                    <h3 dangerouslySetInnerHTML={{ __html: post.title }} />
                    <div 
                      className="post-excerpt" 
                      dangerouslySetInnerHTML={{ __html: post.excerpt?.substring(0, 100).replace(/<[^>]*>?/gm, '') + '...' }} 
                    />
                    <span className="read-more">Baca Selengkapnya →</span>
                  </div>
                </Link>
              ))
            ) : (
              <div style={{ textAlign: 'center', gridColumn: '1/-1', padding: '40px', color: '#a0aec0' }}>
                <p>Sedang memuat inspirasi desain...</p>
              </div>
            )}
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="ps-faq-section" style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', color: '#003366', marginBottom: '30px' }}>Pertanyaan Seputar Optimasi Web</h2>
            <div className="faq-container">
                <details className="faq-item">
                    <summary>Bagaimana cara menguji performa halaman?</summary>
                    <div className="faq-content">
                        <p>Buka PageSpeed Insights dari Google, kemudian ketik URL halaman yang ingin diuji.</p>
                    </div>
                </details>
                <details className="faq-item">
                    <summary>Apa faktor paling mempengaruhi pada skor PSI?</summary>
                    <div className="faq-content">
                        <p>Faktor utamanya adalah JavaScript (JS), CSS, dan Font tanpa optimasi delay loading.</p>
                    </div>
                </details>
            </div>
        </section>
      </main>

      <Footer />

      <style jsx>{`
        .post-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 30px; }
        .post-card { 
          background: #ffffff; border-radius: 18px; border: 1px solid #e2e8f0; text-decoration: none; 
          display: flex; flex-direction: column; transition: all 0.4s ease; overflow: hidden; 
        }
        .post-card:hover { transform: translateY(-8px); border-color: #ed8936; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08); }
        .post-content { padding: 30px; }
        .post-date { font-size: 12px; font-weight: 700; color: #ed8936; text-transform: uppercase; }
        .post-content h3 { margin: 15px 0; color: #2d3748; font-size: 1.25rem; line-height: 1.4; }
        .post-excerpt { color: #718096; font-size: 14px; line-height: 1.7; margin-bottom: 25px; }
        .read-more { font-weight: 800; color: #003366; font-size: 13px; }

        .stat-card { 
          background: #ffffff; padding: 30px; border-radius: 20px; text-align: center; 
          border: 1px solid #e2e8f0; transition: all 0.4s ease; 
        }
        .stat-card:hover { transform: translateY(-10px); border-color: #ed8936; box-shadow: 0 20px 40px rgba(0,0,0,0.1); }
        
        .benefit-box { 
          background: rgba(255,255,255,0.05); padding: 20px; border-radius: 12px; 
          border: 1px solid rgba(255,255,255,0.1); transition: all 0.3s ease; 
        }
        .benefit-box:hover { background: rgba(255,255,255,0.1); border-color: rgba(237, 137, 54, 0.5); }

        .faq-item { margin-bottom: 10px; border: 1px solid #e2e8f0; border-radius: 8px; background: #f8fafc; }
        .faq-item summary { padding: 15px; cursor: pointer; font-weight: 600; outline: none; }
        .faq-content { padding: 15px; background: white; border-top: 1px solid #e2e8f0; }

        @media (max-width: 768px) {
          .post-grid { grid-template-columns: 1fr; }
        }
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

    return {
      props: {
        posts: JSON.parse(JSON.stringify(shuffled)),
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("GraphQL Error:", error);
    return { props: { posts: [] }, revalidate: 10 };
  }
}
