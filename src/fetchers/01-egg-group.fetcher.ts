import type DataType from "../types/data.type";
import db from "../drizzle";
import type EggGroupType from "../types/egg-group.type";
import referenceParserUtility from "../utilities/referenceParser.utility";
import { eggGroupSchema } from "../drizzle/schema/egg-group.schema";

export async function eggGroupFetcher(url: string) {
  try {
    const data = await fetch(url).then(
      (response) => response.json() as Promise<EggGroupType>,
    );

    await db.insert(eggGroupSchema).values({
      id: data.name,
      index: data.id,
      name:
        data.names.filter((item) => item.language.name === "en").at(0)?.name ||
        referenceParserUtility(data.name),
    });
  } catch (error: any) {
    console.log(url.split("/").at(6));
  }
}

export default async function eggGroupGenerator() {
  try {
    const { count } = await fetch("https://pokeapi.co/api/v2/egg-group/").then(
      (response) => response.json() as Promise<DataType>,
    );
    const { results } = await fetch(
      `https://pokeapi.co/api/v2/egg-group?offset=0&limit=${count + 10}`,
    ).then((response) => response.json() as Promise<DataType>);

    await Promise.all(results.map((item) => eggGroupFetcher(item.url)));
  } catch (error: any) {
    console.log("Egg Group Generator failed!");
  }
}
