import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link'; // Tambahkan Link jika belum ada

export const runtime = 'experimental-edge';

async function fetchGraphQL(query) {
  const res = await fetch('https://pujashanti.web.id/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  });
  const json = await res.json();
  return json.data;
}

// PERBAIKAN: Tambahkan { posts } di dalam kurung fungsi Home
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
                alt="Logo Pujashanti" 
                width="390" 
                height="174" 
                style={{ width: '390px', height: 'auto' }} 
              />
              <h1 style={{ fontSize: '2.2em', margin: 0, color: '#2d3748' }}>Pusat Panduan Web-Design SEO & Analytics</h1>
            </div>
            <p style={{ color: '#4a5568', fontSize: '1.2em', maxWidth: '700px', margin: '0 auto' }}>
              Komitmen kami terhadap kecepatan akses dan keamanan data.
            </p>
          </div>

          {/* STATS GRID */}
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
          </div>
          
          <div className="post-grid">
            {posts && posts.length > 0 ? posts.map((post) => (
              <Link href={`/web-design/${post.slug}`} key={post.id} className="post-card">
                <div className="post-content">
                  <span className="post-date">{new Date(post.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  <h3 dangerouslySetInnerHTML={{ __html: post.title }} />
                  <div 
                    className="post-excerpt" 
                    dangerouslySetInnerHTML={{ __html: post.excerpt?.substring(0, 100).replace(/<[^>]*>?/gm, '') + '...' }} 
                  />
                  <span className="read-more">Pelajari Detail →</span>
                </div>
              </Link>
            )) : <p style={{ textAlign: 'center' }}>Belum ada artikel.</p>}
          </div>
        </section>

        {/* CLOUDFLARE SHOWCASE & FAQ (Gunakan CSS yang sudah Anda buat di bawah) */}
      </main>

      <Footer />

      <style jsx>{`
        .post-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 25px; margin-bottom: 50px; }
        .post-card { background: white; border-radius: 15px; border: 1px solid #e2e8f0; text-decoration: none; transition: all 0.3s ease; overflow: hidden; display: flex; flex-direction: column; }
        .post-card:hover { transform: translateY(-8px); box-shadow: 0 15px 30px rgba(0,0,0,0.1); border-color: #ed8936; }
        .post-content { padding: 25px; }
        .post-date { font-size: 11px; font-weight: bold; color: #ed8936; }
        .stat-card { background: #ffffff; padding: 30px; border-radius: 20px; text-align: center; border: 1px solid #e2e8f0; transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); cursor: pointer; }
        .stat-card:hover { transform: translateY(-12px) scale(1.02); border-color: #ed8936; box-shadow: 0 20px 30px rgba(0,0,0,0.1); }
        .benefit-box { background: rgba(255,255,255,0.05); padding: 20px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); transition: all 0.3s ease; }
        .benefit-box:hover { background: rgba(255,255,255,0.12); transform: translateX(10px); border-left: 4px solid #ed8936; }
        .btn-cta { display: inline-block; background: #2d3748; color: white; padding: 14px 30px; border-radius: 10px; text-decoration: none; font-weight: bold; }
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
    const shuffled = allNodes.sort(() => Math.random() - 0.5).slice(0, 6);

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
