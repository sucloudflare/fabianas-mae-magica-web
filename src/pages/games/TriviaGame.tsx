
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

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  userAnswer: number | null;
}

const questions: Omit<Question, "userAnswer">[] = [
  {
    id: 1,
    question: "Quando é comemorado o Dia das Mães no Brasil?",
    options: [
      "Primeiro domingo de maio",
      "Segundo domingo de maio",
      "Último domingo de maio",
      "Dia 10 de maio"
    ],
    correctAnswer: 1,
    explanation: "O Dia das Mães no Brasil é celebrado no segundo domingo de maio."
  },
  {
    id: 2,
    question: "Qual dessas flores é tradicionalmente associada ao Dia das Mães?",
    options: [
      "Tulipa",
      "Girassol",
      "Rosa",
      "Crisântemo"
    ],
    correctAnswer: 2,
    explanation: "As rosas são tradicionalmente associadas ao Dia das Mães, simbolizando amor e gratidão."
  },
  {
    id: 3,
    question: "Qual país foi o primeiro a estabelecer oficialmente o Dia das Mães?",
    options: [
      "Inglaterra",
      "Brasil",
      "França",
      "Estados Unidos"
    ],
    correctAnswer: 3,
    explanation: "Os Estados Unidos foram o primeiro país a estabelecer oficialmente o Dia das Mães, em 1914, quando o presidente Woodrow Wilson assinou uma resolução."
  },
  {
    id: 4,
    question: "Qual é o presente mais comum dado no Dia das Mães?",
    options: [
      "Chocolates",
      "Flores",
      "Joias",
      "Cartões"
    ],
    correctAnswer: 1,
    explanation: "As flores são o presente mais tradicional e comum dado às mães no seu dia."
  },
  {
    id: 5,
    question: "Qual é a origem da palavra 'mãe'?",
    options: [
      "Do latim 'mater'",
      "Do grego 'meter'",
      "Do sânscrito 'mater'",
      "Todas as anteriores"
    ],
    correctAnswer: 3,
    explanation: "A palavra 'mãe' tem origens em diversas línguas antigas, incluindo o latim 'mater', o grego 'meter' e o sânscrito 'mater'."
  },
  {
    id: 6,
    question: "Qual animal é conhecido por ser extremamente maternal?",
    options: [
      "Leão",
      "Elefante",
      "Lobo",
      "Todas as anteriores"
    ],
    correctAnswer: 1,
    explanation: "Os elefantes são conhecidos por seu forte instinto maternal. As fêmeas cuidam de seus filhotes por anos e formam laços familiares duradouros."
  },
  {
    id: 7,
    question: "Qual dessas músicas é frequentemente associada às mães?",
    options: [
      "Sweet Child O' Mine",
      "Mother and Child Reunion",
      "Mama Mia",
      "Todas as anteriores"
    ],
    correctAnswer: 3,
    explanation: "Todas essas músicas fazem referência à relação entre mães e filhos e são frequentemente associadas ao Dia das Mães."
  },
  {
    id: 8,
    question: "Qual famosa pintora mexicana é conhecida por suas obras sobre maternidade?",
    options: [
      "Frida Kahlo",
      "Tarsila do Amaral",
      "Georgia O'Keeffe",
      "Mary Cassatt"
    ],
    correctAnswer: 0,
    explanation: "Frida Kahlo retratou temas de maternidade, fertilidade e identidade feminina em várias de suas obras."
  }
];

