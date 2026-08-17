// oxlint-disable-next-line import/no-namespace
import * as schema from "~/database/schema.database";
import { defineRelations } from "drizzle-orm";

export const relations = defineRelations(schema, (relation) => ({
	/* UTILITY */
	languagesTable: {
		names: relation.many.languagesNamesTable({
			from: relation.languagesTable.id,
			to: relation.languagesNamesTable.id
		})
	}
}));
