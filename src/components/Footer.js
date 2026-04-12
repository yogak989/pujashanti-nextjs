export default function Footer() {
  return (
    <>
      {/* SECTION NORTON / SAFETY (Sesuai HTML Pertama) */}
      <section className="norton-safety">
        <div className="safety-content">
          <a href="https://safeweb.norton.com/report/show?url=pujashanti.web.id" target="_blank" rel="nofollow noopener">
            <img 
              src="https://pujashanti.web.id/wp-content/uploads/2026/04/images-1.webp" 
              alt="Norton Safe Web Verified" 
              style={{ width: '120px', height: 'auto', filter: 'grayscale(20%)' }} 
              loading="lazy" 
            />
          </a>
          <p className="verified-text">✓ SITE VERIFIED SAFE</p>
        </div>
      </section>

      {/* MAIN FOOTER (Sesuai HTML Kedua) */}
      <footer className="ps-footer-seo">
        <div className="ps-footer-container">
          
          <div className="ps-footer-widget">
            <h3>Pujashanti WebDev</h3>
            <p>Membantu UMKM dan bisnis lokal bertransformasi ke ranah digital dengan website yang cepat, estetik, dan berorientasi pada konversi penjualan.</p>
            <div className="ps-seo-badge">⚡ Core Web Vitals Optimized</div>
          </div>

          <div className="ps-footer-widget">
            <h3>Halaman Terkait</h3>
            <ul className="ps-footer-links">
              <li><a href="https://pujashanti.web.id/webseo">Materi Web-SEO</a></li>
              <li><a href="https://pujashanti.web.id/live">Live TV</a></li>
              <li><a href="https://pujashanti.web.id/jasa-pembuatan-website/">Buat Website Murah</a></li>
              <li><a href="/hubungi-kami/">Hubungi Kami</a></li>
            </ul>
          </div>

          <div className="ps-footer-widget">
            <h3>Konsultasi Gratis</h3>
            <p>Siap meningkatkan peringkat situs Anda? Hubungi tim ahli kami via WhatsApp untuk diskusi strategi SEO Anda.</p>
            <a href="https://wa.me/6285737689037" className="ps-wa-btn">Chat WhatsApp</a>
          </div>

        </div>

        <div className="ps-footer-bottom">
          <div className="ps-footer-container">
            <p>&copy; 2026 PujaShanti. Made with ❤️ in Bali. Semua hak cipta dilindungi.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        /* SAFETY SECTION */
        .norton-safety {
          width: 100%;
          padding: 30px 0;
          background: #ffffff;
          border-top: 1px solid #f0f0f0;
          margin-top: 50px;
          text-align: center;
        }
        .verified-text {
          font-size: 10px;
          color: #006400;
          font-weight: bold;
          margin-top: 5px;
        }

        /* MAIN FOOTER WRAPPER */
        .ps-footer-seo {
          background-color: #001a33;
          color: #e2e8f0;
          padding: 60px 0 20px;
          font-family: 'Segoe UI', Roboto, sans-serif;
          border-top: 4px solid #b38b4d;
        }
        .ps-footer-container {
          max-width: 1140px;
          margin: 0 auto;
          padding: 0 20px;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 40px;
        }
        .ps-footer-widget h3 {
          color: #ffffff;
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 25px;
          position: relative;
          padding-bottom: 10px;
        }
        .ps-footer-widget h3::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 40px;
          height: 2px;
          background: #b38b4d;
        }
        .ps-footer-widget p {
          font-size: 0.95rem;
          line-height: 1.7;
          color: #cbd5e1;
        }
        .ps-footer-links {
          list-style: none;
          padding: 0;
        }
        .ps-footer-links li {
          margin-bottom: 12px;
        }
        .ps-footer-links a {
          color: #cbd5e1;
          text-decoration: none;
          font-size: 0.95rem;
          transition: all 0.3s ease;
        }
        .ps-footer-links a:hover {
          color: #ffcc00;
          padding-left: 8px;
        }
        .ps-seo-badge {
          display: inline-block;
          background: rgba(179, 139, 77, 0.15);
          border: 1px solid #b38b4d;
          color: #b38b4d;
          padding: 4px 12px;
          border-radius: 4px;
          font-size: 0.8rem;
          font-weight: 700;
          margin-top: 10px;
        }
        .ps-wa-btn {
          display: inline-block;
          margin-top: 15px;
          background: #25d366;
          color: #fff;
          padding: 10px 20px;
          border-radius: 5px;
          text-decoration: none;
          font-weight: 700;
        }
        .ps-footer-bottom {
          margin-top: 50px;
          padding-top: 20px;
          border-top: 1px solid rgba(255,255,255,0.1);
          text-align: center;
        }
        .ps-footer-bottom p {
          font-size: 0.85rem;
          color: white;
        }

        @media (max-width: 768px) {
          .ps-footer-container { text-align: center; }
          .ps-footer-widget h3::after { left: 50%; transform: translateX(-50%); }
          .ps-footer-links a:hover { padding-left: 0; }
        }
      `}</style>
    </>
  );
}
