import db from "../drizzle";
import { versionGroupSchema } from "../drizzle/schema/version-group.schema";
import type DataType from "../types/data.type";
import type VersionGroupType from "../types/version-group.type";

export async function versionGroupFetcher(url: string) {
  try {
    const data = await fetch(url).then(
      (response) => response.json() as Promise<VersionGroupType>,
    );

    await db.insert(versionGroupSchema).values({
      id: data.name,
      index: data.id,
      generationReference: data.generation.name,
    });
  } catch (error: any) {
    console.log(error);
    console.log(url.split("/").at(6));
  }
}

export default async function versionGroupGenerator() {
  try {
    const { count } = await fetch(
      "https://pokeapi.co/api/v2/version-group",
    ).then((response) => response.json() as Promise<DataType>);
    const { results } = await fetch(
      `https://pokeapi.co/api/v2/version-group?offset=0&limit=${count + 10}`,
    ).then((response) => response.json() as Promise<DataType>);

    await Promise.all(results.map((item) => versionGroupFetcher(item.url)));
  } catch (error: any) {
    console.log("Version Group Generator failed!");
  }
}
