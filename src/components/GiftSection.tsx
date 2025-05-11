
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";

interface Gift {
  id: number;
  message: string;
}

const gifts: Gift[] = [
  { id: 1, message: "Um abraço virtual cheio de carinho! ❤️" },
  { id: 2, message: "Um dia de descanso merecido!" },
  { id: 3, message: "Um buquê de flores para iluminar seu dia! 💐" },
  { id: 4, message: "Uma estrela no céu com seu nome! ✨" },
  { id: 5, message: "Um café da manhã na cama! ☕" },
  { id: 6, message: "Uma massagem relaxante!" },
  { id: 7, message: "Um banho de espuma com pétalas de rosa! 🌹" },
  { id: 8, message: "Um livro especial para seus momentos de descanso! 📚" },
  { id: 9, message: "Um álbum de fotografias para recordar momentos especiais! 📸" }
];

const GiftSection: React.FC = () => {
  const [openedGifts, setOpenedGifts] = useState<number[]>([]);
  const { toast } = useToast();
  
  const handleOpenGift = (gift: Gift) => {
    if (!openedGifts.includes(gift.id)) {
      setOpenedGifts([...openedGifts, gift.id]);
      
      toast({
        title: "Surpresa!",
        description: gift.message,
        duration: 5000,
      });
      
      // Add sparkle effect to the page
      const sparkle = document.createElement('div');
      sparkle.innerHTML = '✨';
      sparkle.style.position = 'fixed';
      sparkle.style.top = `${Math.random() * 100}%`;
      sparkle.style.left = `${Math.random() * 100}%`;
      sparkle.style.fontSize = '2rem';
      sparkle.style.color = '#FFD700';
      sparkle.style.zIndex = '9999';
      sparkle.style.pointerEvents = 'none';
      sparkle.style.animation = 'sparkle 1s forwards';
      
      document.body.appendChild(sparkle);
      
      setTimeout(() => {
        document.body.removeChild(sparkle);
      }, 1000);
    }
  };
  
  return (
    <section className="py-16 bg-gradient-to-b from-white to-mothers-cream/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-script text-center mb-12">
          <span className="magical-text">Presentes Mágicos</span>
        </h2>
        
        <div className="max-w-3xl mx-auto">
          <p className="text-center mb-10">
            Clique nas caixas para revelar presentes especiais para Fabiana!
          </p>
          
          <div className="grid grid-cols-3 md:grid-cols-3 gap-6 justify-items-center">
            {gifts.map((gift) => (
              <div 
                key={gift.id}
                onClick={() => handleOpenGift(gift)}
                className={`gift-box ${openedGifts.includes(gift.id) ? 'bg-mothers-gold/50' : ''}`}
              >
                {openedGifts.includes(gift.id) && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl">🎁</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GiftSection;
