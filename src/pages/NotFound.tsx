
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-mothers-cream/30">
      <div className="text-center p-8">
        <h1 className="text-6xl font-script magical-text mb-4">404</h1>
        <div className="text-8xl mb-8 animate-float">🌸</div>
        <p className="text-xl text-mothers-purple mb-8">
          Oops! Parece que esta página não existe.
        </p>
        <Link to="/">
          <Button className="button-magical">
            Voltar para o Início
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
