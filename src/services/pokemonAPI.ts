import { useQuery, UseQueryOptions } from 'react-query';
import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2/';

export interface Pokemon {
  name: string;
  url: string;
}

export interface Ability {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface Stat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface Type {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonDetails {
  abilities: Ability[];
  base_experience: number;
  height: number;
  held_items: any[];
  id: number;
  is_default: boolean;
  name: string;
  order: number;
  past_abilities: any[];
  past_types: any[];
  stats: Stat[];
  types: Type[];
  weight: number;
}

export const usePokemons = (options?: UseQueryOptions<Pokemon[]>) => {
  return useQuery<Pokemon[]>(['pokemons'], async () => {
    const { data } = await axios.get(`${BASE_URL}pokemon`);

    return data.results;
  }, options);
};

export const usePokemonDetails = (url: string, options?: UseQueryOptions<PokemonDetails>) => {
  return useQuery<PokemonDetails>(['pokemon', url], async () => {
    const { data } = await axios.get(url);

    return data;
  }, options);
};

export const getPokemonByName = async (name: string) => {
  const { data } = await axios.get(`${BASE_URL}pokemon/${name}`);

  return data;
};

export const getPokemonByUrl = async (url: string) => {
  const { data } = await axios.get(url);

  return data;
};
