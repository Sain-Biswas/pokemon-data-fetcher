import db from "../drizzle";
import { abilitySchema } from "../drizzle/schema/ability.schema";
import type AbilityType from "../types/ability.type";
import type DataType from "../types/data.type";
import textFormatterUtility from "../utilities/textFormatter.utility";

export async function abilityFetcher(url: string) {
  try {
    const data = await fetch(url).then(
      (response) => response.json() as Promise<AbilityType>,
    );

    const effectEntry = data.effect_entries
      .filter((item) => item.language.name === "en")
      .at(0);

    await db.insert(abilitySchema).values({
      id: data.name,
      index: data.id,
      name: data.names.filter((item) => item.language.name === "en").at(0)
        ?.name,
      effect: textFormatterUtility(
        effectEntry?.effect! || "Data Not Available",
      ),
      shortEffect: textFormatterUtility(
        effectEntry?.short_effect! || "Data Not Available",
      ),
      generationReference: data.generation.name,
    });
  } catch (error: any) {
    console.log(error);
    console.log(url.split("/").at(6));
  }
}

export default async function abilityGenerator() {
  try {
    const { count } = await fetch("https://pokeapi.co/api/v2/ability").then(
      (response) => response.json() as Promise<DataType>,
    );
    const { results } = await fetch(
      `https://pokeapi.co/api/v2/ability?offset=0&limit=${count + 10}`,
    ).then((response) => response.json() as Promise<DataType>);

    await Promise.all(results.map((item) => abilityFetcher(item.url)));
  } catch (error: any) {
    console.log("Ability Generator failed!");
  }
}
