import "./App.scss";
import ListView from "./list-view/ListView";
import DetailsView from "./details-view/DetailsView";
import GalleryView from "./gallery-view/GalleryView";
import { HashRouter, Routes, Route, Link } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <HashRouter basename="https://zdohaim.github.io/mp2-cs409/">
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
