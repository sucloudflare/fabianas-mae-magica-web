
import React from 'react';
import { Card } from '@/components/ui/card';
import { Heart, Gift, Image, Calendar } from 'lucide-react';

const features = [
  {
    icon: Heart,
    title: "Poemas Especiais",
    description: "Lindos poemas escritos especialmente para você, Fabiana."
  },
  {
    icon: Gift,
    title: "Caixas Surpresa",
    description: "Caixas virtuais cheias de surpresas e mensagens carinhosas."
  },
  {
    icon: Image,
    title: "Galeria de Fotos",
    description: "Uma coleção de momentos especiais para recordar."
  },
  {
    icon: Calendar,
    title: "Jogos Divertidos",
    description: "8 jogos temáticos para você se divertir no seu dia especial."
  }
];

const FeatureSection: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-mothers-cream/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-script text-center mb-12">
          <span className="magical-text">Especial para Você</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="card-magical p-6 text-center"
            >
              <div className="mb-4 flex justify-center">
                <div className="w-16 h-16 rounded-full bg-mothers-purple/10 flex items-center justify-center">
                  <feature.icon className="text-mothers-purple" size={32} />
                </div>
              </div>
              <h3 className="font-bold text-xl mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
