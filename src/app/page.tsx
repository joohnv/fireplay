"use client";

import { useEffect, useState } from "react";
import { fetchGames, getPopularGames } from "./lib/rawg";
import { Game } from "./interfaces/game.interface";
import { addToFavorites, removeFromFavorites, addToCart, removeFromCart, getFavoriteGames, getCart } from "./lib/firestore";
import SearchBar from "./components/SearchBar";
import { useAuth } from "./context/AuthContext";

export default function HomePage() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const { user } = useAuth();
  const [favoriteGames, setFavoriteGames] = useState<number[]>([]);
  const [cartGames, setCartGames] = useState<number[]>([]); // Solo almacenamos los IDs

  useEffect(() => {
    const loadGames = async () => {
      setLoading(true);
      try {
        const data = query.trim()
          ? await fetchGames(query)
          : await getPopularGames();
        setGames(data);
      } catch (error) {
        console.error("Error al cargar juegos: ", error);
      } finally {
        setLoading(false);
      }
    };

    loadGames();
  }, [query]);

  useEffect(() => {
    if (user) {
      // Cargar los favoritos y carrito del usuario desde Firestore
      const loadUserData = async () => {
        const userFavorites = await getFavoriteGames(user.uid);
        const userCart = await getCart(user.uid);
        setFavoriteGames(userFavorites.map((game) => game.id)); 
        setCartGames(userCart); 
      };

      loadUserData();
    }
  }, [user]);

  const handleAddToFavorites = async (game: Game) => {
    if (user) {
      await addToFavorites(user.uid, game);
      setFavoriteGames(prev => [...prev, game.id]); // Actualizar el estado local con el nuevo favorito
    }
  };

  const handleRemoveFromFavorites = async (gameId: number) => {
    if (user) {
      await removeFromFavorites(user.uid, gameId);
      setFavoriteGames(prev => prev.filter(id => id !== gameId)); // Actualizar el estado local
    }
  };

  const handleAddToCart = async (game: Game) => {
    if (user) {
      await addToCart(user.uid, game);
      setCartGames(prev => [...prev, game.id]); // Actualizar el estado local con el nuevo juego en el carrito
    }
  };

  const handleRemoveFromCart = async (gameId: number) => {
    if (user) {
      await removeFromCart(user.uid, gameId);
      setCartGames(prev => prev.filter(id => id !== gameId)); // Actualizar el estado local
    }
  };

  return (
    <main className="p-6 bg-zinc-950 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">🎮 Juegos populares</h1>

      <SearchBar onSearch={setQuery} />

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {games.map((game) => (
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
                <p className="text-sm text-zinc-400">⭐ {game.rating}</p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleAddToFavorites(game)}
                    className="bg-pink-600 px-3 py-1 rounded text-sm"
                  >
                    {favoriteGames.includes(game.id) ? "❤️ En favoritos" : "❤️ Añadir a favoritos"}
                  </button>
                  <button
                    onClick={() => handleAddToCart(game)}
                    className="bg-green-600 px-3 py-1 rounded text-sm"
                  >
                    {cartGames.includes(game.id) ? "🛒 En carrito" : "🛒 Añadir al carrito"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
