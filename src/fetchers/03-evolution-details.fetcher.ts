import db from "../drizzle";
import { evolutionDetailsSchema } from "../drizzle/schema/evolution-details.schema";
import type DataType from "../types/data.type";
import type { EvolvesTo } from "../types/evolution-chain.type";
import type EvolutionChainType from "../types/evolution-chain.type";
import referenceParserUtility from "../utilities/referenceParser.utility";

export async function evolutionDetailsFetcher(url: string) {
  try {
    const data = await fetch(url).then(
      (response) => response.json() as Promise<EvolutionChainType>,
    );

    let count = 1;

    const chainData: any = [];

    parseEvolutionChainData(chainData, data.chain, count, data.id);

    await db.insert(evolutionDetailsSchema).values(chainData);
  } catch (error: any) {
    console.log(error);
    console.log(url.split("/").at(6));
  }
}

function parseEvolutionChainData(
  data: any[],
  evolveData: EvolvesTo,
  c: number,
  index: number,
) {
  evolveData.evolves_to.forEach((entry) =>
    parseEvolutionChainData(data, entry, c + 1, index),
  );

  const evolutionDetailsTemp = {
    heldItem: new Set<string>(),
    item: new Set<string>(),
    knownMove: new Set<string>(),
    knowMovetype: new Set<string>(),
    minLevel: Number.MAX_VALUE,
    needsOverworldRain: false,
    partySpecies: new Set<string>(),
    partytype: new Set<string>(),
    timeOfDay: new Set<string>(),
    tradeSpecies: new Set<string>(),
    trigger: new Set<string>(),
    turnUpsideDown: false,
  };

  evolveData.evolution_details.forEach((item) => {
    if (item.held_item) {
      evolutionDetailsTemp.heldItem.add(
        referenceParserUtility(item.held_item.name),
      );
    }

    if (item.item) {
      evolutionDetailsTemp.item.add(referenceParserUtility(item.item.name));
    }

    if (item.known_move) {
      evolutionDetailsTemp.knownMove.add(
        referenceParserUtility(item.known_move.name),
      );
    }

    if (item.known_move_type) {
      evolutionDetailsTemp.knowMovetype.add(
        referenceParserUtility(item.known_move_type.name),
      );
    }

    if (item.min_level) {
      evolutionDetailsTemp.minLevel =
        item.min_level < evolutionDetailsTemp.minLevel
          ? item.min_level
          : evolutionDetailsTemp.minLevel;
    }

    if (item.needs_overworld_rain) {
      evolutionDetailsTemp.needsOverworldRain =
        item.needs_overworld_rain || evolutionDetailsTemp.needsOverworldRain;
    }

    if (item.party_species) {
      evolutionDetailsTemp.partySpecies.add(
        referenceParserUtility(item.party_species.name),
      );
    }

    if (item.party_type) {
      evolutionDetailsTemp.partytype.add(
        referenceParserUtility(item.party_type.name),
      );
    }

    if (item.time_of_day) {
      evolutionDetailsTemp.timeOfDay.add(
        referenceParserUtility(item.time_of_day),
      );
    }

    if (item.tra_turn_upside_down) {
      evolutionDetailsTemp.tradeSpecies.add(
        referenceParserUtility(item.tra_turn_upside_down.name),
      );
    }
    if (item.trigger) {
      evolutionDetailsTemp.trigger.add(
        referenceParserUtility(item.trigger.name),
      );
    }

    if (item.turn_upside_down) {
      evolutionDetailsTemp.turnUpsideDown =
        item.turn_upside_down || evolutionDetailsTemp.turnUpsideDown;
    }
  });

  data.push({
    id: index,
    speciesReference: evolveData.species.name,
    rank: c,
    heldItem: Array.from(evolutionDetailsTemp.heldItem),
    item: Array.from(evolutionDetailsTemp.item),
    knownMove: Array.from(evolutionDetailsTemp.knownMove),
    knowMovetype: Array.from(evolutionDetailsTemp.knowMovetype),
    minLevel:
      evolutionDetailsTemp.minLevel == Number.MAX_VALUE
        ? 0
        : evolutionDetailsTemp.minLevel,
    needsOverworldRain: evolutionDetailsTemp.needsOverworldRain,
    partySpecies: Array.from(evolutionDetailsTemp.partySpecies),
    partytype: Array.from(evolutionDetailsTemp.partytype),
    timeOfDay: Array.from(evolutionDetailsTemp.timeOfDay),
    tradeSpecies: Array.from(evolutionDetailsTemp.tradeSpecies),
    trigger: Array.from(evolutionDetailsTemp.trigger),
    turnUpsideDown: evolutionDetailsTemp.turnUpsideDown,
  });
}

export default async function evolutionDetailsGenerator() {
  try {
    const { count } = await fetch(
      "https://pokeapi.co/api/v2/evolution-chain",
    ).then((response) => response.json() as Promise<DataType>);
    const { results } = await fetch(
      `https://pokeapi.co/api/v2/evolution-chain?offset=0&limit=${count + 10}`,
    ).then((response) => response.json() as Promise<DataType>);

    await Promise.all(results.map((item) => evolutionDetailsFetcher(item.url)));
  } catch (error: any) {
    console.log(" Generator failed!");
  }
}
