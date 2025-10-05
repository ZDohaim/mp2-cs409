import React from "react";
import logo from "./logo.svg";
import "./App.css";
import ListView from "./list-view/ListView";
import { HashRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<ListView />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
