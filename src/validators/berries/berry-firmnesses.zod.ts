import { NameZodSchema, NamedAPIResourceZodSchema } from "~/validators/utility/common-models.zod";
import { z } from "zod";

const BerryFirmnessZodSchema = z.object({
	berries: z.array(NamedAPIResourceZodSchema).describe("A list of the berries with this firmness."),
	id: z.number().int().describe("The identifier for this resource."),
	name: z.string().describe("The name for this resource."),
	names: z.array(NameZodSchema).describe("The name of this resource listed in different languages.")
});

export { BerryFirmnessZodSchema };
