import { useEffect } from 'react';

export default function AdUnit({ slot }) {
  useEffect(() => {
    // Fungsi untuk memuat script AdSense secara dinamis
    const loadAdSense = () => {
      if (window.adsenseLoaded) return; // Mencegah pemuatan ganda

      const script = document.createElement('script');
      script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4663862602910608"; // GANTI DENGAN ID ANDA
      script.async = true;
      script.crossOrigin = "anonymous";
      document.head.appendChild(script);
      
      window.adsenseLoaded = true;
      console.log("AdSense loaded after delay/interaction");
    };

    // Strategi: Delay 5 detik ATAU muat saat user scroll
    const delayTimer = setTimeout(loadAdSense, 5000);

    const onInteraction = () => {
      loadAdSense();
      clearTimeout(delayTimer);
      // Hapus event listener setelah dijalankan sekali
      window.removeEventListener('scroll', onInteraction);
      window.removeEventListener('mousemove', onInteraction);
      window.removeEventListener('touchstart', onInteraction);
    };

    window.addEventListener('scroll', onInteraction);
    window.addEventListener('mousemove', onInteraction);
    window.addEventListener('touchstart', onInteraction);

    // Inisialisasi unit iklan (push iklan ke slot)
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error:", e);
    }

    return () => {
      clearTimeout(delayTimer);
      window.removeEventListener('scroll', onInteraction);
      window.removeEventListener('mousemove', onInteraction);
      window.removeEventListener('touchstart', onInteraction);
    };
  }, []);

  return (
    <div style={{ overflow: 'hidden', textAlign: 'center', margin: '20px 0' }}>
      <ins className="adsbygoogle"
           style={{ display: 'block' }}
           data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // GANTI DENGAN ID ANDA
           data-ad-slot={slot}
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
    </div>
  );
}
