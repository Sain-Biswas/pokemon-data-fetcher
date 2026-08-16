import { describe, expect, it } from "bun:test";
import { PokemonHabitatZodSchema } from "~/validators/pokemon/pokemon-habitats.zod";
import { fetch } from "bun";
import { z } from "zod";

const fetchPokemonHabitatResource = async (): Promise<unknown> => {
	const response = await fetch("https://pokeapi.co/api/v2/pokemon-habitat/1");

	if (!response.ok) {
		throw new Error("Pokemon Habitat Resource - NETWORK CONNECTION FAILED");
	}

	return (await response.json()) as unknown;
};

describe("Pokemon Habitat Resource", () => {
	it("Should match the zod schema - PokemonHabitatZodSchema", async () => {
		const data = await fetchPokemonHabitatResource();

		const parsed = PokemonHabitatZodSchema.safeParse(data);

		if (!parsed.success) {
			console.error("PokemonHabitatZodSchema Parse Error:", z.treeifyError(parsed.error));
		}

		expect(parsed.success).toBe(true);
	});
});
