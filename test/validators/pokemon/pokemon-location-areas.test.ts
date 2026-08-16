import { describe, expect, it } from "bun:test";
import { LocationAreaEncounterZodSchema } from "~/validators/pokemon/pokemon-location-areas.zod";
import { fetch } from "bun";
import { z } from "zod";

const fetchPokemonLocationAreaEncounterResource = async (): Promise<unknown> => {
	const response = await fetch("https://pokeapi.co/api/v2/pokemon/6/encounters");

	if (!response.ok) {
		throw new Error("Pokemon Location Area Encounter Resource - NETWORK CONNECTION FAILED");
	}

	return (await response.json()) as unknown;
};

describe("Pokemon Location Area Encounter Resource", () => {
	it("Should match the zod schema - LocationAreaEncounterZodSchema", async () => {
		const data = await fetchPokemonLocationAreaEncounterResource();

		const parsed = LocationAreaEncounterZodSchema.safeParse(data);

		if (!parsed.success) {
			console.error("LocationAreaEncounterZodSchema Parse Error:", z.treeifyError(parsed.error));
		}

		expect(parsed.success).toBe(true);
	});
});
