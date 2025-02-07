import { Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import SignUp from "./pages/signup/pages";

function NoMatch() {
  return <Error />;
}

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Nav component fixed at the top */}
     <Nav/>

      {/* Content area */}
      <div className="flex-1 overflow-y-auto">
       
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            

           
            <Route path="*" element={<NoMatch />} />
          </Routes>
       
      </div>

      {/* Footer component fixed at the bottom */}
      <Footer />
    </div>
  );
}
