import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar.tsx";
import { MainPage } from "./components/MainPage.tsx";
import Forum from "./components/categories/Forum.tsx";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/category/:categoryName" element={<Forum />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
