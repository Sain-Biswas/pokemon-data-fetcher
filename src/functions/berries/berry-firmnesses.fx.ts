import { berryFirmnessNamesTable, berryFirmnessesTable } from "~/database/schema.database";
import { BerryFirmnessZodSchema } from "~/validators/berries/berry-firmnesses.zod";
import { database } from "~/database/index.database";
import { fetchParsedResourceData } from "~/lib/fetch-resource";
import { namedListFetcher } from "~/lib/named-list-fetcher";

export const populateDatabaseBerryFirmnesses = async () => {
	const list = await namedListFetcher({ endpoint: "/berry-firmness" });

	const berryFirmnesses = await Promise.all(
		list.map((endpoint) =>
			fetchParsedResourceData({
				endpoint,
				schema: BerryFirmnessZodSchema
			})
		)
	);

	await database.insert(berryFirmnessesTable).values(
		berryFirmnesses.map((berryFirmness) => ({
			id: berryFirmness.id,
			name: berryFirmness.name
		}))
	);

	await database.insert(berryFirmnessNamesTable).values(
		berryFirmnesses.flatMap((berry) =>
			berry.names.map((name) => ({
				berry_firmness_name: berry.name,
				language_name: name.language.name,
				name: name.name
			}))
		)
	);
};
