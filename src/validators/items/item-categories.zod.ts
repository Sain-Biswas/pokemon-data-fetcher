import { NameZodSchema, NamedAPIResourceZodSchema } from "~/validators/utility/common-models.zod";
import { z } from "zod";

const ItemCategoryZodSchema = z.object({
	id: z.number().int().describe("The identifier for this resource."),
	items: z.array(NamedAPIResourceZodSchema).describe("A list of items that are a part of this category."),
	name: z.string().describe("The name for this resource."),
	names: z.array(NameZodSchema).describe("The name of this item category listed in different languages."),
	pocket: NamedAPIResourceZodSchema.describe("The pocket items in this category would be put in.")
});

export { ItemCategoryZodSchema };
