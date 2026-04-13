import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';

export const runtime = 'experimental-edge';

export default function Home({ posts }) {
  return (
    <>
      <Head>
        <title>Pujashanti | Pusat Panduan Web-Design SEO & Analytics</title>
        <meta name="description" content="Komitmen kami terhadap kecepatan akses, keamanan data, dan keterbukaan informasi performa situs melalui optimasi Web SEO modern." />
        <link rel="canonical" href="https://pujashanti.web.id/web-design" />
        <meta name="author" content="Pujashanti" />
        <meta name="editor" content="Pujashanti" />
        <meta name="language" content="id" />
        <meta name="geo.region" content="ID" />
        <meta name="geo.placename" content="Indonesia" />
        <meta httpEquiv="content-language" content="id" />
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
              <h3 style={{ margin: '10px 0', color: '#4a5568' }}>Core Web Vitals</h3>
              <div style={{ color: '#38a169', fontWeight: 'bold', fontSize: '1.2em' }}>Optimized</div>
              <p style={{ fontSize: '13px', color: '#4a5568', marginTop: '10px' }}>LCP, FID, & CLS Standard</p>
            </div>
            <div className="stat-card">
              <div style={{ fontSize: '35px', marginBottom: '10px' }}>🛡️</div>
              <h3 style={{ margin: '10px 0', color: '#4a5568' }}>Security Status</h3>
              <div style={{ color: '#3182ce', fontWeight: 'bold', fontSize: '1.2em' }}>Protected</div>
              <p style={{ fontSize: '13px', color: '#4a5568', marginTop: '10px' }}>SSL & Cloudflare WAF</p>
            </div>
            <div className="stat-card" style={{ border: '1px solid #4a5568' }}>
              <div style={{ fontSize: '35px', marginBottom: '10px' }}>📱</div>
              <h3 style={{ margin: '10px 0', color: '#4a5568' }}>Mobile Ready</h3>
              <div style={{ color: '#805ad5', fontWeight: 'bold', fontSize: '1.2em' }}>100% Responsive</div>
              <p style={{ fontSize: '13px', color: '#4a5568', marginTop: '10px' }}>Mobile-First Design</p>
            </div>
          </div>

          {/* CLOUDFLARE BANNER */}
          <div style={{ background: '#2d3748', color: 'white', borderRadius: '20px', padding: '40px 20px', marginBottom: '60px' }}>
            <div style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
              <h2 style={{ fontSize: '2.1rem', fontWeight: '800', color: 'white', marginBottom: '15px' }}>Layanan Optimasi & Performa Web</h2>
              <p style={{ lineHeight: '1.8', color: 'white', marginBottom: '30px' }}>Kami menyediakan solusi Optimasi Website berbasis Cloudflare untuk memastikan aset digital Anda aman dan instan.</p>
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

        {/* NEW: QUERY LOOP SECTION */}
        <section style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ color: '#003366', fontSize: '2.1rem', fontWeight: '800' }}>Inspirasi & Insights</h2>
            <p style={{ color: '#4a5568' }}>Artikel terbaru seputar pengembangan web dan optimasi SEO.</p>
          </div>
          
          <div className="post-grid">
            {posts && posts.map((post) => (
              <Link href={`/web-design/${post.slug}`} key={post.id} className="post-card">
                <div className="post-content">
                  <span className="post-date">{new Date(post.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  <h3 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                  <div 
                    className="post-excerpt" 
                    dangerouslySetInnerHTML={{ __html: post.excerpt.rendered.substring(0, 120).replace(/<[^>]*>?/gm, '') + '...' }} 
                  />
                  <span className="read-more">Pelajari Detail →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CLOUDFLARE SHOWCASE */}
        <section style={{ margin: '40px 0', padding: '0 10px' }}>
          <div className="showcase-container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="showcase-content">
              <div className="partner-badge">
                <img src="https://pujashanti.web.id/wp-content/uploads/2026/03/Cloudflare_Logo.webp" alt="Cloudflare" style={{ height: '22px', width: 'auto' }} />
                <span>Infrastructure Partner</span>
              </div>
              <h2>Mengapa Situs Web Anda Memerlukan Cloudflare?</h2>
              <p>Pernahkah Anda bertanya-tanya bagaimana situs bisa tetap stabil dan instan di seluruh dunia? Jawabannya ada pada integrasi <strong>Cloudflare</strong>.</p>
              <p><strong>PUJASHANTI</strong> merekomendasikan solusi ini karena memberikan perlindungan DDoS hingga Global CDN yang memangkas waktu muat secara drastis.</p>
              <a href="/hubungi-kami/" className="btn-cta">Optimalkan Situs Saya →</a>
            </div>
            <div className="showcase-dark">
              <h3 style={{ color: '#ed8936', marginBottom: '30px', borderLeft: '4px solid #ed8936', paddingLeft: '15px' }}>Benefit Utama:</h3>
              <div style={{ display: 'grid', gap: '25px' }}>
                <div className="benefit-item">
                  <span className="icon">⚡</span>
                  <div>
                    <strong style={{ color: 'white' }}>Advanced Cache Rules</strong>
                    <p style={{ color: '#cbd5e0', fontSize: '13.5px' }}>Menjaga server tetap stabil meski trafik melonjak tinggi.</p>
                  </div>
                </div>
                <div className="benefit-item">
                  <span className="icon">🛡️</span>
                  <div>
                    <strong style={{ color: 'white' }}>Keamanan DDoS</strong>
                    <p style={{ color: '#cbd5e0', fontSize: '13.5px' }}>Menghalau bot berbahaya sebelum menyentuh server Anda.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="ps-faq-section" style={{ maxWidth: '1200px', margin: '60px auto', padding: '0 20px' }}>
            <h2 style={{ textAlign: 'center', color: '#003366', marginBottom: '30px' }}>Pertanyaan Seputar Optimasi Web</h2>
            <div className="faq-container">
                <details className="faq-item">
                    <summary>Bagaimana cara menguji performa halaman?</summary>
                    <div className="faq-content">
                        <p>Buka PageSpeed Insights dari Google, kemudian ketik URL halaman yang ingin diuji. Contoh skor: <a href="https://pagespeed.web.dev/analysis/https-pujashanti-web-id-webseo/q8x9qjg2e5?form_factor=mobile" target="_blank">Cek Skor PSI</a>.</p>
                    </div>
                </details>
                <details className="faq-item">
                    <summary>Apa faktor paling mempengaruhi pada skor PSI?</summary>
                    <div className="faq-content">
                        <p>Faktor utamanya adalah JavaScript (JS), CSS, dan Font dari sumber eksternal maupun dari plugin berat tanpa optimasi delay loading.</p>
                    </div>
                </details>
            </div>
        </section>

      </main>

      <Footer />

      <style jsx>{`
        .post-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 25px;
          margin-bottom: 50px;
        }
        .post-card {
          background: white;
          border-radius: 15px;
          border: 1px solid #e2e8f0;
          text-decoration: none;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .post-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.1);
          border-color: #ed8936;
        }
        .post-content { padding: 25px; }
        .post-date { font-size: 11px; font-weight: bold; color: #ed8936; text-transform: uppercase; }
        .post-content h3 { margin: 15px 0; color: #2d3748; font-size: 1.1rem; line-height: 1.4; }
        .post-excerpt { color: #4a5568; font-size: 14px; line-height: 1.6; margin-bottom: 20px; }
        .read-more { font-weight: bold; color: #003366; font-size: 13px; }

        .stat-card {
          background: #ffffff; padding: 30px; border-radius: 20px; text-align: center;
          box-shadow: 0 10px 25px rgba(0,0,0,0.05); border: 1px solid #e2e8f0;
        }
        .benefit-box {
          background: rgba(255,255,255,0.05); padding: 20px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);
        }
        .showcase-container {
          background: #ffffff; border-radius: 24px; border: 1px solid #e2e8f0; overflow: hidden;
          box-shadow: 0 20px 40px rgba(0,0,0,0.05); display: flex; flex-wrap: wrap;
        }
        .showcase-content {
          flex: 1.2; min-width: 320px; padding: 40px 30px; background: linear-gradient(to bottom right, #ffffff, #f7fafc);
        }
        .showcase-dark {
          flex: 1; min-width: 320px; background: #2d3748; padding: 40px;
        }
        .partner-badge { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
        .partner-badge span { background: #ebf8ff; color: #2b6cb0; padding: 4px 12px; border-radius: 20px; font-size: 10px; font-weight: bold; }
        .btn-cta {
          display: inline-block; background: #2d3748; color: white; padding: 14px 30px; border-radius: 10px; text-decoration: none; font-weight: bold;
        }
        .benefit-item { display: flex; align-items: flex-start; gap: 15px; }
        .benefit-item .icon { background: rgba(237, 137, 54, 0.15); color: #ed8936; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 8px; }
        .faq-item { margin-bottom: 10px; border: 1px solid #e2e8f0; border-radius: 8px; background: #f8fafc; }
        .faq-item summary { padding: 15px; cursor: pointer; font-weight: 600; color: #1e293b; outline: none; }
        .faq-content { padding: 15px; background: white; color: #475569; border-top: 1px solid #e2e8f0; }
       
  /* STAT CARD HOVER */
  .stat-card {
    background: #ffffff; 
    padding: 30px; 
    border-radius: 20px; 
    text-align: center;
    box-shadow: 0 10px 25px rgba(0,0,0,0.05); 
    border: 1px solid #e2e8f0;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); /* Efek membal */
    cursor: pointer;
  }

  .stat-card:hover {
    transform: translateY(-12px) scale(1.02);
    box-shadow: 0 20px 30px rgba(0,0,0,0.1);
    border-color: #ed8936;
  }

  /* CLOUDFLARE BENEFIT BOX HOVER */
  .benefit-box {
    background: rgba(255,255,255,0.05); 
    padding: 20px; 
    border-radius: 12px; 
    border: 1px solid rgba(255,255,255,0.1);
    transition: all 0.3s ease-in-out;
  }

  .benefit-box:hover {
    background: rgba(255,255,255,0.12);
    transform: translateX(10px); /* Efek geser sedikit ke kanan */
    border-left: 4px solid #ed8936; /* Tambah aksen garis orange */
    box-shadow: -5px 5px 15px rgba(0,0,0,0.3);
  }

  /* POST CARD HOVER (QUERY LOOP) */
  .post-card {
    background: white;
    border-radius: 15px;
    border: 1px solid #e2e8f0;
    text-decoration: none;
    transition: all 0.3s ease;
    overflow: hidden;
  }

  .post-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0,0,0,0.12);
    border-color: #ed8936;
  }

  /* SISA CSS LAINNYA TETAP SAMA... */
        @media (max-width: 768px) {
          .showcase-container { flex-direction: column; }
        }
      `}</style>
    </>
  );
}

// FUNGSI AMBIL DATA WORDPRESS
export async function getStaticProps({ params }) {
  try {
    // 1. Ambil data post tunggal
    const post = await getWebDesignPost(params.slug);
    
    // 2. Ambil data untuk loop (Pastikan fungsi ini aman)
    const latestPostsData = await getWebDesignLandingData();

    // Jika post tidak ditemukan di WP
    if (!post) {
      return { notFound: true };
    }

    // 3. Normalisasi data latestPosts (Mencegah error .map)
    // Kita ambil nodes-nya saja jika strukturnya GraphQL
    const allNodes = latestPostsData?.webDesigns?.nodes || (Array.isArray(latestPostsData) ? latestPostsData : []);
    
    // 4. Lakukan Shuffle hanya jika ada data
    const shuffledNodes = allNodes.length > 0 ? shuffleArray(allNodes) : [];

    return {
      props: {
        post,
        latestPosts: JSON.parse(JSON.stringify(shuffledNodes)), // Pastikan data bersih untuk serialisasi
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error fetching data for slug:", params.slug, error);
    // Jika error, jangan gagalkan build, tampilkan saja halaman tanpa latestPosts
    return {
      props: {
        post: null,
        latestPosts: [],
      },
      revalidate: 10,
    };
  }
}
