"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getFavoriteGames } from "../lib/firestore";
import { Game } from "../interfaces/game.interface";

export default function FavoritosPage() {
  const { user } = useAuth();
  const [favoriteGames, setFavoriteGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavoriteGames = async () => {
      if (user) {
        try {
          const games = await getFavoriteGames(user.uid);
          console.log("Favorite games fetched:", games); 
          setFavoriteGames(Array.isArray(games) ? games : []);
        } catch (error) {
          console.error("Error al cargar favoritos: ", error);
          setFavoriteGames([]); // En caso de error, asignar un array vacío
        }
      }
      setLoading(false);
    };

    fetchFavoriteGames();
  }, [user]);

  return (
    <main className="p-6 bg-zinc-950 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">❤️ Favoritos</h1>

      {loading ? (
        <p>Cargando...</p>
      ) : favoriteGames.length === 0 ? (
        <p>No tienes juegos favoritos.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {favoriteGames.map((game) => (
            <div
              key={game.id}
              className="bg-zinc-900 rounded-xl overflow-hidden shadow hover:shadow-xl transition"
            >
              <img
                src={game.background_image} 
                alt={game.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 space-y-2">
                <h2 className="text-xl font-semibold">{game.name}</h2>
                <p className="text-sm text-zinc-400">⭐ {game.rating || "N/A"}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
