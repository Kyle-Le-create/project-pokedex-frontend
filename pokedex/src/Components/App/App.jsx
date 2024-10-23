import React from "react";
import Card from "../Card/Card";
import Pokeinfo from "../Pokeinfo/Pokeinfo";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import "../App/App.css";
import "../style.css";
import Footer from "../Footer/Footer";
import { Routes, Route } from "react-router-dom";

const App = () => {
  //const [pokeData, setPokeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
  const [nextUrl, setNextUrl] = useState();
  const [prevUrl, setPrevUrl] = useState();
  const [pokeDex, setPokeDex] = useState();
  const [pokeInfo, setPokeInfo] = useState({});

  const pokeData = Object.values(pokeInfo);

  const pokeFun = async () => {
    setLoading(true);
    const res = await axios.get(url);
    setNextUrl(res.data.next);
    setPrevUrl(res.data.previous);
    getPokemon(res.data.results);
    setLoading(false);
  };

  console.log(pokeData);

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
      {/* <Header /> */}
      <Routes>
        <Route exact path="/" element={<h1>This is the main page</h1>} />
        <Route
          exact
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
