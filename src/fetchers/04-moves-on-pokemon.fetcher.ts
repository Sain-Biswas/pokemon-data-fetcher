import db from "../drizzle";
import { movesOnPokemonSchema } from "../drizzle/schema/moves-on-pokemon.schema";
import type DataType from "../types/data.type";
import type MoveType from "../types/moves.type";

export async function movesOnPokemonFetcher(url: string) {
  try {
    const data = await fetch(url).then(
      (response) => response.json() as Promise<MoveType>,
    );

    const pokemons = data.learned_by_pokemon.map((item) => ({
      moveReference: data.name,
      pokemonReference: item.name,
    }));

    if (pokemons.length == 0) return;

    await db.insert(movesOnPokemonSchema).values(pokemons);
  } catch (error: any) {
    console.log(error);
    console.log(url.split("/").at(6));
  }
}

export default async function movesOnPokemonGenerator() {
  try {
    const { count } = await fetch("https://pokeapi.co/api/v2/move").then(
      (response) => response.json() as Promise<DataType>,
    );
    const { results } = await fetch(
      `https://pokeapi.co/api/v2/move?offset=0&limit=${count + 10}`,
    ).then((response) => response.json() as Promise<DataType>);

    await Promise.all(results.map((item) => movesOnPokemonFetcher(item.url)));
  } catch (error: any) {
    console.log("Moves On Pokemon Generator failed!");
  }
}
