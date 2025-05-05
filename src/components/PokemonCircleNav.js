import React, { useEffect, useState } from "react";

const PokemonCircleNav = () => {
  const [pokemon, setPokemon] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      const urls = Array.from({ length: 20 }, (_, i) =>
        `https://pokeapi.co/api/v2/pokemon/${i + 1}`
      );
      const responses = await Promise.all(urls.map(url => fetch(url)));
      const data = await Promise.all(responses.map(res => res.json()));

      setPokemon(data.map(poke => ({
        name: poke.name,
        image: poke.sprites.front_default,
        stats: poke.stats.map(stat => ({ name: stat.stat.name, value: stat.base_stat }))
      })));

      // Set the first Pokémon as the default selected one
      setSelectedPokemon({
        name: data[0].name,
        image: data[0].sprites.front_default,
        stats: data[0].stats.map(stat => ({ name: stat.stat.name, value: stat.base_stat }))
      });
    };

    fetchPokemon();
  }, []);

  const handleSelect = (poke) => {
    setSelectedPokemon(poke); // Select the Pokémon without resetting to default
  };

  return (
    <div className="circle-container">
      {selectedPokemon && (
        <div className="selected-pokemon">
          <img src={selectedPokemon.image} alt={selectedPokemon.name} />
          <h2>{selectedPokemon.name}</h2>
          <ul>
            {selectedPokemon.stats.map((stat, index) => (
              <li key={index}>{stat.name}: {stat.value}</li>
            ))}
          </ul>
        </div>
      )}

{pokemon.map((poke, index) => (
  <img
    key={index}
    src={poke.image}
    alt={poke.name}
    className={`circle-item ${selectedPokemon?.name === poke.name ? "selected" : ""}`}
    style={{ "--child-index": (index * 360) / 20 }}
    onClick={() => handleSelect(poke)}
  />
))}
    </div>
  );
};

export default PokemonCircleNav;
