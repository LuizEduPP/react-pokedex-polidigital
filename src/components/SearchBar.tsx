import React, { forwardRef, ForwardRefRenderFunction, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar: ForwardRefRenderFunction<HTMLInputElement, SearchBarProps> = ({ setSearchQuery }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === '/') {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }
    };

    document.addEventListener('keydown', handleShortcut);

    return () => {
      document.removeEventListener('keydown', handleShortcut);
    };
  }, []);

  return (
    <Input
      ref={inputRef}
      onChange={handleSearch}
      placeholder="Search..."
      className="w-full h-10 rounded-md border-gray-300 focus:border-blue-500"
    />
  );
};

export default forwardRef(SearchBar);
