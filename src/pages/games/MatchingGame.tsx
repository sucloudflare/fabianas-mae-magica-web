
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import ParticleBackground from "@/components/ParticleBackground";
import { Link } from "react-router-dom";
import confetti from "canvas-confetti";

interface MatchItem {
  id: number;
  messageId: number;
  imageId: number;
  message?: string;
  image?: string;
  isMatched: boolean;
  isSelected: boolean;
}

const messages = [
  "Mãe, seu amor me dá forças todos os dias",
  "Sua dedicação me inspira a ser melhor",
  "Obrigado por sempre acreditar em mim",
  "Seu carinho é meu maior tesouro",
  "Com você aprendi o verdadeiro significado do amor",
  "Mãe, você é meu exemplo de vida",
  "Seu sorriso ilumina meu caminho",
  "Seu abraço é meu lugar mais seguro no mundo"
];

const images = [
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
  "https://images.unsplash.com/photo-1591677010934-f702cad8e322?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
  "https://images.unsplash.com/photo-1636994365461-f60978d07538?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
  "https://images.unsplash.com/photo-1643075081151-596990ee2a8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
  "https://images.unsplash.com/photo-1608454367599-c133fdd1e60c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
  "https://images.unsplash.com/photo-1613830429455-3cff9aa5d2c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
  "https://images.unsplash.com/photo-1585748628482-a84246aef782?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
  "https://images.unsplash.com/photo-1543342384-1f1350e27861?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
];

