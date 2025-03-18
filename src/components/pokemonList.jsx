import React from "react";
import { Link } from "react-router-dom";
import "../styles/Card.css";

const PokemonList = ({ pokemon }) => {
  // Extract the ID from the URL
  const pokemonId = pokemon.url.split("/").slice(-2, -1)[0];

  return (
    <div className="pokemon-card">
      <img src={pokemon.image} alt={pokemon.name} className="pokemon-image" />
      <h2 className="pokemon-name">{pokemon.name}</h2>
      <Link to={`/pokemon/${pokemonId}`} className="pokemon-link">
        View Details
      </Link>
    </div>
  );
};

export default PokemonList;
