
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import ParticleBackground from '@/components/ParticleBackground';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

interface Video {
  id: number;
  title: string;
  thumbnail: string;
  embedUrl: string;
  description: string;
}

const videos: Video[] = [
  {
    id: 1,
    title: "Mensagem Especial - Dia das Mães",
    thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder - replace with actual videos
    description: "Uma mensagem carinhosa dedicada à Fabiana"
  },
  {
    id: 2,
    title: "Momentos Especiais",
    thumbnail: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
    description: "Uma compilação de momentos inesquecíveis"
  },
  {
    id: 3,
    title: "Declaração de Amor",
    thumbnail: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
    description: "Uma declaração especial para uma mãe incrível"
  },
  {
    id: 4,
    title: "Recordações Felizes",
    thumbnail: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixlib=rb-4.0.3",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
    description: "Lembranças que ficam para sempre no coração"
  }
];

const Videos = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <ParticleBackground />
      <Header />
      
      <main className="flex-grow py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-script text-center mb-12">
            <span className="magical-text">Vídeos para Fabiana</span>
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {videos.map((video) => (
              <Dialog key={video.id}>
                <DialogTrigger asChild>
                  <Card className="card-magical overflow-hidden cursor-pointer transition-all hover:shadow-lg">
                    <div className="relative">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title}
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/50 transition-colors">
                        <div className="w-16 h-16 rounded-full bg-white/80 flex items-center justify-center">
                          <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[16px] border-l-mothers-purple border-b-[8px] border-b-transparent ml-1"></div>
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                        <h3 className="text-white font-bold">{video.title}</h3>
                        <p className="text-white/80 text-sm">{video.description}</p>
                      </div>
                    </div>
                  </Card>
                </DialogTrigger>
                
                <DialogContent className="sm:max-w-4xl">
                  <div className="aspect-video">
                    <iframe 
                      width="100%" 
                      height="100%" 
                      src={video.embedUrl}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                      className="rounded-lg"
                    ></iframe>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-xl font-bold">{video.title}</h3>
                    <p className="text-gray-600">{video.description}</p>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-lg mb-4">
              Vídeos especiais para expressar todo o carinho e admiração pela Fabiana.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Videos;
