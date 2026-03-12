
import React, { useState, useEffect } from 'react';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import FavoritesPanel from './components/common/FavoritesPanel';
import HistoryPanel from './components/common/HistoryPanel';
import { getFromStorage, STORAGE_KEY_FAVORITES, STORAGE_KEY_HISTORY, saveToStorage } from './utils/storage';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Load initial data
    setFavorites(getFromStorage(STORAGE_KEY_FAVORITES) || []);
    setHistory(getFromStorage(STORAGE_KEY_HISTORY) || []);
    
    // Check dark mode preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
       setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Sync state with storage
  const refreshStorage = () => {
    setFavorites(getFromStorage(STORAGE_KEY_FAVORITES) || []);
    setHistory(getFromStorage(STORAGE_KEY_HISTORY) || []);
  };

  const handleRemoveFavorite = (item) => {
    const updated = favorites.filter(f => f.id !== item.id);
    setFavorites(updated);
    saveToStorage(STORAGE_KEY_FAVORITES, updated);
  };

  const handleOpenItem = (item) => {
    // For sharing/reopening, we could use routing or specific state
    // For this simple version, we'll just log or alert
    console.log('Opening item:', item);
    // In a fuller version, we could set specific card state via a shared context
  };

  return (
    <div className={`min-h-screen animated-gradient ${darkMode ? 'dark text-white' : 'bg-slate-50 text-slate-900'}`}>
      <Header 
        darkMode={darkMode} 
        setDarkMode={setDarkMode} 
        onOpenFavorites={() => { refreshStorage(); setShowFavorites(true); }}
        onOpenHistory={() => { refreshStorage(); setShowHistory(true); }}
      />
      
      <Home />
      
      <Footer />

      <FavoritesPanel 
        isOpen={showFavorites} 
        onClose={() => setShowFavorites(false)}
        favorites={favorites}
        onRemove={handleRemoveFavorite}
        onOpenItem={handleOpenItem}
      />

      <HistoryPanel 
        isOpen={showHistory} 
        onClose={() => setShowHistory(false)}
        history={history}
        onOpenItem={handleOpenItem}
      />
    </div>
  );
}

export default App;
