
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ParticleBackground from '@/components/ParticleBackground';
import { useToast } from "@/hooks/use-toast";

interface Surprise {
  id: number;
  title: string;
  icon: string;
  message: string;
  animation: string;
}

const surprises: Surprise[] = [
  {
    id: 1,
    title: "Mensagem Secreta",
    icon: "💌",
    message: "Fabiana, seu sorriso ilumina o mundo de todos ao seu redor. Continue brilhando!",
    animation: "animate-float"
  },
  {
    id: 2,
    title: "Abraço Virtual",
    icon: "🤗",
    message: "Um abraço quentinho e apertado para você, Fabiana! Sinta-se envolvida por todo nosso amor.",
    animation: "animate-pulse"
  },
  {
    id: 3,
    title: "Flores para Você",
    icon: "💐",
    message: "Um buquê das mais lindas flores para a mãe mais especial do mundo!",
    animation: "animate-bounce"
  },
  {
    id: 4,
    title: "Estrela Brilhante",
    icon: "⭐",
    message: "Uma estrela no céu leva seu nome, Fabiana, porque você brilha como ninguém!",
    animation: "animate-sparkle"
  },
  {
    id: 5,
    title: "Coração Cheio",
    icon: "❤️",
    message: "Seu amor nos enche de força e coragem. Nossos corações são seus para sempre!",
    animation: "animate-pulse"
  },
  {
    id: 6,
    title: "Surpresa Musical",
    icon: "🎵",
    message: "Uma melodia suave para embalar seus dias e trazer tranquilidade ao seu coração.",
    animation: "animate-float"
  },
  {
    id: 7,
    title: "Descanso Merecido",
    icon: "☕",
    message: "Um vale-presente para um dia inteiro de relaxamento e mimos que você tanto merece!",
    animation: "animate-bounce"
  },
  {
    id: 8,
    title: "Recordações",
    icon: "📸",
    message: "Cada foto, cada momento com você é um tesouro guardado com carinho em nossos corações.",
    animation: "animate-float"
  }
];

const Surprises = () => {
  const [openedSurprises, setOpenedSurprises] = useState<number[]>([]);
  const { toast } = useToast();
  
  const handleOpenSurprise = (surprise: Surprise) => {
    if (!openedSurprises.includes(surprise.id)) {
      setOpenedSurprises([...openedSurprises, surprise.id]);
      
      toast({
        title: surprise.title,
        description: surprise.message,
        duration: 5000,
      });
      
      // Add special effect to the page
      const element = document.createElement('div');
      element.innerHTML = surprise.icon;
      element.style.position = 'fixed';
      element.style.top = `${Math.random() * 80 + 10}%`;
      element.style.left = `${Math.random() * 80 + 10}%`;
      element.style.fontSize = '3rem';
      element.style.zIndex = '9999';
      element.style.pointerEvents = 'none';
      element.className = surprise.animation;
      
      document.body.appendChild(element);
      
      setTimeout(() => {
        document.body.removeChild(element);
      }, 3000);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <ParticleBackground />
      <Header />
      
      <main className="flex-grow py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-script text-center mb-6">
            <span className="magical-text">Surpresas para Fabiana</span>
          </h1>
          
          <p className="text-center mb-12 max-w-xl mx-auto">
            Clique nos pacotes de surpresa para revelar mensagens especiais preparadas com muito carinho!
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {surprises.map((surprise) => (
              <Card 
                key={surprise.id}
                className={`card-magical p-6 text-center cursor-pointer transition-all duration-300 hover:scale-105 ${
                  openedSurprises.includes(surprise.id) ? 'bg-gradient-to-br from-mothers-pink/20 to-mothers-purple/20' : ''
                }`}
                onClick={() => handleOpenSurprise(surprise)}
              >
                <div className={`text-4xl mb-4 ${surprise.animation}`}>
                  {surprise.icon}
                </div>
                <h3 className="font-bold mb-2">{surprise.title}</h3>
                <p className="text-sm text-gray-600">
                  {openedSurprises.includes(surprise.id) 
                    ? "Surpresa revelada!" 
                    : "Clique para revelar"}
                </p>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            {openedSurprises.length === surprises.length ? (
              <div className="bg-gradient-to-r from-mothers-pink to-mothers-purple text-white p-6 rounded-xl max-w-2xl mx-auto">
                <h2 className="text-2xl font-script mb-4">Parabéns!</h2>
                <p className="mb-4">
                  Você descobriu todas as surpresas! Fabiana, esperamos que tenha gostado de cada uma delas.
                  Você é muito especial e merece todo o carinho do mundo!
                </p>
                <div className="text-4xl mb-2">🎉✨❤️</div>
              </div>
            ) : (
              <p className="text-lg">
                Ainda há {surprises.length - openedSurprises.length} surpresas a serem descobertas!
              </p>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Surprises;
