import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
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

function AppLayout() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  return (
      <Layout>
      {!isAdmin && <Header />}
        <Layout.Content style={{ minHeight: 'calc(100vh - 90px)' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/recipes" element={<AllRecipes />} />
            <Route path="/start-here" element={<StartHere />} />
            <Route path="/category/:category" element={<CategoryWise />} />
            <Route path="/all-recipes" element={<AllRecipes />} />
          <Route path="/recipe/:id" element={<RecipePage />} />
          <Route path="/admin" element={<AdminPanel />}>
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="recipes" element={<AdminRecipesPage />} />
            <Route path="cuisines" element={<AdminCuisinesPage />} />
          </Route>
          </Routes>
        </Layout.Content>
      {!isAdmin && <Footer />}
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
