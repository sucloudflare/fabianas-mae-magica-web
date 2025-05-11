
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import ParticleBackground from '@/components/ParticleBackground';
import { useToast } from "@/hooks/use-toast";
import confetti from 'canvas-confetti';

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

const questions: Question[] = [
  {
    id: 1,
    text: "Qual é a data do Dia das Mães no Brasil?",
    options: [
      "Primeiro domingo de maio", 
      "Segundo domingo de maio", 
      "Último domingo de maio", 
      "Dia 12 de maio"
    ],
    correctAnswer: 1
  },
  {
    id: 2,
    text: "Qual é a flor tradicionalmente associada ao Dia das Mães?",
    options: ["Rosa", "Margarida", "Lírio", "Crisântemo"],
    correctAnswer: 0
  },
  {
    id: 3,
    text: "Qual destas é uma qualidade frequentemente associada às mães?",
    options: ["Impaciência", "Egoísmo", "Amor incondicional", "Frieza"],
    correctAnswer: 2
  },
  {
    id: 4,
    text: "O que as mães mais apreciam ganhar no Dia das Mães?",
    options: [
      "Apenas presentes caros", 
      "Demonstrações sinceras de afeto", 
      "Apenas dinheiro", 
      "Nada"
    ],
    correctAnswer: 1
  },
  {
    id: 5,
    text: "Qual foi o país onde surgiu a comemoração moderna do Dia das Mães?",
    options: ["Brasil", "Portugal", "França", "Estados Unidos"],
    correctAnswer: 3
  },
  {
    id: 6,
    text: "Qual é o sobrenome da mulher considerada a criadora do Dia das Mães moderno?",
    options: ["Smith", "Jarvis", "Johnson", "Williams"],
    correctAnswer: 1
  },
  {
    id: 7,
    text: "Qual é a pedra preciosa frequentemente associada às mães?",
    options: ["Diamante", "Esmeralda", "Safira", "Pérola"],
    correctAnswer: 3
  },
  {
    id: 8,
    text: "O que simboliza o coração em relação às mães?",
    options: ["Força", "Amor", "Sabedoria", "Paciência"],
    correctAnswer: 1
  }
];

const QuizGame = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  const { toast } = useToast();
  
  const handleOptionSelect = (optionIndex: number) => {
    if (answeredQuestions.includes(currentQuestion)) return;
    
    setSelectedOption(optionIndex);
    const newAnsweredQuestions = [...answeredQuestions, currentQuestion];
    setAnsweredQuestions(newAnsweredQuestions);
    
    const currentQuestionData = questions[currentQuestion];
    
    if (optionIndex === currentQuestionData.correctAnswer) {
      setScore(score + 1);
      toast({
        title: "Resposta correta! 🎉",
        description: "Você acertou!",
        duration: 2000,
      });
      
      // Small confetti celebration
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 }
      });
    } else {
      toast({
        title: "Ops!",
        description: `A resposta correta era: ${currentQuestionData.options[currentQuestionData.correctAnswer]}`,
        duration: 2000,
      });
    }
  };
  
  const handleNextQuestion = () => {
    setSelectedOption(null);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
      
      // Celebrate completion
      if (score >= questions.length * 0.7) {
        celebrateGoodScore();
      }
    }
  };
  
  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setScore(0);
    setShowResults(false);
    setAnsweredQuestions([]);
  };
  
  const celebrateGoodScore = () => {
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
            <span className="magical-text">Quiz da Mamãe</span>
          </h1>
          
          {!showResults ? (
            <div className="max-w-3xl mx-auto">
              <div className="mb-8 flex justify-between items-center">
                <div className="text-lg">
                  <span className="bg-mothers-cream/30 px-3 py-1 rounded-full">
                    Pergunta {currentQuestion + 1}/{questions.length}
                  </span>
                </div>
                <div className="text-lg">
                  <span className="bg-mothers-pink/30 px-3 py-1 rounded-full">
                    Pontuação: {score}
                  </span>
                </div>
              </div>
              
              <div className="card-magical p-6 mb-8">
                <h2 className="text-xl font-bold mb-6">{questions[currentQuestion].text}</h2>
                
                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, index) => (
                    <div 
                      key={index}
                      onClick={() => handleOptionSelect(index)}
                      className={`p-4 rounded-lg transition-all cursor-pointer ${
                        selectedOption === index 
                          ? index === questions[currentQuestion].correctAnswer
                            ? 'bg-green-100 border border-green-500'
                            : 'bg-red-100 border border-red-500'
                          : 'bg-mothers-cream/20 hover:bg-mothers-cream/40'
                      } ${answeredQuestions.includes(currentQuestion) ? 'cursor-default' : 'cursor-pointer'}`}
                    >
                      <div className="flex items-center">
                        <div className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center ${
                          selectedOption === index ? 'bg-white' : 'bg-white'
                        }`}>
                          {String.fromCharCode(65 + index)}
                        </div>
                        <div>{option}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-center">
                <Button 
                  onClick={handleNextQuestion}
                  disabled={selectedOption === null}
                  className="button-magical"
                >
                  {currentQuestion < questions.length - 1 ? 'Próxima Pergunta' : 'Ver Resultados'}
                </Button>
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto">
              <div className="card-magical p-8 mb-8 text-center">
                <h2 className="text-2xl font-script mb-4">
                  {score >= questions.length * 0.7 ? '🎉 Parabéns! 🎉' : 'Quiz Completo!'}
                </h2>
                
                <div className="text-4xl font-bold magical-text mb-6">
                  {score} / {questions.length}
                </div>
                
                <p className="mb-6 text-lg">
                  {score >= questions.length * 0.7 
                    ? 'Você é um especialista em conhecimentos sobre mães! Fabiana ficaria orgulhosa!' 
                    : 'Continue aprendendo mais sobre mães! Fabiana merece todo o reconhecimento.'}
                </p>
                
                <div className="flex flex-wrap justify-center gap-4">
                  <Button onClick={restartQuiz} className="button-magical">
                    Jogar Novamente
                  </Button>
                  <Link to="/games">
                    <Button className="sparkle-button">
                      Outros Jogos
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default QuizGame;
