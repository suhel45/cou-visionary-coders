import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import BiodataCard from '../../components/biodata/BiodataCard';
import Loading from '../../utils/Loading/Loading';
import { User } from '../../interfaces/BiodataSearch.interface';

function FavoriteListPage() {
  const {
    data: favorites = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['favoriteBiodatas'],
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/favoriteList`,
        {
          withCredentials: true,
        },
      );
      return response.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl font-medium text-red-500">
          Unable to load favorites: {error.message}
        </p>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-purple-800 underline">
        Your Favorite Biodata's
      </h1>

      {favorites?.data?.length === 0 ? (
        <div className="text-center p-8 bg-gray-100 rounded-lg">
          <p className="text-xl">You don't have any favorite biodatas yet.</p>
        </div>
      ) : (
        <ul className="flex flex-wrap">
          {favorites?.data?.map((user: User) => (
            <BiodataCard key={user._id} user={user} mode="delete" />
          ))}
        </ul>
      )}
    </div>
  );
}

export default FavoriteListPage;
