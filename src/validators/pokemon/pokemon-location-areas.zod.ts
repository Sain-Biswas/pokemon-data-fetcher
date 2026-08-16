import { NamedAPIResourceZodSchema, VersionEncounterDetailZodSchema } from "~/validators/utility/common-models.zod";
import { z } from "zod";

const LocationAreaEncounterZodSchema = z.array(
	z.object({
		location_area: NamedAPIResourceZodSchema.describe(
			"The location area the referenced Pokémon can be encountered in."
		),
		version_details: z
			.array(VersionEncounterDetailZodSchema)
			.describe("A list of versions and encounters with the referenced Pokémon that might happen.")
	})
);

export { LocationAreaEncounterZodSchema };
