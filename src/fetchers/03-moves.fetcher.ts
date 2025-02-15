import db from "../drizzle";
import { movesSchema } from "../drizzle/schema/moves.schema";
import type DataType from "../types/data.type";
import type MoveType from "../types/moves.type";
import textFormatterUtility from "../utilities/textFormatter.utility";

const StatNameParser: Record<string, string> = {
  hp: "HP",
  attack: "Attack",
  defense: "Defence",
  "special-attack": "Special Attack",
  "special-defense": "Special Defense",
  speed: "Speed",
  accuracy: "Accuracy",
  evasion: "Evasion",
};

export async function moveFetcher(url: string) {
  try {
    const data = await fetch(url).then(
      (response) => response.json() as Promise<MoveType>,
    );

    const effect_entry = data.effect_entries
      .filter((item) => item.language.name === "en")
      .at(0);

    const stat_changes = data.stat_changes.map((item) => ({
      stat: StatNameParser[item.stat.name],
      change: item.change,
    }));

    await db.insert(movesSchema).values({
      id: data.name,
      index: data.id,
      name: data.names.filter((item) => item.language.name === "en").at(0)
        ?.name,
      generationReference: data.generation.name,
      typeReference: data.type.name,
      moveTargetReference: data.target.name,
      contestEffectReference:
        Number.parseInt(data.contest_effect?.url.split("/").at(6)!) || 0,
      contestTypeReference: data.contest_type?.name || "none",
      moveDamageClassReference: data.damage_class?.name || "none",
      effectChance: data.effect_chance,
      accuracy: data.accuracy,
      effectEntry: textFormatterUtility(
        effect_entry?.effect! || "No Data Available",
      ),
      shortEffectEntry: textFormatterUtility(
        effect_entry?.short_effect! || "No Data Available",
      ),
      ailmentReference: data.meta?.ailment?.name || "none",
      power: data.power || 0,
      pp: data.pp,
      statChanges: stat_changes,
    });
  } catch (error: any) {
    console.log(error);
    console.log(url.split("/").at(6));
  }
}

export default async function moveGenerator() {
  try {
    const { count } = await fetch("https://pokeapi.co/api/v2/move").then(
      (response) => response.json() as Promise<DataType>,
    );
    const { results } = await fetch(
      `https://pokeapi.co/api/v2/move?offset=0&limit=${count + 10}`,
    ).then((response) => response.json() as Promise<DataType>);

    await Promise.all(results.map((item) => moveFetcher(item.url)));
  } catch (error: any) {
    console.log("Moves Generator failed!");
  }
}
