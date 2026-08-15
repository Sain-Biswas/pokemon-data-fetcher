import { NamedAPIResourceZodSchema } from "~/validators/utility/common-models.zod";
import { z } from "zod";

const SuperContestEffectFlavorTextZodSchema = z.object({
	flavor_text: z.string().describe("The localized flavor text for an API resource in a specific language."),
	language: NamedAPIResourceZodSchema.describe("The language this name is in.")
});

const SuperContestEffectZodSchema = z.object({
	appeal: z.number().int().describe("The level of appeal this super contest effect has."),
	flavor_text_entries: z
		.array(SuperContestEffectFlavorTextZodSchema)
		.describe("The flavor text of this super contest effect listed in different languages."),
	id: z.number().int().describe("The identifier for this resource."),
	moves: z
		.array(NamedAPIResourceZodSchema)
		.describe("A list of moves that have the effect when used in super contests.")
});

export { SuperContestEffectZodSchema, SuperContestEffectFlavorTextZodSchema };
