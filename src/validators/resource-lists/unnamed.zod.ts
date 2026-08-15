import { APIResourceZodSchema } from "~/validators/common/api-resource.zod";

import { z } from "zod";

export const APIResourceListZodSchema = z.object({
	count: z.number().describe("The total number of resources available from this API."),
	results: z.array(APIResourceZodSchema).describe("A list of unnamed API resources.")
});
