import type DataType from "../types/data.type";
import db from "../drizzle";
import type MoveDamageClassType from "../types/move-damage-class.type";
import { moveDamageClassSchema } from "../drizzle/schema/move-damage-class.schema";
import textFormatterUtility from "../utilities/textFormatter.utility";

export async function moveDamageClassFetcher(url: string) {
  try {
    const data = await fetch(url).then(
      (response) => response.json() as Promise<MoveDamageClassType>,
    );

    await db.insert(moveDamageClassSchema).values({
      id: data.name,
      index: data.id,
      description: textFormatterUtility(
        data.descriptions.filter((item) => item.language.name === "en").at(0)
          ?.description!,
      ),
      name: data.names.filter((item) => item.language.name === "en").at(0)
        ?.name,
    });
  } catch (error: any) {
    console.log(url.split("/").at(6));
  }
}

export default async function moveDamageClassGenerator() {
  try {
    const { count } = await fetch(
      "https://pokeapi.co/api/v2/move-damage-class/",
    ).then((response) => response.json() as Promise<DataType>);
    const { results } = await fetch(
      `https://pokeapi.co/api/v2/move-damage-class?offset=0&limit=${count + 10}`,
    ).then((response) => response.json() as Promise<DataType>);

    await Promise.all(results.map((item) => moveDamageClassFetcher(item.url)));

    await db.insert(moveDamageClassSchema).values({
      id: "none",
      index: 0,
      description: "No Data",
      name: "None",
    });
  } catch (error: any) {
    console.log("Move Damage Class Generator failed!");
  }
}
