import db from "../drizzle";
import { movesOnFlavorTextSchema } from "../drizzle/schema/moves-on-flavor-text.schema";
import type DataType from "../types/data.type";
import type MoveType from "../types/moves.type";
import textFormatterUtility from "../utilities/textFormatter.utility";

export async function movesOnFlavorTextFetcher(url: string) {
  try {
    const data = await fetch(url).then(
      (response) => response.json() as Promise<MoveType>,
    );

    const flavorText = data.flavor_text_entries
      .filter((item) => item.language.name === "en")
      .map((item) => ({
        moveReference: data.name,
        versionGroupReference: item.version_group.name,
        flavorText: textFormatterUtility(item.flavor_text),
      }));

    if (flavorText.length === 0) return;

    await db.insert(movesOnFlavorTextSchema).values(flavorText);
  } catch (error: any) {
    console.log(error);
    console.log(url.split("/").at(6));
  }
}

export default async function movesOnFlavorTextGenerator() {
  try {
    const { count } = await fetch("https://pokeapi.co/api/v2/move").then(
      (response) => response.json() as Promise<DataType>,
    );
    const { results } = await fetch(
      `https://pokeapi.co/api/v2/move?offset=0&limit=${count + 10}`,
    ).then((response) => response.json() as Promise<DataType>);

    await Promise.all(
      results.map((item) => movesOnFlavorTextFetcher(item.url)),
    );
  } catch (error: any) {
    console.log("Moves On Flavor Text Generator failed!");
  }
}
