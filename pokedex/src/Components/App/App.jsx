import React from "react";
import Card from "../Card/Card";
import Pokeinfo from "../Pokeinfo/Pokeinfo";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import "../App/App.css";
import Footer from "../Footer/Footer";

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
    <>
      <div className="container">
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
        <Footer />
      </div>
    </>
  );
};
export default App;
