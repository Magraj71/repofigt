import { Caveat, Playfair_Display, Poppins } from 'next/font/google';
import './globals.css';

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
  display: 'swap',
  weight: ['400', '600', '700'],
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '600', '700'],
});

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata = {
  title: "A Birthday Surprise for My Teacher 💜 | From Chhavi",
  description: "A heartfelt handmade digital scrapbook and surprise experience created by Chhavi for her beloved teacher.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${caveat.variable} ${playfair.variable} ${poppins.variable}`}>
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%239333ea'><path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'/></svg>"
        />
      </head>
      <body className="font-poppins bg-[#f5efff] text-slate-800 min-h-screen selection:bg-purple-200 selection:text-purple-900 antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
