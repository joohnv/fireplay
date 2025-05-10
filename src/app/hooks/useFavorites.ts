'use client';

import { useEffect, useState } from 'react';

export function useFavoritos() {
  const [favoritos, setFavoritos] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('favoritos');
    if (stored) setFavoritos(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
  }, [favoritos]);

  const toggleFavorito = (id: string) => {
    setFavoritos((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const isFavorito = (id: string) => favoritos.includes(id);

  return { favoritos, toggleFavorito, isFavorito };
}
