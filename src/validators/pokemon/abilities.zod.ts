import { EffectZodSchema, NamedAPIResourceZodSchema } from "~/validators/utility/common-models.zod";
import { z } from "zod";

const AbilityEffectChangeZodSchema = z.object({
	effect_entries: z
		.array(EffectZodSchema)
		.describe("The previous effect of this ability listed in different languages."),
	version_group: NamedAPIResourceZodSchema.describe(
		"The version group in which the previous effect of this ability originated."
	)
});

export { AbilityEffectChangeZodSchema };
