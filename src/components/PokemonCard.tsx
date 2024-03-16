import React, { useState, useEffect } from "react";
import { Pokemon, usePokemonDetails } from "../services/pokemonAPI";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import PokemonModalContent from "./PokemonModalContent";

const formatName = (name: string) => {
  return name.charAt(0).toUpperCase() + name.slice(1);
};

interface PokemonCardProps {
  key: string;
  pokemon: Pokemon;
  initialPokemonNumber: number;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ initialPokemonNumber }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pokemonNumber, setPokemonNumber] = useState(initialPokemonNumber);

  const { data: pokemonDetails, isLoading } = usePokemonDetails(
    `https://pokeapi.co/api/v2/pokemon/${pokemonNumber}/`
  );

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowRight") {
      setPokemonNumber((prevNumber) => prevNumber + 1);
    } else if (event.key === "ArrowLeft") {
      setPokemonNumber((prevNumber) => Math.max(1, prevNumber - 1));
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [pokemonNumber]);

  if (!pokemonDetails) {
    return <div>Loading...</div>;
  }

  const { name } = pokemonDetails;
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${pokemonNumber}.gif`;

  return (
    <>
      <Card>
        <div
          className="p-4 flex items-center"
          onClick={() => setIsModalOpen(true)}
          tabIndex={0}
        >
          <Avatar className="mr-4">
            <AvatarImage src={imageUrl} alt={name} />
          </Avatar>
          <h3 className="font-bold text-lg">{formatName(name)}</h3>
        </div>
      </Card>
      {isModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <PokemonModalContent
              name={formatName(name)}
              imageUrl={imageUrl}
              pokemonDetails={pokemonDetails}
              isLoading={isLoading}
              onClose={handleModalClose}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default PokemonCard;
