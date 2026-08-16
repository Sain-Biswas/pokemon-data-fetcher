import {
	GenerationGameIndexZodSchema,
	NameZodSchema,
	NamedAPIResourceZodSchema
} from "~/validators/utility/common-models.zod";
import { z } from "zod";

const TypePokemonZodSchema = z.object({
	pokemon: NamedAPIResourceZodSchema.describe("The Pokémon that has the referenced type."),
	slot: z.number().int().describe("The order the Pokémon's types are listed in.")
});

const TypeRelationsZodSchema = z.object({
	double_damage_from: z
		.array(NamedAPIResourceZodSchema)
		.describe("A list of types that are very effective against this type."),
	double_damage_to: z.array(NamedAPIResourceZodSchema).describe("A list of types this type is very effect against."),
	half_damage_from: z
		.array(NamedAPIResourceZodSchema)
		.describe("A list of types that are not very effective against this type."),
	half_damage_to: z
		.array(NamedAPIResourceZodSchema)
		.describe("A list of types this type is not very effect against."),
	no_damage_from: z.array(NamedAPIResourceZodSchema).describe("A list of types that have no effect on this type."),
	no_damage_to: z.array(NamedAPIResourceZodSchema).describe("A list of types this type has no effect on.")
});

const TypeRelationsPastZodSchema = z.object({
	damage_relations: TypeRelationsZodSchema.describe(
		"The damage relations the referenced type had up to and including the listed generation"
	),
	generation: NamedAPIResourceZodSchema.describe(
		"The last generation in which the referenced type had the listed damage relations"
	)
});

const TypeZodSchema = z.object({
	damage_relations: TypeRelationsZodSchema.describe(
		"A detail of how effective this type is toward others and vice versa."
	),
	game_indices: z
		.array(GenerationGameIndexZodSchema)
		.describe("A list of game indices relevant to this item by generation."),
	generation: NamedAPIResourceZodSchema.describe("The generation this type was introduced in."),
	id: z.number().int().describe("The identifier for this resource."),
	move_damage_class: NamedAPIResourceZodSchema.nullable().describe("The class of damage inflicted by this type."),
	moves: z.array(NamedAPIResourceZodSchema).describe("A list of moves that have this type."),
	name: z.string().describe("The name for this resource."),
	names: z.array(NameZodSchema).describe("The name of this resource listed in different languages."),
	past_damage_relations: z
		.array(TypeRelationsPastZodSchema)
		.describe(
			"A list of details of how effective this type was toward others and vice versa in previous generations"
		),
	pokemon: z.array(TypePokemonZodSchema).describe("A list of details of Pokémon that have this type.")
});

export { TypeZodSchema, TypePokemonZodSchema, TypeRelationsZodSchema, TypeRelationsPastZodSchema };
