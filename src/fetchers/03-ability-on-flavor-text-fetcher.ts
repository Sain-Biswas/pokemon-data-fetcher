import db from "../drizzle";
import { abilityOnFlavorTextSchema } from "../drizzle/schema/ability-on-flavor-text.schema";
import type AbilityType from "../types/ability.type";
import type DataType from "../types/data.type";
import textFormatterUtility from "../utilities/textFormatter.utility";

export async function abilityOnFlavorTextFetcher(url: string) {
  try {
    const data = await fetch(url).then(
      (response) => response.json() as Promise<AbilityType>,
    );

    const flavorTextEntries = data.flavor_text_entries
      .filter((item) => item.language.name === "en")
      .map((item) => ({
        abilityReference: data.name,
        versionGroupReference: item.version_group.name,
        flavorText: textFormatterUtility(item.flavor_text),
      }));

    if (flavorTextEntries.length == 0) return;

    await db.insert(abilityOnFlavorTextSchema).values(flavorTextEntries);
  } catch (error: any) {
    console.log(error);
    console.log(url.split("/").at(6));
  }
}

export default async function abilityOnFlavorTextGenerator() {
  try {
    const { count } = await fetch("https://pokeapi.co/api/v2/ability").then(
      (response) => response.json() as Promise<DataType>,
    );
    const { results } = await fetch(
      `https://pokeapi.co/api/v2/ability?offset=0&limit=${count + 10}`,
    ).then((response) => response.json() as Promise<DataType>);

    await Promise.all(
      results.map((item) => abilityOnFlavorTextFetcher(item.url)),
    );
  } catch (error: any) {
    console.log(" Generator failed!");
  }
}
