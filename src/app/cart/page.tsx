'use client';

import { useEffect, useState } from 'react';
import { Game } from '../interfaces/game.interface';
import { getCart, removeFromCart } from '../lib/firestore';
import { useAuth } from '../context/AuthContext';
import { fetchGamesByIds } from '../lib/rawg';

export default function CartPage() {
  const { user } = useAuth();
  const [cartGames, setCartGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCart = async () => {
      if (!user) return;

      setLoading(true);
      try {
        const gameIds: number[] = await getCart(user.uid);
        if (gameIds.length === 0) {
          setCartGames([]);
        } else {
          const games = await fetchGamesByIds(gameIds);
          setCartGames(games);
        }
      } catch (error) {
        console.error('Error al cargar el carrito:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, [user]);

  const handleRemove = async (gameId: number) => {
    if (!user) return;
    await removeFromCart(user.uid, gameId);
    setCartGames(prev => prev.filter(game => game.id !== gameId));
  };

  return (
    <main className="p-6 bg-zinc-950 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">🛒 Tu carrito</h1>

      {loading ? (
        <p>Cargando carrito...</p>
      ) : cartGames.length === 0 ? (
        <p>No tienes juegos en el carrito.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {cartGames.map((game) => (
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
                <button
                  onClick={() => handleRemove(game.id)}
                  className="bg-red-600 px-3 py-1 rounded text-sm"
                >
                  ❌ Quitar del carrito
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
