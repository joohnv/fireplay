"use client";

import { useFavoritos } from "../hooks/useFavorites";
import { Heart } from "lucide-react";
import Image from "next/image";
import { Game } from "../interfaces/game.interface";

export default function GameCard({ game }: { game: Game }) { 
  const { toggleFavorito, isFavorito } = useFavoritos();

  return (
    <div className="relative bg-zinc-800 rounded-lg p-4 shadow hover:scale-105 transition">
      <Image 
        src={game.background_image} 
        alt={game.name} 
        width={400} 
        height={240} 
        className="rounded mb-2"
      />
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
