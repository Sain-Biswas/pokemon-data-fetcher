import db from "../drizzle";
import { regionOnVersionGroupSchema } from "../drizzle/schema/region-on-version-group.schema";
import type DataType from "../types/data.type";
import type RegionType from "../types/region.type";

export async function regionOnVersionGroupFetcher(url: string) {
  try {
    const data = await fetch(url).then(
      (response) => response.json() as Promise<RegionType>,
    );

    await Promise.all(
      data.version_groups.map((item) =>
        db.insert(regionOnVersionGroupSchema).values({
          regionReference: data.name,
          versionGroupReference: item.name,
        }),
      ),
    );
  } catch (error: any) {
    console.log(error);
    console.log(url.split("/").at(6));
  }
}

export default async function regionOnVersionGroupGenerator() {
  try {
    const { count } = await fetch("https://pokeapi.co/api/v2/region").then(
      (response) => response.json() as Promise<DataType>,
    );
    const { results } = await fetch(
      `https://pokeapi.co/api/v2/region?offset=0&limit=${count + 10}`,
    ).then((response) => response.json() as Promise<DataType>);

    await Promise.all(
      results.map((item) => regionOnVersionGroupFetcher(item.url)),
    );
  } catch (error: any) {
    console.log("Region On Version Group Generator failed!");
  }
}
