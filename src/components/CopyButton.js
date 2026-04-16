import { useState } from 'react';

export default function CopyButton({ code }) {
  // 1. State untuk memantau status (sudah dicopy atau belum)
  const [copied, setCopied] = useState(false);

  // 2. Fungsi Utama untuk menyalin teks
  const handleCopy = async () => {
    try {
      // Perintah browser untuk menyalin teks ke clipboard
      await navigator.clipboard.writeText(code);
      
      // Ubah status menjadi true (teks tombol jadi "Copied!")
      setCopied(true);
      
      // Kembalikan ke false setelah 2 detik (teks balik jadi "Copy")
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Gagal menyalin:', err);
    }
  };

  return (
    <button 
      onClick={handleCopy} // <-- Pastikan ini memanggil handleCopy, bukan handleSearch
      className={`copy-btn ${copied ? 'copied' : ''}`}
    >
      {/* Jika copied true, tampilkan "Copied!", jika false tampilkan "Copy" */}
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}
