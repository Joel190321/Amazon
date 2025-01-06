import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import HomeContent from './components/HomeContent';

export default function Home() {
  return (
    <div className="min-h-screen ">
      <Navbar />
      <HeroSection />
      <HomeContent />
    </div>
  );
}

