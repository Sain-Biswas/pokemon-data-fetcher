import db from "../drizzle";
import type DataType from "../types/data.type";
import { contestEffectSchema } from "../drizzle/schema/contest-effect.schema";
import type ContestEffectType from "../types/contest-effect.type";
import textFormatterUtility from "../utilities/textFormatter.utility";

export async function contestEffectFetcher(url: string) {
  try {
    const data = await fetch(url).then(
      (response) => response.json() as Promise<ContestEffectType>,
    );

    await db.insert(contestEffectSchema).values({
      id: data.id,
      effectEntry: textFormatterUtility(
        data.effect_entries.filter((item) => item.language.name === "en").at(0)
          ?.effect!,
      ),
      flavorText: textFormatterUtility(
        data.flavor_text_entries
          .filter((item) => item.language.name === "en")
          .at(0)?.flavor_text!,
      ),
      appeal: data.appeal,
    });
  } catch (error: any) {
    console.log(error);
    console.log(url.split("/").at(6));
  }
}

export default async function contestEffectGenerator() {
  try {
    const { count } = await fetch(
      "https://pokeapi.co/api/v2/contest-effect/",
    ).then((response) => response.json() as Promise<DataType>);
    const { results } = await fetch(
      `https://pokeapi.co/api/v2/contest-effect?offset=0&limit=${count + 10}`,
    ).then((response) => response.json() as Promise<DataType>);

    await Promise.all(results.map((item) => contestEffectFetcher(item.url)));

    await db.insert(contestEffectSchema).values({
      id: 0,
      effectEntry: "No Data",
      flavorText: "No Data",
      appeal: 0,
    });
  } catch (error: any) {
    console.log("Contest Effect Generator failed!");
  }
}
