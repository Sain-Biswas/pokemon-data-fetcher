import { write } from "bun";
import { eq } from "drizzle-orm";
import db from "../drizzle";
import { pokemonSchema } from "../drizzle/schema/pokemon.schema";
import { pokemonSpeciesSchema } from "../drizzle/schema/pokemon-species.schema";

async function singlePokemonData(parameter: string | number) {
  const where =
    typeof parameter === "number"
      ? eq(pokemonSpeciesSchema.index, parameter)
      : eq(pokemonSpeciesSchema.id, parameter);

  const pokemon = await db.query.pokemonSpeciesSchema.findFirst({
    where,
    columns: {
      id: true,
      index: true,
      name: true,
      baseHappiness: true,
      captureRate: true,
      color: true,
      evolutionChainReference: true,
      formSwitchable: true,
      genderRate: true,
      genera: true,
      growthRate: true,
      habitat: true,
      genderDifference: true,
      legendary: true,
      mythical: true,
      shape: true,
    },
    with: {
      generation: {
        columns: {
          id: true,
          name: true,
        },
        with: {
          mainRegion: {
            columns: {
              id: true,
              name: true,
            },
          },
        },
      },
      egggroup: {
        columns: {
          pokemonReference: false,
          eggGroupReference: false,
        },
        with: {
          eggGroup: {
            columns: {
              id: true,
              name: true,
            },
          },
        },
      },
      variety: {
        columns: {
          isDefault: true,
        },
        with: {
          pokemon: {
            columns: {
              id: true,
              index: true,
              name: true,
              baseExperience: true,
              cries: true,
              image: true,
              imageShiny: true,
              height: true,
              weight: true,
              hp: true,
              attack: true,
              defence: true,
              specialAttack: true,
              specialDefence: true,
              speed: true,
            },
            with: {
              type: {
                columns: {
                  pokemonReference: false,
                  typeReference: false,
                },
                with: {
                  type: {
                    columns: {
                      id: true,
                      name: true,
                    },
                  },
                },
              },
              moves: {
                columns: {
                  moveReference: false,
                  pokemonReference: false,
                },
                with: {
                  move: {
                    columns: {
                      id: true,
                      index: true,
                      name: true,
                      pp: true,
                      power: true,
                    },
                    with: {
                      type: {
                        columns: {
                          id: true,
                          name: true,
                        },
                      },
                      generation: {
                        columns: {
                          id: true,
                          name: true,
                        },
                      },
                      target: {
                        columns: {
                          name: true,
                        },
                      },
                      ailment: {
                        columns: {
                          name: true,
                        },
                      },
                      moveDamageClass: {
                        columns: {
                          name: true,
                        },
                      },
                    },
                  },
                },
              },
              ability: {
                columns: {
                  isHidden: true,
                },
                with: {
                  ability: {
                    columns: {
                      name: true,
                      shortEffect: true,
                      effect: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
      flavorText: {
        columns: {
          flavorText: true,
        },
        with: {
          version: {},
        },
      },
    },
  });

  if (!pokemon) {
    return {};
  }

  // return pokemon;

  return {
    // Basic Spicies data
    id: pokemon.id,
    index: pokemon.index,
    name: pokemon.name,
    base_happiness: pokemon.baseHappiness,
    capture_rate: pokemon.captureRate,
    color: pokemon.color,
    is_form_switchable: pokemon.formSwitchable,
    gender_rate: pokemon.genderRate,
    genera: pokemon.genera,
    growth_rate: pokemon.growthRate,
    habitat: pokemon.habitat,
    is_gender_difference: pokemon.genderDifference,
    is_legendary: pokemon.legendary,
    is_mythical: pokemon.mythical,
    shape: pokemon.shape,

    // Generation
    generation: {
      id: pokemon.generation?.id,
      name: pokemon.generation?.name,
    },

    // Region
    region: {
      id: pokemon.generation?.mainRegion?.id,
      name: pokemon.generation?.mainRegion?.name,
    },

    // Egg Group
    egg_group: pokemon.egggroup.map((e) => e.eggGroup?.name),

    // Pokemons / Variety
    pokemons: pokemon.variety.map((v) => ({
      // Is naturak form
      is_default: v.isDefault,

      // Pokemon basic data
      id: v.pokemon?.id,
      index: v.pokemon?.index,
      name: v.pokemon?.name,
      cries: v.pokemon?.cries,
      image: v.pokemon?.image,
      image_shiny: v.pokemon?.imageShiny,

      // Physical
      height: v.pokemon?.height,
      weight: v.pokemon?.weight,

      // Pokemon stats
      base_experience: v.pokemon?.baseExperience,
      hp: v.pokemon?.hp,
      attack: v.pokemon?.attack,
      defence: v.pokemon?.defence,
      specialAttack: v.pokemon?.specialAttack,
      specialDefence: v.pokemon?.specialDefence,
      speed: v.pokemon?.speed,

      // Types
      types: v.pokemon?.type.map((t) => ({
        id: t.type?.id,
        name: t.type?.name,
      })),

      // Pokemon Moves
      moves: v.pokemon?.moves.map((move) => ({
        id: move.move?.id,
        index: move.move?.index,
        name: move.move?.name,
        pp: move.move?.pp,
        power: move.move?.power,
        type: move.move?.type,
        generation: move.move?.generation,
        target: move.move?.target?.name,
        ailment: move.move?.ailment?.name,
        move_damage_class: move.move?.moveDamageClass?.name,
      })),
    })),
  };
}

(async () => {
  const data = await singlePokemonData("charizard");

  await write("test.json", JSON.stringify(data));
})();
