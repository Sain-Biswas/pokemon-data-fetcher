import { DescriptionZodSchema, NameZodSchema, NamedAPIResourceZodSchema } from "~/validators/utility/common-models.zod";
import { z } from "zod";

const ItemAttributeZodSchema = z.object({
	descriptions: z
		.array(DescriptionZodSchema)
		.describe("The description of this item attribute listed in different languages."),
	id: z.number().int().describe("The identifier for this resource."),
	items: z.array(NamedAPIResourceZodSchema).describe("A list of items that have this attribute."),
	name: z.string().describe("The name for this resource."),
	names: z.array(NameZodSchema).describe("The name of this item attribute listed in different languages.")
});

export { ItemAttributeZodSchema };
