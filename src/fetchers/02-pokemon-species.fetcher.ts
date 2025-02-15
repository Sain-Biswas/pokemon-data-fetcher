import db from "../drizzle";
import { pokemonSpeciesSchema } from "../drizzle/schema/pokemon-species.schema";
import type DataType from "../types/data.type";
import type PokemonSpeciesType from "../types/pokemon-species.type";

export async function pokemonSpeciesFetcher(url: string) {
  try {
    const data = await fetch(url).then(
      (response) => response.json() as Promise<PokemonSpeciesType>,
    );

    await db.insert(pokemonSpeciesSchema).values({
      id: data.name,
      index: data.id,
      name: data.names.filter((item) => item.language.name === "en").at(0)
        ?.name,
      baseHappiness: data.base_happiness,
      captureRate: data.capture_rate,
      color: data.color.name
        .split("-")
        .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
        .join(" "),
      evolutionChainReference: Number.parseInt(
        data.evolution_chain.url.split("/").at(6) || "",
      ),
      formSwitchable: data.forms_switchable,
      genderRate: data.gender_rate,
      genera: data.genera.filter((item) => item.language.name === "en").at(0)
        ?.genus,
      generationReference: data.generation.name,
      growthRate: data.growth_rate.name
        .split("-")
        .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
        .join(" "),
      habitat:
        data.habitat?.name ||
        "Not Available"
          .split("-")
          .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
          .join(" "),
      genderDifference: data.has_gender_differences,
      legendary: data.is_legendary,
      mythical: data.is_mythical,
      shape: data.shape.name
        .split("-")
        .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
        .join(" "),
    });
  } catch (error: any) {
    console.log(error);
    console.log(url.split("/").at(6));
  }
}

export default async function pokemonSpeciesGenerator() {
  try {
    const { count } = await fetch(
      "https://pokeapi.co/api/v2/pokemon-species",
    ).then((response) => response.json() as Promise<DataType>);
    const { results } = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species?offset=0&limit=${count + 10}`,
    ).then((response) => response.json() as Promise<DataType>);

    await Promise.all(results.map((item) => pokemonSpeciesFetcher(item.url)));
  } catch (error: any) {
    console.log("Pokemon Species Generator failed!");
  }
}
