import React from "react";
import Header from "../Header/Header";
import Pokesprites from "../Pokesprites/Pokesprites";
import Pokeinfo from "../Pokeinfo/Pokeinfo";
import Aboutme from "../Aboutme/Aboutme";
import { useState, useEffect } from "react";
import "../App/App.css";
import "../style.css";
import Footer from "../Footer/Footer";
import { Routes, Route } from "react-router-dom";
import pokemonData from "../pokemonapi.json";
import { useNavigate } from "react-router-dom";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
  const [activePokemon, setActivePokemon] = useState();
  const [pokeInfo, setPokeInfo] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  console.log(searchTerm);

  const [pokemonList, setPokemonList] = useState(pokemonData.results);
  const filteredPokemonList = pokemonList.filter((pokemon) =>
    pokemon.name.includes(searchTerm)
  );

  const pokeData = Object.values(pokeInfo).filter((pokemon) => {
    const bool = pokemon.name.includes(searchTerm);
    return bool;
  });

  const navigate = useNavigate();

  const pokeFun = async () => {
    setLoading(true);
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Could not get data");
      }
      const data = await res.json();
      fetchPokemonDetails(data.results);
    } catch (error) {
      setLoading(false);
    }
  };

  async function getPokemonDetails(url) {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Could not get pokemon");
      }
      const pokemon = await res.json();

      setActivePokemon(pokemon);
    } catch (error) {
      console.error(error);
    }
  }

  const fetchPokemonDetails = async (res) => {
    res.map(async (item) => {
      const unparsedResult = await fetch(item.url);
      const result = await unparsedResult.json();

      setPokeInfo((state) => {
        state = { ...state, [result.id]: result };
        return state;
      });
    });
  };

  useEffect(() => {
    pokeFun();
  }, [url]);

  return (
    <div className="container">
      <Routes>
        {
          <Route
            exact
            path="/"
            element={
              <>
                <Header
                  pokemonList={pokemonList}
                  filteredPokemonList={filteredPokemonList}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                />
                <ul>
                  {filteredPokemonList.map((pokemon) => {
                    return (
                      <li key={pokemon.url} className="pokemon__item">
                        <a
                          onClick={() => {
                            getPokemonDetails(pokemon.url);
                            navigate("/pokemon");
                          }}
                        >
                          {pokemon.name}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </>
            }
          />
        }

        <Route
          path="/pokemon"
          element={
            <>
              <Header
                pokemonList={pokemonList}
                filteredPokemonList={filteredPokemonList}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
              <PokemonCards
                pokeData={pokeData}
                loading={loading}
                setActivePokemon={setActivePokemon}
                setPokeInfo={setPokeInfo}
                setUrl={setUrl}
                activePokemon={activePokemon}
              />
            </>
          }
        />
        <Route path="/aboutme" element={<Aboutme />} />
      </Routes>
      <Footer />
    </div>
  );
};

function PokemonCards({ pokeData, loading, setActivePokemon, activePokemon }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!activePokemon) {
      navigate("/");
    }
  }, [activePokemon]);
  return (
    <div className="content">
      <div className="left__content">
        <Pokesprites
          pokeData={pokeData}
          loading={loading}
          infoPokemon={(poke) => setActivePokemon(poke)}
          activePokemon={activePokemon}
        />
      </div>
      <div className="right__content">
        <Pokeinfo data={activePokemon} />
      </div>
    </div>
  );
}
export default App;
