import { NamedAPIResourceZodSchema, VersionGameIndexZodSchema } from "~/validators/utility/common-models.zod";
import { z } from "zod";

const PokemonAbilityZodSchema = z.object({
	ability: NamedAPIResourceZodSchema.describe("The ability the Pokémon may have."),
	is_hidden: z.boolean().describe("Whether or not this is a hidden ability."),
	slot: z.number().int().describe("The slot this ability occupies in this Pokémon species.")
});

const PokemonTypeZodSchema = z.object({
	slot: z.number().int().describe("The order the Pokémon's types are listed in."),
	type: NamedAPIResourceZodSchema.describe("The type the referenced Pokémon has.")
});

const PokemonFormTypeZodSchema = z.object({
	slot: z.number().int().describe("The order the Pokémon's types are listed in."),
	type: NamedAPIResourceZodSchema.describe("The type the referenced Form has.")
});

const PokemonTypePastZodSchema = z.object({
	generation: NamedAPIResourceZodSchema.describe(
		"The last generation in which the referenced pokémon had the listed types."
	),
	types: z
		.array(PokemonTypeZodSchema)
		.describe("The types the referenced pokémon had up to and including the listed generation.")
});

const PokemonAbilityPastEntryZodSchema = z.object({
	ability: NamedAPIResourceZodSchema.nullable().describe("The ability the Pokémon may have."),
	is_hidden: z.boolean().describe("Whether or not this is a hidden ability."),
	slot: z.number().int().describe("The slot this ability occupies in this Pokémon species.")
});

const PokemonAbilityPastZodSchema = z.object({
	abilities: z
		.array(PokemonAbilityPastEntryZodSchema)
		.describe(
			"The abilities the referenced pokémon had up to and including the listed generation. If null, the slot was previously empty."
		),
	generation: NamedAPIResourceZodSchema.describe(
		"The last generation in which the referenced pokémon had the listed abilities."
	)
});

const PokemonStatZodSchema = z.object({
	base_stat: z.number().int().describe("The base value of the stat."),
	effort: z.number().int().describe("The effort points (EV) the Pokémon has in the stat."),
	stat: NamedAPIResourceZodSchema.describe("The stat the Pokémon has.")
});

const PokemonStatPastZodSchema = z.object({
	generation: NamedAPIResourceZodSchema.describe(
		"The last generation in which the referenced pokémon had the listed stats."
	),
	stats: z.array(PokemonStatZodSchema).describe("The stat the Pokémon had up to and including the listed generation.")
});

const PokemonHeldItemVersionZodSchema = z.object({
	rarity: z.number().int().describe("How often the item is held."),
	version: NamedAPIResourceZodSchema.describe("The version in which the item is held.")
});

const PokemonHeldItemZodSchema = z.object({
	item: NamedAPIResourceZodSchema.describe("The item the referenced Pokémon holds."),
	version_details: z
		.array(PokemonHeldItemVersionZodSchema)
		.describe("The details of the different versions in which the item is held.")
});

const PokemonMoveVersionZodSchema = z.object({
	level_learned_at: z.number().int().describe("The minimum level to learn the move."),
	move_learn_method: NamedAPIResourceZodSchema.describe("The method by which the move is learned."),
	order: z
		.number()
		.int()
		.nullable()
		.describe(
			"Order by which the pokemon will learn the move. A newly learnt move will replace the move with lowest order."
		),
	version_group: NamedAPIResourceZodSchema.describe("The version group in which the move is learned.")
});

const PokemonMoveZodSchema = z.object({
	move: NamedAPIResourceZodSchema.describe("The move the Pokémon can learn."),
	version_group_details: z
		.array(PokemonMoveVersionZodSchema)
		.describe("The details of the version in which the Pokémon can learn the move.")
});

const PokemonSpritesZodSchema = z.object({
	back_default: z.string().nullable().describe("The default depiction of this Pokémon from the back in battle."),
	back_female: z.string().nullable().describe("The female depiction of this Pokémon from the back in battle."),
	back_shiny: z.string().nullable().describe("The shiny depiction of this Pokémon from the back in battle."),
	back_shiny_female: z
		.string()
		.nullable()
		.describe("The shiny female depiction of this Pokémon from the back in battle."),
	front_default: z.string().nullable().describe("The default depiction of this Pokémon from the front in battle."),
	front_female: z.string().nullable().describe("The female depiction of this Pokémon from the front in battle."),
	front_shiny: z.string().nullable().describe("The shiny depiction of this Pokémon from the front in battle."),
	front_shiny_female: z
		.string()
		.nullable()
		.describe("The shiny female depiction of this Pokémon from the front in battle.")
});

const PokemonCriesZodSchema = z.object({
	latest: z.string().nullable().describe("The latest depiction of this Pokémon's cry."),
	legacy: z.string().nullable().describe("The legacy depiction of this Pokémon's cry.")
});

const PokemonZodSchema = z.object({
	abilities: z.array(PokemonAbilityZodSchema).describe("A list of abilities this Pokémon could potentially have."),
	base_experience: z.number().int().nullable().describe("The base experience gained for defeating this Pokémon."),
	cries: PokemonCriesZodSchema.describe("A set of cries used to depict this Pokémon in the game."),
	forms: z.array(NamedAPIResourceZodSchema).describe("A list of forms this Pokémon can take on."),
	game_indices: z
		.array(VersionGameIndexZodSchema)
		.describe("A list of game indices relevant to Pokémon item by generation."),
	height: z.number().int().describe("The height of this Pokémon in decimeters."),
	held_items: z
		.array(PokemonHeldItemZodSchema)
		.describe("A list of items this Pokémon may be holding when encountered."),
	id: z.number().int().describe("The identifier for this resource."),
	is_default: z.boolean().describe("Set for exactly one Pokémon used as the default for each species."),
	location_area_encounters: z
		.string()
		.describe("A link to a list of location areas, as well as encounter details pertaining to specific versions."),
	moves: z
		.array(PokemonMoveZodSchema)
		.describe("A list of moves along with learn methods and level details pertaining to specific version groups."),
	name: z.string().describe("The name for this resource."),
	order: z.number().int().describe("Order for sorting. Almost national order, except families are grouped together."),
	past_abilities: z
		.array(PokemonAbilityPastZodSchema)
		.describe("A list of details showing abilities this pokémon had in previous generations"),
	past_stats: z
		.array(PokemonStatPastZodSchema)
		.describe("A list of details showing stats this pokémon had in previous generations"),
	past_types: z
		.array(PokemonTypePastZodSchema)
		.describe("A list of details showing types this pokémon had in previous generations"),
	species: NamedAPIResourceZodSchema.describe("The species this Pokémon belongs to."),
	sprites: PokemonSpritesZodSchema.describe("A set of sprites used to depict this Pokémon in the game."),
	stats: z.array(PokemonStatZodSchema).describe("A list of base stat values for this Pokémon."),
	types: z.array(PokemonTypeZodSchema).describe("A list of details showing types this Pokémon has."),
	weight: z.number().int().describe("The weight of this Pokémon in hectograms.")
});

export {
	PokemonZodSchema,
	PokemonAbilityZodSchema,
	PokemonTypeZodSchema,
	PokemonFormTypeZodSchema,
	PokemonTypePastZodSchema,
	PokemonAbilityPastZodSchema,
	PokemonStatPastZodSchema,
	PokemonHeldItemZodSchema,
	PokemonHeldItemVersionZodSchema,
	PokemonMoveZodSchema,
	PokemonMoveVersionZodSchema,
	PokemonStatZodSchema,
	PokemonSpritesZodSchema,
	PokemonCriesZodSchema
};
