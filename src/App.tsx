import React from "react";
import "./App.scss";
import { Navbar } from "./components/navbar.tsx";
import { MainPage } from "./components/MainPage.tsx";

function App() {
  return (
    <div className="App">
      <Navbar />
      <MainPage />
    </div>
  );
}

export default App;
