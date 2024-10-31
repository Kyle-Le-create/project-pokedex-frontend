import React from "react";
import "../Aboutme/Aboutme.css";
import pokeball from "../../assets/pokeball.png";
import { Link } from "react-router-dom";

const Aboutme = () => {
  return (
    <div className="about-me">
      <Link to="/">
        <img alt="pokeball" className="about-me__ball" src={pokeball} />
      </Link>
      <nav></nav>
      <h1 className="about-me__title">About Me</h1>

      {/* Introduction Section */}
      <section className="about-me__introduction">
        <p>
          Hi! I'm Kyle, a budding developer with a passion for Pokémon and web
          development. I created this Pokédex app to combine my love for coding
          with my interest in the Pokémon universe. Hope you enjoy exploring it
          as much as I enjoyed building it!
        </p>
      </section>

      {/* Favorite Pokémon Section */}
      <section className="about-me__pokemon">
        <h2 className="about-me__favorite">My Favorite Pokémon</h2>
        <div className="pokemon__list">
          <div className="pokemon__card">
            <img
              src="https://img.pokemondb.net/artwork/large/pikachu.jpg"
              alt="Pikachu"
            />
            <p>Pikachu</p>
          </div>
          <div className="pokemon__card">
            <img
              src="https://img.pokemondb.net/artwork/large/charizard.jpg"
              alt="Charizard"
            />
            <p>Charizard</p>
          </div>
          <div className="pokemon__card">
            <img
              src="https://img.pokemondb.net/artwork/large/bulbasaur.jpg"
              alt="Bulbasaur"
            />
            <p>Bulbasaur</p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="skills">
        <h2 className="about__technologies">Technologies Used</h2>
        <ul>
          <li>React</li>
          <li>JavaScript (ES6+)</li>
          <li>CSS</li>
          <li>Pokémon API</li>
        </ul>
      </section>

      {/* Fun Facts Section */}
      <section className="fun__facts">
        <h2 className="about__facts">Fun Facts</h2>
        <ul>
          <li>The first Pokémon I played with was a Bulbasaur!</li>
          <li>
            Did you know? Pikachu's name is derived from Japanese words for
            "sparkle" and "mouse."
          </li>
        </ul>
      </section>

      {/* Contact Section */}
      <section className="contact">
        <h2 className="about__contact">Contact Me</h2>
        <p>Find me on:</p>
        <ul>
          <li>
            <a
              href="https://www.linkedin.com/in/kyle-le-0921ba2a7/"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href="https://github.com/Kyle-Le-create"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Aboutme;
