
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import ParticleBackground from '@/components/ParticleBackground';
import { motion, MotionConfig } from 'framer-motion';

interface Poem {
  id: number;
  title: string;
  content: string;
  author: string;
}

const poems: Poem[] = [
  {
    id: 1,
    title: "Mãe, Maravilha da Vida",
    content: `Mãe, palavra pequena,
Significado grandioso,
Um amor sem limites,
Um cuidado primoroso.

Fabiana, mãe querida,
Exemplo de doação,
Seu sorriso ilumina
E aquece meu coração.

Nas horas mais difíceis,
É você quem me guia,
Seu abraço é meu porto,
Sua voz, melodia.`,
    author: "Com carinho para Fabiana"
  },
  {
    id: 2,
    title: "Jardim de Amor",
    content: `No jardim do seu amor
Cresço forte e confiante,
Suas palavras são sol,
Seu carinho é constante.

Fabiana, mãe amada,
Em você encontro paz,
Sua força me inspira,
Seu exemplo me traz.

Como flor que desabrocha,
Sob seus cuidados floresço,
Por seu amor incondicional,
Eternamente agradeço.`,
    author: "Com carinho para Fabiana"
  },
  {
    id: 3,
    title: "Amor Eterno",
    content: `De todos os amores do mundo,
O seu é o mais profundo,
Fabiana, mãe maravilhosa,
Sua alma é tão bondosa.

Nos momentos de alegria,
Ou quando a tristeza consome,
Seu amor é meu abrigo,
Seu colo é meu lar, meu nome.

Como agradecer por tudo?
Palavras não são suficientes,
Apenas digo: te amo, mãe,
Hoje e sempre, eternamente.`,
    author: "Com carinho para Fabiana"
  },
  {
    id: 4,
    title: "Coração de Mãe",
    content: `Coração de mãe é infinito,
Um universo de amor sem fim,
Fabiana, seu coração é imenso,
É um tesouro para mim.

Suas mãos que sempre cuidam,
Seus olhos que sempre veem,
Seus braços que sempre acolhem,
Seu amor que sempre provém.

Neste dia tão especial,
Celebro você com gratidão,
Por ser minha luz, minha força,
Meu exemplo, minha inspiração.`,
    author: "Com carinho para Fabiana"
  },
  {
    id: 5,
    title: "Raios de Sol",
    content: `Como raios de sol pela manhã,
Você ilumina meus dias,
Fabiana, mãe radiante,
Fonte de minhas alegrias.

Seu sorriso afasta as nuvens,
Seu abraço aquece meu ser,
Sua sabedoria me guia,
Me ensina a crescer, a viver.

No livro da minha história,
Você é o capítulo mais belo,
Te agradeço, mãe querida,
Por seu amor, seu zelo.`,
    author: "Com carinho para Fabiana"
  }
];

const Poems = () => {
  const [activePoem, setActivePoem] = useState(poems[0]);
  
  return (
    <MotionConfig>
      <div className="min-h-screen flex flex-col">
        <ParticleBackground />
        <Header />
        
        <main className="flex-grow py-10 bg-mothers-cream/20">
          <div className="container mx-auto px-4">
            <motion.h1 
              className="text-4xl font-script text-center mb-12"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="magical-text">Poemas para Fabiana</span>
            </motion.h1>
            
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-1/4">
                <Card className="card-magical p-6">
                  <h2 className="text-xl font-script mb-4 text-mothers-purple">Coleção de Poemas</h2>
                  <ul className="space-y-2">
                    {poems.map((poem) => (
                      <li key={poem.id}>
                        <button
                          onClick={() => setActivePoem(poem)}
                          className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                            activePoem.id === poem.id 
                              ? 'bg-mothers-purple text-white font-medium' 
                              : 'hover:bg-mothers-purple/10'
                          }`}
                        >
                          {poem.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
              
              <div className="lg:w-3/4">
                <Card className="card-magical p-8 min-h-[500px] relative overflow-hidden">
                  <div className="absolute top-4 right-4 text-4xl">✨</div>
                  <div className="absolute bottom-4 left-4 text-4xl">🌸</div>
                  
                  <h2 className="text-3xl font-script mb-6 text-mothers-purple">{activePoem.title}</h2>
                  
                  <div className="bg-mothers-cream/30 p-6 rounded-lg border border-mothers-pink/20 mb-6">
                    <p className="whitespace-pre-line text-lg leading-relaxed">{activePoem.content}</p>
                  </div>
                  
                  <p className="italic text-right text-gray-600">{activePoem.author}</p>
                  
                  <div className="mt-8 text-center">
                    <p className="text-mothers-purple">
                      "Palavras são pequenas para expressar um amor tão grande"
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </MotionConfig>
  );
};

export default Poems;
