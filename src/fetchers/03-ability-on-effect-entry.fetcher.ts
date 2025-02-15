import db from "../drizzle";
import { abilityOnEffectEntrySchema } from "../drizzle/schema/ability-on-effect-entry.schema";
import type AbilityType from "../types/ability.type";
import type DataType from "../types/data.type";
import textFormatterUtility from "../utilities/textFormatter.utility";

export async function abilityOnEffectEntryFetcher(url: string) {
  try {
    const data = await fetch(url).then(
      (response) => response.json() as Promise<AbilityType>,
    );

    const effectChanges = data.effect_changes.map((item) => {
      const entry = item.effect_entries
        .filter((i) => i.language.name === "en")
        .at(0);

      return {
        abilityReference: data.name,
        versionGroupReference: item.version_group.name,
        entry: textFormatterUtility(entry?.effect!),
      };
    });

    if (effectChanges.length == 0) return;

    await db.insert(abilityOnEffectEntrySchema).values(effectChanges);
  } catch (error: any) {
    console.log(error);
    console.log(url.split("/").at(6));
  }
}

export default async function abilityOnEffectEntryGenerator() {
  try {
    const { count } = await fetch("https://pokeapi.co/api/v2/ability").then(
      (response) => response.json() as Promise<DataType>,
    );
    const { results } = await fetch(
      `https://pokeapi.co/api/v2/ability?offset=0&limit=${count + 10}`,
    ).then((response) => response.json() as Promise<DataType>);

    await Promise.all(
      results.map((item) => abilityOnEffectEntryFetcher(item.url)),
    );
  } catch (error: any) {
    console.log(" Generator failed!");
  }
}
