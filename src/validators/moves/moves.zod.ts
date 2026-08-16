import {
	APIResourceZodSchema,
	MachineVersionDetailZodSchema,
	NameZodSchema,
	NamedAPIResourceZodSchema,
	VerboseEffectZodSchema
} from "~/validators/utility/common-models.zod";
import { AbilityEffectChangeZodSchema } from "~/validators//pokemon/abilities.zod";
import { z } from "zod";

const ContestComboDetailZodSchema = z.object({
	use_after: z.array(NamedAPIResourceZodSchema).nullable().describe("A list of moves to use after this move."),
	use_before: z.array(NamedAPIResourceZodSchema).nullable().describe("A list of moves to use before this move.")
});

const ContestComboSetsZodSchema = z.object({
	normal: ContestComboDetailZodSchema.describe(
		"A detail of moves this move can be used before or after, granting additional appeal points in contests."
	),
	super: ContestComboDetailZodSchema.describe(
		"A detail of moves this move can be used before or after, granting additional appeal points in super contests."
	)
});

const MoveFlavorTextZodSchema = z.object({
	flavor_text: z.string().describe("The localized flavor text for an api resource in a specific language."),
	language: NamedAPIResourceZodSchema.describe("The language this name is in."),
	version_group: NamedAPIResourceZodSchema.describe("The version group that uses this flavor text.")
});

const MoveMetaDataZodSchema = z.object({
	ailment: NamedAPIResourceZodSchema.describe("The status ailment this move inflicts on its target."),
	ailment_chance: z.number().int().describe("The likelihood this attack will cause an ailment."),
	category: NamedAPIResourceZodSchema.describe("The category of move this move falls under, e.g. damage or ailment."),
	crit_rate: z.number().int().describe("Critical hit rate bonus."),
	drain: z
		.number()
		.int()
		.describe("HP drain (if positive) or Recoil damage (if negative), in percent of damage done."),
	flinch_chance: z.number().int().describe("The likelihood this attack will cause the target Pokémon to flinch."),
	healing: z
		.number()
		.int()
		.describe("The amount of hp gained by the attacking Pokemon, in percent of it's maximum HP."),
	max_hits: z
		.number()
		.int()
		.nullable()
		.describe("The maximum number of times this move hits. Null if it always only hits once."),
	max_turns: z
		.number()
		.int()
		.nullable()
		.describe(
			"The maximum number of turns this move continues to take effect. Null if it always only lasts one turn."
		),
	min_hits: z
		.number()
		.int()
		.nullable()
		.describe("The minimum number of times this move hits. Null if it always only hits once."),
	min_turns: z
		.number()
		.int()
		.nullable()
		.describe(
			"The minimum number of turns this move continues to take effect. Null if it always only lasts one turn."
		),
	stat_chance: z.number().int().describe("The likelihood this attack will cause a stat change in the target Pokémon.")
});

const MoveStatChangeZodSchema = z.object({
	change: z.number().int().describe("The amount of change."),
	stat: NamedAPIResourceZodSchema.describe("The stat being affected.")
});

const PastMoveStatValuesZodSchema = z.object({
	accuracy: z.number().int().nullable().describe("The percent value of how likely this move is to be successful."),
	effect_chance: z
		.number()
		.int()
		.nullable()
		.describe("The percent value of how likely it is this moves effect will take effect."),
	effect_entries: z.array(VerboseEffectZodSchema).describe("The effect of this move listed in different languages."),
	power: z
		.number()
		.int()
		.nullable()
		.describe("The base power of this move with a value of 0 if it does not have a base power."),
	pp: z.number().int().nullable().describe("Power points. The number of times this move can be used."),
	type: NamedAPIResourceZodSchema.nullable().describe("The elemental type of this move."),
	version_group: NamedAPIResourceZodSchema.describe(
		"The version group in which these move stat values were in effect."
	)
});

const MoveZodSchema = z.object({
	accuracy: z.number().int().nullable().describe("The percent value of how likely this move is to be successful."),
	contest_combos: ContestComboSetsZodSchema.nullable().describe(
		"A detail of normal and super contest combos that require this move."
	),
	contest_effect: APIResourceZodSchema.nullable().describe("The effect the move has when used in a contest."),
	contest_type: NamedAPIResourceZodSchema.nullable().describe(
		"The type of appeal this move gives a Pokémon when used in a contest."
	),
	damage_class: NamedAPIResourceZodSchema.describe(
		"The type of damage the move inflicts on the target, e.g. physical."
	),
	effect_chance: z
		.number()
		.int()
		.nullable()
		.describe("The percent value of how likely it is this moves effect will happen."),
	effect_changes: z
		.array(AbilityEffectChangeZodSchema)
		.describe("The list of previous effects this move has had across version groups of the games."),
	effect_entries: z.array(VerboseEffectZodSchema).describe("The effect of this move listed in different languages."),
	flavor_text_entries: z
		.array(MoveFlavorTextZodSchema)
		.describe("The flavor text of this move listed in different languages."),
	generation: NamedAPIResourceZodSchema.describe("The generation in which this move was introduced."),
	id: z.number().int().describe("The identifier for this resource."),
	learned_by_pokemon: z.array(NamedAPIResourceZodSchema).describe("List of Pokemon that can learn the move"),
	machines: z.array(MachineVersionDetailZodSchema).describe("A list of the machines that teach this move."),
	meta: MoveMetaDataZodSchema.nullable().describe("Metadata about this move"),
	name: z.string().describe("The name for this resource."),
	names: z.array(NameZodSchema).describe("The name of this resource listed in different languages."),
	past_values: z
		.array(PastMoveStatValuesZodSchema)
		.describe("A list of move resource value changes across version groups of the game."),
	power: z
		.number()
		.int()
		.nullable()
		.describe("The base power of this move with a value of 0 if it does not have a base power."),
	pp: z.number().int().nullable().describe("Power points. The number of times this move can be used."),
	priority: z
		.number()
		.int()
		.describe(
			"A value between -8 and 8. Sets the order in which moves are executed during battle. See Bulbapedia for greater detail."
		),
	stat_changes: z
		.array(MoveStatChangeZodSchema)
		.describe("A list of stats this moves effects and how much it effects them."),
	super_contest_effect: APIResourceZodSchema.nullable().describe(
		"The effect the move has when used in a super contest."
	),
	target: NamedAPIResourceZodSchema.describe("The type of target that will receive the effects of the attack."),
	type: NamedAPIResourceZodSchema.describe("The elemental type of this move.")
});

export {
	MoveZodSchema,
	ContestComboSetsZodSchema,
	ContestComboDetailZodSchema,
	MoveFlavorTextZodSchema,
	MoveMetaDataZodSchema,
	MoveStatChangeZodSchema,
	PastMoveStatValuesZodSchema
};
