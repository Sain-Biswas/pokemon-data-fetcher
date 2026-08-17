// oxlint-disable-next-line import/no-namespace
import * as schema from "~/database/schema.database";
import { defineRelations } from "drizzle-orm";

export const relations = defineRelations(schema, (relation) => ({
	/* UTILITY */
	languagesNamesTable: {
		localLanguage: relation.one.languagesTable({
			from: relation.languagesNamesTable.localLanguageId,
			to: relation.languagesTable.id
		}),

		targetLanguage: relation.one.languagesTable({
			from: relation.languagesNamesTable.targetLanguageId,
			to: relation.languagesTable.id
		})
	},

	languagesTable: {
		names: relation.many.languagesNamesTable({
			from: relation.languagesTable.id,
			to: relation.languagesNamesTable.targetLanguageId
		}),

		translationsProvided: relation.many.languagesNamesTable({
			from: relation.languagesTable.id,
			to: relation.languagesNamesTable.localLanguageId
		})
	}
}));
