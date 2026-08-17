import { index, primaryKey, sqliteTable } from "drizzle-orm/sqlite-core";

/**
 * Stores primary language entities.
 */
const languagesTable = sqliteTable(
	"languages",
	(table) => ({
		id: table.integer("id").notNull().unique(),
		iso3166: table.text("iso3166", { length: 2 }).notNull(),
		iso639: table.text("iso639", { length: 2 }).notNull(),
		name: table.text("name").primaryKey(),
		official: table.integer("official", { mode: "boolean" }).notNull().default(false)
	}),
	(table) => [index("idx_languages_id").on(table.id)]
);

/**
 * Stores localized names for languages.
 * @description
 * The name of [targetLanguage] written in [localizedInLanguage]
 */
const languagesNamesTable = sqliteTable(
	"ex_languages_name",
	(table) => ({
		local_language_name: table
			.text("local_language_name")
			.references(() => languagesTable.id)
			.notNull(),
		name: table.text("name").notNull(),
		target_language_name: table
			.text("target_language_name")
			.references(() => languagesTable.id)
			.notNull()
	}),
	(table) => [
		primaryKey({
			columns: [table.target_language_name, table.local_language_name],
			name: "pk_languages_name__on_languages"
		})
	]
);

export { languagesTable, languagesNamesTable };
