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
      // Mengambil data dari nodes seperti hasil eksplorasi Anda
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
    /* Flexbox container memastikan footer selalu di bawah */
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Head>
        <title>Pencarian: {q || '...'} - Pujashanti</title>
      </Head>

      <Header />

      {/* Main dengan flex-grow: 1 agar mendorong footer ke bawah layar */}
      <main style={{ flex: '1 0 auto', paddingTop: '140px', paddingBottom: '60px', backgroundColor: '#f9fafb' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
          
          <div style={{ marginBottom: '30px' }}>
            <h1 style={{ fontSize: '1.8rem', color: '#1e3a8a' }}>
              Pencarian: <span style={{ color: '#2563eb' }}>"{q}"</span>
            </h1>
            {!loading && <p style={{ color: '#64748b' }}>Ditemukan {results.length} tutorial.</p>}
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '50px' }}>
              <p>Memuat hasil...</p>
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
                  boxShadow: '0 2px 4px rgba(0,0,0,0.02)' 
                }}>
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
              <div style={{ textAlign: 'center', padding: '50px', background: '#fff', borderRadius: '12px' }}>
                <p>Tidak ditemukan artikel untuk "{q}". Coba kata kunci lain.</p>
              </div>
            )
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
