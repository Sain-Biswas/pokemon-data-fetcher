import { APIResourceZodSchema, NameZodSchema, NamedAPIResourceZodSchema } from "~/validators/utility/common-models.zod";
import { z } from "zod";

const MoveStatAffectZodSchema = z.object({
	change: z.number().int().describe("The maximum amount of change to the referenced stat."),
	move: NamedAPIResourceZodSchema.describe("The move causing the change.")
});

const MoveStatAffectSetsZodSchema = z.object({
	decrease: z.array(MoveStatAffectZodSchema).describe("A list of moves and how they change the referenced stat."),
	increase: z.array(MoveStatAffectZodSchema).describe("A list of moves and how they change the referenced stat.")
});

const NatureStatAffectSetsZodSchema = z.object({
	decrease: z.array(NamedAPIResourceZodSchema).describe("A list of nature sand how they change the referenced stat."),
	increase: z.array(NamedAPIResourceZodSchema).describe("A list of natures and how they change the referenced stat.")
});

const StatZodSchema = z.object({
	affecting_moves: MoveStatAffectSetsZodSchema.describe(
		"A detail of moves which affect this stat positively or negatively."
	),
	affecting_natures: NatureStatAffectSetsZodSchema.describe(
		"A detail of natures which affect this stat positively or negatively."
	),
	characteristics: z
		.array(APIResourceZodSchema)
		.describe("A list of characteristics that are set on a Pokémon when its highest base stat is this stat."),
	game_index: z.number().int().describe("ID the games use for this stat."),
	id: z.number().int().describe("The identifier for this resource."),
	is_battle_only: z.boolean().describe("Whether this stat only exists within a battle."),
	move_damage_class: NamedAPIResourceZodSchema.nullable().describe(
		"The class of damage this stat is directly related to."
	),
	name: z.string().describe("The name for this resource."),
	names: z.array(NameZodSchema).describe("The name of this resource listed in different languages.")
});

export { StatZodSchema, MoveStatAffectSetsZodSchema, MoveStatAffectZodSchema, NatureStatAffectSetsZodSchema };
