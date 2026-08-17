import { NamedAPIResourceZodSchema } from "~/validators/utility/common-models.zod";
import { z } from "zod";

const BerryFlavorMapZodSchema = z.object({
	flavor: NamedAPIResourceZodSchema.describe("The referenced berry flavor."),
	potency: z.number().int().describe("How powerful the referenced flavor is for this berry.")
});

const BerryZodSchema = z.object({
	firmness: NamedAPIResourceZodSchema.nullable().describe(
		"The firmness of this berry, used in making Pokéblocks or Poffins."
	),
	flavors: z
		.array(BerryFlavorMapZodSchema)
		.describe(
			"A list of references to each flavor a berry can have and the potency of each of those flavors in regard to this berry."
		),
	growth_time: z
		.number()
		.int()
		.nullable()
		.describe(
			"Time it takes the tree to grow one stage, in hours. Berry trees go through four of these growth stages before they can be picked."
		),
	id: z.number().int().describe("The identifier for this resource."),
	item: NamedAPIResourceZodSchema.describe(
		"Berries are actually items. This is a reference to the item specific data for this berry."
	),
	max_harvest: z
		.number()
		.int()
		.nullable()
		.describe("The maximum number of these berries that can grow on one tree in Generation IV."),
	name: z.string().describe("The name for this resource."),
	natural_gift_power: z
		.number()
		.int()
		.nullable()
		.describe('The power of the move "Natural Gift" when used with this Berry.'),
	natural_gift_type: NamedAPIResourceZodSchema.nullable().describe(
		'The type inherited by "Natural Gift" when used with this Berry.'
	),
	size: z.number().int().nullable().describe("The size of this Berry, in millimeters."),
	smoothness: z
		.number()
		.int()
		.nullable()
		.describe("The smoothness of this Berry, used in making Pokéblocks or Poffins."),
	soil_dryness: z
		.number()
		.int()
		.nullable()
		.describe(
			"The speed at which this Berry dries out the soil as it grows. A higher rate means the soil dries more quickly."
		)
});

export { BerryZodSchema, BerryFlavorMapZodSchema };
