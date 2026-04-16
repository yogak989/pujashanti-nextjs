import { useEffect } from 'react';

const AdUnit = ({ slot }) => {
  useEffect(() => {
    try {
      // Perintah untuk memanggil iklan saat komponen muncul di layar
      if (typeof window !== 'undefined') {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <div className="ads-container" style={{ margin: '30px 0', textAlign: 'center', minHeight: '100px' }}>
      {/* Ganti ca-pub dengan ID asli Anda */}
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-4663862602910608"
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default AdUnit;
