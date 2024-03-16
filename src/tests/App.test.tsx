import React from 'react';
import { render, screen } from '@testing-library/react';
import App from 'App';

jest.mock('../services/pokemonAPI', () => ({
  usePokemons: () => ({
    isLoading: false,
    error: null,
    data: [],
  })
}));

describe('App', () => {
  test('renders without error', async () => {
    render(<App />);
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });
});
