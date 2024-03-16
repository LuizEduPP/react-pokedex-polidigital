import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import PokemonCard from '../components/PokemonCard';

const mockPokemon = { name: 'Pikachu', url: '' };

test('Renders PokemonCard without errors', () => {
  const queryClient = new QueryClient();

  render(
    <QueryClientProvider client={queryClient}>
      <PokemonCard
        initialPokemonNumber={25}
        pokemon={mockPokemon}
        key={'Pikachu'}
      />
    </QueryClientProvider>
  );

  expect(screen.getByText('Loading...')).toBeInTheDocument();
});
