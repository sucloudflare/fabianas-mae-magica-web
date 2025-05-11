import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Link } from "react-router-dom";
import ParticleBackground from "@/components/ParticleBackground";

interface Word {
  original: string;
  scrambled: string;
  hint: string;
  isCorrect: boolean;
}

const words: Word[] = [
  { 
    original: "CARINHO", 
    scrambled: "", 
    hint: "Demonstração de afeto que as mães sempre nos dão",
    isCorrect: false 
  },
  { 
    original: "ACONCHEGO", 
    scrambled: "", 
    hint: "Sensação de conforto que sentimos no colo materno",
    isCorrect: false 
  },
  { 
    original: "DEDICAÇÃO", 
    scrambled: "", 
    hint: "Empenho que as mães têm pelos filhos",
    isCorrect: false 
  },
  { 
    original: "SABEDORIA", 
    scrambled: "", 
    hint: "Conhecimento que as mães compartilham conosco",
    isCorrect: false 
  },
  { 
    original: "PACIÊNCIA", 
    scrambled: "", 
    hint: "Virtude que toda mãe aprende a ter",
    isCorrect: false 
  },
  { 
    original: "PROTEÇÃO", 
    scrambled: "", 
    hint: "O que as mães sempre nos oferecem contra qualquer perigo",
    isCorrect: false 
  },
  { 
    original: "GRATIDÃO", 
    scrambled: "", 
    hint: "O que sentimos por tudo que nossas mães fazem",
    isCorrect: false 
  },
  { 
    original: "FAMÍLIA", 
    scrambled: "", 
    hint: "Grupo ao qual pertencemos graças à nossa mãe",
    isCorrect: false 
  }
];

