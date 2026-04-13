import { getTestLoopData } from '../lib/api';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function TestLoopPage({ posts }) {
  return (
    <>
      <Header />
      <main style={{ paddingTop: '100px', paddingBottom: '50px', backgroundColor: '#f1f5f9', minHeight: '100vh' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
          
          <div style={{ marginBottom: '40px', textAlign: 'center' }}>
            <h1 style={{ color: '#1a3a5a', fontSize: '2.5rem' }}>🧪 Eksperimen Query Loop</h1>
            <p style={{ color: '#64748b' }}>Menampilkan 10 post terbaru dari CPT web_design via WPGraphQL</p>
          </div>

          {/* GRID SYSTEM */}
          <div className="test-grid">
            {posts.map(({ node }) => (
              <div key={node.id} className="test-card">
                {/* Image Section */}
                <div className="card-image">
                  {node.featuredImage?.node?.sourceUrl ? (
                    <img src={node.featuredImage.node.sourceUrl} alt={node.title} />
                  ) : (
                    <div className="placeholder">No Image</div>
                  )}
                </div>

                {/* Content Section */}
                <div className="card-body">
                  <h2 className="card-title">{node.title}</h2>
                  <div 
                    className="card-excerpt" 
                    dangerouslySetInnerHTML={{ __html: node.excerpt }} 
                  />
                  <Link href={`/web-design/${node.slug}`} className="card-link">
                    Baca Selengkapnya →
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>
      <Footer />

      <style jsx>{`
        .test-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 25px;
        }
        .test-card {
          background: #fff;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
          transition: transform 0.2s;
        }
        .test-card:hover {
          transform: translateY(-5px);
        }
        .card-image {
          width: 100%;
          height: 200px;
          background: #e2e8f0;
        }
        .card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .placeholder {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          color: #94a3b8;
        }
        .card-body {
          padding: 20px;
        }
        .card-title {
          font-size: 1.25rem;
          color: #1a3a5a;
          margin-bottom: 10px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .card-excerpt {
          font-size: 0.9rem;
          color: #475569;
          line-height: 1.5;
          margin-bottom: 20px;
        }
        .card-link {
          color: #1a3a5a;
          text-decoration: none;
          font-weight: bold;
          font-size: 0.9rem;
        }
      `}</style>
    </>
  );
}

export async function getStaticProps() {
  const posts = await getTestLoopData();
  return {
    props: { posts },
    revalidate: 10, // Cek data baru setiap 10 detik
  };
}
