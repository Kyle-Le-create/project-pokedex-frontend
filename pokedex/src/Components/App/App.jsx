import React from "react";
import Header from "../Header/Header";
import Card from "../Card/Card";
import Pokeinfo from "../Pokeinfo/Pokeinfo";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import "../App/App.css";
import "../style.css";
import Footer from "../Footer/Footer";
import { Routes, Route } from "react-router-dom";
import pokemonData from "../pokemonapi.json";
import { useNavigate } from "react-router-dom";

const App = () => {
  //const [pokeData, setPokeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
  const [nextUrl, setNextUrl] = useState();
  const [prevUrl, setPrevUrl] = useState();
  const [pokeDex, setPokeDex] = useState();
  const [pokeInfo, setPokeInfo] = useState({});

  const [searchTerm, setSearchTerm] = useState("");

  const [pokemonList, setPokemonList] = useState(pokemonData.results);
  const filteredPokemonList = pokemonList.filter((pokemon) =>
    pokemon.name.includes(searchTerm)
  );

  const pokeData = Object.values(pokeInfo).filter((pokemon) => {
    const bool = pokemon.name.includes(searchTerm);
    return bool;
  });

  console.log(pokeData);

  const navigate = useNavigate();

  const pokeFun = async () => {
    setLoading(true);
    const res = await axios.get(url);
    setNextUrl(res.data.next);
    setPrevUrl(res.data.previous);
    getPokemon(res.data.results);
    setLoading(false);
  };

  const getPokemon = async (res) => {
    res.map(async (item) => {
      const result = await axios.get(item.url);

      setPokeInfo((state) => {
        state = { ...state, [result.data.id]: result.data };
        // state.sort((a, b) => (a.id > b.id ? 1 : -1));
        return state;
      });
    });
  };

  useEffect(() => {
    pokeFun();
  }, [url]);

  return (
    <div className="container">
      <Header
        pokemonList={pokemonList}
        filteredPokemonList={filteredPokemonList}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      {/* <Header
        pokemonList={pokemonList}
        searchTerm={searchTerm}
        selectedPokemon={selectedPokemon}
        filteredPokemonList={filteredPokemonList}
      /> */}
      <Routes>
        {
          <Route
            exact
            path="/"
            element={
              <ul>
                {filteredPokemonList.map((pokemon) => (
                  <li key={pokemon.id} className="pokemon-item">
                    <a
                      onClick={() => {
                        //showPokemon(pokemon.url);
                        navigate("/pokemon");
                      }}
                    >
                      {pokemon.name}
                    </a>
                  </li>
                ))}
              </ul>
            }
          />
        }

        <Route
          path="/pokemon"
          element={
            <PokemonCards
              pokeData={pokeData}
              loading={loading}
              setPokeDex={setPokeDex}
              setPokeInfo={setPokeInfo}
              setUrl={setUrl}
              pokeDex={pokeDex}
              prevUrl={prevUrl}
              nextUrl={nextUrl}
            />
          }
        />
      </Routes>
      <Footer />
    </div>
  );
};

function PokemonCards({
  pokeData,
  loading,
  setPokeDex,
  setPokeInfo,
  setUrl,
  pokeDex,
  prevUrl,
  nextUrl,
}) {
  return (
    <div className="content">
      <div className="left__content">
        <Card
          pokeData={pokeData}
          loading={loading}
          infoPokemon={(poke) => setPokeDex(poke)}
        />

        <div className="btn__group">
          {prevUrl && (
            <button
              onClick={() => {
                setPokeInfo({});
                setUrl(prevUrl);
              }}
            >
              Previous
            </button>
          )}

          {nextUrl && (
            <button
              onClick={() => {
                setPokeInfo({});
                setUrl(nextUrl);
              }}
            >
              Next
            </button>
          )}
        </div>
      </div>
      <div className="right__content">
        <Pokeinfo data={pokeDex} />
      </div>
    </div>
  );
}
export default App;
