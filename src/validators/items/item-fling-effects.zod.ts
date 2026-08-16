import { EffectZodSchema, NamedAPIResourceZodSchema } from "~/validators/utility/common-models.zod";
import { z } from "zod";

const ItemFlingEffectZodSchema = z.object({
	effect_entries: z.array(EffectZodSchema).describe("The result of this fling effect listed in different languages."),
	id: z.number().int().describe("The identifier for this resource."),
	items: z.array(NamedAPIResourceZodSchema).describe("A list of items that have this fling effect."),
	name: z.string().describe("The name for this resource.")
});

export { ItemFlingEffectZodSchema };
