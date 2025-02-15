import db from "../drizzle";
import { versionSchema } from "../drizzle/schema/version.schema";
import type DataType from "../types/data.type";
import type VersionType from "../types/version.type";

export async function versionFetcher(url: string) {
  try {
    const data = await fetch(url).then(
      (response) => response.json() as Promise<VersionType>,
    );

    await db.insert(versionSchema).values({
      id: data.name,
      index: data.id,
      name: data.names.filter((item) => item.language.name === "en").at(0)
        ?.name,
      versionGroupReference: data.version_group.name,
    });
  } catch (error: any) {
    console.log(error);
    console.log(url.split("/").at(6));
  }
}

export default async function versionGenerator() {
  try {
    const { count } = await fetch("https://pokeapi.co/api/v2/version").then(
      (response) => response.json() as Promise<DataType>,
    );
    const { results } = await fetch(
      `https://pokeapi.co/api/v2/version?offset=0&limit=${count + 10}`,
    ).then((response) => response.json() as Promise<DataType>);

    await Promise.all(results.map((item) => versionFetcher(item.url)));
  } catch (error: any) {
    console.log("Version Generator failed!");
  }
}
