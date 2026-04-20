
import { 
  getWebDesignPost, 
  getWebDesignLandingData, 
  getAllWebDesignSlugs, 
  getCommentsByPostId 
} from '../../lib/api';

import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CommentSection from '../../components/CommentSection';
import AdUnit from '../../components/AdUnit';
import { useRouter } from 'next/router';
export const runtime = 'experimental-edge';

// --- FUNGSI PENGACAK (Fisher-Yates Shuffle) ---
function shuffleArray(array) {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

export default function WebDesignPost({ post, comments, latestPosts }) {
  const router = useRouter(); 

// Handler pencarian di Sidebar atau Header
const handleSearch = (e) => {
  e.preventDefault();
  
  // Mengambil nilai dari input dengan name="search"
  const query = e.target.search.value; 

  if (query && query.trim().length > 0) {
    // Navigasi ke halaman search Next.js
    router.push(`/web-design/search?q=${encodeURIComponent(query.trim())}`);
    
    // Opsional: Kosongkan input setelah enter (khusus jika di mobile menu)
    e.target.search.value = ''; 
    
    // Jika ini di dalam Mobile Menu Header, pastikan menu tertutup
    if (typeof setIsOpen === 'function') setIsOpen(false);
  }
};
  
  if (!post) return <div style={{ textAlign: 'center', padding: '100px' }}>Memuat halaman...</div>;

  const formattedDate = new Date(post.date).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  // Filter agar post yang sedang dibuka tidak muncul di loop bawah
  const relatedPosts = (latestPosts || [])
    .filter(item => item && item.slug !== post.slug)
    .slice(0, 3);

  return (
    <>
      <Head>
        <title>{post.seo_data?.title || post.title}</title>
        <meta name="description" content={post.seo_data?.description || ""} />
        <meta name="author" content="Pujashanti" />
        <meta name="editor" content="Pujashanti" />
        <meta name="language" content="id" />
        <meta name="geo.region" content="ID" />
        <meta name="geo.placename" content="Indonesia" />
        <meta httpEquiv="content-language" content="id" />
        <link rel="canonical" href={`https://pujashanti.web.id/web-design/${post.slug}/`} />
        <link 
      rel="preload" 
      as="image" 
      href={post.featured_image} 
      fetchpriority="high" 
    />
      </Head>

      <Header />
       {post.featured_image && (
  <div style={styles.heroFullWidth}>
    <img 
      src={post.featured_image} 
      alt={post.title} 
      // Kuncinya ada di sini untuk performa PSI:
      fetchpriority="high" 
      loading="eager" 
      decoding="async"
      style={styles.heroImg}
    />
  </div>
)}
      <div style={styles.wrapper}>
        {/* MAIN CONTENT (70%) */}
        <main style={styles.main}>
  <div className="article-wrapper">
    
    <div className="content-padding">
      <h1 className="title">{post.title}</h1>
      <div className="meta">
        <span>Editor: Pujashanti</span>
        <span style={{ margin: '0 10px' }}>|</span>
        <span>Terbit: {formattedDate}</span>
      </div>
      <hr className="line" />

      {/* IKLAN 1: DI BAWAH JUDUL */}
      <AdUnit slot="5670646182" /> 

      <div 
        className="entry-content" 
        dangerouslySetInnerHTML={{ __html: post.content }} 
      />
    </div>
  </div>

  {/* IKLAN 2: DI ATAS RELATED POSTS / SEBELUM KOMENTAR */}
  <div style={{ padding: '0 20px' }}>
    <AdUnit slot="7618152674" />
  </div>

  {/* RANDOM RELATED POSTS LOOP */}
  <section className="related-projects">
    <h3 className="section-title">More Posts</h3>
    <div className="project-grid">
      {relatedPosts.map((item) => (
        <a href={`/web-design/${item.slug}/`} key={item.slug} className="project-card">
          <div className="card-image">
            {item.featuredImage?.node?.sourceUrl ? (
              <img src={item.featuredImage.node.sourceUrl} alt={item.title} />
            ) : (
              <div className="placeholder" style={styles.placeholder}>No Image</div>
            )}
          </div>
          <div className="card-info">
            <h4>{item.title}</h4>
            <span>View Project →</span>
          </div>
        </a>
      ))}
    </div>

    {/* SEKSI KOMENTAR */}
    <CommentSection postId={post.databaseId} initialComments={comments} />
  </section>
</main>

        {/* SIDEBAR (30%) */}
        <aside style={styles.sidebar}>

<div className="search-widget">
          <h3 className="widget-title">Cari Artikel</h3>
          <form onSubmit={handleSearch} className="search-form-sidebar">
            <input
              type="text"
              name="search" // Ini penting untuk e.target.search.value
              placeholder="Cari sesuatu..."
              className="search-input-sidebar"
              required
            />
            <button type="submit" className="search-button-sidebar">Cari</button>
          </form>
        </div>
          
  <h3 style={styles.sidebarTitle}>Latest Posts</h3>
  <ul style={styles.list}>
    {latestPosts.slice(0, 10).map((item) => (
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

  {/* IKLAN SIDEBAR: DI BAGIAN PALING BAWAH */}
  <div style={{ marginTop: '40px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
    <p style={{ fontSize: '10px', color: '#999', textAlign: 'center', marginBottom: '5px' }}>ADVERTISEMENT</p>
    <AdUnit slot="4684867571" />
  </div>
</aside>
      </div>

      <Footer />
    </>
  );
}

const styles = {
  wrapper: {
    display: 'flex',
    width: '100%',
    maxWidth: '100%',
    margin: '0',
    padding: '20px 0 60px', // Gunakan 0 di kiri-kanan untuk mobile
    gap: '30px',
    flexWrap: 'wrap',
    boxSizing: 'border-box',
    backgroundColor: '#fff',
  },
  main: {
    flex: '1 1 700px',
    maxWidth: '100%',
    minWidth: '0',
    padding: '0 15px', // Beri sedikit ruang di konten utama untuk mobile
  },
  heroFullWidth: {
    width: '100vw',
    position: 'relative',
    left: '50%',
    right: '50%',
    marginLeft: '-50vw',
    marginRight: '-50vw',
    marginTop: '100px', // Menghilangkan gap padding-top dari wrapper
    marginBottom: '10px',
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  
  heroImg: {
    width: '100%',
    height: 'auto',
    maxHeight: '450px', // Sesuaikan agar tidak terlalu tinggi di desktop
    objectFit: 'cover',
    display: 'block',
  },
  // Update di const styles di file [slug].js

sidebar: {
  flex: '1 1 340px',
  maxWidth: '100%',
  padding: '25px',
  backgroundColor: '#fff',
  borderRadius: '16px',
  height: 'fit-content',
  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
  border: '1px solid #f1f5f9',
  margin: '0 15px',
  boxSizing: 'border-box', // Tambahkan ini
  overflow: 'hidden',      // Menjamin tidak ada elemen yang "tumpah" keluar
},
  
  sidebarTitle: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#0f172a',
    borderBottom: '3px solid #3b82f6',
    paddingBottom: '8px',
    marginBottom: '20px',
  },
  list: { listStyle: 'none', padding: 0, margin: 0 },
  listItem: { 
    padding: '14px 0', 
    borderBottom: '1px solid #f1f5f9' 
  },
  link: {
    textDecoration: 'none',
    color: '#334155',
    fontSize: '0.95rem',
    fontWeight: '500',
    transition: 'color 0.2s',
  },
  waButton: {
    display: 'block',
    textAlign: 'center',
    marginTop: '15px',
    backgroundColor: '#22c55e',
    color: '#fff',
    padding: '12px 20px',
    borderRadius: '10px',
    textDecoration: 'none',
    fontWeight: '700',
    fontSize: '0.9rem',
    transition: 'background 0.3s',
  },
  placeholder: {
    width: '100%',
    height: '180px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1f5f9',
    color: '#94a3b8',
    fontSize: '0.85rem'
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
  try {
    // 1. Ambil data post tunggal
    const post = await getWebDesignPost(params.slug);

    // Jika post tidak ditemukan, langsung return 404
    if (!post) {
      return { notFound: true };
    }

    // 2. Ambil data untuk loop/sidebar & data Komentar secara bersamaan
    // Menggunakan Promise.all agar fetch data lebih cepat (paralel)
    const [latestPostsData, comments] = await Promise.all([
      getWebDesignLandingData(),
      getCommentsByPostId(post.databaseId)
    ]);

    // 3. Normalisasi data latestPosts (Mencegah error .map)
    const allNodes = latestPostsData?.webDesigns?.nodes || (Array.isArray(latestPostsData) ? latestPostsData : []);
    
    // 4. Lakukan Shuffle (Pastikan fungsi shuffleArray sudah didefinisikan di luar atau diimport)
    const shuffledNodes = allNodes.length > 0 ? shuffleArray(allNodes) : [];

    return {
      props: {
        post,
        comments: comments || [],
        latestPosts: JSON.parse(JSON.stringify(shuffledNodes)), 
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error fetching data for slug:", params.slug, error);
    return {
      props: {
        post: null,
        comments: [],
        latestPosts: [],
      },
      revalidate: 10,
    };
  }
}
