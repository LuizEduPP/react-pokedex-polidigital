import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SearchBar from '../components/SearchBar';

test('calls setSearchQuery prop with input value when input changes', () => {
  const setSearchQueryMock = jest.fn();
  const { container } = render(<SearchBar setSearchQuery={setSearchQueryMock} />);

  const input = container.querySelector('input') as HTMLInputElement;
  fireEvent.change(input, { target: { value: 'pikachu' } });

  expect(setSearchQueryMock).toHaveBeenCalledWith('pikachu');
});

test('focuses input on keyboard shortcut', () => {
  render(<SearchBar setSearchQuery={() => { }} />);

  const input = document.querySelector('input') as HTMLInputElement;
  const event = new KeyboardEvent('keydown', { key: '/', ctrlKey: true });
  document.dispatchEvent(event);

  expect(document.activeElement).toEqual(input);
});

test('removes event listener on unmount', () => {
  const { unmount } = render(<SearchBar setSearchQuery={() => { }} />);

  const handleShortcut = jest.spyOn(document, 'removeEventListener');
  unmount();
  expect(handleShortcut).toHaveBeenCalledWith('keydown', expect.any(Function));
});
