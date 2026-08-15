import { NameZodSchema, NamedAPIResourceZodSchema } from "~/validators/utility/common-models.zod";
import { z } from "zod";

const EncounterConditionZodSchema = z.object({
	id: z.number().int().describe("The identifier for this resource."),
	name: z.string().describe("The name for this resource."),
	names: z.array(NameZodSchema).describe("The name of this resource listed in different languages."),
	values: z.array(NamedAPIResourceZodSchema).describe("A list of possible values for this encounter condition.")
});

export { EncounterConditionZodSchema };
