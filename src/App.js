import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Recipes from "./pages/Recipes";
import StartHere from "./pages/StartHere";
import CategoryWise from "./pages/CategoryWise";
import "./styles/global.css";
import Footer from "./components/Footer";

export default function App() {
  return (
    <Router>
      <Layout>
        <Header />
        <Layout.Content style={{ minHeight: 'calc(100vh - 90px)' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/start-here" element={<StartHere />} />
            <Route path="/category/:category" element={<CategoryWise />} />
          </Routes>
        </Layout.Content>
      </Layout>

      <Footer />
    </Router>
  );
}
