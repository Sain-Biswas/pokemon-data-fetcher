import db from "../drizzle";
import { pokemonSpeciesOnEggGroupSchema } from "../drizzle/schema/pokemon-species-on-egg-group.schema";
import type DataType from "../types/data.type";
import type PokemonSpeciesType from "../types/pokemon-species.type";

export async function pokemonSpeciesOnEggGroupFetcher(url: string) {
  try {
    const data = await fetch(url).then(
      (response) => response.json() as Promise<PokemonSpeciesType>,
    );

    const eggGroup = data.egg_groups.map((item) => ({
      pokemonReference: data.name,
      eggGroupReference: item.name,
    }));

    if (eggGroup.length == 0) return;

    await db.insert(pokemonSpeciesOnEggGroupSchema).values(eggGroup);
  } catch (error: any) {
    console.log(error);
    console.log(url.split("/").at(6));
  }
}

export default async function pokemonSpeciesOnEggGroupGenerator() {
  try {
    const { count } = await fetch(
      "https://pokeapi.co/api/v2/pokemon-species",
    ).then((response) => response.json() as Promise<DataType>);
    const { results } = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species?offset=0&limit=${count + 10}`,
    ).then((response) => response.json() as Promise<DataType>);

    await Promise.all(
      results.map((item) => pokemonSpeciesOnEggGroupFetcher(item.url)),
    );
  } catch (error: any) {
    console.log(" Generator failed!");
  }
}
