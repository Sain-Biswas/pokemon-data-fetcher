import db from "../drizzle";
import { typeSchema } from "../drizzle/schema/type.schema";
import type DataType from "../types/data.type";
import type TypesType from "../types/types.type";

export async function typeFetcher(url: string) {
  try {
    const data = await fetch(url).then(
      (response) => response.json() as Promise<TypesType>,
    );

    const doubleDamageFrom = data.damage_relations.double_damage_from.map(
      (item) => item.name,
    );

    const doubleDamageTo = data.damage_relations.double_damage_to.map(
      (item) => item.name,
    );

    const halfDamageFrom = data.damage_relations.half_damage_from.map(
      (item) => item.name,
    );

    const halfDamageTo = data.damage_relations.half_damage_to.map(
      (item) => item.name,
    );

    const noDamageFrom = data.damage_relations.no_damage_from.map(
      (item) => item.name,
    );

    const noDamageTo = data.damage_relations.no_damage_to.map(
      (item) => item.name,
    );

    await db.insert(typeSchema).values({
      id: data.name,
      index: data.id,
      name: data.names.filter((item) => item.language.name === "en").at(0)
        ?.name,
      moveDamageClassReference: data.move_damage_class?.name || "none",
      damageRelations: {
        halfDamageFrom,
        halfDamageTo,
        doubleDamageFrom,
        doubleDamageTo,
        noDamageFrom,
        noDamageTo,
      },
    });
  } catch (error: any) {
    console.log(error);
    console.log(url.split("/").at(6));
  }
}

export default async function typeGenerator() {
  try {
    const { count } = await fetch("https://pokeapi.co/api/v2/type").then(
      (response) => response.json() as Promise<DataType>,
    );
    const { results } = await fetch(
      `https://pokeapi.co/api/v2/type?offset=0&limit=${count + 10}`,
    ).then((response) => response.json() as Promise<DataType>);

    await Promise.all(results.map((item) => typeFetcher(item.url)));
  } catch (error: any) {
    console.log("Type Generator failed!");
  }
}
