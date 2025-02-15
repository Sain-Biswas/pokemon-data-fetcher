import db from "../drizzle";
import { contestTypeSchema } from "../drizzle/schema/contest-type.schema";
import type ContestTypesType from "../types/contest-type.type";
import type DataType from "../types/data.type";

export async function contestTypeFetcher(url: string) {
  try {
    const data = await fetch(url).then(
      (response) => response.json() as Promise<ContestTypesType>,
    );

    const berryFlavor = await fetch(data.berry_flavor.url)
      .then((response) => response.json())
      .then(
        (response) =>
          response.names
            .filter((item: any) => item.language.name === "en")
            .at(0).name,
      )
      .catch(() => "None");

    const nameColorEnglish = data.names
      .filter((item) => item.language.name === "en")
      .at(0);

    await db.insert(contestTypeSchema).values({
      id: data.name,
      index: data.id,
      name: nameColorEnglish?.name,
      color: nameColorEnglish?.color,
      berryFlavor,
    });
  } catch (error: any) {
    console.log(error);
    console.log(url.split("/").at(6));
  }
}

export default async function contestTypeGenerator() {
  try {
    const { count } = await fetch(
      "https://pokeapi.co/api/v2/contest-type/",
    ).then((response) => response.json() as Promise<DataType>);
    const { results } = await fetch(
      `https://pokeapi.co/api/v2/contest-type?offset=0&limit=${count + 10}`,
    ).then((response) => response.json() as Promise<DataType>);

    await Promise.all(results.map((item) => contestTypeFetcher(item.url)));

    await db.insert(contestTypeSchema).values({
      id: "none",
      index: 0,
      name: "None",
      color: "None",
      berryFlavor: "No Data",
    });
  } catch (error: any) {
    console.log("Contest Type Generator failed!");
  }
}
