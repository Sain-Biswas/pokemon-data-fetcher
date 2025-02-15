import db from "../drizzle";
import { regionSchema } from "../drizzle/schema/region.schema";
import type DataType from "../types/data.type";
import type RegionType from "../types/region.type";

export async function regionFetcher(url: string) {
  try {
    const data = await fetch(url).then(
      (response) => response.json() as Promise<RegionType>,
    );

    await db.insert(regionSchema).values({
      id: data.name,
      index: data.id,
      name: data.names.filter((item) => item.language.name === "en").at(0)
        ?.name,
      mainGenerationReference: data.main_generation?.name || "generation-0",
    });
  } catch (error: any) {
    console.log(error);
    console.log(url.split("/").at(6));
  }
}

export default async function regionGenerator() {
  try {
    const { count } = await fetch("https://pokeapi.co/api/v2/region").then(
      (response) => response.json() as Promise<DataType>,
    );
    const { results } = await fetch(
      `https://pokeapi.co/api/v2/region?offset=0&limit=${count + 10}`,
    ).then((response) => response.json() as Promise<DataType>);

    await Promise.all(results.map((item) => regionFetcher(item.url)));

    await db.insert(regionSchema).values({
      id: "none",
      index: 0,
      name: "None",
      mainGenerationReference: "generation-0",
    });
  } catch (error: any) {
    console.log("Region Generator failed!");
  }
}
