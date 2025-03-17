import { Route, Routes } from 'react-router-dom';
import Nav from './components/Nav';
import PageNotFound from './components/ErrorComponent';
import Footer from './shared/Footer/Footer';
import SignUp from './pages/signup/pages';
import Dashboard from './pages/dashboard/pages';
import Home from './pages/Home/pages';
import Biodata from './pages/biodata/pages';
import { Toaster } from 'react-hot-toast';
import Login from './pages/login/pages';
import AboutUs from './components/AboutUs';
import UserProfile from './pages/profile/pages';
import AuthProvider from './Hooks/contextApi/UserContext';
import UpdateBiodata from './components/form/UpdateBiodata';
// import PrivateRoute from './components/PrivateRoute';
import Analytic from './components/dashboard/analytics/Analytic';

function NoMatch() {
  return <PageNotFound/>;
}

export default function App() {
  return (
    // Wrap everything inside AuthProvider
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        {/* Nav component fixed at the top */}
        <Nav />

        {/* Content area */}
        <div className="flex-1 overflow-y-auto">
          <Toaster />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/aboutus" element={<AboutUs />} />
            {/* <Route element={<PrivateRoute />}> */}
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/biodata" element={<Biodata />} />
              <Route path="/dashboard/*" element={<Dashboard />}>
                <Route path="edit/profile" element={<UpdateBiodata />} />
                <Route path="" element={<Analytic />} />
              </Route>
            {/* </Route> */}
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </div>

        {/* Footer component fixed at the bottom */}
        <Footer />
      </div>
    </AuthProvider>
  );
}
