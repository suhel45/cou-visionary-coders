import React, { useState } from 'react';
import { Heart} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../Hooks/useAuth/useAuth';
import axios from 'axios';

interface FavoriteButtonProps {
  biodataId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ biodataId }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const handleToggleFavorite = async () => {
    if (!user) {
      toast.error('Please login to add favorites');
      return;
    }

    setIsLoading(true);
    try {
      if (isFavorite) {
        await axios.delete(`/favoriteList/${biodataId}`);
        toast.success('Removed from favorites');
      } else {
        await axios.post('/favoriteList', { biodataId });
        toast.success('Added to favorites');
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggleFavorite}
      disabled={isLoading}
      className="absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-sm 
                 hover:bg-white/30 transition-colors duration-200"
    >
      {isLoading ? (
        <span className="loading loading-spinner loading-sm"></span>
      ) : (
        isFavorite ? (
          <Heart className="text-red-500 text-xl" />
        ) : (
          <Heart className="text-white text-xl" />
        )
      )}
    </button>
  );
};

export default FavoriteButton;