import React, { useState } from "react";
import { Pokemon, usePokemonDetails } from "../services/pokemonAPI";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import PokemonModalContent from "./PokemonModalContent";

const formatName = (name: string) => {
  return name.charAt(0).toUpperCase() + name.slice(1);
};

interface PokemonCardProps {
  pokemon: Pokemon;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { name, url } = pokemon;
  const { data: pokemonDetails, isLoading } = usePokemonDetails(url);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const pokemonNumber = url.split("/").slice(-2, -1)[0];
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${pokemonNumber}.gif`;

  return (
    <>
      <Card>
        <div className="p-4 flex items-center" onClick={() => setIsModalOpen(true)} tabIndex={0}>
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
