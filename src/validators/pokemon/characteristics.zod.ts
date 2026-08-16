import { DescriptionZodSchema, NamedAPIResourceZodSchema } from "~/validators/utility/common-models.zod";
import { z } from "zod";

const CharacteristicZodSchema = z.object({
	descriptions: z
		.array(DescriptionZodSchema)
		.describe("The descriptions of this characteristic listed in different languages."),
	gene_modulo: z.number().int().describe("The remainder of the highest stat/IV divided by 5."),
	highest_stat: NamedAPIResourceZodSchema.describe("The stat which results in this characteristic."),
	id: z.number().int().describe("The identifier for this resource."),
	possible_values: z
		.array(z.number().int())
		.describe(
			"The possible values of the highest stat that would result in a Pokémon receiving this characteristic when divided by 5."
		)
});

export { CharacteristicZodSchema };
