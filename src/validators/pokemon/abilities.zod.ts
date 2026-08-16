import {
	EffectZodSchema,
	NameZodSchema,
	NamedAPIResourceZodSchema,
	VerboseEffectZodSchema
} from "~/validators/utility/common-models.zod";
import { z } from "zod";

const AbilityEffectChangeZodSchema = z.object({
	effect_entries: z
		.array(EffectZodSchema)
		.describe("The previous effect of this ability listed in different languages."),
	version_group: NamedAPIResourceZodSchema.describe(
		"The version group in which the previous effect of this ability originated."
	)
});

const AbilityFlavorTextZodSchema = z.object({
	flavor_text: z.string().describe("The localized name for an API resource in a specific language."),
	language: NamedAPIResourceZodSchema.describe("The language this text resource is in."),
	version_group: NamedAPIResourceZodSchema.describe("The version group that uses this flavor text.")
});

const AbilityPokemonZodSchema = z.object({
	is_hidden: z.boolean().describe("Whether or not this a hidden ability for the referenced Pokémon."),
	pokemon: NamedAPIResourceZodSchema.describe("The Pokémon this ability could belong to."),
	slot: z
		.number()
		.int()
		.describe(
			"Pokémon have 3 ability 'slots' which hold references to possible abilities they could have. This is the slot of this ability for the referenced pokemon."
		)
});

const AbilityZodSchema = z.object({
	effect_changes: z
		.array(AbilityEffectChangeZodSchema)
		.describe("The list of previous effects this ability has had across version groups."),
	effect_entries: z
		.array(VerboseEffectZodSchema)
		.describe("The effect of this ability listed in different languages."),
	flavor_text_entries: z
		.array(AbilityFlavorTextZodSchema)
		.describe("The flavor text of this ability listed in different languages."),
	generation: NamedAPIResourceZodSchema.describe("The generation this ability originated in."),
	id: z.number().int().describe("The identifier for this resource."),
	is_main_series: z
		.boolean()
		.describe("Whether or not this ability originated in the main series of the video games."),
	name: z.string().describe("The name for this resource."),
	names: z.array(NameZodSchema).describe("The name of this resource listed in different languages."),
	pokemon: z.array(AbilityPokemonZodSchema).describe("A list of Pokémon that could potentially have this ability.")
});

export { AbilityZodSchema, AbilityEffectChangeZodSchema, AbilityFlavorTextZodSchema, AbilityPokemonZodSchema };
