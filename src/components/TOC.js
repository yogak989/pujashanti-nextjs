import { useEffect, useState } from 'react';

export default function TOC({ content }) {
  const [headings, setHeadings] = useState([]);

  useEffect(() => {
    // Mencari semua H2 di dalam konten
    const doc = new DOMParser().parseFromString(content, 'text/html');
    const elements = Array.from(doc.querySelectorAll('h2')).map((elem) => ({
      id: elem.innerText.toLowerCase().replace(/\s+/g, '-'),
      text: elem.innerText,
    }));
    setHeadings(elements);
  }, [content]);

  if (headings.length === 0) return null;

  return (
    <nav className="toc" style={{ padding: '20px', background: '#f9f9f9', borderRadius: '8px', marginBottom: '20px' }}>
      <h4 style={{ marginTop: 0 }}>Daftar Isi</h4>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {headings.map((h) => (
          <li key={h.id} style={{ marginBottom: '10px' }}>
            <a href={`#${h.id}`} style={{ color: '#0070f3', textDecoration: 'none' }}>
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
