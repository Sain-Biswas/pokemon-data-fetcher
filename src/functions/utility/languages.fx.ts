import { languagesNamesTable, languagesTable } from "~/database/schema.database";
import { LanguageZodSchema } from "~/validators/utility/languages.zod";
import { database } from "~/database/index.database";
import { fetchParsedResourceData } from "~/lib/fetch-resource";
import { namedListFetcher } from "~/lib/named-list-fetcher";

export const populateDatabaseLanguages = async () => {
	const list = await namedListFetcher({ endpoint: "/language" });

	const languages = await Promise.all(
		list.map((endpoint) =>
			fetchParsedResourceData({
				endpoint,
				schema: LanguageZodSchema
			})
		)
	);

	await database.insert(languagesTable).values(
		languages.map((language) => ({
			id: language.id,
			iso3166: language.iso3166,
			iso639: language.iso639,
			name: language.name,
			official: language.official
		}))
	);

	await database.insert(languagesNamesTable).values(
		languages.flatMap((language) =>
			language.names.map((name) => ({
				local_language_name: name.language.name,
				name: name.name,
				target_language_name: language.name
			}))
		)
	);
};
