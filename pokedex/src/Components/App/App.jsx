import React from "react";
import Header from "../Header/Header";
import Pokecard from "../Pokecard/Pokecard";
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
  const [activePokemon, setPokeDex] = useState();
  const [pokeInfo, setPokeInfo] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const [pokemonList, setPokemonList] = useState(pokemonData.results);
  const filteredPokemonList = pokemonList.filter((pokemon) =>
    pokemon.name.includes(searchTerm)
  );

  console.log(filteredPokemonList);

  const pokeData = Object.values(pokeInfo).filter((pokemon) => {
    const bool = pokemon.name.includes(searchTerm);
    return bool;
  });

  const navigate = useNavigate();

  const pokeFun = async () => {
    setLoading(true);
    const res = await axios.get(url);
    setNextUrl(res.data.next);
    setPrevUrl(res.data.previous);
    fetchPokemonDetails(res.data.results);
    setLoading(false);
  };

  const fetchPokemonDetails = async (res) => {
    res.map(async (item) => {
      const result = await axios.get(item.url);

      setPokeInfo((state) => {
        state = { ...state, [result.data.id]: result.data };
        return state;
      });
    });
  };

  // const filteredPokemonList = async (filteredPokemonList) => {
  //   filteredPokemonList.map(async (item) => {
  //     const result = await axios.get(item.url);

  //     setPokeInfo((state) => {
  //       state = { ...state, [result.data.id]: result.data };
  //       return state;
  //     });
  //   });
  // };

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
              activePokemon={activePokemon}
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
  activePokemon,
  prevUrl,
  nextUrl,
}) {
  return (
    <div className="content">
      <div className="left__content">
        <Pokecard
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
        <Pokeinfo data={activePokemon} />
      </div>
    </div>
  );
}
export default App;
