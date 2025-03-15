import { and, eq } from "drizzle-orm";
import db from "../drizzle";
import { abilitySchema } from "../drizzle/schema/ability.schema";
import { eggGroupSchema } from "../drizzle/schema/egg-group.schema";
import { generationSchema } from "../drizzle/schema/generation.schema";
import { movesOnPokemonSchema } from "../drizzle/schema/moves-on-pokemon.schema";
import { movesSchema } from "../drizzle/schema/moves.schema";
import { pokemonOnAbilitySchema } from "../drizzle/schema/pokemon-on-ability.schema";
import { pokemonSpeciesOnEggGroupSchema } from "../drizzle/schema/pokemon-species-on-egg-group.schema";
import { pokemonSpeciesSchema } from "../drizzle/schema/pokemon-species.schema";
import { pokemonSchema } from "../drizzle/schema/pokemon.schema";
import { regionSchema } from "../drizzle/schema/region.schema";
import { typeOnPokemonSchema } from "../drizzle/schema/type-on-pokemon.schema";
import { typeSchema } from "../drizzle/schema/type.schema";
import { pokemonSpeciesOnVarietySchema } from "../drizzle/schema/pokemon-species-on-variety.schema";
import { write } from "bun";

(async () => {
  const data = await db
    .select()
    .from(pokemonSchema)
    .leftJoin(
      pokemonSpeciesSchema,
      eq(pokemonSchema.speciesReference, pokemonSpeciesSchema.id)
    )
    .leftJoin(
      generationSchema,
      eq(pokemonSpeciesSchema.generationReference, generationSchema.id)
    )
    .leftJoin(
      regionSchema,
      eq(generationSchema.mainRegionReference, regionSchema.id)
    )
    .leftJoin(
      typeOnPokemonSchema,
      eq(pokemonSchema.id, typeOnPokemonSchema.pokemonReference)
    )
    .leftJoin(typeSchema, eq(typeOnPokemonSchema.typeReference, typeSchema.id))
    .leftJoin(
      pokemonOnAbilitySchema,
      eq(pokemonSchema.id, pokemonOnAbilitySchema.pokemonReference)
    )
    .leftJoin(
      abilitySchema,
      eq(pokemonOnAbilitySchema.abilityReference, abilitySchema.id)
    )
    .leftJoin(
      pokemonSpeciesOnEggGroupSchema,
      eq(
        pokemonSpeciesSchema.id,
        pokemonSpeciesOnEggGroupSchema.pokemonReference
      )
    )
    .leftJoin(
      eggGroupSchema,
      eq(pokemonSpeciesOnEggGroupSchema.eggGroupReference, eggGroupSchema.id)
    )
    .leftJoin(
      movesOnPokemonSchema,
      eq(pokemonSchema.id, movesOnPokemonSchema.pokemonReference)
    )
    .leftJoin(
      movesSchema,
      eq(movesOnPokemonSchema.moveReference, movesSchema.id)
    )
    .leftJoin(
      pokemonSpeciesOnVarietySchema,
      and(
        eq(pokemonSchema.id, pokemonSpeciesOnVarietySchema.pokemonReference),
        eq(
          pokemonSpeciesSchema.id,
          pokemonSpeciesOnVarietySchema.pokemonSpeciesReference
        )
      )
    )
    .where(eq(pokemonSchema.index, 6))
    .groupBy(pokemonSchema.id);

  await write("test.json", JSON.stringify(data));
})();

