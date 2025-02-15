import db from "../drizzle";
import { pokemonSpeciesOnFlavorTextSchema } from "../drizzle/schema/pokemon-species-on-flavor-text.schema";
import type DataType from "../types/data.type";
import type PokemonSpeciesType from "../types/pokemon-species.type";
import textFormatterUtility from "../utilities/textFormatter.utility";

export async function pokemonSpeciesOnFlavorTextFetcher(url: string) {
  try {
    const data = await fetch(url).then(
      (response) => response.json() as Promise<PokemonSpeciesType>,
    );

    const flavorText = data.flavor_text_entries
      .filter((item) => item.language.name === "en")
      .map((item) => ({
        pokemonSpeciesReference: data.name,
        versionReference: item.version.name,
        flavorText: textFormatterUtility(item.flavor_text),
      }));

    await db.insert(pokemonSpeciesOnFlavorTextSchema).values(flavorText);
  } catch (error: any) {
    console.log(error);
    console.log(url.split("/").at(6));
  }
}

export default async function pokemonSpeciesOnFlavorTextGenerator() {
  try {
    const { count } = await fetch(
      "https://pokeapi.co/api/v2/pokemon-species",
    ).then((response) => response.json() as Promise<DataType>);
    const { results } = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species?offset=0&limit=${count + 10}`,
    ).then((response) => response.json() as Promise<DataType>);

    await Promise.all(
      results.map((item) => pokemonSpeciesOnFlavorTextFetcher(item.url)),
    );
  } catch (error: any) {
    console.log("Pokemon Species On Flavor Text Generator failed!");
  }
}
