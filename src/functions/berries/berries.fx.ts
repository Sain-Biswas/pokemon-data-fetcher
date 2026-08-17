import { BerryZodSchema } from "~/validators/berries/berries.zod";
// oxlint-disable-next-line no-duplicate-imports
import { berriesTable } from "~/database/schema.database";
import { database } from "~/database/index.database";
import { fetchParsedResourceData } from "~/lib/fetch-resource";
import { namedListFetcher } from "~/lib/named-list-fetcher";

export const populateDatabaseBerries = async () => {
	const list = await namedListFetcher({ endpoint: "/berry" });

	const berries = await Promise.all(
		list.map((endpoint) =>
			fetchParsedResourceData({
				endpoint,
				schema: BerryZodSchema
			})
		)
	);

	await database.insert(berriesTable).values(
		berries.map((berry) => ({
			firmness_name: berry.firmness?.name,
			growth_time: berry.growth_time,
			id: berry.id,
			item_name: berry.item.name,
			max_harvest: berry.max_harvest,
			name: berry.name,
			natural_gift_power: berry.natural_gift_power,
			natural_gift_type_name: berry.natural_gift_type?.name,
			size: berry.size,
			smoothness: berry.smoothness,
			soil_dryness: berry.soil_dryness
		}))
	);
};
