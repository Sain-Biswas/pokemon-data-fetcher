import { z } from "zod";

export const NamedAPIResourceZodSchema = z.object({
	name: z.string().describe("The name of the referenced resource."),
	url: z.url().describe("The URL of the referenced resource.")
});
