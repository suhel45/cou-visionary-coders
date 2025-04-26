import { Route, Routes } from 'react-router-dom';
import Nav from './components/Nav';
import PageNotFound from './components/ErrorComponent';
import Footer from './shared/Footer/Footer';
import SignUp from './pages/signup/pages';
import Dashboard from './pages/dashboard/pages';
import Faq from './pages/faq/pages';
import Home from './pages/Home/pages';
import { Toaster } from 'react-hot-toast';
import Login from './pages/login/pages';
import AboutUs from './components/AboutUs';
import AuthProvider from './Hooks/contextApi/UserContext';
import UpdateBiodata from './components/form/UpdateBiodata';
import Analytic from './components/dashboard/analytics/Analytic';
import Settings from './components/dashboard/settings/Setting';
import UserProfilePages from './pages/profile/UserProfilePages';
import Verify from './components/dashboard/verify/Verify';
import PrivateRoute from './components/PrivateRoute';
import BiodataList from './components/biodata/BiodataList';
import BiodataDetailsProfile from './pages/profile/BiodataDetailsProfile';
import ForgotPassword from './components/forgotPassword/ForgotPassword';
import ResetForgotPassword from './components/forgotPassword/ResetForgotPassword';
import FavoriteListPage from './pages/favoritePage/FavoriteListPage';
import SupportAndReportPage from './pages/supportAndReport/SupportAndReportPage';

function NoMatch() {
  return <PageNotFound />;
}

export default function App() {


  // Check if the current route is /admin


  return (
    // Wrap everything inside AuthProvider
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        {/* Conditionally render Nav */}
         <Nav />

        {/* Content area */}
        <div className="flex-1 overflow-y-auto md:mt-20">
          <Toaster position="top-right" />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/biodata" element={<BiodataList />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/reset-password/:resetToken"
              element={<ResetForgotPassword />}
            />
            <Route
              path="/biodata/profile/:id"
              element={<BiodataDetailsProfile />}
            />
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard/*" element={<Dashboard />}>
                <Route path="edit/profile" element={<UpdateBiodata />} />
                <Route path="" element={<Analytic />} />
                <Route path="edit/verify" element={<Verify />} />
                <Route path="favourite" element={<FavoriteListPage />} />
                <Route
                  path="support-report"
                  element={<SupportAndReportPage />}
                />
                <Route path="settings" element={<Settings />} />
              </Route>
              <Route path="/profile" element={<UserProfilePages />} />
            </Route>
            {/* <Route path="/admin" element={<Admin />} /> */}
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </div>

        {/* Footer component fixed at the bottom */}
       <Footer />
      </div>
    </AuthProvider>
  );
}
