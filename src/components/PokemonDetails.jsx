import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../styles/Details.css";

const PokemonDetails = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        setPokemon(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Pokémon details:", error);
      }
    };

    fetchPokemonDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="details-container">
      <h1 className="details-title">{pokemon.name.toUpperCase()}</h1>
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className="details-image"
      />
      <div className="details-info">
        <h2>Abilities</h2>
        <ul>
          {pokemon.abilities.map((ability, index) => (
            <li key={index}>{ability.ability.name}</li>
          ))}
        </ul>

        <h2>Stats</h2>
        <ul>
          {pokemon.stats.map((stat, index) => (
            <li key={index}>
              {stat.stat.name}: {stat.base_stat}
            </li>
          ))}
        </ul>
      </div>

      <Link to="/" className="back-button">
        ← Back to Pokémon List
      </Link>
    </div>
  );
};

export default PokemonDetails;
