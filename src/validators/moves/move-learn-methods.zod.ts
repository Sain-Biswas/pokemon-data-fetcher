import { DescriptionZodSchema, NameZodSchema, NamedAPIResourceZodSchema } from "~/validators/utility/common-models.zod";
import { z } from "zod";

const MoveLearnMethodZodSchema = z.object({
	descriptions: z
		.array(DescriptionZodSchema)
		.describe("The description of this resource listed in different languages."),
	id: z.number().int().describe("The identifier for this resource."),
	name: z.string().describe("The name for this resource."),
	names: z.array(NameZodSchema).describe("The name of this resource listed in different languages."),
	version_groups: z
		.array(NamedAPIResourceZodSchema)
		.describe("A list of version groups where moves can be learned through this method.")
});

export { MoveLearnMethodZodSchema };
