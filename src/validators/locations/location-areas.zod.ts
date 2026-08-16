import {
	NameZodSchema,
	NamedAPIResourceZodSchema,
	VersionEncounterDetailZodSchema
} from "~/validators/utility/common-models.zod";
import { z } from "zod";

const EncounterVersionDetailsZodSchema = z.object({
	rate: z.number().int().describe("The chance of an encounter to occur."),
	version: NamedAPIResourceZodSchema.describe(
		"The version of the game in which the encounter can occur with the given chance."
	)
});

const EncounterMethodRateZodSchema = z.object({
	encounter_method: NamedAPIResourceZodSchema.describe("The method in which Pokémon may be encountered in an area.."),
	version_details: z
		.array(EncounterVersionDetailsZodSchema)
		.describe("The chance of the encounter to occur on a version of the game.")
});

const PokemonEncounterZodSchema = z.object({
	pokemon: NamedAPIResourceZodSchema.describe("The Pokémon being encountered."),
	version_details: z
		.array(VersionEncounterDetailZodSchema)
		.describe("A list of versions and encounters with Pokémon that might happen in the referenced location area.")
});

const LocationAreaZodSchema = z.object({
	encounter_method_rates: z
		.array(EncounterMethodRateZodSchema)
		.describe(
			"A list of methods in which Pokémon may be encountered in this area and how likely the method will occur depending on the version of the game."
		),
	game_index: z.number().int().describe("The internal id of an API resource within game data."),
	id: z.number().int().describe("The identifier for this resource."),
	location: NamedAPIResourceZodSchema.describe("The region this location area can be found in."),
	name: z.string().describe("The name for this resource."),
	names: z.array(NameZodSchema).describe("The name of this resource listed in different languages."),
	pokemon_encounters: z
		.array(PokemonEncounterZodSchema)
		.describe(
			"A list of Pokémon that can be encountered in this area along with version specific details about the encounter."
		)
});

export {
	LocationAreaZodSchema,
	EncounterMethodRateZodSchema,
	EncounterVersionDetailsZodSchema,
	PokemonEncounterZodSchema
};
