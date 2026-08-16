import { DescriptionZodSchema, NamedAPIResourceZodSchema } from "~/validators/utility/common-models.zod";
import { z } from "zod";

const GrowthRateExperienceLevelZodSchema = z.object({
	experience: z.number().int().describe("The amount of experience required to reach the referenced level."),
	level: z.number().int().describe("The level gained.")
});

const GrowthRateZodSchema = z.object({
	descriptions: z
		.array(DescriptionZodSchema)
		.describe("The descriptions of this characteristic listed in different languages."),
	formula: z.string().describe("The formula used to calculate the rate at which the Pokémon species gains level."),
	id: z.number().int().describe("The identifier for this resource."),
	levels: z
		.array(GrowthRateExperienceLevelZodSchema)
		.describe("A list of levels and the amount of experienced needed to attain them based on this growth rate."),
	name: z.string().describe("The name for this resource."),
	pokemon_species: z
		.array(NamedAPIResourceZodSchema)
		.describe("A list of Pokémon species that gain levels at this growth rate.")
});

export { GrowthRateZodSchema, GrowthRateExperienceLevelZodSchema };
