import React from "react";
import "./App.css";
import PokemonCircleNav from "./components/PokemonCircleNav";

const App = () => {
  return (
    <div className="app-main">
      <div className="app-container">
        <h1>Pokémon Gallery</h1>
        <div>
          <PokemonCircleNav />
        </div>
      </div>
      <div>
      <footer className="footer">
       <p>© 2025 Pokémon Evolution Wheel. Data provided by PokéAPI.</p>
      </footer>
      </div>
    </div>
  );
};

export default App;
