import { NameZodSchema, NamedAPIResourceZodSchema } from "~/validators/utility/common-models.zod";
import { z } from "zod";

const FlavorBerryMapZodSchema = z.object({
	berry: NamedAPIResourceZodSchema.describe("The berry with the referenced flavor."),
	potency: z.number().int().describe("How powerful the referenced flavor is for this berry.")
});

const BerryFlavorZodSchema = z.object({
	berries: z.array(FlavorBerryMapZodSchema).describe("A list of the berries with this flavor."),
	contest_type: NamedAPIResourceZodSchema.describe("The contest type that correlates with this berry flavor."),
	id: z.number().int().describe("The identifier for this resource."),
	name: z.string().describe("The name for this resource."),
	names: z.array(NameZodSchema).describe("The name of this resource listed in different languages.")
});

export { BerryFlavorZodSchema, FlavorBerryMapZodSchema };
