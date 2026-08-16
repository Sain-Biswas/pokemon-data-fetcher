import { describe, expect, it } from "bun:test";
import { PokemonSpeciesZodSchema } from "~/validators/pokemon/pokemon-species.zod";
import { fetch } from "bun";
import { z } from "zod";

const fetchPokemonSpeciesResource = async (): Promise<unknown> => {
	const response = await fetch("https://pokeapi.co/api/v2/pokemon-species/6");

	if (!response.ok) {
		throw new Error("Pokemon Species Resource - NETWORK CONNECTION FAILED");
	}

	return (await response.json()) as unknown;
};

describe("Pokemon Species Resource", () => {
	it("Should match the zod schema - PokemonSpeciesZodSchema", async () => {
		const data = await fetchPokemonSpeciesResource();

		const parsed = PokemonSpeciesZodSchema.safeParse(data);

		if (!parsed.success) {
			console.error("PokemonSpeciesZodSchema Parse Error:", z.treeifyError(parsed.error));
		}

		expect(parsed.success).toBe(true);
	});
});
