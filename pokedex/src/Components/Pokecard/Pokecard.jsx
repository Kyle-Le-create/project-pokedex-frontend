import React from "react";
import "./Pokecard.css";

const Pokecard = ({ loading, infoPokemon, activePokemon }) => {
  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div key={activePokemon.id}>
          <div className="card" onClick={() => infoPokemon(activePokemon)}>
            <h2>{activePokemon.id}</h2>
            <img src={activePokemon.sprites.front_default} alt="" />
            <h2>{activePokemon.name}</h2>
          </div>
        </div>
      )}
    </>
  );
};
export default Pokecard;
