import { DescriptionZodSchema, NameZodSchema, NamedAPIResourceZodSchema } from "~/validators/utility/common-models.zod";
import { z } from "zod";

const PokemonEntryZodSchema = z.object({
	entry_number: z.number().int().describe("The index of this Pokémon species entry within the Pokédex."),
	pokemon_species: NamedAPIResourceZodSchema.describe("The Pokémon species being encountered.")
});

const PokedexZodSchema = z.object({
	descriptions: z
		.array(DescriptionZodSchema)
		.describe("The description of this resource listed in different languages."),
	id: z.number().int().describe("The identifier for this resource."),
	is_main_series: z
		.boolean()
		.describe("Whether or not this Pokédex originated in the main series of the video games."),
	name: z.string().describe("The name for this resource."),
	names: z.array(NameZodSchema).describe("The name of this resource listed in different languages."),
	pokemon_entries: z
		.array(PokemonEntryZodSchema)
		.describe("A list of Pokémon catalogued in this Pokédex and their indexes."),
	region: NamedAPIResourceZodSchema.nullable().describe("The region this Pokédex catalogues Pokémon for."),
	version_groups: z.array(NamedAPIResourceZodSchema).describe("A list of version groups this Pokédex is relevant to.")
});

export { PokedexZodSchema, PokemonEntryZodSchema };
