import { NameZodSchema, NamedAPIResourceZodSchema } from "~/validators/utility/common-models.zod";
import { z } from "zod";

const GenerationZodSchema = z.object({
	abilities: z
		.array(NamedAPIResourceZodSchema)
		.describe("A list of abilities that were introduced in this generation."),
	id: z.number().int().describe("The identifier for this resource."),
	main_region: NamedAPIResourceZodSchema.describe("The main region travelled in this generation."),
	moves: z.array(NamedAPIResourceZodSchema).describe("A list of moves that were introduced in this generation."),
	name: z.string().describe("The name for this resource."),
	names: z.array(NameZodSchema).describe("The name of this resource listed in different languages."),
	pokemon_species: z
		.array(NamedAPIResourceZodSchema)
		.describe("A list of Pokémon species that were introduced in this generation."),
	types: z.array(NamedAPIResourceZodSchema).describe("A list of types that were introduced in this generation."),
	version_groups: z
		.array(NamedAPIResourceZodSchema)
		.describe("A list of version groups that were introduced in this generation.")
});

export { GenerationZodSchema };
