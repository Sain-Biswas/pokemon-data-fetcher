import { sqliteTable } from "drizzle-orm/sqlite-core";

/**
 * POKEMON :- TYPE (D)
 */
const typesTable = sqliteTable("types", (table) => ({
	id: table.integer("id").unique().notNull(),
	name: table.text("name").primaryKey()
}));

export { typesTable };
