import React, { createContext, useState, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, useNavigate } from "react-router-dom";
import { Layout } from "antd";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import StartHere from "./pages/StartHere";
import CategoryWise from "./pages/CategoryWise";
import AllRecipes from "./pages/AllRecipes";
import RecipePage from "./pages/RecipePage";
import "./styles/global.css";
import Footer from "./components/Footer";
import { ToastContainer } from 'react-toastify';
import AdminPanel from './pages/AdminPanel';
import AdminRecipesPage from './pages/AdminRecipesPage';
import AdminCuisinesPage from './pages/AdminCuisinesPage';
import AdminDashboard from './pages/AdminDashboard';
import LoginModal from './components/LoginModal';

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

function ProtectedRoute({ children }) {
  const { isAdmin } = useAuth();
  const location = useLocation();
  if (!isAdmin) {
    return <Navigate to="/log-in" state={{ from: location }} replace />;
  }
  return children;
}

function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const isAdminRoute = location.pathname.startsWith('/log-in/admin');
  const isLoginRoute = location.pathname === '/log-in';
  const { loginModalOpen, setLoginModalOpen } = useAuth();

  React.useEffect(() => {
    if (isLoginRoute && !loginModalOpen) {
      setLoginModalOpen(true);
    }
    if (!isLoginRoute && loginModalOpen) {
      setLoginModalOpen(false);
    }
  }, [isLoginRoute, loginModalOpen, setLoginModalOpen]);

  const handleLoginModalClose = () => {
    setLoginModalOpen(false);
    if (isLoginRoute) {
      navigate('/');
    }
  };

  return (
      <Layout>
      {!isAdminRoute && <Header />}
        <Layout.Content style={{ minHeight: 'calc(100vh - 90px)' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/recipes" element={<AllRecipes />} />
            <Route path="/start-here" element={<StartHere />} />
            <Route path="/category/:category" element={<CategoryWise />} />
            <Route path="/all-recipes" element={<AllRecipes />} />
            <Route path="/recipe/:id" element={<RecipePage />} />
            <Route path="/log-in" element={<></>} />
            <Route path="/log-in/admin" element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            }>
              <Route index element={<AdminDashboard />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="recipes" element={<AdminRecipesPage />} />
              <Route path="cuisines" element={<AdminCuisinesPage />} />
            </Route>
          </Routes>
        </Layout.Content>
      {!isAdminRoute && <Footer />}
      <LoginModal open={loginModalOpen} onClose={handleLoginModalClose} />
      </Layout>
  );
}

export default function App() {
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem('isAdmin') === 'true');
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const handleLogin = () => {
    setIsAdmin(true);
    localStorage.setItem('isAdmin', 'true');
    setLoginModalOpen(false);
  };
  const handleLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem('isAdmin');
  };
  return (
    <AuthContext.Provider value={{ isAdmin, setIsAdmin, loginModalOpen, setLoginModalOpen, handleLogin, handleLogout }}>
      <Router>
        <AppLayout />
        <ToastContainer position="top-right" theme="colored" />
      </Router>
    </AuthContext.Provider>
  );
}
