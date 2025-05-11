
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HeroBanner: React.FC = () => {
  return (
    <div className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-mothers-cream to-white">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-[10%] text-4xl animate-float">❤️</div>
        <div className="absolute top-40 left-[80%] text-4xl animate-float-delay-1">💐</div>
        <div className="absolute top-60 left-[20%] text-4xl animate-float-delay-2">✨</div>
        <div className="absolute top-80 left-[70%] text-4xl animate-float-delay-3">🌸</div>
        <div className="absolute bottom-20 left-[30%] text-4xl animate-float">💖</div>
        <div className="absolute bottom-40 left-[60%] text-4xl animate-float-delay-2">🎁</div>
      </div>
      
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-script text-5xl md:text-7xl font-bold mb-6">
            <span className="magical-text animate-pulse">Feliz Dia das Mães</span>
          </h1>
          
          <div className="photo-frame inline-block mb-8">
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" 
              alt="Fabiana" 
              className="w-64 h-64 object-cover rounded"
            />
          </div>
          
          <h2 className="text-3xl font-script text-mothers-purple mb-4">Para Fabiana</h2>
          
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Uma homenagem cheia de carinho e amor para a mãe mais especial do mundo.
            Um site com surpresas, jogos, poemas e muito mais!
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/surprises">
              <Button className="button-magical">
                Abrir Surpresas
              </Button>
            </Link>
            <Link to="/games">
              <Button className="sparkle-button">
                Jogar Agora
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
