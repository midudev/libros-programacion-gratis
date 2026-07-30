const STORAGE_KEY = 'librosgratis-favorites';

export interface FavoritesAPI {
  getFavorites: () => string[];
  toggleFavorite: (bookId: string) => boolean;
  isFavorite: (bookId: string) => boolean;
}

export function getFavorites(): string[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function toggleFavorite(bookId: string): boolean {
  const favorites = getFavorites();
  const index = favorites.indexOf(bookId);
  
  if (index === -1) {
    favorites.push(bookId);
  } else {
    favorites.splice(index, 1);
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  
  document.dispatchEvent(new CustomEvent('favorites-changed', {
    detail: { favorites, changedBookId: bookId }
  }));
  
  return index === -1;
}

export function isFavorite(bookId: string): boolean {
  return getFavorites().indexOf(bookId) !== -1;
}
