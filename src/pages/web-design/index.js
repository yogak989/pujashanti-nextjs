import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';

// PENTING: Jika ingin menggunakan getStaticProps, sebaiknya hapus runtime edge jika tidak perlu, 
// atau pastikan fetcher Anda mendukung environment edge.
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
        {/* HERO & STATS SECTION (Tetap sama seperti kode Anda) */}
        <div className="ps-seo-wrapper" style={{ maxWidth: '1200px', margin: '10px auto', padding: '20px', fontFamily: "'Inter', sans-serif", color: '#2d3748' }}>
            {/* ... Isi Hero Om ... */}
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
               <h1 style={{ fontSize: '2.2em', margin: 0, color: '#2d3748' }}>Pusat Panduan Web-Design SEO & Analytics</h1>
               <div style={{ width: '60px', height: '4px', background: '#ed8936', margin: '25px auto', borderRadius: '2px' }}></div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '25px', marginBottom: '60px' }}>
                <div className="stat-card">
                    <div style={{ fontSize: '35px' }}>⚡</div>
                    <h3>Core Web Vitals</h3>
                    <div style={{ color: '#38a169', fontWeight: 'bold' }}>Optimized</div>
                </div>
                <div className="stat-card">
                    <div style={{ fontSize: '35px' }}>🛡️</div>
                    <h3>Security Status</h3>
                    <div style={{ color: '#3182ce', fontWeight: 'bold' }}>Protected</div>
                </div>
                <div className="stat-card">
                    <div style={{ fontSize: '35px' }}>📱</div>
                    <h3>Mobile Ready</h3>
                    <div style={{ color: '#805ad5', fontWeight: 'bold' }}>100% Responsive</div>
                </div>
            </div>
        </div>

        {/* QUERY LOOP SECTION */}
        <section style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ color: '#003366', fontSize: '2.1rem', fontWeight: '800' }}>Inspirasi & Insights</h2>
            <p style={{ color: '#4a5568' }}>Artikel terbaru seputar pengembangan web dan optimasi SEO.</p>
          </div>
          
          <div className="post-grid">
            {/* Pakai 'posts' sesuai dengan props yang dikirim */}
            {posts && posts.length > 0 ? posts.map((post) => (
              <Link href={`/web-design/${post.slug}`} key={post.id} className="post-card">
                <div className="post-content">
                  <span className="post-date">{new Date(post.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  <h3 dangerouslySetInnerHTML={{ __html: post.title?.rendered }} />
                  <div 
                    className="post-excerpt" 
                    dangerouslySetInnerHTML={{ __html: post.excerpt?.rendered ? post.excerpt.rendered.substring(0, 120).replace(/<[^>]*>?/gm, '') + '...' : '' }} 
                  />
                  <span className="read-more">Pelajari Detail →</span>
                </div>
              </Link>
            )) : <p style={{ textAlign: 'center' }}>Belum ada data desain.</p>}
          </div>
        </section>

        {/* CLOUDFLARE & FAQ (Tetap sama) */}
      </main>

      <Footer />

      <style jsx>{`
        .post-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 25px; margin-bottom: 50px; }
        .post-card { background: white; border-radius: 15px; border: 1px solid #e2e8f0; text-decoration: none; transition: all 0.3s ease; display: flex; flex-direction: column; overflow: hidden; }
        .post-card:hover { transform: translateY(-10px); box-shadow: 0 15px 30px rgba(0,0,0,0.12); border-color: #ed8936; }
        .post-content { padding: 25px; }
        .post-date { font-size: 11px; font-weight: bold; color: #ed8936; text-transform: uppercase; }
        .post-content h3 { margin: 15px 0; color: #2d3748; font-size: 1.1rem; line-height: 1.4; }
        .post-excerpt { color: #4a5568; font-size: 14px; line-height: 1.6; margin-bottom: 20px; }
        .read-more { font-weight: bold; color: #003366; font-size: 13px; }

        .stat-card {
          background: #ffffff; padding: 30px; border-radius: 20px; text-align: center;
          box-shadow: 0 10px 25px rgba(0,0,0,0.05); border: 1px solid #e2e8f0;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); cursor: pointer;
        }
        .stat-card:hover { transform: translateY(-12px) scale(1.02); box-shadow: 0 20px 30px rgba(0,0,0,0.1); border-color: #ed8936; }
        
        .benefit-box { background: rgba(255,255,255,0.05); padding: 20px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); transition: all 0.3s ease-in-out; }
        .benefit-box:hover { background: rgba(255,255,255,0.12); transform: translateX(10px); border-left: 4px solid #ed8936; }
      `}</style>
    </>
  );
}

// PERBAIKAN FUNGSI FETCHING
export async function getStaticProps() {
  try {
    // Ambil data dari CPT webDesign
    const res = await fetch('https://pujashanti.web.id/wp-json/wp/v2/webDesign?per_page=20');
    
    if (!res.ok) {
        throw new Error('API WordPress Bermasalah');
    }

    const allPosts = await res.json();

    // Pastikan allPosts adalah array sebelum di-shuffle
    const postsArray = Array.isArray(allPosts) ? allPosts : [];
    
    // Shuffle manual sederhana
    const shuffled = postsArray.sort(() => 0.5 - Math.random());
    const selectedPosts = shuffled.slice(0, 6);

    return {
      props: {
        // Nama prop harus sama dengan yang di destructuring di fungsi Home di atas
        posts: JSON.parse(JSON.stringify(selectedPosts)),
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Gagal ambil data:", error);
    return {
      props: {
        posts: [],
      },
      revalidate: 10,
    };
  }
}
