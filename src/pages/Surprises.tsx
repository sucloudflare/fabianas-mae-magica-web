
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ParticleBackground from '@/components/ParticleBackground';
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import confetti from 'canvas-confetti';
import { Heart, Gift, Star } from 'lucide-react';

interface Surprise {
  id: number;
  title: string;
  icon: string;
  message: string;
  animation: string;
  color: string;
  sound?: string;
}

const surprises: Surprise[] = [
  {
    id: 1,
    title: "Mensagem Secreta",
    icon: "💌",
    message: "Fabiana, seu sorriso ilumina o mundo de todos ao seu redor. Continue brilhando!",
    animation: "animate-float",
    color: "from-pink-200 to-purple-200"
  },
  {
    id: 2,
    title: "Abraço Virtual",
    icon: "🤗",
    message: "Um abraço quentinho e apertado para você, Fabiana! Sinta-se envolvida por todo nosso amor.",
    animation: "animate-pulse",
    color: "from-blue-200 to-indigo-200"
  },
  {
    id: 3,
    title: "Flores para Você",
    icon: "💐",
    message: "Um buquê das mais lindas flores para a mãe mais especial do mundo!",
    animation: "animate-bounce",
    color: "from-rose-200 to-pink-200"
  },
  {
    id: 4,
    title: "Estrela Brilhante",
    icon: "⭐",
    message: "Uma estrela no céu leva seu nome, Fabiana, porque você brilha como ninguém!",
    animation: "animate-sparkle",
    color: "from-yellow-200 to-amber-200"
  },
  {
    id: 5,
    title: "Coração Cheio",
    icon: "❤️",
    message: "Seu amor nos enche de força e coragem. Nossos corações são seus para sempre!",
    animation: "animate-pulse",
    color: "from-red-200 to-rose-200"
  },
  {
    id: 6,
    title: "Surpresa Musical",
    icon: "🎵",
    message: "Uma melodia suave para embalar seus dias e trazer tranquilidade ao seu coração.",
    animation: "animate-float",
    color: "from-violet-200 to-purple-200",
    sound: "https://assets.mixkit.co/music/preview/mixkit-sweet-melodic-phrase-2313.mp3"
  },
  {
    id: 7,
    title: "Descanso Merecido",
    icon: "☕",
    message: "Um vale-presente para um dia inteiro de relaxamento e mimos que você tanto merece!",
    animation: "animate-bounce",
    color: "from-amber-200 to-orange-200"
  },
  {
    id: 8,
    title: "Recordações",
    icon: "📸",
    message: "Cada foto, cada momento com você é um tesouro guardado com carinho em nossos corações.",
    animation: "animate-float",
    color: "from-emerald-200 to-green-200"
  },
  {
    id: 9,
    title: "Momento Mágico",
    icon: "✨",
    message: "Um momento mágico para relembrar que você é incrível, Fabiana!",
    animation: "animate-sparkle",
    color: "from-purple-200 to-indigo-200"
  },
  {
    id: 10,
    title: "Chuva de Amor",
    icon: "☂️",
    message: "Uma chuva de amor e carinho cai sobre você hoje e sempre!",
    animation: "animate-bounce",
    color: "from-cyan-200 to-blue-200"
  },
  {
    id: 11,
    title: "Sonho Doce",
    icon: "🍬",
    message: "Que seus sonhos sejam doces como você, Fabiana.",
    animation: "animate-pulse",
    color: "from-pink-200 to-red-200"
  },
  {
    id: 12,
    title: "Luz da Vida",
    icon: "🕯️",
    message: "Você é a luz que ilumina nossos caminhos, mãe querida.",
    animation: "animate-float",
    color: "from-yellow-200 to-orange-200"
  }
];

