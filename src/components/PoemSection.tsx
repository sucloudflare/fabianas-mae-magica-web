
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';

const poems = [
  {
    title: "Mãe, Maravilha da Vida",
    content: `Mãe, palavra pequena,
Significado grandioso,
Um amor sem limites,
Um cuidado primoroso.

Fabiana, mãe querida,
Exemplo de doação,
Seu sorriso ilumina
E aquece meu coração.`
  },
  {
    title: "Jardim de Amor",
    content: `No jardim do seu amor
Cresço forte e confiante,
Suas palavras são sol,
Seu carinho é constante.

Fabiana, mãe amada,
Em você encontro paz,
Sua força me inspira,
Seu exemplo me traz.`
  },
  {
    title: "Amor Eterno",
    content: `De todos os amores do mundo,
O seu é o mais profundo,
Fabiana, mãe maravilhosa,
Sua alma é tão bondosa.

Nos momentos de alegria,
Ou quando a tristeza consome,
Seu amor é meu abrigo,
Seu colo é meu lar, meu nome.`
  }
];

const PoemSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  return (
    <section className="py-16 bg-gradient-to-b from-mothers-cream/50 to-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-script text-center mb-8">
          <span className="magical-text">Poemas para Fabiana</span>
        </h2>
        
        <div className="max-w-2xl mx-auto">
          <div className="relative mb-8">
            <Card className="card-magical p-8 min-h-[300px] flex flex-col items-center justify-center">
              <h3 className="text-2xl font-script text-mothers-purple mb-4">{poems[activeIndex].title}</h3>
              <p className="whitespace-pre-line text-center">{poems[activeIndex].content}</p>
              
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {poems.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === activeIndex ? 'bg-mothers-purple' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </Card>
          </div>
          
          <div className="text-center">
            <p className="italic text-gray-600">
              "Um poema é um abraço para a alma"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PoemSection;
