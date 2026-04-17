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
    // Memastikan router siap dan parameter query 'q' tersedia
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
        variables: {
          searchTerm: searchQuery,
        },
      };

      const res = await fetch('https://pujashanti.web.id/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        },
        body: JSON.stringify(graphqlQuery),
      });

      const { data, errors } = await res.json();

      if (errors) {
        console.error("GraphQL Errors:", errors);
        setResults([]);
      } else {
        // Mengambil data dari nodes CPT webDesigns
        setResults(data?.webDesigns?.nodes || []);
      }
    } catch (error) {
      console.error("Search fetch error:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Pencarian: {q ? `"${q}"` : '...'} - Pujashanti</title>
        <meta name="robots" content="noindex, follow" />
      </Head>

      <Header />

      {/* Padding Top 120px agar tidak tertutup sticky header */}
      <div style={{ paddingTop: '120px', minHeight: '85vh', backgroundColor: '#f9fafb' }}>
        <main style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px 60px 20px' }}>
          
          <div style={{ marginBottom: '40px', borderBottom: '1px solid #e5e7eb', paddingBottom: '20px' }}>
            <h1 style={{ fontSize: '1.8rem', color: '#1e3a8a', marginBottom: '8px' }}>
              Hasil Pencarian: <span style={{ color: '#2563eb' }}>"{q}"</span>
            </h1>
            <p style={{ color: '#6b7280' }}>
              Ditemukan {results.length} tutorial dalam kategori Web Design.
            </p>
          </div>

          {loading && (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <div className="spinner" style={{ border: '4px solid #f3f3f3', borderTop: '4px solid #2563eb', borderRadius: '50%', width: '30px', height: '30px', animation: 'spin 1s linear infinite', margin: '0 auto 15px' }}></div>
              <p style={{ color: '#4b5563' }}>Mencari data di database...</p>
            </div>
          )}

          {!loading && results.length === 0 && q && (
            <div style={{ textAlign: 'center', padding: '60px 20px', background: '#fff', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <p style={{ fontSize: '1.1rem', color: '#374151' }}>Maaf, tidak ada tutorial yang cocok dengan kata kunci tersebut.</p>
              <Link href="/web-design" style={{ color: '#2563eb', fontWeight: '600', textDecoration: 'none', display: 'inline-block', marginTop: '20px' }}>
                ← Kembali ke Index Tutorial
              </Link>
            </div>
          )}

          <div className="results-container">
            {results.map((post) => (
              <article key={post.id} style={{ 
                background: '#ffffff', 
                padding: '30px', 
                borderRadius: '12px', 
                marginBottom: '20px', 
                border: '1px solid #e5e7eb',
                boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
              }}>
                <span style={{ fontSize: '0.7rem', color: '#2563eb', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Tutorial
                </span>
                <Link href={`/web-design/${post.slug}`} style={{ textDecoration: 'none' }}>
                  <h2 
                    style={{ color: '#1e3a8a', fontSize: '1.5rem', marginTop: '8px', marginBottom: '12px', lineHeight: '1.3' }}
                    dangerouslySetInnerHTML={{ __html: post.title }} 
                  />
                </Link>
                <div 
                  style={{ color: '#4b5563', fontSize: '1rem', lineHeight: '1.6' }}
                  dangerouslySetInnerHTML={{ __html: post.excerpt }} 
                />
                <Link href={`/web-design/${post.slug}`} style={{ 
                  display: 'inline-block', 
                  marginTop: '15px', 
                  color: '#2563eb', 
                  fontWeight: '600',
                  fontSize: '0.95rem'
                }}>
                  Pelajari Selengkapnya →
                </Link>
              </article>
            ))}
          </div>
        </main>
      </div>

      <Footer />

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}
