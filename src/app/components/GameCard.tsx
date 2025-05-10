'use client';

import { useFavoritos } from "../hooks/useFavorites";
import { Heart } from "lucide-react";

export default function GameCard({ game }: { game: any }) {
  const { toggleFavorito, isFavorito } = useFavoritos();

  return (
    <div className="relative bg-zinc-800 rounded-lg p-4 shadow hover:scale-105 transition">
      <img src={game.background_image} alt={game.name} className="rounded mb-2" />
      <h2 className="text-lg font-semibold">{game.name}</h2>

      <button
        className="absolute top-2 right-2 text-red-500 hover:scale-110 transition"
        onClick={() => toggleFavorito(game.id.toString())}
      >
        <Heart fill={isFavorito(game.id.toString()) ? 'currentColor' : 'none'} />
      </button>
    </div>
  );
}
