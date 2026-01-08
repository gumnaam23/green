import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'GreenEarth Pakistan - Planting Trees, Growing Futures',
  description: 'Join GreenEarth Pakistan in planting millions of trees across Pakistan. Combat climate change, create jobs, and build a sustainable future through tree plantation drives.',
  keywords: 'tree plantation, environment, Pakistan, climate change, NGO, volunteer, donate trees',
  authors: [{ name: 'GreenEarth Pakistan' }],
  openGraph: {
    title: 'GreenEarth Pakistan - Planting Trees, Growing Futures',
    description: 'Join us in planting millions of trees across Pakistan',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white`}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}