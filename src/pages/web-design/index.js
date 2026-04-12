import Head from 'next/head';
import Footer from '../../components/Footer';

export const runtime = 'experimental-edge';

export default function WebDesignLanding() {
  return (
    <>
      <Head>
        <title>Pusat Panduan Web SEO & Analytics | PujaShanti</title>
        <meta name="description" content="Komitmen kami terhadap kecepatan akses, keamanan data, dan performa situs." />
      </Head>

      <div className="ps-next-wrapper">
        {/* --- SECTION 1: HERO & STATS --- */}
        <div className="ps-seo-wrapper" style={{ maxWidth: '1200px', margin: '10px auto', padding: '20px', fontFamily: "'Inter', sans-serif", color: '#2d3748' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', marginBottom: '20px', flexWrap: 'wrap' }}>
              <img style={{ width: '390px', height: 'auto' }} src="https://pujashanti.web.id/wp-content/uploads/2026/01/IMG_20260123_143516.png" alt="Logo Pujashanti web seo" width="390" height="174" />
              <h2 style={{ fontSize: '2.2em', margin: '0', color: '#2d3748' }}>Pusat Panduan Web SEO &amp; Analytics</h2>
            </div>
            <p style={{ color: '#4a5568', fontSize: '1.2em', maxWidth: '700px', margin: '0 auto' }}>Komitmen kami terhadap kecepatan akses, keamanan data, and keterbukaan informasi performa situs.</p>
            <div style={{ width: '60px', height: '4px', background: '#ed8936', margin: '25px auto', borderRadius: '2px' }}></div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '25px', marginBottom: '60px' }}>
            <div className="ps-card-stat">
              <div style={{ fontSize: '35px', marginBottom: '10px' }}>⚡</div>
              <h3 style={{ margin: '10px 0', color: '#4a5568' }}>Core Web Vitals</h3>
              <div style={{ color: '#38a169', fontWeight: 'bold', fontSize: '1.2em' }}>Optimized</div>
              <p style={{ fontSize: '13px', color: '#4a5568', marginTop: '10px' }}>LCP, FID, &amp; CLS Standard</p>
            </div>
            <div className="ps-card-stat">
              <div style={{ fontSize: '35px', marginBottom: '10px' }}>🛡️</div>
              <h3 style={{ margin: '10px 0', color: '#4a5568' }}>Security Status</h3>
              <div style={{ color: '#3182ce', fontWeight: 'bold', fontSize: '1.2em' }}>Protected</div>
              <p style={{ fontSize: '13px', color: '#4a5568', marginTop: '10px' }}>SSL &amp; Cloudflare WAF</p>
            </div>
            <div className="ps-card-stat">
              <div style={{ fontSize: '35px', marginBottom: '10px' }}>📱</div>
              <h3 style={{ margin: '10px 0', color: '#4a5568' }}>Mobile Ready</h3>
              <div style={{ color: '#805ad5', fontWeight: 'bold', fontSize: '1.2em' }}>100% Responsive</div>
              <p style={{ fontSize: '13px', color: '#4a5568', marginTop: '10px' }}>Mobile-First Design</p>
            </div>
          </div>

          <div style={{ background: '#2d3748', color: 'white', borderRadius: '20px', padding: '40px 20px', marginBottom: '60px' }}>
            <div style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
              <h2 style={{ fontSize: '2.1rem', fontWeight: '800', color: 'white', marginBottom: '15px' }}>Layanan Optimasi &amp; Performa Web</h2>
              <p style={{ lineHeight: '1.8', color: 'white', marginBottom: '30px' }}>Kami menyediakan solusi Optimasi Website berbasis Cloudflare untuk memastikan aset digital Anda aman dan instan.</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', textAlign: 'left' }}>
                <div className="ps-dark-box">
                  <strong style={{ color: '#ed8936', display: 'block', marginBottom: '10px' }}>CDN &amp; Edge Computing</strong>
                  <p style={{ fontSize: '14px', color: '#cbd5e0', margin: '0' }}>Konten didistribusikan dari server terdekat dengan lokasi pengguna.</p>
                </div>
                <div className="ps-dark-box">
                  <strong style={{ color: '#ed8936', display: 'block', marginBottom: '10px' }}>Object Caching</strong>
                  <p style={{ fontSize: '14px', color: '#cbd5e0', margin: '0' }}>Optimalisasi Cache Rules untuk loading halaman yang hemat data.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- SECTION 2: CLOUDFLARE SHOWCASE --- */}
        <section className="ps-cloudflare-showcase" style={{ margin: '20px 0', padding: '0 10px' }}>
          <div className="ps-showcase-box">
            <div className="ps-column-content">
              <div className="ps-mobile-center" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <img style={{ height: '22px', width: 'auto' }} src="https://pujashanti.web.id/wp-content/uploads/2026/03/Cloudflare_Logo.webp" alt="Cloudflare" />
                <span className="ps-badge">Infrastructure Partner</span>
              </div>
              <h2 className="ps-mobile-text-center" style={{ color: '#2d3748', fontSize: '1.8em', lineHeight: '1.3', marginBottom: '20px', marginTop: '0', fontWeight: '800' }}>Mengapa Situs Web Anda Memerlukan Cloudflare?</h2>
              <p className="ps-mobile-text-center">Pernahkah Anda bertanya-tanya bagaimana situs bisa tetap stabil dan instan di seluruh dunia? Jawabannya ada pada integrasi <strong>Cloudflare</strong>.</p>
              <div className="ps-mobile-center" style={{ display: 'flex' }}>
                <a className="ps-btn-main" href="https://wa.me/6285737689037">Optimalkan Situs Saya →</a>
              </div>
            </div>
            <div className="ps-column-dark">
              <h3 style={{ color: '#ed8936', marginBottom: '30px', borderLeft: '4px solid #ed8936', paddingLeft: '15px' }}>Benefit Utama:</h3>
              <div style={{ display: 'grid', gap: '25px', width: '100%' }}>
                <div style={{ display: 'flex', gap: '15px' }}>
                  <span>⚡</span>
                  <div>
                    <strong style={{ color: 'white', display: 'block' }}>Advanced Cache Rules</strong>
                    <p style={{ color: '#cbd5e0', fontSize: '13.5px' }}>Menjaga server tetap stabil meski trafik melonjak tinggi.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION 3: FAQ --- */}
        <section className="ps-faq-section">
          <h2>Pertanyaan Seputar Optimasi Web</h2>
          <div className="ps-faq-item">
            <details>
              <summary className="ps-faq-label">Bagaimana cara menguji performa halaman?</summary>
              <div className="ps-faq-content">
                <p>Buka <strong>PageSpeed Insights</strong> dari Google, kemudian ketik URL halaman yang ingin diuji.</p>
              </div>
            </details>
          </div>
        </section>
      </div>

      <Footer />

      <style jsx>{`
        .ps-next-wrapper { background: #f8fafc; padding-top: 95px; padding-bottom: 50px; }
        .ps-card-stat { background: #fff; padding: 30px; border-radius: 20px; text-align: center; box-shadow: 0 10px 25px rgba(0,0,0,0.05); border: 1px solid #e2e8f0; }
        .ps-dark-box { background: rgba(255,255,255,0.05); padding: 20px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); }
        .ps-showcase-box { background: #ffffff; border-radius: 24px; border: 1px solid #e2e8f0; overflow: hidden; display: flex; flex-wrap: wrap; }
        .ps-column-content { flex: 1.2; min-width: 320px; padding: 40px 30px; }
        .ps-column-dark { flex: 1; min-width: 320px; background: #2d3748; padding: 40px; }
        .ps-badge { background: #ebf8ff; color: #2b6cb0; padding: 4px 12px; border-radius: 20px; font-size: 10px; font-weight: bold; }
        .ps-btn-main { background: #2d3748; color: white; padding: 14px 30px; border-radius: 10px; text-decoration: none; font-weight: bold; }
        .ps-faq-section { max-width: 800px; margin: 40px auto; padding: 0 20px; }
        .ps-faq-label { padding: 18px 25px; background: #fff; cursor: pointer; font-weight: 600; list-style: none; border: 1px solid #e2e8f0; border-radius: 8px; margin-bottom: 10px; }
        .ps-faq-content { padding: 20px; background: #fff; }
        @media (max-width: 768px) {
          .ps-mobile-text-center { text-align: center; }
          .ps-mobile-center { justify-content: center; }
        }
      `}</style>
    </>
  );
}
