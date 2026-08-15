import { NameZodSchema } from "~/validators/utility/common-models.zod";
import { z } from "zod";

const EncounterMethodZodSchema = z.object({
	id: z.number().int().describe("The identifier for this resource."),
	name: z.string().describe("The name for this resource."),
	names: z.array(NameZodSchema).describe("The name of this resource listed in different languages."),
	order: z.number().int().describe("A good value for sorting.")
});

export { EncounterMethodZodSchema };
