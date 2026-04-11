import Head from 'next/head';
import Link from 'next/link';
import { getWebDesignLandingData } from '../../lib/api';

export const runtime = 'experimental-edge';

export default function WebDesignHome({ posts }) {
  return (
    <div className="container">
      <Head>
        <title>Layanan Web Design | PujaShanti</title>
      </Head>

      <header style={{ textAlign: 'center', padding: '60px 0' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#1a202c' }}>Layanan Web Design PujaShanti</h1>
        <p style={{ color: '#718096', fontSize: '1.2rem' }}>Solusi desain web profesional untuk bisnis Anda.</p>
      </header>

      <div className="grid">
        {posts.map((post) => (
          <div key={post.slug} className="card">
            <h3>{post.title}</h3>
            <div 
              className="excerpt" 
              dangerouslySetInnerHTML={{ __html: post.excerpt }} 
              style={{ fontSize: '0.9rem', color: '#4a5568', marginBottom: '20px' }}
            />
            <Link href={`/web-design/${post.slug}`} className="btn">
              Lihat Detail →
            </Link>
          </div>
        ))}
      </div>

      <style jsx>{`
        .container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 20px;
          font-family: 'Inter', sans-serif;
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 30px;
        }
        .card {
          padding: 30px;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          transition: transform 0.2s, box-shadow 0.2s;
          background: #fff;
        }
        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.05);
        }
        .card h3 {
          margin-top: 0;
          color: #2d3748;
        }
        .btn {
          display: inline-block;
          color: #0070f3;
          font-weight: 600;
          text-decoration: none;
        }
        .btn:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}

export async function getServerSideProps() {
  const posts = await getWebDesignLandingData();
  return {
    props: { posts },
  };
}
