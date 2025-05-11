
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import ParticleBackground from '@/components/ParticleBackground';
import { useToast } from "@/hooks/use-toast";
import confetti from 'canvas-confetti';

interface WordPuzzle {
  grid: string[][];
  words: string[];
  size: number;
}

const WordGame = () => {
  const [puzzle, setPuzzle] = useState<WordPuzzle | null>(null);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [selectedCells, setSelectedCells] = useState<{ row: number, col: number }[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [puzzleComplete, setPuzzleComplete] = useState(false);
  const { toast } = useToast();

  // Words related to mothers
  const wordList = [
    'AMOR', 'CARINHO', 'CUIDADO', 'FAMILIA', 'FABIANA',
    'MAE', 'PRESENTE', 'FLORES', 'ABRACO', 'CORACAO'
  ];

  useEffect(() => {
    generatePuzzle();
  }, []);

  useEffect(() => {
    if (puzzle && foundWords.length === puzzle.words.length && !puzzleComplete) {
      setPuzzleComplete(true);
      celebrateWin();
    }
  }, [foundWords, puzzle]);

  const generatePuzzle = () => {
    const size = 12;
    const grid = Array(size).fill(null).map(() => Array(size).fill(''));
    const placedWords: string[] = [];
    const directions = [
      { dr: 0, dc: 1 },  // horizontal
      { dr: 1, dc: 0 },  // vertical
      { dr: 1, dc: 1 },  // diagonal down-right
      { dr: -1, dc: 1 }, // diagonal up-right
    ];

    // Shuffle and take a subset of words
    const shuffledWords = [...wordList].sort(() => Math.random() - 0.5).slice(0, 8);

    for (const word of shuffledWords) {
      let placed = false;
      let attempts = 0;
      const maxAttempts = 100;

      while (!placed && attempts < maxAttempts) {
        attempts++;
        
        // Choose random direction
        const direction = directions[Math.floor(Math.random() * directions.length)];
        
        // Choose random starting position
        let row = Math.floor(Math.random() * size);
        let col = Math.floor(Math.random() * size);
        
        // Check if word fits in this direction from this position
        if (
          row + direction.dr * (word.length - 1) >= 0 && 
          row + direction.dr * (word.length - 1) < size &&
          col + direction.dc * (word.length - 1) >= 0 && 
          col + direction.dc * (word.length - 1) < size
        ) {
          // Check if the word overlaps with existing words
          let canPlace = true;
          for (let i = 0; i < word.length; i++) {
            const r = row + direction.dr * i;
            const c = col + direction.dc * i;
            if (grid[r][c] !== '' && grid[r][c] !== word[i]) {
              canPlace = false;
              break;
            }
          }
          
          if (canPlace) {
            // Place the word
            for (let i = 0; i < word.length; i++) {
              const r = row + direction.dr * i;
              const c = col + direction.dc * i;
              grid[r][c] = word[i];
            }
            placed = true;
            placedWords.push(word);
          }
        }
      }
    }
    
    // Fill empty cells with random letters
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (grid[r][c] === '') {
          grid[r][c] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        }
      }
    }
    
    setPuzzle({ grid, words: placedWords, size });
    setFoundWords([]);
    setSelectedCells([]);
    setPuzzleComplete(false);
  };

  const handleMouseDown = (row: number, col: number) => {
    setSelectedCells([{ row, col }]);
    setIsDragging(true);
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (isDragging) {
      // Only allow selection in straight lines (vertical, horizontal, diagonal)
      const firstCell = selectedCells[0];
      const isValidLine = 
        row === firstCell.row || // horizontal
        col === firstCell.col || // vertical
        Math.abs(row - firstCell.row) === Math.abs(col - firstCell.col); // diagonal
      
      if (isValidLine) {
        setSelectedCells([firstCell, { row, col }]);
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    
    if (selectedCells.length === 2) {
      checkSelection();
    } else {
      setSelectedCells([]);
    }
  };

  const checkSelection = () => {
    if (!puzzle) return;
    
    const [start, end] = selectedCells;
    let word = '';
    const path: { row: number, col: number }[] = [];
    
    // Determine direction
    const dr = Math.sign(end.row - start.row);
    const dc = Math.sign(end.col - start.col);
    
    // Create path and extract word
    let currentRow = start.row;
    let currentCol = start.col;
    
    while (true) {
      path.push({ row: currentRow, col: currentCol });
      word += puzzle.grid[currentRow][currentCol];
      
      if (currentRow === end.row && currentCol === end.col) break;
      
      currentRow += dr;
      currentCol += dc;
    }
    
    // Check if found word is in the word list
    const foundWord = puzzle.words.find(w => 
      w === word || w === word.split('').reverse().join('')
    );
    
    if (foundWord && !foundWords.includes(foundWord)) {
      setFoundWords([...foundWords, foundWord]);
      
      // Celebrate finding a word
      toast({
        title: "Palavra encontrada!",
        description: `Você encontrou: ${foundWord}`,
        duration: 2000,
      });
      
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
    
    setSelectedCells([]);
  };

  const isCellSelected = (row: number, col: number) => {
    if (selectedCells.length !== 2) return false;
    
    const [start, end] = selectedCells;
    const dr = Math.sign(end.row - start.row);
    const dc = Math.sign(end.col - start.col);
    
    let currentRow = start.row;
    let currentCol = start.col;
    
    while (true) {
      if (currentRow === row && currentCol === col) return true;
      if (currentRow === end.row && currentCol === end.col) break;
      
      currentRow += dr;
      currentCol += dc;
    }
    
    return false;
  };

  const celebrateWin = () => {
    toast({
      title: "Parabéns! 🎉",
      description: "Você encontrou todas as palavras!",
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
            <span className="magical-text">Caça-Palavras</span>
          </h1>
          
          <p className="text-center mb-8">
            Encontre palavras especiais relacionadas a mães e Fabiana!
          </p>
          
          <div className="flex flex-col lg:flex-row gap-8 justify-center">
            {puzzle && (
              <>
                <div 
                  className="card-magical p-4 overflow-hidden"
                  onMouseLeave={() => {
                    setIsDragging(false);
                    setSelectedCells([]);
                  }}
                >
                  <div className="grid" style={{
                    gridTemplateColumns: `repeat(${puzzle.size}, minmax(24px, 1fr))`,
                    touchAction: 'none'
                  }}>
                    {puzzle.grid.map((row, rowIndex) => (
                      row.map((letter, colIndex) => (
                        <div
                          key={`${rowIndex}-${colIndex}`}
                          className={`
                            w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center 
                            font-bold text-sm sm:text-base select-none
                            ${isCellSelected(rowIndex, colIndex) ? 
                              'bg-mothers-pink text-white' : 
                              'bg-mothers-cream/20'
                            }
                            ${foundWords.some(word => {
                              // Check if this cell is part of a found word
                              for (let i = 0; i < word.length; i++) {
                                for (let dr = -1; dr <= 1; dr++) {
                                  for (let dc = -1; dc <= 1; dc++) {
                                    if (dr === 0 && dc === 0) continue;
                                    
                                    let valid = true;
                                    for (let j = 0; j < word.length; j++) {
                                      const r = rowIndex - i * dr + j * dr;
                                      const c = colIndex - i * dc + j * dc;
                                      
                                      if (
                                        r < 0 || r >= puzzle.size || 
                                        c < 0 || c >= puzzle.size || 
                                        puzzle.grid[r][c] !== word[j]
                                      ) {
                                        valid = false;
                                        break;
                                      }
                                    }
                                    
                                    if (valid) {
                                      const r = rowIndex - i * dr;
                                      const c = colIndex - i * dc;
                                      
                                      if (r === rowIndex && c === colIndex) {
                                        return true;
                                      }
                                    }
                                  }
                                }
                              }
                              return false;
                            }) ? 'bg-mothers-gold/50 text-mothers-purple' : ''
                            }
                            border border-white/10 m-[1px] rounded-sm
                            transition-colors duration-200
                          `}
                          onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                          onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                          onMouseUp={handleMouseUp}
                          onTouchStart={() => handleMouseDown(rowIndex, colIndex)}
                          onTouchMove={(e) => {
                            const touch = e.touches[0];
                            const element = document.elementFromPoint(touch.clientX, touch.clientY);
                            const cellPosition = element?.getAttribute('data-position');
                            if (cellPosition) {
                              const [row, col] = cellPosition.split('-').map(Number);
                              handleMouseEnter(row, col);
                            }
                          }}
                          onTouchEnd={handleMouseUp}
                          data-position={`${rowIndex}-${colIndex}`}
                        >
                          {letter}
                        </div>
                      ))
                    ))}
                  </div>
                </div>
                
                <div className="card-magical p-6">
                  <h2 className="text-lg font-bold mb-4">Palavras para encontrar:</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {puzzle.words.map((word, index) => (
                      <div 
                        key={index}
                        className={`px-3 py-2 rounded-md ${
                          foundWords.includes(word) 
                            ? 'bg-mothers-gold/30 line-through text-mothers-purple' 
                            : 'bg-mothers-cream/20'
                        }`}
                      >
                        {word}
                      </div>
                    ))}
                  </div>
                  
                  {puzzleComplete && (
                    <div className="mt-6 text-center">
                      <div className="text-xl font-script mb-4 magical-text">
                        Parabéns! Você encontrou todas as palavras!
                      </div>
                      <Button onClick={generatePuzzle} className="button-magical">
                        Novo Jogo
                      </Button>
                    </div>
                  )}
                  
                  <div className="mt-6 text-center">
                    <Button onClick={generatePuzzle} className="sparkle-button">
                      Novo Caça-Palavras
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
          
          <div className="text-center mt-8">
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

export default WordGame;
