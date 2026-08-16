import { NameZodSchema, NamedAPIResourceZodSchema } from "~/validators/utility/common-models.zod";
import { z } from "zod";

const NaturePokeathlonStatAffectZodSchema = z.object({
	max_change: z.number().int().describe("The maximum amount of change to the referenced Pokéathlon stat."),
	nature: NamedAPIResourceZodSchema.describe("The nature causing the change.")
});

const NaturePokeathlonStatAffectSetsZodSchema = z.object({
	decrease: z
		.array(NaturePokeathlonStatAffectZodSchema)
		.describe("A list of natures and how they change the referenced Pokéathlon stat."),
	increase: z
		.array(NaturePokeathlonStatAffectZodSchema)
		.describe("A list of natures and how they change the referenced Pokéathlon stat.")
});

const PokeathlonStatZodSchema = z.object({
	affecting_natures: NaturePokeathlonStatAffectSetsZodSchema.describe(
		"A detail of natures which affect this Pokéathlon stat positively or negatively."
	),
	id: z.number().int().describe("The identifier for this resource."),
	name: z.string().describe("The name for this resource."),
	names: z.array(NameZodSchema).describe("The name of this resource listed in different languages.")
});

export { PokeathlonStatZodSchema, NaturePokeathlonStatAffectSetsZodSchema, NaturePokeathlonStatAffectZodSchema };
