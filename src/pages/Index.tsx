
import React, { useEffect } from 'react';
import ParticleBackground from '@/components/ParticleBackground';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroBanner from '@/components/HeroBanner';
import FeatureSection from '@/components/FeatureSection';
import PoemSection from '@/components/PoemSection';
import GiftSection from '@/components/GiftSection';
import GamePreview from '@/components/GamePreview';

const Index = () => {
  useEffect(() => {
    // Set page title
    document.title = "Feliz Dia das Mães - Fabiana";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <ParticleBackground />
      <Header />
      
      <main className="flex-grow">
        <HeroBanner />
        <FeatureSection />
        <PoemSection />
        <GiftSection />
        <GamePreview />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
