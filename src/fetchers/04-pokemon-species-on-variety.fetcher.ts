import db from "../drizzle";
import { pokemonSpeciesOnVarietySchema } from "../drizzle/schema/pokemon-species-on-variety.schema";
import type DataType from "../types/data.type";
import type PokemonSpeciesType from "../types/pokemon-species.type";

export async function pokemonSpeciesOnVarietyFetcher(url: string) {
  try {
    const data = await fetch(url).then(
      (response) => response.json() as Promise<PokemonSpeciesType>,
    );

    const variety = data.varieties.map((item) => ({
      pokemonSpeciesReference: data.name,
      pokemonReference: item.pokemon.name,
      isDefault: item.is_default,
    }));

    await db.insert(pokemonSpeciesOnVarietySchema).values(variety);
  } catch (error: any) {
    console.log(error);
    console.log(url.split("/").at(6));
  }
}

export default async function pokemonSpeciesOnVarietyGenerator() {
  try {
    const { count } = await fetch(
      "https://pokeapi.co/api/v2/pokemon-species",
    ).then((response) => response.json() as Promise<DataType>);
    const { results } = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species?offset=0&limit=${count + 10}`,
    ).then((response) => response.json() as Promise<DataType>);

    await Promise.all(
      results.map((item) => pokemonSpeciesOnVarietyFetcher(item.url)),
    );
  } catch (error: any) {
    console.log("Pokemon Species On Variety Generator failed!");
  }
}
