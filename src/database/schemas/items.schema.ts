import { sqliteTable } from "drizzle-orm/sqlite-core";

/**
 * ITEMS :- ITEM (D)
 */
const itemTable = sqliteTable("items", (table) => ({
	id: table.integer("id").unique().notNull(),
	name: table.text("name").primaryKey()
}));

export { itemTable };
