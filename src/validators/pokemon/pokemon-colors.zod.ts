import { NameZodSchema, NamedAPIResourceZodSchema } from "~/validators/utility/common-models.zod";
import { z } from "zod";

const PokemonColorZodSchema = z.object({
	id: z.number().int().describe("The identifier for this resource."),
	name: z.string().describe("The name for this resource."),
	names: z.array(NameZodSchema).describe("The name of this resource listed in different languages."),
	pokemon_species: z.array(NamedAPIResourceZodSchema).describe("A list of the Pokémon species that have this color.")
});

export { PokemonColorZodSchema };
