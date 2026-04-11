
import { getWebDesignPost } from '../../lib/api';
import TOC from '../../components/TOC';
import Head from 'next/head';

export default function WebDesignDetail({ post }) {
  if (!post) return <p>Halaman tidak ditemukan...</p>;

  // Trik untuk menyuntikkan ID ke H2 agar TOC berfungsi
  const contentWithIds = post.content.replace(/<h2>(.*?)<\/h2>/g, (match, title) => {
    const id = title.toLowerCase().replace(/\s+/g, '-').replace(/<[^>]*>?/gm, '');
    return `<h2 id="${id}">${title}</h2>`;
  });

  return (
    <article className="container" style={{ paddingTop: '40px' }}>
      <Head>
        <title>{post.title} | PujaShanti Web Design</title>
      </Head>

      <header style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>{post.title}</h1>
        <time style={{ color: '#888' }}>{new Date(post.date).toLocaleDateString('id-ID')}</time>
      </header>

      <div style={{ display: 'flex', flexDirection: 'row-reverse', gap: '40px', alignItems: 'flex-start' }}>
        {/* Sidebar TOC */}
        <aside style={{ width: '300px', position: 'sticky', top: '20px' }}>
          <TOC content={post.content} />
        </aside>

        {/* Isi Konten */}
        <div 
          className="entry-content" 
          style={{ flex: 1 }}
          dangerouslySetInnerHTML={{ __html: contentWithIds }} 
        />
      </div>
    </article>
  );
}

export async function getStaticPaths() {
  return { paths: [], fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const post = await getWebDesignPost(params.slug);
  
  if (!post) {
    return { notFound: true };
  }

  return {
    props: { post },
    revalidate: 60,
  };
}
