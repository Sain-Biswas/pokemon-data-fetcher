import { index, primaryKey, sqliteTable } from "drizzle-orm/sqlite-core";

const languagesTable = sqliteTable(
	"languages",
	(table) => ({
		id: table.text("id").primaryKey(),
		index: table.integer("index").notNull(),

		iso3166: table.text("iso3166", { length: 2 }),
		iso639: table.text("iso639", { length: 2 }),

		official: table.integer("official", { mode: "boolean" })
	}),
	(table) => [index("idx_languages_index").on(table.id)]
);

const languagesNamesTable = sqliteTable(
	"languages_name",
	(table) => ({
		id: table.text("id").references(() => languagesTable.id),
		language: table.text("language").references(() => languagesTable.id),
		name: table.text("name").notNull()
	}),
	(table) => [primaryKey({ columns: [table.id, table.language], name: "language_on_names" })]
);

export { languagesTable, languagesNamesTable };
