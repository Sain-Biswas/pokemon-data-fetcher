import { NameZodSchema, NamedAPIResourceZodSchema } from "~/validators/utility/common-models.zod";
import { z } from "zod";

const EncounterConditionValueZodSchema = z.object({
	condition: NamedAPIResourceZodSchema.describe("The condition this encounter condition value pertains to."),
	id: z.number().int().describe("The identifier for this resource."),
	name: z.string().describe("The name for this resource."),
	names: z.array(NameZodSchema).describe("The name of this resource listed in different languages.")
});

export { EncounterConditionValueZodSchema };
