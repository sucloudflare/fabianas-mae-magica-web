
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Link } from "react-router-dom";
import ParticleBackground from "@/components/ParticleBackground";

interface PuzzlePiece {
  id: number;
  currentPosition: number;
  correctPosition: number;
  image: string;
}

const PuzzleGame = () => {
  const [pieces, setPieces] = useState<PuzzlePiece[]>([]);
  const [moves, setMoves] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [time, setTime] = useState(0);
  const [difficulty, setDifficulty] = useState<3 | 4>(3); // 3x3 or 4x4
  
  const puzzleImage = "https://i.ibb.co/vxqVZ4cM/IMG-20250511-WA0000-1.jpg";
  
  useEffect(() => {
    if (gameStarted && !isComplete) {
      const timer = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [gameStarted, isComplete]);
  
  useEffect(() => {
    if (pieces.length > 0) {
      const allCorrect = pieces.every(piece => piece.currentPosition === piece.correctPosition);
      if (allCorrect && gameStarted) {
        setIsComplete(true);
        celebrateWin();
      }
    }
  }, [pieces, gameStarted]);
  
  const initializeGame = (diff: 3 | 4) => {
    setDifficulty(diff);
    const totalPieces = diff * diff;
    const newPieces: PuzzlePiece[] = [];
    
    // Create ordered pieces first
    for (let i = 0; i < totalPieces; i++) {
      newPieces.push({
        id: i,
        currentPosition: i,
        correctPosition: i,
        image: generatePieceImageUrl(i, diff, puzzleImage)
      });
    }
    
    // Then shuffle them
    const shuffled = [...newPieces];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i].currentPosition, shuffled[j].currentPosition] = 
      [shuffled[j].currentPosition, shuffled[i].currentPosition];
    }
    
    // Ensure the puzzle is solvable
    if (!isPuzzleSolvable(shuffled, diff)) {
      // Swap any two pieces to make it solvable
      [shuffled[0].currentPosition, shuffled[1].currentPosition] = 
      [shuffled[1].currentPosition, shuffled[0].currentPosition];
    }
    
    setPieces(shuffled);
    setMoves(0);
    setTime(0);
    setIsComplete(false);
    setGameStarted(true);
  };
  
  // Generate the URL for a specific puzzle piece
  const generatePieceImageUrl = (index: number, size: number, imageUrl: string): string => {
    // This function would normally generate a cropped image
    // Here we're returning the full image URL which will be styled via CSS
    return imageUrl;
  };
  
  // Check if a puzzle is solvable
  const isPuzzleSolvable = (pieces: PuzzlePiece[], size: number): boolean => {
    // This is a simplified check - in a real game, you'd need a more complex algorithm
    // to determine if a 15-puzzle is solvable
    return true;
  };
  
  const handlePieceClick = (clickedPiece: PuzzlePiece) => {
    if (isComplete) return;
    
    // Find adjacent pieces that can be swapped with the clicked piece
    const adjacentPositions = getAdjacentPositions(clickedPiece.currentPosition);
    const piecesAtAdjacentPositions = pieces.filter(p => 
      adjacentPositions.includes(p.currentPosition)
    );
    
    if (piecesAtAdjacentPositions.length > 0) {
      // For simplicity, just swap with the first available adjacent piece
      const pieceToSwapWith = piecesAtAdjacentPositions[0];
      
      setPieces(currentPieces => 
        currentPieces.map(piece => {
          if (piece.id === clickedPiece.id) {
            return { ...piece, currentPosition: pieceToSwapWith.currentPosition };
          } else if (piece.id === pieceToSwapWith.id) {
            return { ...piece, currentPosition: clickedPiece.currentPosition };
          }
          return piece;
        })
      );
      
      setMoves(moves + 1);
    }
  };
  
  const getAdjacentPositions = (position: number): number[] => {
    const totalPieces = difficulty * difficulty;
    const rowSize = difficulty;
    
    const adjacentPositions: number[] = [];
    // Check above
    if (position >= rowSize) {
      adjacentPositions.push(position - rowSize);
    }
    // Check below
    if (position + rowSize < totalPieces) {
      adjacentPositions.push(position + rowSize);
    }
    // Check left (if not on left edge)
    if (position % rowSize !== 0) {
      adjacentPositions.push(position - 1);
    }
    // Check right (if not on right edge)
    if ((position + 1) % rowSize !== 0) {
      adjacentPositions.push(position + 1);
    }
    
    return adjacentPositions;
  };
  
  const celebrateWin = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    
    toast({
      title: "Parabéns! Quebra-cabeça completo!",
      description: `Você completou em ${moves} movimentos e ${formatTime(time)}.`,
      duration: 5000,
    });
  };
  
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <ParticleBackground />
      <Header />
      
      <main className="flex-grow py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-script text-center mb-8">
            <span className="magical-text">Quebra-Cabeça para Fabiana</span>
          </h1>
          
          <div className="mb-8 text-center">
            <p className="text-lg mb-4">
              Monte o quebra-cabeça para formar uma imagem especial.
            </p>
          </div>
          
          {!gameStarted ? (
            <motion.div 
              className="max-w-md mx-auto text-center p-8 bg-white rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-6">Escolha a dificuldade</h2>
              <div className="space-y-4">
                <Button 
                  onClick={() => initializeGame(3)}
                  className="button-magical w-full py-6"
                >
                  Fácil (3x3)
                </Button>
                <Button 
                  onClick={() => initializeGame(4)}
                  className="sparkle-button w-full py-6"
                >
                  Difícil (4x4)
                </Button>
              </div>
              
              <div className="mt-8">
                <img 
                  src={puzzleImage} 
                  alt="Pré-visualização do quebra-cabeça" 
                  className="w-full h-auto rounded-md opacity-80"
                />
                <p className="mt-2 text-sm text-gray-500">
                  Pré-visualização da imagem do quebra-cabeça
                </p>
              </div>
            </motion.div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-6 max-w-md mx-auto">
                <div className="bg-mothers-cream/30 p-2 rounded">
                  <p className="font-bold">{moves} movimentos</p>
                </div>
                <div className="bg-mothers-cream/30 p-2 rounded">
                  <p className="font-bold">{formatTime(time)}</p>
                </div>
              </div>
              
              <div className={`grid grid-cols-${difficulty} gap-1 max-w-md mx-auto bg-gray-200 p-1 rounded-lg shadow-lg`}>
                {Array.from({ length: difficulty * difficulty }).map((_, index) => {
                  const piece = pieces.find(p => p.currentPosition === index);
                  if (!piece) return null;
                  
                  const isCorrect = piece.currentPosition === piece.correctPosition;
                  
                  return (
                    <motion.div
                      key={piece.id}
                      onClick={() => handlePieceClick(piece)}
                      className={`aspect-square cursor-pointer overflow-hidden ${
                        isCorrect ? 'border-2 border-green-400' : 'border border-gray-300'
                      } ${isComplete ? 'pointer-events-none' : ''}`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div 
                        className="w-full h-full overflow-hidden"
                        style={{
                          backgroundImage: `url(${piece.image})`,
                          backgroundSize: `${difficulty * 100}%`,
                          backgroundPosition: `${(piece.id % difficulty) / (difficulty - 1) * 100}% ${Math.floor(piece.id / difficulty) / (difficulty - 1) * 100}%`
                        }}
                      />
                    </motion.div>
                  );
                })}
              </div>
              
              <div className="flex justify-center mt-8 space-x-4">
                <Button 
                  onClick={() => initializeGame(difficulty)}
                  variant="outline"
                >
                  Reiniciar
                </Button>
                
                <Button 
                  onClick={() => {
                    setGameStarted(false);
                    setIsComplete(false);
                  }}
                  variant="outline"
                >
                  Mudar Dificuldade
                </Button>
                
                <Link to="/games">
                  <Button variant="outline">Voltar para Jogos</Button>
                </Link>
              </div>
              
              {isComplete && (
                <motion.div 
                  className="mt-8 text-center bg-green-100 p-4 rounded-lg max-w-md mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <h3 className="text-xl font-bold text-green-700 mb-2">Parabéns!</h3>
                  <p>Você completou o quebra-cabeça em {moves} movimentos e {formatTime(time)}.</p>
                </motion.div>
              )}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PuzzleGame;
