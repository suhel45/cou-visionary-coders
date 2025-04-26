import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchAdmin = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_BASE_URL}/api/auth/admin`,
      {
        withCredentials: true
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching admin:", error);
    throw error;
  }
};

const useAdmin = () => {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["admin"], 
    queryFn: fetchAdmin,
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });

  return { 
    data,  
    isLoading, 
    isError, 
    error 
  };
};

export default useAdmin;
