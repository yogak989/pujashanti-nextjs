import { useState } from 'react';

export default function CopyButton({ code }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Balik ke "Copy" setelah 2 detik
    } catch (err) {
      console.error('Gagal menyalin:', err);
    }
  };

  return (
    <button 
      onClick={handleSearch}
      className={`copy-btn ${copied ? 'copied' : ''}`}
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}
