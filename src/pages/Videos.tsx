
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import ParticleBackground from '@/components/ParticleBackground';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Heart, Star, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import confetti from 'canvas-confetti';

interface Video {
  id: number;
  title: string;
  thumbnail: string;
  embedUrl: string;
  description: string;
  author: string;
  duration: string;
  likes: number;
}

const videos: Video[] = [
  {
    id: 1,
    title: "Mensagem Dia das Mães - Linda homenagem para todas as mães",
    thumbnail: "https://i.ytimg.com/vi/LtGTBNWZ9Fk/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/1hrLD3QczD4?si=hXQGfjcjzwEAcfrz",
    description: "Uma linda homenagem para todas as mães, especialmente para Fabiana, com uma mensagem emocionante.",
    author: "Mundo das Mensagens",
    duration: "3:25",
    likes: 1254
  },
  {
    id: 2,
    title: "Feliz Dia Das Mães - Mensagem especial para você",
    thumbnail: "https://i.ytimg.com/vi/-92taqfzRGs/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/1m_QPQezRrU?si=zQKVZ_BhRMYeFBsA",
    description: "Uma declaração de amor para todas as mães maravilhosas do mundo.",
    author: "Mensagens & Poemas",
    duration: "2:46",
    likes: 986
  },
  {
    id: 3,
    title: "O Amor de Mãe | Linda Mensagem Dia das Mães",
    thumbnail: "https://i.ytimg.com/vi/G7GlLiTui3o/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/ORR0Wv_Pf48?si=7kQrZr0TsbbrXXM5",
    description: "O amor de mãe é o sentimento mais puro que existe. Uma bela homenagem para Fabiana.",
    author: "Mensagens para Alma",
    duration: "3:55",
    likes: 2148
  },
  {
    id: 4,
    title: "Mensagem para o Dia das Mães - Obrigado mãe",
    thumbnail: "https://i.ytimg.com/vi/OQpMjL8QslI/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/6aQxFj9o4V0?si=IsedNkXJmt_ReQgB",
    description: "Obrigado mãe por todo amor e dedicação. Uma mensagem de gratidão.",
    author: "Mensagens de Amor",
    duration: "4:10",
    likes: 1876
  },
  {
    id: 5,
    title: "Para uma Mãe Especial - Mensagem Emocionante",
    thumbnail: "https://i.ytimg.com/vi/IOxwXNLPdXg/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/_4PSav5Qnmg?si=RLo4PNS0rKjR9sna" ,
    description: "Uma mensagem emocionante para uma mãe muito especial como a Fabiana.",
    author: "Vídeos do Coração",
    duration: "3:33",
    likes: 1537
  },
  {
    id: 6,
    title: "Poema para Mãe - Recitação Emocionante",
    thumbnail: "https://i.ytimg.com/vi/I2OTyuCsVB4/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/wawkg58kkE8?si=Jv6ad9Rr5zmWO3ca" ,
    description: "Um poema lindo dedicado às mães, recitado com muito sentimento.",
    author: "Poetas da Alma",
    duration: "2:58",
    likes: 945
  }
];

