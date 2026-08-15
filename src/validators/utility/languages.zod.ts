import { NameZodSchema } from "~/validators/utility/common-models.zod";
import { z } from "zod";

const LanguageZodSchema = z.object({
	id: z.number().describe("The identifier for this resource."),
	iso3166: z
		.string()
		.length(2, { error: "The following code don't meets the standards" })
		.describe("The two-letter code of the language. Note that it is not unique."),
	iso639: z
		.string()
		.length(2, { error: "The following code don't meets the standards" })
		.describe("The two-letter code of the country where this language is spoken. Note that it is not unique."),
	name: z.string().describe("The name for this resource"),
	names: z.array(NameZodSchema).describe("The name of this resource listed in different languages."),
	official: z.boolean().describe("Whether or not the games are published in this language.")
});

export { LanguageZodSchema };
