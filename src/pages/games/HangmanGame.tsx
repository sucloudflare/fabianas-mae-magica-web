
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Link } from "react-router-dom";
import ParticleBackground from "@/components/ParticleBackground";

const words = [
  { word: "AMORMATERNO", hint: "O sentimento mais puro que uma mãe tem" },
  { word: "CARINHO", hint: "Gesto de afeto que toda mãe demonstra" },
  { word: "DEDICAÇÃO", hint: "Característica de quem se entrega totalmente" },
  { word: "CUIDADO", hint: "Zelo e atenção aos detalhes" },
  { word: "PROTEÇÃO", hint: "O que as mães oferecem contra qualquer perigo" },
  { word: "PACIÊNCIA", hint: "Virtude necessária para criar filhos" },
  { word: "ENSINAMENTO", hint: "O que as mães transmitem todos os dias" },
  { word: "SABEDORIA", hint: "Conhecimento adquirido com a experiência" },
  { word: "GRATIDÃO", hint: "Sentimento que temos por tudo que recebemos" },
  { word: "GUARDIÃ", hint: "Aquela que protege e cuida" },
];

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZÇÁÀÂÃÉÊÍÓÔÕÚÛ".split("");

const HangmanGame = () => {
  const [currentWord, setCurrentWord] = useState<string>("");
  const [currentHint, setCurrentHint] = useState<string>("");
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [wrongGuesses, setWrongGuesses] = useState<number>(0);
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost" | "initial">("initial");
  const maxWrongGuesses = 6;
  
  useEffect(() => {
    if (gameStatus === "playing") {
      checkGameStatus();
    }
  }, [guessedLetters, gameStatus]);
  
  const startNewGame = () => {
    // Pick a random word
    const randomIndex = Math.floor(Math.random() * words.length);
    setCurrentWord(words[randomIndex].word);
    setCurrentHint(words[randomIndex].hint);
    setGuessedLetters([]);
    setWrongGuesses(0);
    setGameStatus("playing");
  };
  
  const handleLetterClick = (letter: string) => {
    if (gameStatus !== "playing" || guessedLetters.includes(letter)) return;
    
    const newGuessedLetters = [...guessedLetters, letter];
    setGuessedLetters(newGuessedLetters);
    
    // Check if the letter is in the word
    if (!currentWord.includes(letter)) {
      const newWrongGuesses = wrongGuesses + 1;
      setWrongGuesses(newWrongGuesses);
      
      if (newWrongGuesses >= maxWrongGuesses) {
        setGameStatus("lost");
        toast({
          title: "Game Over!",
          description: `A palavra era: ${currentWord}`,
          variant: "destructive",
          duration: 4000,
        });
      }
    }
  };
  
  const checkGameStatus = () => {
    if (gameStatus !== "playing") return;
    
    // Check if all letters in the word have been guessed
    const allLettersGuessed = [...currentWord].every(letter => guessedLetters.includes(letter));
    
    if (allLettersGuessed) {
      setGameStatus("won");
      
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      
      toast({
        title: "Parabéns!",
        description: "Você descobriu a palavra!",
        duration: 4000,
      });
    }
  };
  
  const renderWord = () => {
    return (
      <div className="flex justify-center mb-8 flex-wrap">
        {[...currentWord].map((letter, index) => (
          <motion.div
            key={`${index}-${letter}`}
            className="mx-1 mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <div className="w-10 h-12 border-b-2 border-mothers-purple flex items-end justify-center pb-1">
              <span className="text-2xl font-bold">
                {guessedLetters.includes(letter) ? letter : ""}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    );
  };
  
  const renderHangman = () => {
    return (
      <div className="w-40 h-40 mx-auto mb-6 relative">
        {/* Base */}
        <div className="absolute bottom-0 left-0 w-40 h-2 bg-gray-800"></div>
        
        {/* Pole */}
        {wrongGuesses >= 1 && (
          <div className="absolute bottom-0 left-10 w-2 h-40 bg-gray-800"></div>
        )}
        
        {/* Top beam */}
        {wrongGuesses >= 2 && (
          <div className="absolute top-0 left-10 w-24 h-2 bg-gray-800"></div>
        )}
        
        {/* Rope */}
        {wrongGuesses >= 3 && (
          <div className="absolute top-0 right-10 w-1 h-8 bg-gray-800"></div>
        )}
        
        {/* Head */}
        {wrongGuesses >= 4 && (
          <div className="absolute top-8 right-6 w-10 h-10 rounded-full border-4 border-gray-800"></div>
        )}
        
        {/* Body */}
        {wrongGuesses >= 5 && (
          <div className="absolute top-[4.5rem] right-10 w-1 h-16 bg-gray-800"></div>
        )}
        
        {/* Arms and legs */}
        {wrongGuesses >= 6 && (
          <>
            {/* Left arm */}
            <div className="absolute top-20 right-10 w-10 h-1 bg-gray-800 origin-right rotate-45"></div>
            {/* Right arm */}
            <div className="absolute top-20 right-[0.8rem] w-10 h-1 bg-gray-800 origin-left -rotate-45"></div>
            {/* Left leg */}
            <div className="absolute top-[8.5rem] right-10 w-10 h-1 bg-gray-800 origin-right rotate-45"></div>
            {/* Right leg */}
            <div className="absolute top-[8.5rem] right-[0.8rem] w-10 h-1 bg-gray-800 origin-left -rotate-45"></div>
          </>
        )}
      </div>
    );
  };
  
  const renderKeyboard = () => {
    return (
      <div className="flex flex-wrap justify-center gap-2 max-w-md mx-auto">
        {alphabet.map((letter) => {
          const isGuessed = guessedLetters.includes(letter);
          const isInWord = currentWord.includes(letter);
          
          return (
            <Button
              key={letter}
              className={`w-10 h-10 p-0 font-bold ${
                isGuessed 
                  ? isInWord 
                    ? "bg-green-500 hover:bg-green-600" 
                    : "bg-red-500 hover:bg-red-600" 
                  : "bg-mothers-purple/80 hover:bg-mothers-purple"
              }`}
              onClick={() => handleLetterClick(letter)}
              disabled={isGuessed || gameStatus !== "playing"}
            >
              {letter}
            </Button>
          );
        })}
      </div>
    );
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <ParticleBackground />
      <Header />
      
      <main className="flex-grow py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-script text-center mb-8">
            <span className="magical-text">Jogo da Forca</span>
          </h1>
          
          <div className="mb-8 text-center">
            <p className="text-lg mb-4">
              Descubra a palavra relacionada ao Dia das Mães!
            </p>
          </div>
          
          {gameStatus === "initial" ? (
            <motion.div 
              className="max-w-md mx-auto text-center p-8 bg-white rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-6">Jogo da Forca</h2>
              <p className="mb-8">
                Tente descobrir a palavra secreta relacionada às mães antes que o 
                desenho da forca seja completado! Você pode errar no máximo 6 letras.
              </p>
              
              <Button 
                onClick={startNewGame}
                className="button-magical w-full py-6"
              >
                Começar Jogo
              </Button>
            </motion.div>
          ) : (
            <Card className="max-w-3xl mx-auto p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-sm">
                  Erros: {wrongGuesses}/{maxWrongGuesses}
                </span>
                
                <div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={startNewGame}
                  >
                    Novo Jogo
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col items-center justify-center">
                  {renderHangman()}
                  
                  <motion.div 
                    className="text-center mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <p className="text-sm text-gray-600 italic">Dica: {currentHint}</p>
                  </motion.div>
                </div>
                
                <div className="flex flex-col">
                  {renderWord()}
                  
                  {gameStatus === "won" && (
                    <motion.div 
                      className="text-center mb-6 p-3 bg-green-100 rounded-lg"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <p className="text-green-700 font-bold">Parabéns! Você venceu!</p>
                    </motion.div>
                  )}
                  
                  {gameStatus === "lost" && (
                    <motion.div 
                      className="text-center mb-6 p-3 bg-red-100 rounded-lg"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <p className="text-red-700 font-bold">Game Over!</p>
                      <p className="text-gray-700">A palavra era: {currentWord}</p>
                    </motion.div>
                  )}
                </div>
              </div>
              
              <div className="mt-8">
                {renderKeyboard()}
              </div>
              
              <div className="mt-8 text-center">
                <Link to="/games">
                  <Button variant="outline">Voltar para Jogos</Button>
                </Link>
              </div>
            </Card>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HangmanGame;
