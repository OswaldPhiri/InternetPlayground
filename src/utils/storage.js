
export const STORAGE_KEY_FAVORITES = 'ip_favorites';
export const STORAGE_KEY_HISTORY = 'ip_history';
export const STORAGE_KEY_CURIOSITY = 'ip_curiosity';
export const EXPIRY_TIME = 24 * 60 * 60 * 1000; // 24 hours in ms

export const saveToStorage = (key, data) => {
  const item = {
    data,
    timestamp: Date.now(),
  };
  localStorage.setItem(key, JSON.stringify(item));
};

export const getFromStorage = (key) => {
  const raw = localStorage.getItem(key);
  if (!raw) return null;

  try {
    const { data, timestamp } = JSON.parse(raw);
    if (Date.now() - timestamp > EXPIRY_TIME) {
      localStorage.removeItem(key);
      return null;
    }
    return data;
  } catch (e) {
    console.error('Storage parse error', e);
    return null;
  }
};

export const appendToHistory = (item) => {
  const history = getFromStorage(STORAGE_KEY_HISTORY) || [];
  const newItem = { ...item, id: Date.now(), timestamp: Date.now() };
  const updatedHistory = [newItem, ...history].slice(0, 10);
  saveToStorage(STORAGE_KEY_HISTORY, updatedHistory);
};

export const toggleFavorite = (item) => {
  const favorites = getFromStorage(STORAGE_KEY_FAVORITES) || [];
  const exists = favorites.find(f => f.id === item.id);
  
  let updated;
  if (exists) {
    updated = favorites.filter(f => f.id !== item.id);
  } else {
    updated = [...favorites, item];
  }
  
  saveToStorage(STORAGE_KEY_FAVORITES, updated);
  return !exists;
};
