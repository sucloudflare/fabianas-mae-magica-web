
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface Game {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const games: Game[] = [
  {
    id: "memory",
    title: "Jogo da Memória",
    description: "Encontre os pares de cartões com temas sobre mães.",
    icon: "🧩"
  },
  {
    id: "quiz",
    title: "Quiz da Mamãe",
    description: "Teste seus conhecimentos sobre o dia das mães.",
    icon: "❓"
  },
  {
    id: "puzzle",
    title: "Quebra-Cabeça",
    description: "Monte uma imagem especial da Fabiana.",
    icon: "🧩"
  },
  {
    id: "wordgame",
    title: "Caça-Palavras",
    description: "Encontre palavras especiais sobre mães.",
    icon: "📝"
  }
];

const GamePreview: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-mothers-cream/50 to-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-script text-center mb-12">
          <span className="magical-text">Jogos Especiais</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {games.map((game) => (
            <Card 
              key={game.id}
              className="card-magical overflow-hidden transition-transform hover:scale-105"
            >
              <div className="p-6 text-center">
                <div className="text-4xl mb-3">{game.icon}</div>
                <h3 className="font-bold text-xl mb-2">{game.title}</h3>
                <p className="text-gray-600 mb-4 text-sm">{game.description}</p>
                <Link to={`/games/${game.id}`}>
                  <Button className="sparkle-button w-full">Jogar</Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Link to="/games">
            <Button className="button-magical">
              Ver Todos os Jogos
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GamePreview;
