import { EffectZodSchema, NamedAPIResourceZodSchema } from "~/validators/utility/common-models.zod";
import { z } from "zod";

const ContestEffectFlavorTextZodSchema = z.object({
	flavor_text: z.string().describe("The localized flavor text for an API resource in a specific language."),
	language: NamedAPIResourceZodSchema.describe("The language this name is in.")
});

const ContestEffectZodSchema = z.object({
	appeal: z.number().int().describe("The base number of hearts the user of this move gets."),
	effect_entries: z
		.array(EffectZodSchema)
		.describe("The result of this contest effect listed in different languages."),
	flavor_text_entries: z
		.array(ContestEffectFlavorTextZodSchema)
		.describe("The flavor text of this contest effect listed in different languages."),
	id: z.number().int().describe("The identifier for this resource."),
	jam: z.number().int().describe("The base number of hearts the user's opponent loses.")
});

export { ContestEffectZodSchema, ContestEffectFlavorTextZodSchema };