const ScrambleGame = () => {
  const [gameWords, setGameWords] = useState<Word[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [showHint, setShowHint] = useState(false);
  
  useEffect(() => {
    if (gameStarted && currentIndex >= gameWords.length) {
      endGame();
    }
  }, [currentIndex, gameWords.length, gameStarted]);
  
  const scrambleWord = (word: string): string => {
    const characters = word.split('');
    let scrambled = '';
    
    // Keep scrambling until we get a result different from the original
    do {
      for (let i = characters.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [characters[i], characters[j]] = [characters[j], characters[i]];
      }
      scrambled = characters.join('');
    } while (scrambled === word);
    
    return scrambled;
  };
  
  const startGame = () => {
    // Scramble all words and select 5 random ones
    const shuffledWords = [...words]
      .map(word => ({
        ...word,
        scrambled: scrambleWord(word.original),
        isCorrect: false
      }))
      .sort(() => Math.random() - 0.5)
      .slice(0, 5);
    
    setGameWords(shuffledWords);
    setCurrentIndex(0);
    setScore(0);
    setAttempts(0);
    setUserInput("");
    setGameStarted(true);
    setGameFinished(false);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value.toUpperCase());
  };
  
  const checkAnswer = () => {
    if (userInput.trim() === "") return;
    
    setAttempts(attempts + 1);
    const currentWord = gameWords[currentIndex];
    
    if (userInput.toUpperCase() === currentWord.original) {
      // Correct answer
      setScore(score + 1);
      
      const updatedWords = [...gameWords];
      updatedWords[currentIndex] = {
        ...currentWord,
        isCorrect: true
      };
      
      setGameWords(updatedWords);
      
      toast({
        title: "Correto!",
        description: "Você acertou a palavra!",
        duration: 2000,
      });
      
      // Small celebration
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.6 }
      });
      
      // Move to next word
      setCurrentIndex(currentIndex + 1);
      setUserInput("");
      setShowHint(false);
    } else {
      // Wrong answer
      toast({
        title: "Incorreto",
        description: "Tente novamente!",
        variant: "destructive",
        duration: 2000,
      });
    }
  };
  
  const skipWord = () => {
    toast({
      title: "Palavra pulada",
      description: `A resposta correta era: ${gameWords[currentIndex].original}`,
      duration: 2000,
    });
    
    setCurrentIndex(currentIndex + 1);
    setUserInput("");
    setShowHint(false);
  };
  
  const showHintForWord = () => {
    setShowHint(true);
  };
  
  const endGame = () => {
    setGameFinished(true);
    
    if (score === gameWords.length) {
      // Perfect score
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      
      toast({
        title: "Parabéns!",
        description: "Você acertou todas as palavras!",
        duration: 4000,
      });
    } else {
      // Not perfect but finished
      toast({
        title: "Jogo finalizado!",
        description: `Você acertou ${score} de ${gameWords.length} palavras!`,
        duration: 3000,
      });
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <ParticleBackground />
      <Header />
      
      <main className="flex-grow py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-script text-center mb-8">
            <span className="magical-text">Desembaralhe as Palavras</span>
          </h1>
          
          <div className="mb-8 text-center">
            <p className="text-lg mb-4">
              Descubra as palavras relacionadas às mães que estão embaralhadas.
            </p>
          </div>
          
          {!gameStarted ? (
            <motion.div 
              className="max-w-md mx-auto text-center p-8 bg-white rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-6">Desembaralhe as Palavras</h2>
              <p className="mb-8">
                Neste jogo, você precisa descobrir palavras relacionadas ao Dia das Mães
                que estão com as letras embaralhadas. Teste sua habilidade!
              </p>
              
              <Button 
                onClick={startGame}
                className="button-magical w-full py-6"
              >
                Começar Jogo
              </Button>
            </motion.div>
          ) : gameFinished ? (
            <motion.div 
              className="max-w-md mx-auto text-center p-8 bg-white rounded-lg shadow-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-4">Jogo Finalizado!</h2>
              <p className="text-xl mb-6">
                Sua pontuação: {score} de {gameWords.length}
              </p>
              
              <div className="space-y-4 mb-8">
                {gameWords.map((word, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span>{word.original}</span>
                    <span className={word.isCorrect ? "text-green-500" : "text-red-500"}>
                      {word.isCorrect ? "✓" : "✗"}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-center space-x-4">
                <Button 
                  onClick={startGame}
                  className="button-magical"
                >
                  Jogar Novamente
                </Button>
                
                <Link to="/games">
                  <Button variant="outline">Voltar para Jogos</Button>
                </Link>
              </div>
            </motion.div>
          ) : (
            <div className="max-w-md mx-auto">
              <Card className="p-6">
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm">Palavra {currentIndex + 1} de {gameWords.length}</span>
                    <span className="text-sm font-bold">Pontuação: {score}</span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-mothers-purple h-2.5 rounded-full" 
                      style={{ width: `${((currentIndex) / gameWords.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="text-center mb-8">
                  <motion.h2 
                    className="text-4xl font-bold mb-4 tracking-wide"
                    key={currentIndex} // Forces re-animation when word changes
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {gameWords[currentIndex]?.scrambled}
                  </motion.h2>
                  
                  {showHint && (
                    <motion.p 
                      className="text-gray-600 italic mb-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      Dica: {gameWords[currentIndex]?.hint}
                    </motion.p>
                  )}
                </div>
                
                <div className="mb-6">
                  <Input
                    type="text"
                    value={userInput}
                    onChange={handleInputChange}
                    placeholder="Digite a palavra desembaralhada"
                    className="text-center uppercase text-lg"
                    maxLength={gameWords[currentIndex]?.original.length}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') checkAnswer();
                    }}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    onClick={checkAnswer}
                    className="button-magical"
                    disabled={!userInput.trim()}
                  >
                    Verificar
                  </Button>
                  
                  <Button
                    onClick={skipWord}
                    variant="outline"
                  >
                    Pular
                  </Button>
                  
                  <Button
                    onClick={showHintForWord}
                    variant="outline"
                    className="col-span-2"
                    disabled={showHint}
                  >
                    Ver Dica
                  </Button>
                </div>
              </Card>
              
              <div className="mt-6 text-center">
                <Button 
                  variant="link" 
                  asChild
                >
                  <Link to="/games">Voltar para Jogos</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ScrambleGame;
