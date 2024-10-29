// Base URL for PokéAPI
const POKE_API_BASE_URL = "https://pokeapi.co/api/v2";

// Function to fetch a specific Pokémon by ID
export const getPokemonById = async (identifier) => {
  try {
    const response = await fetch(`${POKE_API_BASE_URL}/pokemon/${identifier}`);
    if (!response.ok) {
      throw new Error(`Error fetching Pokémon: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
    return null;
  }
};

// Function to fetch a list of Pokémon with pagination
export const getPokemonList = async (limit = 20, offset = 0) => {
  try {
    const response = await fetch(
      `${POKE_API_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`
    );
    if (!response.ok) {
      throw new Error(`Error fetching Pokémon list: ${response.statusText}`);
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching Pokémon list:", error);
    return [];
  }
};
