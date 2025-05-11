
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import ParticleBackground from '@/components/ParticleBackground';

interface Game {
  id: string;
  title: string;
  description: string;
  icon: string;
  difficulty: 'Fácil' | 'Médio' | 'Difícil';
}

const games: Game[] = [
  {
    id: "memory",
    title: "Jogo da Memória",
    description: "Encontre os pares de cartões com temas sobre mães.",
    icon: "🧩",
    difficulty: "Fácil"
  },
  {
    id: "quiz",
    title: "Quiz da Mamãe",
    description: "Teste seus conhecimentos sobre o dia das mães.",
    icon: "❓",
    difficulty: "Médio"
  },
  {
    id: "puzzle",
    title: "Quebra-Cabeça",
    description: "Monte uma imagem especial da Fabiana.",
    icon: "🧩",
    difficulty: "Médio"
  },
  {
    id: "wordgame",
    title: "Caça-Palavras",
    description: "Encontre palavras especiais sobre mães.",
    icon: "📝",
    difficulty: "Médio"
  },
  {
    id: "matching",
    title: "Combine os Pares",
    description: "Combine mensagens com imagens sobre mães.",
    icon: "🔍",
    difficulty: "Fácil"
  },
  {
    id: "scramble",
    title: "Desembaralhe",
    description: "Desembaralhe as palavras relacionadas às mães.",
    icon: "🔤",
    difficulty: "Difícil"
  },
  {
    id: "hangman",
    title: "Jogo da Forca",
    description: "Adivinhe as palavras relacionadas à maternidade.",
    icon: "📋",
    difficulty: "Difícil"
  },
  {
    id: "trivia",
    title: "Trivia Maternal",
    description: "Responda perguntas sobre curiosidades do mundo materno.",
    icon: "🎯",
    difficulty: "Médio"
  }
];

const Games = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <ParticleBackground />
      <Header />
      
      <main className="flex-grow py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-script text-center mb-12">
            <span className="magical-text">Jogos para Fabiana</span>
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {games.map((game) => (
              <Card 
                key={game.id}
                className="card-magical overflow-hidden transition-transform hover:scale-105"
              >
                <div className="p-6 text-center">
                  <div className="text-4xl mb-3">{game.icon}</div>
                  <h3 className="font-bold text-xl mb-2">{game.title}</h3>
                  <p className="text-gray-600 mb-2 text-sm">{game.description}</p>
                  <div className="mb-4 text-xs">
                    <span className={`inline-block px-2 py-1 rounded-full ${
                      game.difficulty === 'Fácil' ? 'bg-green-100 text-green-700' : 
                      game.difficulty === 'Médio' ? 'bg-yellow-100 text-yellow-700' : 
                      'bg-red-100 text-red-700'
                    }`}>
                      {game.difficulty}
                    </span>
                  </div>
                  <Link to={`/games/${game.id}`}>
                    <Button className="sparkle-button w-full">Jogar</Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-lg mb-4">
              Jogue para ganhar pontos e desbloquear surpresas especiais para Fabiana!
            </p>
            <Link to="/">
              <Button className="button-magical">
                Voltar para o Início
              </Button>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Games;
