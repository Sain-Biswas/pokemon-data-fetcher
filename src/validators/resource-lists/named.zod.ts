import { NamedAPIResourceZodSchema } from "~/validators/common/named-api-resource.zod";

import { z } from "zod";

export const NamedAPIResourceListZodSchema = z.object({
	count: z.number().describe("The total number of resources available from this API."),
	results: z.array(NamedAPIResourceZodSchema).describe("A list of named API resources.")
});
