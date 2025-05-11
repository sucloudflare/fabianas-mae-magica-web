
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import ParticleBackground from '@/components/ParticleBackground';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

interface Photo {
  id: number;
  url: string;
  caption: string;
}

const photos: Photo[] = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3",
    caption: "Momentos especiais com Fabiana"
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3",
    caption: "Memórias que aqueceram o coração"
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3",
    caption: "Dias de alegria"
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixlib=rb-4.0.3",
    caption: "Momentos de carinho"
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?ixlib=rb-4.0.3",
    caption: "Sorrisos que iluminam"
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-4.0.3",
    caption: "Abraços aconchegantes"
  }
];

const Gallery = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  
  return (
    <div className="min-h-screen flex flex-col">
      <ParticleBackground />
      <Header />
      
      <main className="flex-grow py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-script text-center mb-12">
            <span className="magical-text">Galeria de Fotos</span>
          </h1>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {photos.map((photo) => (
              <Dialog key={photo.id}>
                <DialogTrigger asChild>
                  <Card className="card-magical overflow-hidden cursor-pointer transition-all hover:shadow-lg">
                    <div className="relative">
                      <img 
                        src={photo.url} 
                        alt={photo.caption}
                        className="w-full h-64 object-cover transition-transform hover:scale-105"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                        <p className="text-white text-sm">{photo.caption}</p>
                      </div>
                    </div>
                  </Card>
                </DialogTrigger>
                
                <DialogContent className="sm:max-w-3xl">
                  <div className="relative">
                    <img 
                      src={photo.url} 
                      alt={photo.caption}
                      className="w-full object-contain max-h-[70vh]"
                    />
                    <div className="mt-4 text-center">
                      <p>{photo.caption}</p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-lg mb-4">
              Cada foto conta uma história de amor, carinho e dedicação.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Gallery;
