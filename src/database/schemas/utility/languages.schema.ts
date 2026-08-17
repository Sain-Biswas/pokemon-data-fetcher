import { index, sqliteTable } from "drizzle-orm/sqlite-core"

const languagesTable = sqliteTable("languages",
    (table) => ({
        id: table.text("id").primaryKey(),
        index: table.integer("index").unique().notNull(),

        iso3166: table.text("iso3166", {length: 2}),
        iso639: table.text("iso639", {length: 2}),

        official: table.integer("official", {mode: "boolean"})
    }),
    (table) => [
        index("idx_languages_index").on(table.index)
    ]
)

const languagesNamesTable = sqliteTable("languages_name",
    (table) => ({
        id: table.text("id").primaryKey().references(() => languagesTable.id),
        name: table.text("name").notNull()
    })
)

export {  languagesTable, languagesNamesTable }