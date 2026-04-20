import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function SearchPage() {
  const router = useRouter();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const { q } = router.query;

  useEffect(() => {
    // router.isReady memastikan parameter 'q' sudah tersedia dari URL
    if (router.isReady && q) {
      fetchResults(q);
    }
  }, [router.isReady, q]);

  const fetchResults = async (searchQuery) => {
    setLoading(true);
    try {
      const graphqlQuery = {
        query: `
          query SearchWebDesign($searchTerm: String!) {
            webDesigns(where: { search: $searchTerm }) {
              nodes {
                id
                title
                slug
                excerpt
              }
            }
          }
        `,
        variables: { searchTerm: searchQuery },
      };

      const res = await fetch('https://pujashanti.web.id/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(graphqlQuery),
      });

      const json = await res.json();
      if (json.data && json.data.webDesigns) {
        setResults(json.data.webDesigns.nodes || []);
      }
    } catch (error) {
      console.error("Search fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Head>
        <title>Pencarian: {q ? decodeURIComponent(q) : '...'} - Pujashanti</title>
      </Head>

      <Header />

      <main style={{ flex: '1 0 auto', paddingTop: '140px', paddingBottom: '60px', backgroundColor: '#f9fafb' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
          
          <div style={{ marginBottom: '30px' }}>
            <h1 style={{ fontSize: '1.8rem', color: '#1e3a8a' }}>
              Hasil Pencarian: <span style={{ color: '#2563eb' }}>"{q ? decodeURIComponent(q) : ''}"</span>
            </h1>
            {!loading && q && (
              <p style={{ color: '#64748b' }}>
                {results.length > 0 
                  ? `Ditemukan ${results.length} tutorial yang relevan.` 
                  : 'Tidak ada hasil yang ditemukan.'}
              </p>
            )}
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '50px' }}>
              {/* Anda bisa mengganti ini dengan komponen Spinner jika ada */}
              <p style={{ color: '#64748b', fontWeight: '500' }}>Sedang mencari tutorial...</p>
            </div>
          ) : results.length > 0 ? (
            <div className="search-results">
              {results.map((post) => (
                <article key={post.id} style={{ 
                  background: '#fff', 
                  padding: '25px', 
                  borderRadius: '12px', 
                  marginBottom: '20px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
                  transition: 'transform 0.2s ease'
                }}
                className="card-hover-effect"
                >
                  <Link href={`/web-design/${post.slug}`} style={{ textDecoration: 'none' }}>
                    <h2 style={{ color: '#1e3a8a', fontSize: '1.4rem', marginBottom: '10px' }} 
                        dangerouslySetInnerHTML={{ __html: post.title }} />
                  </Link>
                  <div style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6' }} 
                       dangerouslySetInnerHTML={{ __html: post.excerpt }} />
                  <Link href={`/web-design/${post.slug}`} style={{ color: '#2563eb', fontWeight: '600', display: 'inline-block', marginTop: '12px' }}>
                    Pelajari Selengkapnya →
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            q && (
              <div style={{ textAlign: 'center', padding: '50px', background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <p style={{ fontSize: '1.1rem', color: '#64748b' }}>
                  Maaf, tutorial tentang <strong>"{decodeURIComponent(q)}"</strong> tidak ditemukan.
                </p>
                <Link href="/web-design" style={{ color: '#2563eb', marginTop: '15px', display: 'inline-block' }}>
                  Kembali ke Daftar Tutorial
                </Link>
              </div>
            )
          )}
        </div>
      </main>

      <Footer />

      <style jsx>{`
        .card-hover-effect:hover {
          transform: translateY(-3px);
          border-color: #cbd5e1 !important;
          box-shadow: 0 10px 20px rgba(0,0,0,0.05) !important;
        }
      `}</style>
    </div>
  );
}
