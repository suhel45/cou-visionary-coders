import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../Hooks/contextApi/UserContext';

function Logout() {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error('AuthContext is null');
  }

  const { logOut } = authContext;

  const handleLogout = () => {
    try {
      logOut();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <button type="button" onClick={handleLogout}>
      Logout
    </button>
  );
}

export default Logout;
