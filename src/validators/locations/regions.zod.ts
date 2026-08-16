import { NameZodSchema, NamedAPIResourceZodSchema } from "~/validators/utility/common-models.zod";
import { z } from "zod";

const RegionZodSchema = z.object({
	id: z.number().int().describe("The identifier for this resource."),
	locations: z.array(NamedAPIResourceZodSchema).describe("A list of locations that can be found in this region."),
	main_generation: NamedAPIResourceZodSchema.nullable().describe("The generation this region was introduced in."),
	name: z.string().describe("The name for this resource."),
	names: z.array(NameZodSchema).describe("The name of this resource listed in different languages."),
	pokedexes: z
		.array(NamedAPIResourceZodSchema)
		.describe("A list of pokédexes that catalogue Pokémon in this region."),
	version_groups: z
		.array(NamedAPIResourceZodSchema)
		.describe("A list of version groups where this region can be visited.")
});

export { RegionZodSchema };
