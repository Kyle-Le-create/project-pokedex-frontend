import React from "react";
import "./Pokesprites.css";

const Pokesprites = ({ pokeData, loading, infoPokemon, activePokemon }) => {
  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div key={activePokemon?.id}>
          <div className="card" onClick={() => infoPokemon(activePokemon)}>
            <h2>{activePokemon?.id}</h2>
            <img src={activePokemon?.sprites.front_default} alt="" />
            <h2>{activePokemon?.name}</h2>
          </div>
        </div>
      )}
    </>
  );
};
export default Pokesprites;
