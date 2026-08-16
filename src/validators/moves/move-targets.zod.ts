import { DescriptionZodSchema, NameZodSchema, NamedAPIResourceZodSchema } from "~/validators/utility/common-models.zod";
import { z } from "zod";

const MoveTargetZodSchema = z.object({
	descriptions: z
		.array(DescriptionZodSchema)
		.describe("The description of this resource listed in different languages."),
	id: z.number().int().describe("The identifier for this resource."),
	moves: z.array(NamedAPIResourceZodSchema).describe("A list of moves that that are directed at this target."),
	name: z.string().describe("The name for this resource."),
	names: z.array(NameZodSchema).describe("The name of this resource listed in different languages.")
});

export { MoveTargetZodSchema };
