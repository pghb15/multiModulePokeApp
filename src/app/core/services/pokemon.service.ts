import { Pokemon } from '../models/pokemon.model';

export class PokemonService {
  // Método para descargar todos los Pokemon
  // Parámetros: limit (número), offset (número)
  // Retorna: Promise<Pokemon[]>
  async fetchPokemons(limit: number, offset: number): Promise<Pokemon[]> {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`
    );
    const data = await response.json();

    // Para cada Pokémon en los resultados, obtener los detalles completos
    // el Results es una propiedad que proviene de la estructura de los datos devueltos por la API
    const pokemonDetailsPromises = data.results.map((element: any) => {
      return this.fetchPokemonDetailByUrl(element.url);
    });

    // Esperar a que todas las solicitudes de detalles de Pokémon se completen
    const pokemonDetails = await Promise.all(pokemonDetailsPromises);
    return pokemonDetails;
  }

  // Método para obtener los detalles de un Pokemon
  // Parámetros: url (cadena de texto)
  // Retorna: Promise<Pokemon>
  async fetchPokemonDetailByUrl(url: string): Promise<Pokemon> {
    const response = await fetch(url);
    const pokemonDetails = await response.json();
    // Construir la URL de la imagen del Pokémon
    const pokemonImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonDetails.id}.png`;

    // Metemos toda la info de cada Pokemon en una constante
    const eachPokemonDetail = {
      id: pokemonDetails.id,
      name: pokemonDetails.name,
      size: pokemonDetails.height,
      types: pokemonDetails.types.map((type: any) => type.type.name),
      //En este caso, estamos usando type: any para indicar que type puede ser de cualquier tipo
      //(ya que estamos recibiendo datos de una API externa y no conocemos la estructura exacta de los datos)
      abilities: pokemonDetails.abilities.map(
        (ability: any) => ability.ability.name
      ),
      // Agregar la URL de la imagen al objeto de detalles del Pokémon
      imageUrl: pokemonImageUrl,
    };
    return eachPokemonDetail;
  }

  // Método para obtener los detalles de un Pokemon por su ID
  // Parámetros: id (número)
  // Retorna: Promise<Pokemon>
  async fetchPokemonDetailbyId(id: number): Promise<Pokemon> {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/` + id);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching Pokemon detail by ID:', error);
      throw error;
    }
  }

  //Metodo para buscar un pokemon por el nombre en toda la base de datos
  async searchPokemonByName(name: string): Promise<Pokemon> {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

    const data = await response.json();
    const pokemon: Pokemon = {
      id: data.id,
      name: data.name,
      size: data.height,
      types: data.types.map((type: any) => type.type.name),
      abilities: data.abilities.map((ability: any) => ability.ability.name),
      imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`,
    };
    return pokemon;
  }

  async fetchPokemonsByType(type: string): Promise<Pokemon[]> {
    //IMPORTANTE: La url puede devolver los por type directamente.
    const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
    const data = await response.json();

    // el .pokemon es una propiedad que proviene de la estructura de los datos devueltos por la API
    const pokemonPromises = data.pokemon.map(async (pokemonData: any) => {
      const pokemonResponse = await fetch(pokemonData.pokemon.url);
      const pokemonDetails = await pokemonResponse.json();

      return {
        id: pokemonDetails.id,
        name: pokemonDetails.name,
        size: pokemonDetails.height,
        types: pokemonDetails.types.map((type: any) => type.type.name),
        abilities: pokemonDetails.abilities.map(
          (ability: any) => ability.ability.name
        ),
        imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonDetails.id}.png`,
      };
    });

    return Promise.all(pokemonPromises);
  }
}
/*Cuando trabajamos con la API de Pokémon, si queremos obtener todos los Pokémon de un cierto tipo, primero hacemos una llamada 
a la URL que proporciona esa información basada en el tipo de Pokémon que estamos buscando.

Por ejemplo, si queremos obtener todos los Pokémon de tipo "fuego", hacemos una llamada a https://pokeapi.co/api/v2/type/fire. 
Esta llamada nos devuelve un objeto JSON que contiene datos sobre los Pokémon de tipo fuego, incluyendo una lista de Pokémon 
y sus respectivas URLs.

Entonces, necesitamos hacer una segunda llamada a cada una de esas URLs para obtener los detalles específicos de cada Pokémon. 
Es por eso que en la función fetchPokemonsByType, primero iteramos sobre la lista de Pokémon obtenida de la primera llamada, 
y luego hacemos una llamada a la URL de cada Pokémon para obtener sus detalles. 
Esta es la razón por la que necesitamos dos llamadas en este caso.*/
