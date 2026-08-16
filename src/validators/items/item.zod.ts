import {
	APIResourceZodSchema,
	GenerationGameIndexZodSchema,
	MachineVersionDetailZodSchema,
	NameZodSchema,
	NamedAPIResourceZodSchema,
	VerboseEffectZodSchema,
	VersionGroupFlavorTextZodSchema
} from "~/validators/utility/common-models.zod";
import { z } from "zod";

const ItemSpritesZodSchema = z.object({
	default: z.string().nullable().describe("The default depiction of this item.")
});

const ItemHolderPokemonVersionDetailZodSchema = z.object({
	rarity: z.number().int().describe("How often this Pokémon holds this item in this version."),
	version: NamedAPIResourceZodSchema.describe("The version that this item is held in by the Pokémon.")
});

const ItemHolderPokemonZodSchema = z.object({
	pokemon: NamedAPIResourceZodSchema.describe("The Pokémon that holds this item."),
	version_details: z
		.array(ItemHolderPokemonVersionDetailZodSchema)
		.describe("The details for the version that this item is held in by the Pokémon.")
});

const ItemPriceZodSchema = z.object({
	currency: NamedAPIResourceZodSchema.describe("The currency used for this price."),
	purchase_price: z
		.number()
		.int()
		.nullable()
		.describe("The purchase price of this item in this version group. Null if the item cannot be purchased."),
	sell_price: z
		.number()
		.int()
		.nullable()
		.describe("The sell price of this item in this version group. Null if the item cannot be sold."),
	version_group: NamedAPIResourceZodSchema.describe("The version group these prices apply to.")
});

const ItemZodSchema = z.object({
	attributes: z.array(NamedAPIResourceZodSchema).describe("A list of attributes this item has."),
	baby_trigger_for: APIResourceZodSchema.nullable().describe(
		"An evolution chain this item requires to produce a bay during mating."
	),
	category: NamedAPIResourceZodSchema.describe("The category of items this item falls into."),
	effect_entries: z
		.array(VerboseEffectZodSchema)
		.describe("The effect of this ability listed in different languages."),
	flavor_text_entries: z
		.array(VersionGroupFlavorTextZodSchema)
		.describe("The flavor text of this ability listed in different languages."),
	fling_effect: NamedAPIResourceZodSchema.nullable().describe(
		"The effect of the move Fling when used with this item."
	),
	fling_power: z.number().int().nullable().describe("The power of the move Fling when used with this item."),
	game_indices: z
		.array(GenerationGameIndexZodSchema)
		.describe("A list of game indices relevent to this item by generation."),
	held_by_pokemon: z
		.array(ItemHolderPokemonZodSchema)
		.describe("A list of Pokémon that might be found in the wild holding this item."),
	id: z.number().int().describe("The identifier for this resource."),
	machines: z.array(MachineVersionDetailZodSchema).describe("A list of the machines related to this item."),
	name: z.string().describe("The name for this resource."),
	names: z.array(NameZodSchema).describe("The name of this item listed in different languages."),
	prices: z.array(ItemPriceZodSchema).describe("The purchase and sell prices of this item for each version group."),
	sprites: ItemSpritesZodSchema.describe("A set of sprites used to depict this item in the game.")
});

export {
	ItemZodSchema,
	ItemSpritesZodSchema,
	ItemHolderPokemonZodSchema,
	ItemHolderPokemonVersionDetailZodSchema,
	ItemPriceZodSchema
};
