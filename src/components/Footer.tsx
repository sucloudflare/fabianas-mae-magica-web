
import React from 'react';
import { Heart, Star, ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, MotionConfig } from 'framer-motion';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <footer className="relative overflow-hidden bg-gradient-to-r from-mothers-pink to-mothers-purple text-white py-8">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <MotionConfig>
          <motion.div 
            className="absolute top-0 left-[20%] text-3xl opacity-30"
            animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            ❤️
          </motion.div>
          <motion.div 
            className="absolute top-10 left-[70%] text-3xl opacity-30"
            animate={{ y: [0, -20, 0], rotate: [0, -10, 0] }}
            transition={{ duration: 7, repeat: Infinity, delay: 1 }}
          >
            💝
          </motion.div>
          <motion.div 
            className="absolute bottom-0 left-[40%] text-3xl opacity-30"
            animate={{ y: [0, -10, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 6, repeat: Infinity, delay: 2 }}
          >
            💖
          </motion.div>
        </MotionConfig>
      </div>
      
      <div className="container mx-auto px-4 z-10 relative">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0">
            <MotionConfig>
              <motion.h3 
                className="text-2xl font-script mb-2"
                animate={{ 
                  textShadow: ['0 0 5px rgba(255,255,255,0)', '0 0 15px rgba(255,255,255,0.5)', '0 0 5px rgba(255,255,255,0)'] 
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Com todo amor para Fabiana
              </motion.h3>
            </MotionConfig>
            <p className="text-white/80 flex items-center">
              <Star className="text-mothers-gold mr-2" size={16} fill="#FFD700" />
              Feliz Dia das Mães 2025
            </p>
            
            <div className="mt-4 flex space-x-4">
              <Link to="/" className="text-white/80 hover:text-white transition-colors">
                Início
              </Link>
              <Link to="/gallery" className="text-white/80 hover:text-white transition-colors">
                Galeria
              </Link>
              <Link to="/games" className="text-white/80 hover:text-white transition-colors">
                Jogos
              </Link>
              <Link to="/surprises" className="text-white/80 hover:text-white transition-colors">
                Surpresas
              </Link>
            </div>
          </div>
          
          <div className="flex flex-col items-center">
            <MotionConfig>
              <motion.button 
                className="bg-white/20 hover:bg-white/30 rounded-full p-3 mb-4 transition-colors"
                onClick={scrollToTop}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ArrowUp size={20} />
              </motion.button>
              
              <motion.div 
                className="flex items-center space-x-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <span>Feito com</span>
                <motion.div
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Heart className="text-mothers-gold" size={18} fill="#FFD700" />
                </motion.div>
                <span>para a melhor mãe do mundo</span>
              </motion.div>
            </MotionConfig>
          </div>
        </div>
        
        <MotionConfig>
          <motion.div 
            className="mt-8 pt-4 border-t border-white/20 text-center text-sm text-white/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <p>Cada segundo dedicado a este site foi feito pensando no seu sorriso, Fabiana.</p>
            <p className="mt-2">© 2025 - Para a mãe mais especial do mundo ❤️</p>
          </motion.div>
        </MotionConfig>
      </div>
    </footer>
  );
};

export default Footer;