const MatchingGame = () => {
  const [messageItems, setMessageItems] = useState<MatchItem[]>([]);
  const [imageItems, setImageItems] = useState<MatchItem[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<MatchItem | null>(null);
  const [selectedImage, setSelectedImage] = useState<MatchItem | null>(null);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    if (selectedMessage && selectedImage) {
      checkMatch();
    }
  }, [selectedMessage, selectedImage]);

  useEffect(() => {
    const allMatched = messageItems.every(item => item.isMatched);
    if (allMatched && messageItems.length > 0) {
      setGameCompleted(true);
      celebrateWin();
    }
  }, [messageItems]);

  const initializeGame = () => {
    const shuffledMessageIndices = [...Array(8).keys()].sort(() => Math.random() - 0.5);
    const shuffledImageIndices = [...Array(8).keys()].sort(() => Math.random() - 0.5);
    
    const messageCards = shuffledMessageIndices.map((index, i) => ({
      id: i,
      messageId: index,
      imageId: index,
      message: messages[index],
      isMatched: false,
      isSelected: false
    }));
    
    const imageCards = shuffledImageIndices.map((index, i) => ({
      id: i + 8,
      messageId: index,
      imageId: index,
      image: images[index],
      isMatched: false,
      isSelected: false
    }));
    
    setMessageItems(messageCards);
    setImageItems(imageCards);
    setScore(0);
    setAttempts(0);
    setGameCompleted(false);
  };

  const handleSelectMessage = (item: MatchItem) => {
    if (item.isMatched || selectedMessage?.id === item.id || (selectedMessage && selectedImage)) return;
    
    const updatedItems = messageItems.map(message => 
      message.id === item.id ? { ...message, isSelected: true } : message
    );
    setMessageItems(updatedItems);
    setSelectedMessage(item);
  };

  const handleSelectImage = (item: MatchItem) => {
    if (item.isMatched || selectedImage?.id === item.id || (selectedMessage && selectedImage)) return;
    
    const updatedItems = imageItems.map(image => 
      image.id === item.id ? { ...image, isSelected: true } : image
    );
    setImageItems(updatedItems);
    setSelectedImage(item);
  };

  const checkMatch = () => {
    if (!selectedMessage || !selectedImage) return;
    
    setTimeout(() => {
      setAttempts(attempts + 1);
      
      if (selectedMessage.messageId === selectedImage.imageId) {
        // Match found
        setScore(score + 1);
        toast({
          title: "Parabéns! Você encontrou um par!",
          description: `${score + 1} de 8 pares encontrados`,
          duration: 2000,
        });
        
        const updatedMessages = messageItems.map(item => 
          item.id === selectedMessage.id ? { ...item, isMatched: true, isSelected: false } : { ...item, isSelected: false }
        );
        
        const updatedImages = imageItems.map(item => 
          item.id === selectedImage.id ? { ...item, isMatched: true, isSelected: false } : { ...item, isSelected: false }
        );
        
        setMessageItems(updatedMessages);
        setImageItems(updatedImages);
        
        // Small celebration for each match
        confetti({
          particleCount: 30,
          spread: 70,
          origin: { y: 0.6 }
        });
      } else {
        // No match
        const updatedMessages = messageItems.map(item => ({ ...item, isSelected: false }));
        const updatedImages = imageItems.map(item => ({ ...item, isSelected: false }));
        
        setMessageItems(updatedMessages);
        setImageItems(updatedImages);
      }
      
      setSelectedMessage(null);
      setSelectedImage(null);
    }, 1000);
  };

  const celebrateWin = () => {
    confetti({
      particleCount: 100,
      spread: 100,
      origin: { y: 0.6 }
    });
    
    toast({
      title: "Parabéns! Você completou o jogo!",
      description: `Você encontrou todos os pares em ${attempts} tentativas!`,
      duration: 5000,
    });
  };

  const resetGame = () => {
    initializeGame();
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <ParticleBackground />
      <Header />
      
      <main className="flex-grow py-10 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl font-script text-center mb-8">
            <span className="magical-text">Jogo de Combinar Pares</span>
          </h1>
          
          <div className="mb-8 text-center">
            <p className="text-lg mb-4">
              Combine as mensagens com as imagens correspondentes para Fabiana.
            </p>
            <div className="flex justify-center gap-8 mb-4">
              <div className="text-center">
                <p className="text-xl font-bold">{score}/8</p>
                <p className="text-sm text-gray-600">Pares encontrados</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold">{attempts}</p>
                <p className="text-sm text-gray-600">Tentativas</p>
              </div>
            </div>
          </div>
          
          {gameCompleted ? (
            <motion.div 
              className="text-center py-10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-4">Você venceu!</h2>
              <p className="text-xl mb-4">Parabéns! Você encontrou todos os pares.</p>
              <p className="text-lg mb-8">Você completou o jogo em {attempts} tentativas.</p>
              
              <div className="flex justify-center gap-4">
                <Button onClick={resetGame} className="button-magical">
                  Jogar Novamente
                </Button>
                <Link to="/games">
                  <Button variant="outline">
                    Voltar para Jogos
                  </Button>
                </Link>
              </div>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="space-y-4">
                <h2 className="text-2xl font-medium text-center mb-4">Mensagens</h2>
                <div className="grid grid-cols-1 gap-4">
                  {messageItems.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: item.id * 0.1 }}
                    >
                      <Card 
                        className={`p-4 cursor-pointer transition-all ${
                          item.isMatched 
                            ? "bg-green-100 border-green-300" 
                            : item.isSelected 
                              ? "border-mothers-purple" 
                              : "hover:border-mothers-pink"
                        }`}
                        onClick={() => handleSelectMessage(item)}
                      >
                        <p className={`text-center py-2 ${item.isMatched ? "text-green-700 font-medium" : ""}`}>
                          {item.message}
                        </p>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-2xl font-medium text-center mb-4">Imagens</h2>
                <div className="grid grid-cols-2 gap-4">
                  {imageItems.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: item.id * 0.05 }}
                    >
                      <Card 
                        className={`overflow-hidden cursor-pointer transition-all ${
                          item.isMatched 
                            ? "border-green-300" 
                            : item.isSelected 
                              ? "border-mothers-purple" 
                              : "hover:border-mothers-pink"
                        }`}
                        onClick={() => handleSelectImage(item)}
                      >
                        <div className="aspect-square">
                          <img 
                            src={item.image} 
                            alt="Imagem para combinar" 
                            className={`w-full h-full object-cover transition-transform ${
                              item.isMatched ? "scale-102 brightness-110" : ""
                            }`}
                          />
                          {item.isMatched && (
                            <div className="absolute inset-0 flex items-center justify-center bg-green-500/30">
                              <span className="text-4xl">✓</span>
                            </div>
                          )}
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          <div className="mt-8 text-center">
            <Button 
              onClick={resetGame} 
              variant="outline" 
              className="mr-4"
            >
              Reiniciar Jogo
            </Button>
            <Link to="/games">
              <Button variant="outline">Voltar para Jogos</Button>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MatchingGame;
