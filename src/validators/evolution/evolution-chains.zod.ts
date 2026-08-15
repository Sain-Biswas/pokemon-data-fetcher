import { NamedAPIResourceZodSchema } from "~/validators/utility/common-models.zod";
import { z } from "zod";

const EvolutionDetailZodSchema = z.object({
	base_form: NamedAPIResourceZodSchema.nullable().describe("The required form for which this evolution can occur."),
	evolved_form: NamedAPIResourceZodSchema.nullable().describe("The form to which this evolution occurs."),
	gender: z
		.number()
		.int()
		.nullable()
		.describe(
			"The id of the gender of the evolving Pokémon species must be in order to evolve into this Pokémon species."
		),
	held_item: NamedAPIResourceZodSchema.nullable().describe(
		"The item the evolving Pokémon species must be holding during the evolution trigger event to evolve into this Pokémon species."
	),
	is_default: z
		.boolean()
		.describe(
			"Whether the evolution is considered as the expected evolution in a main series game. Each unique Pokémon variety of a line capable of evolution should have exactly one 'default' evolution. For example, the Meowth species has three default evolutions as there are three distinct varieties it can evolve into: Persian, Alolan Persian, and Perrserker."
		),
	item: NamedAPIResourceZodSchema.nullable().describe(
		"The item required to cause evolution this into Pokémon species."
	),
	known_move: NamedAPIResourceZodSchema.nullable().describe(
		"The move that must be known by the evolving Pokémon species during the evolution trigger event in order to evolve into this Pokémon species."
	),
	known_move_type: NamedAPIResourceZodSchema.nullable().describe(
		"The evolving Pokémon species must know a move with this type during the evolution trigger event in order to evolve into this Pokémon species."
	),
	location: NamedAPIResourceZodSchema.nullable().describe("The location the evolution must be triggered at."),
	min_affection: z
		.number()
		.int()
		.nullable()
		.describe(
			"The minimum required level of affection the evolving Pokémon species to evolve into this Pokémon species."
		),
	min_beauty: z
		.number()
		.int()
		.nullable()
		.describe(
			"The minimum required level of beauty the evolving Pokémon species to evolve into this Pokémon species."
		),
	min_damage_taken: z
		.number()
		.int()
		.nullable()
		.describe(
			"The minimum amount of damage taken during the evolution trigger event in order to evolve into this Pokémon species."
		),
	min_happiness: z
		.number()
		.int()
		.nullable()
		.describe(
			"The minimum required level of happiness the evolving Pokémon species to evolve into this Pokémon species."
		),
	min_level: z
		.number()
		.int()
		.nullable()
		.describe("The minimum required level of the evolving Pokémon species to evolve into this Pokémon species."),
	min_move_count: z
		.number()
		.int()
		.nullable()
		.describe("The minimum number of times a move must be used in order to evolve into this Pokémon species."),
	min_steps: z
		.number()
		.int()
		.nullable()
		.describe("The minimum number of steps that must be taken in order to evolve into this Pokémon species."),
	near_special_rock: z
		.boolean()
		.nullable()
		.describe("Whether or not you need to be near a Moss Rock or Icy Rock to evolve into this Pokémon species."),
	needs_multiplayer: z
		.boolean()
		.nullable()
		.describe(
			"Whether or not multiplayer link play is needed to evolve into this Pokémon species (e.g. Union Circle)."
		),
	needs_overworld_rain: z
		.boolean()
		.nullable()
		.describe("Whether or not it must be raining in the overworld to cause evolution this Pokémon species."),
	party_species: NamedAPIResourceZodSchema.nullable().describe(
		"The Pokémon species that must be in the players party in order for the evolving Pokémon species to evolve into this Pokémon species."
	),
	party_type: NamedAPIResourceZodSchema.nullable().describe(
		"The player must have a Pokémon of this type in their party during the evolution trigger event in order for the evolving Pokémon species to evolve into this Pokémon species."
	),
	region: NamedAPIResourceZodSchema.nullable().describe("The required region in which this evolution can occur."),
	relative_physical_stats: z
		.number()
		.int()
		.nullable()
		.describe(
			"The required relation between the Pokémon's Attack and Defense stats. 1 means Attack > Defense. 0 means Attack = Defense. -1 means Attack < Defense."
		),
	time_of_day: z.string().describe("The required time of day. Day or night."),
	trade_species: NamedAPIResourceZodSchema.nullable().describe("Pokémon species for which this one must be traded."),
	trigger: NamedAPIResourceZodSchema.describe("The type of event that triggers evolution into this Pokémon species."),
	turn_upside_down: z
		.boolean()
		.describe("Whether or not the 3DS needs to be turned upside-down as this Pokémon levels up."),
	used_move: NamedAPIResourceZodSchema.nullable().describe(
		"The move that must be used by the evolving Pokémon species during the evolution trigger event in order to evolve into this Pokémon species."
	),
	version_group: NamedAPIResourceZodSchema.describe("The version group in which the evolution was introduced.")
});

const ChainLinkZodSchema: z.ZodType<any> = z.lazy(() =>
	z.object({
		evolution_details: z
			.array(EvolutionDetailZodSchema)
			.describe("All details regarding the specific details of the referenced Pokémon species evolution."),
		evolves_to: z.array(ChainLinkZodSchema).describe("A List of chain objects."),
		is_baby: z
			.boolean()
			.describe("Whether or not this link is for a baby Pokémon. This would only ever be true on the base link."),
		species: NamedAPIResourceZodSchema.describe("The Pokémon species at this point in the evolution chain.")
	})
);

const EvolutionChainZodSchema = z.object({
	baby_trigger_item: NamedAPIResourceZodSchema.nullable().describe(
		"The item that a Pokémon would be holding when mating that would trigger the egg hatching a baby Pokémon rather than a basic Pokémon."
	),
	chain: ChainLinkZodSchema.describe(
		"The base chain link object. Each link contains evolution details for a Pokémon in the chain. Each link references the next Pokémon in the natural evolution order."
	),
	id: z.number().int().describe("The identifier for this resource.")
});

export { EvolutionChainZodSchema, ChainLinkZodSchema, EvolutionDetailZodSchema };
