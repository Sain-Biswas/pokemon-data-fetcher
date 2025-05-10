import { write } from "bun";
import { eq } from "drizzle-orm";
import db from "../drizzle";
import { pokemonSchema } from "../drizzle/schema/pokemon.schema";

async function pokemonCardDetails() {
  const data = await db.query.pokemonSchema.findMany({
    columns: {
      id: true,
      index: true,
      cries: true,
      image: true,
      name: true,
      imageShiny: true,
      speciesIndex: true,
    },
    with: {
      species: {
        columns: {
          name: true,
          formSwitchable: true,
          genera: true,
          genderDifference: true,
          legendary: true,
          mythical: true,
        },
        with: {
          generation: {
            columns: {
              id: true,
              name: true,
            },
          },
        },
      },
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
    },
    orderBy: [pokemonSchema.index],
  });

  return data.map((pokemon) => ({
    id: pokemon.id,
    index: pokemon.index,
    name: pokemon.name,

    // Multimedia
    cries: pokemon.cries,
    image: pokemon.image,
    image_shiny: pokemon.imageShiny,

    // Species specific data
    species_index: pokemon.speciesIndex,
    species_name: pokemon.species?.name,
    is_form_switchable: pokemon.species?.formSwitchable,
    genera: pokemon.species?.genera,
    is_gender_difference: pokemon.species?.genderDifference,
    is_legendary: pokemon.species?.legendary,
    is_mythical: pokemon.species?.mythical,

    // Generation
    generation: {
      id: pokemon.species?.generation?.id,
      name: pokemon.species?.generation?.name,
    },

    // Types
    types: pokemon.type.map((type) => ({
      id: type.type?.id,
      name: type.type?.name,
    })),
  }));
}

(async () => {
  const data = await pokemonCardDetails();

  await write("test.json", JSON.stringify(data));
})();
