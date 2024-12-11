import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [likedSongs, setLikedSongs] = useState([]);

  const addLikedSong = (song) => {
    setLikedSongs((prevLikedSongs) => [...prevLikedSongs, song]);
  };

  const removeLikedSong = (songId) => {
    setLikedSongs((prevLikedSongs) => prevLikedSongs.filter(song => song.id !== songId));
  };

  const contextValue = {
    likedSongs,
    addLikedSong,
    removeLikedSong,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};