import type DataType from "../types/data.type";
import db from "../drizzle";
import { moveAilmentSchema } from "../drizzle/schema/move-ailment.schema";
import type MoveAilmentType from "../types/move-ailment.type";

export async function moveAilmentFetcher(url: string) {
  try {
    const data = await fetch(url).then(
      (response) => response.json() as Promise<MoveAilmentType>,
    );

    await db.insert(moveAilmentSchema).values({
      id: data.name,
      index: data.id,
      name: data.names.filter((item) => item.language.name === "en").at(0)
        ?.name,
    });
  } catch (error: any) {
    console.log(url.split("/").at(6));
  }
}

export default async function moveAilmentGenerator() {
  try {
    const { count } = await fetch(
      "https://pokeapi.co/api/v2/move-ailment/",
    ).then((response) => response.json() as Promise<DataType>);
    const { results } = await fetch(
      `https://pokeapi.co/api/v2/move-ailment?offset=0&limit=${count + 10}`,
    ).then((response) => response.json() as Promise<DataType>);

    await Promise.all(results.map((item) => moveAilmentFetcher(item.url)));
  } catch (error: any) {
    console.log(error);
    console.log("Move Ailment Generator failed!");
  }
}
