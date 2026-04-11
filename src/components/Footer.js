export default function Footer() {
  const year = new Date().getFullYear();
  
  return (
    <footer style={{ marginTop: '50px', padding: '30px 0', borderTop: '1px solid #eee', textAlign: 'center' }}>
      <div className="container">
        <p>&copy; {year} <strong>PujaShanti Web Design</strong></p>
        <p style={{ fontSize: '14px', color: '#666' }}>
          Melayani Jasa Desain Web & Optimasi SEO dengan sepenuh hati.
        </p>
        <div style={{ marginTop: '10px' }}>
          <small>Powered by Next.js & Headless WordPress</small>
        </div>
      </div>
    </footer>
  );
}
