import { languagesNamesTable, languagesTable } from "~/database/schema.database";
import { LanguageZodSchema } from "~/validators/utility/languages.zod";
import { database } from "~/database/index.database";
import { fetchParsedResourceData } from "~/lib/fetch-resource";
import { namedListFetcher } from "~/lib/named-list-fetcher";

const list = await namedListFetcher({ endpoint: "/language" });

await Promise.all(
	list.map(async (endpoint) => {
		const language = await fetchParsedResourceData({
			endpoint,
			schema: LanguageZodSchema
		});

		await database.insert(languagesTable).values({
			id: language.name,
			index: language.id,
			iso3166: language.iso3166,
			iso639: language.iso639,
			official: language.official
		});

		await Promise.all(
			language.names.map((name) =>
				database.insert(languagesNamesTable).values({
					id: language.name,
					language: name.language.name,
					name: name.name
				})
			)
		);
	})
);
