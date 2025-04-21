// src/Hooks/useFavorite.ts
import { useState } from 'react';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';

export const useFavorite = () => {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const addToFavorites = async (biodataId: string) => {
    setIsLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/favoriteList`,
        { biodataId },
        { withCredentials: true },
      );
      queryClient.invalidateQueries({ queryKey: ['favoriteBiodatas'] });
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromFavorites = async (biodataId: string) => {
    setIsLoading(true);
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/favoriteList/${biodataId}`,
        {
          withCredentials: true,
        },
      );
      queryClient.invalidateQueries({ queryKey: ['favoriteBiodatas'] });
    } finally {
      setIsLoading(false);
    }
  };

  return { addToFavorites, removeFromFavorites, isLoading };
};
