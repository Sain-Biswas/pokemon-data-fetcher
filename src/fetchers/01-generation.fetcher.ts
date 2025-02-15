import type DataType from "../types/data.type";
import db from "../drizzle";
import { generationSchema } from "../drizzle/schema/generation.schema";
import type GenerationType from "../types/generation.type";

export async function generationFetcher(url: string) {
  try {
    const data = await fetch(url).then(
      (response) => response.json() as Promise<GenerationType>,
    );

    await db.insert(generationSchema).values({
      id: data.name,
      index: data.id,
      name: data.names.filter((item) => item.language.name === "en").at(0)
        ?.name,
      mainRegionReference: data.main_region.name,
    });
  } catch (error: any) {
    console.log(error);
    console.log(url.split("/").at(6));
  }
}

export default async function generationGenerator() {
  try {
    const { count } = await fetch("https://pokeapi.co/api/v2/generation/").then(
      (response) => response.json() as Promise<DataType>,
    );
    const { results } = await fetch(
      `https://pokeapi.co/api/v2/generation?offset=0&limit=${count + 10}`,
    ).then((response) => response.json() as Promise<DataType>);

    await Promise.all(results.map((item) => generationFetcher(item.url)));
    await db.insert(generationSchema).values({
      id: "generation-0",
      index: 0,
      name: "Generation 0",
      mainRegionReference: "none",
    });
  } catch (error: any) {
    console.log("Generation Generator failed!");
  }
}
