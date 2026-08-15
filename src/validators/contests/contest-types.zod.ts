import { NamedAPIResourceZodSchema } from "~/validators/utility/common-models.zod";
import { z } from "zod";

const ContestNameZodSchema = z.object({
	color: z.string().describe("The color associated with this contest's name."),
	language: NamedAPIResourceZodSchema.describe("The language that this name is in."),
	name: z.string().describe("The name for this contest.")
});

const ContestTypeZodSchema = z.object({
	berry_flavor: NamedAPIResourceZodSchema.describe("The berry flavor that correlates with this contest type."),
	id: z.number().int().describe("The identifier for this resource."),
	name: z.string().describe("The name for this resource."),
	names: z.array(ContestNameZodSchema).describe("The name of this contest type listed in different languages.")
});

export { ContestTypeZodSchema, ContestNameZodSchema };
