import { Game } from "../interfaces/game.interface";

const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;
const BASE_URL = 'https://api.rawg.io/api';

export async function getPopularGames(pageSize = 12, page = 1) {
  const res = await fetch(`${BASE_URL}/games?key=${API_KEY}&page_size=${pageSize}&page=${page}`);
  if (!res.ok) {
    throw new Error(`Error al obtener juegos: ${res.status}`);
  }
  const data = await res.json();
  return data.results;
}

export async function fetchGames(search: string = '') {
  const apiKey = process.env.NEXT_PUBLIC_RAWG_API_KEY;
  const url = `https://api.rawg.io/api/games?key=${apiKey}&search=${encodeURIComponent(search)}`;

  const res = await fetch(url);

  if (!res.ok) throw new Error('Error al obtener los juegos');

  const data = await res.json();
  return data.results;
}

export async function fetchGamesByIds(ids: number[]): Promise<Game[]> {
  const promises = ids.map(id => fetchGameDetails(id));
  return Promise.all(promises);
}

export async function fetchGameDetails(id: number) {
  const res = await fetch(`https://api.rawg.io/api/games/${id}?key=289b762ecd974ad39bd816332d7ec562`);
  if (!res.ok) throw new Error("Error al obtener detalles del juego");
  return res.json();
}
