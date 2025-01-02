import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import HomeContent from './components/HomeContent';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-50 to-gray-100">
      <Navbar />
      <HeroSection />
      <HomeContent />
    </div>
  );
}

