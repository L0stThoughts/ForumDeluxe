import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar.tsx";
import { MainPage } from "./components/MainPage.tsx";
import Forum from "./components/categories/Forum.tsx";
import TermsOfService from "./components/TOS.tsx";
import { AuthProvider } from "./components/profile/AuthContent.tsx";
import ProfilePage from "./components/profile/ProfilePage.tsx";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/category/:categoryName" element={<Forum />} />
          <Route path="/tos" element={<TermsOfService />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
