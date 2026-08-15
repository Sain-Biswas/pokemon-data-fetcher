import { z } from "zod";

const APIResourceZodSchema = z.object({
	url: z.url().describe("The URL of the referenced resource.")
});

const NamedAPIResourceZodSchema = z.object({
	name: z.string().describe("The name of the referenced resource."),
	url: z.url().describe("The URL of the referenced resource.")
});

const DescriptionZodSchema = z.object({
	description: z.string().describe("The localized description for an API resource in a specific language."),
	language: NamedAPIResourceZodSchema.describe("The language this name is in.")
});

const EffectZodSchema = z.object({
	effect: z.string().describe("The localized effect text for an API resource in a specific language."),
	language: NamedAPIResourceZodSchema.describe("The language this effect is in.")
});

const EncounterZodSchema = z.object({
	chance: z.number().int().describe("Percent chance that this encounter will occur."),
	condition_values: z
		.array(NamedAPIResourceZodSchema)
		.describe("A list of condition values that must be in effect for this encounter to occur."),
	max_level: z.number().int().describe("The highest level the Pokémon could be encountered at."),
	method: NamedAPIResourceZodSchema.describe("The method by which this encounter happens."),
	min_level: z.number().int().describe("The lowest level the Pokémon could be encountered at.")
});

const FlavorTextZodSchema = z.object({
	flavor_text: z
		.string()
		.describe(
			"The localized flavor text for an API resource in a specific language. Note that this text is left unprocessed as it is found in game files. This means that it contains special characters that one might want to replace with their visible decodable version. Please check out this issue to find out more."
		),
	language: NamedAPIResourceZodSchema.describe("The language this name is in."),
	version: NamedAPIResourceZodSchema.describe("The game version this flavor text is extracted from.")
});

const GenerationGameIndexZodSchema = z.object({
	game_index: z.number().int().describe("The internal id of an API resource within game data."),
	generation: NamedAPIResourceZodSchema.describe("The generation relevant to this game index.")
});

const MachineVersionDetailZodSchema = z.object({
	machine: APIResourceZodSchema.describe("The machine that teaches a move from an item."),
	version_group: NamedAPIResourceZodSchema.describe("The version group of this specific machine.")
});

const NameZodSchema = z.object({
	language: NamedAPIResourceZodSchema.describe("The language this name is in."),
	name: z.string().describe("The localized name for an API resource in a specific language.")
});

const VerboseEffectZodSchema = z.object({
	effect: z.string().describe("The localized effect text for an API resource in a specific language."),
	language: NamedAPIResourceZodSchema.describe("The language this effect is in."),
	short_effect: z.string().describe("The localized effect text in brief.")
});

const VersionEncounterDetailZodSchema = z.object({
	encounter_details: z.array(EncounterZodSchema).describe("A list of encounters and their specifics."),
	max_chance: z.number().int().describe("The total percentage of all encounter potential."),
	version: NamedAPIResourceZodSchema.describe("The game version this encounter happens in.")
});

const VersionGameIndexZodSchema = z.object({
	game_index: z.number().int().describe("The internal id of an API resource within game data."),
	version: NamedAPIResourceZodSchema.describe("The version relevant to this game index.")
});

const VersionGroupFlavorTextZodSchema = z.object({
	language: NamedAPIResourceZodSchema.describe("The language this name is in."),
	text: z.string().describe("The localized name for an API resource in a specific language."),
	version_group: NamedAPIResourceZodSchema.describe("The version group which uses this flavor text.")
});

export {
	APIResourceZodSchema,
	DescriptionZodSchema,
	EffectZodSchema,
	EncounterZodSchema,
	FlavorTextZodSchema,
	GenerationGameIndexZodSchema,
	MachineVersionDetailZodSchema,
	NameZodSchema,
	NamedAPIResourceZodSchema,
	VerboseEffectZodSchema,
	VersionEncounterDetailZodSchema,
	VersionGameIndexZodSchema,
	VersionGroupFlavorTextZodSchema
};
