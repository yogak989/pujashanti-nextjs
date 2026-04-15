import { useState } from 'react';
import { submitComment } from '../lib/api';

export default function CommentSection({ postId, initialComments }) {
  const [formData, setFormData] = useState({ name: '', email: '', content: '' });
  const [status, setStatus] = useState('idle');

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
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div className="pujashanti-comments mt-16 pt-8 border-t border-gray-200">
      <h3 className="text-2xl font-bold text-gray-800 mb-8">Diskusi ({initialComments.length})</h3>

      {/* Daftar Komentar */}
      <div className="space-y-6 mb-12">
        {initialComments.length > 0 ? (
          initialComments.map((comment) => (
            <div key={comment.id} className="flex gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-blue-700">{comment.author.node.name}</span>
                  <span className="text-xs text-gray-400">{new Date(comment.date).toLocaleDateString('id-ID')}</span>
                </div>
                <div className="text-gray-600 leading-relaxed text-sm prose prose-blue" dangerouslySetInnerHTML={{ __html: comment.content }} />
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 italic bg-gray-50 p-4 rounded-lg text-center">Belum ada diskusi di sini. Jadilah yang pertama memberikan masukan.</p>
        )}
      </div>

      {/* Form Input */}
      <div className="bg-gray-50 p-6 md:p-8 rounded-2xl border border-gray-100">
        <h4 className="text-xl font-bold text-gray-800 mb-6">Tinggalkan Balasan</h4>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nama Nama Lengkap</label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="Contoh: Yoga Kusuma"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Alamat Email</label>
              <input
                type="email"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="email@pujashanti.web.id"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Pesan atau Pertanyaan</label>
            <textarea
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all h-40"
              placeholder="Tulis pendapat Anda tentang layanan Web Design kami..."
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              required
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className={`w-full md:w-auto px-8 py-3 rounded-lg font-bold text-white shadow-lg transition-all ${
              status === 'loading' ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:-translate-y-1'
            }`}
          >
            {status === 'loading' ? 'Sedang Mengirim...' : 'Kirim Komentar'}
          </button>

          {status === 'success' && (
            <div className="p-4 bg-green-100 text-green-700 rounded-lg border border-green-200 animate-pulse">
              ✓ Komentar Anda berhasil terkirim! Sedang menunggu moderasi admin.
            </div>
          )}
          {status === 'error' && (
            <div className="p-4 bg-red-100 text-red-700 rounded-lg border border-red-200">
              ⚠ Gagal mengirim. Pastikan semua kolom terisi dengan benar.
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