const Surprises = () => {
  const [openedSurprises, setOpenedSurprises] = useState<number[]>([]);
  const [activeMessage, setActiveMessage] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const { toast } = useToast();
  const [floatingIcons, setFloatingIcons] = useState<{id: number, icon: string, left: string, top: string}[]>([]);
  
  useEffect(() => {
    // Create initial floating icons for decoration
    const icons = [];
    for (let i = 0; i < 5; i++) {
      icons.push({
        id: i,
        icon: ['🌟', '🌈', '💖', '✨', '💐'][i],
        left: `${Math.random() * 90 + 5}%`,
        top: `${Math.random() * 70 + 5}%`
      });
    }
    setFloatingIcons(icons);
  }, []);
  
  const handleOpenSurprise = (surprise: Surprise) => {
    if (!openedSurprises.includes(surprise.id)) {
      setActiveMessage(surprise.message);
      setIsAnimating(true);
      
      setTimeout(() => {
        setOpenedSurprises([...openedSurprises, surprise.id]);
        
        // Display toast with the surprise message
        toast({
          title: surprise.title,
          description: surprise.message,
          duration: 5000,
        });
        
        // Play sound if available
        if (surprise.sound) {
          const audio = new Audio(surprise.sound);
          audio.volume = 0.5;
          audio.play();
        }
        
        // Add special effect to the page - multiple floating elements
        for (let i = 0; i < 5; i++) {
          setTimeout(() => {
            addFloatingElement(surprise.icon);
          }, i * 300);
        }
        
        // Trigger confetti effect
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        
        setTimeout(() => {
          setIsAnimating(false);
          setActiveMessage(null);
        }, 3000);
      }, 300);
    }
  };
  
  const addFloatingElement = (icon: string) => {
    const element = document.createElement('div');
    element.innerHTML = icon;
    element.style.position = 'fixed';
    element.style.top = `${Math.random() * 80 + 10}%`;
    element.style.left = `${Math.random() * 80 + 10}%`;
    element.style.fontSize = '3rem';
    element.style.zIndex = '9999';
    element.style.opacity = '0';
    element.style.pointerEvents = 'none';
    element.style.transition = 'all 2s ease-out';
    
    document.body.appendChild(element);
    
    // Animate element
    setTimeout(() => {
      element.style.opacity = '1';
      element.style.transform = `translateY(-100px) rotate(${Math.random() * 360}deg)`;
    }, 10);
    
    setTimeout(() => {
      element.style.opacity = '0';
      setTimeout(() => {
        document.body.removeChild(element);
      }, 2000);
    }, 3000);
  };
  
  const triggerSupriseShower = () => {
    if (openedSurprises.length === surprises.length) {
      // Create a rain of icons
      for (let i = 0; i < 30; i++) {
        setTimeout(() => {
          const icons = ['❤️', '🎁', '🎉', '✨', '🌟', '🌸', '🌹', '💐', '🍀', '🧸'];
          addFloatingElement(icons[Math.floor(Math.random() * icons.length)]);
        }, i * 200);
      }
      
      // Big celebration confetti
      const end = Date.now() + (5 * 1000);
      
      const colors = ['#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd', '#f9bec7'];
      
      (function frame() {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors
        });
        
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors
        });
        
        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      <ParticleBackground />
      <Header />
      
      {/* Floating decoration icons */}
      {floatingIcons.map((item) => (
        <div
          key={item.id}
          className="fixed pointer-events-none z-10 text-3xl animate-float"
          style={{ 
            left: item.left, 
            top: item.top,
            animationDelay: `${item.id * 0.5}s`,
            opacity: 0.7
          }}
        >
          {item.icon}
        </div>
      ))}
      
      <main className="flex-grow py-10 relative">
        <AnimatePresence>
          {activeMessage && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
            >
              <div className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg max-w-md text-center">
                <p className="text-2xl font-script">{activeMessage}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="container mx-auto px-4">
          <motion.h1 
            className="text-4xl font-script text-center mb-6"
            animate={{ scale: [1, 1.05, 1], color: ['#FF97C2', '#9B87F5', '#FF97C2'] }}
            transition={{ duration: 5, repeat: Infinity, repeatType: 'reverse' }}
          >
            <span className="magical-text">Surpresas para Fabiana</span>
          </motion.h1>
          
          <motion.p 
            className="text-center mb-12 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Clique nos pacotes de surpresa para revelar mensagens especiais preparadas com muito carinho!
          </motion.p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {surprises.map((surprise, index) => (
              <motion.div
                key={surprise.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card 
                  className={`card-magical p-6 text-center cursor-pointer transition-all duration-500 hover:shadow-xl relative overflow-hidden ${
                    openedSurprises.includes(surprise.id) ? 
                    `bg-gradient-to-br ${surprise.color}` : ''
                  }`}
                  onClick={() => handleOpenSurprise(surprise)}
                >
                  <div className={`text-5xl mb-6 ${surprise.animation}`}>
                    {surprise.icon}
                  </div>
                  <h3 className="font-bold mb-2">{surprise.title}</h3>
                  <p className="text-sm text-gray-600">
                    {openedSurprises.includes(surprise.id) 
                      ? "Surpresa revelada!" 
                      : "Clique para revelar"}
                  </p>
                  
                  {openedSurprises.includes(surprise.id) && (
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute -top-1 -right-1 text-lg animate-ping">✨</div>
                      <div className="absolute -bottom-1 -left-1 text-lg animate-ping delay-300">✨</div>
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            {openedSurprises.length === surprises.length ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-r from-mothers-pink to-mothers-purple text-white p-8 rounded-xl max-w-2xl mx-auto"
              >
                <h2 className="text-3xl font-script mb-4">Parabéns!</h2>
                <p className="mb-6 text-lg">
                  Você descobriu todas as surpresas! Fabiana, esperamos que tenha gostado de cada uma delas.
                  Você é muito especial e merece todo o carinho do mundo!
                </p>
                <div className="flex justify-center space-x-4 text-5xl mb-4">
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 5, repeat: Infinity, ease: "linear" }}>
                    🎉
                  </motion.div>
                  <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                    ✨
                  </motion.div>
                  <motion.div animate={{ scale: [1, 1.1, 1], color: ['#FF97C2', '#9B87F5', '#FF97C2'] }} transition={{ duration: 3, repeat: Infinity }}>
                    ❤️
                  </motion.div>
                </div>
                <Button 
                  className="button-magical animate-pulse text-lg px-6 py-3"
                  onClick={triggerSupriseShower}
                >
                  <Gift className="mr-2" /> Celebrar!
                </Button>
              </motion.div>
            ) : (
              <motion.p 
                className="text-lg"
                animate={{ 
                  color: openedSurprises.length > 0 ? ['#FF97C2', '#9B87F5', '#FF97C2'] : '#000'
                }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                Ainda há {surprises.length - openedSurprises.length} surpresas a serem descobertas!
              </motion.p>
            )}
          </div>
          
          <motion.div 
            className="fixed bottom-10 right-10 z-20"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: openedSurprises.length > 0 ? 1 : 0, 
              scale: openedSurprises.length > 0 ? 1 : 0 
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-mothers-purple text-white rounded-full px-4 py-2 flex items-center shadow-lg">
              <Heart className="text-mothers-pink mr-2" fill="#FF97C2" />
              <span>{openedSurprises.length}/{surprises.length} descobertas</span>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Surprises;
