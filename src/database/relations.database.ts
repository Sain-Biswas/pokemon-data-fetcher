// oxlint-disable-next-line import/no-namespace
import * as schema from "~/database/schema.database";
import { defineRelations } from "drizzle-orm";

export const relations = defineRelations(schema, (relation) => ({
	/* UTILITY */
	languagesNamesTable: {
		localLanguage: relation.one.languagesTable({
			from: relation.languagesNamesTable.local_language_name,
			to: relation.languagesTable.id
		}),

		targetLanguage: relation.one.languagesTable({
			from: relation.languagesNamesTable.target_language_name,
			to: relation.languagesTable.id
		})
	},

	languagesTable: {
		names: relation.many.languagesNamesTable({
			from: relation.languagesTable.id,
			to: relation.languagesNamesTable.target_language_name
		}),

		translationsProvided: relation.many.languagesNamesTable({
			from: relation.languagesTable.id,
			to: relation.languagesNamesTable.local_language_name
		})
	}
}));
