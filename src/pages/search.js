import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function SearchPage() {
  const router = useRouter();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Ambil query 'q' dari URL
  const { q } = router.query;

  useEffect(() => {
    // router.isReady memastikan parameter 'q' sudah terbaca dari URL
    if (router.isReady && q) {
      fetchResults(q);
    }
  }, [router.isReady, q]);

  const fetchResults = async (searchQuery) => {
    setLoading(true);
    try {
      // Tambahkan header User-Agent agar tidak diblokir OpenResty (seperti masalah sebelumnya)
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
      <div className="search-container">
        <Head>
          <title>Pencarian: {q || '...'} - Pujashanti</title>
        </Head>

        <main style={{ minHeight: '60vh', padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '1.8rem', marginBottom: '20px' }}>
            Hasil Pencarian: <span style={{ color: '#2563eb' }}>"{q}"</span>
          </h1>
          
          {loading && <p>Sabar ya, sedang mencari artikel...</p>}

          {!loading && results.length === 0 && q && (
            <p>Tidak ditemukan artikel dengan kata kunci tersebut.</p>
          )}

          <div className="search-results">
            {results.map((post) => (
              <article key={post.id} style={{ marginBottom: '30px', borderBottom: '1px solid #eee', paddingBottom: '20px' }}>
                <Link href={`/web-design/${post.slug}`} style={{ textDecoration: 'none' }}>
                  <h2 
                    style={{ color: '#2563eb', fontSize: '1.4rem', margin: '0 0 10px 0' }}
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }} 
                  />
                </Link>
                <div 
                  style={{ color: '#666', fontSize: '1rem', lineHeight: '1.6' }}
                  dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} 
                />
              </article>
            ))}
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
