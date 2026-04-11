export const runtime = 'experimental-edge';
import '../styles/globals.css';
import Header from '../components/Header';

// Di _app.js kita TIDAK perlu menambahkan 'export const runtime = edge'
// Karena file ini hanya pembungkus (layout)

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <main>
        {/* Hapus className="container" jika Anda belum membuat CSS-nya agar tidak berantakan */}
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default MyApp;
