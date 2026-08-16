import {
	GenerationGameIndexZodSchema,
	NameZodSchema,
	NamedAPIResourceZodSchema
} from "~/validators/utility/common-models.zod";
import { z } from "zod";

const LocationZodSchema = z.object({
	areas: z.array(NamedAPIResourceZodSchema).describe("Areas that can be found within this location."),
	game_indices: z
		.array(GenerationGameIndexZodSchema)
		.describe("A list of game indices relevant to this location by generation."),
	id: z.number().int().describe("The identifier for this resource."),
	name: z.string().describe("The name for this resource."),
	names: z.array(NameZodSchema).describe("The name of this resource listed in different languages."),
	region: NamedAPIResourceZodSchema.nullable().describe("The region this location can be found in.")
});

export { LocationZodSchema };
