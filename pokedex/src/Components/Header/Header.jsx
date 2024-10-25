import logo from "../../assets/pokemonlogo.svg";
import { Link } from "react-router-dom";
import "./Header.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Header({
  pokemonList,
  filteredPokemonList,
  searchTerm,
  setSearchTerm,
}) {
  //const [pokemonList, setPokemonList] = useState(pokemonData.results);
  //   const [searchTerm, setSearchTerm] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const navigate = useNavigate();

  //   const filteredPokemonList = pokemonList.filter((pokemon) =>
  //     pokemon.name.includes(searchTerm)
  //   );

  const showPokemon = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`Error fetching Pokemon: ${response.statusText}`);
      return;
    }

    const data = await response.json();
    setSelectedPokemon(data);
  };

  return (
    <div className="header">
      <header>
        <Link to="/">
          <img alt="header__logo" className="logo" src={logo} />
        </Link>
      </header>

      <main>
        <div className="search-container">
          <input
            className="search-box"
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>

        {selectedPokemon && (
          <div className="pokemon-details">
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
