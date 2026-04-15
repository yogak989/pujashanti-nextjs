import { useState } from 'react';
import { submitComment } from '../lib/api';

export default function CommentSection({ postId, initialComments }) {
  const [comments, setComments] = useState(initialComments || []);
  const [formData, setFormData] = useState({ name: '', email: '', content: '' });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const result = await submitComment({
        author: formData.name,
        authorEmail: formData.email,
        content: formData.content,
        commentOn: postId
      });

      if (result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', content: '' });
        // Catatan: Komentar biasanya tidak langsung muncul karena menunggu moderasi WP
        // Tapi kita bisa memberi pesan bahwa komentar sedang ditinjau.
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <div className="comment-wrapper mt-10 p-6 bg-gray-50 rounded-lg">
      <h3 className="text-2xl font-bold mb-6">Diskusi ({comments.length})</h3>

      {/* Daftar Komentar yang Sudah Ada */}
      <div className="comment-list space-y-4 mb-10">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="p-4 bg-white shadow-sm rounded border-l-4 border-blue-500">
              <p className="font-semibold text-blue-600">{comment.author.node.name}</p>
              <p className="text-xs text-gray-400 mb-2">{new Date(comment.date).toLocaleDateString('id-ID')}</p>
              <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: comment.content }} />
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic">Belum ada komentar. Jadilah yang pertama!</p>
        )}
      </div>

      <hr className="my-8" />

      {/* Formulir Input */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <h4 className="text-xl font-semibold">Tinggalkan Komentar</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Nama Anda"
            className="p-2 border rounded w-full"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
          <input
            type="email"
            placeholder="Email (tidak akan dipublikasikan)"
            className="p-2 border rounded w-full"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
        </div>
        
        <textarea
          placeholder="Tulis komentar Anda di sini..."
          className="p-2 border rounded w-full h-32"
          value={formData.content}
          onChange={(e) => setFormData({...formData, content: e.target.value})}
          required
        ></textarea>

        <button
          type="submit"
          disabled={status === 'loading'}
          className={`px-6 py-2 rounded text-white font-bold ${
            status === 'loading' ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {status === 'loading' ? 'Mengirim...' : 'Kirim Komentar'}
        </button>

        {status === 'success' && (
          <p className="text-green-600 font-medium mt-2">
            Terima kasih! Komentar Anda telah terkirim dan menunggu moderasi admin.
          </p>
        )}
        {status === 'error' && (
          <p className="text-red-600 font-medium mt-2">
            Maaf, terjadi kesalahan. Silakan coba lagi nanti.
          </p>
        )}
      </form>
    </div>
  );
}
