import { getWebDesignPost } from '../../lib/api';
import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
export const runtime = 'experimental-edge';
export default function WebDesignPost({ post }) {
  if (!post) return <div style={{ textAlign: 'center', padding: '100px' }}>Memuat halaman...</div>;

  const formattedDate = new Date(post.date).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <>
      <Head>
       <title>{post.seo_data.title}</title>
  <meta name="description" content={post.seo_data.description} />
  
  {/* Meta Bahasa Default */}
  <meta name="language" content="id" />
  <meta name="geo.region" content="ID" />
  <meta name="geo.placename" content="Indonesia" />
  <meta httpEquiv="content-language" content="id" />

  {/* Canonical URL agar tidak dianggap konten duplikat */}
  <link rel="canonical" href={`https://pujashanti.web.id/web-design/${post.slug}/`} />
      </Head>

      <div style={styles.wrapper}>
        {/* MAIN CONTENT (70%) */}
        <main style={styles.main}>
          <img 
            src={post.featured_image} 
            alt={post.title} 
            style={styles.featuredImg} 
          />
          <h1 style={styles.title}>{post.title}</h1>
          <div 
            style={styles.content} 
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />
        </main>

        {/* SIDEBAR (30%) */}
        <aside style={styles.sidebar}>
          <h3 style={styles.sidebarTitle}>Latest Projects</h3>
          <ul style={styles.list}>
            {latestPosts.map((item) => (
              <li key={item.slug} style={styles.listItem}>
                <a href={`/web-design/${item.slug}/`} style={styles.link}>
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </>
  );
}

// --- JEMBATAN DATA ---
export async function getStaticProps({ params }) {
  const post = await getWebDesignPost(params.slug);
  const latestPosts = await getWebDesignLandingData(); // Mengambil daftar terbaru

  return {
    props: {
      post,
      latestPosts: latestPosts.slice(0, 5), // Ambil 5 saja untuk sidebar
    },
    revalidate: 10,
  };
}

// --- STYLING ---
const styles = {
  wrapper: {
    display: 'flex',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    gap: '40px', // Jarak antara konten dan sidebar
    flexWrap: 'wrap', // Biar responsif di HP
  },
  main: {
    flex: '0 0 70%', // Lebar 70%
    minWidth: '300px',
  },
  sidebar: {
    flex: '1', // Sisa 30%
    minWidth: '250px',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    height: 'fit-content',
  },
  featuredImg: {
    width: '100%',
    height: 'auto',
    borderRadius: '12px',
    marginBottom: '20px',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '1rem',
  },
  sidebarTitle: {
    borderBottom: '2px solid #333',
    paddingBottom: '10px',
    marginBottom: '15px',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  listItem: {
    marginBottom: '12px',
    borderBottom: '1px solid #eee',
    paddingBottom: '8px',
  },
  link: {
    textDecoration: 'none',
    color: '#0070f3',
    fontSize: '0.95rem',
  }
};

// Jangan lupa getStaticPaths tetap ada di bawah...

      <Footer />

      <style jsx global>{`
        .container {
          padding: 120px 20px 60px;
          background-color: #f4f7f6;
          min-height: 100vh;
        }
        .article-wrapper {
          max-width: 800px;
          margin: 0 auto;
          background: #fff;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          position: relative;
        }
        .template-label {
          position: absolute;
          top: 20px;
          right: 20px;
          background: #1a3a5a;
          color: #fff;
          padding: 5px 15px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: bold;
          z-index: 5;
        }
        .featured-image-box {
          width: 100%;
          max-height: 450px;
          overflow: hidden;
        }
        .img-fluid {
          width: 100%;
          height: auto;
          object-fit: cover;
        }
        .content-padding {
          padding: 40px;
        }
        .title {
          font-size: 2.5rem;
          color: #1a3a5a;
          line-height: 1.2;
          margin-bottom: 15px;
          font-weight: 800;
        }
        .meta {
          color: #6c757d;
          font-size: 0.9rem;
          margin-bottom: 25px;
          display: flex;
          gap: 10px;
        }
        .line {
          border: 0;
          border-top: 1px solid #eee;
          margin-bottom: 30px;
        }
        .entry-content {
          line-height: 1.8;
          font-size: 1.15rem;
          color: #333;
        }
        .entry-content p { margin-bottom: 20px; }
        .entry-content h2 { margin-top: 35px; color: #1a3a5a; }

        @media (max-width: 768px) {
          .title { font-size: 1.8rem; }
          .content-padding { padding: 25px; }
        }
      `}</style>
    </>
  );
}

export async function getStaticPaths() {
  return { paths: [], fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const post = await getWebDesignPost(params.slug);
  if (!post) return { notFound: true };
  return { props: { post }, revalidate: 60 };
}
