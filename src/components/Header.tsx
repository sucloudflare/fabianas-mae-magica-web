
import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <Heart className="text-mothers-rose mr-2 animate-pulse" />
          <Link to="/">
            <h1 className="text-2xl font-script font-bold">
              <span className="magical-text">Fabiana</span>
              <span className="text-mothers-purple"> ❤️</span>
            </h1>
          </Link>
        </div>
        
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            <li><Link to="/" className="hover:text-mothers-rose transition-colors duration-300">Início</Link></li>
            <li><Link to="/gallery" className="hover:text-mothers-rose transition-colors duration-300">Galeria</Link></li>
            <li><Link to="/videos" className="hover:text-mothers-rose transition-colors duration-300">Vídeos</Link></li>
            <li><Link to="/poems" className="hover:text-mothers-rose transition-colors duration-300">Poemas</Link></li>
            <li><Link to="/games" className="hover:text-mothers-rose transition-colors duration-300">Jogos</Link></li>
            <li><Link to="/surprises" className="hover:text-mothers-rose transition-colors duration-300">Surpresas</Link></li>
          </ul>
        </nav>
        
        <button 
          className="md:hidden text-mothers-purple"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            {isMenuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <ul className="flex flex-col p-4">
            <li className="py-2"><Link to="/" className="hover:text-mothers-rose transition-colors duration-300">Início</Link></li>
            <li className="py-2"><Link to="/gallery" className="hover:text-mothers-rose transition-colors duration-300">Galeria</Link></li>
            <li className="py-2"><Link to="/videos" className="hover:text-mothers-rose transition-colors duration-300">Vídeos</Link></li>
            <li className="py-2"><Link to="/poems" className="hover:text-mothers-rose transition-colors duration-300">Poemas</Link></li>
            <li className="py-2"><Link to="/games" className="hover:text-mothers-rose transition-colors duration-300">Jogos</Link></li>
            <li className="py-2"><Link to="/surprises" className="hover:text-mothers-rose transition-colors duration-300">Surpresas</Link></li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
