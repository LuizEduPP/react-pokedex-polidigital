import { useQuery, UseQueryOptions } from 'react-query';
import axios from 'axios';
import { Pokemon } from '../services/pokemonAPI';

const BASE_URL = 'https://pokeapi.co/api/v2/';

export const usePokemonList = (options?: UseQueryOptions<Pokemon[]>) => {
  return useQuery<Pokemon[]>(['pokemons'], async () => {
    const { data } = await axios.get(`${BASE_URL}pokemon`);
    return data.results;
  }, options);
};
