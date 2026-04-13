import { getWebDesignPost, getWebDesignLandingData, getAllWebDesignSlugs } from '../../lib/api';
import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export const runtime = 'experimental-edge';

export default function WebDesignPost({ post, latestPosts }) {
  if (!post) return <div style={{ textAlign: 'center', padding: '100px' }}>Memuat halaman...</div>;

  const formattedDate = new Date(post.date).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <>
      <Head>
        <title>{post.seo_data?.title || post.title}</title>
        <meta name="description" content={post.seo_data?.description || ""} />
        {/* Meta Info Editor & Author */}
        <meta name="author" content="Pujashanti" />
        <meta name="editor" content="Pujashanti" />
        <meta name="language" content="id" />
        <meta name="geo.region" content="ID" />
        <meta name="geo.placename" content="Indonesia" />
        <meta httpEquiv="content-language" content="id" />
        <link rel="canonical" href={`https://pujashanti.web.id/web-design/${post.slug}/`} />
      </Head>

      <Header />

      <div style={styles.wrapper}>
        {/* MAIN CONTENT (70%) */}
        <main style={styles.main}>
          <div className="article-wrapper">
             {post.featured_image && (
                <div className="featured-image-box">
                    <img 
                        src={post.featured_image} 
                        alt={post.title} 
                        className="img-fluid"
                    />
                </div>
             )}
            
            <div className="content-padding">
                <h1 className="title">{post.title}</h1>
               <div className="meta">
        <span>Editor: Pujashanti</span>
        <span style={{ margin: '0 10px' }}>|</span>
        <span>Terbit: {formattedDate}</span>
                </div>
                <hr className="line" />
                <div 
                    className="entry-content" 
                    dangerouslySetInnerHTML={{ __html: post.content }} 
                />
            </div>
          </div>
                  <section className="related-projects">
    <h3 className="section-title">More Posts</h3>
    <div className="project-grid">
      {latestPosts && latestPosts.slice(0, 3).map((item) => (
        <a href={`/web-design/${item.slug}/`} key={item.slug} className="project-card">
          <div className="card-image">
            <img 
  src={item.featured_image || item.featuredImage || 'https://via.placeholder.com/400x250?text=No+Image'} 
  alt={item.title} 
/>
          </div>
          <div className="card-info">
            <h4>{item.title}</h4>
            <span>View Project →</span>
          </div>
        </a>
      ))}
    </div>
  </section>
        </main>

        {/* SIDEBAR (30%) */}
        <aside style={styles.sidebar}>
          <h3 style={styles.sidebarTitle}>Latest Posts</h3>
          <ul style={styles.list}>
            {latestPosts && latestPosts.map((item) => (
              <li key={item.slug} style={styles.listItem}>
                <a href={`/web-design/${item.slug}/`} style={styles.link}>
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
              <div style={{ marginTop: '40px' }}>
    <h3 style={styles.sidebarTitle}>Butuh Bantuan?</h3>
    <p style={{ fontSize: '0.9rem', color: '#666' }}>
      Konsultasi pembuatan website gratis via WhatsApp.
    </p>
    <a href="https://wa.me/6285737689037" style={styles.waButton}>
      Chat Sekarang
    </a>
  </div>
        </aside>
      </div>

      <Footer />

      <style jsx global>{`
        .article-wrapper {
          background: #fff;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          margin-bottom: 40px;
        }
        .featured-image-box {
          width: 100%;
          max-height: 500px;
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
        }
        .line {
          border: 0;
          border-top: 1px solid #eee;
          margin-bottom: 30px;
        }
        .entry-content {
          line-height: 1.8;
          font-size: 1.1rem;
          color: #333;
        }
        .entry-content p { margin-bottom: 20px; }
        .related-projects {
  margin-top: 50px;
  padding: 20px 0;
}
.section-title {
  font-size: 1.5rem;
  color: #1a3a5a;
  margin-bottom: 25px;
  font-weight: 700;
}
.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}
.project-card {
  text-decoration: none;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  transition: transform 0.3s ease;
}
.project-card:hover {
  transform: translateY(-5px);
}
.card-image {
  width: 100%;
  height: 150px;
  overflow: hidden;
}
.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.card-info {
  padding: 15px;
}
.card-info h4 {
  font-size: 1rem;
  color: #333;
  margin: 0 0 10px;
  line-height: 1.4;
}
.card-info span {
  font-size: 0.85rem;
  color: #b38b4d;
  font-weight: 600;
}

@media (max-width: 600px) {
  .project-grid {
    grid-template-columns: 1fr; /* Full width di HP */
  }
}
        @media (max-width: 768px) {
          .title { font-size: 1.8rem; }
          .content-padding { padding: 20px; }
        }
      `}</style>
    </>
  );
}

const styles = {
  wrapper: {
    display: 'flex',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '100px 20px 60px', // Sesuaikan padding atas agar tidak tertutup header
    gap: '30px',
    flexWrap: 'wrap', // Ini sudah benar untuk membuat sidebar turun
  },
  main: {
    flex: '1 1 700px', // Angka 700px ini adalah "titik pecah" (breakpoint)
    maxWidth: '100%',
  },
  sidebar: {
    flex: '1 1 300px', // Sidebar akan mencoba 300px, tapi bisa melar (flex-grow: 1)
    padding: '25px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    height: 'fit-content',
    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
  },
 sidebarTitle: {
    fontSize: '1.2rem',
    fontWeight: '700',
    color: '#1a3a5a',
    borderBottom: '2px solid #1a3a5a',
    paddingBottom: '10px',
    marginBottom: '20px',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  listItem: {
    padding: '12px 0',
    borderBottom: '1px solid #eee',
  },
  link: {
    textDecoration: 'none',
    color: '#333',
    fontSize: '0.95rem',
    fontWeight: '500',
    transition: 'color 0.2s',
  }
};

export async function getStaticPaths() {
  const allPosts = await getAllWebDesignSlugs();
  const paths = allPosts.map((post) => ({
    params: { slug: post.slug },
  }));

  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const post = await getWebDesignPost(params.slug);
  const latestPostsData = await getWebDesignLandingData();

  if (!post) {
    return { notFound: true };
  }

  return {
    props: {
      post,
      latestPosts: latestPostsData || [],
    },
    revalidate: 60,
  };
}
