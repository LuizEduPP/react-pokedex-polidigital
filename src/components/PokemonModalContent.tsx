import React from "react";
import ModalHeader from "./ModalHeader";

const PokemonModalContent: React.FC<{
  name: string;
  imageUrl: string;
  pokemonDetails: any;
  isLoading: boolean;
  onClose: () => void;
}> = ({ name, imageUrl, pokemonDetails, isLoading, onClose }) => {
  return (
    <div className="bg-white rounded-lg p-8 z-20">
      <ModalHeader title={name} onClose={onClose} />
      <div className="flex justify-center mb-4">
        <img src={imageUrl} alt={name} className="h-32 w-32" />
      </div>
      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <p>Base Experience: {pokemonDetails?.base_experience}</p>
            <p>Height: {pokemonDetails?.height}</p>
            <p>Weight: {pokemonDetails?.weight}</p>
            <p>Order: {pokemonDetails?.order}</p>
            <p>Is Default: {pokemonDetails?.is_default.toString()}</p>
            {pokemonDetails?.abilities && (
              <p>
                Abilities:{" "}
                {pokemonDetails.abilities.map((ability: any) => ability.ability.name).join(", ")}
              </p>
            )}
            {pokemonDetails?.types && (
              <p>
                Types:{" "}
                {pokemonDetails.types.map((type: any) => type.type.name).join(", ")}
              </p>
            )}
            {pokemonDetails?.stats && (
              <p>
                Stats:{" "}
                {pokemonDetails.stats.map((stat: any) => (
                  <span key={stat.stat.name}>
                    {stat.stat.name}: {stat.base_stat}
                  </span>
                ))}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PokemonModalContent;
