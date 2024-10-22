import React from "react";
import "../Card/Card.css";

const Card = ({ pokeData, loading, infoPokemon }) => {
  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        pokeData.map((item) => {
          return (
            <div key={item.id}>
              <div className="card" onClick={() => infoPokemon(item)}>
                <h2>{item.id}</h2>
                <img src={item.sprites.front_default} alt="" />
                <h2>{item.name}</h2>
              </div>
            </div>
          );
        })
      )}
    </>
  );
};
export default Card;
