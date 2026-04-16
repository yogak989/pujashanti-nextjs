export default function Footer() {
  return (
    <>
      {/* SECTION NORTON / SAFETY */}
      <section className="norton-safety">
        <div className="safety-content">
          <a 
            href="https://safeweb.norton.com/report/show?url=pujashanti.web.id" 
            target="_blank" 
            rel="nofollow noopener"
            style={{ display: 'inline-block' }}
          >
            <img 
              src="https://pujashanti.web.id/wp-content/uploads/2026/04/images-1.webp" 
              alt="Norton Safe Web Verified" 
              style={{ 
                width: '120px', 
                height: 'auto', 
                filter: 'grayscale(20%)',
                display: 'block',
                margin: '0 auto' 
              }} 
              loading="lazy" 
            />
          </a>
          <p className="verified-text">✓ SITE VERIFIED SAFE</p>
        </div>
      </section>

      {/* NEW: INFO BOX GRID (Next.js & WordPress) */}
      <section className="ps-engine-info">
        <div className="info-box-grid">
          <div className="info-box-item">
            <span className="info-label">Framework</span>
            <h4 className="info-value">Built with <strong>Next.js</strong></h4>
          </div>
          <div className="info-divider"></div>
          <div className="info-box-item">
            <span className="info-label">Backend</span>
            <h4 className="info-value">Powered by <strong>WordPress</strong></h4>
          </div>
        </div>
      </section>

      {/* MAIN FOOTER */}
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
            <p>&copy; {new Date().getFullYear()} PujaShanti. Made with ❤️ in Bali. Semua hak cipta dilindungi.</p>
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
        }
        
        .safety-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
        }

        .verified-text {
          font-size: 10px;
          color: #006400;
          font-weight: bold;
          margin-top: 8px;
          text-align: center;
        }

        /* NEW ENGINE INFO BOX */
        .ps-engine-info {
          max-width: 1140px;
          margin: 0 auto 40px;
          padding: 0 20px;
        }
        .info-box-grid {
          display: flex;
          align-items: center;
          justify-content: center;
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 25px;
          gap: 20px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
        }
        .info-box-item {
          flex: 1;
          text-align: center;
        }
        .info-label {
          display: block;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #64748b;
          margin-bottom: 5px;
        }
        .info-value {
          margin: 0;
          font-size: 1rem;
          color: #1e293b;
          font-weight: 400;
        }
        .info-divider {
          width: 1px;
          height: 30px;
          background: #e2e8f0;
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
          .info-divider { display: none; }
          .info-box-grid { flex-direction: column; gap: 15px; }
          .norton-safety { margin-top: 30px; padding: 20px 0; }
        }
      `}</style>
    </>
  );
}
