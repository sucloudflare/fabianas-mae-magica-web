
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Gallery from "./pages/Gallery";
import Videos from "./pages/Videos";
import Poems from "./pages/Poems";
import Games from "./pages/Games";
import Surprises from "./pages/Surprises";
import NotFound from "./pages/NotFound";
import MemoryGame from "./pages/games/MemoryGame";
import QuizGame from "./pages/games/QuizGame";
import WordGame from "./pages/games/WordGame";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/poems" element={<Poems />} />
          <Route path="/games" element={<Games />} />
          <Route path="/games/memory" element={<MemoryGame />} />
          <Route path="/games/quiz" element={<QuizGame />} />
          <Route path="/games/wordgame" element={<WordGame />} />
          <Route path="/surprises" element={<Surprises />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
