import { Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./shared/Footer/Footer";
import SignUp from "./pages/signup/pages";
import Home from "./pages/Home/pages";
import Login from "./pages/login/pages";
import AboutUs from "./components/AboutUs";
import PersonalInformation from "./components/PersonalInformation";

function NoMatch() {
  return "Pages Not Found";
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
            <Route path="/aboutus" element={<AboutUs />} />
            

           
            <Route path="*" element={<NoMatch />} />
          </Routes>
       
      </div>

       <PersonalInformation />
      {/* Footer component fixed at the bottom */}
      <Footer />
    </div>
  );
}
