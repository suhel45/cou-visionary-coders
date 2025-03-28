const GoogleSignIn = () => {
  return (
    <button
    onClick={signInWithGoogle}
      className="cursor-pointer flex items-center justify-center w-full bg-white border border-gray-300 text-gray-700 p-2 rounded-md shadow-md hover:bg-gray-100"
    >
      <img
        src="https://imgs.search.brave.com/0dfkmCFWC2zrjWCenB_rDnfa_wKBmKDmxG4qSB78iQs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMtMDAuaWNvbmR1/Y2suY29tL2Fzc2V0/cy4wMC9nb29nbGUt/aWNvbi01MTJ4NTEy/LXRxYzllbDNyLnBu/Zw"
        alt="Google"
        className="w-5 h-5 mr-2"
      />{' '}
      Sign in with Google
    </button>
  );
};

export default GoogleSignIn;
