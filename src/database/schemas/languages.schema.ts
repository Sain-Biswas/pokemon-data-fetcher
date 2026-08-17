import { index, primaryKey, sqliteTable } from "drizzle-orm/sqlite-core";

/**
 * Stores primary language entities.
 */
const languagesTable = sqliteTable(
	"languages",
	(table) => ({
		id: table.text("id").primaryKey(),
		index: table.integer("index").notNull().unique(),

		iso3166: table.text("iso3166", { length: 2 }).notNull(),
		iso639: table.text("iso639", { length: 2 }).notNull(),

		official: table.integer("official", { mode: "boolean" }).notNull().default(false)
	}),
	(table) => [index("idx_languages_index").on(table.index)]
);

/**
 * Stores localized names for languages.
 * @description
 * The name of [targetLanguage] written in [localizedInLanguage]
 */
const languagesNamesTable = sqliteTable(
	"languages_name",
	(table) => ({
		localLanguageId: table
			.text("local_language_id")
			.references(() => languagesTable.id)
			.notNull(),
		name: table.text("name").notNull(),
		targetLanguageId: table
			.text("target_language_id")
			.references(() => languagesTable.id)
			.notNull()
	}),
	(table) => [
		primaryKey({
			columns: [table.targetLanguageId, table.localLanguageId],
			name: "pk_languages_name__on_languages"
		})
	]
);

export type LanguagesNamesTableInsertType = typeof languagesNamesTable.$inferInsert;

export { languagesTable, languagesNamesTable };
