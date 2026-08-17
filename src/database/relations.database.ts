// oxlint-disable-next-line import/no-namespace
import * as schema from "~/database/schema.database";
import { defineRelations } from "drizzle-orm";

// oxlint-disable-next-line max-lines-per-function
export const relations = defineRelations(schema, (relation) => ({
	/* BERRIES */
	berriesTable: {
		firmness: relation.one.berryFirmnessesTable({
			from: relation.berriesTable.firmness_name,
			to: relation.berryFirmnessesTable.name
		}),

		flavors: relation.many.berryOnFlavorTable({
			from: relation.berriesTable.name,
			to: relation.berryOnFlavorTable.berry_name
		}),

		item: relation.one.itemTable({
			from: relation.berriesTable.item_name,
			to: relation.itemTable.name
		}),

		natural_gift_type: relation.one.typesTable({
			from: relation.berriesTable.natural_gift_type_name,
			to: relation.typesTable.name
		})
	},

	berryFirmnessNamesTable: {
		language: relation.one.languagesTable({
			from: relation.berryFirmnessNamesTable.language_name,
			to: relation.languagesTable.name
		})
	},

	berryFirmnessesTable: {
		berries: relation.many.berriesTable({
			from: relation.berryFirmnessesTable.name,
			to: relation.berriesTable.firmness_name
		}),

		names: relation.many.berryFirmnessNamesTable({
			from: relation.berryFirmnessesTable.name,
			to: relation.berryFirmnessNamesTable.berry_firmness_name
		})
	},

	berryFlavorsNamesTable: {
		language: relation.one.languagesTable({
			from: relation.berryFlavorsNamesTable.language_name,
			to: relation.languagesTable.name
		})
	},

	berryFlavorsTable: {
		berries: relation.many.berryOnFlavorTable({
			from: relation.berryFlavorsTable.name,
			to: relation.berryOnFlavorTable.flavor_name
		}),

		contest_type: relation.one.contestTypesTable({
			from: relation.berryFlavorsTable.contest_type_name,
			to: relation.contestTypesTable.name
		}),

		names: relation.many.berryFlavorsNamesTable({
			from: relation.berryFlavorsTable.name,
			to: relation.berryFlavorsNamesTable.berry_flavors_name
		})
	},

	berryOnFlavorTable: {
		berry: relation.one.berriesTable({
			from: relation.berryOnFlavorTable.berry_name,
			to: relation.berriesTable.name
		}),

		flavor: relation.one.berryFlavorsTable({
			from: relation.berryOnFlavorTable.flavor_name,
			to: relation.berryFlavorsTable.name
		})
	},

	/* UTILITY */
	languagesNamesTable: {
		localLanguage: relation.one.languagesTable({
			from: relation.languagesNamesTable.local_language_name,
			to: relation.languagesTable.name
		}),

		targetLanguage: relation.one.languagesTable({
			from: relation.languagesNamesTable.target_language_name,
			to: relation.languagesTable.name
		})
	},

	languagesTable: {
		names: relation.many.languagesNamesTable({
			from: relation.languagesTable.name,
			to: relation.languagesNamesTable.target_language_name
		}),

		translationsProvided: relation.many.languagesNamesTable({
			from: relation.languagesTable.name,
			to: relation.languagesNamesTable.local_language_name
		})
	}
}));
