import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

// Import komponen global Anda
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function SearchPage() {
  const router = useRouter();
  const { q } = router.query;
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (q) {
      fetchResults();
    }
  }, [q]);

  const fetchResults = async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://pujashanti.web.id/wp-json/wp/v2/posts?search=${q}&_embed`);
      const data = await res.json();
      setResults(data);
    } catch (error) {
      console.error("Search error:", error);
    }
    setLoading(false);
  };

  return (
    <>
      <Header /> {/* Menampilkan Navigasi/Menu */}

      <div className="search-container">
        <Head>
          <title>Hasil Pencarian: {q} - Pujashanti</title>
        </Head>

        <main className="search-main">
          {/* ... isi konten pencarian sama seperti sebelumnya ... */}
          <h1>Hasil Pencarian untuk: <span className="query-text">"{q}"</span></h1>
          
          {loading && <p>Mencari...</p>}

          <div className="search-results-grid">
            {results.map((post) => (
              <article key={post.id} className="search-item">
                <Link href={`/web-design/${post.slug}`}>
                  <h2 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                </Link>
                <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
              </article>
            ))}
          </div>
        </main>
      </div>

      <Footer /> {/* Menampilkan Footer */}

      <style jsx>{`
        .search-container { max-width: 1000px; margin: 0 auto; padding: 2rem; min-height: 60vh; }
        .query-text { color: #2563eb; }
        .search-item { margin-bottom: 2rem; border-bottom: 1px solid #eee; padding-bottom: 1rem; }
        .search-item h2 { color: #2563eb; cursor: pointer; }
      `}</style>
    </>
  );
}
