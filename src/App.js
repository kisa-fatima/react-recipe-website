import React from "react";
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
import AdminHeader from './components/AdminHeader';
import { useSelector } from 'react-redux';

function ProtectedRoute({ children }) {
  const isAdminLoggedIn = useSelector((state) => state.adminAuth.isAdminLoggedIn);
  const location = useLocation();
  if (!isAdminLoggedIn) {
    return <Navigate to="/log-in" state={{ from: location }} replace />;
  }
  return children;
}

function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const isAdminRoute = location.pathname.startsWith('/log-in/admin');
  const isLoginRoute = location.pathname === '/log-in';
  const isHomeRoute = location.pathname === '/';
  const [loginModalOpen, setLoginModalOpen] = React.useState(false);
  const isAdminLoggedIn = useSelector((state) => state.adminAuth.isAdminLoggedIn);

  React.useEffect(() => {
    if (isLoginRoute && !loginModalOpen) {
      setLoginModalOpen(true);
    }
    if (!isLoginRoute && loginModalOpen) {
      setLoginModalOpen(false);
    }
  }, [isLoginRoute, loginModalOpen]);

  const handleLoginModalClose = () => {
    setLoginModalOpen(false);
    if (isLoginRoute) {
      navigate('/');
    }
  };

  // Show AdminHeader above Header if admin is logged in and not in admin panel
  const showAdminHeader = isAdminLoggedIn && !isAdminRoute;

  return (
      <Layout>
      {showAdminHeader && <AdminHeader showDashboardButton />}
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
  return (
    <Router>
      <AppLayout />
      <ToastContainer position="top-right" theme="colored" />
    </Router>
  );
}
