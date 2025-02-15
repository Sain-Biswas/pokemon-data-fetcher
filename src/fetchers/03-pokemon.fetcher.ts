import db from "../drizzle";
import { pokemonSchema } from "../drizzle/schema/pokemon.schema";
import type DataType from "../types/data.type";
import type PokemonType from "../types/pokemon.type";
import referenceParserUtility from "../utilities/referenceParser.utility";

export async function pokemonFetcher(url: string) {
  try {
    const data = await fetch(url).then(
      (response) => response.json() as Promise<PokemonType>,
    );

    await db.insert(pokemonSchema).values({
      id: data.name,
      index: data.id,
      name: referenceParserUtility(data.name),
      baseExperience: data.base_experience,
      cries: data.cries.latest,
      height: data.height,
      image:
        data.sprites.other.home.front_default ||
        data.sprites.other["official-artwork"].front_default ||
        null,
      imageShiny:
        data.sprites.other.home.front_shiny ||
        data.sprites.other["official-artwork"].front_shiny ||
        null,
      speciesReference: data.species.name,
      speciesIndex: Number.parseInt(data.species.url.split("/").at(6)!),
      weight: data.weight,
      hp: data.stats.filter((item) => item.stat.name === "hp").at(0)?.base_stat,
      attack: data.stats.filter((item) => item.stat.name === "attack").at(0)
        ?.base_stat,
      defence: data.stats.filter((item) => item.stat.name === "defense").at(0)
        ?.base_stat,
      specialAttack: data.stats
        .filter((item) => item.stat.name === "special-attack")
        .at(0)?.base_stat,
      specialDefence: data.stats
        .filter((item) => item.stat.name === "special-defense")
        .at(0)?.base_stat,
      speed: data.stats.filter((item) => item.stat.name === "speed").at(0)
        ?.base_stat,
    });
  } catch (error: any) {
    console.log(error);
    console.log(url.split("/").at(6));
  }
}

export default async function pokemonGenerator() {
  try {
    const { count } = await fetch("https://pokeapi.co/api/v2/pokemon").then(
      (response) => response.json() as Promise<DataType>,
    );
    const { results } = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=0&limit=${count + 10}`,
    ).then((response) => response.json() as Promise<DataType>);

    await Promise.all(results.map((item) => pokemonFetcher(item.url)));
  } catch (error: any) {
    console.log("Pokemon Generator failed!");
  }
}
