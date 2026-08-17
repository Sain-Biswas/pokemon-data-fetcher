import { berryFlavorsNamesTable, berryFlavorsTable, berryOnFlavorTable } from "~/database/schema.database";
import { BerryFlavorZodSchema } from "~/validators/berries/berry-flavors.zod";
import { database } from "~/database/index.database";
import { fetchParsedResourceData } from "~/lib/fetch-resource";
import { namedListFetcher } from "~/lib/named-list-fetcher";

export const populateDatabaseBerryFlavors = async () => {
	const list = await namedListFetcher({ endpoint: "/berry-flavor" });

	const berryFlavors = await Promise.all(
		list.map((endpoint) =>
			fetchParsedResourceData({
				endpoint,
				schema: BerryFlavorZodSchema
			})
		)
	);

	await database.insert(berryFlavorsTable).values(
		berryFlavors.map((berryFlavor) => ({
			contest_type_name: berryFlavor.contest_type.name,
			id: berryFlavor.id,
			name: berryFlavor.name
		}))
	);

	await database.insert(berryFlavorsNamesTable).values(
		berryFlavors.flatMap((berryFlavor) =>
			berryFlavor.names.map((name) => ({
				berry_flavors_name: berryFlavor.name,
				language_name: name.language.name,
				name: name.name
			}))
		)
	);

	await database.insert(berryOnFlavorTable).values(
		berryFlavors.flatMap((berryFlavor) =>
			berryFlavor.berries.map((berry) => ({
				berry_name: berry.berry.name,
				flavor_name: berryFlavor.name,
				potency: berry.potency
			}))
		)
	);
};