const Videos = () => {
  const [favoriteVideos, setFavoriteVideos] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  
  const handleToggleFavorite = (videoId: number) => {
    if (favoriteVideos.includes(videoId)) {
      setFavoriteVideos(favoriteVideos.filter(id => id !== videoId));
    } else {
      setFavoriteVideos([...favoriteVideos, videoId]);
      
      toast({
        title: "Vídeo favoritado!",
        description: "Este vídeo foi adicionado aos seus favoritos",
        duration: 2000,
      });
      
      // Small celebration
      confetti({
        particleCount: 30,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };
  
  const handleCopyLink = (videoId: number) => {
    const video = videos.find(v => v.id === videoId);
    if (video) {
      navigator.clipboard.writeText(video.embedUrl.replace('embed/', 'watch?v='));
      
      toast({
        title: "Link copiado!",
        description: "O link do vídeo foi copiado para a área de transferência",
        duration: 2000,
      });
    }
  };
  
  const filteredVideos = videos.filter(video => 
    video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    video.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <ParticleBackground />
      <Header />
      
      <main className="flex-grow py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-script text-center mb-6">
            <span className="magical-text">Vídeos para Fabiana</span>
          </h1>
          
          <div className="mb-8 max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Pesquisar vídeos..."
                className="w-full px-4 py-3 pl-10 rounded-full border border-mothers-pink/30 focus:border-mothers-purple focus:ring-1 focus:ring-mothers-purple focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-mothers-pink">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
            </div>
            
            <div className="mt-4 text-center text-sm text-gray-500">
              {favoriteVideos.length > 0 ? (
                <span>
                  Você tem {favoriteVideos.length} vídeo(s) favorito(s). Clique no coração para favoritar mais vídeos!
                </span>
              ) : (
                <span>
                  Clique no ícone de coração para favoritar vídeos especiais para Fabiana.
                </span>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVideos.length > 0 ? filteredVideos.map((video) => (
              <Dialog key={video.id}>
                <Card className="card-magical overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1">
                  <div className="relative group">
                    <DialogTrigger asChild>
                      <div className="cursor-pointer">
                        <img 
                          src={video.thumbnail} 
                          alt={video.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-colors opacity-0 group-hover:opacity-100">
                          <div className="w-16 h-16 rounded-full bg-white/80 flex items-center justify-center">
                            <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[16px] border-l-mothers-purple border-b-[8px] border-b-transparent ml-1"></div>
                          </div>
                        </div>
                        <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-md text-xs">
                          {video.duration}
                        </div>
                      </div>
                    </DialogTrigger>
                    
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
                      <h3 className="font-bold line-clamp-1">{video.title}</h3>
                      <p className="text-white/80 text-sm truncate">{video.author}</p>
                    </div>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleFavorite(video.id);
                      }}
                      className={`absolute top-2 left-2 p-2 rounded-full ${
                        favoriteVideos.includes(video.id) 
                          ? 'bg-mothers-pink text-white' 
                          : 'bg-black/50 text-white hover:bg-mothers-pink/50'
                      } transition-colors`}
                    >
                      <Heart size={16} fill={favoriteVideos.includes(video.id) ? "currentColor" : "none"} />
                    </button>
                  </div>
                  
                  <div className="p-4">
                    <DialogTrigger asChild>
                      <h3 className="font-bold mb-1 cursor-pointer hover:text-mothers-purple transition-colors line-clamp-2 h-12">
                        {video.title}
                      </h3>
                    </DialogTrigger>
                    <p className="text-sm text-gray-600 line-clamp-2 h-10 mb-2">{video.description}</p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <div className="flex items-center">
                        <ThumbsUp size={14} className="mr-1" />
                        <span>{video.likes}</span>
                      </div>
                      
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopyLink(video.id);
                        }}
                      >
                        Copiar Link
                      </Button>
                    </div>
                  </div>
                </Card>
                
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
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold">{video.title}</h3>
                      <button
                        onClick={() => handleToggleFavorite(video.id)}
                        className={`p-2 rounded-full ${
                          favoriteVideos.includes(video.id) 
                            ? 'text-mothers-pink' 
                            : 'text-gray-400 hover:text-mothers-pink'
                        } transition-colors`}
                      >
                        <Heart size={20} fill={favoriteVideos.includes(video.id) ? "currentColor" : "none"} />
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{video.author}</p>
                    <p className="text-gray-600">{video.description}</p>
                    
                    <div className="mt-4 flex items-center text-sm text-gray-500">
                      <div className="flex items-center mr-4">
                        <ThumbsUp size={16} className="mr-1" />
                        <span>{video.likes}</span>
                      </div>
                      <div className="flex items-center">
                        <Star size={16} className="mr-1 text-mothers-gold" />
                        <span>Recomendado para Fabiana</span>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )) : (
              <div className="col-span-3 text-center py-20">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-xl font-bold mb-2">Nenhum vídeo encontrado</h3>
                <p className="text-gray-600">Tente buscar com outras palavras</p>
              </div>
            )}
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
