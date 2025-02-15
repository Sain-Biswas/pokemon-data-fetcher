import db from "../drizzle";
import { movesOnEffectChangesSchema } from "../drizzle/schema/moves-on-effect-changes.schema";
import type DataType from "../types/data.type";
import type MoveType from "../types/moves.type";
import textFormatterUtility from "../utilities/textFormatter.utility";

export async function movesOnEffectChangeFetcher(url: string) {
  try {
    const data = await fetch(url).then(
      (response) => response.json() as Promise<MoveType>,
    );

    const effectChanges = data.effect_changes.map((item) => {
      const effect = item.effect_entries
        .filter((entry) => entry.language.name === "en")
        .at(0)?.effect;

      return {
        effect: textFormatterUtility(effect!),
        versionGroupReference: item.version_group.name,
        moveReference: data.name,
      };
    });

    if (effectChanges.length == 0) return;

    await db.insert(movesOnEffectChangesSchema).values(effectChanges);
  } catch (error: any) {
    console.log(error);
    console.log(url.split("/").at(6));
  }
}

export default async function movesOnEffectChangeGenerator() {
  try {
    const { count } = await fetch("https://pokeapi.co/api/v2/move").then(
      (response) => response.json() as Promise<DataType>,
    );
    const { results } = await fetch(
      `https://pokeapi.co/api/v2/move?offset=0&limit=${count + 10}`,
    ).then((response) => response.json() as Promise<DataType>);

    await Promise.all(
      results.map((item) => movesOnEffectChangeFetcher(item.url)),
    );
  } catch (error: any) {
    console.log("Moves On Effect Change Generator failed!");
  }
}
