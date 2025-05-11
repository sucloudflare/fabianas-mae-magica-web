
import React, { useState, useEffect } from 'react';
import { Heart, Menu, X, Star } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);
  
  const navItems = [
    { path: '/', label: 'Início' },
    { path: '/gallery', label: 'Galeria' },
    { path: '/videos', label: 'Vídeos' },
    { path: '/poems', label: 'Poemas' },
    { path: '/games', label: 'Jogos' },
    { path: '/surprises', label: 'Surpresas' },
  ];
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const menuVariants = {
    open: { 
      opacity: 1, 
      height: 'auto',
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.05
      }
    },
    closed: { 
      opacity: 0, 
      height: 0,
      transition: {
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };
  
  const itemVariants = {
    open: { 
      y: 0, 
      opacity: 1,
    },
    closed: { 
      y: -10, 
      opacity: 0 
    }
  };
  
  // Special magic effect for active link
  const activeIndicator = (path: string) => {
    if (isActive(path)) {
      return (
        <motion.div 
          layoutId="activeIndicator"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-mothers-pink to-mothers-purple"
          initial={false}
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      );
    }
    return null;
  };
  
  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md' : 'bg-white/80 backdrop-blur-sm shadow-sm'
    }`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center group">
            <motion.div 
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }} 
              transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
              className="mr-2"
            >
              <Heart className="text-mothers-rose" fill="#FF97C2" />
            </motion.div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-script font-bold flex items-center">
                <motion.span 
                  initial={{ backgroundPosition: '0% 50%' }}
                  animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="magical-text"
                >
                  Fabiana
                </motion.span>
                <motion.span 
                  className="text-mothers-purple ml-1" 
                  animate={{ rotate: [0, 10, 0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ❤️
                </motion.span>
              </h1>
              <motion.div 
                className="text-xs text-mothers-pink/70"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center">
                  <Star size={10} className="text-mothers-gold mr-1" fill="#FFD700" />
                  <span>Feliz Dia das Mães</span>
                </div>
              </motion.div>
            </div>
          </Link>
          
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              {navItems.map((item) => (
                <li key={item.path} className="relative">
                  <Link 
                    to={item.path} 
                    className={`py-1 px-2 relative hover:text-mothers-rose transition-colors duration-300 ${
                      isActive(item.path) ? 'text-mothers-purple font-medium' : ''
                    }`}
                  >
                    {item.label}
                    {activeIndicator(item.path)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          <motion.button 
            className="md:hidden text-mothers-purple p-1 rounded-md"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
      
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="md:hidden bg-white shadow-lg overflow-hidden"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <motion.ul className="flex flex-col p-4 space-y-3">
              {navItems.map((item) => (
                <motion.li key={item.path} variants={itemVariants}>
                  <Link 
                    to={item.path}
                    className={`block py-2 px-4 rounded-md transition-colors ${
                      isActive(item.path) 
                        ? 'bg-gradient-to-r from-mothers-pink/20 to-mothers-purple/20 text-mothers-purple font-medium' 
                        : 'hover:bg-mothers-cream/30'
                    }`}
                  >
                    <div className="flex items-center">
                      {isActive(item.path) && (
                        <motion.div 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="mr-2 text-mothers-pink"
                        >
                          ❤️
                        </motion.div>
                      )}
                      {item.label}
                    </div>
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
