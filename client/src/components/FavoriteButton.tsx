import React from 'react';
import { Heart, Trash } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../Hooks/useAuth/useAuth';
import { useFavorite } from '../Hooks/useFavorite/useFavorite';

interface FavoriteButtonProps {
  biodataId: string;
  mode?: 'add' | 'delete';
  onSuccess?: () => void;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  biodataId,
  mode = 'add',
  onSuccess,
}) => {
  const { user } = useAuth();
  const { addToFavorites, removeFromFavorites, isLoading } = useFavorite();

  const handleAction = async () => {
    if (!user) {
      toast.error('Please login first');
      return;
    }

    try {
      if (mode === 'delete') {
        await removeFromFavorites(biodataId);
        toast.success('Removed from favorites');
      } else {
        await addToFavorites(biodataId);
        toast.success('Added to favorites');
      }

      if (onSuccess) onSuccess();
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error ? error.message : 'Something went wrong',
      );
    }
  };

  const isDeleteMode = mode === 'delete';

  return (
    <button
      onClick={handleAction}
      disabled={isLoading}
      className={`absolute top-4 right-4 p-2 rounded-full transition-colors duration-200 
        ${
          isDeleteMode
            ? 'bg-red-500 hover:bg-red-600'
            : 'bg-white/20 backdrop-blur-sm hover:bg-white/30'
        }`}
    >
      {isLoading ? (
        <span className="loading loading-spinner loading-sm"></span>
      ) : isDeleteMode ? (
        <Trash className="text-white text-xl" />
      ) : (
        <Heart className="text-white text-xl" />
      )}
    </button>
  );
};

export default FavoriteButton;
