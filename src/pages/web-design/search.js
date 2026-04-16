import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/Header'; // Naik 2 level karena sekarang di dalam folder
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
      const res = await fetch(
        `https://pujashanti.web.id/wp-json/wp/v2/posts?search=${encodeURIComponent(searchQuery)}&_embed`,
        {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
          }
        }
      );
      if (!res.ok) throw new Error('Gagal mengambil data');
      const data = await res.json();
      setResults(data);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      {/* Tambahkan padding-top di sini (misal 100px) agar tidak tertutup header */}
      <div className="search-page-wrapper" style={{ paddingTop: '100px', minHeight: '80vh' }}>
        <Head>
          <title>Hasil Pencarian: {q || '...'} - Pujashanti</title>
        </Head>

        <main style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '30px', borderBottom: '2px solid #2563eb', paddingBottom: '10px' }}>
            Pencarian: <span style={{ color: '#2563eb' }}>"{q}"</span>
          </h1>
          
          {loading && <p style={{ textAlign: 'center', fontSize: '1.2rem' }}>Mencari artikel terbaik...</p>}

          {!loading && results.length === 0 && q && (
            <div style={{ textAlign: 'center', padding: '50px 0' }}>
              <p style={{ fontSize: '1.2rem', color: '#666' }}>Tidak ditemukan artikel dengan kata kunci tersebut.</p>
              <Link href="/web-design" style={{ color: '#2563eb', fontWeight: '600' }}>← Kembali ke Tutorial</Link>
            </div>
          )}

          <div className="search-results">
            {results.map((post) => (
              <article key={post.id} style={{ marginBottom: '40px', background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #eee' }}>
                <Link href={`/web-design/${post.slug}`} style={{ textDecoration: 'none' }}>
                  <h2 
                    style={{ color: '#1e3a8a', fontSize: '1.5rem', marginBottom: '10px' }}
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }} 
                  />
                </Link>
                <div 
                  style={{ color: '#4b5563', fontSize: '1.05rem', lineHeight: '1.7' }}
                  dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} 
                />
                <Link href={`/web-design/${post.slug}`} style={{ color: '#2563eb', fontWeight: '500', display: 'inline-block', marginTop: '10px' }}>
                  Baca Selengkapnya →
                </Link>
              </article>
            ))}
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
