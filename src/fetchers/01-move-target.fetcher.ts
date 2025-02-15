import type DataType from "../types/data.type";
import db from "../drizzle";
import { moveTargetSchema } from "../drizzle/schema/move-target.schema";
import type MoveTargetType from "../types/move-target.type";
import referenceParserUtility from "../utilities/referenceParser.utility";
import textFormatterUtility from "../utilities/textFormatter.utility";

export async function moveTargetFetcher(url: string) {
  try {
    const data = await fetch(url).then(
      (response) => response.json() as Promise<MoveTargetType>,
    );

    await db.insert(moveTargetSchema).values({
      id: data.name,
      index: data.id,
      descriptions: textFormatterUtility(
        data.descriptions.filter((item) => item.language.name === "en").at(0)
          ?.description! || "",
      ),
      name:
        data.names.filter((item) => item.language.name === "en").at(0)?.name ||
        referenceParserUtility(data.name),
    });
  } catch (error: any) {
    console.log(error);
    console.log(url.split("/").at(6));
  }
}

export default async function moveTargetGenerator() {
  try {
    const { count } = await fetch(
      "https://pokeapi.co/api/v2/move-target/",
    ).then((response) => response.json() as Promise<DataType>);
    const { results } = await fetch(
      `https://pokeapi.co/api/v2/move-target?offset=0&limit=${count + 10}`,
    ).then((response) => response.json() as Promise<DataType>);

    await Promise.all(results.map((item) => moveTargetFetcher(item.url)));
  } catch (error: any) {
    console.log("Move Target Generator failed!");
  }
}
