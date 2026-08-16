import { NameZodSchema, NamedAPIResourceZodSchema } from "~/validators/utility/common-models.zod";
import { z } from "zod";

const PalParkEncounterSpeciesZodSchema = z.object({
	base_score: z
		.number()
		.int()
		.describe("The base score given to the player when this Pokémon is caught during a pal park run."),
	pokemon_species: NamedAPIResourceZodSchema.describe("The Pokémon species being encountered."),
	rate: z.number().int().describe("The base rate for encountering this Pokémon in this pal park area.")
});

const PalParkAreaZodSchema = z.object({
	id: z.number().int().describe("The identifier for this resource."),
	name: z.string().describe("The name for this resource."),
	names: z.array(NameZodSchema).describe("The name of this resource listed in different languages."),
	pokemon_encounters: z
		.array(PalParkEncounterSpeciesZodSchema)
		.describe("A list of Pokémon encountered in thi pal park area along with details.")
});

export { PalParkAreaZodSchema, PalParkEncounterSpeciesZodSchema };
