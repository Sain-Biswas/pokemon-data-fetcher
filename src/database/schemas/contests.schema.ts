import { sqliteTable } from "drizzle-orm/sqlite-core";

/**
 * CONTESTS :- CONTEST TYPES (D)
 */
const contestTypesTable = sqliteTable("contests", (table) => ({
	id: table.integer("id").unique().notNull(),
	name: table.text("name").primaryKey()
}));

export { contestTypesTable };
