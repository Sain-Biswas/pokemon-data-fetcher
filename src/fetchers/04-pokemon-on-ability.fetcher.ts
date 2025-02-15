import db from "../drizzle";
import { pokemonOnAbilitySchema } from "../drizzle/schema/pokemon-on-ability.schema";
import type DataType from "../types/data.type";
import type PokemonType from "../types/pokemon.type";

export async function pokemonOnAbilityFetcher(url: string) {
  try {
    const data = await fetch(url).then(
      (response) => response.json() as Promise<PokemonType>,
    );

    const ability = data.abilities.map((item) => ({
      pokemonReference: data.name,
      abilityReference: item.ability.name,
      isHidden: item.is_hidden,
    }));

    if (ability.length === 0) return;

    await db.insert(pokemonOnAbilitySchema).values(ability);
  } catch (error: any) {
    console.log(error);
    console.log(url.split("/").at(6));
  }
}

export default async function pokemonOnAbilityGenerator() {
  try {
    const { count } = await fetch("https://pokeapi.co/api/v2/pokemon").then(
      (response) => response.json() as Promise<DataType>,
    );
    const { results } = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=0&limit=${count + 10}`,
    ).then((response) => response.json() as Promise<DataType>);

    await Promise.all(results.map((item) => pokemonOnAbilityFetcher(item.url)));
  } catch (error: any) {
    console.log("Pokemon On Ability Generator failed!");
  }
}
