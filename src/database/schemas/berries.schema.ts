import { contestTypesTable } from "~/database/schemas/contests.schema";
import { itemTable } from "~/database/schemas/items.schema";
import { languagesTable } from "~/database/schemas/languages.schema";
import { sqliteTable } from "drizzle-orm/sqlite-core";
import { typesTable } from "~/database/schemas/pokemon.schema";

/**
 * BERRIES :- BERRIES (C)
 *
 * @see flavors - via relation : id [berryOnFlavorTable]
 * @see firmness - via relation : firmness_name [berryFirmnessesTable]
 * @see item - via relation : item_name [itemTable]
 * @see natural_gift_type - via relation : natural_gift_type_name [typesTable]
 */
const berriesTable = sqliteTable("berries", (table) => ({
	firmness_name: table.text("firmness_name").references(() => berryFirmnessesTable.id),

	growth_time: table.integer("growth_time"),

	id: table.integer("index").unique(),

	item_name: table.text("item_name").references(() => itemTable.name),

	max_harvest: table.integer("max_harvest"),

	name: table.text("id").primaryKey(),

	natural_gift_power: table.integer("natural_gift_power"),

	natural_gift_type_name: table.text("natural_gift_type_name").references(() => typesTable.name),

	size: table.integer("size"),

	smoothness: table.integer("smoothness"),

	soil_dryness: table.integer("soil_dryness")
}));

/**
 * BERRIES :- BERRY FIRMNESSES (C)
 *
 * @see berries - via relation : id [berriesTable]
 * @see names - via relation : id [berryFirmnessNamesTable]
 */
const berryFirmnessesTable = sqliteTable("berry_firmnesses", (table) => ({
	id: table.integer("id").unique().notNull(),
	name: table.text("name").primaryKey()
}));

const berryFirmnessNamesTable = sqliteTable("ex_berry_firmness_names", (table) => ({
	berry_firmness_name: table.text("berry_firmness_name").references(() => berryFirmnessesTable.id),
	language_name: table.text("language_name").references(() => languagesTable.name),
	name: table.text("name").notNull()
}));

/**
 * BERRIES :- BERRY FLAVORS (C)
 *
 * @see berries - via relation : id [berryOnFlavorTable]
 * @see names - via relation : id [berryFlavorsNamesTable]
 */
const berryFlavorsTable = sqliteTable("berry_flavors", (table) => ({
	contest_type_name: table
		.text("contest_type_name")
		.notNull()
		.references(() => contestTypesTable.name),
	id: table.integer("id").unique().notNull(),
	name: table.text("name").primaryKey()
}));

const berryFlavorsNamesTable = sqliteTable("ex_berry_flavours_names", (table) => ({
	berry_flavors_name: table.text("berry_flavors_name").references(() => berryFlavorsTable.name),
	language_name: table.text("language_name").references(() => languagesTable.name),
	name: table.text("name").notNull()
}));

/**
 * BERRIES :- RELATIONS INTERNAL
 */

const berryOnFlavorTable = sqliteTable("rx_berry_on_flavors", (table) => ({
	berry_name: table.text("berry_name").references(() => berriesTable.name),
	flavor_name: table.text("flavor_name").references(() => berryFlavorsTable.name),
	potency: table.integer("potency")
}));

export {
	berriesTable,
	berryFirmnessesTable,
	berryFirmnessNamesTable,
	berryFlavorsNamesTable,
	berryFlavorsTable,
	berryOnFlavorTable
};
