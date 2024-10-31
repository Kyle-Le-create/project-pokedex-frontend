export const getPokemonFetch = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    console.error(`Error fetching Pokemon: ${response.statusText}`);
    return;
  }

  const data = await response.json();
  return data;
};
