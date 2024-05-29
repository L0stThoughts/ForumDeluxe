import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar.tsx";
import { MainPage } from "./components/MainPage.tsx";
import Forum from "./components/categories/Forum.tsx";
import TermsOfService from "./components/TOS.tsx";
import { AuthProvider } from "./components/profile/AuthContent.tsx";
import ProfilePage from "./components/profile/ProfilePage.tsx";
import Footer from "./components/Footer.tsx";
import Chat from "./components/chat/Chat.tsx";
import NotFound from "./components/NotFound.tsx";
import ThreadPage from "./components/categories/ThreadPage.tsx";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="flex-grow-1" style={{ paddingBottom: '60px' }}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/category/:categoryName" element={<Forum />} />
            <Route path="/category/:categoryName/:link" element={<ThreadPage/>} />
            <Route path="/tos" element={<TermsOfService />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
