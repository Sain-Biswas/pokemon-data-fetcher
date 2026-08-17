import { languagesNamesTable, languagesTable } from "~/database/schema.database";
import { LanguageZodSchema } from "~/validators/utility/languages.zod";
// oxlint-disable-next-line no-duplicate-imports
import type { LanguagesNamesTableInsertType } from "~/database/schema.database";
import { database } from "~/database/index.database";
import { fetchParsedResourceData } from "~/lib/fetch-resource";
import { namedListFetcher } from "~/lib/named-list-fetcher";

const list = await namedListFetcher({ endpoint: "/language" });

const languages = await Promise.all(
	list.map((endpoint) =>
		fetchParsedResourceData({
			endpoint,
			schema: LanguageZodSchema
		})
	)
);

const languageRecords = languages.map((language) => ({
	id: language.name,
	index: language.id,
	iso3166: language.iso3166,
	iso639: language.iso639,
	official: language.official
}));

const nameRecords: LanguagesNamesTableInsertType[] = languages.flatMap((language) =>
	language.names.map((name) => ({
		localLanguageId: name.language.name,
		name: name.name,
		targetLanguageId: language.name
	}))
);

if (languageRecords.length > 0) {
	await database.insert(languagesTable).values(languageRecords);
}

if (nameRecords.length > 0) {
	await database.insert(languagesNamesTable).values(nameRecords);
}
