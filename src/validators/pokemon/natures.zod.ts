import { NameZodSchema, NamedAPIResourceZodSchema } from "~/validators/utility/common-models.zod";
import { z } from "zod";

const NatureStatChangeZodSchema = z.object({
	max_change: z.number().int().describe("The amount of change."),
	pokeathlon_stat: NamedAPIResourceZodSchema.describe("The stat being affected.")
});

const MoveBattleStylePreferenceZodSchema = z.object({
	high_hp_preference: z.number().int().describe("Chance of using the move, in percent, if HP is over one half."),
	low_hp_preference: z.number().int().describe("Chance of using the move, in percent, if HP is under one half."),
	move_battle_style: NamedAPIResourceZodSchema.describe("The move battle style.")
});

const NatureZodSchema = z.object({
	decreased_stat: NamedAPIResourceZodSchema.nullable().describe(
		"The stat decreased by 10% in Pokémon with this nature."
	),
	hates_flavor: NamedAPIResourceZodSchema.nullable().describe("The flavor hated by Pokémon with this nature."),
	id: z.number().int().describe("The identifier for this resource."),
	increased_stat: NamedAPIResourceZodSchema.nullable().describe(
		"The stat increased by 10% in Pokémon with this nature."
	),
	likes_flavor: NamedAPIResourceZodSchema.nullable().describe("The flavor liked by Pokémon with this nature."),
	move_battle_style_preferences: z
		.array(MoveBattleStylePreferenceZodSchema)
		.describe(
			"A list of battle styles and how likely a Pokémon with this nature is to use them in the Battle Palace or Battle Tent."
		),
	name: z.string().describe("The name for this resource."),
	names: z.array(NameZodSchema).describe("The name of this resource listed in different languages."),
	pokeathlon_stat_changes: z
		.array(NatureStatChangeZodSchema)
		.describe("A list of Pokéathlon stats this nature effects and how much it effects them.")
});

export { NatureZodSchema, NatureStatChangeZodSchema, MoveBattleStylePreferenceZodSchema };
