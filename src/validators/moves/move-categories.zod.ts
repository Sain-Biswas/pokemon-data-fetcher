import { DescriptionZodSchema, NamedAPIResourceZodSchema } from "~/validators/utility/common-models.zod";
import { z } from "zod";

const MoveCategoryZodSchema = z.object({
	descriptions: z
		.array(DescriptionZodSchema)
		.describe("The description of this resource listed in different languages."),
	id: z.number().int().describe("The identifier for this resource."),
	moves: z.array(NamedAPIResourceZodSchema).describe("A list of moves that fall into this category."),
	name: z.string().describe("The name for this resource.")
});

export { MoveCategoryZodSchema };
