import { NamedAPIResourceZodSchema } from "~/validators/utility/common-models.zod";
import { z } from "zod";

const PokemonSpeciesGenderZodSchema = z.object({
	pokemon_species: NamedAPIResourceZodSchema.describe("A Pokémon species that can be the referenced gender."),
	rate: z.number().int().describe("The chance of this Pokémon being female, in eighths; or -1 for genderless.")
});

const GenderZodSchema = z.object({
	id: z.number().int().describe("The identifier for this resource."),
	name: z.string().describe("The name for this resource."),
	pokemon_species_details: z
		.array(PokemonSpeciesGenderZodSchema)
		.describe("A list of Pokémon species that can be this gender and how likely it is that they will be."),
	required_for_evolution: z
		.array(NamedAPIResourceZodSchema)
		.describe("A list of Pokémon species that required this gender in order for a Pokémon to evolve into them.")
});

export { GenderZodSchema, PokemonSpeciesGenderZodSchema };
