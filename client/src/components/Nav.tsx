import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useApi from './useApi';
//import Logout from "./Logout";

function Nav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const api = useApi();

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsValid(false);
        return;
      }

      try {
        await api.get('/validate-token');
        setIsValid(true);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setIsValid(false);
      }
    };

    validateToken();
  }, [api]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header className="flex flex-col sm:flex-row items-center justify-between bg-gradient-to-r from-sky-800 to-pink-500 text-white sm:px-6">
        <div className="flex flex-row border-b-2 sm:border-none p-4 items-center justify-between w-full sm:w-auto">
          <img src="../src/assets/logo.png" alt="Halal Marrige"  className="h-14 w-auto object-contain sm:mr-4"/>
          <div
            className="block sm:hidden cursor-pointer"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </div>
        </div>
        <nav
          className={`${
            isMobileMenuOpen ? "block" : "hidden"
          } sm:flex sm:flex-row sm:items-center sm:gap-10`}
        >
          {isValid ? (
            <ul className="flex flex-col sm:flex-row items-center justify-evenly sm:gap-10">
              <li className="px-2 py-1 m-1 rounded-md border-2 hover:font-bold sm:m-0 grow hover:bg-pink-400">
                <Link to="/biodata">Biodata</Link>
              </li>
              <li className="flex flex-row px-2 py-1 m-1 rounded-md border-2 hover:font-bold sm:m-0 grow hover:bg-pink-400">
                <img src="/src/assets/profile.png" alt="" className="w-8 px-1" />
                <Link to="/profile">Profile</Link>
              </li>
              <li className="flex flex-row px-2 py-1 m-1 rounded-md border-2 hover:font-bold sm:m-0 grow hover:bg-pink-400">
                <img src="/src/assets/dashboard.png" alt="" className="w-8 px-1" />
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li className="flex flex-row px-2 py-1 m-1 rounded-md border-2 hover:font-bold sm:m-0 grow hover:bg-pink-400">
                <img src="/src/assets/logout.png" alt="" className="w-8 px-1" />
                <Link to="/login">
                  {/* <Logout /> */}
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="flex flex-col sm:flex-row items-center justify-evenly sm:gap-10">
              <li className="flex flex-row px-2 py-1 m-1 rounded-md border-2 hover:font-bold sm:m-0 grow hover:bg-pink-400">
                <Link to="/home">Home</Link>
              </li>
              <li className="px-2 py-1 m-1 rounded-md border-2 hover:font-bold sm:m-0 grow hover:bg-pink-400">
                <Link to="/about">About Us</Link>
              </li>
              <li className="flex flex-row px-2 py-1 m-1 rounded-md border-2 hover:font-bold sm:m-0 grow hover:bg-pink-400">
                <img src="/src/assets/signup.png" alt="" className="w-8 px-1" />
                <Link to="/signup">Sign Up</Link>
              </li>
              <li className="flex flex-row px-2 py-1 m-1 rounded-md border-2 hover:font-bold sm:m-0 grow hover:bg-pink-400">
                <img src="/src/assets/login.png" alt="" className="w-8 px-1" />
                <Link to="/login">Log in</Link>
              </li>
            </ul>
          )}
        </nav>
      </header>
    </>
  );
}

export default Nav;
