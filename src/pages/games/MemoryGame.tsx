
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import ParticleBackground from '@/components/ParticleBackground';
import { useToast } from "@/hooks/use-toast";
import confetti from 'canvas-confetti';

interface Card {
  id: number;
  content: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const MemoryGame = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);
  const [gameComplete, setGameComplete] = useState<boolean>(false);
  const { toast } = useToast();
  
  const cardContents = [
    '❤️', '🌸', '🎁', '💐', 
    '🌹', '💖', '✨', '🌷'
  ];
  
  useEffect(() => {
    initializeGame();
  }, []);
  
  useEffect(() => {
    if (matchedPairs === cardContents.length) {
      setGameComplete(true);
      celebrateWin();
    }
  }, [matchedPairs]);
  
  const initializeGame = () => {
    // Create pairs of cards
    const duplicatedCards = [...cardContents, ...cardContents];
    
    // Shuffle cards
    const shuffledCards = duplicatedCards
      .sort(() => Math.random() - 0.5)
      .map((content, index) => ({
        id: index,
        content,
        isFlipped: false,
        isMatched: false
      }));
      
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedPairs(0);
    setMoves(0);
    setGameComplete(false);
  };
  
  const handleCardClick = (cardId: number) => {
    // Ignore if card is already flipped or matched
    if (
      flippedCards.length === 2 || 
      cards[cardId].isFlipped || 
      cards[cardId].isMatched
    ) {
      return;
    }
    
    // Flip the card
    const updatedCards = [...cards];
    updatedCards[cardId].isFlipped = true;
    setCards(updatedCards);
    
    // Add card to flipped cards
    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);
    
    // Check for a match if we have two flipped cards
    if (newFlippedCards.length === 2) {
      const [firstCardId, secondCardId] = newFlippedCards;
      
      // Increment moves
      setMoves(moves + 1);
      
      // Check if the cards match
      if (cards[firstCardId].content === cards[secondCardId].content) {
        const updatedCards = [...cards];
        updatedCards[firstCardId].isMatched = true;
        updatedCards[secondCardId].isMatched = true;
        setCards(updatedCards);
        setMatchedPairs(matchedPairs + 1);
        setFlippedCards([]);
        
        toast({
          title: "Parabéns!",
          description: "Você encontrou um par!",
          duration: 2000,
        });
        
        // Small celebration for each match
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } else {
        // Cards don't match, flip them back after a delay
        setTimeout(() => {
          const updatedCards = [...cards];
          updatedCards[firstCardId].isFlipped = false;
          updatedCards[secondCardId].isFlipped = false;
          setCards(updatedCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };
  
  const celebrateWin = () => {
    toast({
      title: "Parabéns! 🎉",
      description: "Você completou o jogo da memória!",
      duration: 5000,
    });
    
    // Big celebration confetti
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    
    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
      
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 }
      });
      
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 }
      });
    }, 150);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <ParticleBackground />
      <Header />
      
      <main className="flex-grow py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-script text-center mb-6">
            <span className="magical-text">Jogo da Memória</span>
          </h1>
          
          <div className="mb-8 text-center">
            <p className="mb-3">Encontre todos os pares de símbolos sobre mães.</p>
            <div className="flex justify-center gap-8 flex-wrap">
              <div className="bg-mothers-cream/30 px-4 py-2 rounded-lg">
                <span className="font-bold">Movimentos:</span> {moves}
              </div>
              <div className="bg-mothers-cream/30 px-4 py-2 rounded-lg">
                <span className="font-bold">Pares encontrados:</span> {matchedPairs}/{cardContents.length}
              </div>
            </div>
          </div>
          
          {gameComplete ? (
            <div className="bg-gradient-to-r from-mothers-pink to-mothers-purple text-white p-6 rounded-xl max-w-2xl mx-auto mb-8 text-center">
              <h2 className="text-2xl font-script mb-4">Parabéns! 🎉</h2>
              <p className="mb-4">
                Você completou o jogo da memória com {moves} movimentos!
              </p>
              <div className="text-4xl mb-2">🏆✨❤️</div>
              <Button onClick={initializeGame} className="button-magical mr-4">
                Jogar Novamente
              </Button>
              <Link to="/games">
                <Button className="sparkle-button">
                  Outros Jogos
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-4 sm:grid-cols-4 gap-3 max-w-2xl mx-auto mb-8">
              {cards.map((card) => (
                <div 
                  key={card.id}
                  onClick={() => handleCardClick(card.id)}
                  className={`relative aspect-square cursor-pointer transition-all duration-300 transform ${
                    card.isFlipped ? 'rotate-y-180' : ''
                  } ${card.isMatched ? 'opacity-60' : ''}`}
                >
                  <div className={`absolute inset-0 backface-hidden bg-mothers-purple rounded-xl flex items-center justify-center shadow-md ${
                    card.isFlipped ? 'opacity-0' : 'opacity-100'
                  } transition-opacity duration-300`}>
                    <span className="text-xl font-bold text-white">?</span>
                  </div>
                  <div className={`absolute inset-0 backface-hidden bg-mothers-cream rounded-xl flex items-center justify-center ${
                    card.isFlipped ? 'opacity-100' : 'opacity-0'
                  } transition-opacity duration-300`}>
                    <span className="text-3xl">{card.content}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="text-center">
            <Link to="/games">
              <Button className="button-magical">
                Voltar para Jogos
              </Button>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MemoryGame;
