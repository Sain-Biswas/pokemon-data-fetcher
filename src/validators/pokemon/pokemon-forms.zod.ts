import { NameZodSchema, NamedAPIResourceZodSchema } from "~/validators/utility/common-models.zod";
import { PokemonFormTypeZodSchema } from "~/validators/pokemon/pokemon.zod";
import { z } from "zod";

const PokemonFormConditionZodSchema = z.object({
	base_form: NamedAPIResourceZodSchema.nullable().describe(
		"The specific sibling form the Pokémon must already be in for this transformation, or null if it applies from the default form. For example, Ultra Necrozma lists Dusk Mane and Dawn Wings here, whereas Mega Charizard X (reached from the default form) is null."
	),
	name: z.string().nullable().describe("The name of the item, ability or move that triggers this form, if any."),
	trigger: z
		.string()
		.describe(
			'The kind of trigger that produces this form (for example "held-item", "ability" or "gigantamax-factor").'
		),
	url: z.string().nullable().describe("The URL of the item, ability or move that triggers this form, if any.")
});

const PokemonFormSpritesZodSchema = z.object({
	back_default: z.string().nullable().describe("The default depiction of this Pokémon form from the back in battle."),
	back_shiny: z.string().nullable().describe("The shiny depiction of this Pokémon form from the back in battle."),
	front_default: z
		.string()
		.nullable()
		.describe("The default depiction of this Pokémon form from the front in battle."),
	front_shiny: z.string().nullable().describe("The shiny depiction of this Pokémon form from the front in battle.")
});

const PokemonFormZodSchema = z.object({
	form_name: z.string().describe("The name of this form."),
	form_names: z
		.array(NameZodSchema)
		.describe(
			"The form specific form name of this Pokémon form, or empty if the form does not have a specific name."
		),
	form_order: z.number().int().describe("The order in which forms should be sorted within a species' forms."),
	id: z.number().int().describe("The identifier for this resource."),
	is_battle_only: z.boolean().describe("Whether or not this form can only happen during battle."),
	is_default: z.boolean().describe("True for exactly one form used as the default for each Pokémon."),
	is_mega: z.boolean().describe("Whether or not this form requires mega evolution."),
	name: z.string().describe("The name for this resource."),
	names: z
		.array(NameZodSchema)
		.describe(
			"The form specific full name of this Pokémon form, or empty if the form does not have a specific name."
		),
	order: z
		.number()
		.int()
		.describe(
			"The order in which forms should be sorted within all forms. Multiple forms may have equal order, in which case they should fall back on sorting by name."
		),
	pokemon: NamedAPIResourceZodSchema.describe("The Pokémon that can take on this form."),
	sprites: PokemonFormSpritesZodSchema.describe("A set of sprites used to depict this Pokémon form in the game."),
	trigger_conditions: z
		.array(PokemonFormConditionZodSchema)
		.describe(
			"A list of the conditions that trigger this (usually battle-only) form, such as holding a Mega Stone or having a specific Ability. Empty for forms that are not triggered."
		),
	types: z.array(PokemonFormTypeZodSchema).describe("A list of details showing types this Pokémon form has."),
	version_group: NamedAPIResourceZodSchema.describe("The version group this Pokémon form was introduced in.")
});

export { PokemonFormZodSchema, PokemonFormConditionZodSchema, PokemonFormSpritesZodSchema };
