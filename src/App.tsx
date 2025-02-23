import React, { useEffect, useState } from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import appBarLogo from './logo/tech2.png';
import techLogo from './logo/tech1.png';
import homeLogo from './logo/tech.png';
import ImageGallery from './components/ImageGallery';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const App: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [showNav, setShowNav] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);

    const targetDate = new Date('March 05, 2025 00:00:00').getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      
      if (difference < 0) {
        clearInterval(interval);
        return;
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }
      lastScrollY = window.scrollY;
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black relative">
        <div className="relative flex items-center justify-center">
          <img src={homeLogo} alt="Loading" className="w-56 h-auto animate-pulse" />
          <div className="absolute w-64 h-64 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-black text-white overflow-x-hidden flex flex-col items-center justify-center">
      <Toaster position="top-right" />
      
      <nav className={`fixed top-0 left-0 w-full z-10 px-6 py-4 flex items-center justify-between transition-transform duration-300 ${showNav ? 'translate-y-0' : '-translate-y-full'}`}>
        <img src={appBarLogo} alt="Tech Logo" className="h-10" />
        <img src={techLogo} alt="Tech1 Logo" className="h-24" />
      </nav>

      <div className="relative container mx-auto px-6 pt-32 pb-24 text-center w-full flex flex-col items-center justify-center">
        <img 
          src={homeLogo} 
          alt="TECH-A-THON" 
          className="max-w-md mx-auto w-full h-auto mb-6" 
        />
        <p className="text-xl md:text-2xl text-gray-200 mb-12">Where Innovation Meets Opportunity</p>
        
        <div className="relative bg-white bg-opacity-10 backdrop-blur-md rounded-lg shadow-lg p-6 inline-block overflow-hidden w-full max-w-4xl flex flex-col justify-center items-center">
          <div className="grid grid-cols-4 gap-4 text-center text-xl font-semibold relative w-full">
            {Object.entries(timeLeft).map(([label, value]) => (
              <div key={label} className="p-4 bg-black bg-opacity-50 rounded-lg w-full">
                <div className="text-5xl">{value}</div>
                <div className="text-sm capitalize">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 text-lg">
            <Calendar className="text-gray-300" />
            <span>March 5, 2025</span>
          </div>
          <div className="flex items-center gap-2 text-lg">
            <MapPin className="text-gray-300" />
            <span>SRM University, Trichy</span>
          </div>
          <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition">Register Now</button>
        </div>
      </div>
      
      <ImageGallery />

      <div className="bg-gray-900 text-white w-full py-12 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">About Us</h2>
        <p className="max-w-2xl mx-auto text-gray-300">TECH-A-THON is an innovative tech event where bright minds collaborate, compete, and create solutions to real-world problems. Join us for an exciting experience of learning, networking, and showcasing your skills.</p>
      </div>
    </div>
  );
};

export default App;
