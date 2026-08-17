import { database } from "~/database/index.database";

const fetchLanguageData = async ({ lang = "en" }: { lang?: string }) =>
	{
        const response = await database.query.languagesTable.findFirst({
		where: { name: { eq: lang } },
		with: {
			names: {
				columns: { name: true },
				with: {
					localLanguage: {
						columns: {},
						with: { names: { columns: { name: true }, where: { local_language_name: { eq: lang } } } }
					}
				}
			}
		}
	})

    return {
        ...response,
        names: response?.names.map((name) => ({
            local_language: name.localLanguage?.names.at(0)?.name,
            name: name.name
        }))
    }
}

const data = await fetchLanguageData({});

// oxlint-disable-next-line unicorn/no-null
await Bun.write("out/language.json", JSON.stringify(data, null, 2));
