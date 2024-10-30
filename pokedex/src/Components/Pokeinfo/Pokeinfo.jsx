import React from "react";
import "../Pokeinfo/Pokeinfo.css";

const Pokeinfo = ({ data }) => {
  return (
    <>
      {!data ? (
        ""
      ) : (
        <>
          <h1>{data.name}</h1>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`}
            alt="sprites"
          />
          <div className="abilities">
            {data.abilities.map((poke) => {
              const id = poke.ability.url;
              return (
                <div key={id} className="group">
                  <h2>{poke.ability.name}</h2>
                </div>
              );
            })}
          </div>
          <div className="base__stat">
            {data.stats.map((poke) => {
              const id = poke.stat.url;
              return (
                <h3 key={id}>
                  {poke.stat.name}:{poke.base_stat}
                </h3>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};
export default Pokeinfo;
