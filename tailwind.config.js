/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    // Jika Anda punya folder components di luar src, buka baris di bawah:
    // "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Anda bisa menambahkan warna khas PUJASHANTI di sini nanti
        pujashanti: {
          blue: '#0070f3',
          dark: '#1a1a1a',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // Penting untuk styling isi artikel (prose)
  ],
}
