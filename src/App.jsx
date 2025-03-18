import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchBar from "./components/SearchBar..jsx";
import PokemonDetails from "./components/PokemonDetails.jsx";
import "./App.css";
import PokemonList from "./components/pokemonList.jsx";

const App = () => {
  const [pokemon, setPokemon] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");
  const [loading, setLoading] = useState(true);

  const API_URL = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20";

  useEffect(() => {
    fetchData(API_URL);
  }, []);

  const fetchData = async (url) => {
    setLoading(true);
    try {
      const response = await axios.get(url);
      const results = await Promise.all(
        response.data.results.map(async (poke) => {
          const res = await axios.get(poke.url);
          return {
            name: poke.name,
            url: poke.url,
            image: res.data.sprites.front_default,
          };
        })
      );
      setPokemon(results);
      setFilteredPokemon(results);
      setNextUrl(response.data.next);
      setPrevUrl(response.data.previous);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  const handleSearch = (query) => {
    const filtered = pokemon.filter((poke) =>
      poke.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPokemon(filtered);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="app-container">
              <h1 className="title">Pokémon List</h1>
              <SearchBar onSearch={handleSearch} />

              {loading ? (
                <p>Loading...</p>
              ) : (
                <div className="pokemon-grid">
                  {filteredPokemon.map((poke, index) => (
                    <PokemonList key={index} pokemon={poke} />
                  ))}
                </div>
              )}

              <div className="pagination">
                <button disabled={!prevUrl} onClick={() => fetchData(prevUrl)}>
                  Previous
                </button>
                <button disabled={!nextUrl} onClick={() => fetchData(nextUrl)}>
                  Next
                </button>
              </div>
            </div>
          }
        />
        <Route path="/pokemon/:id" element={<PokemonDetails />} />
      </Routes>
    </Router>
  );
};

export default App;