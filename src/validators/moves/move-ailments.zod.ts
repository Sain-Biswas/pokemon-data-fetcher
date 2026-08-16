import { NameZodSchema, NamedAPIResourceZodSchema } from "~/validators/utility/common-models.zod";
import { z } from "zod";

const MoveAilmentZodSchema = z.object({
	id: z.number().int().describe("The identifier for this resource."),
	moves: z.array(NamedAPIResourceZodSchema).describe("A list of moves that cause this ailment."),
	name: z.string().describe("The name for this resource."),
	names: z.array(NameZodSchema).describe("The name of this resource listed in different languages.")
});

export { MoveAilmentZodSchema };
