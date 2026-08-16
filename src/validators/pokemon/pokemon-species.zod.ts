import {
	APIResourceZodSchema,
	DescriptionZodSchema,
	FlavorTextZodSchema,
	NameZodSchema,
	NamedAPIResourceZodSchema
} from "~/validators/utility/common-models.zod";
import { z } from "zod";

const GenusZodSchema = z.object({
	genus: z.string().describe("The localized genus for the referenced Pokémon species"),
	language: NamedAPIResourceZodSchema.describe("The language this genus is in.")
});

const PokemonSpeciesDexEntryZodSchema = z.object({
	entry_number: z.number().int().describe("The index number within the Pokédex."),
	pokedex: NamedAPIResourceZodSchema.describe("The Pokédex the referenced Pokémon species can be found in.")
});

const PalParkEncounterAreaZodSchema = z.object({
	area: NamedAPIResourceZodSchema.describe("The pal park area where this encounter happens."),
	base_score: z
		.number()
		.int()
		.describe("The base score given to the player when the referenced Pokémon is caught during a pal park run."),
	rate: z.number().int().describe("The base rate for encountering the referenced Pokémon in this pal park area.")
});

const PokemonSpeciesVarietyZodSchema = z.object({
	is_default: z.boolean().describe("Whether this variety is the default variety."),
	pokemon: NamedAPIResourceZodSchema.describe("The Pokémon variety.")
});

const PokemonSpeciesZodSchema = z.object({
	base_happiness: z
		.number()
		.int()
		.nullable()
		.describe(
			"The happiness when caught by a normal Pokéball; up to 255. The higher the number, the happier the Pokémon."
		),
	capture_rate: z
		.number()
		.int()
		.describe("The base capture rate; up to 255. The higher the number, the easier the catch."),
	color: NamedAPIResourceZodSchema.describe("The color of this Pokémon for Pokédex search."),
	egg_groups: z
		.array(NamedAPIResourceZodSchema)
		.describe("A list of egg groups this Pokémon species is a member of."),
	evolution_chain: APIResourceZodSchema.describe("The evolution chain this Pokémon species is a member of."),
	evolves_from_species: NamedAPIResourceZodSchema.nullable().describe(
		"The Pokémon species that evolves into this Pokemon_species."
	),
	flavor_text_entries: z
		.array(FlavorTextZodSchema)
		.describe("A list of flavor text entries for this Pokémon species."),
	form_descriptions: z
		.array(DescriptionZodSchema)
		.describe("Descriptions of different forms Pokémon take on within the Pokémon species."),
	forms_switchable: z
		.boolean()
		.describe("Whether or not this Pokémon has multiple forms and can switch between them."),
	gender_rate: z
		.number()
		.int()
		.describe("The chance of this Pokémon being female, in eighths; or -1 for genderless."),
	genera: z.array(GenusZodSchema).describe("The genus of this Pokémon species listed in multiple languages."),
	generation: NamedAPIResourceZodSchema.describe("The generation this Pokémon species was introduced in."),
	growth_rate: NamedAPIResourceZodSchema.describe("The rate at which this Pokémon species gains levels."),
	habitat: NamedAPIResourceZodSchema.nullable().describe("The habitat this Pokémon species can be encountered in."),
	has_gender_differences: z.boolean().describe("Whether or not this Pokémon has visual gender differences."),
	hatch_counter: z
		.number()
		.int()
		.nullable()
		.describe(
			"Initial hatch counter: one must walk Y × (hatch_counter + 1) steps before this Pokémon's egg hatches, unless utilizing bonuses like Flame Body's."
		),
	id: z.number().int().describe("The identifier for this resource."),
	is_baby: z.boolean().describe("Whether or not this is a baby Pokémon."),
	is_legendary: z.boolean().describe("Whether or not this is a legendary Pokémon."),
	is_mythical: z.boolean().describe("Whether or not this is a mythical Pokémon."),
	name: z.string().describe("The name for this resource."),
	names: z.array(NameZodSchema).describe("The name of this resource listed in different languages."),
	order: z
		.number()
		.int()
		.describe(
			"The order in which species should be sorted. Based on National Dex order, except families are grouped together and sorted by stage."
		),
	pal_park_encounters: z
		.array(PalParkEncounterAreaZodSchema)
		.describe("A list of encounters that can be had with this Pokémon species in pal park."),
	pokedex_numbers: z
		.array(PokemonSpeciesDexEntryZodSchema)
		.describe("A list of Pokedexes and the indexes reserved within them for this Pokémon species."),
	shape: NamedAPIResourceZodSchema.nullable().describe("The shape of this Pokémon for Pokédex search."),
	varieties: z
		.array(PokemonSpeciesVarietyZodSchema)
		.describe("A list of the Pokémon that exist within this Pokémon species.")
});

export {
	PokemonSpeciesZodSchema,
	GenusZodSchema,
	PokemonSpeciesDexEntryZodSchema,
	PalParkEncounterAreaZodSchema,
	PokemonSpeciesVarietyZodSchema
};