const TriviaGame = () => {
  const [gameQuestions, setGameQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);
  
  useEffect(() => {
    if (gameStarted && !gameFinished && !showAnswer) {
      const timer = setTimeout(() => {
        if (timeLeft > 0) {
          setTimeLeft(timeLeft - 1);
        } else {
          handleTimeout();
        }
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [timeLeft, gameStarted, gameFinished, showAnswer]);
  
  const startGame = () => {
    // Shuffle questions and pick 6
    const shuffledQuestions = [...questions]
      .sort(() => Math.random() - 0.5)
      .slice(0, 6)
      .map(q => ({
        ...q,
        userAnswer: null
      }));
    
    setGameQuestions(shuffledQuestions);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowAnswer(false);
    setGameStarted(true);
    setGameFinished(false);
    setTimeLeft(20);
  };
  
  const handleAnswerClick = (answerIndex: number) => {
    if (showAnswer) return;
    
    const currentQuestion = gameQuestions[currentQuestionIndex];
    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    
    // Update the current question with user's answer
    const updatedQuestions = [...gameQuestions];
    updatedQuestions[currentQuestionIndex].userAnswer = answerIndex;
    setGameQuestions(updatedQuestions);
    
    if (isCorrect) {
      setScore(score + 1);
      toast({
        title: "Correto!",
        description: "Você acertou a resposta!",
        duration: 2000,
      });
      
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
    
    setShowAnswer(true);
    setTimeLeft(20); // Reset timer for next question
  };
  
  const handleTimeout = () => {
    const updatedQuestions = [...gameQuestions];
    updatedQuestions[currentQuestionIndex].userAnswer = -1; // -1 indicates timeout
    setGameQuestions(updatedQuestions);
    
    toast({
      title: "Tempo esgotado!",
      description: "Você não respondeu a tempo.",
      variant: "destructive",
      duration: 2000,
    });
    
    setShowAnswer(true);
  };
  
  const goToNextQuestion = () => {
    if (currentQuestionIndex < gameQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowAnswer(false);
      setTimeLeft(20);
    } else {
      finishGame();
    }
  };
  
  const finishGame = () => {
    setGameFinished(true);
    
    const finalScore = score;
    const totalQuestions = gameQuestions.length;
    
    if (finalScore === totalQuestions) {
      // Perfect score
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      
      toast({
        title: "Parabéns!",
        description: "Você acertou todas as perguntas!",
        duration: 4000,
      });
    } else if (finalScore >= totalQuestions * 0.7) {
      // Good score
      toast({
        title: "Muito bom!",
        description: `Você acertou ${finalScore} de ${totalQuestions} perguntas!`,
        duration: 3000,
      });
    } else {
      // Average or low score
      toast({
        title: "Jogo finalizado!",
        description: `Você acertou ${finalScore} de ${totalQuestions} perguntas.`,
        duration: 3000,
      });
    }
  };
  
  const renderOptionsWithFeedback = () => {
    const currentQuestion = gameQuestions[currentQuestionIndex];
    if (!currentQuestion) return null;
    
    return (
      <div className="space-y-3">
        {currentQuestion.options.map((option, index) => {
          let optionClass = "border hover:bg-gray-100";
          
          if (showAnswer) {
            if (index === currentQuestion.correctAnswer) {
              optionClass = "border-green-500 bg-green-50 text-green-700";
            } else if (currentQuestion.userAnswer === index) {
              optionClass = "border-red-500 bg-red-50 text-red-700";
            }
          }
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Button
                variant="outline"
                className={`w-full justify-start text-left font-normal p-4 h-auto ${optionClass}`}
                onClick={() => handleAnswerClick(index)}
                disabled={showAnswer}
              >
                <div className="flex items-start">
                  <span className="inline-block w-6 h-6 rounded-full bg-gray-200 text-gray-800 flex items-center justify-center mr-3">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span>{option}</span>
                </div>
              </Button>
            </motion.div>
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
            <span className="magical-text">Trivia Maternal</span>
          </h1>
          
          {!gameStarted ? (
            <motion.div 
              className="max-w-md mx-auto text-center p-8 bg-white rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-6">Trivia do Dia das Mães</h2>
              <p className="mb-8">
                Teste seus conhecimentos sobre curiosidades relacionadas às mães e à maternidade.
                Responda às perguntas e descubra o quanto você sabe sobre este tema tão especial!
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
              className="max-w-xl mx-auto text-center p-8 bg-white rounded-lg shadow-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-4">Resultado Final</h2>
              <div className="mb-6">
                <div className="text-5xl font-bold mb-2">
                  {score}/{gameQuestions.length}
                </div>
                <p className="text-lg">
                  {score === gameQuestions.length 
                    ? "Perfeito! Você acertou todas as perguntas!" 
                    : score >= gameQuestions.length * 0.7 
                      ? "Muito bom! Você sabe bastante sobre o tema!" 
                      : "Continue aprendendo sobre este tema tão especial!"}
                </p>
              </div>
              
              <div className="space-y-4 mb-8 text-left">
                {gameQuestions.map((q, index) => (
                  <div key={index} className="border-b pb-4">
                    <p className="font-bold">{index + 1}. {q.question}</p>
                    <div className="mt-2 ml-4">
                      <p className={q.userAnswer === q.correctAnswer ? "text-green-600" : "text-red-600"}>
                        Sua resposta: {q.userAnswer === -1 
                          ? "Tempo esgotado" 
                          : q.userAnswer !== null 
                            ? q.options[q.userAnswer]
                            : "Não respondida"}
                      </p>
                      <p className="text-green-600">Resposta correta: {q.options[q.correctAnswer]}</p>
                    </div>
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
            <div className="max-w-2xl mx-auto">
              <Card className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <span className="font-bold">
                    Pergunta {currentQuestionIndex + 1} de {gameQuestions.length}
                  </span>
                  
                  <div className="flex items-center">
                    <span className="mr-2">Tempo:</span>
                    <div className={`font-bold ${timeLeft <= 5 ? "text-red-500" : ""}`}>
                      {timeLeft}s
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-mothers-purple h-2 rounded-full transition-all duration-500" 
                      style={{ width: `${(currentQuestionIndex / gameQuestions.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <motion.h2 
                  className="text-xl font-bold mb-6"
                  key={currentQuestionIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {gameQuestions[currentQuestionIndex]?.question}
                </motion.h2>
                
                {renderOptionsWithFeedback()}
                
                {showAnswer && (
                  <motion.div 
                    className="mt-6 p-4 bg-blue-50 rounded-lg"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <p className="font-medium text-blue-800">
                      {gameQuestions[currentQuestionIndex]?.explanation}
                    </p>
                    <div className="mt-4 text-center">
                      <Button onClick={goToNextQuestion}>
                        {currentQuestionIndex < gameQuestions.length - 1 
                          ? "Próxima Pergunta" 
                          : "Ver Resultados"}
                      </Button>
                    </div>
                  </motion.div>
                )}
              </Card>
              
              <div className="mt-6 flex justify-between">
                <div>
                  <span className="text-sm">Pontuação: </span>
                  <span className="font-bold">{score}/{gameQuestions.length}</span>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm" 
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

export default TriviaGame;
