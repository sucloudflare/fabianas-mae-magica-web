
import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-mothers-pink to-mothers-purple text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-script">Com todo amor para Fabiana</h3>
            <p className="text-white/80">Feliz Dia das Mães 2025</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <span>Feito com</span>
            <Heart className="text-mothers-gold animate-pulse" size={16} />
            <span>para a melhor mãe do mundo</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
