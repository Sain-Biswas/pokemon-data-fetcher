import { NameZodSchema } from "~/validators/utility/common-models.zod";
import { z } from "zod";

const MoveBattleStyleZodSchema = z.object({
	id: z.number().int().describe("The identifier for this resource."),
	name: z.string().describe("The name for this resource."),
	names: z.array(NameZodSchema).describe("The name of this resource listed in different languages.")
});

export { MoveBattleStyleZodSchema };
