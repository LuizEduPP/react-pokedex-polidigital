import React, { useState } from "react";
import './App.css';

import { usePokemons } from "./services/pokemonAPI";
import PokemonCard from "./components/PokemonCard";
import SearchBar from "./components/SearchBar";

const App: React.FC = () => {
  const { isLoading, error, data } = usePokemons();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPokemons = data?.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) return <p>Loading Pokémon...</p>;

  if (error) return <p>Error: {(error as Error).message || "An error occurred"}</p>;

  return (
    <div className="container mx-auto">
      <div className="my-8">
        <SearchBar setSearchQuery={setSearchQuery} />
      </div>
      <div className="grid grid-cols-4 gap-4">
        {filteredPokemons?.map((pokemon) => (
          <PokemonCard
            key={pokemon.name}
            pokemon={pokemon}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
