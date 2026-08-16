import { NameZodSchema, NamedAPIResourceZodSchema } from "~/validators/utility/common-models.zod";
import { z } from "zod";

const AwesomeNameZodSchema = z.object({
	awesome_name: z.string().describe('The localized "scientific" name for an API resource in a specific language.'),
	language: NamedAPIResourceZodSchema.describe('The language this "scientific" name is in.')
});

const PokemonShapeZodSchema = z.object({
	awesome_names: z
		.array(AwesomeNameZodSchema)
		.describe('The "scientific" name of this Pokémon shape listed in different languages.'),
	id: z.number().int().describe("The identifier for this resource."),
	name: z.string().describe("The name for this resource."),
	names: z.array(NameZodSchema).describe("The name of this resource listed in different languages."),
	pokemon_species: z.array(NamedAPIResourceZodSchema).describe("A list of the Pokémon species that have this shape.")
});

export { PokemonShapeZodSchema, AwesomeNameZodSchema };
