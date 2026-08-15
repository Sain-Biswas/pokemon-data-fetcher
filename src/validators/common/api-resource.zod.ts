import { z } from "zod";

export const APIResourceZodSchema = z.object({
	url: z.url().describe("The URL of the referenced resource.")
});
