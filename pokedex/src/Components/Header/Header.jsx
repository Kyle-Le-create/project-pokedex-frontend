import logo from "../../assets/pokemonlogo.svg";
import pokeball from "../../assets/pokeball.png";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import React, { useState } from "react";
// import { getPokemonFetch } from "../../utils/api";

function Header({
  pokemonList,
  filteredPokemonList,
  searchTerm,
  setSearchTerm,
}) {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const navigate = useNavigate();

  // const showPokemon = async (url) => {
  //   const pokemonData = await getPokemonFetch();
  //   setSelectedPokemon(pokemonData);
  // };

  return (
    <div className="header">
      <header>
        <Link to="/">
          <img alt="logo" className="header__logo" src={logo} />
        </Link>
        <nav></nav>
        <Link to="/aboutme">
          <img alt="about me logo" className="header__ball" src={pokeball} />
        </Link>
        <nav></nav>
      </header>

      <main>
        <div className="header__container">
          <input
            className="header__search"
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>

        {selectedPokemon && (
          <div className="pokemon__details">
            <h2>{selectedPokemon.name}</h2>
            <img
              src={selectedPokemon.sprites.front_default}
              alt={selectedPokemon.name}
            />
            <p>Height: {selectedPokemon.height}</p>
            <p>Weight: {selectedPokemon.weight}</p>

            {selectedPokemon.stats.map((stat, index) => (
              <div key={index}>
                <p>
                  {stat.stat.name}: {stat.base_stat}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Header;
