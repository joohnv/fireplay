import { Game } from '../interfaces/game.interface';
import { db } from './firebase';
import { doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove, deleteField } from "firebase/firestore";

// Agregar un juego a los favoritos de un usuario
export async function addToFavorites(userId: string, game: Game) {
  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    // Si el usuario ya tiene favoritos, agrega el juego al campo 'favorites'
    await updateDoc(userRef, {
      [`favorites.${game.id}`]: game, 
    });
  } else {
    // Si el documento no existe, crea uno nuevo con los favoritos
    await setDoc(userRef, {
      favorites: {
        [game.id]: game, // Guarda el juego en favoritos usando su ID como clave
      },
    });
  }
}



// Eliminar un juego de los favoritos de un usuario
export const removeFromFavorites = async (userId: string, gameId: number) => {
  const userRef = doc(db, 'users', userId);

  // Eliminar el juego de los favoritos usando el ID del juego
  await updateDoc(userRef, {
    [`favorites.${gameId}`]: deleteField(), // Elimina el campo específico del juego por su ID
  });
};

// Agregar un juego al carrito de un usuario
export const addToCart = async (userId: string, game: Game) => {
  const userRef = doc(db, 'users', userId);

  // Añadir solo el ID del juego al carrito
  await updateDoc(userRef, {
    cart: arrayUnion(game.id), // Solo el ID del juego
  });
};

// Eliminar un juego del carrito de un usuario
export const removeFromCart = async (userId: string, gameId: number) => {
  const userRef = doc(db, 'users', userId);

  // Eliminar el ID del juego del carrito
  await updateDoc(userRef, {
    cart: arrayRemove(gameId),
  });
};

export async function getFavoriteGames(userId: string): Promise<Game[]> {
  try {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userData = docSnap.data();
      const favorites = userData?.favorites || {};

      return Object.values(favorites); // Aquí devuelve un array de juegos
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error al obtener los favoritos: ", error);
    return [];
  }
}


// Obtener el carrito de un usuario
export const getCart = async (userId: string) => {
  const userRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userRef);

  if (userDoc.exists()) {
    return userDoc.data()?.cart || []; // Devuelve solo los IDs de los juegos en el carrito
  }
  return [];
};
