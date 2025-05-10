'use client';

import { useState } from 'react';

export default function SearchBar({ onSearch }: { onSearch: (query: string) => void }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(input.trim()); 
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
      <input
        type="text"
        placeholder="Buscar juegos..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="p-2 rounded bg-zinc-800 text-white w-full"
      />
      <button
        type="submit"
        className="bg-blue-600 px-4 py-2 rounded text-white"
      >
        Buscar
      </button>
    </form>
  );
}
