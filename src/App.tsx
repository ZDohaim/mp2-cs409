import React from "react";
import logo from "./logo.svg";
import "./App.scss";
import ListView from "./list-view/ListView";
import DetailsView from "./details-view/DetailsView";
import GalleryView from "./gallery-view/GalleryView";
import { HashRouter, Routes, Route, Link } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <HashRouter>
        <div className="navbar">
          <h1>Top TVShows</h1>
          <Link to="/" className="nav-buttons">
            Search
          </Link>
          <Link to="/gallery" className="nav-buttons">
            Gallery
          </Link>
        </div>
        <Routes>
          <Route path="/" element={<ListView />} />
          <Route path="/details/:id" element={<DetailsView />} />
          <Route path="/gallery" element={<GalleryView />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
