import db from "../drizzle";
import { typeOnPokemonSchema } from "../drizzle/schema/type-on-pokemon.schema";
import type DataType from "../types/data.type";
import type TypesType from "../types/types.type";

export async function typeOnPokemonFetcher(url: string) {
  try {
    const data = await fetch(url).then(
      (response) => response.json() as Promise<TypesType>,
    );

    const pokemons = data.pokemon.map((item) => ({
      typeReference: data.name,
      pokemonReference: item.pokemon.name,
    }));

    if (pokemons.length == 0) return;

    await db.insert(typeOnPokemonSchema).values(pokemons);
  } catch (error: any) {
    console.log(error);
    console.log(url.split("/").at(6));
  }
}

export default async function typeOnPokemonGenerator() {
  try {
    const { count } = await fetch("https://pokeapi.co/api/v2/type").then(
      (response) => response.json() as Promise<DataType>,
    );
    const { results } = await fetch(
      `https://pokeapi.co/api/v2/type?offset=0&limit=${count + 10}`,
    ).then((response) => response.json() as Promise<DataType>);

    await Promise.all(results.map((item) => typeOnPokemonFetcher(item.url)));
  } catch (error: any) {
    console.log("Type On Pokemon Generator failed!");
  }
}
