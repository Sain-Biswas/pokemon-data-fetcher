import { NamedAPIResourceZodSchema } from "~/validators/utility/common-models.zod";
import { z } from "zod";

const VersionGroupZodSchema = z.object({
	generation: NamedAPIResourceZodSchema.describe("The generation this version was introduced in."),
	id: z.number().int().describe("The identifier for this resource."),
	move_learn_methods: z
		.array(NamedAPIResourceZodSchema)
		.describe("A list of methods in which Pokémon can learn moves in this version group."),
	name: z.string().describe("The name for this resource."),
	order: z
		.number()
		.int()
		.describe("Order for sorting. Almost by date of release, except similar versions are grouped together."),
	pokedexes: z.array(NamedAPIResourceZodSchema).describe("A list of Pokédexes introduces in this version group."),
	regions: z
		.array(NamedAPIResourceZodSchema)
		.describe("A list of regions that can be visited in this version group."),
	versions: z.array(NamedAPIResourceZodSchema).describe("The versions this version group owns.")
});

export { VersionGroupZodSchema };
